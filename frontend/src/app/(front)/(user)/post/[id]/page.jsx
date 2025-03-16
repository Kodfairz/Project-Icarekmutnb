"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../../../service/api';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/th";

const PostDetail = () => {
  dayjs.locale("th"); // ใช้ locale เป็นภาษาไทย
  dayjs.extend(relativeTime);
  const { id } = useParams();
  const [post, setPost] = useState({});

  const getPost = async () => {
    try {
      const response = await axios.get(`${API}/posts/user/${id}`);
      console.log(response.data.resultData);
      setPost(response.data.resultData);
    } catch (error) {
      console.log(error);
      toast.error(error.response.message || "ไม่สามารถเรียกข้อมูลได้");
    }
  };

  const renderVideoPreview = (link) => {
    if (typeof link === 'string' && link) {
      const youtubePattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = link.match(youtubePattern);
      if (match) {
        const videoId = match[1];
        return (
          <div className="mt-4 relative pb-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      }
    }
    return null; 
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto py-10 px-5">
        {/* Post Title */}
        <h1 className="text-4xl font-bold text-gray-900">{post?.title}</h1>

        {/* Category */}
        <h2 className="text-xl text-gray-600 mt-2">{`ประเภทข้อมูล: ${post?.category?.name}`}</h2>

        {/* Image */}
        <div className="my-6">
          <img src={post?.cover_image_url} alt={post?.title} className="w-full h-auto rounded-xl shadow-lg" />
        </div>

        <div className="text-3xl text-center">เนื้อหา</div>
        <hr />

        {/* Content */}
        <div className="mt-8 text-gray-800 text-lg" dangerouslySetInnerHTML={{ __html: post?.content }} />

        {/* Video */}
        {post?.video_link && post?.video_link.length > 5 && 
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">วิดีโอแนะนำ</h3>
          <div className="aspect-w-16 aspect-h-9">
            {renderVideoPreview(post?.video_link)}
          </div>
        </div>
        }

                {/* Views and Last Updated */}
        <div className="text-gray-600 mt-4">
          <div>จำนวนผู้เข้าชม: <span className="font-semibold">{post?.views}</span></div>
          <div>เผยแพร่ล่าสุด: <span className="font-semibold">{dayjs(post?.updated_at).format("DD MMMM YYYY")}</span></div>
          <div>ผู้เผยแพร่: <span className="font-semibold">{post?.users_posts_user_idTousers?.username}</span></div>
          <div>ผู้แก้ไขล่าสุด: <span className="font-semibold">{post?.users_posts_user_update_idTousers?.username}</span></div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
