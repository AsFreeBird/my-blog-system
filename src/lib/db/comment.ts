
import supabase from "../supabaseClient";
import { Comment } from "@/types/database";

export async function getCommentsByArticleId(articleId: string): Promise<Comment[] | null> {
    const { data, error } = await supabase
        .from("comments")
        .select()
        .eq("article_id", articleId)
        .order("create_date", { ascending: false });

    if (error) {
        console.error("Error fetching comments:", error);
        return null;
    }
    return data || [];
}