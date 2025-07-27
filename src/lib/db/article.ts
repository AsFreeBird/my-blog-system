import supabase from "../supabaseClient";
import { Article, ArticleWithRelations } from "@/types/database";

export async function getArticlesWithRelation(
  from: number,
  to: number
): Promise<ArticleWithRelations[]> {
  const { data, error } = await supabase
    .from("articles")
    .select(
      `
    *,
    category:category_id (*)
    `
    )
    .order("create_date", { ascending: false })
    .range(from, to);
  if (error) {
    console.error("Error fetching articles:", error);
    throw new Error(error.message);
  }
  console.log("Fetched articles with relations:", data);
  return data || [];
}


export async function getArticleById(id: number): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching article by ID:", error);
    return null;
  }
  return data || null;
}

export async function getArticlesByCategory(
  categoryId: number,
  from: number,
  to: number
): Promise<ArticleWithRelations[]> {
  const { data, error } = await supabase
    .from("articles")
    .select(
      `
    *,
    category:category_id (*)
    `
    )
    .eq("category_id", categoryId)
    .order("create_date", { ascending: false })
    .range(from, to);
  if (error) {
    console.error("Error fetching articles by category:", error);
    throw new Error(error.message);
  }
  return data || [];
}

export async function getArticlesbyKeywords(
  keywords: string,
  from: number,
  to: number
): Promise<ArticleWithRelations[]> {
  const { data, error } = await supabase
    .from("articles")
    .select(
      `
    *,
    category:category_id (*)
    `
    )
    .ilike("title", `%${keywords}%`)
    .or(`summary.ilike.%${keywords}%`)
    .order("create_date", { ascending: false })
    .range(from, to);
  if (error) {
    console.error("Error fetching articles by keywords:", error);
    throw new Error(error.message);
  }
  return data || [];
}



export async function createArticle(article: Article): Promise<Article | null> {
  const { data, error } = await supabase
    .from("article")
    .insert(article)
    .select()
    .single();
  if (error) {
    console.error("Error creating article:", error);
    return null;
  }
  return data || null;
}

export async function updateArticle(
  id: string,
  article: Partial<Article>
): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .update(article)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    console.error("Error updating article:", error);
    return null;
  }
  return data || null;
}
