"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ToysGrid({ toys }: { toys: any[] }) {
  return (
    <div className="min-h-screen bg-p5-black text-p5-white p-8 font-sans selection:bg-p5-red selection:text-white">
      {/* 導航 */}
      <Link href="/" className="font-anton text-xl text-p5-red hover:underline mb-8 block hover:translate-x-2 transition-transform">&larr; BACK TO HOME PAGE</Link>
      
      {/* 標題 */}
      <h1 className="font-anton text-5xl bg-p5-red text-white inline-block px-6 py-2 -skew-x-12 mb-12 shadow-[5px_5px_0_#fff]">
        TOY COLLECTION
      </h1>

      {/* 網格列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {toys.map((toy, i) => (
          <motion.div
            key={toy.slug}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-p5-gray border-2 border-p5-red p-4 hover:-translate-y-2 hover:shadow-[8px_8px_0_#d31919] transition-all duration-300 cursor-pointer"
          >
            {/* 圖片區 */}
            <div className="h-64 bg-black mb-4 overflow-hidden relative border border-gray-700">
               {toy.image ? (
                 <img src={toy.image} alt={toy.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-gray-600 font-anton">NO IMAGE</div>
               )}
               {/* 裝飾角落 */}
               <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-p5-red border-l-[40px] border-l-transparent z-10" />
            </div>

            {/* 文字區 */}
            <div className="font-anton text-gray-500 text-sm mb-1">{new Date(toy.date).toLocaleDateString()}</div>
            <h2 className="font-anton text-2xl group-hover:text-p5-red leading-tight">{toy.title}</h2>
            
            {/* 說明文 (Markdown 預覽) */}
            <div className="text-gray-400 text-sm mt-2 line-clamp-3 font-sans">
                {toy.content}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}