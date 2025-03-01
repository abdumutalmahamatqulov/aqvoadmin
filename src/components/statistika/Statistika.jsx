import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Select, Input, Button, Table } from 'antd';
import { LineChartOutlined, ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import axios from 'axios';

const { Option } = Select;

const Statistika = () => {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [stats, setStats] = useState({ ishlabChiqarilgan: 0, sotilgan: 0, tushum: 0 });
  
  useEffect(() => {
    axios.get('https://your-backend-api.com/statistika')
      .then(response => {
        setData(response.data.chartData);
        setTableData(response.data.tableData);
        setTotalExpense(response.data.totalExpense);
        setStats({
          ishlabChiqarilgan: response.data.ishlabChiqarilgan,
          sotilgan: response.data.sotilgan,
          tushum: response.data.tushum,
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const columns = [
    { title: 'Resurs Nomi', dataIndex: 'resursNomi', key: 'resursNomi' },
    { title: 'Miqdori (kg)', dataIndex: 'miqdori', key: 'miqdori' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Analitika Bo'limi</h2>
      
      <Row gutter={16}>
        <Col span={8}>
          <Card style={{ textAlign: 'center' }}>
            <LineChartOutlined style={{ fontSize: '50px', color: 'gold' }} />
            <h3>Ishlab Chiqarilgan</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.ishlabChiqarilgan}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ textAlign: 'center' }}>
            <ShoppingCartOutlined style={{ fontSize: '50px', color: 'blue' }} />
            <h3>Sotilgan</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.sotilgan}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ textAlign: 'center' }}>
            <DollarOutlined style={{ fontSize: '50px', color: 'green' }} />
            <h3>Umumiy Tushum</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.tushum} so'm</p>
          </Card>
        </Col>
      </Row>
      
      <Card style={{ marginTop: '20px' }}>
        <h3>Resurs Hisoboti</h3>
        <p>Mahsulotni tanlang</p>
        <Select defaultValue="reerbeka" style={{ width: '100%' }}>
          <Option value="reerbeka">Reerbeka</Option>
          <Option value="boshqa">Boshqa</Option>
        </Select>
        <p style={{ marginTop: '10px' }}>Mahsulot miqdorini kiriting</p>
        <Input placeholder="Miqdor" type="number" />
        <Button type="primary" style={{ marginTop: '10px', width: '100%' }}>
          Hisobotni Ko'rish
        </Button>
      </Card>
      
      <Card style={{ marginTop: '20px' }}>
        <h3>Sarflangan resurslar diagrammasi</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} />
            <Legend />
            <Bar dataKey="resurslar" fill="#40a9ff" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      
      <Card style={{ marginTop: '20px' }}>
        <h3>Sarflangan resurslar jadvali:</h3>
        <Table dataSource={tableData} columns={columns} pagination={{ pageSize: 5 }} />
        <p style={{ marginTop: '10px', fontWeight: 'bold', textAlign: 'right' }}>Umumiy chiqim: {totalExpense} so'm</p>
      </Card>
    </div>
  );
};

export default Statistika;
