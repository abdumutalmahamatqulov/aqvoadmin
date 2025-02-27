import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Space,
  Table,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../Common/Constants";

export function OmborInner() {
  const [selectedCat, setSelectedCat] = useState("");
  const [form] = Form.useForm();
  const [narxi, setNarxi] = useState("");
  const [miqdor, setMiqdor] = useState("");
  const [date, setDate] = useState("");
  const [value, setValue] = useState(false);
  const { id } = useParams(); // URL-dagi ID ni olish
  const [category, setCategory] = useState({
    isfetched: false,
    error: null,
    categories: [],
  });

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Nomi",
      dataIndex: "nomi",
      key: "no",
    },
    {
      title: "Miqdori",
      dataIndex: "miqdori",
      key: "no",
    },
    {
      title: "Narxi(So'm)",
      dataIndex: "narxi",
      key: "no",
    },
    {
      title: "Umumiy Narxi(So'm)",
      dataIndex: "umumiynarxi",
      key: "no",
    },
    {
      title: "Kelgan vaqti",
      dataIndex: "kelgan",
      key: "no",
    },
    {
      title: "Amallar",
      key: "amallar",
      render: (_, record) => (
        <Space>
          <button
            // onClick={() => editCategory(record)}
            className="cursor-pointer   flex justify-center items-center hover:text-green-700"
          >
            <CiEdit className="w-[20px] h-[20px]" />
          </button>
        </Space>
      ),
    },
  ];

  // modalka functions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    // setSelectedCat("");
    // setTuri("");
    // setNomi("");
  };

  const onChange = (e) => {
    console.log(setValue(e.target.value, narxi, miqdor));
  };
  const onChangeDate = (dateString) => {
    setDate(dateString);
  };

  // get category

  const token = localStorage.getItem("token");

  const getCategory = () => {
    axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${BACKEND_URL}/categories/${id}`,
    })
      .then((res) =>
        setCategory({
          isfetched: true,
          error: null,
          categories: res?.data?.data,
        })
      )
      .catch((err) =>
        setCategory({
          isfetched: false,
          error: err,
          categories: [],
        })
      );
  };

  useEffect(() => {
    getCategory();
  }, [id]);

  const products = category?.categories?.products;
  const mahsulotNomi = products?.map((item) => {
    item.productName;
  });

  const data1 =
    products?.map((product, index) => ({
      no: index + 1,
      nomi: product.productName,
      miqdori: product.quantity,
      narxi: product.price,
      umumiynarxi: product.totalPrice,
      kelgan: product.createdAt,
      key: product.id,
    })) || [];

  // add mahsulot

  const addCategory = (e) => {
    e.preventDefault();
    axios({
      method: selectedCat ? "PATCH" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      url: `${BACKEND_URL}/products`,
      data: {
        price: narxi,
        productName: mahsulotNomi,
        isMeat: true,
        quantity: value,
        categoryId: id,
        createdAt: date,
      },
    })
      .then((res) => {
        getCategory();
        handleCancel();
        toast.success(
          selectedCat ? "Mahsulot o'zgartirildi!" : "Mahsulot qo'shildi!"
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Xatolik bor!!!");
      });
  };

  // edit qilish

  const editCategory = (cat) => {
    console.log(cat);
    showModal();
    // setSelectedCat(cat);
    // setNomi(cat?.nomi);
    // setTuri(cat?.olchov);
  };

  if (!category.categories) return <p>Yuklanmoqda...</p>;

  return (
    <div className="mr-[20px] ml-[270px] mt-8 ">
      <div className="flex justify-between items-center mb-5">
        <Link to="/ombor">Omborga qaytish</Link>

        <div className="flex items-center gap-6">
          {" "}
          <Input.Search allowClear enterButton placeholder="Basic usage" />
          <div className="modalka">
            <Button type="primary" onClick={showModal}>
              Mahsulot qo'shish
            </Button>
            <Modal
              footer={null}
              title={"Mahsulotni qo'shish"}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form form={form} name="form_item_path" layout="vertical">
                <Form.Item
                  label="Mahsulot narxi"
                  rules={[
                    {
                      required: true,
                      message: "Iltimos, mahsulot narxini kiriting!",
                    },
                  ]}
                >
                  <Input
                    value={narxi}
                    onChange={(e) => setNarxi(e?.target?.value)}
                    placeholder="Masalan, 2000"
                  />
                </Form.Item>
                <Form.Item
                  label="Mahsulot miqdori"
                  rules={[
                    { required: true, message: "Iltimos, miqdor kiriting!" },
                  ]}
                >
                  <Input
                    value={miqdor}
                    onChange={(e) => setMiqdor(e?.target?.value)}
                    placeholder="Masalan, 20"
                  />
                </Form.Item>
                <Form.Item
                  label="Mahsulot keltirilgan sana"
                  rules={[
                    { required: true, message: "Iltimos, sanani kiriting!" },
                  ]}
                >
                  <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={onChangeDate}
                    showTime={{
                      defaultValue: dayjs("00:00:00", "HH:mm:ss"),
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="Ushbu mahsulotda paterya hisoblanadimi"
                  rules={[
                    { required: true, message: "Iltimos, miqdor kiriting!" },
                  ]}
                >
                  <Radio.Group
                    onChange={onChange}
                    value={value}
                    options={[
                      {
                        value: true,
                        label: "Ha",
                      },
                      {
                        value: false,
                        label: "Yo'q",
                      },
                    ]}
                  ></Radio.Group>
                </Form.Item>

                <Form.Item>
                  <Button
                    onClick={addCategory}
                    type="primary"
                    htmlType="submit"
                  >
                    Saqlash
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
      <Table columns={columns} dataSource={data1} scroll={{ x: 900, y: 500 }} />
    </div>
  );
}
