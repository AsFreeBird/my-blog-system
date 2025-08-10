"use client";

import "./../../globals.css";
import { useEffect } from "react";
import { useState } from "react";
import { fetchArticles } from "@/services/artices";
import { ArticleWithRelations } from "@/types/database";
import dayjs from "dayjs";
export default function ArticlesManager() {
  const [articles, setArticles] = useState<ArticleWithRelations[]>([]);
  const [page, setPage] = useState(1); // 当前页码
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    // 初始加载文章
    console.log("Fetching articles on mount...");
    fetchArticles(page, 0, searchKeyword)
      .then((newArticles) => {
        console.log("Fetched articles on mount:", newArticles);
        console.log("Fetched articles on pageSize:", newArticles.length);
        // 分类变化后第一次加载，清空旧数据
        if (page === 0) {
          setArticles(newArticles);
        } else {
          setArticles((prev) => [...prev, ...newArticles]);
        }
      })
      .catch((error) => {
        console.error("Error fetching articles on mount:", error);
      });
  }, [page]);

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("搜索文章:", searchKeyword);
      setSearchKeyword(searchKeyword.trim());
      setPage(1); // 重置页码
      setArticles([]); // 清空当前文章列表
    }
  };

  const handleSearch = () => {
    console.log("搜索文章:", searchKeyword);
    setSearchKeyword(searchKeyword.trim());
    setPage(1); // 重置页码
    setArticles([]); // 清空当前文章列表
  };

  return (
    <html>
      <body className="bg-gray-100">
        <div className="flex flex-col items-center px-20 my-8">
          <h1 className="title mt-0">文章管理</h1>
          <div className="w-full rounded-3xl bg-white px-10 pt-7 mt-8">
            <div className="flex flex-row justify-between h-10">
              <button className="btn whitespace-nowrap">+文章新建</button>
              <div className="flex w-full justify-end">
                <input
                  className="input w-1/2 mr-3"
                  onKeyDown={handleKeydown}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button className="btn" onClick={handleSearch}>
                  搜索
                </button>
              </div>
            </div>
            <div className="my-8">
              <table className="table-fixed min-w-full border">
                <thead className="bg-slate-200">
                  <tr>
                    <th className="w-1.5/12 py-2 text-left px-4">ID</th>
                    <th className="w-3/12 py-2 text-left px-4">标题</th>
                    <th className="w-1.5/12 px-4 py-2 text-left ">分类</th>
                    <th className="w-2.5/12 px-4 py-2 text-left ">标签</th>
                    <th className="w-1.5/12 px-4 py-2 text-left ">发布日期</th>
                    <th className="w-2/12 px-4 py-2 text-left ">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-300 text-sm"
                    >
                      <td className="w-1.5/12 py-2 text-left px-4">
                        {item.id}
                      </td>
                      <td className="w-3/12 py-2 text-left px-4">
                        {item.title}
                      </td>
                      <td className="w-1.5/12 px-4 py-2 text-left ">
                        {item.category?.text}
                      </td>
                      <td className="w-2.5/12 px-4 py-2 text-left ">
                        {item.tags.map((tag) => tag.text).join(",")}
                      </td>
                      <td className="w-1.5/12 px-4 py-2 text-left ">
                        {dayjs(item.create_date).format("YYYY-MM-DD")}
                      </td>
                      <td className="w-2/12 px-4 py-2 text-left ">
                        <button className="btn py-1 px-2 text-sm mr-2">
                          编辑
                        </button>
                        <button className="btn py-1 px-2 text-sm bg-red-500 hover:bg-red-600">
                          删除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
