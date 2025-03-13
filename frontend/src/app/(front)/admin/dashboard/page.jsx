"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API } from "../../../service/api";
import { toast } from 'react-toastify';


export default function AdminDashboard() {
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const router = useRouter();

const handleAddUser = async (event) => {
  try {
    event.preventDefault();
    const response = await axios.post(`${API}/users/`, {
      "username": newUser.username,
      "password": newUser.password,
      "role": "admin"
    })

    if(response.status == 200) {
      toast.success("เพิ่ม Admin สำเร็จ!")
      setNewUser({ username: "", password: "" })
    }

  } catch (error) {
    console.log(error)
    toast.error(error.response.data ?? "เกิดข้อผิดพลาดในการเพิ่ม Admin")
  }
}



 
  return (
    <div>
    
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
      
       

        <form onSubmit={handleAddUser} className="mt-6 space-y-4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Add New Admin User</h2>
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            เพิ่ม Admin
          </button>
        </form>
        <nav className="mt-6">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => router.push("/admin/dashboard/add-post")}
                className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                เพิ่มโพสต์
              </button>
              <button
                onClick={() => router.push("/Pages")}
                className="mt-6 p-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                กลับไปหน้าแรก
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
