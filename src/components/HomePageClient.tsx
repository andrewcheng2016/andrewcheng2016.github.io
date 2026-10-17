"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, FileDown, ExternalLink, BookOpen } from "lucide-react";
import type { CvData } from "@/lib/api";

type Chapter = "summary" | "experience" | "education" | "publications";

const chapterOrder: Chapter[] = ["summary", "experience", "education", "publications"];

const chapterDotLabel: Record<Chapter, string> = {
  summary: "Profile",
  experience: "Experience",
  education: "Education",
  publications: "Publications",
};

const labels = {
  summaryTitle: "PROFILE SUMMARY",
  expTitle: "WORK EXPERIENCE",
  eduTitle: "EDUCATION",
  tblDegree: "DEGREE",
  tblSchool: "SCHOOL",
  tblYear: "YEAR",
  tblRole: "ROLE",
  tblOrg: "ORGANIZATION / DETAILS",
  techTitle: "TECH STACK",
  pubTitle: "PUBLICATIONS & PATENTS",
};

const matrixColumns = [
  "101001011001",
  "010110101100",
  "011001010011",
  "110010100110",
  "001101001101",
  "101100110010",
  "010011001011",
  "110100101001",
  "001011010110",
  "100110010101",
  "011010011001",
  "101001101100",
  "010110010011",
  "110011010100",
  "001100101101",
  "101010011010",
  "010101100101",
  "110010011001",
  "001011001110",
  "100101101001",
];

const MatrixBackdrop = ({ activeChapter }: { activeChapter: Chapter }) => {
  return (
    <div className={`matrix-backdrop matrix-chapter-${activeChapter}`}>
      <div className="matrix-vignette" />
      <div className="matrix-scanlines" />
      <div className="matrix-rain" aria-hidden="true">
        {matrixColumns.map((column, index) => (
          <span
            key={`${column}-${index}`}
            className="matrix-column"
            style={{
              left: `${(index + 1) * 4.8}%`,
              animationDelay: `-${index * 0.7}s`,
              animationDuration: `${8 + (index % 6)}s`,
            }}
          >
            {column}
          </span>
        ))}
      </div>
      <div className="matrix-chapter-glow" />
    </div>
  );
};

function ChapterPanel({ chapter, cv }: { chapter: Chapter; cv: CvData }) {
  if (chapter === "summary") {
    return (
      <div className="mb-10 relative pt-2">
        <div className="absolute -left-8 -top-8 text-8xl font-anton text-p5-gray opacity-50 select-none">&quot;</div>
        <h3 className="font-anton text-3xl bg-white text-black inline-block px-2 mb-4 -skew-x-12 relative z-10 shadow-[4px_4px_0_#d31919]">
          {labels.summaryTitle}
        </h3>
        <p className="text-gray-300 text-lg leading-relaxed border-l-4 border-p5-red pl-4 bg-p5-black/50 p-4 backdrop-blur-sm">
          {cv.summary}
        </p>
      </div>
    );
  }

  if (chapter === "experience") {
    return (
      <div className="mb-10">
        <h3 className="font-anton text-3xl bg-white text-black inline-block px-2 mb-6 -skew-x-12 shadow-[4px_4px_0_#d31919]">
          {cv.expTitle || labels.expTitle}
        </h3>

        <div className="w-full overflow-hidden border-2 border-gray-700 bg-p5-gray/50">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-black font-anton text-lg">
                <th className="p-4 border-b-4 border-p5-red w-1/5">{cv.tblYear || labels.tblYear}</th>
                <th className="p-4 border-b-4 border-p5-red w-1/4">{cv.tblRole || labels.tblRole}</th>
                <th className="p-4 border-b-4 border-p5-red">{cv.tblOrg || labels.tblOrg}</th>
              </tr>
            </thead>
            <tbody className="font-sans text-sm md:text-base">
              {cv.experiences.map((exp, index) => (
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
    );
  }

  if (chapter === "education") {
    return (
      <div className="mb-10">
        <h3 className="font-anton text-3xl bg-white text-black inline-block px-2 mb-6 -skew-x-12 shadow-[4px_4px_0_#d31919]">
          {cv.eduTitle || labels.eduTitle}
        </h3>

        <div className="w-full overflow-hidden border-2 border-gray-700 bg-p5-gray/50">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-black font-anton text-lg">
                <th className="p-4 border-b-4 border-p5-red w-1/5">{cv.tblYear || labels.tblYear}</th>
                <th className="p-4 border-b-4 border-p5-red w-2/5">{cv.tblDegree || labels.tblDegree}</th>
                <th className="p-4 border-b-4 border-p5-red">{cv.tblSchool || labels.tblSchool}</th>
              </tr>
            </thead>
            <tbody className="font-sans text-sm md:text-base">
              {cv.education.map((edu, index) => (
                <tr key={index} className="group border-b border-gray-700 hover:bg-p5-red hover:text-white transition-colors duration-200">
                  <td className="p-4 font-anton text-p5-red group-hover:text-white align-top border-r border-gray-700 group-hover:border-p5-red">
                    {edu.year}
                  </td>
                  <td className="p-4 font-bold align-top border-r border-gray-700 group-hover:border-p5-red">
                    {edu.degree}
                  </td>
                  <td className="p-4 align-top">
                    <div className="font-bold text-lg">{edu.school}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10">
          <h4 className="font-anton text-2xl bg-white text-black inline-block px-2 mb-4 -skew-x-12 shadow-[4px_4px_0_#d31919]">
            {cv.techTitle || labels.techTitle}
          </h4>
          <div className="flex flex-wrap gap-3">
            {cv.skills.map((skill) => (
              <span key={skill} className="bg-p5-gray border border-gray-600 px-3 py-1 font-anton text-sm hover:bg-white hover:text-black hover:border-p5-red transition-all cursor-default skew-x-[-10deg]">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-anton text-3xl bg-white text-black inline-block px-2 mb-6 -skew-x-12 shadow-[4px_4px_0_#d31919]">
        {cv.pubTitle || labels.pubTitle}
      </h3>
      <div className="space-y-6">
        {cv.publications.map((pub, index) => (
          <div key={index} className="relative bg-p5-gray/50 border border-gray-700 p-4 hover:border-p5-red hover:bg-p5-gray transition-all group">
            <div className="absolute top-0 right-0 bg-p5-red text-white text-[10px] font-anton px-2 py-0.5 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all">
              {pub.type.toUpperCase()}
            </div>
            <h4 className="font-bold text-lg text-white mb-2 leading-tight group-hover:text-p5-red transition-colors">
              {pub.title}
            </h4>
            <div className="text-p5-red font-anton text-sm mb-2 uppercase tracking-wide">{pub.venue}</div>
            <p className="text-gray-400 text-xs leading-relaxed mb-2">{pub.authors}</p>
            {pub.link && (
              <a href={pub.link} target="_blank" className="inline-flex items-center gap-1 text-xs text-white border-b border-p5-red hover:bg-p5-red hover:border-transparent transition-all">
                <BookOpen size={12} /> VIEW PAPER
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePageClient({ cv }: { cv: CvData }) {
  const [time, setTime] = useState({ month: "--", day: "--", hours: "--", minutes: "--", ampm: "--" });
  const [activeChapter, setActiveChapter] = useState<Chapter>("summary");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes();
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12;
      h = h ? h : 12;
      setTime({
        month: String(now.getMonth() + 1),
        day: String(now.getDate()),
        hours: String(h),
        minutes: String(m).padStart(2, "0"),
        ampm,
      });
    };

    const timer = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-stage]"));
    if (sections.length === 0) return;
    const navOffset = 112;

    const getSectionTop = (section: HTMLElement) => section.getBoundingClientRect().top + window.scrollY;

    const nearestSectionByOffset = () => {
      const pivotY = window.scrollY + navOffset;
      let bestSection = sections[0];
      let bestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const distance = Math.abs(getSectionTop(section) - pivotY);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestSection = section;
        }
      });

      return bestSection;
    };

    let ticking = false;
    const updateActiveByViewportCenter = () => {
      const nearest = nearestSectionByOffset();
      const bestChapter = nearest.getAttribute("data-stage") as Chapter | null;
      if (!bestChapter) return;
      setActiveChapter((prev) => (prev === bestChapter ? prev : bestChapter));
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveByViewportCenter();
        ticking = false;
      });
    };

    updateActiveByViewportCenter();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const scrollToChapter = (chapter: Chapter) => {
    setActiveChapter(chapter);
    const node = document.getElementById(`chapter-${chapter}`);
    if (!node) return;
    const navOffset = 112;
    const targetTop = node.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-transparent text-p5-white overflow-x-hidden font-sans selection:bg-p5-red selection:text-white pb-20">
      <MatrixBackdrop activeChapter={activeChapter} />

      <nav className="fixed top-0 w-full z-50 bg-p5-black/90 border-b-4 border-p5-red backdrop-blur-sm shadow-[0_4px_20px_rgba(211,25,25,0.4)]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <span className="font-anton text-2xl text-p5-red drop-shadow-[2px_2px_0_#fff]">Andrew</span>
            <span className="font-anton text-2xl text-white">Cheng</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/papers" className="hidden md:block font-anton hover:text-p5-red transition-colors hover:translate-x-1 hover:-translate-y-1">
              PAPERS
            </Link>

            <div className="hidden md:flex flex-col items-end leading-none border-l-2 border-gray-600 pl-3">
              <div className="text-sm font-anton text-white bg-p5-black px-1 border border-white -skew-x-12 mb-1">
                {time.month}/{time.day}
              </div>
              <div className="text-xs font-anton text-white bg-p5-red px-1">
                {time.ampm} {time.hours}:{time.minutes}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {chapterOrder.map((chapter) => {
          const active = chapter === activeChapter;
          return (
            <button
              key={chapter}
              type="button"
              onClick={() => scrollToChapter(chapter)}
              aria-label={`Jump to ${chapterDotLabel[chapter]}`}
              className={`group relative h-3.5 w-3.5 rounded-full border transition-all ${active ? "bg-p5-red border-white scale-125" : "bg-black/70 border-gray-500 hover:border-p5-red"}`}
            >
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded border border-gray-600 bg-black/80 px-2 py-1 text-[10px] tracking-[0.16em] text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                {chapterDotLabel[chapter].toUpperCase()}
              </span>
            </button>
          );
        })}
      </aside>

      <div className="max-w-7xl mx-auto px-4 mt-32">
        <motion.section
          id="chapter-summary"
          data-stage="summary"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white mt-10 lg:mt-0 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start scroll-mt-28"
        >
          <div className="lg:col-span-4">
            <div className="mb-10 pointer-events-none select-none">
              <div className="relative z-10 bg-white text-black border-2 border-black px-4 py-1 lg:px-5 lg:py-2 shadow-[4px_4px_0_#d31919] -rotate-2 w-fit">
                <span className="font-anton font-black text-4xl lg:text-6xl tracking-widest leading-none block">{cv.nameTop}</span>
              </div>
              <div className="relative z-20 bg-black text-white border-2 border-white px-5 py-1 lg:px-6 lg:py-2 shadow-[4px_4px_0_#333] rotate-1 -mt-1 ml-8 w-fit">
                <span className="font-anton font-bold text-2xl lg:text-4xl tracking-[0.2em] leading-none block">{cv.nameBottom}</span>
              </div>
            </div>

            <div className="relative w-64 h-64 group cursor-pointer mx-auto lg:mx-0">
              <div className="absolute inset-0 border-4 border-p5-red bg-black overflow-hidden shadow-[0_0_20px_rgba(211,25,25,0.6)]">
                <img src="/profile_p5.jpg" alt="P5 Style" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-p5-dots opacity-20 mix-blend-overlay pointer-events-none" />
              </div>
              <div className="absolute inset-0 border-4 border-white bg-black transition-all duration-300 ease-out group-hover:opacity-0 group-hover:scale-110 z-10">
                <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-p5-red mix-blend-color-burn opacity-0 group-hover:opacity-50 transition-opacity duration-200" />
              </div>
              <div className="absolute -bottom-4 -right-8 bg-black text-white font-anton px-4 py-1 text-lg -rotate-3 border-2 border-white z-20 shadow-[4px_4px_0_#d31919]">
                ANDREW
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-10 w-64 mx-auto lg:mx-0">
              <a
                href="https://github.com/andrewcheng2016"
                target="_blank"
                className="group flex items-center justify-between bg-black text-white border-2 border-white p-2 relative overflow-hidden transition-colors duration-300"
              >
                <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
                <span className="font-anton text-lg flex items-center gap-2 relative z-10 group-hover:text-black transition-colors duration-300">
                  <Github size={18} /> GITHUB
                </span>
                <ExternalLink size={16} className="relative z-10 group-hover:text-black transition-colors duration-300" />
              </a>

              <a
                href={cv.downloadUrl}
                download
                className="group flex items-center justify-between bg-p5-red text-white border-2 border-p5-red p-2 hover:bg-white hover:text-p5-red hover:border-white transition-all shadow-[4px_4px_0_#fff] relative overflow-hidden"
              >
                <span className="font-anton text-lg flex items-center gap-2 relative z-10">
                  <FileDown size={18} /> {cv.download}
                </span>
                <span className="font-anton text-xs relative z-10">PDF</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-4 mb-10 border-b-2 border-gray-700 pb-8 mt-2">
              <div className="flex items-center gap-4">
                <span className="font-anton text-p5-red text-xl w-24">ROLE:</span>
                <span className="font-anton text-2xl">{cv.role}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-anton text-p5-red text-xl w-24">LOC:</span>
                <span className="font-anton text-2xl">{cv.loc}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-anton text-p5-red text-xl w-24">FOCUS:</span>
                <span className="font-anton text-2xl">{cv.focus}</span>
              </div>
            </div>

            <ChapterPanel chapter="summary" cv={cv} />
          </div>
        </motion.section>

        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white mt-12 max-w-4xl mx-auto"
        >
          <div className="space-y-16">
            {chapterOrder
              .filter((chapter) => chapter !== "summary")
              .map((chapter) => (
                <section
                  key={chapter}
                  id={`chapter-${chapter}`}
                  data-stage={chapter}
                  className="min-h-[86vh] scroll-mt-28 flex items-center justify-center"
                >
                  <div className="w-full max-w-4xl">
                    <ChapterPanel chapter={chapter} cv={cv} />
                  </div>
                </section>
              ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
