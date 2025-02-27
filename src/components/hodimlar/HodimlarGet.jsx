import React, { useEffect, useState } from "react";
import { Button, message, Popconfirm, Space, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import styles from "./Hodimlar.module.scss";
import EditModal from "./EditModal";
import ViewModal from "./ViewModal";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../Common/Constants";

const HodimlarGet = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Yangi hodim qo'shish yoki edit qilish

  // 📥 Ma'lumotlarni olish
  const fetchData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/users`);
      const result = await response.json();
      const formattedData = result?.data?.map((user, index) => ({
        key: user.id,
        no: index + 1,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        position: user.position,
        salary: user.salary,
        startedWorkingAt: user.startedWorkingAt,
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔎 Hodim ma'lumotlarini ko'rish
  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  // 📝 Hodimni tahrirlash
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true); // Edit rejimi
    setIsModalOpen(true);
  };

  // ➕ Yangi hodim qo'shish
  const handleAddUser = () => {
    setSelectedUser(null); // Toza ma'lumot
    setIsEditing(false); // Qo‘shish rejimi
    setIsModalOpen(true);
  };

  // 🗑️ Hodimni o‘chirish
  const handleDelete = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        message.success("Hodim muvaffaqiyatli o'chirildi!");
        fetchData(); // Jadvalni yangilash
      } else {
        message.error("Hodimni o'chirishda xatolik yuz berdi!");
      }
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      message.error("Server bilan bog‘lanishda xatolik!");
    }
  };

  // 🔄 Modalni yopish
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    fetchData();
  };

  // 📊 Jadval ustunlari
  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Ism", dataIndex: "firstName", key: "firstName" },
    { title: "Telefon raqam", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Oylik daromadi", dataIndex: "salary", key: "salary" },
    {
      title: "Amallar",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Hodimni o'chirish"
            description="Siz ushbu hodimni o'chirishga aminmisiz?"
            onConfirm={() => handleDelete(record.key)}
            okText="Ha"
            cancelText="Yo'q"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button type="primary" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <section className={styles.employes}>
        <div className={styles.top}>
          <h2>Hodimlar ro'yhati</h2>
          <div className={styles.btnBox}>
            <Link to={"attendance"}>
              <Button type="primary">Davomatga o'tish</Button>
            </Link>
            <Button type="primary" onClick={handleAddUser}>
              Yangi Hodim qo'shish
            </Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          onRow={(record) => ({
            onClick: (event) => {
              if (
                event.target.closest("button") ||
                event.target.closest(".ant-popover")
              ) {
                return;
              }
              handleRowClick(record);
            },
          })}
        />

        {/* 🔍 Hodim ma'lumotlarini ko'rsatish uchun modal */}
        <ViewModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          user={selectedUser}
        />

        {/* EditModal chaqirish */}
        <EditModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          selectedUser={selectedUser}
          isEditing={isEditing}
        />
      </section>
    </>
  );
};

export default HodimlarGet;
