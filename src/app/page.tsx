'use client';

import React, { useEffect, useState } from 'react';
import ListBook from '@/app/component/list_book';
import LoadComponent from '@/app/component/loading';
import Swal from 'sweetalert2'

export interface Books {
  message: string;
  data:    Datum[] | undefined;
}

export interface Datum {
  id:          number;
  title:       string;
  description: string;
  price:       number;
  author:      string;
}


export default function Home() {
  const [books, setBooks] = useState<Books>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const apiUrl = 'https://testcasefe2023.ignorelist.com/api/v1/data';
      const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'NIM': '202110370311178',
          "X-Requested-With": "XMLHttpRequest"
        },
      });
      const data = await res.json();

      if (data != null) {
        setBooks(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refetchData = () => {
    setLoading(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []); 
  return (
    <div className='flex flex-col  w-2/4 h-full'>
        <h1 className='text-2xl pb-2'>Daftar Buku</h1>
        <p className='pb-2'>Jumlah buku tersedia : {books?.data?.length}</p>
        <button onClick={()  => window.location.href= "/add-book"} className="bg-blue-600 hover:bg-blue-500 cursor-pointer text-white  py-2 px-4 rounded-lg inline-flex items-center w-1/4 m-2 ms-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg mr-4" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
        </svg>
          <span>Tambah Buku</span>
        </button>
    <div className=' rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
    {loading ? (
      <LoadComponent/>
      ) : (
        <>
          
        </>
      )}
      <ListBook books={books?.data || []} refetchData={refetchData}/>
    </div>
        
    </div>
  );
}