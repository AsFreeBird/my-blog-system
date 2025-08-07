
import { ArticleWithRelations } from "@/types/database";
type Props = {
  articleWithRelations: ArticleWithRelations;
};

export default function ArticleCard({
  articleWithRelations
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border flex flex-row transition hover:shadow-lg max-w-full h-60 md:h-48 ">
      {/* 封面图 */}
      <div className="w-full md:w-1/4 h-32 md:h-auto overflow-hidden">
        <img
          src={articleWithRelations.cover_url}
          alt={articleWithRelations.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 内容 */}
      <div className="flex flex-col justify-between p-3 w-full md:w-3/4">
        <div>
          {/* 标题 */}
          <h2 className="text-lg font-semibold mt-3 mb-3 text-gray-800 line-clamp-2">
            {articleWithRelations.title}
          </h2>

          {/* 摘要 */}
          <p className="text-gray-600 text-xs mb-3 line-clamp-2">{articleWithRelations.summary}</p>

          {/* 分类 */}
          <span className="text-xs text-gray-500">分类：</span>
          <span className="text-xs text-indigo-600 font-medium">{articleWithRelations.category?.text}</span>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mt-3">
            {articleWithRelations?.tags?.map((tag) => (
              <span
                key={tag.id}
                className="bg-blue-200 text-xs  px-2 py-0.5 rounded-full hover:bg-gray-200 transition"
              >
                #{tag.text}
              </span>
            ))}
          </div>
        </div>

        {/* 作者 & 评论
        <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
          <div className="flex items-center space-x-2">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-5 h-5 rounded-full"
            />
            <span>{author.name}</span>
            <span>· {createdAt}</span>
          </div>

          <div className="flex items-center space-x-1">
            <svg
              className="w-3.5 h-3.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path d="M7 8h10M7 12h6m-1 8-4-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3l-4 4z" />
            </svg>
            <span>{commentsCount}</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
