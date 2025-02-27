import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../Common/Constants';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Input, message, Modal, Popconfirm, Space, Spin, Table } from 'antd';
import Search from 'antd/es/transfer/search';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
const TayorMaxsultolar = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tayorMaxsulot, setTayorMaxsulotlar] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [quantity, setQuantity] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [maxsulotNomi, setMaxsulotNomi] = useState("");
    const navigate = useNavigate();

    const setTayorMaxsulot = () => {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Token can not be found");
            setLoading(false);
            return;
        }
        axios.get(`${BACKEND_URL}/conserve-type`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setTayorMaxsulotlar(res?.data?.data || []);

            })
            .catch(err => console.error("Error=>", err))
            .finally(() => setLoading(false));
    };
    useEffect(() => {
        setTayorMaxsulot();
    }, []);

    const showAddModal = () => {
        setSelectedId(null);
        setMaxsulotNomi("");
        setQuantity(null);
        setIsModalOpen(true);
    };

    const showEditModal = (id) => {
        const selectedItem = tayorMaxsulot.find((item) => item.id === id);
        if (selectedItem) {
            setSelectedId(id);
            setMaxsulotNomi(selectedItem.conserveType);
            setQuantity(selectedItem.readyConserves?.[0]?.quantity ?? 0);
            setIsModalOpen(true);
        }
    };
    const handleCancel = () => setIsModalOpen(false);

    const handleOk = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Token can not be found");
            return;
        }

        const maxsulotData = { conserveType: maxsulotNomi };


        if (selectedId !== null) {
            axios
                .put(`${BACKEND_URL}/conserve-type/${selectedId}`, maxsulotData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })
                .then(() => {
                    message.success("Ma’lumot muvaffaqiyatli tahrirlandi!");
                    setTayorMaxsulot();
                    setIsModalOpen(false);
                })
                .catch(() => message.error("Xatolik yuz berdi. Qayta urinib ko‘ring!"));
        } else {
            axios
                .post(`${BACKEND_URL}/conserve-type`, maxsulotData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })
                .then(() => {
                    message.success("Maxsulot muvaffaqiyatli qo‘shildi!");
                    setTayorMaxsulot();
                    setIsModalOpen(false);
                })
                .catch(() => message.error("Xatolik yuz berdi. Qayta urinib ko‘ring!"));
        }
    };

    const deleteData = (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Token can not be found');
            return;
        }
        axios
            .delete(`${BACKEND_URL}/conserve-type/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                message.success("Maxsulot muvaffaqiyatli o‘chirildi!");
                setTayorMaxsulot();
            })
            .catch(() => message.error("O‘chirishda xatolik yuz berdi!"));
    };

    const onSearch = (value) => {
        setSearchLoading(true);
        setTimeout(() => {
            setSearchTerm(value);
            setSearchLoading(false);
        }, 500);
    };

    const filteredData = tayorMaxsulot.filter((item) => {

        const conserveType = item.conserveType ? item.conserveType?.toLowerCase() : "";
        const quantity = item.readyConserves?.length > 0 && item.readyConserves[0]?.quantity
            ? String(item.readyConserves?.[0]?.quantity ?? 0).toLowerCase()
            : "";

        return conserveType.includes(searchTerm.toLowerCase()) || quantity.includes(searchTerm.toLowerCase());
    });
    const dataSource = filteredData.map((item, index) => ({
        ...item,
        key: index + 1,
        conserveType: item.conserveType || "Noma'lum",
        quantity: item.readyConserves?.[0]?.quantity ?? 0,
    }));

    const columns = [
        { title: "№", dataIndex: "key", key: "key" },
        { title: "Konserva turi", dataIndex: "conserveType", key: "conserveType" },
        { title: "Quantity", dataIndex: "quantity", key: "quantity" },
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
        <div className='p-5'>
            <ToastContainer position="top-right" theme="colored" />
            <div className="flex items-center justify-between mb-4">
                <h2>Maxsulotlar</h2>
                <Space>
                    <Search
                        placeholder="Qidiruv..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Real-time qidiruv
                        onSearch={onSearch}
                        enterButton
                    />

                    <Button type="primary" onClick={showAddModal}>
                        Tayor Maxsulot qo‘shish
                    </Button>
                </Space>
            </div>
            {searchLoading ? (
                <div className="flex justify-center my-4">
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin  />}/>
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey="id"
                    bordered
                    loading={loading}
                    onRow={(row)=>({
                        onClick:()=>
                            navigate(`/maxsulotmalumotlari/${row.id}`,{
                                state:{
                                    conserveType:row.conserveType,
                                    quantity:row.readyConserves?.[0]?.quantity || "0"
                                },
                            }),
                    })}
                />
            )}
            <Modal
                title={selectedId ? "Maxsulotni tayyorlashda qo'shiladingan mahsulotlar" : "Maxsulot qo'shish"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Saqlash'
                cancelText='Bekor qilish'
            >
                <div className='space-y-4'>
                    <label>Konserva turi:</label>
                    <Input
                        value={maxsulotNomi}
                        onChange={(e) => setMaxsulotNomi(e?.target?.value)}
                        placeholder='Konserva turini kiriting'
                    />
                </div>
            </Modal>
        </div>

    )
}
export default TayorMaxsultolar;