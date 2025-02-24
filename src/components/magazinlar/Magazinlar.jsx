import React, { useEffect, useState } from "react";
import { Input, Space, Button, Modal, Table, message } from "antd";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { BACKEND_URL } from "../../Common/Constants";

const { Search } = Input;

const Magazinlar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [magazinNomi, setMagazinNomi] = useState("");
  const [manzil, setManzil] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/store-item`)
      .then((response) => {
        console.log("Serverdan kelgan data:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Xatolik yuz berdi:", error);
        if (error.response) {
          console.error("Status kodi:", error.response.status);
          console.error("Xatolik ma'lumoti:", error.response.data);
        } else if (error.request) {
          console.error("So‘rov jo‘natildi, lekin javob kelmadi:", error.request);
        } else {
          console.error("So‘rovni bajarish vaqtida xatolik yuz berdi:", error.message);
        }
      });
  }, []);
  

  // Modal funksiyalari
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleOk = () => {
    const newStore = {
      name: magazinNomi,
      address: manzil,
      phone: phone,
    };
  
    axios
      .post(`${BACKEND_URL}/api/store-item`, newStore)
      .then((response) => {
        console.log("Yangi magazin qo‘shildi:", response.data);
        setData([...data, response.data]); 
        message.success("✅ Magazin qo‘shildi!"); 
        setIsModalOpen(false); 
        setMagazinNomi(""); 
        setManzil("");
        setPhone("");
      })
      .catch((error) => {
        console.log("BACKEND_URL:", BACKEND_URL);
         alert("Malumot yuborilmadi")
        console.error("Xatolik yuz berdi:", error);
        message.error("❌ Xatolik yuz berdi. Qayta urinib ko‘ring!"); 
      });
  };
  

  // Qidiruv funksiyasi
  const onSearch = (value) => {
    setSearchTerm(value);
  };

  // Tahrirlash funksiyasi
  const editItem = (id) => {
    console.log("Tahrirlash ID:", id);
  };

  // O‘chirish funksiyasi
  const deleteItem = (id) => {
    console.log("O‘chirish ID:", id);
  };

  // Filterlangan ma'lumotlar
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Jadval ustunlari
  const columns = [
    { title: "№", dataIndex: "id", key: "id" },
    { title: "Nomi", dataIndex: "name", key: "name" }, 
    { title: "Manzili", dataIndex: "address", key: "address" },
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
          <Button
            type="link"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={() => deleteItem(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h2>Magazinlar</h2>
        <Space>
          <Search placeholder="Qidiruv..." onSearch={onSearch} enterButton />
          <Button type="primary" onClick={showModal}>
            Magazin qo'shish
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
  <p>
    <label>Magazin nomi</label>
    <Input
      placeholder="Magazin nomini kiriting"
      value={magazinNomi}
      onChange={(e) => setMagazinNomi(e.target.value)}
    />
  </p>
  <br />
  <p>
    <label>Manzil</label>
    <Input
      placeholder="Manzilni kiriting"
      value={manzil}
      onChange={(e) => setManzil(e.target.value)}
    />
  </p>
  <br />

  <p>
          <label>Raqmni kiriting</label>
          <PhoneInput
            international
            defaultCountry="UZ"
            value={phone}
            onChange={setPhone}
            className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm my-2"
          />
        </p>
</Modal>


      {/* Jadval */}
      <Table columns={columns} dataSource={filteredData} rowKey="id" bordered />
    </div>
  );
};

export default Magazinlar;
