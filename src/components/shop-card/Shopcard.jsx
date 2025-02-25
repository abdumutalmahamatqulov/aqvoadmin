import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
} from "antd";
import { LeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const Shopcard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [magazin, setMagazin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/Stores/${id}`)
      .then((res) => {
        console.log("Magazin API javobi:", res.data); // SHU YERDA TEKSHIRING
        if (res.data) {
          setMagazin(res.data);
        }
      })
      .catch(() => console.error("Xatolik yuz berdi!"))
      .finally(() => setLoading(false));
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
      {/* Qaytish tugmasi */}
      <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
        Qaytish
      </Button>

      {/* Ma'lumotlar */}
      <Card style={{ marginTop: "10px" }}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Title level={5}>
              <Text strong>Tashkilot nomi:</Text> {magazin?.name || "Noma'lum"}
            </Title>
            <Title level={5}>
  <Text strong>Tashkilot manzili:</Text> {magazin?.location || "Noma'lum"}
</Title>
<Title level={5}>
  <Text strong>Tashkilot telefoni:</Text> {magazin?.contact || "Noma'lum"}
</Title>

          </Col>
          {/* Jami, To'langan va Qarzdorlik bo'limi o'ng tomonda */}
          <Col span={12} style={{ textAlign: "right" }}>
            <Space direction="vertical" size="small">
              <RangePicker />
              <Title level={5}>Jami: 0</Title>
              <Title level={5}>To'langan: 0</Title>
              <Title level={5}>Qarzdorlik: 0</Title>
              {/* Yangi qo'shilgan tugmalar */}
              <Space>
                <Button type="primary">Mahsulotlar tarixini ko‘rish</Button>
                <Button type="primary">Mahsulot qo‘shish</Button>
              </Space>
            </Space>
          </Col>
        </Row>
      </Card>

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
            { title: "Qabul qilingan to‘lov (so‘m)", dataIndex: "paid", key: "paid" },
            { title: "Jami (so‘m)", dataIndex: "total", key: "total" },
            { title: "Topshirilgan vaqti", dataIndex: "deliveredAt", key: "deliveredAt" },
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
          locale={{ emptyText: "Ma'lumot yo‘q" }}
        />
      </Card>

      <Title level={4} style={{ marginTop: "20px" }}>
        Qabul qilingan to‘lovlar
      </Title>
      <Card>
        <Table
          columns={[
            { title: "№", dataIndex: "key", key: "key" },
            { title: "To‘lov summasi (so‘m)", dataIndex: "amount", key: "amount" },
            { title: "To‘lov vaqti", dataIndex: "paidAt", key: "paidAt" },
          ]}
          dataSource={[]} // Hozircha bo'sh
          pagination={false}
          locale={{ emptyText: "Ma'lumot yo‘q" }}
        />
      </Card>
    </div>
  );
};

export default Shopcard;
