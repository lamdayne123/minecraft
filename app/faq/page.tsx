"use client";

import { useEffect, useMemo, useState } from "react";

type FaqItem = {
  icon: string;
  title: string;
  color: string;
  desc: string;
  items: string[];
  tip: string;
};

const faq: readonly FaqItem[] = [
  {
    icon: "🚀",
    title: "Bắt đầu chơi",
    color: "emerald",
    desc: "Thông tin cơ bản để tham gia Craftopia Survival.",
    items: [
      "IP: craftopia.zencheap.net:30263",
      "Java: 1.20 trở lên",
      "Bedrock: 26.0 trở lên",
      "Hỗ trợ Java & Bedrock",
      "Tham gia Discord nếu cần hỗ trợ.",
    ],
    tip: "Lần đầu vào server hãy đọc Rules trước.",
  },
  {
    icon: "🏡",
    title: "Claim",
    color: "lime",
    desc: "Bảo vệ đất và công trình của bạn.",
    items: [
      "Dùng /claim để claim 1 chunk tối đa 15 lần.",
      "Không ai có thể phá block trong claim của bạn.",
      "Có thể thêm bạn bè vào claim.",
      "Claim giúp chống grief.",
    ],
    tip: "Luôn claim trước khi xây nhà.",
  },
  {
    icon: "⚔️",
    title: "Kỹ năng",
    color: "violet",
    desc: "AuraSkills giúp tăng sức mạnh nhân vật.",
    items: [
      "Đào sẽ tăng Mining.",
      "Chặt cây tăng Foraging.",
      "Đánh quái tăng Fighting.",
      "Câu cá tăng Fishing.",
    ],
    tip: "Skill càng cao càng mở nhiều buff.",
  },
  {
    icon: "🎣",
    title: "Kiếm tiền",
    color: "cyan",
    desc: "Có nhiều cách kiếm tiền trong server.",
    items: [
      "Câu cá.",
      "Làm nông.",
      "Farm mob.",
      "Bán đồ cho Shop.",
      "Mua bán với người chơi qua AH.",
    ],
    tip: "Fishing là cách kiếm tiền ổn định cho người mới.",
  },
  {
    icon: "🛒",
    title: "Auction House",
    color: "amber",
    desc: "Mua bán vật phẩm với người chơi.",
    items: [
      "/ah để mở chợ.",
      "Đăng bán vật phẩm.",
      "Mua vật phẩm của người khác.",
      "Giá hoàn toàn do người chơi quyết định.",
    ],
    tip: "So sánh giá trước khi mua.",
  },
  {
    icon: "🎁",
    title: "Daily Rewards",
    color: "pink",
    desc: "Nhận quà mỗi ngày.",
    items: [
      "Sử dụng /rewards.",
      "Đăng nhập mỗi ngày để nhận thưởng.",
      "Không nhận sẽ mất chuỗi.",
    ],
    tip: "Đừng quên nhận quà mỗi ngày.",
  },
  {
    icon: "🏆",
    title: "Baltop",
    color: "orange",
    desc: "Bảng xếp hạng giàu nhất server.",
    items: [
      "Top 20 người chơi giàu nhất.",
      "Có phần thưởng định kỳ.",
      "Kiếm tiền để leo BXH.",
    ],
    tip: "Càng chăm chỉ càng dễ lên top.",
  },
  {
    icon: "💬",
    title: "Discord",
    color: "indigo",
    desc: "Nơi hỗ trợ và cập nhật server.",
    items: [
      "Nhận thông báo mới.",
      "Hỏi đáp với Staff.",
      "Báo lỗi.",
      "Tham gia sự kiện.",
    ],
    tip: "Discord là nơi hỗ trợ nhanh nhất.",
  },
];

type ThemeName = "emerald" | "lime" | "violet" | "cyan" | "amber" | "pink" | "orange" | "indigo";

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

export default function FAQPage() {
  const [selectedTitle, setSelectedTitle] = useState<string>(faq[0]?.title ?? "");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [...faq];
    return faq.filter((x) => {
      const haystack = [x.title, x.desc, ...x.items, x.tip].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [search]);

  const selected = useMemo<FaqItem>(() => {
    const current =
      filtered.find((x) => x.title === selectedTitle) ??
      faq.find((x) => x.title === selectedTitle) ??
      filtered[0] ??
      faq[0];

    return current;
  }, [filtered, selectedTitle]);

  useEffect(() => {
    if (filtered.length === 0) return;
    const stillVisible = filtered.some((x) => x.title === selectedTitle);
    if (!stillVisible) {
      setSelectedTitle(filtered[0].title);
    }
  }, [filtered, selectedTitle]);

  const activeTheme = themeClasses((selected?.color ?? "emerald") as ThemeName);

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
          from {
            opacity: 0;
            transform: translateY(16px);
            filter: blur(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes craftopia-shimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }

        @keyframes craftopia-pulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.04); }
        }

        .craftopia-card-enter {
          animation: craftopia-fade-up 0.7s ease-out both;
        }

        .craftopia-sheen {
          position: relative;
          overflow: hidden;
        }

        .craftopia-sheen::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-120%);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          animation: craftopia-shimmer 1.8s ease-in-out infinite;
          pointer-events: none;
        }

        .craftopia-pulse {
          animation: craftopia-pulse 4s ease-in-out infinite;
        }
      `}</style>

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
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
                      href === "/faq" ? "text-emerald-400" : ""
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

        <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-emerald-500/10 bg-black/55 px-4 py-14 shadow-2xl sm:px-8 sm:py-18">
          <div className="pointer-events-none absolute inset-0">
            <div className="craftopia-pulse absolute left-10 top-14 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(74,222,128,0.9)]" />
            <div className="craftopia-pulse absolute right-16 top-16 h-3 w-3 rounded-full bg-lime-400 shadow-[0_0_24px_rgba(163,230,53,0.9)]" />
            <div className="craftopia-pulse absolute left-24 top-1/2 h-2 w-2 rounded-full bg-green-300 shadow-[0_0_18px_rgba(134,239,172,0.9)]" />
            <div className="craftopia-pulse absolute right-24 top-2/3 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.10),transparent_42%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent)]" />
          </div>

          <div className="relative z-10 text-center">
            <div className="mb-3 text-4xl">📚</div>
            <h1 className="mx-auto max-w-4xl bg-[linear-gradient(180deg,#ffffff_10%,#f7f7f7_35%,#bafc6d_65%,#43ff4e_100%)] bg-clip-text text-5xl font-black tracking-[0.08em] text-transparent drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] sm:text-7xl">
              CRAFTOPIA FAQ
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium text-zinc-300 sm:text-lg">
              Hướng dẫn dành cho người chơi mới của Craftopia Survival.
            </p>

            <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 rounded-[1.75rem] border border-white/10 bg-black/50 p-3 text-sm text-zinc-300 shadow-[0_0_32px_rgba(0,0,0,0.28)] backdrop-blur-md sm:grid-cols-3 sm:p-4">
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                <span>🚀</span>
                <span className="font-semibold text-white">Dễ hiểu</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                <span>🛡️</span>
                <span className="font-semibold text-white">Cho người mới</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                <span>✨</span>
                <span className="font-semibold text-white">Cập nhật nhanh</span>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
        </section>

        <section className="mt-10">
          <div className="rounded-[2rem] border border-white/10 bg-black/45 p-4 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-zinc-300">
                Tìm mục hướng dẫn
              </span>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                  🔎
                </span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Ví dụ: claim, kiếm tiền, discord..."
                  className="w-full rounded-2xl border border-white/10 bg-black/55 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-400/40 focus:bg-black/70"
                />
              </div>
            </label>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-black/50 p-4 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black text-white">Mục FAQ</h2>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                {filtered.length} mục
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
              {filtered.map((item) => {
                const isActive = selected?.title === item.title;
                const theme = themeClasses(item.color as ThemeName);
                return (
                  <button
                    key={item.title}
                    onClick={() => setSelectedTitle(item.title)}
                    className={`shrink-0 rounded-full border px-4 py-3 text-sm font-bold transition ${theme.border} ${
                      isActive ? `${theme.soft} ${theme.text}` : "bg-white/5 text-zinc-300"
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.title}
                  </button>
                );
              })}
            </div>

            <div className="hidden space-y-2 lg:block">
              {filtered.map((item) => {
                const isActive = selected?.title === item.title;
                const theme = themeClasses(item.color as ThemeName);

                return (
                  <button
                    key={item.title}
                    onClick={() => setSelectedTitle(item.title)}
                    className={`w-full rounded-2xl border px-4 py-4 text-left transition duration-200 hover:-translate-y-0.5 hover:bg-white/5 ${
                      isActive
                        ? `${theme.border} ${theme.soft} ${theme.glow}`
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 text-2xl ${isActive ? theme.text : "text-white"}`}>
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <div className={`font-black ${isActive ? theme.text : "text-white"}`}>
                          {item.title}
                        </div>
                        <div className="mt-1 text-sm text-zinc-400">{item.desc}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <article
            className={`rounded-[2rem] border bg-black/50 p-5 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8 ${activeTheme.border} ${activeTheme.glow}`}
          >
            {selected ? (
              <>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-4xl">
                      {selected.icon}
                    </div>
                    <div>
                      <div
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold tracking-[0.18em] ${activeTheme.badge}`}
                      >
                        {selected.color.toUpperCase()}
                      </div>
                      <h2 className={`mt-3 text-3xl font-black sm:text-4xl ${activeTheme.text}`}>
                        {selected.title}
                      </h2>
                      <p className="mt-2 max-w-2xl text-zinc-300">{selected.desc}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300">
                    <div className="font-semibold text-white">Mẹo nhanh</div>
                    <div className="mt-1">{selected.tip}</div>
                  </div>
                </div>

                <div className="mt-8 grid gap-3">
                  {selected.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-zinc-100 transition hover:bg-white/5"
                    >
                      <span className={`mr-3 font-black ${activeTheme.text}`}>✓</span>
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm text-zinc-400">Mức độ</div>
                    <div className="mt-1 font-black text-white">Dễ hiểu</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm text-zinc-400">Cập nhật</div>
                    <div className="mt-1 font-black text-white">Liên tục</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm text-zinc-400">Hỗ trợ</div>
                    <div className="mt-1 font-black text-white">Discord</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-8 text-center text-zinc-300">
                Không tìm thấy mục phù hợp.
              </div>
            )}
          </article>
        </section>

        <section className="mt-10 rounded-[2rem] border border-emerald-500/15 bg-black/50 p-5 shadow-[0_0_40px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold tracking-[0.18em] text-emerald-300">
                THÔNG TIN NHANH
              </div>
              <h3 className="mt-4 text-2xl font-black sm:text-3xl">Craftopia Survival</h3>
              <p className="mt-3 max-w-2xl text-zinc-300">
                Server Survival với hệ thống claim, kinh tế, skills, auction house, rewards
                và nhiều hoạt động cho người chơi mới lẫn người chơi lâu năm.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm text-zinc-400">IP</div>
                  <div className="mt-1 font-black text-white">craftopia.zencheap.net:30263</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm text-zinc-400">Java</div>
                  <div className="mt-1 font-black text-white">1.20+</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm text-zinc-400">Bedrock</div>
                  <div className="mt-1 font-black text-white">26.0+</div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.16),transparent_50%),linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(0,0,0,0.25))] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-2xl">
                  💬
                </div>
                <div>
                  <div className="font-black text-white">Cần hỗ trợ?</div>
                  <div className="text-sm text-zinc-400">Discord là nơi phản hồi nhanh nhất</div>
                </div>
              </div>

              <a
                href="https://discord.gg/maY22mamA"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-4 font-bold text-black transition hover:scale-[1.01] hover:bg-emerald-400"
              >
                Tham gia Discord
              </a>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-zinc-300">
                Đọc Rules trước khi vào chơi để tránh vi phạm nội quy.
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
