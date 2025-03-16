"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { API } from "../../../service/api"
import { toast } from "react-toastify";
import axios from "axios";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/th"; // ต้องมีการ import locale ของไทยก่อน
const Comment = () => {
    dayjs.locale("th"); // ใช้ locale เป็นภาษาไทย
    dayjs.extend(relativeTime);
    const [comments, setComments] = useState([])

    const getComments = async () => {
        try {
            const response = await axios.get(`${API}/comments`)
            setComments(response.data.resultData)
        } catch (error) {
            console.log(error)
            toast.error(error.response.message || "ไม่สามารถเรียกข้อความได้")
        }
    }

    useEffect(() => {
        getComments()
    },[])

    const columns = useMemo(() => [
        {
          header: "ID",
          accessorKey: "id",
        },
        {
          header: "ข้อความ",
          accessorKey: "value",
          cell: ({ getValue }) => (
            <div className="w-64 whitespace-normal break-words">
              {getValue()}
            </div>
          ),
        },
        {
            header: "วันที่สร้าง",
            cell: ({ row }) => (
                <>
                    <p>{dayjs(row.original.created_at).format("DD MMMM YYYY")}</p>
                </>
            ),
          },
      ], []);
      

    const table = useReactTable({
        data: comments,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 5 } },
    });

   return (
         <div>
 
             <div className="overflow-x-auto rounded-lg border border-gray-200">
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
                             <tr
                                 key={row.id}
                                 className="hover:bg-indigo-50 transition-all duration-200"
                             >
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
                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-all duration-200"
                 >
                     Previous
                 </button>
                 <span className="text-gray-600">
                     Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                 </span>
                 <button
                     onClick={() => table.nextPage()}
                     disabled={!table.getCanNextPage()}
                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-all duration-200"
                 >
                     Next
                 </button>
             </div>
         </div>
     );
 }

export default Comment