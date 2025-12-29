"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, FileDown, ExternalLink, Globe, BookOpen } from "lucide-react";

// --- 翻譯字典 ---
const translations = {
  en: {
    nameTop: "CHENG",
    nameBottom: "Chi Chung",
    role: "Research Assistant",
    loc: "HONG KONG",
    focus: "AI & WEB SYSTEM",
    summaryTitle: "PROFILE SUMMARY",
    summary: (
      <>
        Passionate about bridging academic research and real-world applications. 
        Specialized in <strong className="text-white">Computer Vision</strong> and <strong className="text-white">Web Development</strong>. 
        Experienced in building scalable systems using Django, React.js, Next.js, and other modern web technologies.
      </>
    ),
    expTitle: "PROJECT EXPERIENCE",
    // 表格標題
    tblYear: "YEAR",
    tblRole: "ROLE",
    tblOrg: "ORGANIZATION / DETAILS",
    
    techTitle: "TECH STACK",
    pubTitle: "PUBLICATIONS & PATENTS",
    download: "DOWNLOAD CV"
  },
  zh: {
    nameTop: "鄭",
    nameBottom: "智聰",
    role: "研究助理",
    loc: "香港",
    focus: "AI 與 網站開發",
    summaryTitle: "個人簡介",
    summary: (
      <>
        熱衷於將學術研究轉化為實際應用。
        專精於 <strong className="text-white">電腦視覺 (CV)</strong> 與 <strong className="text-white">網站開發</strong>。
        擁有使用 Django, React.js, 和Next.js等 建構可擴展系統的豐富經驗。
      </>
    ),
    expTitle: "工作經歷",
    // 表格標題
    tblYear: "年份",
    tblRole: "角色",
    tblOrg: "機構 / 工作內容",

    techTitle: "技術",
    pubTitle: "論文與專利",
    download: "下載履歷 PDF"
  }
};

// --- 工作經歷資料 (包含你提供的新內容) ---
const getExperiences = (lang: 'en' | 'zh') => [
  {
    year: "2023 - 2025",
    role: lang === 'en' ? "Research Assistant" : "研究助理",
    org: lang === 'en' ? "Hong Kong Chu Hai College" : "香港珠海學院",
    desc: lang === 'en' 
      ? "Research on image segmentation for gum disease detection." 
      : "研究用於牙齦疾病檢測的圖像分割技術。"
  },
  {
    year: "2021 - 2023",
    role: lang === 'en' ? "Research Postgraduate" : "研究式研究生",
    org: lang === 'en' ? "The Hong Kong Polytechnic University" : "香港理工大學",
    desc: lang === 'en'
      ? "Research on interpretable neural networks via principal component analysis."
      : "研究基於主成分分析 (PCA) 的可解釋神經網絡。"
  },
  {
    year: "2021",
    role: lang === 'en' ? "Undergraduate" : "本科生 (FYP)",
    org: lang === 'en' ? "The Hong Kong Polytechnic University" : "香港理工大學",
    desc: lang === 'en'
      ? "Active noise cancellation with convolutional neural networks (Final Year Project)."
      : "使用卷積神經網絡 (CNN) 進行主動降噪 (畢業專題)。"
  },
  {
    year: "2020",
    role: lang === 'en' ? "Summer Intern" : "暑期實習生",
    org: lang === 'en' ? "Electrical and Mechanical Services Department" : "機電工程署 (EMSD)",
    desc: lang === 'en'
      ? "Developed IoT project using Arduino (ESP32) with mobile-controlled DHT11 sensors via Blynk cloud."
      : "開發 IoT 專案：使用 Arduino (ESP32) 與 Blynk 雲端控制 DHT11 傳感器。"
  }
];

// --- 論文資料 ---
const publications = [
  {
    type: "Conference",
    title: "GumAgent: Towards an Accessible Gum Disease Detection Tool Leveraging Vision Language Model",
    venue: "ICICSP 2025",
    authors: "Chi-Chung Cheng, Harris Sik-Ho Tsang, Richard Tai-Chiu Hsung, Yui-Lam Chan, Wai-Lun Lo and Walter Lam",
    link: null
  },
  {
    type: "Journal",
    title: "External validation of an AI mHealth tool for gingivitis detection among older adults at daycare centers: a pilot study",
    venue: "International Dental Journal, 2025",
    authors: "Reinhard Chun Wang Chau, Andrew Chi Chung Cheng, et al.",
    link: "https://pubmed.ncbi.nlm.nih.gov/39864975/"
  },
  {
    type: "Conference",
    title: "Developing automated photographic detection of gum diseases using deep neural networks for mobile devices",
    venue: "ICSED 2024 (Hong Kong)",
    authors: "Andrew Chi-Chung Cheng, Richard Tai-Chiu Hsung, Guan-Hua Li, In Meei Tew, Wai-Lun Lo, and Walter Yu Hang Lam",
    link: "https://doi.org/10.1145/3686614.3686621"
  },
  {
    type: "Patent",
    title: "Machine Learning-Based Image Processor For Intraoral Images",
    venue: "US Patent App. 18/608,983 (Filed: 2024/03/19)",
    authors: "Yu Hang LAM; Richard Tai Chiu HSUNG; Andrew Chi Chung CHENG; et al.",
    link: null
  }
];

// --- 背景特效組件 ---
const BackgroundFX = () => {
  const [stars, setStars] = useState<{ id: number; x: string; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const starData = [...Array(6)].map((_, i) => ({
      id: i,
      x: Math.random() * 100 + "vw",
      duration: Math.random() * 5 + 10,
      delay: Math.random() * 2
    }));
    setStars(starData);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-p5-black">
      <motion.div 
        className="absolute inset-0 bg-p5-stripes opacity-10"
        animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -top-[10vw] -right-[10vw] w-[50vw] h-[50vw] border-[2px] border-p5-red/20 rounded-full border-dashed"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[10vh] -left-[10vw] w-[60vw] h-[60vw] border-[1px] border-white/5 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ y: "110vh", x: star.x, rotate: 0 }}
          animate={{ y: "-10vh", rotate: 360 }}
          transition={{ duration: star.duration, repeat: Infinity, ease: "linear", delay: star.delay }}
          className="absolute text-p5-white opacity-40 font-anton text-2xl select-none"
        >
          ★
        </motion.div>
      ))}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
};

export default function Home() {
  const [time, setTime] = useState({ month: "--", day: "--", hours: "--", minutes: "--", ampm: "--" });
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<'en' | 'zh'>('en');
  const t = translations[lang];
  const experiences = getExperiences(lang);

  useEffect(() => {
    setMounted(true);
    const updateClock = () => {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes();
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12; h = h ? h : 12; 
      setTime({ month: String(now.getMonth() + 1), day: String(now.getDate()), hours: String(h), minutes: String(m).padStart(2, "0"), ampm: ampm });
    };
    const timer = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-transparent text-p5-white overflow-hidden font-sans selection:bg-p5-red selection:text-white pb-20">
      
      <BackgroundFX />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-p5-black/90 border-b-4 border-p5-red backdrop-blur-sm shadow-[0_4px_20px_rgba(211,25,25,0.4)]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-baseline gap-2">
             <span className="font-anton text-2xl text-p5-red drop-shadow-[2px_2px_0_#fff]">ANDREW</span>
             <span className="font-anton text-2xl text-white">Cheng</span>
          </div>
          
          <div className="flex items-center gap-6">
             <Link href="/toys" className="hidden md:block font-anton hover:text-p5-red transition-colors hover:translate-x-1 hover:-translate-y-1">TOYS</Link>
             <Link href="/papers" className="hidden md:block font-anton hover:text-p5-red transition-colors hover:translate-x-1 hover:-translate-y-1">PAPERS</Link>
             
             <button onClick={() => setLang(lang === 'en' ? 'zh' : 'en')} className="flex items-center gap-1 font-anton border border-white px-2 py-1 hover:bg-white hover:text-black transition-all">
               <Globe size={16} />{lang === 'en' ? '中文' : 'EN'}
             </button>

             <div className="hidden md:flex flex-col items-end leading-none border-l-2 border-gray-600 pl-3">
               <div className="text-sm font-anton text-white bg-p5-black px-1 border border-white -skew-x-12 mb-1">{time.month}/{time.day}</div>
               <div className="text-xs font-anton text-white bg-p5-red px-1">{time.ampm} {time.hours}:{time.minutes}</div>
             </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 mt-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
        
        {/* === 左側視覺區 === */}
        <motion.div 
           initial={{ x: -100, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           className="lg:col-span-5 relative flex flex-col items-center lg:items-start"
        >
           <div className="absolute top-20 -left-40 w-[150%] h-[100%] bg-p5-red opacity-80 -skew-x-12 -z-10" 
                style={{ clipPath: "polygon(0 0, 100% 10%, 90% 100%, 0% 90%)" }}/>

           <div className="mb-8 relative text-center lg:text-left">
            <div className="bg-white text-black font-bold not-italic text-6xl inline-block px-4 py-2 shadow-[8px_8px_0_#000]">
               {t.nameTop}
            </div>
            <br className="lg:hidden" />
            <div className="bg-black text-white not-italic text-4xl inline-block px-4 py-1 -mt-4 lg:ml-8 ml-0 border-2 border-white z-10 relative">
               {t.nameBottom}
            </div>
           </div>

           {/* 頭像區 */}
           <div className="relative w-64 h-64 group cursor-pointer">
              <div className="absolute inset-0 border-4 border-p5-red bg-black overflow-hidden shadow-[0_0_20px_rgba(211,25,25,0.6)]">
                  <img src="/profile_p5.jpg" alt="P5 Style" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-p5-dots opacity-20 mix-blend-overlay pointer-events-none" />
              </div>
              <div className="absolute inset-0 border-4 border-white bg-black transition-all duration-300 ease-out group-hover:opacity-0 group-hover:scale-110 z-10">
                  <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-p5-red mix-blend-color-burn opacity-0 group-hover:opacity-50 transition-opacity duration-200" />
              </div>
              <div className="absolute -bottom-4 -right-8 bg-black text-white font-anton px-4 py-1 text-lg -rotate-3 border-2 border-white z-20 shadow-[4px_4px_0_#d31919]">
                 Andrew
              </div>
           </div>

           <div className="flex flex-col gap-3 mt-10 w-64">
              <a href="https://github.com/andrewcheng2016" target="_blank" className="group flex items-center justify-between bg-black text-white border-2 border-white p-2 hover:bg-white hover:text-black transition-all relative overflow-hidden">
                 <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 mix-blend-difference"/>
                 <span className="font-anton text-lg flex items-center gap-2 relative z-10"><Github size={18}/> GITHUB</span>
                 <ExternalLink size={16} className="relative z-10"/>
              </a>
              
              <a href="/cv.pdf" download className="group flex items-center justify-between bg-p5-red text-white border-2 border-p5-red p-2 hover:bg-white hover:text-p5-red hover:border-white transition-all shadow-[4px_4px_0_#fff]">
                 <span className="font-anton text-lg flex items-center gap-2"><FileDown size={18}/> {t.download}</span>
                 <span className="font-anton text-xs">PDF</span>
              </a>
           </div>
        </motion.div>

        {/* === 右側資料區 === */}
        <motion.div 
           initial={{ x: 50, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="lg:col-span-7 text-white mt-10 lg:mt-0"
        >
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 border-b-2 border-gray-700 pb-8 mt-10">
              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <span className="font-anton text-p5-red text-xl w-24">ROLE:</span>
                    <span className="font-anton text-2xl">{t.role}</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="font-anton text-p5-red text-xl w-24">LOC:</span>
                    <span className="font-anton text-2xl">{t.loc}</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="font-anton text-p5-red text-xl w-24">FOCUS:</span>
                    <span className="font-anton text-2xl">{t.focus}</span>
                 </div>
              </div>
           </div>

           <div className="mb-10 relative">
              <div className="absolute -left-8 -top-8 text-8xl font-anton text-p5-gray opacity-50 select-none">“</div>
              <h3 className="font-anton text-3xl bg-white text-black inline-block px-2 mb-4 -skew-x-12 relative z-10">
                 {t.summaryTitle}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed border-l-4 border-p5-red pl-4 bg-p5-black/50 p-4 backdrop-blur-sm">
                 {t.summary}
              </p>
           </div>

           {/* --- 升級版: P5 風格表格 (Experience Table) --- */}
           <div className="mb-10">
              <h3 className="font-anton text-3xl bg-p5-red text-white inline-block px-2 mb-6 skew-x-12 shadow-[4px_4px_0_#fff]">
                 {t.expTitle}
              </h3>
              
              <div className="w-full overflow-hidden border-2 border-gray-700 bg-p5-gray/50">
                 <table className="w-full text-left border-collapse">
                    {/* 表頭 */}
                    <thead>
                      <tr className="bg-white text-black font-anton text-lg">
                        <th className="p-4 border-b-4 border-p5-red w-1/5">{t.tblYear}</th>
                        <th className="p-4 border-b-4 border-p5-red w-1/4">{t.tblRole}</th>
                        <th className="p-4 border-b-4 border-p5-red">{t.tblOrg}</th>
                      </tr>
                    </thead>
                    {/* 表身 */}
                    <tbody className="font-sans text-sm md:text-base">
                      {experiences.map((exp, index) => (
                        <tr key={index} className="group border-b border-gray-700 hover:bg-p5-red hover:text-white transition-colors duration-200">
                           <td className="p-4 font-anton text-p5-red group-hover:text-white align-top border-r border-gray-700 group-hover:border-p5-red">
                              {exp.year}
                           </td>
                           <td className="p-4 font-bold align-top border-r border-gray-700 group-hover:border-p5-red">
                              {exp.role}
                           </td>
                           <td className="p-4 align-top">
                              <div className="font-bold mb-1 text-lg">{exp.org}</div>
                              <div className="text-gray-400 group-hover:text-white text-sm">{exp.desc}</div>
                           </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
              </div>
           </div>

           {/* Tech Stack */}
           <div className="mb-12">
              <h3 className="font-anton text-3xl bg-black border border-white text-white inline-block px-2 mb-4">
                 {t.techTitle}
              </h3>
              <div className="flex flex-wrap gap-3">
                 {["Python", "Django", "FastAPI", "Next.js", "React", "PyTorch", "OpenCV", "Docker", "GCP"].map((skill) => (
                    <span key={skill} className="bg-p5-gray border border-gray-600 px-3 py-1 font-anton text-sm hover:bg-white hover:text-black hover:border-p5-red transition-all cursor-default skew-x-[-10deg]">
                       {skill}
                    </span>
                 ))}
              </div>
           </div>

           {/* Publications */}
           <div>
              <h3 className="font-anton text-3xl bg-white text-black inline-block px-2 mb-6 -skew-x-12 shadow-[4px_4px_0_#d31919]">
                 {t.pubTitle}
              </h3>
              <div className="space-y-6">
                 {publications.map((pub, index) => (
                    <div key={index} className="relative bg-p5-gray/50 border border-gray-700 p-4 hover:border-p5-red hover:bg-p5-gray transition-all group">
                       <div className="absolute top-0 right-0 bg-p5-red text-white text-[10px] font-anton px-2 py-0.5 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all">
                          {pub.type.toUpperCase()}
                       </div>
                       <h4 className="font-bold text-lg text-white mb-2 leading-tight group-hover:text-p5-red transition-colors">
                          {pub.title}
                       </h4>
                       <div className="text-p5-red font-anton text-sm mb-2 uppercase tracking-wide">
                          {pub.venue}
                       </div>
                       <p className="text-gray-400 text-xs leading-relaxed mb-2">
                          {pub.authors}
                       </p>
                       {pub.link && (
                          <a href={pub.link} target="_blank" className="inline-flex items-center gap-1 text-xs text-white border-b border-p5-red hover:bg-p5-red hover:border-transparent transition-all">
                             <BookOpen size={12}/> VIEW PAPER
                          </a>
                       )}
                    </div>
                 ))}
              </div>
           </div>

        </motion.div>

      </div>
    </main>
  );
}