import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../Common/Constants";

function LoginPage(){
    const [phone,setPhone] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const Login = (e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('phone', phone);
        formData.append('password', password);
        axios({
            method: 'post',
            url: `${BACKEND_URL}/auth/sign-in`,
            data: formData,
        }).then((response)=>{
            localStorage.setItem("token", response?.data?.token.accessToken?.token);
            navigate("/");
        });
    };
    return (
        <section className=" pt-[90px] pb-[90px]">

        <div className="container flex justify-center items-center">
            <form class="max-w-sm mx-auto">
                <div class="mb-5">
                    <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your email
                    </label>
                    <input
                        type="text"
                        id="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com"
                        required
                        onChange={(e) => setPhone(e?.target?.value)}
                    />
                </div>
                <div class="mb-5">
                    <label for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your password
                    </label>
                    <input
                        type="password"
                        id="password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        onChange={(e) => setPassword(e?.target?.value)}
                    />
                </div>
                <div class="flex items-start mb-5">
                    <div class="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                    </div>
                    <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
                <button
                    onClick={Login}
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>
    </section>
    )
}
export default LoginPage;