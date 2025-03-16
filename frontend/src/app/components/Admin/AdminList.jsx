"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { API } from "../../service/api";
import { toast } from "react-toastify";
import axios from "axios";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";
import AddAdminModal from "./AddAdminModal";
import EditAdminModal from "./EditAdminModal";
import EditChangePassword from "./EditChangePassword";

export default function AdminList() {
    const [adminList, setAdminList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [isModalOpenChangePassword, setIsModalOpenChangePassword] = useState(false);
    const [idUser, setIdUser] = useState("");

    useEffect(() => {
        fetchAdminsData();
    }, []);

    const fetchAdminsData = async () => {
        try {
            const response = await axios.get(`${API}/users`);
            console.log(response);
            setAdminList(response.data);
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch admins");
        }
    };

    const handleAddUser = async (newUser) => {
        try {
            const response = await axios.post(`${API}/users`, {
                "username": newUser.username,
                "password": newUser.password,
                "role": "admin"
            })
            toast.success("เพิ่มข้อมูลแอดมินสำเร็จ");
            setIsModalOpen(false);
            fetchAdminsData();
        } catch (error) {
            toast.error(error.response.message || "ไม่สามารถเพิ่มข้อมูลแอดมินได้");
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await axios.delete(`${API}/users/${userId}`)
            toast.success("ลบข้อมูลแอดมินสำเร็จ!");
            fetchAdminsData();
        } catch (error) {
            toast.error(error.response.message || "ไม่สามารถลบข้อมูลได้");
        }

    };
    const handleEditUser = async (newUser) => {
        try {
            const response = await axios.put(`${API}/users/${idUser}`, {
                "username": newUser.username,
            })
            toast.success("แก้ไชแอดมินสำเร็จ");
            console.log(response)
            setIsModalOpenEdit(false);
            fetchAdminsData();
        } catch (error) {
            toast.error(error.response.message || "ไม่สามารถแก้ไขข้อมูลแอดมินได้");
        }
    };

    const handleChangePassword = async (input) => {
        try {
            const response = await axios.put(`${API}/users/change-password/${idUser}`, {
                "oldPassword": input.password,
                "newPassword": input.newPassword
            })
            toast.success(response.data.message || "เปลี่ยนรหัสผ่านสำเร็จ");
            setIsModalOpenChangePassword(false)
            fetchAdminsData()
            console.log(response);
        } catch (error) {
            console.log(error)
            toast.error(error.response.message || "ไม่สามารถแก้ไขรหัสผ่านได้");
        }
    }

    const handleStatusChange = async (userId) => {
        try {
            const response = await axios.patch(`${API}/users/status/${userId}`)

            console.log(response)
            toast.success("เปลี่ยนสถานะสำเร็จ");
            fetchAdminsData()
        } catch (error) {
            console.log(error)
            toast.error(error.response.message || "ไม่สามารถเปลี่ยนสถานะได้");
        }
    }

    const columns = useMemo(
        () => [
            { header: "ไอดี", accessorKey: "id" },
            { header: "ผู้ใช้", accessorKey: "username" },
            {
                header: "สถานะ", accessorKey: "active", cell: ({ row }) => (
                    <select
                        value={row.original.isActive ? "active" : "inactive"}
                        onChange={(e) => handleStatusChange(row.original.id)}
                        className="bg-gray-50 text-gray-700 border border-gray-300 rounded-lg p-2">
                        <option value="active">ใช้งานอยู่</option>
                        <option value="inactive">ปิดใช้งาน</option>
                    </select>
                )
            },
            {
                header: "เครื่องมือ",
                id: "actions",
                cell: ({ row }) => (
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                console.log("test");
                                setIsModalOpenEdit(true)
                                setIdUser(row.original.id)
                            }}
                            className="px-3 py-1 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all duration-200 hover:scale-105"
                        >
                            แก้ไข
                        </button>
                        <button
                            onClick={() => {
                                setIsModalOpenChangePassword(true)
                                setIdUser(row.original.id)
                            }}
                            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 hover:scale-105"
                        >
                            เปลี่ยนรหัสผ่าน
                        </button>
                        <button
                            onClick={() => handleDeleteUser(row.original.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 hover:scale-105"
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
        data: adminList,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } },
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">แสดงข้อมูลแอดมิน</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105"
                >
                    + เพิ่มข้อมูลแอดมิน
                </button>
            </div>

            {isModalOpen && (
                <AddAdminModal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddUser}
                />
            )}

            {isModalOpenEdit && (
                <EditAdminModal
                    onClose={() => setIsModalOpenEdit(false)}
                    onSubmit={handleEditUser}
                    idUser={idUser}
                />
            )}

            {isModalOpenChangePassword && (
                <EditChangePassword
                    onClose={() => setIsModalOpenChangePassword(false)}
                    onSubmit={handleChangePassword}
                    idUser={idUser}
                />
            )}

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