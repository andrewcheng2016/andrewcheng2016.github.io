/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        p5: {
          red: "#d31919",
          black: "#0a0a0a",
          white: "#f5f5f5",
          gray: "#1a1a1a",
        },
      },
      fontFamily: {
        anton: ["var(--font-anton)"],
        sans: ["var(--font-noto)"],
      },
      backgroundImage: {
        // 1. 基礎網格紋理 (之前設定的，這個要留著做底圖)
        "p5-pattern": "linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)",
        
        // 2. 新增：P5 風格半色調圓點
        "p5-dots": "radial-gradient(#333 1px, transparent 1px)",
        
        // 3. 新增：P5 風格斜線紋理
        "p5-stripes": "repeating-linear-gradient(45deg, rgba(211, 25, 25, 0.05) 0px, rgba(211, 25, 25, 0.05) 10px, transparent 10px, transparent 20px)",
      },
      skew: {
        '5': '5deg',
        '-5': '-5deg',
      }
    },
  },
  plugins: [],
};