"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../../service/api";

export default function AddPostPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(""); // state สำหรับประเภท
  const [coverImage, setCoverImage] = useState(null); // state สำหรับเก็บหน้าปกข่าวสาร
  const [videoLink, setVideoLink] = useState(""); // state สำหรับลิงก์วิดีโอแนะนำ
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("edit"); // แท็บ Edit หรือ Preview
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const getCategories = async () => {
    try {
      const response = await axios.get(`${API}/category/`);
      console.log(response);
      setCategories(response.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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

    if (!file.type.startsWith("image/")) {
      toast.error("รองรับเฉพาะไฟล์รูปภาพ!");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", `jyvur9yd`);
    formData.append("folder", "icare");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dcq3ijz0g/image/upload`,
        formData
      );

      return response.data.url;
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

  const handleCoverImageUpload = async (file) => {
    const imageUrl = await handleImageUpload(file);
    if (imageUrl) {
      setCoverImage(imageUrl); // เก็บ URL ของหน้าปก
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const content = editor.getHTML();
      const response = await axios.post(`${API}/posts`, {
        title,
        category,
        coverImage, // ส่ง URL ของหน้าปกข่าวสาร
        videoLink,  // ส่งลิงก์วิดีโอแนะนำ
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

  // ฟังก์ชั่นแปลงลิงก์ YouTube ให้เป็น iframe
  const renderVideoPreview = (link) => {
    const youtubePattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(youtubePattern);
    if (match) {
      const videoId = match[1];
      return (
        <div className="mt-4">
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    }
    return null; // ถ้าไม่ใช่ลิงก์ YouTube จะไม่แสดงอะไร
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-fade-in-down">เพิ่มโพสต์</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
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
          <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">
            ประเภทโรค
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="">เลือกประเภทโรค</option>
            {categories.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* เพิ่ม input สำหรับหน้าปกข่าวสาร */}
        <div>
          <label htmlFor="coverImage" className="block text-lg font-medium text-gray-700 mb-2">
            หน้าปกข่าวสาร
          </label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={(e) => handleCoverImageUpload(e.target.files[0])}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          />
          {coverImage && (
            <div className="mt-4">
              <img src={coverImage} alt="Cover" className="w-full rounded-lg" />
            </div>
          )}
        </div>

        {/* เพิ่ม input สำหรับลิงก์วิดีโอแนะนำ */}
        <div>
          <label htmlFor="videoLink" className="block text-lg font-medium text-gray-700 mb-2">
            ลิงก์วิดีโอแนะนำ
          </label>
          <input
            type="url"
            id="videoLink"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            placeholder="กรอกลิงก์วิดีโอแนะนำ"
          />
          {/* แสดงตัวอย่างวิดีโอหากมีลิงก์ */}
          {videoLink && renderVideoPreview(videoLink)}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">เนื้อหา</label>

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
