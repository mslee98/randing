import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; // PrismaClient 가져오기

const prisma = new PrismaClient(); // PrismaClient 인스턴스 생성

// GET 요청: 카테고리 리스트 가져오기
export async function GET() {
    try {
      // 모든 카테고리 가져오기
      const categories = await prisma.category.findMany();
      return NextResponse.json(categories, { status: 200 });
    } catch (error) {
      console.error("카테고리 목록 가져오는 중 오류 발생:", error);
      return NextResponse.json({ error: "카테고리 목록 가져오는 중 오류가 발생했습니다." }, { status: 500 });
    }
  }

export async function POST(req) {
  try {
    const body = await req.json();
    const { name } = body;

    // 카테고리 생성
    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("카테고리 생성 중 오류 발생:", error);
    return NextResponse.json({ error: "카테고리 생성 중 오류가 발생했습니다." }, { status: 500 });
  }
}
