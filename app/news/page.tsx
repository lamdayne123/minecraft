"use client";

import { useEffect, useState } from "react";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

type News = {
  id: number;
  title: string;
  content: string;
  author: string;
  image?: string;
  category: string;
  created_at: string;
};

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/news", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch(console.error)
      .finally(() => setLoaded(true));
  }, []);

  function formatDate(date: string) {
    return new Date(date).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <main
      className={`${display.variable} ${mono.variable} min-h-screen bg-[#12151a] px-4 py-14 text-[#eef0f2] sm:px-6 sm:py-20 lg:px-8`}
      style={{ fontFamily: "var(--font-display), sans-serif" }}
    >
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#f0a35e]/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-10 sm:mb-14">
          <h1 className="text-4xl font-bold sm:text-5xl">News</h1>
        </header>

        {/* Loading State */}
        {!loaded && (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#f0a35e] border-t-transparent" />
          </div>
        )}

        {/* News Grid */}
        {loaded && (
          <div className="space-y-8">
            {news.length > 0 ? (
              news.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-lg border border-[#2a2e37] bg-[#1a1e26] transition-all duration-300 hover:border-[#f0a35e]/50 hover:shadow-lg hover:shadow-[#f0a35e]/10"
                >
                  {item.image && (
                    <div className="aspect-video overflow-hidden bg-[#2a2e37]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6 sm:p-8">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="inline-block rounded-full bg-[#f0a35e]/20 px-3 py-1 text-sm font-medium text-[#f0a35e]">
                        {item.category}
                      </span>
                      <span className="text-sm text-[#9fa3aa]">
                        {formatDate(item.created_at)}
                      </span>
                    </div>
                    <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
                      {item.title}
                    </h2>
                    <p className="mb-4 line-clamp-2 text-[#b8bcc4]">
                      {item.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#9fa3aa]">
                        By {item.author}
                      </span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="py-20 text-center">
                <p className="text-lg text-[#9fa3aa]">No news available.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
