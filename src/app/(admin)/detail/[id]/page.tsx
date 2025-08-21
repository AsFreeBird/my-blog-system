"use client";

import "./../../../globals.css";
import { useState, useEffect } from "react";
import { ArticleWithRelations } from "@/types/database";
import { getArticleById } from "@/services/artices";
import { format } from "date-fns";
export default function ArticleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [articleWithRelations, setArticle] = useState<ArticleWithRelations>();
  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const item = await getArticleById(params.id);
        if (item) {
          setArticle(item);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <html>
      <body className="bg-gray-100 py-8 px-52">
        <div className="flex flex-col rounded-xl bg-white overflow-auto py-8">
          <h1 className="title mx-9 w-auto mt-3">
            {articleWithRelations?.title}
          </h1>
          <div className="font-medium text-base mt-6  mx-9">
            <span className="text-gray-500 btn_default px-3 py-1 rounded-xl">
              {articleWithRelations?.category?.text}
            </span>
            <span className="text-gray-500 ml-4">
              {articleWithRelations?.create_date
                ? format(
                    new Date(articleWithRelations.create_date),
                    "yyyy-MM-dd"
                  )
                : ""}
            </span>
            <span className="text-gray-500 ml-4">
              {articleWithRelations?.tags &&
              articleWithRelations.tags.length > 0
                ? `标签：${articleWithRelations.tags
                    .map((tag) => tag.text)
                    .join(", ")}`
                : "标签：无"}
            </span>
          </div>
          <img
            className="mt-6 mx-9 rounded-lg h-56"
            src={articleWithRelations?.cover_url || "/default-image.jpg"}
            alt="文章图片"
          />
          <p className="mt-6 mx-9 text-gray-700">
            {articleWithRelations?.content
              ? articleWithRelations?.content
              : articleWithRelations?.summary}
          </p>
          
        </div>
      </body>
    </html>
  );
}
