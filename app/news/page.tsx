"use client";

import { useEffect, useMemo, useState } from "react";

type News = {
  id: number;
  title: string;
  content: string;
  author: string;
  image?: string;
  category: string;
  created_at: string;
};

type ThemeName =
  | "emerald"
  | "lime"
  | "violet"
  | "cyan"
  | "amber"
  | "pink"
  | "orange"
  | "indigo";

const THEME_ORDER: ThemeName[] = [
  "emerald",
  "lime",
  "violet",
  "cyan",
  "amber",
  "pink",
  "orange",
  "indigo",
];

function themeClasses(theme: ThemeName) {
  const map: Record<
    ThemeName,
    { border: string; text: string; glow: string; soft: string; badge: string }
  > = {
    emerald: {
      border: "border-emerald-500/25",
      text: "text-emerald-300",
      glow: "shadow-[0_0_40px_rgba(34,197,94,0.14)]",
      soft: "bg-emerald-500/8",
      badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    },
    lime: {
      border: "border-lime-500/25",
      text: "text-lime-300",
      glow: "shadow-[0_0_40px_rgba(163,230,53,0.14)]",
      soft: "bg-lime-500/8",
      badge: "bg-lime-500/10 text-lime-300 border-lime-500/20",
    },
    violet: {
      border: "border-violet-500/25",
      text: "text-violet-300",
      glow: "shadow-[0_0_40px_rgba(168,85,247,0.14)]",
      soft: "bg-violet-500/8",
      badge: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    },
    cyan: {
      border: "border-cyan-500/25",
      text: "text-cyan-300",
      glow: "shadow-[0_0_40px_rgba(34,211,238,0.14)]",
      soft: "bg-cyan-500/8",
      badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    },
    amber: {
      border: "border-amber-500/25",
      text: "text-amber-300",
      glow: "shadow-[0_0_40px_rgba(245,158,11,0.14)]",
      soft: "bg-amber-500/8",
      badge: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    },
    pink: {
      border: "border-pink-500/25",
      text: "text-pink-300",
      glow: "shadow-[0_0_40px_rgba(236,72,153,0.14)]",
      soft: "bg-pink-500/8",
      badge: "bg-pink-500/10 text-pink-300 border-pink-500/20",
    },
    orange: {
      border: "border-orange-500/25",
      text: "text-orange-300",
      glow: "shadow-[0_0_40px_rgba(249,115,22,0.14)]",
      soft: "bg-orange-500/8",
      badge: "bg-orange-500/10 text-orange-300 border-orange-500/20",
    },
    indigo: {
      border: "border-indigo-500/25",
      text: "text-indigo-300",
      glow: "shadow-[0_0_40px_rgba(99,102,241,0.14)]",
      soft: "bg-indigo-500/8",
      badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    },
  };

  return map[theme];
}

// Gán màu ổn định cho mỗi category (cùng tên -> cùng màu mỗi lần render)
function themeForCategory(category: string): ThemeName {
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = (hash * 31 + category.charCodeAt(i)) >>> 0;
  }
  return THEME_ORDER[hash % THEME_ORDER.length];
}

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/news", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch(console.error)
      .finally(() => setLoaded(true));
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return news;
    return news.filter((n) =>
      [n.title, n.content, n.author, n.category].join(" ").toLowerCase().includes(q)
    );
  }, [news, search]);

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
                ].map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    className={`transition hover:text-emerald-400 ${
                      href === "/news" ? "text-emerald-400" : ""
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
            <div className="mb-3 text-4xl">📰</div>
            <h1 className="mx-auto max-w-4xl bg-[linear-gradient(180deg,#ffffff_10%,#f7f7f7_35%,#bafc6d_65%,#43ff4e_100%)] bg-clip-text text-4xl font-black tracking-[0.08em] text-transparent drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] sm:text-7xl">
              TIN TỨC
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium text-zinc-300 sm:text-lg">
              Các thông báo, cập nhật và sự kiện mới nhất từ Craftopia Survival.
            </p>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
        </section>

        {/* Search */}
        <section className="mt-10">
          <div className="rounded-[2rem] border border-white/10 bg-black/45 p-4 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-zinc-300">
                Tìm thông báo
              </span>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                  🔎
                </span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm theo tiêu đề, nội dung, tác giả..."
                  className="w-full rounded-2xl border border-white/10 bg-black/55 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-400/40 focus:bg-black/70"
                />
              </div>
            </label>
          </div>
        </section>

        {/* News list */}
        <section className="mt-8 space-y-6 pb-16">
          {loaded && filtered.length === 0 && (
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center text-zinc-300 backdrop-blur-xl">
              {news.length === 0
                ? "Chưa có thông báo nào."
                : "Không tìm thấy thông báo phù hợp."}
            </div>
          )}

          {filtered.map((item, index) => {
            const theme = themeClasses(themeForCategory(item.category));

            return (
              <article
                key={item.id}
                className={`craftopia-card-enter min-w-0 overflow-hidden rounded-[2rem] border bg-black/50 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 ${theme.border} ${theme.glow}`}
                style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
              >
                {item.image && (
                  <div className="aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="p-5 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h2
                      className={`min-w-0 break-words text-xl font-black leading-tight sm:text-2xl ${theme.text}`}
                    >
                      {item.title}
                    </h2>
                    <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400">
                      {formatDate(item.created_at)}
                    </span>
                  </div>

                  <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-relaxed text-zinc-300 sm:text-base">
                    {item.content}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm">
                    <span className="text-zinc-400">
                      Đăng bởi{" "}
                      <span className="font-semibold text-white">{item.author}</span>
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${theme.badge}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${theme.text.replace("text-", "bg-")}`} />
                      {item.category}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
