"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../../../service/api";

export default function EditBlogCategory({ onClose, onSubmit, id }) {
    const [editBlog, setEditBlog] = useState({ name: "" });

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(editBlog);
        setEditBlog({ name: ""});
    };

    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${API}/category/${id}`)

            if (response.status == 200) {
                setEditBlog(response.data.resultData)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])


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
                    แก้ไขประเภทโรค
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="ชื่อประเภทโรค"
                        value={editBlog.name}
                        onChange={(e) => setEditBlog({ ...editBlog, name: e.target.value })}
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
 
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
                        >
                            แก้ไข
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
                        >
                            ยกเลิก
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}