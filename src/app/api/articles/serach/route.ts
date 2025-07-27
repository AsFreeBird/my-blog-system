import { NextRequest, NextResponse } from "next/server";
import { getArticleById } from "@/lib/db/article";
import { ApiResponse } from "@/types/api";
import { Article } from "@/types/database";

export async function GET(request: NextRequest,{params}:{params:{id:number}}){
    const { id } = params;
    console.log("Fetching article with ID:", id);
    try {
        const article = await getArticleById(id);
        const response:ApiResponse<Article> = {
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