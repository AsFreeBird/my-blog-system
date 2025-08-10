"use client";

import "./../globals.css"; // 👈 必须是相对路径，放在文件顶部

import { useRouter } from "next/navigation";
import { getUser } from "@/services/auth";
import { useState } from "react";
import { useEffect } from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isLogin,setIsLogin] = useState(false)

  useEffect(() => {
    getUser().then((user)=>{
      setIsLogin(user)
    }).then((e)=>{console.log(e)});
  }, []);

  const onLogin = () => {
    router.push("/login");
  };

  const goBackstage =()=>{
      router.push("/backstage")
  }

  return (
    <html lang="en">
      <body>
        <header>
          <div className="flex items-center justify-between  w-full pt-4 pb-4">
            <h1 className="text-3xl font-bold ml-8">📝 我的博客</h1>
            <div>
              {isLogin?<button className="btn" onClick={goBackstage}>管理后台</button>:<> </>}
              
              <button className="btn ml-4 mr-8" onClick={onLogin}>
                登录
              </button>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
