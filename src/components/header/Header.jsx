import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
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

const { Sider, Header, Content } = Layout;

const menuItems = [
  { path: "/statistika", icon: <BarChartOutlined />, label: "Statistika" },
  { path: "/ombor", icon: <ShopOutlined />, label: "Ombor" },
  { path: "/magazinlar", icon: <UserOutlined />, label: "Magazinlar" },
  { path: "/hodimlar", icon: <TeamOutlined />, label: "Hodimlar" },
  { path: "/tayormaxsulotlar", icon: <InboxOutlined />, label: "Tayor mahsulotlar" },
];

const SidebarLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 🌟 Yon panel (Sidebar) */}
      {isAuthenticated && (
        <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
          <div style={{ padding: 16, textAlign: "center" }}>
            <img src={logo} alt="AQVO Logo" style={{ height: 40 }} />
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
            {menuItems.map((item) => (
              <Menu.Item key={item.path} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
              Chiqish
            </Menu.Item>
          </Menu>
        </Sider>
      )}

      {/* 🌟 Asosiy UI qismi */}
      <Layout>
        {isAuthenticated && (
          <Header
            style={{
              padding: "0 16px",
              background: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "16px" }}
            />
            <Button type="primary" onClick={handleLogout} icon={<LogoutOutlined />}>
              Chiqish
            </Button>
          </Header>
        )}

        {/* 🌟 Sahifalar */}
        <Content style={{ margin: "16px", padding: "16px", background: "#fff", borderRadius: "8px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SidebarLayout;
