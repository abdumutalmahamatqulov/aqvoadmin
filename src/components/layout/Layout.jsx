import { Outlet } from "react-router-dom";
import Header from "../header/Header";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
        </div>
    );
};

export default Layout;