import { NextRequest, NextResponse } from "next/server";
import { getCategories } from "@/lib/db/category";
import { ApiResponse } from "@/types/api";
import { Category } from "@/types/database";

export async function GET(request: NextRequest) {
    try {
        const categories = await getCategories();
        const response: ApiResponse<Category[]> = {
        success: true,
        data: categories,
        message: "Categories fetched successfully.",
        };
        return NextResponse.json(response);
    } catch (error) {
        console.error("Error fetching categories:", error);
        const response: ApiResponse<null> = {
        success: false,
        data: null,
        message: "Failed to fetch categories.",
        errorCode: "SERVER_ERROR",
        };
        return NextResponse.json(response, { status: 500 });
    }
}