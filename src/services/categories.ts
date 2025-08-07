import { Category } from "@/types/database";

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch("/api/categories");
  const data = await response.json();
  console.log("Fetched categories:", data);
  if (!data.success) {
    return [];
  }
  return data.data || [];
}