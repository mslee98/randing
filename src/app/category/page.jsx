"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // react-toastify CSS

const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]); // 카테고리 목록 상태 추가
  const router = useRouter();

  // 카테고리 목록을 가져오는 함수
  const fetchCategories = async () => {
    const response = await fetch("/api/categories");
    if (response.ok) {
      const data = await response.json();
      setCategories(data); // 카테고리 목록 업데이트
    } else {
      toast.error("카테고리 목록을 가져오는 중 오류가 발생했습니다.");
    }
  };

  // 페이지 로드 시 카테고리 목록을 가져옴
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: categoryName }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("카테고리 생성 완료:", result);
      
      // 성공 알림
      toast.success("카테고리가 성공적으로 생성되었습니다!");
      setCategoryName("");

      // 카테고리 목록을 다시 가져옴
      fetchCategories();
    } else {
      // 오류 알림
      toast.error("카테고리 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">카테고리 생성</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            카테고리 이름
          </label>
          <input
            type="text"
            id="category"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          카테고리 생성
        </button>
      </form>

      {/* 카테고리 목록 출력 */}
      <h2 className="text-xl font-semibold mt-8">카테고리 목록</h2>
      <ul className="mt-4 space-y-2">
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.id} className="p-2 bg-gray-100 rounded-md">
              {category.name}
            </li>
          ))
        ) : (
          <p>카테고리가 없습니다.</p>
        )}
      </ul>

      {/* ToastContainer는 페이지 어디에나 넣을 수 있으며, 알림을 표시합니다 */}
      <ToastContainer />
    </div>
  );
};

export default Category;
