import React, { useState, useEffect } from "react";
import { Table, DatePicker, Typography, Space, Empty } from "antd";
import axios from "axios";

const { Link } = Typography;
const { RangePicker } = DatePicker;

const History = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://api.example.com/orders"); // API manzilini o'zgartiring
        setData(res.data);
      } catch (err) {
        console.error("Xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { title: "№", dataIndex: "id", key: "id", width: 50 },
    { title: "Mahsulot nomi", dataIndex: "product", key: "product" },
    { title: "Soni", dataIndex: "quantity", key: "quantity" },
    { title: "Narxi (so'm)", dataIndex: "price", key: "price" },
    { title: "Qabul qilingan to'lov (so'm)", dataIndex: "paid", key: "paid" },
    { title: "Jami (so'm)", dataIndex: "total", key: "total" },
    { title: "Topshirilgan vaqti", dataIndex: "deliveredAt", key: "deliveredAt" },
  ];

  return (
    <div style={{ padding: 20 }}>
      {/* Yuqori qism: Qaytish tugmasi va sana tanlash */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <Link onClick={() => window.history.back()} style={{ cursor: "pointer" }}>
          ← Qaytish
        </Link>
        <RangePicker onChange={(dates) => setDates(dates)} />
      </div>

      {/* Jadval */}
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> }}
      />
    </div>
  );
};

export default History;
