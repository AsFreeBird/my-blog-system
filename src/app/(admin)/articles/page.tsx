"use client";

import "./../../globals.css";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchArticles, pageSize ,deleteArticle} from "@/services/artices";
import { ArticleWithRelations } from "@/types/database";
import dayjs from "dayjs";
import { Toaster ,toast} from "react-hot-toast";

let hasFetchedRef = false;

export default function ArticlesManager() {
  const router = useRouter();
  const [articles, setArticles] = useState<ArticleWithRelations[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [reloadFlag, setReloadFlag] = useState(0);
  const [page, setPage] = useState(1); // 当前页码
  const [hasMore, setHasMore] = useState(true); // 是否还有数据

  const loader = useRef(null);

  useEffect(() => {
    // 初始加载文章
    if (hasFetchedRef) return;
    hasFetchedRef = true;
    console.log("Fetching articles on mount...");
    fetchArticles(page, 0, searchKeyword)
      .then((newArticles) => {
        console.log("Fetched articles on mount:", newArticles);
        console.log("Fetched articles on pageSize:", newArticles.length);
        hasFetchedRef = false;
        if (page === 1) {
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
  }, [page, reloadFlag]);

  //是否有更多
  useEffect(() => {
    const observe = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("IntersectionObserver>>>", page);
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

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("搜索文章:", searchKeyword);
      setArticles([]); // 清空当前文章列表
      setSearchKeyword(searchKeyword.trim());
      setReloadFlag(Date.now());
    }
  };

  const handleSearch = () => {
    console.log("搜索文章:", searchKeyword);
    setArticles([]); // 清空当前文章列表
    setSearchKeyword(searchKeyword.trim());
    setReloadFlag(Date.now());
  };

  const createArticle = () => {
    router.push("/articles-edit");
  };

  const handleDelete = (id?: number) => {
    if(id){
      deleteArticle(id).then((isSuccess)=>{
        if(isSuccess){
          toast.success("删除成功");
          setPage(1);
          setReloadFlag(Date.now());
        }else{
          toast.success("删除失败");
        }
      });
    }
  }

  const handleEdit = (id?: number) => {
    console.log("handle edit:",id);
    if(id){
      router.push(`/articles-edit?id=${id}`);
      
    }
  }

  return (
    <html>
      <body className="bg-gray-100">
        <Toaster position="top-center" />
        <div className="flex flex-col items-center px-20 my-8">
          <h1 className="title mt-0">文章管理</h1>
          <div className="w-full rounded-3xl bg-white px-10 pt-7 mt-8">
            <div className="flex flex-row justify-between h-10">
              <button className="btn whitespace-nowrap" onClick={createArticle}>
                +文章新建
              </button>
              <div className="flex w-full justify-end">
                <input
                  className="input w-1/2 mr-3"
                  onKeyDown={handleKeydown}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button className="btn" onClick={handleSearch}>
                  搜索
                </button>
              </div>
            </div>
            <div className="my-8">
              <table className="table-fixed min-w-full border">
                <thead className="bg-slate-200">
                  <tr>
                    <th className="w-1.5/12 py-2 text-left px-4">ID</th>
                    <th className="w-3/12 py-2 text-left px-4">标题</th>
                    <th className="w-1.5/12 px-4 py-2 text-left ">分类</th>
                    <th className="w-2.5/12 px-4 py-2 text-left ">标签</th>
                    <th className="w-1.5/12 px-4 py-2 text-left ">发布日期</th>
                    <th className="w-2/12 px-4 py-2 text-left ">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-300 text-sm"
                    >
                      <td className="w-1.5/12 py-2 text-left px-4">
                        {item.id}
                      </td>
                      <td className="w-3/12 py-2 text-left px-4">
                        {item.title}
                      </td>
                      <td className="w-1.5/12 px-4 py-2 text-left ">
                        {item.category?.text}
                      </td>
                      <td className="w-2.5/12 px-4 py-2 text-left ">
                        {item.tags.map((tag) => tag.text).join(",")}
                      </td>
                      <td className="w-1.5/12 px-4 py-2 text-left ">
                        {dayjs(item.create_date).format("YYYY-MM-DD")}
                      </td>
                      <td className="w-2/12 px-4 py-2 text-left ">
                        <button className="btn py-1 px-2 text-sm mr-2" 
                          onClick={()=>handleEdit(item.id)}>
                          编辑
                        </button>
                        <button className="btn py-1 px-2 text-sm bg-red-500 hover:bg-red-600"
                          onClick={()=>handleDelete(item.id)}
                        >
                          删除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              ref={loader}
              className="h-16 w-full flex items-center justify-center"
            >
              {hasMore ? (
                <div className="text-gray-500">加载更多...</div>
              ) : (
                <div className="text-gray-500"></div>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
