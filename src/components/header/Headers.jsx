import { Link, Outlet } from "react-router-dom";
import { Flex, Layout } from "antd";
import { FiLogOut } from "react-icons/fi";
import { FcStatistics } from "react-icons/fc";
import { PiStorefrontFill } from "react-icons/pi";
import { IoStorefrontOutline } from "react-icons/io5";
import { IoMdPeople } from "react-icons/io";
import { TiThLargeOutline } from "react-icons/ti";
import logo from "../../assets/logo-dac03tgN.png";

const { Header, Sider, Content } = Layout;

const menuItems = [
    { path: "/statistika", icon: <FcStatistics />, label: "Statistika" },
    { path: "/ombor", icon: <PiStorefrontFill />, label: "Ombor" },
    { path: "/magazinlar", icon: <IoStorefrontOutline />, label: "Magazinlar" },
    { path: "/hodimlar", icon: <IoMdPeople />, label: "Hodimlar" },
    { path: "/tayormaxsulotlar", icon: <TiThLargeOutline />, label: "Tayyor Mahsulotlar" }
];

function Headers() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Sider qismi */}
            <Sider width={250} style={{
                height: "100vh",
                backgroundColor: "white",
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
                boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
            }}>
                <div className="flex items-center justify-center p-4">
                    <img src={logo} alt="AQVO Logo" className="h-12" />
                </div>
                <nav className="px-3 py-4">
                    <ul className="space-y-2">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.path} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                                    {item.icon && <span className="mr-2">{item.icon}</span>}
                                    <span className="flex-1 whitespace-nowrap">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </Sider>

            {/* Asosiy qism */}
            <Layout style={{ marginLeft: 250 }}>
                {/* Header */}
                <Header style={{
                    position: "fixed",
                    width: "calc(100% - 250px)",
                    top: 0,
                    right: 0,
                    height: 64,
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    paddingRight: "20px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    zIndex: 1000
                }}>
                    <Link to={"/login"} >
                        <Flex gap="small" wrap>

                            <FiLogOut/>
                            <span>Chiqish</span>
                        </Flex>
                    </Link>
                </Header>

                {/* Kontent qismi */}
                <Content style={{
                    marginTop: 64,
                    padding: 20,
                    backgroundColor: "#f0f2f5",
                    minHeight: "calc(100vh - 64px)"
                }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default Headers;
