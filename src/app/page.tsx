import { getCv } from "@/lib/api";
import HomePageClient from "@/components/HomePageClient";

export default function Home() {
  const cv = getCv();
  return <HomePageClient cv={cv} />;
}
