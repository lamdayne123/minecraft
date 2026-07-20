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
        setEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return events;
    return events.filter((e) =>
      (e.title + e.content + e.author).toLowerCase().includes(q)
    );
  }, [events, search]);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <main
      className="min-h-screen overflow-x-hidden text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at top, rgba(34,197,94,0.16), transparent 32%), radial-gradient(circle at 20% 20%, rgba(132,204,22,0.10), transparent 22%), radial-gradient(circle at 80% 0%, rgba(74,222,128,0.10), transparent 24%), linear-gradient(to bottom, #050505 0%, #050705 52%, #030303 100%)",
      }}
    >
      <style>{`
        @keyframes craftopia-fade-up {
          from { opacity: 0; transform: translateY(16px); filter: blur(12px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes craftopia-pulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.04); }
        }
        .craftopia-card-enter {
          animation: craftopia-fade-up 0.7s ease-out both;
        }
        .craftopia-pulse {
          animation: craftopia-pulse 4s ease-in-out infinite;
        }
      `}</style>

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="sticky top-4 z-40 pt-4">
          <div className="rounded-3xl border border-emerald-500/15 bg-black/70 px-4 py-3 shadow-[0_0_40px_rgba(34,197,94,0.08)] backdrop-blur-xl sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <a href="/" className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-xl bg-cover bg-center shadow-lg"
                  style={{
                    backgroundImage:
                      "url('https://cdn.modrinth.com/data/zGYJG6Zh/e3730cc2ff44ab6ce952e9b192114fcbce25dbda_96.webp')",
                  }}
                />
                <div className="leading-none">
                  <div className="text-lg font-black tracking-[0.18em] text-emerald-400">
                    CRAFTOPIA
                  </div>
                  <div className="text-[11px] font-semibold tracking-[0.35em] text-zinc-400">
                    SURVIVAL
                  </div>
                </div>
              </a>

              <nav className="hidden items-center gap-7 text-sm font-medium text-zinc-300 xl:flex">
                {[
                  ["TRANG CHỦ", "/"],
                  ["BALTOP", "/baltop"],
                  ["GALLERY", "/gallery"],
                  ["DONATE", "/donate"],
                  ["QUY TẮC", "/rules"],
                  ["TIN TỨC", "/news"],
                  ["SỰ KIỆN", "/events"],
                ].map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    className={`transition hover:text-emerald-400 ${
                      href === "/events" ? "text-emerald-400" : ""
                    }`}
                  >
                    {label}
                  </a>
                ))}
              </nav>

              <a
                href="https://discord.gg/maY22mamA"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-emerald-400/50 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-white shadow-[0_0_18px_rgba(34,197,94,0.12)] transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/15"
              >
                <span className="text-base">💬</span>
                <span>DISCORD</span>
              </a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-emerald-500/10 bg-black/55 px-4 py-12 shadow-2xl sm:px-8 sm:py-18">
          <div className="pointer-events-none absolute inset-0">
            <div className="craftopia-pulse absolute left-10 top-14 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(74,222,128,0.9)]" />
            <div className="craftopia-pulse absolute right-16 top-16 h-3 w-3 rounded-full bg-lime-400 shadow-[0_0_24px_rgba(163,230,53,0.9)]" />
            <div className="craftopia-pulse absolute left-24 top-1/2 h-2 w-2 rounded-full bg-green-300 shadow-[0_0_18px_rgba(134,239,172,0.9)]" />
            <div className="craftopia-pulse absolute right-24 top-2/3 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.10),transparent_42%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent)]" />
          </div>

          <div className="relative z-10 text-center">
            <div className="mb-3 text-4xl">🎉</div>
            <h1 className="mx-auto max-w-4xl bg-[linear-gradient(180deg,#ffffff_10%,#f7f7f7_35%,#bafc6d_65%,#43ff4e_100%)] bg-clip-text text-4xl font-black tracking-[0.08em] text-transparent drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] sm:text-7xl">
              SỰ KIỆN
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium text-zinc-300 sm:text-lg">
              Những sự kiện, phần thưởng và hoạt động đang diễn ra tại Craftopia Survival.
            </p>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
        </section>

        {/* Search */}
        <section className="mt-10">
          <div className="rounded-[2rem] border border-white/10 bg-black/45 p-4 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-zinc-300">
                Tìm sự kiện
              </span>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                  🔎
                </span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm theo tên sự kiện, nội dung..."
                  className="w-full rounded-2xl border border-white/10 bg-black/55 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-400/40 focus:bg-black/70"
                />
              </div>
            </label>
          </div>
        </section>

        {/* Events grid — dạng vé, khác bố cục dòng thời gian của News */}
        <section className="mt-8 pb-16">
          {loading ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center text-zinc-300 backdrop-blur-xl">
              Đang tải sự kiện...
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center text-zinc-300 backdrop-blur-xl">
              {events.length === 0
                ? "Chưa có sự kiện nào đang diễn ra."
                : "Không tìm thấy sự kiện phù hợp."}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((event, index) => (
                <article
                  key={event.id}
                  className="craftopia-card-enter relative flex flex-col overflow-visible rounded-[2rem] border border-emerald-500/20 bg-black/50 shadow-[0_0_36px_rgba(34,197,94,0.12)] backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:border-emerald-400/50"
                  style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
                >
                  {/* Ribbon góc */}
                  <div className="absolute -top-2 left-5 rounded-full border border-emerald-400/40 bg-emerald-500 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-black shadow-[0_0_16px_rgba(34,197,94,0.5)]">
                    Sự kiện
                  </div>

                  {/* khấc vé bên trái/phải */}
                  <span className="absolute -left-3 top-[122px] hidden h-6 w-6 rounded-full bg-[#050705] sm:block" />
                  <span className="absolute -right-3 top-[122px] hidden h-6 w-6 rounded-full bg-[#050705] sm:block" />

                  <div className="p-5 pt-8 sm:p-7 sm:pt-9">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-xs text-zinc-500">
                        {formatDate(event.created_at)}
                      </span>
                    </div>

                    <h2 className="mt-4 break-words text-xl font-black leading-tight text-emerald-300 sm:text-2xl">
                      {event.title}
                    </h2>
                  </div>

                  {/* đường xé vé */}
                  <div className="relative mx-5 sm:mx-7">
                    <div className="border-t border-dashed border-white/15" />
                  </div>

                  <div className="flex flex-1 flex-col p-5 pt-4 sm:p-7 sm:pt-5">
                    <p className="line-clamp-4 flex-1 whitespace-pre-wrap break-words text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
                      {event.content}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                      <span className="text-zinc-400">
                        Tổ chức bởi{" "}
                        <span className="font-semibold text-white">{event.author}</span>
                      </span>
                      <span className="text-lg">🎁</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
