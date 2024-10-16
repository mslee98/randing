import Link from 'next/link';
import { FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="hidden sm:block bg-gray-100 text-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4"> {/* 여기에 max-w-6xl과 mx-auto로 고정 너비와 가운데 정렬 */}
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Left Section */}
          <div className="mb-6 lg:mb-0">
            <div className="w-30 h-8 bg-[#35C5F0] rounded-lg">
              <Link href="#">
                <h2 className="font-bold text-lg text-white flex justify-center space-x-2 items-center">
                  <FaTelegramPlane/>
                  <span>고객센터</span>
                </h2>
              </Link>
            </div>
            <div className='flex flex-col'>
              <p className="mt-2 text-lg font-bold text-center">1600-1234 <span className="text-sm">09:00-18:00</span></p>
              <ul className="mt-2 text-sm px-3">
                <li>평일: 전반적인 상담 서비스</li>
                <li>주말 및 공휴일: 문의 불가</li>
                <li>일요일: 휴무</li>
              </ul>
            </div>
            <button className="bg-gray-200 mt-4 py-2 px-4">카톡 상담</button>
            <button className="bg-gray-200 mt-2 py-2 px-4">이메일 문의</button>
          </div>

          {/* Center Section */}
          <div className="mb-6 lg:mb-0 grid grid-cols-2 gap-4">
            <ul>
              <li><a href="/about" className="hover:text-gray-500">회사소개</a></li>
              <li><a href="/jobs" className="hover:text-gray-500">채용정보</a></li>
              <li><a href="/terms" className="hover:text-gray-500">이용약관</a></li>
              <li><a href="/privacy" className="hover:text-gray-500">개인정보 처리방침</a></li>
              <li><a href="/notices" className="hover:text-gray-500">공지사항</a></li>
              <li><a href="/help" className="hover:text-gray-500">고객지원</a></li>
            </ul>
            <ul>
              <li><a href="/partners" className="hover:text-gray-500">파트너십 안내</a></li>
              <li><a href="/ads" className="hover:text-gray-500">광고 문의</a></li>
              <li><a href="/support" className="hover:text-gray-500">지원센터</a></li>
              <li><a href="/feedback" className="hover:text-gray-500">고객의 소리</a></li>
              <li><a href="/products" className="hover:text-gray-500">상품 소개</a></li>
              <li><a href="/contact" className="hover:text-gray-500">연락처</a></li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="text-sm text-gray-600">
            <p>(주)토토의집 | 대표이사 홍길동 | 서울특별시 강남구 테헤란로 123, 12층</p>
            <p>contact@toto-house.co.kr | 사업자등록번호 123-45-67890</p>
            <p>통신판매업신고번호 제2024-서울강남-12345호</p>
            <p className="mt-4">고객님의 안전한 거래를 보장하기 위해 최선을 다하겠습니다.</p>
            <div className="flex space-x-2 mt-2">
              <img src="/images/certification1.png" alt="인증1" className="w-12"/>
              <img src="/images/certification2.png" alt="인증2" className="w-12"/>
            </div>
            <p className="mt-4 text-xs">© 2024 토토의집. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
