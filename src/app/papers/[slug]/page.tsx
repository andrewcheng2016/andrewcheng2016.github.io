import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ExternalLink } from "lucide-react";
import { getPostBySlug, getContent } from "@/lib/api";

const EMPTY_PAPERS_SLUG = "__empty__";

export const dynamicParams = false;

export function generateStaticParams() {
  const papers = getContent("papers");

  if (papers.length === 0) {
    return [{ slug: EMPTY_PAPERS_SLUG }];
  }

  return papers.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PaperDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hasPapers = getContent("papers").length > 0;

  if (!hasPapers && slug === EMPTY_PAPERS_SLUG) {
    return (
      <main className="min-h-screen bg-p5-black text-p5-white p-8 font-sans selection:bg-p5-red selection:text-white">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/papers"
            className="font-anton text-xl text-p5-red hover:underline mb-8 inline-block hover:translate-x-2 transition-transform"
          >
            &larr; BACK TO PAPERS
          </Link>

          <article className="border border-gray-700 bg-p5-gray/50 p-8">
            <span className="inline-block bg-p5-red text-white px-3 py-1 mb-4 font-anton text-sm">
              NO ENTRIES
            </span>
            <h1 className="font-anton text-4xl md:text-5xl text-white mb-4 leading-tight">
              No papers published yet.
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-8">
              This placeholder page exists so static export can succeed even when the papers collection is empty.
            </p>
          </article>
        </div>
      </main>
    );
  }

  const post = getPostBySlug("papers", slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-p5-black text-p5-white p-8 font-sans selection:bg-p5-red selection:text-white">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/papers"
          className="font-anton text-xl text-p5-red hover:underline mb-8 inline-block hover:translate-x-2 transition-transform"
        >
          &larr; BACK TO PAPERS
        </Link>

        <article className="border border-gray-700 bg-p5-gray/50 p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm font-anton tracking-wide text-gray-300">
            <span className="bg-p5-red text-white px-3 py-1">{post.type || "PAPER"}</span>
            {post.venue && <span className="text-p5-red">{post.venue}</span>}
            {post.date && (
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(post.date).toLocaleDateString()}
              </span>
            )}
          </div>

          <h1 className="font-anton text-4xl md:text-5xl text-white mb-4 leading-tight">
            {post.title}
          </h1>

          {post.authors && (
            <p className="text-gray-300 text-base md:text-lg mb-6 border-l-4 border-p5-red pl-4">
              {post.authors}
            </p>
          )}

          {post.link && (
            <a
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mb-8 bg-p5-red text-white px-4 py-2 font-anton hover:bg-white hover:text-p5-red transition-colors"
            >
              <ExternalLink size={16} />
              VIEW PAPER
            </a>
          )}

          <div className="border-t border-gray-700 pt-6 text-gray-200 leading-8 whitespace-pre-wrap">
            {post.content?.trim() || "No abstract provided."}
          </div>
        </article>
      </div>
    </main>
  );
}