"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";
import { API } from "../../../../service/api";
import { toast } from "react-toastify";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/th"; // ต้องมีการ import locale ของไทยก่อน
import Switch from "react-switch"; // นำเข้าคอมโพเนนต์ switch

const VideoManagement = () => {
  const router = useRouter()
  dayjs.locale("th"); // ใช้ locale เป็นภาษาไทย
  dayjs.extend(relativeTime);

  const [video, setVideo] = useState([])

  const getVideo = async () => {
    try {
      const response = await axios.get(`${API}/video`)
      setVideo(response.data.resultData)
    } catch (error) {
      console.log(error)
      toast.error(error.response.message || "ไม่สามารถเรียกวิดีโอได้")
    }
  }

  const deleteVideo = async (id) => {
     try {
      const response = await axios.delete(`${API}/video/${id}`)
      toast.success(response.data.message || "ลบวิดีโอสำเร็จ")
      getVideo()
     } catch (error) {
      console.log(error)
      toast.error(error.response.message || "ไม่สามารถลบวิดีโอได้")
     }
  }

  const changeStatusVideo = async (id, isActive) => {
    try {
      const response = await axios.patch(`${API}/video/change-status/${id}`, {
        isActive : isActive
      })
      toast.success(response.data.message || "เปลี่ยนแปลงสถานะสำเร็จ")
      getVideo()
    } catch (error) {
      console.log(error)
      toast.error(error.response.message || "ไม่สามารถเปลี่ยนแปลงสถานะได้")
    }
  }

  useEffect(() => {
    getVideo()
  },[])

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "id",
      },
      {
        header: "หน้าปก",
        cell: ({ row }) => (
          <>
            <img
              src={row.original.thumbnail_url}
              alt={row.original.title}
              className="w-24 rounded-2xl"
            />
          </>
        ),
      },
      {
        header: "หัวข้อ",
        accessorKey: "title",
      },
      {
        header: "วันที่สร้าง",
        cell: ({ row }) => (
          <>
            <p>{dayjs(row.original.created_at).format("DD MMMM YYYY")}</p>
          </>
        ),
      },
      {
        header: "อัพเดทล่าสุด",
        cell: ({ row }) => (
          <>
            <p>{dayjs(row.original.updated_at).fromNow()}</p>
          </>
        ),
      },
      {
        header: "สถานะ",
        cell: ({ row }) => (
          <>
            <div className="flex items-center gap-4">
              <Switch
                checked={row.original.isActive}
                onChange={() => changeStatusVideo(row.original.id, !row.original.isActive)} 
                offColor="#888"
                onColor="#4CAF50"
                offHandleColor="#FFF"
                onHandleColor="#FFF"
                height={30}
                width={60}
              />
            </div>
          </>
        ),
      },
      {
        header: "จัดการ",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() =>
                router.push(`/admin/dashboard/edit-video/${row.original.id}`)
              }
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              แก้ไข
            </button>
            <button
              onClick={() =>
                deleteVideo(row.original.id)
              }
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              ลบ
            </button>
          </div>
        ),
      },
    ],
    [router]
  );

    // ใช้ TanStack Table สำหรับการสร้างตาราง
    const table = useReactTable({
      data: video,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      initialState: { pagination: { pageSize: 10 } },
    });
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        จัดการวิดีโอ
      </h2>

      {/* ปุ่มเพิ่มโพสต์ */}
      <button
        onClick={() => router.push("/admin/dashboard/add-video")}
        className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-300 hover:scale-105 mb-6"
      >
        เพิ่มวิดีโอ
      </button>

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
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
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
  )
}

export default VideoManagement