'use client';
import React, { useEffect, useState } from 'react';
import LoadComponent from '@/app/component/loading';
import Swal from 'sweetalert2'
import Router from "next/router"



export default function page() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    author: '',
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  function sendProps(id: number){
    Router.push( ""
    )
  }
  const postData = async () => {
    setLoading(true)
    try {
      const apiUrl = 'https://testcasefe2023.ignorelist.com/api/v1/data';
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'NIM': '202110370311178',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false)
      // Handle the response as needed
      console.log('Data posted successfully:', data);
      setFormData({
        title: '',
        description: '',
        price: '',
        author: '',
      })
      if(data['message'] == "Success"){
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Data Berhasil Di Tambahkan"
        });
      }else{
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "warning",
          title: "error dengan status : " + data["message"]
        });
      }
    } catch (error) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: error || ""
      });
      console.error('Error posting data : ', error);
    }finally{
      setLoading(false)
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    postData();
  };
  
  return (
    <div className='flex flex-col  w-2/4 h-full '>
        <h1 className='text-2xl pb-2'>Tambah buku</h1>
    <div className='p-6 flex flex-col items-center rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full h-4/6'>
    <div className="relative z-0 w-full mb-5 group">
      <input type="email" name="title" id="title" onChange={handleInputChange} className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={formData.title} required />
      <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Judul</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <textarea rows={5} name="description" id="description" onChange={handleInputChange} className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={formData.description}required />
      <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Deskripsi</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="number" name="price" id="price" onChange={handleInputChange} className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={formData.price} required />
      <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Harga</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="email" name="author" onChange={handleInputChange} id="author" className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={formData.author} required />
      <label htmlFor="author" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Penulis</label>
  </div>

  <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-0 border-blue-700 active:border-b-4 hover:border-blue-500 rounded">
  Update
</button>
{loading ? (
        <LoadComponent/>
        ) : (
          <>
            
          </>
        )}
      </div>
      </div>

  )
}
