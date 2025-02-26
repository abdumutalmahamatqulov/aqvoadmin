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
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
// import PhoneInput from "react-phone-input-2";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const Shopcard = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigateData = location.state || {};
  const [shopcard, setShop] = useState(navigateData);
  const [magazin, setMagazin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Modal tarkibi");
  const navigate = useNavigate();
  // console.log(navigate);
  const showModal = () => {
    setOpen(true);
  };

  // Modalni yopish funksiyasi
  const handleCancel = () => {
    setOpen(false);
  };

  // Modalni tasdiqlash funksiyasi
  const handleOk = () => {
    setModalText("Yuklnamoqda ....");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (!navigateData.name) {
      axios
        .get(`${BACKEND_URL}/Stores/${id}`)
        .then((res) => setMagazin(res.data))
        .catch((err) => console.error("Xatolik yuz berdi!", err));
    }
  }, [id, navigateData]);

  useEffect(() => {
    // Tashkilot ma’lumotlarini olish
    axios
      .get(`${BACKEND_URL}/Stores/${id}`)
      .then((res) => {
        console.log("Magazin API javobi:", res.data);
        if (res.data) {
          setMagazin(res.data);
        }
      })
      .catch((err) => console.error("Xatolik yuz berdi!", err))
      .finally(() => setLoading(false));

    // Mahsulotlar ro‘yxatini olish
    axios
      .get(`${BACKEND_URL}/Stores/${id}`)
      .then((res) => {
        console.log("Mahsulotlar API javobi:", res.data);
        if (res.data) {
          setProducts(res.data);
        }
      })
      .catch((err) => console.error("Mahsulotlarni yuklashda xatolik:", err));
  }, [id]);

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
              <Title level={5}>Jami: {shopcard?.allTotalPrices || "0"}</Title>
              <Title level={5}>To'langan: 0</Title>
              <Title level={5}>Qarzdorlik: 0</Title>
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
            <Input />
          </div>
          <div>
            <label>Mahsulot soni</label>
            <Input />
          </div>
          <div>
            <label>Narxi</label>
            <Input />
          </div>
          <div>
            <label>Qabul qilingan to'lov</label>
            <Input />
          </div>
          <div>
            <label>Topshirish vaqtini tanlang</label>
            <Input />
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
            { title: "№", dataIndex: "key", key: "key" },
            { title: "Mahsulot nomi", dataIndex: "name", key: "name" },
            { title: "Soni", dataIndex: "quantity", key: "quantity" },
            { title: "Narxi (so‘m)", dataIndex: "price", key: "price" },
            {
              title: "Qabul qilingan to‘lov (so‘m)",
              dataIndex: "paid",
              key: "paid",
            },
            { title: "Jami (so‘m)", dataIndex: "total", key: "total" },
            {
              title: "Topshirilgan vaqti",
              dataIndex: "deliveredAt",
              key: "deliveredAt",
            },
          ]}
          dataSource={products.map((item, index) => ({
            key: index + 1,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            paid: item.paid,
            total: item.total,
            deliveredAt: item.deliveredAt,
          }))}
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
            { title: "№", dataIndex: "key", key: "key" },
            {
              title: "To‘lov summasi (so‘m)",
              dataIndex: "amount",
              key: "amount",
            },
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
