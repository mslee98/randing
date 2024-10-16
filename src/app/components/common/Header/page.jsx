"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTelegramPlane, FaChevronDown, FaChevronUp } from "react-icons/fa"; // react-icons import

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false); // About 드롭다운 상태

  return (
    <>
      <header className="text-white border-b-2">
        <div className='p-4 flex justify-between items-center max-w-6xl mx-auto'>
          <div className="text-lg font-bold">
            <Link href="/">
              <h1>
                <Image
                  src="/images/토토의집.png"
                  alt="토토의집 메인 로고"
                  width={70}
                  height={30}
                />
              </h1>
            </Link>
          </div>
          
          <div className='flex justify-center space-x-2'>
            <button className='w-20 h-8 bg-[#35C5F0] flex justify-center items-center space-x-2 rounded-lg'>
              <div>
                <FaTelegramPlane />
              </div>
              <div className='font-semibold text-lg'>
                문의
              </div>
            </button>
            <button
              className="text-white focus:outline-none"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <svg className="w-6 h-6" fill="#000000" stroke="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <nav
          className="bg-white w-64 h-full p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="space-y-4">
            <li className="rounded-lg p-2 hover:bg-[#35C5F0] hover:bg-opacity-40 transition-all duration-300 ease-in-out">
              <Link 
                href="/" 
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-800 hover:text-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
              >
                Home
              </Link>
            </li>

            {/* About 항목 (드롭다운) */}
            <li className="rounded-lg p-2 hover:bg-[#35C5F0] hover:bg-opacity-40 transition-all duration-300 ease-in-out">
              <button 
                onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                className="w-full text-left text-gray-800 hover:text-lg hover:scale-105 transform transition-all duration-300 ease-in-out flex items-center justify-between"
              >
                About
                {isAboutDropdownOpen ? <FaChevronUp /> : <FaChevronDown />} {/* 화살표 아이콘 */}
              </button>

              {/* About 하위 항목 */}
              {isAboutDropdownOpen && (
                <ul className="mt-2 ml-4 space-y-2">
                  <li className="p-2 hover:bg-[#35C5F0] hover:bg-opacity-40 transition-all duration-300 ease-in-out">
                    <Link href="/team" onClick={() => setIsSidebarOpen(false)}>
                      Our Team
                    </Link>
                  </li>
                  <li className="p-2 hover:bg-[#35C5F0] hover:bg-opacity-40 transition-all duration-300 ease-in-out">
                    <Link href="/history" onClick={() => setIsSidebarOpen(false)}>
                      Our History
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="rounded-lg p-2 hover:bg-[#35C5F0] hover:bg-opacity-40 transition-all duration-300 ease-in-out">
              <Link 
                href="/faq" 
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-800 hover:text-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
              >
                FAQ
              </Link>
            </li>

            <li className="rounded-lg p-2 hover:bg-[#35C5F0] hover:bg-opacity-40 transition-all duration-300 ease-in-out">
              <Link 
                href="/blog" 
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-800 hover:text-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
