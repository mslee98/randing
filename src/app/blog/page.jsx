import Link from "next/link";
import React from "react";

export const metadata = {
  title: "토토의집 블로그",
  description: "토토의집 블로그는 각종 토지노 전문가들이 작성된 글을 확인하실 수 있습니다.",
  openGraph: {
    title: "토토의집 블로그 목록",
    description: "토토의집의 최신 블로그 목록을 확인하세요.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "토토의집 블로그 목록",
    description: "토토의집의 최신 블로그 목록을 확인하세요.",
  },
  canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
};

function convertToSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '') // 특수문자 제거
    .replace(/\s+/g, '-') // 공백을 대시(-)로 변환
    .replace(/--+/g, '-') // 여러 개의 대시를 하나로 줄임
    .replace(/^-+|-+$/g, '') // 앞뒤의 대시 제거
    .trim();
}

// 블로그 목록을 서버에서 fetch하여 페이지에 데이터를 전달
export default async function BlogList() {
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    cache: "no-store",
  });
  const posts = await response.json();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Article",
        "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.id}/${convertToSlug(post.title)}`,
        "url": `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.id}/${convertToSlug(post.title)}`,
        "headline": post.title,
        "description": post.excerpt || '요약된 내용이 없습니다.',
        "image": post.image ? post.image : `${process.env.NEXT_PUBLIC_BASE_URL}/default-image.jpg`,
        "datePublished": post.createdAt,
        "author": {
          "@type": "Person",
          "name": "토토의집",
        },
        "publisher": {
          "@type": "Organization",
          "name": "토토의집",
          "logo": {
            "@type": "ImageObject",
            "url": `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`
          }
        }
      }
    }))
  };

  return (
    <React.Fragment>
      {/* JSON-LD 구조화된 데이터 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          블로그 목록
        </h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.length === 0 ? (
            <p className="text-center text-lg text-gray-500">게시글이 없습니다.</p>
          ) : (
            posts.map((post) => {
              const slug = convertToSlug(post.title); // 제목을 슬러그로 변환

              return (
                <li
                  key={post.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* 썸네일 이미지 */}
                  <div className="w-full h-48 bg-gray-200">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={`토토의집 블로그 썸네일 이미지 - ${post.title}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* 블로그 글 정보 */}
                  <div className="p-6">
                    <Link href={`/blog/${post.id}/${slug}`}>
                      <h2 className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-500 mt-4 line-clamp-3">
                      {post.excerpt || '요약된 내용이 없습니다.'}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-sm text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <Link href={`/blog/${post.id}/${slug}`}>
                        <button className="text-blue-500 text-sm hover:underline">
                          더 보기 &rarr;
                        </button>
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </section>
    </React.Fragment>
  );
}
