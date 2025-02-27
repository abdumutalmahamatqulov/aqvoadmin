import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../Common/Constants";
import logo from "../../src/assets/logo-dac03tgN.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 🎨 Toast dizayni uchun
import { message } from "antd";

function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formatPhone = (input) => {
    let cleaned = input.replace(/\D/g, "");
    if (cleaned.startsWith("998")) {
      return `+${cleaned}`;
    } else if (cleaned.length === 9) {
      return `+998${cleaned}`;
    }
    return input;
  };

  const Login = async (e) => {
    e.preventDefault();
    let formattedPhone = formatPhone(phone);

    // toast.info("Ma'lumotlar yuborilmoqda... ⏳", { autoClose: 2000 });
    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/sign-in`,
        { phoneNumber: formattedPhone, password: password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Server javobi:", response.data);

      const accessToken = response?.data?.data?.tokens?.access_token; // ✅ TO‘G‘RI YO‘L
      console.log("Olingan token:", accessToken);

      if (!accessToken) {
        throw new Error("Token kelmadi!");
      }

      localStorage.setItem("token", accessToken);
      message.success("Royhatdan o'tdingiz"), { autoClose: 500 };

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Login xatosi:", error);

      if (error.response) {
        toast.error(error.response.data.message || "Login yoki parol xato! ❌");
      } else if (error.request) {
        toast.error("Server bilan aloqa yo‘q! ❌");
      } else {
        toast.error("Noma'lum xatolik! ❌");
      }
    }
  };

  return (
    <section className="h-screen flex justify-center items-center bg-gray-100">
      <ToastContainer position="top-right" theme="colored" />

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="AQVO Logo" className="h-10" />
        </div>

        <form onSubmit={Login}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Telefon raqami
            </label>
            <div className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="bg-gray-200 px-3 py-2 flex items-center">
                🇺🇿 +998
              </span>
              <input
                type="tel"
                className="flex-1 p-2 focus:outline-none"
                placeholder="99 999 99 99"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Parol
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Kirish
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
