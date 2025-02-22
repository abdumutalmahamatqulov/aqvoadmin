import { Link } from "react-router-dom";
import React from 'react';
import { FcStatistics } from "react-icons/fc";
import { PiStorefrontFill } from "react-icons/pi";
import { IoStorefrontOutline } from "react-icons/io5";
import { IoMdPeople } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import logo from '../../assets/logo-dac03tgN.png';

function Header() {
    return (
        <div className="flex h-screen">

            <aside id="default-sidebar" className="fixed z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="flex items-center mb-6 p-2">
                    <img src={logo} alt="AQVO Logo" className="h-10 mr-2" />
                </div>
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to={"/statistika"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FcStatistics />
                                <span className="ms-3">Statistika</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/ombor"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <PiStorefrontFill />
                                <span className="flex-1 ms-3 whitespace-nowrap">Ombor</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/magazinlar"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <IoStorefrontOutline />
                                <span className="flex-1 ms-3 whitespace-nowrap">Magazinlar</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/hodimlar"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <IoMdPeople />
                                <span className="flex-1 ms-3 whitespace-nowrap">Hodimlar</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/tayormaxsultolar"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="flex-1 ms-3 whitespace-nowrap">Tayor Maxsultolar</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="flex-1 ml-64">
                <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
                    <button className="text-gray-700 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                    <div className="flex items-center space-x-4">
                        <Link to={"/login"} className="flex items-center space-x-2 text-red-500 hover:text-red-700">
                            <FiLogOut className="text-xl" />
                            <span>Chiqish</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    )
}
export default Header;