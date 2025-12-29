import { getPostBySlug, getContent } from "@/lib/api";
// 其他 import...

// ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
// 1. 這是必要的函數，必須放在「最外層」
// ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
export async function generateStaticParams() {
  const posts = getContent("papers");
  
  // 防呆：如果沒文章，回傳空陣列
  if (!posts) return [];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
// 2. 這是你的頁面主程式，也必須放在「最外層」
// ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
export default async function PaperDetail({ params }: { params: { slug: string } }) {
  // ... 你的頁面程式碼 ...
  const { slug } = await Promise.resolve(params); // 這裡為了保險起見加上 await
  const post = getPostBySlug("papers", slug);
  
  // ...
  return (
    <main>...</main>
  )
}