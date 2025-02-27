import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage";
import Statistika from "./components/statistika/Statistika";
import Ombor from "./components/ombor/Ombor";
import Magazinlar from "./components/magazinlar/Magazinlar";
import Hodimlar from "./components/hodimlar/Hodimlar";
import TayorMaxsultolar from "./components/tayormaxsulotlar/TayorMaxsultolar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Shopcard from "./components/shop-card/Shopcard";
import History from "./components/Maxsulot-tarxi/History";
import HodimlarGet from "./components/hodimlar/HodimlarGet";
import AttendaceTable from "./components/hodimlar/AttendaceTable";

// 🔒 ProtectedRoute komponenti
function ProtectedRoute() {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="statistika" element={<Statistika />} />
            <Route path="ombor" element={<Ombor />} />
            <Route path="magazinlar" element={<Magazinlar />} />
            <Route path="/magazin/:id" element={<Shopcard/>} />
            <Route path="/shop/:id" element={<History/>} />
            <Route path="hodimlar" element={<Hodimlar />} />
            <Route index element ={<HodimlarGet/>}/>
            <Route path="attendance" element={<AttendaceTable/>}/>
            <Route path="tayormaxsulotlar" element={<TayorMaxsultolar />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
