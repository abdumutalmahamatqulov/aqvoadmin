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

function ProtectedRoute({ element }) {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? element : <Navigate to="/login" replace />;
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
        {/* Login sahifasi */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />

        {/* Faqat token bo‘lsa ochiladi */}
        <Route path="/" element={<ProtectedRoute element={<Layout />} />}>
          <Route path="statistika" element={<Statistika />} />
          <Route path="ombor" element={<Ombor />} />
          <Route path="magazinlar" element={<Magazinlar />} />
          <Route path="hodimlar" element={<Hodimlar />} />
          <Route path="tayormaxsulotlar" element={<TayorMaxsultolar />} />
        </Route>

        {/* Noto‘g‘ri URL bo‘lsa login sahifasiga yo‘naltiramiz */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
