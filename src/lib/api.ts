import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content");

export interface CvExperience {
  year: string;
  role: string;
  org: string;
  desc: string;
}

export interface CvEducation {
  year: string;
  school: string;
  degree: string;
}

export interface CvPublication {
  type: string;
  title: string;
  venue: string;
  authors: string;
  link?: string | null;
}

export interface CvData {
  nameTop: string;
  nameBottom: string;
  role: string;
  loc: string;
  focus: string;
  summaryTitle: string;
  summary: string;
  expTitle: string;
  eduTitle: string;
  tblDegree: string;
  tblSchool: string;
  tblYear: string;
  tblRole: string;
  tblOrg: string;
  techTitle: string;
  pubTitle: string;
  download: string;
  downloadUrl: string;
  experiences: CvExperience[];
  education: CvEducation[];
  skills: string[];
  publications: CvPublication[];
}

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

export function getCv(): CvData {
  const fullPath = path.join(contentDirectory, "cv.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return {
    nameTop: String(data.nameTop ?? ""),
    nameBottom: String(data.nameBottom ?? ""),
    role: String(data.role ?? ""),
    loc: String(data.loc ?? ""),
    focus: String(data.focus ?? ""),
    summaryTitle: String(data.summaryTitle ?? ""),
    summary: String(data.summary ?? ""),
    expTitle: String(data.expTitle ?? ""),
    eduTitle: String(data.eduTitle ?? ""),
    tblDegree: String(data.tblDegree ?? ""),
    tblSchool: String(data.tblSchool ?? ""),
    tblYear: String(data.tblYear ?? ""),
    tblRole: String(data.tblRole ?? ""),
    tblOrg: String(data.tblOrg ?? ""),
    techTitle: String(data.techTitle ?? ""),
    pubTitle: String(data.pubTitle ?? ""),
    download: String(data.download ?? ""),
    downloadUrl: String(data.downloadUrl ?? ""),
    experiences: Array.isArray(data.experiences)
      ? data.experiences.map((item: Partial<CvExperience>) => ({
          year: String(item.year ?? ""),
          role: String(item.role ?? ""),
          org: String(item.org ?? ""),
          desc: String(item.desc ?? ""),
        }))
      : [],
    education: Array.isArray(data.education)
      ? data.education.map((item: Partial<CvEducation>) => ({
          year: String(item.year ?? ""),
          school: String(item.school ?? ""),
          degree: String(item.degree ?? ""),
        }))
      : [],
    skills: Array.isArray(data.skills) ? data.skills.map((skill: unknown) => String(skill)) : [],
    publications: Array.isArray(data.publications)
      ? data.publications.map((item: Partial<CvPublication>) => ({
          type: String(item.type ?? ""),
          title: String(item.title ?? ""),
          venue: String(item.venue ?? ""),
          authors: String(item.authors ?? ""),
          link: item.link ? String(item.link) : null,
        }))
      : [],
  };
}