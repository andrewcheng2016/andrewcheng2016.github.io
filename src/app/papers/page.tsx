import { getContent } from "@/lib/api";
import PapersList from "@/components/PapersList";

export default function PapersIndexPage() {
  // 1. 從 src/content/papers 讀取所有 Markdown 檔案
  const papers = getContent("papers");
  
  // 2. 把資料傳給 PapersList 組件去顯示
  return <PapersList papers={papers} />;
}