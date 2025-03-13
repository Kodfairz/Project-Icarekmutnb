"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]); // อัปเดต state สำหรับรูปภาพ
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // อัปโหลดภาพก่อน (ถ้ามี)
      let imageUrl = null;
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const imageRes = await fetch("/api/admin/upload-image", {
          method: "POST",
          body: formData,
        });

        if (imageRes.ok) {
          const data = await imageRes.json();
          imageUrl = data.imageUrl;
        } else {
          alert("เกิดข้อผิดพลาดในการอัปโหลดภาพ");
          return;
        }
      }

      // สร้างโพสต์ใหม่
      const postData = new FormData();
      postData.append("title", title);
      postData.append("content", content);
      postData.append("authorId", "1"); // ใส่ค่า authorId ของผู้ใช้ที่กำหนด
      postData.append("imageUrl", imageUrl); // ส่ง URL ของภาพ (ถ้ามี)

      const res = await fetch("/api/admin/post", {
        method: "POST",
        body: postData,
      });

      if (res.ok) {
        alert("เพิ่มโพสต์สำเร็จ!");
        setTitle("");
        setContent("");
        setImageFile(null);
        router.push("/Explore_diseases"); // เปลี่ยน URL ตามที่ต้องการ
      } else {
        const errorData = await res.json();
        alert(`เกิดข้อผิดพลาด: ${errorData.error}`);
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
    
      <div className="flex-grow p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">เพิ่มโพสต์ใหม่</h2>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg" encType="multipart/form-data">
          {/* หัวข้อโพสต์ */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="หัวข้อ"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* เนื้อหาของโพสต์ */}
          <div className="mb-4">
            <textarea
              placeholder="รายละเอียด"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="4"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ช่องอัปโหลดไฟล์รูปภาพ */}
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFileChange}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ปุ่มเพิ่มโพสต์ */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-4 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "กำลังเพิ่มโพสต์..." : "เพิ่มโพสต์"}
          </button>
        </form>
      </div>
    </div>
  );
}
