import { NextRequest, NextResponse } from "next/server";
import { getArticlesWithRelation } from "@/lib/db/article";
import { ArticleWithRelations } from "@/types/database";
import { ApiResponse } from "@/types/api";

export async function GET(request: NextRequest) {
  console.log("Fetching articles with relations...")
  const { searchParams } = request.nextUrl;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const categoryId = parseInt(searchParams.get("categoryId") || "0", 10);
  const keywords = searchParams.get("keyword") || "";
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  console.log(`Fetching articles from ${from} to ${to} categoryId ${categoryId} keywords ${keywords}`);
  try {
    const data = await getArticlesWithRelation(from, to,categoryId,keywords);
    const response: ApiResponse<ArticleWithRelations[]> = {
      success: true,
      data: data,
      message: "Articles fetched successfully.",
    };
    console.log("Fetched articles>>>:", JSON.stringify(data, null, 2));
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error parsing query parameters:", error);

    const response: ApiResponse<null> = {
      success: false,
      data: null,
      message: "Failed to fetch articles.",
      errorCode: "SERVER_ERROR",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
