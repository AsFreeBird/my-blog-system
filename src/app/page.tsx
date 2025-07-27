'use client';

import { useEffect } from "react";
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


async function fetchArticleById(id: number): Promise<ArticleWithRelations | null> {
  const response = await fetch(`/api/articles/${id}`);  
  const data: ApiResponse<ArticleWithRelations> = await response.json();
  console.log("Fetched article by ID:", data);
  if (!data.success) {
    return null;
  }
  return data.data || null; 
}

export default function Home() {

  useEffect(() => {
    // This effect runs once when the component mounts
    const fecthArticles =  fetchArticles(1,10);
    console.log("Articles fetched on mount:", fecthArticles);
    const article= fetchArticleById(1);
    console.log("Article fetched by ID on mount:", article);
    // You can add any initialization logic here
  }, []);


  return (
    <div>
      <main className="p-8 bg-gray-100 min-h-screen">
        <ArticleCard
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
        />
      </main>
    </div>
  );
}
