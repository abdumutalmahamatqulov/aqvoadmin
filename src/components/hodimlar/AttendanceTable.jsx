import React, { useEffect, useState } from "react";
import { Button, DatePicker, Space, Table, message } from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween"; // isBetween plaginini import qilamiz

import { BACKEND_URL } from "../../Common/Constants";
import styles from "./Hodimlar.module.scss";

dayjs.extend(isBetween); // dayjs ga plagin qo‘shamiz

const AttendanceTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null); // Tanlangan sanalar
  const { RangePicker } = DatePicker;

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/attendance`);

        if (!response.ok) {
          throw new Error(
            `Server xatosi: ${response.status} - ${response.statusText}`
          );
        }
        const apiData = await response.json();

        const formattedData = Object.entries(apiData?.data).map(
          ([name, records], index) => {
            const attendanceRecords = Array.isArray(records) ? records : [];
            let attendanceRecord = { key: index, name };

            // Faqat tanlangan sanalar oralig'ida ustun yaratish
            const startDay = selectedRange ? dayjs(selectedRange[0]).date() : 1;
            const endDay = selectedRange
              ? dayjs(selectedRange[1]).date()
              : dayjs().daysInMonth();

            for (let i = startDay; i <= endDay; i++) {
              const formattedDay = i.toString().padStart(2, "0"); // 01, 02, ..., 31
              const recordForDay = attendanceRecords.find(
                (record) => dayjs(record.date).format("DD") === formattedDay
              );

              attendanceRecord[`day${i}`] = recordForDay ? "present" : "absent";
            }

            return attendanceRecord;
          }
        );

        setData(formattedData);
      } catch (error) {
        console.error("API xatosi:", error);
        message.error("Ma'lumotlarni yuklashda xatolik yuz berdi.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [update, selectedRange]);

  // Ustunlar (selectedRange bo'lsa, faqat shu oraliqdagi kunlar ko'rsatiladi)
  const startDay = selectedRange ? dayjs(selectedRange[0]).date() : 1;
  const endDay = selectedRange
    ? dayjs(selectedRange[1]).date()
    : dayjs().daysInMonth();

  const columns = [
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    ...Array.from({ length: endDay - startDay + 1 }, (_, i) => ({
      title: (startDay + i).toString(),
      dataIndex: `day${startDay + i}`,
      key: `day${startDay + i}`,
      render: (status) =>
        status === "present" ? (
          <Button color="cyan" shape="circle" type="primary">
            ✓
          </Button>
        ) : (
          <Button danger shape="circle" variant="outlined">
            X
          </Button>
        ),
    })),
  ];

  return (
    <section>
      <div className={styles.top}>
        <h2>Hodimlar davomadi</h2>
        <div className={styles.btnBox}>
          <Space direction="vertical" size={12}>
            <RangePicker onChange={(dates) => setSelectedRange(dates)} />
          </Space>
          <Button type="primary" onClick={() => setUpdate(!update)}>
            Yangilash
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        bordered
        scroll={{ x: "max-content" }}
      />
    </section>
  );
};

export default AttendanceTable;
