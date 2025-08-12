export async function queryTags() {
  const response = await fetch("/api/tags");
  const data = await response.json();
  console.log("Fetched tags:", data);
  if (!data.success) {
    return [];
  }
  return data.data || [];
}
