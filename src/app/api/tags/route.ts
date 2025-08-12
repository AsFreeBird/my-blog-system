import { getTags } from "@/lib/db/tag";
import { ApiResponse } from "@/types/api";
import { Tag } from "@/types/database";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const tags = await getTags();
    const response: ApiResponse<Tag[]> = {
      success: true,
      data: tags,
      message: "成功",
    };
    return NextResponse.json(response);
  } catch (e) {
    console.error(e);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      message: "Failed to fetch categories.",
      errorCode: "SERVER_ERROR",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
