import { NextRequest, NextResponse } from "next/server";
import { deleteArticle } from "@/lib/db/article";
import { ApiResponse } from "@/types/api";
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await context.params; // await 解构
    console.log("delete article id:",id);
    const isSuccess = await deleteArticle(id);

    const response: ApiResponse<boolean> = {
      success: true,
      data: isSuccess, 
      message: "delete Article fetched successfully.",
    };
    console.log("Fetched delete articles>>>:", JSON.stringify(isSuccess, null, 2));
    return NextResponse.json(response);
  } catch (error) {
    console.error("删除文章 API 错误:", error);

    return NextResponse.json<ApiResponse<boolean>>(
      {
        success: false,
        data: false,
        message: "删除文章失败。",
        errorCode: "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}
