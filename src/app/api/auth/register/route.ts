import { NextRequest, NextResponse } from "next/server";
import { singUp } from "@/lib/db/auth";
import { ApiResponse } from "@/types/api";
import { User } from "@supabase/supabase-js";
export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  console.log("login params：",email,password)
  try {
    const data = await singUp(email, password);
    const response: ApiResponse<User | null> = { success: true, data: data };
    console.log("api response:",response)
    return NextResponse.json(response);
  } catch (e) {
    console.log(e);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      message: "Failed to fetch singUp.",
      errorCode: "SERVER_ERROR",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
