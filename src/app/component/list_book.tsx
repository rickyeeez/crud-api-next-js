
import React from 'react';
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
interface Book {
  id: number;
  title: string;
  description: string;
  price: number;
  author: string;
}

interface ListBookProps {
  books: Book[],
  refetchData: () => void
}

const ListBook: React.FC<ListBookProps> = ({ books,refetchData }) => {
  const router = useRouter()

  const deleteData = async (id : number) => {
    try {
      Swal.fire({
        title: "Apakah anda yakin ?",
        text: "Ingin menghapus data buku ini ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const apiUrl = 'https://testcasefe2023.ignorelist.com/api/v1/data/' + id.toString();
          const res = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
              'NIM': '202110370311178',
              "X-Requested-With": "XMLHttpRequest"
            },
          });
          refetchData()
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
            title: "Data Berhasil Di Hapus"
          });
        }
      });
      
    } catch (err) {
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
        title: err || ""
      });
      return null;
    }
  };

  const postData = (id : string) =>{
      router.push("/edit-book/" + id)
  }
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead>
        <tr>
        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            No
          </th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Judul
          </th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Deskripsi
          </th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Harga
          </th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Penulis
          </th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Aksi
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
        {books.length != 0 ? (
    books.map((book,index) => (
      <tr key={book.id} className="odd:bg-white text-sm odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <td className="px-6 py-4 whitespace-nowrap dark:text-white">{index+1}</td>
        <td className="px-6 py-4 whitespace-nowrap dark:text-white">{book.title}</td>
        <td className="px-6 py-4">{book.description}</td>
        <td className="px-6 py-4">{new Intl.NumberFormat("en-US", {style: "currency", currency: "IDR"}).format(book.price)}</td>
        <td className="px-6 py-4">{book.author}</td>
        <td className="px-6 py-4 flex flex-col">
        <button onClick={()=>postData(book.id.toString())} className="bg-transparent  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 mb-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Update
        </button>
        <button onClick={()=>deleteData(book.id)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Delete
        </button>

        </td>
      </tr>
    ))
        ) : (
          <tr>
<td className="px-6 py-4 text-center" colSpan={5}>
  Data Kosong
</td>
          </tr>

        )}
        
      </tbody>
    </table>
    
  );
  
};

export default ListBook;
