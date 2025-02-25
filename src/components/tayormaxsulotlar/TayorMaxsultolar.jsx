import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BACKEND_URL } from '../../Common/Constants';

const TayorMaxsultolar = () => {
    const [tayorMaxsulot, setTayorMaxsulotlar] = useState([]);
    const token = localStorage.getItem("token");

    const setTayorMaxsulot = () => {
        axios.get(`${BACKEND_URL}/conserve-type`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setTayorMaxsulotlar(res?.data?.data || []);
                // console.log("data =>",res.data.data[1].readyConserves[0].quantity );

            })
            .catch(err => console.error("Error=>", err));
    };
    useEffect(() => {
        setTayorMaxsulot();
    }, []);
    return (
        <div className='m-auto'>
            <div className='bg-white text-2xl h-12 flex justify-between items-center px-4'>
                <p>Tayyor mahsulotlar</p>
                <button className='bg-blue-400 text-white rounded-xl text-sm px-3 h-10 hover:bg-blue-500'>
                    Tayyor Mahsulot Qo'shish
                </button>
            </div>

            <div>

                <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="bg-gray-100 right-0 text-xl  font-bold">
                            <th scope="col" className="px-6 py-3">No</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Quantity</th>
                            <th scope="col" className="px-6 py-3">Edit</th>
                            <th scope="col" className="px-6 py-3">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tayorMaxsulot?.map((tayor, index) => (
                            <tr key={tayor.id} className="border text-xl  font-bold">
                                <td className="px-6 py-4 ">{index + 1}</td>
                                <td className="px-6 py-4 border-1">{tayor.conserveType}</td>
                                <td className="px-6 py-4 border-1">{tayor?.readyConserves[0]?.quantity ?? 0}</td>
                                <td className="px-6 py-8 border">
                                    <button
                                        className="text-white px-3 py-1 rounded h-12 hover:bg-blue-400 justify-center flex gap-2">
                                        <FaRegEdit className="bg-blue-400 text-[300px] w-full h-full" />
                                        <p className="text-blue-500 text-4xl font-semibold">Edit</p>
                                    </button>
                                </td>
                                <td className="items-center border bg-navy-300">
                                    <button
                                        className="text-white px-4 py-2 rounded-lg h-12 hover:bg-red-700 flex items-center justify-center gap-4 w-full">
                                        <RiDeleteBin6Line className="text-[300px] text-red-500 w-10 h-10" />
                                        <p className="text-red-500 text-2xl font-semibold">Delete</p>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default TayorMaxsultolar;