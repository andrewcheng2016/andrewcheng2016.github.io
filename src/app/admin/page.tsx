import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Andrew's Space",
};

export default function AdminPage() {
  return (
    <main className="h-dvh w-full overflow-hidden">
      <iframe
        src="/admin/index.html"
        title="Admin CMS"
        className="block h-full w-full border-0 bg-black"
      />
    </main>
  );
}
