"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from 'axios';
import { API } from '../../../service/api';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

export default function Login() {
  const expireTimeInDays = 20 / 24;
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
      });

      if (response.status === 200) {
        Cookies.set('token', response.data.token, { expires: expireTimeInDays });
        Cookies.set('user', JSON.stringify(response.data.resultData), { expires: expireTimeInDays });
        toast.success("เข้าสู่ระบบสำเร็จ!");
        window.dispatchEvent(new Event('loginStatusChanged'));
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data ?? "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-purple-400 transition-all duration-300">
      <motion.form
        onSubmit={handleSubmit}
        className="relative bg-white/30 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-96 border border-white/40 group transition-all duration-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <motion.div
          className="mb-4 transition duration-300"
          whileFocus={{ scale: 1.02 }}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/60 backdrop-blur-md hover:bg-white/80 transition-all duration-200"
            required
          />
        </motion.div>

        <motion.div
          className="mb-4 transition duration-300"
          whileFocus={{ scale: 1.02 }}
        >
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/60 backdrop-blur-md hover:bg-white/80 transition-all duration-200"
            required
          />
        </motion.div>

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
