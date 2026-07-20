"use client";

import { useEffect, useMemo, useState } from "react";

type Event = {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return events.filter((e) =>
      (e.title + e.content).toLowerCase().includes(search.toLowerCase())
    );
  }, [events, search]);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("vi-VN");
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-14">

        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            🎉 Sự kiện
          </h1>

          <p className="mt-3 text-zinc-400">
            Những sự kiện mới nhất của Craftopia Survival
          </p>
        </div>

        <div className="mt-10">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Tìm kiếm sự kiện..."
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-4 outline-none focus:border-green-500"
          />
        </div>

        {loading ? (
          <div className="mt-10 text-center text-zinc-400">
            Đang tải...
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
            Không có sự kiện.
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {filtered.map((event) => (
              <div
                key={event.id}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-green-500 hover:-translate-y-1"
              >
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
                  EVENT
                </span>

                <h2 className="mt-4 text-2xl font-bold">
                  {event.title}
                </h2>

                <p className="mt-4 line-clamp-4 text-zinc-400">
                  {event.content}
                </p>

                <div className="mt-6 flex items-center justify-between text-sm text-zinc-500">
                  <span>👤 {event.author}</span>
                  <span>{formatDate(event.created_at)}</span>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </main>
  );
}
