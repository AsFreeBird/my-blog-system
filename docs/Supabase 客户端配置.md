# 2.2 Supabase 客户端配置

本节介绍如何在项目中配置 Supabase 客户端，以便连接数据库并进行数据操作和用户认证。

---

## 安装 Supabase SDK


npm install @supabase/supabase-js

## 创建 Supabase 项目并获取凭证
访问 Supabase 官网，注册并登录。

创建新项目，完成数据库初始化。

在项目设置（Settings） → API 中，找到 项目 URL 和 匿名公钥（anon key）。

## 配置环境变量

在项目根目录创建 .env.local 文件（Next.js 推荐使用此文件存放本地环境变量），写入：

NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
注意：NEXT_PUBLIC_ 前缀表示这些变量可用于浏览器端。

## 初始化 Supabase 客户端

在项目中新建文件，例如 src/lib/supabaseClient.ts，添加如下代码：

```ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```
这里的 ! 是 TypeScript 的非空断言，告诉编译器环境变量一定存在。

## 使用示例
在页面或 API 中调用 Supabase 客户端获取数据示例：

```ts
import { supabase } from '../lib/supabaseClient';

export async function getArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*');

  if (error) {
    console.error('获取文章失败:', error);
    return [];
  }

  return data;
}
```
## 参考链接
- [Supabase 官方文档](https://supabase.com/docs)
- [Supabase JavaScript SDK GitHub](https://github.com/supabase/supabase-js)