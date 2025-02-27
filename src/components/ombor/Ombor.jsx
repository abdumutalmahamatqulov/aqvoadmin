import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../Common/Constants";
import { useEffect } from "react";
import { Form, Input, Select, Space, Table, Button, Modal } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Ombor() {
  const [nomi, setNomi] = useState("");
  const [turi, setTuri] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const [form] = Form.useForm();

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
      title: "O'lchov turi",
      dataIndex: "olchov",
      key: "no",
    },
    {
      title: "Amallar",
      key: "amallar",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => editCategory(record)}
            className="cursor-pointer   flex justify-center items-center hover:text-green-700"
          >
            <CiEdit className="w-[20px] h-[20px]" />
          </button>
          <button
            onClick={() => deleteCategory(record.key)}
            className="cursor-pointer  flex justify-center items-center text-red-700 hover:text-red-500"
          >
            <MdOutlineDeleteOutline className="w-[20px] h-[20px]" />
          </button>
        </Space>
      ),
    },
  ];

  const [category, setCategory] = useState({
    isfetched: false,
    error: null,
    categories: [],
  });

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
    setSelectedCat("");
    setTuri("");
    setNomi("");
  };

  // get category

  const token = localStorage.getItem("token");

  const getCategory = () => {
    axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${BACKEND_URL}/categories`,
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
  const quanty = category.categories.map((item) =>
    item.products?.length > 0 ? item.products[0] : { quantity: "0" }
  );

  useEffect(() => {
    getCategory();
  }, []);

  const data1 = category.categories.map((item, index) => {
    return {
      no: index + 1,
      nomi: item?.category,
      miqdori: quanty[index]?.quantity,
      olchov: item?.unit,
      key: item?.id,
    };
  });

  // catogoriya qoshish

  const addCategory = (e) => {
    e.preventDefault();
    axios({
      method: selectedCat ? "PATCH" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      url: `${BACKEND_URL}/categories/${selectedCat ? selectedCat?.key : ""}`,
      data: {
        category: nomi,
        unit: turi,
      },
    })
      .then((res) => {
        getCategory();
        handleCancel();
        toast.success(
          selectedCat ? "Kategoriya o'zgartirildi!" : "Kategoiya qo'shildi!"
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Xatolik bor!!!");
      });
  };

  // edit qilish

  const editCategory = (cat) => {
    showModal();
    setSelectedCat(cat);
    setNomi(cat?.nomi);
    setTuri(cat?.olchov);
  };

  // delete category

  const deleteCategory = (id) => {
    axios({
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${BACKEND_URL}/categories/${id}`,
    })
      .then((res) => {
        getCategory();
        toast.success("Kategoriya o'chirildi");
      })
      .catch((err) => console.log(err));
  };

  // search function

  const onSearch = (value, info) => console.log(info?.source, value);

  if (!category.categories) return <p>Yuklanmoqda...</p>;
  return (
    <div className="mr-[20px] ml-[270px] mt-8 ">
      <div className="flex justify-between items-center mb-5">
        <p>Ombor</p>

        <div className="flex items-center gap-6">
          {" "}
          <Input.Search allowClear enterButton placeholder="Basic usage" />
          <div className="modalka">
            <Button type="primary" onClick={showModal}>
              Kategoriya qo'shish
            </Button>
            <Modal
              footer={null}
              title={selectedCat ? "TAHRIRLASH" : "Kategoriya qo'shish"}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form form={form} name="form_item_path" layout="vertical">
                <Form.Item
                  label="Kategoriya nomi"
                  rules={[
                    {
                      required: true,
                      message: "Iltimos, mahsulot nomini kiriting!",
                    },
                  ]}
                >
                  <Input
                    value={nomi}
                    onChange={(e) => setNomi(e?.target?.value)}
                    placeholder="Masalan, go'sht"
                  />
                </Form.Item>
                <Form.Item
                  label="Miqdor turi"
                  rules={[
                    { required: true, message: "Iltimos, miqdor kiriting!" },
                  ]}
                >
                  <Select
                    value={turi}
                    onChange={(e) => setTuri(e)}
                    required
                    showSearch
                    placeholder="Miqdor turini tanlang"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "KG",
                        label: "Kilogramm",
                      },
                      {
                        value: "DONA",
                        label: "Dona",
                      },
                      {
                        value: "POCHKA",
                        label: "Pochka",
                      },
                      {
                        value: "LITR",
                        label: "Litr",
                      },
                    ]}
                  />
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
      <Table
        onRow={(record) => {
          return {
            onClick: () => {
              window.location.href = `/ombor/${record.key}`;
            },
            style: { cursor: "pointer" }, // Hover effekti uchun
          };
        }}
        columns={columns}
        dataSource={data1}
        scroll={{ x: 900, y: 500 }}
      />
    </div>
  );
}
export default Ombor;
