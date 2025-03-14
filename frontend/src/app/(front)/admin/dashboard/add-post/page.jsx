"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../../service/api";

export default function AddPostPage() {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("edit"); // แท็บ Edit หรือ Preview
  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
      }),
    ],
    content: "",
  });

  const handleImageUpload = async (file) => {
    if (!file) {
      toast.error("กรุณาเลือกไฟล์รูปภาพ!");
      return null;
    }

    // ตรวจสอบประเภทไฟล์ (รองรับเฉพาะ jpg, png, gif)
    if (!file.type.startsWith("image/")) {
      toast.error("รองรับเฉพาะไฟล์รูปภาพ!");
      return null;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("https://api.imgur.com/3/image", formData, {
        headers: {
          "Authorization": "Client-ID 0bc0666a250e55e",
        },
      });

      if (response.data.success) {
        const imageUrl = response.data.data.link;
        console.log("Image uploaded:", imageUrl);
        return imageUrl;
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error.response?.data || error.message);
      toast.error("อัปโหลดรูปภาพไม่สำเร็จ");
      return null;
    }
  };

  const addImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const imageUrl = await handleImageUpload(file);
      if (imageUrl && editor) {
        editor.chain().focus().setImage({ src: imageUrl }).run();
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const content = editor.getHTML();
      const response = await axios.post(`${API}/posts`, {
        title,
        content,
      });

      if (response.status === 200) {
        toast.success("โพสต์เพิ่มสำเร็จ!");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "เพิ่มโพสต์ไม่สำเร็จ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-fade-in-down">
        เพิ่มโพสต์
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 space-y-6"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            หัวข้อ
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            placeholder="ป้อนหัวข้อโพสต์"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            เนื้อหา
          </label>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={`px-4 py-2 rounded-t-lg ${activeTab === "edit"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-all duration-200`}
            >
              แก้ไข
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 rounded-t-lg ${activeTab === "preview"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-all duration-200`}
            >
              ตัวอย่าง
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "edit" && (
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="p-2 bg-gray-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={addImage}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  รูปภาพ
                </button>
              </div>
              <EditorContent editor={editor} className="p-4 min-h-[200px]" />
            </div>
          )}

          {activeTab === "preview" && (
            <div
              className="border border-gray-300 rounded-lg p-4 min-h-[200px] bg-white prose prose-indigo max-w-none"
              dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "" }}
            />
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? "กำลังเพิ่ม..." : "เพิ่มโพสต์"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/dashboard")}
            className="flex-1 p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}
