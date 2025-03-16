"use client";

import { useState } from "react";

export default function AddAdminModal({ onClose, onSubmit }) {
    const [newUser, setNewUser] = useState({ username: "", password: "" });

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(newUser);
        setNewUser({ username: "", password: "" });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                >
                    ×
                </button>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    เพิ่มข้อมูลแอดมิน
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
                        >
                            เพิ่ม
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
                        >
                            ลบ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}