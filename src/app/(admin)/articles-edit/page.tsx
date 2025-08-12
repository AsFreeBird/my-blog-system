"use client";

import "./../../globals.css";

import { useState, useEffect, useRef } from "react";
import { getTags } from "@/lib/db/tag";
import { getCategories } from "@/lib/db/category";
import { Category, Tag } from "@/types/database";
export default function ArticleEdit() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [showTypeDropdown, setTypeShowDropdown] = useState(false);
  const [inputTypeValue, setInputTypeValue] = useState("");
  const [inputTagsValue, setInputTagsValue] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    getCategories().then((categories) => {
      if (categories) {
        setCategories(categories);
      }
    });
    getTags().then((tags) => {
      if (tags) {
        setTags(tags);
      }
    });
  }, []);

  // 监听点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setTypeShowDropdown(false);
        setShowTagsDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <html>
      <body className="bg-gray-100 py-8 px-52">
        <div className="flex flex-col rounded-xl bg-white overflow-auto">
          <h1 className="title text-center">文章编辑</h1>
          <h3 className="px-9 font-medium text-base mt-6">文章标题</h3>
          <input className="input mx-9 w-auto mt-2" />
          <h3 className="px-9 font-medium text-base mt-6">文章分类</h3>
          <div className="mx-9 mt-2 relative" ref={wrapperRef}>
            <input
              className="input mt-2 w-full"
              value={inputTypeValue}
              onFocus={() => setTypeShowDropdown(true)}
            />

            {showTypeDropdown && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10 max-h-40 overflow-auto">
                {categories.map((item, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => {
                      setInputTypeValue(item.text);
                      setTypeShowDropdown(false);
                      console.log(">>>>>>>", item.text);
                    }}
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <h3 className="px-9 font-medium text-base mt-6">标签</h3>

          <div className="mx-9 mt-2 relative" ref={wrapperRef}>
            <input
              className="input mt-2 w-full"
              value={inputTagsValue}
              onFocus={() => setShowTagsDropdown(true)}
            />
            {showTagsDropdown && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10 max-h-40 overflow-auto">
                {tags.map((item, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => {
                      setInputTagsValue(item.text);
                      setShowTagsDropdown(false);
                      console.log(">>>>>>>", item.text);
                    }}
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <h3 className="px-9 font-medium text-base mt-6">正文内容</h3>
          <textarea className="mx-9 mt-2 h-60 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          <button className="btn mt-7 mx-9 mb-8">保存文章</button>
        </div>
      </body>
    </html>
  );
}
