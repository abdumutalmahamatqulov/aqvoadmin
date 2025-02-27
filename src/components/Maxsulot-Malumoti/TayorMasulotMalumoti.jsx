import { Button, Card, Col, Empty, Input, Modal, Row, Space, Table } from "antd";
import axios from "axios";
import { BACKEND_URL } from "../../Common/Constants";
import { useEffect, useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useLocation, useParams } from "react-router-dom";

const TayorMaxsulotMalumoti = () => {
    const location = useLocation();
    const navigateData = location.state || {};
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState("Modal tarkibi");
    const { id } = useParams()
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const handleOk = () => {
        setModalText("Yuklanmoqda...");
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    }

    useEffect(() => {

        axios
            .get(`${BACKEND_URL}/conserve-type/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })

            .then((res) => {
                if (res.data && res.data.data) {
                    console.log(res.data.data);

                    setProducts([res.data.data]);
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [id, navigateData]);
    const columns = [
        { title: "№", dataIndex: "id", key: "id", width: 50 },
        { title: "Mahsulot nomi", dataIndex: "conserveType", key: "conserveType " },
        { title: "Miqdori", dataIndex: "quantity", key: "quantity" },
        { title: "Kelgan vaqti", dataIndex: "lastUpdatedAt", key: "lastUpdatedAt" },
        {
            title: "Maxsulot Topshirilganmi?",
            dataIndex: "Biriktirilgan",
            key: "Biriktirilgan",
            render: (text) => (text ? "Ha" : "Yo'q"), // Assuming this is a boolean field
        },
    ];
    return (
        <div style={{ padding: 20 }}>

            <Row justify="space-between" align="middle" >
                <Col>
                    <Link to={"/tayormaxsulotlar"}>
                        <Button type="link" icon={<LeftOutlined />}>
                            Tayyor Masulotlar
                        </Button>
                    </Link>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Space direction="horizontal" size="small">

                        <Button type="primary" onClick={() => navigate(`/maxsulotmalumotlari/${id}`)}>
                            Mahsulot tarixini ko‘rish
                        </Button>
                        <Button type="primary" onClick={showModal}>
                            Mahsulotni tayyorlashda qo'shiladigan mahsulotlar
                        </Button>
                        <Button type="primary">
                            Mahsulot qo‘shish
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Card>
                {/* Jadval */}
                <Table
                    columns={columns}
                    dataSource={products?.length > 0 ? products?.map((item, index) => ({
                        id: index + 1,
                        conserveType: item.conserveType,
                        quantity: item.readyConserves?.[0]?.quantity || "0",
                        lastUpdatedAt: item.lastUpdatedAt,
                        Biriktirilgan: item.readyConserves?.length > 0,
                    })) : []}
                    loading={loading}
                    rowKey="id"
                    pagination={false}
                    locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> }}
                />
            </Card>
            {/* Modal */}
            <Modal
                title="Maxsulotni taxrirlash"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <div className="space-y-4">
                    <div>
                        <label htmlFor=""></label>
                        <Input />
                    </div>
                </div>
            </Modal>
        </div >
    )
}
export default TayorMaxsulotMalumoti;