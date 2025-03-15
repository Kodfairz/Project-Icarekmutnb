"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../../../service/api";
import Switch from "react-switch";
import dynamic from "next/dynamic";
import { useDropzone } from "react-dropzone";

// Dynamically import react-select to avoid SSR issues
const Select = dynamic(() => import("react-select"), { ssr: false });

export default function EditPostPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState();
  const [coverImage, setCoverImage] = useState(null);
  const [videoLink, setVideoLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("edit");
  const [categories, setCategories] = useState([]);
  const [publishStatus, setPublishStatus] = useState(true);
  const [contentPost, setContentPost] = useState("");
  const router = useRouter();

  const getCategories = async () => {
    try {
      const response = await axios.get(`${API}/category/`);
      setCategories(response.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const response = await axios.get(`${API}/posts/${id}`);
      console.log(response.data.resultData);
      setTitle(response.data.resultData.title);
      setCategory(response.data.resultData.category_id);
      setCoverImage(response.data.resultData.cover_image_url);
      setVideoLink(response.data.resultData.video_link);
      setPublishStatus(response.data.resultData.isActive);
      setContentPost(response.data.resultData.content);
    } catch (error) {
      console.log(error);
      toast.error(error.response.message || "ไม่สามารถเรียกข้อมูลได้");
    }
  };

  // Create the editor instance
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
      }),
    ],
    content: contentPost, // Set content dynamically based on the state
  });

  useEffect(() => {
    // Ensure editor is ready and contentPost is set
    if (editor && contentPost) {
      editor.commands.setContent(contentPost); // Update editor content
    }
  }, [contentPost, editor]);

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
      const content = editor.getHTML();
      const response = await axios.put(`${API}/posts/${id}`, {
        title,
        category_id: category.toString(),
        cover_image_url: coverImage, // ส่ง URL ของหน้าปกข่าวสาร
        video_link: videoLink, // ส่งลิงก์วิดีโอแนะนำ
        content,
        isActive: publishStatus, // ส่งสถานะการเผยแพร่
      });
      if (response.status === 200) {
        toast.success(response.data.message || "แก้ไขข้อมูลสำเร็จ!");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "แก้ไขโพสต์ไม่สำเร็จ");
    } finally {
      setIsLoading(false);
    }
  };

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

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-fade-in-down">แก้ไขข้อมูล</h1>

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
            placeholder="ป้อนหัวข้อ"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">
            ประเภทของข้อมูล
          </label>
          <Select
            id="category"
            options={categoryOptions}
            value={categoryOptions.find((option) => option.value === category)}
            onChange={(selectedOption) => {
              setCategory(selectedOption.value);
            }}
            placeholder="เลือกประเภทข้อมูล"
            className="w-full"
            required
          />
        </div>

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
          {videoLink && renderVideoPreview(videoLink)}
        </div>

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
          <label className="block text-lg font-medium text-gray-700 mb-2">เนื้อหา</label>
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={`px-4 py-2 rounded-t-lg ${activeTab === "edit" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-all duration-200`}
            >
              แก้ไข
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 rounded-t-lg ${activeTab === "preview" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-all duration-200`}
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

        {/* Submit and Cancel */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? "กำลังเพิ่ม..." : "แก้ไขข้อมูล"}
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
