# 📝 个人博客系统

一个功能完善的个人博客系统，使用 Next.js 15 + + TypeScript + Supabase + Tailwind CSS构建.

## 🌟 项目特色

- **现代化技术栈**：Next.js 15 + TypeScript + Supabase + Tailwind CSS
- **服务端渲染**：优化 SEO 和首屏加载速度
- **增量静态再生**：ISR 策略提升性能
- **智能认证系统**：使用 `headers().get('origin')` 自动适配多环境
- **实时评论**：基于 Supabase 的评论系统
- **标签分类**：文章标签管理和筛选
- **管理后台**：文章和评论的后台管理
- **响应式设计**：完美适配各种设备

## 🔧 开发过程

### ✅ 第一阶段：项目初始化

- [x] Next.js 项目创建
- [x] 基础配置完成

### ✅ 第二阶段：数据库设计与集成

- [x] Supabase 客户端配置
- [x] TypeScript 类型定义
- [x] 数据库表结构设计
- [x] 数据访问层实现
  - [x] 文章 CRUD 操作
  - [x] 标签管理功能
  - [x] 评论系统功能
- [x] 行级安全策略(RLS)配置

### ✅ 第三阶段：API 层实现

- [x] API 路由设计
  - [x] 文章 API (`/api/articles`, `/api/articles/[slug]`)
  - [x] 标签 API (`/api/tags`)
  - [x] 评论 API (`/api/comments`)
- [x] 数据验证和错误处理
  - [x] Zod 验证规则
  - [x] 统一错误处理机制
  - [x] API 响应格式标准化
- [x] 缓存策略实现
  - [x] 响应缓存配置
  - [x] 限流机制
  - [x] 安全防护

### ✅ 第四阶段：页面开发

- [x] 基础布局组件
  - [x] 响应式导航栏 (Navigation) - 已集成登录状态
  - [x] 页脚组件 (Footer)
  - [x] 主布局容器 (MainLayout)
- [x] 文章列表页
  - [x] 文章卡片组件 (ArticleCard)
  - [x] 搜索和筛选组件 (SearchAndFilter)
  - [x] 分页组件 (Pagination)
  - [x] 文章列表页面 (/articles)
- [x] 文章详情页
  - [x] 动态路由页面 (/articles/[slug])
  - [x] 文章详情展示组件
  - [x] 面包屑导航
  - [x] 文章元信息展示
  - [x] 标签展示和链接
  - [x] Markdown 内容渲染
  - [x] 骨架屏加载状态
  - [x] 错误处理和 404 页面
- [x] 文章创建/编辑页
  - [x] 文章创建页面 (/admin/articles/new)
  - [x] 文章编辑页面 (/admin/articles/[slug]/edit)
  - [x] ArticleForm 组件实现
  - [x] Markdown 编辑器和实时预览
  - [x] 标签选择功能
  - [x] 表单验证和错误处理
- [x] 管理后台页面
  - [x] 管理后台首页 (/admin)
  - [x] 文章管理页面 (/admin/articles)
  - [x] 标签管理页面 (/admin/tags)
  - [x] 统计信息展示
  - [x] 快速操作面板

## 🎮 功能演示

### 核心功能

- ➕ **添加待办事项**: 支持快速添加
- ✏️ **编辑功能**: 点击编辑按钮进入编辑模式
- ✅ **完成标记**: 复选框切换完成状态，已完成项显示删除线
- 🗑️ **删除功能**: 删除不需要的待办事项
- 🔍 **智能筛选**: All/Completed/InProgress 三种视图模式

### 增强特性

- 💿 **自动保存**: 实时同步到 localStorage，刷新页面数据不丢失

## 🛠️ 技术栈

| 技术             | 版本   | 用途                                    |
| ---------------- | ------ | --------------------------------------- |
| **React**        | 19.1.0 | 前端框架                                |
| **JavaScript**   | 5.0.1 |                                |
| **React Hooks**  | -      | 状态管理 (useState, useEffect, useMemo) |
| **CSS3、styled-components**         | -      | 样式设计           |
| **localStorage** | -      | 数据持久化                              |

## 📁 项目结构

```
react-todolist/
├── public/                 # 静态资源
│   ├── index.html         # HTML 模板
│   └── favicon.ico        # 网站图标
├── src/                   # 源代码
│   ├── App.js            # 主应用组件
│   ├── App.css           # 全局样式
│   ├── Checkbox.jsx      # 自定义选择框
│   ├── index.js          # 应用入口
│   ├── RadioGroup.jsx    # 自定义单选框
│   ├── TodoItem.jsx      # 单个待办项组件
│   └── TodoList.jsx      # 待办列表主组件
├── package.json          # 依赖配置
└── README.md            # 项目说明
```

## 🧩 核心组件说明

### TodoList.jsx

**主要功能组件**，负责：

- 状态管理 (todos, inputValue, selectType)
- 数据持久化 (localStorage)
- 业务逻辑 (增删改查、筛选)
- 性能优化 (useMemo)

### TodoItem.jsx

**子组件**，负责：

- 单个待办事项的展示
- 编辑模式的状态管理
- 用户交互事件处理

## 📚 学习要点

### React 核心概念

1. **函数组件**: 使用现代 React 函数组件模式
2. **Hooks 使用**:
   - `useState`: 状态管理
   - `useEffect`: 副作用处理
   - `useMemo`: 性能优化
3. **组件通信**: Props 传递和事件回调
4. **条件渲染**: 根据状态动态显示内容

## 🎯 待优化功能

### 功能扩展

- [ ] 拖拽排序
- [ ] 优先级设置
- [ ] 分类标签
- [ ] 搜索功能

### 技术改进

- [ ] 服务端数据同步 
- **项目类型**: 学习项目 / 实战练习
- **技术重点**: React + JavaScript + 性能优化