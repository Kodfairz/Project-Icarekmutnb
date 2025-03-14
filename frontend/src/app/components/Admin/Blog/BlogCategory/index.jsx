"use client";

import { useState, useMemo, useEffect } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";
import axios from "axios";
import { API } from "../../../../service/api";
import AddBlogCategory from "./AddBlogCategory";
import { toast } from "react-toastify";
import EditBlogCategory from "./EditBlogCategory";

export default function CategoryBlog() {

  const [data, setData] = useState([]);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false)
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false)
  const [Id, setId] = useState("")



  const getCategory = async () => {
    try {
      const response = await axios.get(`${API}/category/`)
      setData(response.data.resultData)
    } catch (error) {
      console.log(error)
    }
  }

  const addCategory = async (input) => {
    try {
      const response = await axios.post(`${API}/category/`, {
        "name" : input.name
      })
      toast.success(response.data.message)
      getCategory()
      setIsModalOpenAdd(false)
    } catch (error) {
      console.log(error)
      toast.error(error.response.message || "ไม่สามารถเพิ่มประเภคโรค");
    }
  }

  const editCategory = async (input) => {
    try {
      const response = await axios.put(`${API}/category/${Id}`, {
        "name" : input.name
      })
      toast.success(response.data.message)
      setIsModalOpenEdit(false)
      getCategory()
    } catch (error) {
      console.log(error)
      toast.error(error.response.message || "ไม่สามารถแก้ไขประเภคโรค");
    }
  }

  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(`${API}/category/${id}`)
      toast.success(response.data.message)
      getCategory()
    } catch (error) {
      console.log(error)
      toast.error(error.response.message || "ไม่สามารถลบประเภทโรค")
    }
  }

  useEffect(() => {
    getCategory()
  },[])

  const columns = useMemo(
    () => [
        { header: "ไอดี", accessorKey: "id" },
        { header: "ชื่อ", accessorKey: "name" },
        {
            header: "เครื่องมือ",
            id: "actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            setIsModalOpenEdit(true);
                            setId(row.original.id);
                        }}
                        className="px-3 py-1 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all duration-200 transform hover:scale-105"
                    >
                        แก้ไข
                    </button>
                   <button
                        onClick={() => deleteCategory(row.original.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 transform hover:scale-105"
                    >
                        ลบ
                    </button>
                </div>
            ),
        },
    ],
    []
);

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">จัดการประเภทโรค</h2>
        <button
          onClick={() => {
            setIsModalOpenAdd(true)
          }}
          className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
        >
          เพิ่มประเภทโรค
        </button>

        {isModalOpenAdd && <AddBlogCategory onClose={() => setIsModalOpenAdd(false)} onSubmit={addCategory} />}
          {isModalOpenEdit && <EditBlogCategory onClose={() => setIsModalOpenEdit(false)} onSubmit={editCategory} id={Id} />}
      

     
      <div className="overflow-x-auto rounded-lg border border-gray-200 mt-6 shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-4 text-left font-semibold text-sm uppercase tracking-wider"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-indigo-50 transition-all duration-200">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4 text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
      <div className="mt-6 flex flex-wrap gap-4 justify-between items-center">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-all duration-200 transform hover:scale-105"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-all duration-200 transform hover:scale-105"
        >
          Next
        </button>
      </div>
    </div>
  );
}
