"use client";
import React from "react";
import "./../../globals.css";
import { useState } from "react";
import { singIn, singUp } from "@/services/auth";
import { useRouter

 } from "next/navigation";
export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [againPassword, setAgainPassword] = useState("");
  const router = useRouter();
  const onSwitchType = () => {
    setIsLogin(!isLogin);
  };

  const handleButton = () => {
    if (isLogin) {
      singIn(email, password)
        .then((user) => {
          if (user) {
            router.push("/");
          } else {
            alert("登录失败");
          }
        })
        .catch((e) => {
          console.log("singIn>>>>", e);
          alert("登录异常");
        });
    } else {
      if (password !== againPassword) {
        alert("输入密码不一致");
        return;
      }
      if(password.length<6){
        alert("密碼太短");
        return
      }
      singUp(email, password)
        .then((user) => {
          if (user) {
            router.push("/");
          } else {
            alert("注册失败");
          }
        })
        .catch((e) => {
          console.log("singUp>>>>", e);
          alert("注册异常");
        });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col bg-white p-10 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "登录博客" : "注册账号"}
        </h2>
        <div className="font-medium">邮箱</div>
        <input
          type="email"
          className="input mt-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="mt-4">密码</div>
        <input
          type="password"
          className="input mt-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isLogin ? (
          <div>
            <div className="mt-4">确认密码</div>
            <input
              type="password"
              className="input mt-2"
              value={againPassword}
              onChange={(e) => setAgainPassword(e.target.value)}
            />
          </div>
        ) : (
          <></>
        )}
        <button
          className="btn mt-5"
          onClick={handleButton}
        >
          {" "}
          {isLogin ? "登录" : "注册"}
        </button>
        <div className={`flex justify-center mt-4 ${isLogin?"text-gray-500":"text-black"}`}>
          {isLogin ? "还没有账号?" : "已有账号？"}
          <span
            className="text-blue-600 hover:text-blue-700"
            onClick={onSwitchType}
          >
            {isLogin ? "注册" : "登录"}
          </span>
        </div>
      </div>
    </div>
  );
}
