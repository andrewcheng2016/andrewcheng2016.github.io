"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar } from "lucide-react";
import type { Post } from "@/lib/api";

export default function PapersList({ papers }: { papers: Post[] }) {
  return (
    <div className="min-h-screen bg-p5-black text-p5-white p-8 font-sans selection:bg-p5-red selection:text-white">
      <Link href="/" className="font-anton text-xl text-p5-red hover:underline mb-8 block hover:translate-x-2 transition-transform">&larr; BACK TO HOME PAGE</Link>
      
      <h1 className="font-anton text-5xl bg-white text-p5-black inline-block px-6 py-2 skew-x-12 mb-12 shadow-[5px_5px_0_#d31919]">
        ACADEMIC LOGS
      </h1>

      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        {papers.map((paper, i) => (
          <motion.div
            key={paper.slug}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            {/* 整個卡片變成 Link，點擊跳轉到詳情頁 */}
            <Link href={`/papers/${paper.slug}`} className="block group relative bg-p5-gray/80 border border-gray-700 p-6 hover:border-p5-red transition-all duration-300 hover:bg-black">
                
                {/* 類型標籤 */}
                <div className="absolute top-0 right-0 bg-p5-red text-white font-anton text-xs px-3 py-1 translate-x-2 -translate-y-2 shadow-md group-hover:translate-x-0 group-hover:translate-y-0 transition-transform z-10">
                    {paper.type || "PAPER"}
                </div>

                <h2 className="text-2xl font-bold mb-2 group-hover:text-p5-red transition-colors">{paper.title}</h2>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-3 font-anton tracking-wide">
                    <span className="text-p5-red">{paper.venue}</span>
                    <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(paper.date).toLocaleDateString()}</span>
                </div>

                <p className="text-gray-300 text-sm mb-4 border-l-2 border-gray-600 pl-3">
                    {paper.authors}
                </p>

                <div className="text-gray-500 text-xs italic flex items-center gap-1 group-hover:text-white transition-colors">
                    Click to read more details &rarr;
                </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}