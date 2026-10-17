import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Andrew's Space",
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-p5-black text-p5-white flex items-center justify-center p-8">
      <div className="max-w-xl border border-gray-700 bg-p5-gray/50 p-6 text-center">
        <h1 className="font-anton text-4xl text-white mb-4">ADMIN LOADER</h1>
        <p className="text-gray-300 leading-7 mb-6">
          Open the CMS at <a className="text-p5-red underline" href="/admin/index.html">/admin/index.html</a>.
        </p>
        <iframe
          src="/admin/index.html"
          title="Admin CMS"
          className="w-full h-[80vh] border border-gray-700 bg-black"
        />
      </div>
    </main>
  );
}
