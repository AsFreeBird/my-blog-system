import { NextRequest, NextResponse } from "next/server";
import { getArticleById, updateArticle } from "@/lib/db/article";
import { ApiResponse } from "@/types/api";
import { Article } from "@/types/database";
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  console.log("Updating article with ID:", id);
  try {
    const body = (await request.json()) as Article;
    console.log("Request body for update:", body);
    const article = await updateArticle(id, body);
    console.log("Updated article:", article);
    const response: ApiResponse<Article> = {
      success: false,
      data: article,
      message: "Article not found.",
      errorCode: "NOT_FOUND",
    };
    return NextResponse.json(response, { status: 404 });
  } catch (error) {
    console.error("Error updating article:", error);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      message: "Failed to update article.",
      errorCode: "SERVER_ERROR",
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  console.log("Fetching article with ID:", id);
  try {
    const article = await getArticleById(id);
    const response: ApiResponse<Article | null> = {
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
