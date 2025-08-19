"use client";

import "./../../globals.css";

import { useState, useEffect, useRef } from "react";
import { getTags } from "@/lib/db/tag";
import { getCategories } from "@/lib/db/category";
import { Article, ArticleWithRelations, Category, Tag } from "@/types/database";
import {
  getArticleById,
  addArticle as insertArticle,
} from "@/services/artices";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
export default function ArticleEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEdit = Boolean(id);

  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [showTypeDropdown, setTypeShowDropdown] = useState(false);
  const wrapperTypeRef = useRef<HTMLDivElement>(null);
  const wrapperTagsRef = useRef<HTMLDivElement>(null);
  const [cotagory, setCatogory] = useState<Category>();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [articleWithRelations, setArticle] = useState<ArticleWithRelations>();
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const item = await getArticleById(id);
        if (item) {
          setArticle(item);
        }
      }

      const categories = await getCategories();
      if (categories) {
        setCategories(categories);

        // 注意这里要用最新的文章数据，而不是闭包里的旧值
        const selectedCategory = categories.find(
          (cat) => cat.id === articleWithRelations?.category_id
        );
        if (selectedCategory) {
          setCatogory(selectedCategory);
        }
      }

      const tags = await getTags();
      if (tags) {
        setTags(tags);
      }
    };
    fetchData();
  }, []);

  // 监听点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperTypeRef.current &&
        !wrapperTypeRef.current.contains(event.target as Node)
      ) {
        setTypeShowDropdown(false);
      }
      if (
        wrapperTagsRef.current &&
        !wrapperTagsRef.current.contains(event.target as Node)
      ) {
        setShowTagsDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTagClick = (tag: Tag) => {
    setSelectedTags((prev) => {
      const exists = prev.find((t) => t.id === tag.id);
      if (exists) {
        // 已选 → 移除
        return prev.filter((t) => t.id !== tag.id);
      } else {
        // 未选 → 添加
        return [...prev, tag];
      }
    });
  };

  const addArticle = () => {
    if (!articleWithRelations?.title) {
      return alert("请输入标题");
    }
    if (!cotagory?.id) {
      return alert("请选择文章分类");
    }
    if (setSelectedTags.length === 0) {
      return alert("请选择文章标签");
    }
    if (!articleWithRelations?.content) {
      return alert("请输入文章内容");
    }
    const article: Article = {
      ...(articleWithRelations.id ? { id: articleWithRelations.id } : {}),
      user_id: articleWithRelations?.user_id
        ? articleWithRelations?.user_id
        : "1",
      title: articleWithRelations?.title,
      content: articleWithRelations?.content
        ? articleWithRelations?.content
        : articleWithRelations?.summary,
      summary: articleWithRelations?.summary,
      category_id: cotagory.id,
      cover_url: articleWithRelations?.cover_url
        ? articleWithRelations?.cover_url
        : "https://picsum.photos/seed/15/300/200",
      create_date: formatDate(new Date()),
    };
    console.log(article);
    if (isEdit) {
    } else {
      insertArticle(article).then((articl) => {
        if (articl) {
          if (isEdit) {
            toast.success("修改成功！");
          } else {
            toast.success("创建成功！");
          }
          router.back();
        }
      });
    }
  };

  function formatDate(date: Date) {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      " " +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds())
    );
  }

  return (
    <html>
      <body className="bg-gray-100 py-8 px-52">
        <Toaster position="top-center" />
        <div className="flex flex-col rounded-xl bg-white overflow-auto">
          <h1 className="title text-center">文章编辑</h1>
          <h3 className="px-9 font-medium text-base mt-6">文章标题</h3>
          <input
            className="input mx-9 w-auto mt-2"
            onChange={(e) => {
              setArticle((prev) => ({ ...prev!, title: e.target.value }));
            }}
            value={articleWithRelations?.title}
          />
          <h3 className="px-9 font-medium text-base mt-6">文章分类</h3>
          <div className="mx-9 mt-2 relative" ref={wrapperTypeRef}>
            <input
              className="input mt-2 w-full"
              value={cotagory?.text}
              onFocus={() => setTypeShowDropdown(true)}
            />

            {showTypeDropdown && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10 max-h-40 overflow-auto">
                {categories.map((item, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => {
                      setCatogory(item);
                      setTypeShowDropdown(false);
                    }}
                  >
                    {item?.text}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <h3 className="px-9 font-medium text-base mt-6">标签</h3>

          <div className="mx-9 mt-2 relative" ref={wrapperTagsRef}>
            {/* 显示已选标签 */}
            <div
              className="input mt-2 w-full flex flex-wrap gap-2 items-center cursor-text"
              onClick={() => setShowTagsDropdown(true)}
            >
              {selectedTags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1"
                >
                  {tag.text}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTags((prev) =>
                        prev.filter((t) => t.id !== tag.id)
                      );
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
              {/* 占位符 */}
              {selectedTags.length === 0 && (
                <span className="text-gray-400">选择标签</span>
              )}
            </div>

            {showTagsDropdown && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10 max-h-40 overflow-auto">
                {tags.map((item) => {
                  const isSelected = selectedTags.some((t) => t.id === item.id);
                  return (
                    <li
                      key={item.id}
                      className={`px-3 py-2 cursor-pointer ${
                        isSelected ? "bg-blue-100" : "hover:bg-blue-50"
                      }`}
                      onClick={() => handleTagClick(item)}
                    >
                      {item.text} {isSelected && "✓"}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <h3 className="px-9 font-medium text-base mt-6">正文内容</h3>
          <textarea
            className="mx-9 mt-2 h-60 border border-gray-300 
          rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              setArticle((prev) => ({ ...prev!, content: e.target.value }));
            }}
          >
            {articleWithRelations?.content
              ? articleWithRelations?.content
              : articleWithRelations?.summary}
          </textarea>
          <button className="btn mt-7 mx-9 mb-8" onClick={addArticle}>
            保存文章
          </button>
        </div>
      </body>
    </html>
  );
}
