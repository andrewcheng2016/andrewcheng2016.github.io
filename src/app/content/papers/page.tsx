import { getContent } from "@/lib/api";
import PapersList from "@/components/PapersList";

export default function PapersPage() {
  const papers = getContent("papers");
  return <PapersList papers={papers} />;
}