

import { createClient } from '@supabase/supabase-js'


export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key:", supabaseAnonKey ? "Loaded" : "Not Loaded");

const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
    // 浏览器保存 session
    persistSession: true,
    autoRefreshToken: true,
    // 设置session过期时间（默认1小时）
    storageKey: "supabase.auth.token",
    // 检测session变化
    detectSessionInUrl: true,
  },
  }
)

export default supabase