import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
  RouterProvider,
  useNavigate,
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

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") // Token mavjud bo‘lsa, `true` qilib olamiz
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [localStorage.getItem("token")]); // Token o‘zgarsa, `useEffect` qayta ishlaydi
  console.log(isAuthenticated);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/statistika",
          element: <Statistika />,
        },
        {
          path: "/ombor",
          element: <Ombor />,
        },
        {
          path: "/magazinlar",
          element: <Magazinlar />,
        },
        {
          path: "/hodimlar",
          element: <Hodimlar />,
        },
        {
          path: "/tayormaxsultolar",
          element: <TayorMaxsultolar />,
        },
      ],
    },
  ]);
  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />} />
          <Route
            path="/home"
            element={isAuthenticated ? <Layout /> : <Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
