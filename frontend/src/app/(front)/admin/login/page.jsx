
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from 'axios'
import { API } from '../../../service/api'
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.post(`${API}/users/login`, {
            username,
            password,
        })

        if(response.status == 200) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.resultData))
            toast.success("เข้าสู่ระบบสำเร็จ!")
            window.dispatchEvent(new Event('loginStatusChanged'))
            router.push('/home')
        }

        console.log(response);
    } catch (error) {
        console.log(error)
        toast.error(error.response.data ?? "เกิดข้อผิดพลาดในการเข้าสู่ระบบ")
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-purple-400">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <motion.input
          type="text"
          placeholder="Username"
            value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
          whileFocus={{ scale: 1.05 }}
        />
        <motion.input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
          whileFocus={{ scale: 1.05 }}
        />

        <motion.button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md font-semibold transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          เข้าสู่ระบบ
        </motion.button>
      </motion.form>
    </div>
  );
}
