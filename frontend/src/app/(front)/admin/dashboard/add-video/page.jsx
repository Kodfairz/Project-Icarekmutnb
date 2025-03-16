"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../../service/api";
import Switch from "react-switch"; // นำเข้าคอมโพเนนต์ switch
import dynamic from "next/dynamic"; // ใช้ dynamic import สำหรับ react-select
import { useDropzone } from "react-dropzone"; // ใช้ react-dropzone
import Cookies from "js-cookie";


export default function AddVideoPage() {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null); // state สำหรับเก็บหน้าปกข่าวสาร
  const [videoLink, setVideoLink] = useState(""); // state สำหรับลิงก์วิดีโอแนะนำ
  const [isLoading, setIsLoading] = useState(false);
  const [publishStatus, setPublishStatus] = useState(true); // state สำหรับการเผยแพร่ (true = เผยแพร่, false = ไม่เผยแพร่)
  const [content, setContent] = useState("")
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

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      handleCoverImageUpload(acceptedFiles[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/video`, {
        title,
        thumbnail_url : coverImage, // ส่ง URL ของหน้าปกข่าวสาร
        url : videoLink,  // ส่งลิงก์วิดีโอแนะนำ
        description : content,
        isActive : publishStatus, // ส่งสถานะการเผยแพร่
        user_id : `${JSON.parse(Cookies.get('user')).id}`,
        update_id : `${JSON.parse(Cookies.get('user')).id}`
      });
      if (response.status === 200) {
        toast.success(response.data.message ||"เพิ่มวิดีโอสำเร็จ!");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "เพิ่มวิดีโอไม่สำเร็จ");
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
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    }
    return null; 
  };


  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Set file type filter here
  });

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-fade-in-down">เพิ่มวิดีโอ</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Input Title */}
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
            placeholder="ป้อนหัวข้อ"
          />
        </div>


        {/* Input Cover Image using react-dropzone */}
        <div>
          <label htmlFor="coverImage" className="block text-lg font-medium text-gray-700 mb-2">
            หน้าปกข้อมูล
          </label>
          <div
            {...getRootProps()}
            className="border-dashed border-2 border-gray-300 p-6 text-center cursor-pointer"
          >
            <div>
              <span className="text-gray-500">ลากและวางหรือลือกไฟล์</span>
            </div>
            <input {...getInputProps()} />
            {coverImage && <img src={coverImage} alt="Cover" className="w-1/3 rounded-lg mt-4" />}
          </div>
        </div>

        {/* Input Video Link */}
        <div>
          <label htmlFor="videoLink" className="block text-lg font-medium text-gray-700 mb-2">
            ลิงก์วิดีโอ
          </label>
          <input
            type="url"
            id="videoLink"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            placeholder="กรอกลิงก์วิดีโอแนะนำ"
          />
          {videoLink && renderVideoPreview(videoLink)}
        </div>

        {/* Input Publish Status (Switch) */}
        <div>
          <label htmlFor="publishStatus" className="block text-lg font-medium text-gray-700 mb-2">
            สถานะการเผยแพร่
          </label>
          <div className="flex items-center gap-4">
            <span>ไม่เผยแพร่</span>
            <Switch
              checked={publishStatus}
              onChange={() => setPublishStatus(!publishStatus)} // toggle switch
              offColor="#888"
              onColor="#4CAF50"
              offHandleColor="#FFF"
              onHandleColor="#FFF"
              height={30}
              width={60}
            />
            <span>เผยแพร่</span>
          </div>
        </div>

        <div>
        <label htmlFor="publishStatus" className="block text-lg font-medium text-gray-700 mb-2">
            รายละเอียด
          </label>
          <textarea required onChange={(e) => setContent(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"></textarea>
        </div>

     

        {/* Submit and Cancel */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? "กำลังเพิ่ม..." : "เพิ่มวิดีโอ"}
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
