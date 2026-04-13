import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content");

// 1. 定義文章的資料結構 (Interface)
// 這裡要把所有你在 config.yml 定義的欄位都寫進來
export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  lastmod?: string | null; // ? 代表這個欄位是選填的
  
  // Papers 專用欄位
  venue?: string;
  authors?: string;
  link?: string;
  type?: string;

  // Toys 專用欄位
  image?: string;
}

// 2. 讀取所有文章列表
export function getContent(type: "toys" | "papers"): Post[] {
  const dir = path.join(contentDirectory, type);
  if (!fs.existsSync(dir)) return [];

  const fileNames = fs.readdirSync(dir);
  
  const allContent = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(dir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // 強制告訴 TypeScript 這裡回傳的是 Post 型別
    return {
      slug,
      ...data,
      content,
      date: data.date ? new Date(data.date).toISOString() : "",
      lastmod: data.lastmod ? new Date(data.lastmod).toISOString() : null,
    } as Post; 
  });

  return allContent.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 3. 讀取單篇文章
export function getPostBySlug(type: "toys" | "papers", slug: string): Post | null {
  try {
    const fullPath = path.join(contentDirectory, type, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      ...data,
      content,
      date: data.date ? new Date(data.date).toISOString() : "",
      lastmod: data.lastmod ? new Date(data.lastmod).toISOString() : null,
    } as Post;
  } catch {
    return null;
  }
}