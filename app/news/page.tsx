"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {

    fetch("/api/news", {
      cache: "no-store"
    })
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch(console.error);

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
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">

      <div className="mx-auto max-w-5xl">

        <h1 className="mb-3 text-center text-5xl font-black text-green-400">
          📰 Tin tức
        </h1>

        <p className="mb-12 text-center text-zinc-400">
          Các thông báo mới nhất từ Craftopia Survival.
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
              className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition hover:border-green-500"
            >

              {item.image && (

                <img
                  src={item.image}
                  alt={item.title}
                  className="h-64 w-full object-cover"
                />

              )}

              <div className="p-8">

                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">

                  <h2 className="text-2xl font-bold text-green-400">
                    {item.title}
                  </h2>

                  <span className="text-sm text-zinc-500">
                    {formatDate(item.created_at)}
                  </span>

                </div>

                <p className="whitespace-pre-wrap text-zinc-300">
                  {item.content}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4 text-sm">

                  <span className="text-zinc-500">
                    Đăng bởi{" "}
                    <span className="font-semibold text-white">
                      {item.author}
                    </span>
                  </span>

                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold uppercase text-green-400">
                    {item.category}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}
