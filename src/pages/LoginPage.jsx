import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../Common/Constants";
import logo from "../../src/assets/logo-dac03tgN.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginPage() {
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();

    let formattedPhone = phone.startsWith("+998") ? phone : `+998${phone}`;

    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/sign-in`,
        {
          phoneNumber: formattedPhone,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "Login muvaffaqiyatli:",
        response?.data?.data?.tokens?.access_token
      );
      localStorage.setItem("token", response?.data?.data?.tokens?.access_token);
      navigate("/statistika");
    } catch (error) {
      if (error.response) {
        "Data:", error.response.data;
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Xato:", error.message);
      }
    }
  };

  return (
    <section className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="AQVO Logo" className="h-10" />
        </div>
        <form onClick={Login}>
          <div class="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Telefon raqami
            </label>
            <div className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="bg-gray-200 px-3 py-2 flex items-center">
                🇺🇿 +998
              </span>
              <input
                type="tel"
                id="text"
                class="flex-1 p-2 focus:outline-none"
                placeholder="99 999 99 99"
                value={phone}
                onChange={(e) => setPhone(e?.target?.value)}
                required
              />
            </div>
          </div>
          <div class="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Parol
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                onChange={(e) => setPassword(e?.target?.value)}
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
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
export default LoginPage;
