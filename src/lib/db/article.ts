import supabase from "../supabaseClient";
import { Article, ArticleWithRelations, Tag } from "@/types/database";

export async function getArticlesWithRelation(
  from: number,
  to: number,
  categoryId?: number,
  keyword?: string
): Promise<ArticleWithRelations[]> {
  let query = supabase
    .from("articles")
    .select(
      `
    *,
    category:category_id (*)
    ,
      article_tags (
        tag:tag_id (
          id, text, create_date
        )
      )
    `
    )
    .order("create_date", { ascending: false });

  if (categoryId && categoryId > 0) {
    query = query.eq("category_id", categoryId.toString());
  }

  if (keyword && keyword.trim() !== "") {
    query = query.ilike("title", `%${keyword}%`);
  }

  query = query.range(from, to);
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching articles:", error);
    throw new Error(error.message);
  }

  const normalized = (data || []).map((article) => ({
    ...article,
    tags: article.article_tags?.map((e: { tag: Tag }) => e.tag) || [],
  }));
  console.log(
    "Normalized articles with relations:",
    JSON.stringify(normalized, null, 2)
  );
  return normalized;
}

export async function getArticleWithRelationById(id: string) {
  const { data, error } = await supabase
    .from("articles")
    .select(
      `
      *,
      category:category_id (*),
      article_tags (
        tag:tag_id (
          id, text, create_date
        )
      )
      `
    )
    .eq("id", id) // 根据主键 id 查
    .single(); // 返回单条数据（不是数组）

  if (error) {
    console.error("Error fetching article by id:", error);
    return null;
  }
  return data;
}

// export async function getArticleById(id: string): Promise<Article | null> {
//   const { data, error } = await supabase
//     .from("articles")
//     .select("*")
//     .eq("id", id)
//     .single();
//   if (error) {
//     console.error("Error fetching article by ID:", error);
//     return null;
//   }
//   return data || null;
// }

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
    .from("articles")
    .insert(article)
    .select()
    .single();
  if (error) {
    console.error("Error creating article:", error.message);
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

export async function deleteArticle(id: number): Promise<boolean> {
  console.log("delete article db", id);
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) {
    console.error("Error delete article:", error);
    return false;
  }
  return true;
}
