import React, { useState } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, Button, Modal } from 'antd';

const { Search } = Input;

const onSearch = (value) => console.log("Qidiruv natijasi:", value);

const Magazinlar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-around w-full h-[60px] mt-[20px] px-[25px]">
      <p>Magazinlar</p>
      {/* <div className='w-[300px]'> */}

      <Search placeholder="Qidiruv..." onSearch={onSearch} enterButton  />

      <Button type="primary" onClick={showModal} >
        Magazin qo'shish
      </Button>
      {/* </div> */}

      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Modal tarkibi...</p>
        <p>Qo'shimcha ma'lumot...</p>
        <p>Boshqa ma'lumot...</p>
      </Modal>
    </div>
  );
};

export default Magazinlar;
