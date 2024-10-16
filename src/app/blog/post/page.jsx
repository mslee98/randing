"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import { useRouter } from 'next/navigation';

// ReactQuill은 서버 사이드 렌더링과 호환되지 않으므로 dynamic import를 사용합니다.
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: '1'}, { header: '2'}, { header: [1, 2, 3, 4, 5, 6, false] }], // header 옵션을 Select 박스로 변경
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered'}, { list: 'bullet' }],
    ['link', 'image', 'video'], // 링크, 이미지, 동영상 추가
    ['clean'],
  ],
};

// 한글을 포함한 슬러그 변환 함수
function convertToSlug(text) {
  return text
    .replace(/\s+/g, '-')               // 공백을 대시로 변환
    .replace(/[^a-zA-Z0-9가-힣-]/g, '') // 한글, 영문, 숫자만 허용, 특수문자는 제거
    .replace(/--+/g, '-')               // 여러 개의 대시를 하나로 줄임
    .replace(/^-+|-+$/g, '')            // 앞뒤의 대시 제거
    .trim();
}

export default function PostForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null); // 썸네일 이미지 상태
  const [categories, setCategories] = useState([]); // 카테고리 리스트
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택된 카테고리

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setThumbnail(Object.assign(file, {
      preview: URL.createObjectURL(file),
    }));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
  });

  // 카테고리 리스트를 불러오는 useEffect
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data); // 카테고리 리스트 업데이트
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const slug = convertToSlug(title); // 한글 슬러그 생성

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug); // 슬러그 저장
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("categoryId", selectedCategory); // 선택한 카테고리 ID 추가
    
    if (thumbnail) {
      formData.append("image", thumbnail); // 썸네일 이미지 추가
    }

    const response = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const post = await response.json(); // 등록된 게시글의 ID와 슬러그를 반환받음
      router.push(`/blog/${post.id}/${slug}`);

      // 폼 초기화
      setTitle("");
      setExcerpt("");
      setContent("");
      setThumbnail(null);
      setSelectedCategory("");
    } else {
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto p-4 space-y-6 bg-white shadow-md rounded">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">제목</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">요약</label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">본문</label>
        <ReactQuill
          value={content}
          onChange={setContent}
          className="mt-1 h-60 h-auto"
          theme="snow"
          placeholder="내용을 입력하세요"
          modules={modules}
        />
      </div>

      {/* 카테고리 선택 */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">카테고리</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled>카테고리를 선택하세요</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* 썸네일 이미지 업로드 (드래그 앤 드롭) */}
      <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-6 rounded-lg flex items-center justify-center cursor-pointer">
        <input {...getInputProps()} />
        {!thumbnail ? (
          <p className="text-gray-500">썸네일 이미지를 여기에 드래그 앤 드롭하거나 클릭해서 추가하세요.</p>
        ) : (
          <div className="w-full h-48 bg-gray-200 flex justify-center items-center">
            <img src={thumbnail.preview} alt="업로드된 썸네일" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        게시글 등록
      </button>
    </form>
  );
}
