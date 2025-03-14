"use client";

import { useRouter } from "next/navigation";

export default function BlogManagement() {
    const router = useRouter();

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                จัดการข่าวสาร
            </h2>
            <button
                onClick={() => router.push("/admin/dashboard/add-post")}
                className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-300 hover:scale-105"
            >
                เพิ่มโพสต์
            </button>
        </div>
    );
}