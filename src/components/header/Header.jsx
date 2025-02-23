import { Link } from "react-router-dom";
import React from 'react';
import { FcStatistics } from "react-icons/fc";
import { PiStorefrontFill } from "react-icons/pi";
import { IoStorefrontOutline } from "react-icons/io5";
import { IoMdPeople } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import logo from '../../assets/logo-dac03tgN.png';
import { TiThLargeOutline } from "react-icons/ti";

const menuItems = [
    { path: "/statistika", icon: <FcStatistics />, label: "Statistika" },
    { path: "/ombor", icon: <PiStorefrontFill />, label: "Ombor" },
    { path: "/magazinlar", icon: <IoStorefrontOutline />, label: "Magazinlar" },
    { path: "/hodimlar", icon: <IoMdPeople />, label: "Hodimlar" },
    { path: "/tayormaxsulotlar", icon: <TiThLargeOutline />, label: "Tayyor Maxsulotlar" }
];

function Header() {

    return (
        <div className="flex">
            <aside id="default-sidebar" className="fixed z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="flex items-center mb-6 p-2">
                    <img src={logo} alt="AQVO Logo" className="h-12 mr-4 " />
                </div>
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 ">
                    <ul className="space-y-2 font-medium">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.path} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    {item.icon && <span className="mr-2 group-focus:text-blue-500 group-active:text-blue-500">
                                        {item.icon}
                                    </span>}
                                    <span className="flex-1 whitespace-nowrap group-focus:text-blue-500 group-active:text-blue-500">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
            <div className="flex-1 ml-64">
                <nav className="bg-white shadow-md px-6 py-4 flex justify-end items-center">
                    <div className="flex items-center space-x-4 border rounded-xl w-28 h-[40px] hover:text-blue-400">
                        <Link to={"/login"} className="ml-2 flex items-center space-x-2 text-black-400">
                            <FiLogOut className="text-xl " />
                            <span>Chiqish</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    )
}
export default Header;