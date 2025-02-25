import { Outlet } from "react-router-dom";
import Headers from "../header/Headers";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Outlet />
        </div>
    );
};

export default Layout;