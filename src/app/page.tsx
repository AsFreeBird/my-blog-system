"use client";
import Link from "next/link";
import "./globals.css";
import { useEffect, useState,useRef } from "react";
import { Category } from "@/types/database";
import ArticleCard from "./components/article-card";
import { ApiResponse } from "@/types/api";
import { ArticleWithRelations } from "@/types/database";

async function fetchArticles(
  page: number,
  pageSize: number
): Promise<ArticleWithRelations[]> {
  const response = await fetch(
    `/api/articles?page=${page}&pageSize=${pageSize}`
  );
  const data: ApiResponse<ArticleWithRelations[]> = await response.json();
  console.log("Fetched articles:", data);
  if (!data.success) {
    return [];
  }
  return data.data || [];
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
  const [page, setPage] = useState(0); // 当前页码
  const [hasMore, setHasMore] = useState(true); // 是否还有数据
  const pageSize = 10; // 每页条数
  const loader = useRef(null);

  const loadArticles = async (page: number) => {
    try {
      const newArticles = await fetchArticles(page, pageSize);
      setArticles((prev) => [...prev, ...newArticles]);
      setHasMore(newArticles.length === pageSize);
    } catch (err) {
      console.error("加载文章失败:", err);
      setHasMore(false);
    }
  };

  useEffect(() => {
    // 初始加载文章
    loadArticles(page);
  }, [page]);

  //是否有更多
  useEffect(()=>{
    const observe = new IntersectionObserver((entries)=> {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    }, {threshold: 1.0});
    if (loader.current) {
      observe.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observe.unobserve(loader.current);
      }
    };
  },[hasMore]);

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
   
    // console.log("Articles fetched on mount:", fecthArticles);
    // const article= fetchArticleById(1);
    // console.log("Article fetched by ID on mount:", article);
    // You can add any initialization logic here
  }, []);


  return (
    <div>
      <main className="pt-4 bg-gray-100 min-h-screen">
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
          <div ref={loader} className="h-16 w-full flex items-center justify-center">
              {hasMore  ? (
                <div className="text-gray-500">加载更多...</div> 
              ) : (
                <div className="text-gray-500">没有更多文章了</div>
              )}
          </div>
        </div>
      </main>
    </div>
  );
}
