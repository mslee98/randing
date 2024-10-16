import localFont from "next/font/local";
import "./globals.css";

import Header from "./components/common/Header/page";
import Footer from "./components/common/Footer/page";
import Banner from "./components/common/Banner/page";
import Head from "next/head";

const NotoSansKR = localFont({
  src: "./fonts/NotoSansKR-VariableFont_wght.ttf",
  variable: "--font-noto-sans-kr",
  weight: "100 900",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "토토의집 - 토토 및 카지노 정보를 제공하는 커뮤니티",
  description: "토토의집은 최신 토토 및 카지노 정보, 베팅 전략, 꽁머니 이벤트 정보를 제공하는 신뢰할 수 있는 커뮤니티입니다.",
  canonical: "https://example.com", // 캐노니컬 URL 설정
  robots: "index, follow",
  charset: "UTF-8",

  icons: {
    icon: "/images/icons/favicon-32x32.png",
    shortcut: "/images/icons/favicon-96x96.png",
    apple: "/images/icons/apple-touch-icon-180x180.png",
  },

  // Open Graph Meta Tags
  "og:site_name": "토토의집",
  "og:locale": "ko_KR",
  "og:title": "토토의집 - 토토 및 카지노 정보를 제공하는 커뮤니티",
  "og:description": "토토의집은 최신 토토 및 카지노 정보, 베팅 전략, 꽁머니 이벤트 정보를 제공하는 신뢰할 수 있는 커뮤니티입니다.",
  "og:type": "website",
  "og:url": "https://example.com",
  "og:image": "https://example.com/path-to-image.jpg",
  "og:image:alt": "토토의집 로고",
  "og:image:type": "image/png",
  "og:image:width": "1200",
  "og:image:height": "630",

  // Article Meta Tags (For blog posts or articles)
  "article:published_time": "2024-01-14T11:35:00+07:00", 
  "article:modified_time": "2024-01-14T11:35:00+07:00",  
  "article:author": "https://www.linkedin.com/in/myname", 

  // Twitter Meta Tags
  "twitter:card": "summary_large_image",  // 대형 이미지 사용
  "twitter:site": "@mycodings",  // 사이트의 트위터 핸들
  "twitter:creator": "@mycodings",  // 작성자의 트위터 핸들
  "twitter:title": "토토의집 - 토토 및 카지노 정보를 제공하는 커뮤니티",  // 트위터 카드에 표시될 제목
  "twitter:description": "토토의집은 최신 토토 및 카지노 정보, 베팅 전략, 꽁머니 이벤트 정보를 제공하는 신뢰할 수 있는 커뮤니티입니다.",  // 트위터 카드에 표시될 설명
  "twitter:image": "https://example.com/path-to-image.jpg",  // 트위터 카드에 표시될 이미지
};

export default function RootLayout({ children }) {

  return (
    <html lang="ko">
      <Head>
        <link rel="alternate" type="application/rss+xml" title="RSS" href="/api/rss" />

        

      </Head>
      <body
        className={`${NotoSansKR.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <Header/>
          <main className="flex-grow mx-auto p-4 max-w-6xl">
            <Banner />
            {children}
          </main>
          <Footer />
      </div>
      </body>
    </html>
  );
}
