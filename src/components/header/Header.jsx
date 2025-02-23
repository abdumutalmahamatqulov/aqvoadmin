import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BarChartOutlined,
  ShopOutlined,
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import logo from "../../assets/logo-dac03tgN.png";

const { Sider } = Layout;

const menuItems = [
  { path: "/statistika", icon: <BarChartOutlined />, label: "Statistika" },
  { path: "/ombor", icon: <ShopOutlined />, label: "Ombor" },
  { path: "/magazinlar", icon: <UserOutlined />, label: "Magazinlar" },
  { path: "/hodimlar", icon: <TeamOutlined />, label: "Hodimlar" },
  { path: "/tayormaxsulotlar", icon: <InboxOutlined />, label: "tayormaxsulotlar" },
];

const Header = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <Layout>
      {isAuthenticated && (
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" style={{ padding: 16, textAlign: "center" }}>
            <img src={logo} alt="AQVO Logo" style={{ height: 40 }} />
          </div>
          <Menu theme="dark" mode="inline">
            {menuItems.map((item, index) => (
              <Menu.Item key={index} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
              Chiqish
            </Menu.Item>
          </Menu>
        </Sider>
      )}

      <Layout>
        {isAuthenticated && (
          <Layout.Header // `Header` ni bevosita chaqiramiz
            style={{
              padding: 0,
              background: "#fff",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Layout.Header>
        )}
      </Layout>
    </Layout>
  );
};

export default Header;
