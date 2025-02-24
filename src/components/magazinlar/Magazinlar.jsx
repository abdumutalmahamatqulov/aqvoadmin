import React, { useEffect, useState } from "react";
import { Input, Space, Button, Modal, Table, message, Popconfirm } from "antd";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { BACKEND_URL } from "../../Common/Constants";
import { ToastContainer, toast } from "react-toastify";

const { Search } = Input;
const Magazinlar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [magazinNomi, setMagazinNomi] = useState("");
  const [manzil, setManzil] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState([]); // Default qiymat []
  const [searchTerm, setSearchTerm] = useState("");

  // API dan ma’lumot olish
  const fetchData = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Token topilmadi!");
      return;
    }

    axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${BACKEND_URL}/Stores`,
    })
      .then((res) => {
        console.log("API dan kelgan data:", res.data);

        // API ma’lumot tuzilishini tekshiramiz
        const apiData = Array.isArray(res.data) ? res.data : res.data.data;

        if (!Array.isArray(apiData)) {
          toast.error("Xato formatdagi ma'lumot keldi!");
          return;
        }

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
      .catch((error) => {
        console.error("Xatolik yuz berdi:", error);
        message.error("Xatolik yuz berdi. Qayta urinib ko‘ring!");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteData = (id) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("Token topilmadi!");
      return;
    }
  
    axios({
      method: "DELETE",
      url: `${BACKEND_URL}/Stores/${id}`, 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Ma’lumot o‘chirildi:", response.data);
        message.success(" Ma’lumot muvaffaqiyatli o‘chirildi!");
  
        setData(data.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Xatolik yuz berdi:", error);
        message.error("Xatolik yuz berdi. Qayta urinib ko‘ring!");
      });
  };
  

  // Modal funksiyalari
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  // Ma'lumot qo‘shish
  const handleOk = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Token topilmadi!");
      return;
    }

    const newStore = {
      name: magazinNomi,
      address: manzil,
      phone: phone,
    };

    axios
      .post(`${BACKEND_URL}/Stores`, newStore, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Yangi magazin qo‘shildi:", response.data);
        message.success(" Magazin muvaffaqiyatli qo‘shildi!");
        fetchData(); // API dan qayta yuklaymiz, eski usulda qo‘shmaslik uchun
        setIsModalOpen(false); // Modalni yopish
        setMagazinNomi(""); // Inputlarni tozalash
        setManzil("");
        setPhone("");
      })
      .catch((error) => {
        console.error("Xatolik yuz berdi:", error);
        message.error("Xatolik yuz berdi. Qayta urinib ko‘ring!");
      });
  };

  // Qidiruv funksiyasi
  const onSearch = (value) => setSearchTerm(value);

  // Tahrirlash funksiyasi
  const editItem = (id) => {
    console.log("Tahrirlash ID:", id);
  };

  // O‘chirish funksiyasi
  const deleteItem = (id) => {
    console.log("O‘chirish ID:", id);
  };

  // Filterlangan ma'lumotlar
  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const confirm = () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(null), 3000);
    });

  // Jadval ustunlari
  const columns = [
    { title: "№", dataIndex: "key", key: "key" },
    { title: "Nomi", dataIndex: "name", key: "name" },
    { title: "Manzil", dataIndex: "address", key: "address" },
    { title: "Telefon", dataIndex: "phone", key: "phone" },
    {
      title: "Amallar",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="link"
            icon={<EditOutlined style={{ color: "green" }} />}
            onClick={() => editItem(record.id)}
          />

<Popconfirm
  title="Haqiqatan ham o‘chirmoqchimisiz?"
  onConfirm={() => deleteData(record.id)}
  okText="Ha"
  cancelText="Yo‘q"
>
  <Button type="link" icon={<DeleteOutlined style={{ color: "red" }} />} />
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
          <Search placeholder="Qidiruv..." onSearch={onSearch} enterButton />
          <Button type="primary" onClick={showModal}>
            Magazin qo‘shish
          </Button>
        </Space>
      </div>

      {/* Modal */}
      <Modal
        title="Magazin qo‘shish"
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
            <label>Raqamni kiriting</label>
            <PhoneInput
              international
              defaultCountry="UZ"
              value={phone}
              onChange={setPhone}
            />
          </div>
        </div>
      </Modal>

      {/* Jadval */}
      <Table columns={columns} dataSource={filteredData} rowKey="id" bordered />
    </div>
  );
};

export default Magazinlar;
