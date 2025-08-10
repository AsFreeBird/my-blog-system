import { User } from "@supabase/supabase-js";
import { ApiResponse } from "@/types/api";

export async function singUp(email: string, password: string) {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data:ApiResponse<User|null> = await response.json();
    console.log("services singUp api:", data);
    if (!data.success) {
      return null;
    }
    return data;
  } catch (e: unknown) {
    console.log("fetch singUp:", e);
    return [];
  }
}

export async function singIn(email: string, password: string) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!data.success) {
    return [];
  }
  return data;
}

export async function getUser() {
  const response = await fetch("/api/auth/user",{method:"GET",credentials: 'include'});
  const data = await response.json();
  if (!data.success) {
    return [];
  }
  return data;
}
