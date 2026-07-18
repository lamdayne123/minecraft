"use client";

import { useEffect, useState } from "react";

type Event = {
  id: number;
  title: string;
  content: string;
  author: string;
  image?: string;
  created_at: string;
};

export default function EventPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => setEvents(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
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

  const featured = events[0];
  const others = events.slice(1);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <section className="mx-auto max-w-6xl px-6 py-16">

        <h1 className="text-center text-5xl font-black text-yellow-400">
          🎉 Sự kiện
        </h1>

        <p className="mt-4 text-center text-zinc-400">
          Các sự kiện mới nhất của Craftopia Survival
        </p>

        {loading && (
          <div className="mt-20 text-center text-zinc-500">
            Đang tải sự kiện...
          </div>
        )}

        {!loading && events.length === 0 && (
          <div className="mt-20 rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
            Hiện chưa có sự kiện nào.
          </div>
        )}

        {!loading && featured && (

          <>
            <div className="mt-14 overflow-hidden rounded-3xl border border-yellow-500/40 bg-zinc-900">

              {featured.image && (
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-72 w-full object-cover"
                />
              )}

              <div className="p-8">

                <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-sm font-bold text-yellow-400">
                  ⭐ Sự kiện nổi bật
                </span>

                <h2 className="mt-5 text-4xl font-black">
                  {featured.title}
                </h2>

                <div className="mt-3 flex flex-wrap gap-5 text-sm text-zinc-500">
                  <span>📅 {formatDate(featured.created_at)}</span>
                  <span>👤 {featured.author}</span>
                </div>

                <p className="mt-8 whitespace-pre-wrap text-lg leading-8 text-zinc-300">
                  {featured.content}
                </p>

              </div>

            </div>

            {others.length > 0 && (

              <>
                <h3 className="mt-16 mb-6 text-3xl font-black">
                  📜 Sự kiện trước đó
                </h3>

                <div className="grid gap-6 md:grid-cols-2">

                  {others.map((item) => (

                    <div
                      key={item.id}
                      className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition hover:border-yellow-500"
                    >

                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-48 w-full object-cover"
                        />
                      )}

                      <div className="p-6">

                        <h3 className="text-2xl font-bold text-yellow-400">
                          {item.title}
                        </h3>

                        <div className="mt-2 text-sm text-zinc-500">
                          📅 {formatDate(item.created_at)}
                        </div>

                        <p className="mt-5 whitespace-pre-wrap text-zinc-300 line-clamp-5">
                          {item.content}
                        </p>

                        <div className="mt-6 border-t border-zinc-800 pt-4 text-sm text-zinc-500">
                          👤 {item.author}
                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </>

            )}

          </>

        )}

      </section>

    </main>
  );
}
