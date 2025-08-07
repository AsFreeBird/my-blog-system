import { ApiResponse } from "@/types/api";
import { ArticleWithRelations } from "@/types/database";

export const pageSize = 10; // 每页条数

export async function fetchArticles(
  page: number,
  categoryId:number = 0,
  keyword: string = ""
): Promise<ArticleWithRelations[]> {
  console.log("Fetching articles for page:", page, "categoryId:", categoryId);
  const response = await fetch(
    `/api/articles?page=${page}&pageSize=${pageSize}&categoryId=${categoryId}&keyword=${keyword}`
  );
  console.log("Fetching articles response:", response.json);
  const data: ApiResponse<ArticleWithRelations[]> = await response.json();
  console.log("Fetched articles data:", data);
  if (!data.success) {
    return [];
  }
  return data.data || [];
}


export async function loadArticlesByCategory(
  id: number,
  page: number,
  pageSize: number
): Promise<ApiResponse<ArticleWithRelations[]>> {
  try {
    const response = await fetch(
      `/api/articles?categoryId=${id}&page=${page}&pageSize=${pageSize}`
    );
    const data: ApiResponse<ArticleWithRelations[]> = await response.json();
    console.log("Fetched articles by category:", data);
    return data;
  } catch (err) {
    console.error("加载分类文章失败:", err);
    return {
      success: false,
      data: [],
      message: "Failed to fetch articles by category.",
      errorCode: "SERVER_ERROR",
    };
  }
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