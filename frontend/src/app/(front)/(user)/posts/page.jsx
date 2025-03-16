'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../../service/api';
import Head from 'next/head';
import Link from 'next/link';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('ทั้งหมด');
  const [searchTerm, setSearchTerm] = useState('');

  const getPosts = async () => {
    try {
      const response = await axios.get(`${API}/posts`);
      setPosts(response.data.resultData);
      const uniqueCategories = ['ทั้งหมด', ...new Set(response.data.resultData.map(post => post.category.name))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'ทั้งหมด' || post.category.name === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white min-h-screen">
      <Head>
        <title>iCare@KMUTNB</title>
        <meta name="description" content="คู่มือโรคและอุบัติเหตุสำหรับคุณ" />
      </Head>

      <main className="p-4 sm:p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl text-gray-800 font-semibold font-anakotmai text-center mb-6 sm:mb-8">
          iCare@KMUTNB
        </h1>

        <div className="flex flex-col sm:flex-row justify-center mb-6">
          <input
            type="text"
            placeholder="ค้นหา..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:max-w-md p-3 border bg-white border-gray-300 rounded-md sm:rounded-l-md shadow-sm focus:ring-2 focus:ring-blue-500 font-anakotmai mb-4 sm:mb-0"
          />
 
        </div>

        <div className="flex justify-start sm:justify-center mb-6 sm:mb-8 space-x-2 overflow-x-auto pb-2">
          {categories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-2 rounded-full font-anakotmai transition duration-300 whitespace-nowrap text-sm sm:text-base ${
                activeCategory === category
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPosts.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow-md text-center font-anakotmai transition duration-300 hover:shadow-xl"
            >
              <img
                src={item.cover_image_url}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-medium text-gray-800 mb-2">{item.title}</h4>
              <h5 className="text-sm text-gray-500 mb-4">ประเภทข้อมูล: {item.category.name}</h5>
              <Link
                href={`/post/${item.id}`}
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg transition hover:bg-blue-600 hover:scale-105"
              >
                ดูข้อมูล
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}