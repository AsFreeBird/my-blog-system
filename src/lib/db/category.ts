import supabase from "../supabaseClient";
import { Category } from "@/types/database";

export async function getCategories(): Promise<Category[] | null> {
    const { data, error } = await supabase.from("categories").select().order("create_date", { ascending: false });
    if (error) {
        console.error("Error fetching categories:", error);
        return null;
    }
    console.log("Fetched categories from DB:", data);
    return data || [];
}

export async function createCategory(category: Category): Promise<Category | null> {
    const { data, error } = await supabase.from("categories").insert(category).select().single();
    if (error) {
        console.error("Error creating category:", error);
        return null;
    }
    return data || null;
}
