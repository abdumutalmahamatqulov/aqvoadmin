import axios from 'axios';
import React from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BACKEND_URL } from '../../Common/Constants';

const TayorMaxsultolar=() =>{
    const token = localStorage.getItem("access_token");
    console.log("token=>",token);

    // const setTayorMaxsulot = ()=>{
    //     axios.get(`${BACKEND_URL}/store-item-history`)
    // }
    
    return (
        <div className='m-auto'>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="bg-gray-100 right-0 text-xl  font-bold">
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Image</th>
                            <th scope="col" className="px-6 py-3">Text</th>
                            <th scope="col" className="px-6 py-3">Edit</th>
                            <th scope="col" className="px-6 py-3">Delete</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {cities?.map((city) => (
                            <tr key={city.id} className="border text-xl  font-bold">
                                <td className="px-6 py-4 ">{city.name}</td>
                                <td className="px-6 py-4 border">
                                    <img src={`${BACKEND_URL}/uploads/images/${city.image_src}`} alt="City" className="max-w-xs max-h-[40px] object-contain" />
                                </td>
                                <td className="px-6 py-4">{city.text}</td>
                                <td className="px-6 py-8 border">
                                    <button
                                        //onClick={() => editCity(city)}
                                        className="text-white px-3 py-1 rounded h-12 hover:bg-red-700 justify-center flex gap-2">
                                        <FaRegEdit className="bg-blue-400 text-[300px] w-full h-full" />
                                        <p className="text-blue-500 text-4xl font-semibold">Edit</p>
                                    </button>
                                </td>
                                <td className="items-center border bg-navy-300">
                                    <button
                                        //onClick={() => deleteCity(city)}
                                        className="text-white px-4 py-2 rounded-lg h-12 hover:bg-red-700 flex items-center justify-center gap-4 w-full">
                                        <RiDeleteBin6Line className="text-[300px] text-red-500 w-10 h-10" />
                                        <p className="text-red-500 text-2xl font-semibold">Delete</p>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody> */}
                </table>
        </div>
    )
}
export default TayorMaxsultolar;