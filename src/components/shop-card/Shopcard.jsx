import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../Common/Constants";
import { Spin, Card, Button } from "antd";

const Shopcard = () => {
  const { id } = useParams(); // URL-dan ID ni olish
  const navigate = useNavigate(); // Navigatsiya uchun
  const [magazin, setMagazin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/Stores/${id}`)
      .then((res) => {
        setMagazin(res.data);
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
    <>
      <Card title={magazin?.name}>
        <Button 
          type="default" 
          onClick={() => navigate(-1)} 
          style={{ marginBottom: "10px" }}
        >
          🔙 Qaytish
        </Button>
        <p><strong>Tashkilot nomi:</strong> {magazin?.name}</p>
        <p><strong>Tashkilot manzili:</strong> {magazin?.address}</p>
        <p><strong>Tashkilot telefoni:</strong> {magazin?.phone}</p>
      </Card>
    </>
  );
};

export default Shopcard;
