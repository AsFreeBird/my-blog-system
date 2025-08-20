import { NextRequest, NextResponse } from "next/server";
import { getArticleWithRelationById } from "@/lib/db/article";
import { ApiResponse } from "@/types/api";
import { ArticleWithRelations } from "@/types/database";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  console.log("Fetching article with ID:", id);
  try {
    const article = await getArticleWithRelationById(id);
    const response: ApiResponse<ArticleWithRelations | null> = {
      success: true,
      data: article,
      message: "Article fetched successfully.",
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching article:", error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      message: "Failed to fetch article.",
      errorCode: "SERVER_ERROR",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
