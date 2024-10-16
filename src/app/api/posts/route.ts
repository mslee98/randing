import { NextResponse } from 'next/server';
import prisma from '@lib/prisma';
import { promises as fs } from 'fs';
import path from 'path';

// GET 요청: 게시글 목록 가져오기
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',  // 최신 게시글 순으로 정렬
      },
      include: {
        category: true, // 카테고리 정보도 함께 가져오기
      },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('게시글 목록 가져오기 오류:', error);
    return NextResponse.json({ error: '게시글 목록을 불러오는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// POST 요청: 게시글 생성
export async function POST(req) {
  const formData = await req.formData();
  const title = formData.get('title');
  const slug = formData.get('slug');
  const excerpt = formData.get('excerpt');
  const content = formData.get('content');
  const image = formData.get('image'); // 이미지 파일
  const categoryId = formData.get('categoryId'); // 카테고리 ID

  let imagePath = null;

  // 이미지가 업로드되었을 경우 처리
  if (image) {
    const imageBuffer = await image.arrayBuffer(); // 이미지 파일을 읽음
    const imageName = `${Date.now()}-${image.name}`; // 이미지 파일명 생성
    const imageDir = path.join(process.cwd(), 'public', 'images', 'stored'); // 이미지 저장 경로
    imagePath = `/images/stored/${imageName}`; // DB에 저장할 이미지 경로

    // 디렉토리가 존재하지 않으면 생성
    await fs.mkdir(imageDir, { recursive: true });
    await fs.writeFile(path.join(imageDir, imageName), Buffer.from(imageBuffer));
  }

  try {
    // Prisma로 데이터베이스에 저장
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        image: imagePath, // 이미지 경로 저장
        category: {
          connect: { id: parseInt(categoryId, 10) }, // 카테고리와 연결
        },
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('게시글 등록 중 오류:', error);
    return NextResponse.json({ error: '게시글 등록 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
