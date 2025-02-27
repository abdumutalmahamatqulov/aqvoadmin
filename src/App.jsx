import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage";
import Statistika from "./components/statistika/Statistika";
import Ombor from "./components/ombor/Ombor";
import Magazinlar from "./components/magazinlar/Magazinlar";
import Hodimlar from "./components/hodimlar/Hodimlar";
import TayorMaxsultolar from "./components/tayormaxsulotlar/TayorMaxsultolar";
import { ToastContainer, toast } from "react-toastify";
import { OmborInner } from "./components/omborInner/OmborInner";
function App() {
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
          path: "/ombor/:id",
          element: <OmborInner />,
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
          path: "/tayormaxsulotlar",
          element: <TayorMaxsultolar />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
