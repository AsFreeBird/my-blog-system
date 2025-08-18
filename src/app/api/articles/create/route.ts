import { NextRequest, NextResponse } from "next/server";

import { createArticle } from "@/lib/db/article";
import { Article } from "@/types/database";
import { ApiResponse } from "@/types/api";

export async function POST(request: NextRequest) {
  try {
    const body =await  request.json() as Article;
    console.log("Api add article requestBody：",body);
    const article = await createArticle(body);
    
    const response: ApiResponse<Article> = {
      success: true,
      data: article,
      message: "add Article fetched successfully.",
    };
    console.log("Fetched add articles>>>:", JSON.stringify(article, null, 2));
    return NextResponse.json(response);
  } catch (error) {
    console.error("add article error", error);

    const response: ApiResponse<null> = {
      success: false,
      data: null,
      message: "Failed to fetch add articles.",
      errorCode: "SERVER_ERROR",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
