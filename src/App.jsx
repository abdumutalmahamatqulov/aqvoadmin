import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout/Layout"
import LoginPage from "./pages/LoginPage";
import Statistika from "./components/statistika/Statistika";
import Ombor from "./components/ombor/Ombor";
import Magazinlar from "./components/magazinlar/Magazinlar";
import Hodimlar from "./components/hodimlar/Hodimlar";
import TayorMaxsultolar from "./components/tayormaxsulotlar/TayorMaxsultolar";

function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/statistika',
          element: <Statistika />
        },
        {
          path: '/ombor',
          element: <Ombor />
        },
        {
          path: '/magazinlar',
          element: <Magazinlar />
        },
        {
          path: '/hodimlar',
          element: <Hodimlar />
        },
        {
          path: '/tayormaxsultolar',
          element: <TayorMaxsultolar />
        }
      ]
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;