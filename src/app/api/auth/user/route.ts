import { NextResponse } from "next/server";
import { getUser } from "@/lib/db/auth";
import { ApiResponse } from "@/types/api";
import { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabaseClient";
import { console } from "inspector";

export async function GET() {
  try {
    console.log("GET user token>>>>>>>>:", ">>>>>>>>>>>");
    const cookieStore = await cookies();

    const token = cookieStore.get("sb-access-token")?.value;
    console.log("GET user token>>>>>>>>:", token);
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: cookieStore,
    });
    const data = await getUser(supabase);
    const response: ApiResponse<User> = {
      success: true,
      data: data,
      message: "成功",
    };
    return NextResponse.json(response);
  } catch (e) {
    console.log(e);
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      message: "Failed to fetch articles.",
      errorCode: "SERVER_ERROR",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
