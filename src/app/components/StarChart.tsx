"use client";
import { motion } from "framer-motion";

const stats = [
  { label: "Frontend", value: 0.9 }, // 0.0 ~ 1.0
  { label: "Backend", value: 0.8 },
  { label: "AI / ML", value: 0.85 },
  { label: "Research", value: 0.95 },
  { label: "DevOps", value: 0.7 },
];

export default function StarChart() {
  const radius = 80; // 半徑
  const center = 100; // 中心點 (SVG 200x200)
  
  // 計算多邊形頂點
  const getPoint = (index: number, total: number, r: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
  };

  const polyPoints = stats.map((_, i) => getPoint(i, stats.length, radius)).join(" ");
  const dataPoints = stats.map((s, i) => getPoint(i, stats.length, radius * s.value)).join(" ");

  return (
    <div className="relative w-[280px] h-[250px] flex items-center justify-center">
      <svg width="200" height="200" className="overflow-visible">
        {/* 背景灰底五角星 */}
        <polygon points={polyPoints} fill="#1a1a1a" stroke="#d31919" strokeWidth="2" />
        
        {/* 內圈輔助線 */}
        <polygon points={stats.map((_, i) => getPoint(i, stats.length, radius * 0.5)).join(" ")} fill="none" stroke="#333" strokeWidth="1" />

        {/* 你的能力值 (黃色/金色填充) */}
        <motion.polygon
          initial={{ scale: 0, opacity: 0, transformOrigin: "center" }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
          points={dataPoints}
          fill="#facc15" // 黃色 (P5 星星顏色)
          stroke="#facc15"
          strokeWidth="2"
          className="drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"
        />

        {/* 文字標籤 */}
        {stats.map((stat, i) => {
           const angle = (Math.PI * 2 * i) / stats.length - Math.PI / 2;
           // 稍微把文字推出去一點
           const x = center + (radius + 25) * Math.cos(angle); 
           const y = center + (radius + 15) * Math.sin(angle);
           return (
             <text 
               key={i} 
               x={x} 
               y={y} 
               textAnchor="middle" 
               fill="white" 
               className="font-anton text-[12px] uppercase tracking-wide"
             >
               {stat.label}
             </text>
           );
        })}
      </svg>
      
      {/* 裝飾性背景字 (Stats) */}
      <div className="absolute top-0 right-0 bg-white text-black font-anton px-2 text-xs -skew-x-12 border border-black">
        STATS
      </div>
    </div>
  );
}