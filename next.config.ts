import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. 告訴 Next.js 產出靜態 HTML
  output: 'export',
  
  // 2. 關閉圖片優化 (GitHub Pages 不支援 Node.js image server)
  images: {
    unoptimized: true,
  },

  // 3. 確保 CSS/JS 路徑正確 (不用加 basePath，因為你是 User Page)
};

export default nextConfig;