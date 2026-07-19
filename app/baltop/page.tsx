"use client";

import { useEffect, useMemo, useState } from "react";

type Player = {
  player?: string;
  name?: string;
  money?: number | string;
};

export default function BaltopPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  // Chuyển đổi số tiền thành định dạng ngắn gọn (k,m,b).
  function formatMoney(value: any) {
    if (value == null) return "0";
    if (typeof value === "string") {
      const upper = value.toUpperCase().trim();
      if (upper.endsWith("K") || upper.endsWith("M") || upper.endsWith("B")) {
        return upper.toLowerCase(); // Giữ nguyên chữ K,M,B
      }
      value = Number(upper.replace(/,/g, ""));
    }
    value = Number(value);
    if (isNaN(value)) return "0";
    const compact = (num: number, suffix: "k" | "m" | "b") =>
      `${num.toFixed(2).replace(/\.?0+$/, "")}${suffix}`;
    if (value >= 1_000_000_000) return compact(value / 1_000_000_000, "b");
    if (value >= 1_000_000) return compact(value / 1_000_000, "m");
    if (value >= 1_000) return compact(value / 1_000, "k");
    return value.toString();
  }

  // Tải bảng tiền Top từ API server
  async function loadBaltop() {
    try {
      const res = await fetch("/api/baltop", { cache: "no-store" });
      const data = await res.json();
      setPlayers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Baltop load error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBaltop();
    const timer = setInterval(loadBaltop, 30000);
    return () => clearInterval(timer);
  }, []);

  const medals = ["🥇", "🥈", "🥉"];

  // Lấy tên người chơi (dùng player hay name)
  const getPlayerName = (player: Player) =>
    player.player || player.name || "Unknown";
  const getMoney = (player: Player) => formatMoney(player.money);

  const statUpdated = new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <main
      className="min-h-screen overflow-x-hidden text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at top, rgba(34,197,94,0.14), transparent 36%), linear-gradient(to bottom, #050505 0%, #050705 52%, #030303 100%)",
      }}
    >
      {/* CSS animation marquee chỉ trên mobile */}
      <style>{`
        @media (max-width: 767px) {
          .craftopia-marquee {
            display: inline-block;
            /* Đảm bảo phần tử rộng bằng nội dung */
            min-width: max-content;
            /* Khoảng trống phía sau để tạo vòng lặp */
            padding-right: 1rem;
            animation: marquee-scroll 10s linear infinite;
            will-change: transform; /* Tối ưu hóa GPU tránh jank */
          }
          /* Nhân đôi tên, mỗi bản sao cách nhau gap */
          .craftopia-marquee span {
            display: inline-block;
            padding-right: 1rem;
          }
        }
        @media (min-width: 768px) {
          .craftopia-marquee {
            /* Desktop tắt animation */
            animation: none !important;
          }
        }
        /* Keyframes di chuyển sang trái 50% (vòng lặp 2 lần nội dung) */
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        /* Tôn trọng người dùng giảm chuyển động */
        @media (prefers-reduced-motion: reduce) {
          .craftopia-marquee {
            animation: none !important;
          }
        }
        /* Pause khi hover hoặc focus để cải thiện khả năng tương tác */
        .craftopia-marquee:hover,
        .craftopia-marquee:focus {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        {/* ... Phần header và mục giới thiệu (giữ nguyên) ... */}

        <section className="mt-10">
          {loading ? (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 px-6 py-16 text-center text-zinc-400">
              Đang tải bảng xếp hạng...
            </div>
          ) : players.length === 0 ? (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 px-6 py-16 text-center text-zinc-400">
              Chưa có dữ liệu Baltop
            </div>
          ) : (
            <>
              {/* Top 3 */}
              <section className="grid items-end gap-5 md:grid-cols-3">
                {players.slice(0, 3).map((player, index) => {
                  const rank = index + 1;
                  const name = getPlayerName(player);
                  // Avatar Minecraft
                  const avatar = `https://mc-heads.net/avatar/${encodeURIComponent(name)}/128`;

                  // Style theo hạng
                  const rankStyles =
                    rank === 1
                      ? "border-yellow-300/70 bg-yellow-500/10 shadow-[0_0_40px_rgba(250,204,21,0.16)] md:-mt-8 md:order-2 md:scale-[1.05] z-10"
                      : rank === 2
                      ? "border-zinc-300/60 bg-zinc-400/8 md:order-1 md:mt-6"
                      : "border-orange-400/70 bg-orange-500/10 md:order-3 md:mt-6";

                  const rankGlow =
                    rank === 1 ? "text-yellow-300" :
                    rank === 2 ? "text-zinc-200" :
                    "text-orange-300";

                  const moneyColor =
                    rank === 1 ? "text-yellow-400" :
                    rank === 2 ? "text-zinc-100" :
                    "text-orange-300";

                  const medalIcon = medals[index] || "🏅";

                  return (
                    <article
                      key={name}
                      className={`relative overflow-hidden rounded-[2rem] border p-6 text-center backdrop-blur-xl transition hover:-translate-y-1 sm:p-8 ${rankStyles}`}
                    >
                      {rank === 1 && (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.18),transparent_48%)]" />
                      )}
                      <div className="relative z-10">
                        <div className={`mb-3 text-4xl font-black ${rankGlow}`}>
                          {medalIcon}
                        </div>
                        <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-[1.65rem] border border-white/10 bg-zinc-950/80 shadow-[0_0_20px_rgba(0,0,0,0.35)]">
                          <img
                            src={avatar}
                            alt={name}
                            className="h-24 w-24 rounded-[1.1rem] object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                "https://mc-heads.net/avatar/Steve/128";
                            }}
                          />
                        </div>
                        <div className="mx-auto inline-flex max-w-full items-center gap-2 rounded-2xl border border-white/10 bg-black/45 px-4 py-2">
                          <span className="text-lime-300">▰</span>
                          {/* Tên người chơi (marquee) */}
                          <span className="craftopia-marquee max-w-[12rem] overflow-hidden whitespace-nowrap text-lime-400">
                            <span aria-hidden="true">{name}</span><span>{name}</span>
                          </span>
                        </div>
                        <div className="mt-6 text-left">
                          <div className="text-xs font-bold tracking-[0.2em] text-zinc-400">
                            SỐ TIỀN
                          </div>
                          <div className={`mt-2 flex items-end justify-between gap-4 ${moneyColor}`}>
                            <div className="text-4xl font-black tracking-tight">
                              {getMoney(player)}
                            </div>
                            <div className="text-4xl">{rank === 3 ? "💰" : "🪙"}</div>
                          </div>
                        </div>
                      </div>
                      {rank === 1 && (
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-60" />
                      )}
                    </article>
                  );
                })}
              </section>

              {/* Hạng 4-20 */}
              <section className="mt-8 overflow-hidden rounded-[2rem] border border-white/8 bg-black/55 shadow-2xl backdrop-blur-xl">
                <div className="grid grid-cols-[72px_1fr_120px] gap-4 border-b border-white/8 px-4 py-4 text-xs font-black uppercase tracking-[0.18em] text-zinc-400 sm:grid-cols-[88px_1fr_160px] sm:px-6">
                  <div>#</div>
                  <div>Người chơi</div>
                  <div className="text-right">Số tiền</div>
                </div>
                <div className="divide-y divide-white/5">
                  {players.slice(3, 20).map((player, idx) => {
                    const name = getPlayerName(player);
                    const avatar64 = `https://mc-heads.net/avatar/${encodeURIComponent(name)}/64`;
                    return (
                      <div
                        key={name + idx}
                        className="grid grid-cols-[72px_1fr_120px] items-center gap-4 px-4 py-4 transition hover:bg-white/4 sm:grid-cols-[88px_1fr_160px] sm:px-6"
                      >
                        <div className="text-lg font-black text-zinc-300">
                          #{idx + 4}
                        </div>
                        <div className="flex min-w-0 items-center gap-3">
                          <img
                            src={avatar64}
                            alt={name}
                            className="h-11 w-11 shrink-0 rounded-xl border border-white/10 bg-zinc-950 object-cover shadow-lg"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                "https://mc-heads.net/avatar/Steve/64";
                            }}
                          />
                          <div className="min-w-0">
                            <div className="max-w-full overflow-hidden whitespace-nowrap">
                              <span className="craftopia-marquee inline-block max-w-[10.5rem] overflow-hidden whitespace-nowrap font-bold text-white sm:max-w-none">
                                {name}
                              </span>
                            </div>
                            <div className="truncate text-xs text-zinc-500">
                              Craftopia Survival
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 whitespace-nowrap text-right font-black text-lime-400">
                          <span className="hidden sm:inline">💸</span>
                          <span>{getMoney(player)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Thông báo hệ thống */}
              <div className="mt-6 rounded-2xl border border-emerald-500/25 bg-emerald-500/8 px-4 py-4 text-sm text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">ℹ️</span>
                  <span>
                    Số tiền được tính dựa trên hệ thống Economy của server Craftopia Survival.
                  </span>
                </div>
              </div>
            </>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-white/8 py-6 text-sm text-zinc-400">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>© 2025 Craftopia Survival. All rights reserved.</div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🟩</span>
              <span>IP: craftopia.zencheap.net:30263</span>
              <span className="rounded-lg border border-white/10 p-1.5">📋</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
