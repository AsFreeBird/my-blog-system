
import supabase from "../supabaseClient";
import { Tag } from "@/types/database";

export async function getTags() :Promise<Tag[] | null> {
    const {data,error} = await supabase.from("tags").select().order("create_date", { ascending: false });
    if (error) {    
        console.error("Error fetching tags:", error);
        return null;
    }
    return data || [];   
}

export async function createTag(tag: Tag): Promise<Tag | null> {
    const {data, error} = await supabase.from("tags").insert(tag).select().single();
    if (error) {
        console.error("Error creating tag:", error);
        return null;
    }
    return data || null;
    
}