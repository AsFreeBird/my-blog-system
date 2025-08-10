import { NextRequest, NextResponse } from "next/server";
import { singIn } from "@/lib/db/auth";
import { ApiResponse } from "@/types/api";
import { User } from "@supabase/supabase-js";
export async function POST(request: NextRequest) {
  const { email, paassword } = await request.json();
  try {
    const data = await singIn(email, paassword);
    const response: ApiResponse<User | null> = { success: true, data: data };
    return NextResponse.json(response);
  } catch (e) {
    console.log(e);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      message: "Failed to fetch singIn.",
      errorCode: "SERVER_ERROR",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
