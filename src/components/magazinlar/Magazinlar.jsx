import React, { useEffect, useState } from "react";
import {
  Input,
  Space,
  Button,
  Modal,
  Table,
  message,
  Popconfirm,
  Spin,
} from "antd";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { BACKEND_URL } from "../../Common/Constants";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const Magazinlar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [magazinNomi, setMagazinNomi] = useState("");
  const [manzil, setManzil] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false); // Qidiruv uchun loading
  const navigate = useNavigate();

  // Ma'lumotlarni olish
  const fetchData = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token topilmadi!");
      setLoading(false);
      return;
    }

    axios
      .get(`${BACKEND_URL}/Stores`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const apiData = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];
        setData(
          apiData.map((item, index) => ({
            key: index + 1,
            id: item.id,
            name: item.name,
            address: item.address,
            phone: item.phone,
          }))
        );
      })
      .catch(() => message.error("Xatolik yuz berdi. Qayta urinib ko‘ring!"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Qo'shish yoki tahrirlash uchun modalni ochish
  const showAddModal = () => {
    setSelectedId(null);
    setMagazinNomi("");
    setManzil("");
    setPhone("");
    setIsModalOpen(true);
  };

  const showEditModal = (id) => {
    const selectedItem = data.find((item) => item.id === id);
    if (selectedItem) {
      setSelectedId(id);
      setMagazinNomi(selectedItem.name);
      setManzil(selectedItem.address);
      setPhone(selectedItem.phone);
      setIsModalOpen(true);
    }
  };

  // Modalni yopish
  const handleCancel = () => setIsModalOpen(false);

  // Ma'lumot qo'shish yoki tahrirlash
  const handleOk = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token topilmadi!");
      return;
    }

    const storeData = { name: magazinNomi, address: manzil, phone };

    if (selectedId !== null) {
      axios
        .put(`${BACKEND_URL}/Stores/${selectedId}`, storeData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          message.success("Ma’lumot muvaffaqiyatli tahrirlandi!");
          fetchData();
          setIsModalOpen(false);
        })
        .catch(() => message.error("Xatolik yuz berdi. Qayta urinib ko‘ring!"));
    } else {
      axios
        .post(`${BACKEND_URL}/Stores`, storeData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          message.success("Magazin muvaffaqiyatli qo‘shildi!");
          fetchData();
          setIsModalOpen(false);
        })
        .catch(() => message.error("Xatolik yuz berdi. Qayta urinib ko‘ring!"));
    }
  };

  // O'chirish
  const deleteData = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token topilmadi!");
      return;
    }

    axios
      .delete(`${BACKEND_URL}/Stores/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        message.success("Ma’lumot muvaffaqiyatli o‘chirildi!");
        setData(data.filter((item) => item.id !== id));
      })
      .catch(() => message.error("Xatolik yuz berdi. Qayta urinib ko‘ring!"));
  };

  // Qidiruv funksiyasi (loading bilan)
  const onSearch = (value) => {
    setSearchLoading(true);
    setTimeout(() => {
      setSearchTerm(value);
      setSearchLoading(false);
    }, 500);
  };

  // Filter qilingan data
  const filteredData = data.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: "№", dataIndex: "key", key: "key" },
    { title: "Nomi", dataIndex: "name", key: "name" },
    { title: "Manzil", dataIndex: "address", key: "address" },
    { title: "Telefon", dataIndex: "phone", key: "phone" },
    {
      title: "Amallar",
      key: "actions",
      render: (_, record) => (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ display: "flex", gap: "8px" }}
        >
          <Button
            type="link"
            icon={<EditOutlined style={{ color: "green" }} />}
            onClick={() => showEditModal(record.id)}
          />

          <Popconfirm
            title="Haqiqatan ham o‘chirmoqchimisiz?"
            onConfirm={() => deleteData(record.id)}
            okText="Ha"
            cancelText="Yo‘q"
          >
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-5">
      <ToastContainer position="top-right" theme="colored" />
      <div className="flex items-center justify-between mb-4">
        <h2>Magazinlar</h2>
        <Space>
          <Search
            placeholder="Qidiruv..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Real-time qidiruv
            onSearch={onSearch}
            enterButton
          />

          <Button type="primary" onClick={showAddModal}>
            Magazin qo‘shish
          </Button>
        </Space>
      </div>

      {/* Loader qidiruv uchun */}
      {searchLoading ? (
        <div className="flex justify-center my-4">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          bordered
          loading={loading}
          onRow={(record) => ({
            onClick: () =>
              navigate(`/magazin/${record.id}`, {
                state: {
                  name: record.name,
                  phone: record.phone,
                  address: record.address,
                },
              }),
          })}
        />
      )}

      {/* Modal */}
      <Modal
        title={selectedId ? "Magazinni tahrirlash" : "Magazin qo‘shish"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="space-y-4">
          <div>
            <label>Magazin nomi</label>
            <Input
              value={magazinNomi}
              onChange={(e) => setMagazinNomi(e.target.value)}
            />
          </div>
          <div>
            <label>Manzil</label>
            <Input value={manzil} onChange={(e) => setManzil(e.target.value)} />
          </div>
          <div>
            <label>Telefon</label>
            <PhoneInput
              international
              defaultCountry="UZ"
              value={phone}
              onChange={setPhone}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Magazinlar;
