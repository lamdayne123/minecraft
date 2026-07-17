"use client";

import { useEffect, useState } from "react";

type News = {
  id: number;
  title: string;
  content: string;
  author: string;
  time: string;
};

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">

      <div className="mx-auto max-w-5xl">

        <h1 className="mb-3 text-center text-5xl font-black text-green-400">
          📰 Tin tức
        </h1>

        <p className="mb-12 text-center text-zinc-400">
          Các thông báo mới nhất từ máy chủ Craftopia.
        </p>

        <div className="space-y-6">

          {news.length === 0 && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
              Chưa có thông báo nào.
            </div>
          )}

          {news.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-green-500"
            >

              <div className="flex items-center justify-between">

                <h2 className="text-2xl font-bold text-green-400">
                  {item.title}
                </h2>

                <span className="text-sm text-zinc-500">
                  {item.time}
                </span>

              </div>

              <p className="mt-5 whitespace-pre-wrap text-zinc-300">
                {item.content}
              </p>

              <div className="mt-6 border-t border-zinc-800 pt-4 text-sm text-zinc-500">
                Đăng bởi <span className="font-semibold text-white">{item.author}</span>
              </div>

            </div>
          ))}

        </div>

      </div>

    </main>
  );
}