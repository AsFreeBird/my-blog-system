import ArticleCard from "./components/article-card";

export default function Home() {
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
