import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../Common/Constants";
import {
  Card,
  Button,
  Spin,
  Table,
  Typography,
  Space,
  DatePicker,
  Row,
  Col,
  Modal,
  Input,
  Empty,
  message,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const Shopcard = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigateData = location.state || {};
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [shopcard, setShop] = useState(navigateData);
  const [magazin, setMagazin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Modal tarkibi");
  const navigate = useNavigate();

  const [productType, setProductType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [paid, setPaid] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    setModalText("Yuklnamoqda ....");
    setConfirmLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/store-item`,
        {
          storeId: id,
          conserveType: productType,
          quantity: quantity,
          price: price,
          paid: paid,
          deliveredAt: deliveryTime,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Serverdan kelgan javob:", response.data);
      message.success("Mahsulot muvaffaqiyatli qoʻshildi!");
      setOpen(false);
      fetchData(); // Ma'lumotlarni yangilash
    } catch (err) {
      console.error("Xatolik yuz berdi!", err.response?.data || err.message);
      message.error("Xatolik yuz berdi!");
    } finally {
      setConfirmLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const storeItemsResponse = await axios.get(`${BACKEND_URL}/store-item/store/${id}?page=1&limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Store Items API Response:", storeItemsResponse.data);
      setMagazin(storeItemsResponse.data.data);

      const storeResponse = await axios.get(`${BACKEND_URL}/Stores/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Store API Response:", storeResponse.data);
      setShop(storeResponse.data);
    } catch (err) {
      console.error("Xatolik yuz berdi!", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, token]);

  if (loading) {
    return (
      <div className="flex justify-center my-4">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Link to={"/magazinlar"}>
        <Button type="link" icon={<LeftOutlined />}>
          Qaytish
        </Button>
      </Link>

      <Card style={{ marginTop: "10px" }}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Title level={5}>
              <Text strong>Tashkilot nomi:</Text> {shopcard?.name || "Noma'lum"}
            </Title>
            <Title level={5}>
              <Text strong>Tashkilot manzili:</Text>{" "}
              {shopcard?.address || "Noma'lum"}
            </Title>
            <Title level={5}>
              <Text strong>Tashkilot telefoni:</Text>{" "}
              {shopcard?.phone || "Noma'lum"}
            </Title>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Space direction="vertical" size="small">
              <RangePicker />
              <Title level={5}>Jami: {magazin?.allTotalPrices || "0"}</Title>
              <Title level={5}>To'langan: {magazin?.totalPaidAmount || "0"}</Title>
              <Title level={5}>Qarzdorlik: {magazin?.totalDebt || "0"}</Title>
              <Space>
                <Button type="primary" onClick={() => navigate(`/shop/${id}`)}>
                  Mahsulotlar tarixini ko‘rish
                </Button>
                <Button type="primary" onClick={showModal}>
                  Mahsulot qo‘shish
                </Button>
              </Space>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Modal */}
      <Modal
        title="Mahsulot qo‘shish"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="space-y-4">
          <div>
            <label>Mahsulot turi</label>
            <Input value={productType} onChange={(e) => setProductType(e.target.value)} />
          </div>
          <div>
            <label>Mahsulot soni</label>
            <Input value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <div>
            <label>Narxi</label>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div>
            <label>Qabul qilingan to'lov</label>
            <Input value={paid} onChange={(e) => setPaid(e.target.value)} />
          </div>
          <div>
            <label>Topshirish vaqtini tanlang</label>
            <Input value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} />
          </div>
        </div>
      </Modal>

      {/* Mahsulotlar ro‘yxati */}
      <Title level={4} style={{ marginTop: "20px" }}>
        Yetkazilgan mahsulotlar
      </Title>
      <Card>
        <Table
          columns={[
            { title: "№", dataIndex: "id", key: "id" },
            { title: "Mahsulot nomi", dataIndex: "conserveType", key: "conserveType" },
            { title: "Soni", dataIndex: "quantity", key: "quantity" },
            { title: "Narxi (so‘m)", dataIndex: "price", key: "price" },
            { title: "Qabul qilingan to‘lov (so‘m)", dataIndex: "paid", key: "paid" },
            { title: "Jami (so‘m)", dataIndex: "total", key: "total" },
            { title: "Topshirilgan vaqti", dataIndex: "deliveredAt", key: "deliveredAt" },
          ]}
          dataSource={Array.isArray(magazin) ? magazin.map((item, index) => ({
            id: index + 1,
            conserveType: item.conserveType,
            quantity: item.quantity,
            price: item.price,
            paid: item.paid,
            total: item.total,
            deliveredAt: item.deliveredAt,
          })) : []}
          pagination={false}
          locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> }}
        />
      </Card>
      <Title level={4} style={{ marginTop: "20px" }}>
        Qabul qilingan to‘lovlar
      </Title>
      <Card>
        <Table
          columns={[
            { title: "№", dataIndex: "id", key: "id" },
            { title: "To‘lov summasi (so‘m)", dataIndex: "allTotalPrices", key: "allTotalPrices" },
            { title: "To‘lov vaqti", dataIndex: "paidAt", key: "paidAt" },
          ]}
          dataSource={[]} // Hozircha bo'sh
          pagination={false}
          locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> }}
        />
      </Card>
    </div>
  );
};

export default Shopcard;