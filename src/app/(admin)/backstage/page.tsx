'use client'

import "../../globals.css";
import { useRouter } from "next/navigation";
const data = [
  {
    src: "https://img.icons8.com/ios/64/000000/news.png",
    title: "文章管理",
    discription: "查看、新建、编辑和删除",
    path:"/articles"
  },
  {
    src: "https://img.icons8.com/ios/64/000000/folder-invoices--v1.png",
    title: "分类管理",
    discription: "维护文章分类",
    path:"/catogory"
  },
  {
    src: "https://img.icons8.com/ios/64/000000/price-tag--v1.png",
    title: "标签管理",
    discription: "维护文章标签",
    path:"/tag"
  },
  {
    src: "https://img.icons8.com/ios/64/000000/home.png",
    title: "博客首页",
    discription: "回到博客首页",
    path:"/"
  },
];
export default function Home() {
  const router = useRouter()
  return (
    <html>
      <body className="bg-gray-100">
        <div className="flex flex-col  items-center ">
          <h1 className="title">博客管理控制台</h1>
          <div className="grid gap-5 grid-cols-3 mt-12 translate
          ">
            {data.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center bg-white rounded-xl p-7"
                onClick={()=>{router.push(item.path)}}
              >
                <img src={item.src} className="w-14 h-14" />
                <div className="mt-2 font-bold text-xl">{item.title}</div>
                <div className="mt-2">{item.discription}</div>
              </div>
            ))}
          </div>
        </div>
      </body>
    </html>
  );
}
