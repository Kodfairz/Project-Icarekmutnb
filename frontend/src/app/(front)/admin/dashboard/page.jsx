"use client";

import { useState } from "react";
import AdminList from "../../../components/Admin/AdminList";
import BlogManagement from "../../../components/Admin/Blog/BlogManagement";
import CategoryBlog from "../../../components/Admin/Blog/BlogCategory";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("admin");

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-fade-in-down">
        Admin Dashboard
      </h1>

      {/* Tab Navigation */}
      <nav className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
        {["admin", "blog", "category blog"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-lg font-medium capitalize rounded-t-lg transition-all duration-300 ${activeTab === tab
              ? "bg-white text-indigo-600 border-b-4 border-indigo-600"
              : "text-gray-600 hover:bg-gray-100 hover:text-indigo-500"
              }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <section className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
        {activeTab === "admin" && <AdminList />}
        {activeTab === "blog" && <BlogManagement />}
        {activeTab === "category blog" && <CategoryBlog />}
      </section>
    </div>
  );
}