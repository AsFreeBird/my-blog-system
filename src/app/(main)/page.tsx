"use client";
import "./../globals.css";
import { useEffect, useState, useRef } from "react";
import { Category } from "@/types/database";
import ArticleCard from "../../components/article-card";
import { ArticleWithRelations } from "@/types/database";

import { fetchArticles, pageSize } from "@/services/artices";
import { fetchCategories } from "@/services/categories";
import { useRouter } from "next/navigation";
let hasFetchedRef = false;

export default function Home() {
  const router = useRouter();
  const [articles, setArticles] = useState<ArticleWithRelations[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [page, setPage] = useState(1); // 当前页码
  const [hasMore, setHasMore] = useState(true); // 是否还有数据

  const loader = useRef(null);

  useEffect(() => {
    // 初始加载文章
    if (hasFetchedRef) return;
    hasFetchedRef = true;
    console.log("Fetching articles on mount...");
    fetchArticles(page, selectedCategory?.id || 0, searchKeyword)
      .then((newArticles) => {
        hasFetchedRef = false;
        console.log("Fetched articles on mount:", newArticles);
        console.log("Fetched articles on pageSize:", newArticles.length);
        // 分类变化后第一次加载，清空旧数据
        if (page === 0) {
          setArticles(newArticles);
        } else {
          setArticles((prev) => [...prev, ...newArticles]);
        }

        // 判断是否还有更多
        if (newArticles.length < pageSize) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      })
      .catch((error) => {
        hasFetchedRef = false;
        console.error("Error fetching articles on mount:", error);
      });
  }, [page]);

  //是否有更多
  useEffect(() => {
    const observe = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );
    if (loader.current) {
      observe.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observe.unobserve(loader.current);
      }
    };
  }, [hasMore]);
  const jumpDetail = (id?: number) => {
    // 跳转到文章详情页
    console.log("跳转到文章详情页，ID:", id);
    router.push(`/detail/${id}`);
  }
  useEffect(() => {
    fetchCategories()
      .then((categories) => {
        console.log("Fetched categories on mount:", categories);
        const allOption: Category = {
          id: 0,
          text: "全部",
          create_date: "",
          selected: true,
        };
        const newCategories: Category[] = [allOption, ...categories];
        setCategories(newCategories); // 如果有状态管理，可以在这里更新状态
      })
      .catch((error) => {
        console.error("Error fetching categories on mount:", error);
      });
  }, []);

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("搜索文章:", searchKeyword);
      setSearchKeyword(searchKeyword.trim());
      setPage(1); // 重置页码
      setHasMore(true); // 重置是否有更多
      setArticles([]); // 清空当前文章列表
    }
  };

  const onTypeSearch = (category: Category) => {
    // 处理分类点击逻辑
    console.log("Selected category:", category.text);
    //更新分类选中状态
    setCategories((prevCategories) => {
      return prevCategories.map((cat) => ({
        ...cat,
        selected: cat.id === category.id,
      }));
    });
    //根据分类筛选文章
    setSelectedCategory(category.id === 0 ? null : category);
    setPage(1); // 重置页码
    setHasMore(true); // 重置是否有更多
    setArticles([]); // 清空当前文章列表
  };
  return (
    <div>
      <main className="pt-4 bg-gray-100 min-h-screen">
        <div className="flex flex-col items-center justify-between w-full">
          <input
            type="text"
            placeholder="搜索文章"
            className="input w-1/3"
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeydown}
          />
          <h1 className="mt-4 font-bold text-2xl">
            一页一语，记录日常，分享所学
          </h1>
          <div>
            <ul className="flex flex-wrap justify-center mt-4">
              {categories.map((category: Category) => (
                <li key={category.id} className="mt-2">
                  <button
                    className={`mr-4 btn_gray_rounded ${
                      category.selected ? "btn_active" : ""
                    }`}
                    onClick={() => onTypeSearch(category)}
                  >
                    {category.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 max-w-screen-xl w-full px-16 mt-5">
            {articles.map((article) => (
              <ArticleCard key={article.id} articleWithRelations={article} 
              handleClick={() => jumpDetail(article.id)}
              />
            ))}
          </div>
          <div
            ref={loader}
            className="h-16 w-full flex items-center justify-center"
          >
            {hasMore ? (
              <div className="text-gray-500">加载更多...</div>
            ) : (
              <div className="text-gray-500">没有更多文章了</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
