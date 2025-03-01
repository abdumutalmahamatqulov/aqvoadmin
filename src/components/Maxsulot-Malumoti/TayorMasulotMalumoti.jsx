import { Button, Card, Col, Empty, Form, Input, Modal, Row, Select, Space, Table } from "antd";
import axios from "axios";
import { BACKEND_URL } from "../../Common/Constants";
import { useEffect, useState } from "react";
import { DeleteOutlined, LeftOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";

const TayorMaxsulotMalumoti = () => {
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [products, setProducts] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([{ id: Date.now(), type: "", value: "" },]);
    const { id } = useParams();
    const { Option } = Select;
    const [open, setOpen] = useState(false);

    const showModal = () => setOpen(true);
    const handleCancel = () => setOpen(false);

    const addProduct = () => {
        setSelectedProducts([...selectedProducts, { id: Date.now(), type: "", value: "" }]);
    };
    const removeProduct = (id) => {
        setSelectedProducts(selectedProducts.filter((item) => item.id !== id));
    };
    const updateProduct = (id, field, value) => {
        setSelectedProducts(
            selectedProducts.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const handleOk = () => {
        // setModalText("Yuklanmoqda...");
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
    }, [id]);
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
                footer={[
                    <Button key='save' type="primary" onClick={handleOk}>
                        Saqlash
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    {selectedProducts?.map((product, index) => (
                        <Space key={product.id} style={{ display: "flex", marginBottom: 8 }} align="start">
                            {/* Mahsulot turini tanlash */}
                            <Form.Item
                                style={{ width: 200 }}
                                name={`type-${product.id}`}
                                rules={[{ required: true, message: "Miqdor turi maydoni talab qilinadi" }]}
                            >
                                <Select
                                    placeholder="Mahsulot turini tanlang"
                                    style={{ width: 200 }}
                                    value={product.type}
                                    onChange={(value) => updateProduct(product.id, "type", value)}
                                >

                                    {products?.map(item => (

                                        <Select.Option key={item.id} value={item.productName}>
                                            {item.productName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            {/* Qiymat kiritish */}
                            <Form.Item
                                style={{ width: 150 }}
                                name={`value-${product.id}`}
                                rules={[{ required: true, message: "Mahsulot miqdori maydoni talab qilinadi" }]}
                            >

                                <Input
                                    placeholder="Masalan, 200"
                                    type="number"
                                    value={product.value}
                                    onChange={(e) => updateProduct(product.id, "value", e.target.value)}
                                />
                            </Form.Item>

                            {/* O‘chirish tugmasi */}
                            <Button
                                type="text"
                                icon={<DeleteOutlined style={{ fontSize: "15px", color: "red" }} />}
                                onClick={() => removeProduct(product.id)}
                                style={{
                                    borderColor: "red",
                                    borderWidth: "1px",
                                    width: "50px",
                                    height: "36px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            />
                        </Space>
                    ))}

                    {/* Qo‘shish tugmasi */}
                    <Button type="dashed" block onClick={addProduct}>
                        + Qo‘shish
                    </Button>
                </Form>
            </Modal>
        </div >
    )
}
export default TayorMaxsulotMalumoti;