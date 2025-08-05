"use client";
import Link from "next/link";
import "./globals.css";
import { useEffect, useState } from "react";
import { Category } from "@/types/database";
import ArticleCard from "./components/article-card";
import { ApiResponse } from "@/types/api";
import { ArticleWithRelations } from "@/types/database";

async function fetchArticles(page: number, pageSize: number): Promise<ArticleWithRelations[]> {
  const response = await fetch(`/api/articles?page=${page}&pageSize=${pageSize}`);
  const data:ApiResponse<ArticleWithRelations[]>= await response.json();
  console.log("Fetched articles:", data);
  if (!data.success) {
    return [];
  }
  return  data.data || [];
}

// async function fetchArticleById(id: number): Promise<ArticleWithRelations | null> {
//   const response = await fetch(`/api/articles/${id}`);
//   const data: ApiResponse<ArticleWithRelations> = await response.json();
//   console.log("Fetched article by ID:", data);
//   if (!data.success) {
//     return null;
//   }
//   return data.data || null;
// }
async function fetchCategories(): Promise<Category[]> {
  const response = await fetch("/api/categories");
  const data = await response.json();
  console.log("Fetched categories:", data);
  if (!data.success) {
    return [];
  }
  return data.data || [];
}
export default function Home() {
  const [articles, setArticles] = useState<ArticleWithRelations[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetchCategories()
      .then((categories) => {
        console.log("Fetched categories on mount:", categories);
        const allOption: Category = {
          id: 0,
          text: "全部",
          create_date: "",
          selected: true,
        };
        const newCategories: Category[] = [allOption, ...categories];
        setCategories(newCategories); // 如果有状态管理，可以在这里更新状态
      })
      .catch((error) => {
        console.error("Error fetching categories on mount:", error);
      });

    // This effect runs once when the component mounts
    fetchArticles(1,10).then((articles) => {
      setArticles(articles);
      console.log("Fetched articles on mount:", articles);
    } 
    ).catch((error) => {
      console.error("Error fetching articles on mount:", error);
    });
    // console.log("Articles fetched on mount:", fecthArticles);
    // const article= fetchArticleById(1);
    // console.log("Article fetched by ID on mount:", article);
    // You can add any initialization logic here
  }, []);

  return (
    <div>
      <main className="pt-4 bg-gray-100 min-h-screen">
        {/* <ArticleCard
          title="深入理解 React 性能优化"
          summary="本文将从 React 的渲染机制入手，讲解如何使用 memo、useCallback 等方法优化性能..."
          imageUrl="https://picsum.photos/id/1005/600/400" // ✅ 已验证可加载
          author={{
            name: "李明",
            avatar: "https://i.pravatar.cc/150?img=3", // ✅ 稳定头像源
          }}
          createdAt="2025年7月24日"
          category="前端开发"
          tags={["React", "性能优化", "Hooks"]}
          commentsCount={12}
        /> */}
        <div className="flex flex-col items-center justify-between w-full">
          <input type="text" placeholder="搜索文章" className="input w-1/3" />
          <h1 className="mt-4 font-bold text-2xl">
            一页一语，记录日常，分享所学
          </h1>
          <div>
            <ul className="flex flex-wrap justify-center mt-4">
              {categories.map((category: any) => (
                <li key={category.id} className="mt-2">
                  <button
                    className={`mr-4 btn_gray_rounded ${
                      category.selected ? "btn_active" : ""
                    }`}
                    onClick={() => {
                      // 处理分类点击逻辑
                      console.log("Selected category:", category.text);
                      // 可以在这里更新状态或进行其他操作
                      const updatedCategories = categories.map((cat) =>
                        cat.id === category.id
                          ? { ...cat, selected: true }
                          : { ...cat, selected: false }
                      );
                      setCategories(updatedCategories);
                    }}
                  >
                    {category.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 max-w-screen-xl w-full px-16 mt-5">
            {articles.map((article) => (
              <ArticleCard key={article.id} articleWithRelations={article} />
            ))}
          </div>
          {/* <ArticleCard /> */}
        </div>
      </main>
    </div>
  );
}
