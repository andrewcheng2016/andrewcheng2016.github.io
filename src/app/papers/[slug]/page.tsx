import { getPostBySlug, getContent } from "@/lib/api";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowLeft, ExternalLink } from "lucide-react";

// 產生靜態路徑 (讓 Next.js 知道有哪些文章)
export async function generateStaticParams() {
  const posts = getContent("papers");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 這裡定義 props 的型別
interface PageProps {
  params: { slug: string };
}

export default async function PaperDetail({ params }: PageProps) {
  // 注意：在 Next.js 13+ 的 Server Component，params 有時需要 await，
  // 但目前標準寫法直接用即可。
  const { slug } = await Promise.resolve(params); // 為了相容性加個 await
  const post = getPostBySlug("papers", slug);

  if (!post) {
    return <div className="text-white text-center mt-20 font-anton">404 - PAPER NOT FOUND</div>;
  }

  return (
    <main className="min-h-screen bg-p5-black text-p5-white p-6 md:p-12 font-sans selection:bg-p5-red selection:text-white pb-20">
      <div className="max-w-4xl mx-auto">
        
        {/* 返回按鈕 */}
        <Link href="/papers" className="inline-flex items-center gap-2 font-anton text-xl text-p5-red hover:underline mb-8 hover:-translate-x-2 transition-transform">
          <ArrowLeft size={24} /> BACK TO LIST
        </Link>

        {/* 文章卡片容器 */}
        <div className="bg-p5-gray border-2 border-p5-red p-8 shadow-[10px_10px_0_#d31919] relative overflow-hidden">
          
          {/* 裝飾背景 */}
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
             <BookOpen size={200} />
          </div>

          {/* 標題與資訊 */}
          <div className="relative z-10">
            <div className="flex flex-wrap gap-4 mb-4 text-sm font-anton tracking-wide">
               <span className="bg-p5-red text-white px-3 py-1">{post.type || "PAPER"}</span>
               <span className="text-gray-400 flex items-center gap-1">
                 <Calendar size={14}/> {new Date(post.date).toLocaleDateString()}
               </span>
               {/* 顯示最後更新時間 */}
               {post.lastmod && (
                 <span className="text-p5-red flex items-center gap-1 border-l border-gray-600 pl-4">
                   <Clock size={14}/> UPDATED: {new Date(post.lastmod).toLocaleDateString()}
                 </span>
               )}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight border-b-4 border-white pb-4 inline-block">
              {post.title}
            </h1>

            {/* 因為在 Interface 定義了 venue 是可選的 (?)，所以這裡最好檢查一下是否存在 */}
            {post.venue && (
              <div className="text-gray-400 font-anton mb-8 text-lg">
                VENUE: <span className="text-white">{post.venue}</span>
              </div>
            )}
            
            {post.authors && (
              <div className="text-gray-300 italic mb-8 border-l-4 border-p5-red pl-4 py-2 bg-black/30">
                Authors: {post.authors}
              </div>
            )}

            {/* 內文 */}
            <article className="prose prose-invert prose-lg max-w-none 
              prose-headings:font-anton prose-headings:text-p5-red
              prose-a:text-p5-red prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-lg prose-img:border-2 prose-img:border-gray-700 prose-img:shadow-lg
              prose-img:w-full prose-img:h-auto prose-img:object-cover">
              <div className="whitespace-pre-wrap font-sans text-gray-300 leading-relaxed">
                {post.content}
              </div>
            </article>

            {/* 外部連結按鈕 */}
            {post.link && (
              <div className="mt-12 pt-8 border-t border-gray-700">
                <a href={post.link} target="_blank" className="inline-flex items-center gap-2 bg-white text-black font-anton px-6 py-3 text-xl hover:bg-p5-red hover:text-white transition-colors shadow-[4px_4px_0_#000]">
                  READ FULL PAPER <ExternalLink size={20}/>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}