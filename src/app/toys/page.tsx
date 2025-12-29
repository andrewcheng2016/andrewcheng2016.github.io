import { getContent } from "@/lib/api";
import ToysGrid from "@/components/ToysGrid";

export default function ToysPage() {
  // 在 Server 端讀取 Markdown 檔案
  const toys = getContent("toys");
  return <ToysGrid toys={toys} />;
}