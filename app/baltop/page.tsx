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

  function formatMoney(value: any) {
    if (value === null || value === undefined) return "0";

    if (typeof value === "string") {
      const upper = value.toUpperCase().trim();

      if (upper.endsWith("K") || upper.endsWith("M") || upper.endsWith("B")) {
        return upper;
      }

      value = Number(upper.replace(/,/g, ""));
    }

    value = Number(value);

    if (isNaN(value)) return "0";

    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(1).replace(".0", "") + "B";
    }

    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1).replace(".0", "") + "M";
    }

    if (value >= 1_000) {
      return (value / 1_000).toFixed(1).replace(".0", "") + "K";
    }

    return value.toString();
  }

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

  const sortedPlayers = useMemo(() => {
    return [...players].slice(0, 20);
  }, [players]);

  const getPlayerName = (player: Player) => player.player || player.name || "Unknown";
  const getMoney = (player: Player) => formatMoney(player.money);

  const statUpdated = new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.12),_transparent_45%),linear-gradient(to_bottom,#050505,#050705_55%,#030303)] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-40 pt-4">
          <div className="rounded-3xl border border-emerald-500/20 bg-black/75 px-4 py-3 shadow-[0_0_40px_rgba(34,197,94,0.08)] backdrop-blur-xl sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <a href="/" className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[url('https://cdn.modrinth.com/data/zGYJG6Zh/e3730cc2ff44ab6ce952e9b192114fcbce25dbda_96.webp')] bg-cover bg-center shadow-lg" />
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
                  ["QUY TẮC", "/rules"],
                  ["DONATE", "/donate"],
                  ["TIN TỨC", "/news"],
                  ["GALLERY", "/gallery"],
                ].map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    className={`transition hover:text-emerald-400 ${href === "/baltop" ? "text-emerald-400" : ""}`}
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

        <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-emerald-500/10 bg-black/55 px-4 py-16 shadow-2xl sm:px-8 sm:py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-10 top-14 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(74,222,128,0.9)]" />
            <div className="absolute right-16 top-16 h-3 w-3 rounded-full bg-lime-400 shadow-[0_0_24px_rgba(163,230,53,0.9)]" />
            <div className="absolute left-24 top-1/2 h-2 w-2 rounded-full bg-green-300 shadow-[0_0_18px_rgba(134,239,172,0.9)]" />
            <div className="absolute right-24 top-2/3 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.10),transparent_42%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent)]" />
          </div>

          <div className="relative z-10 text-center">
            <div className="mb-3 text-4xl">👑</div>
            <h1 className="mx-auto max-w-4xl text-5xl font-black tracking-[0.08em] text-transparent sm:text-7xl bg-[linear-gradient(180deg,#ffffff_10%,#f7f7f7_35%,#bafc6d_65%,#43ff4e_100%)] bg-clip-text drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]">
              BALTOP
            </h1>
            <p className="mt-4 text-sm font-bold tracking-[0.22em] text-zinc-300 sm:text-lg">
              TOP NHỮNG NGƯỜI GIÀU NHẤT SERVER
            </p>

            <div className="mx-auto mt-8 max-w-3xl rounded-full border border-white/10 bg-black/50 px-5 py-4 text-sm text-zinc-300 shadow-[0_0_32px_rgba(0,0,0,0.28)] backdrop-blur-md sm:px-8">
              <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400">♻️</span>
                  <span>Dữ liệu được cập nhật mỗi 5 phút</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <span>Cập nhật lúc {statUpdated}</span>
                  <span>🕒</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
        </section>

        <section className="mt-10">
          {loading ? (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 px-6 py-16 text-center text-zinc-400">
              Đang tải bảng xếp hạng...
            </div>
          ) : sortedPlayers.length === 0 ? (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 px-6 py-16 text-center text-zinc-400">
              Chưa có dữ liệu Baltop
            </div>
          ) : (
            <>
              <section className="grid gap-5 md:grid-cols-3">
                {sortedPlayers.slice(0, 3).map((player, index) => {
                  const isFirst = index === 1 ? false : index === 0;
                  const rank = index === 0 ? 2 : index === 1 ? 1 : 3;
                  const primary =
                    index === 1
                      ? "border-yellow-300/80 shadow-[0_0_34px_rgba(250,204,21,0.18)]"
                      : index === 0
                      ? "border-zinc-300/70"
                      : "border-orange-400/70";

                  const rankGlow =
                    index === 1
                      ? "text-yellow-300"
                      : index === 0
                      ? "text-zinc-300"
                      : "text-orange-300";

                  const moneyColor =
                    index === 1
                      ? "text-yellow-400"
                      : index === 0
                      ? "text-zinc-200"
                      : "text-orange-300";

                  const avatar = `https://mc-heads.net/avatar/${encodeURIComponent(getPlayerName(player))}/128`;

                  return (
                    <article
                      key={getPlayerName(player)}
                      className={`relative overflow-hidden rounded-[2rem] border bg-black/65 p-6 text-center backdrop-blur-xl transition hover:-translate-y-1 sm:p-8 ${primary} ${index === 1 ? "md:-mt-4 md:scale-[1.03]" : ""}`}
                    >
                      {index === 1 && (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.15),transparent_45%)]" />
                      )}

                      <div className="relative z-10">
                        <div className={`mb-3 text-4xl font-black ${rankGlow}`}>
                          {medals[index]}
                        </div>

                        <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-[1.65rem] border border-white/10 bg-zinc-950/80 shadow-[0_0_20px_rgba(0,0,0,0.35)]">
                          <img
                            src={avatar}
                            alt={getPlayerName(player)}
                            className="h-24 w-24 rounded-[1.1rem] object-cover"
                            onError={(e) => {
                              const target = e.currentTarget as HTMLImageElement;
                              target.src = "https://mc-heads.net/avatar/Steve/128";
                            }}
                          />
                        </div>

                        <div className="mx-auto inline-flex max-w-full items-center gap-2 rounded-2xl border border-white/10 bg-black/45 px-4 py-2">
                          <span className="text-lime-300">▰</span>
                          <span className="truncate font-bold text-lime-400">
                            {getPlayerName(player)}
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
                            <div className="text-4xl">
                              {index === 1 ? "🪙" : index === 0 ? "🪙" : "💰"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {index === 1 && (
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-60" />
                      )}
                    </article>
                  );
                })}
              </section>

              <section className="mt-8 overflow-hidden rounded-[2rem] border border-white/8 bg-black/55 shadow-2xl backdrop-blur-xl">
                <div className="grid grid-cols-[72px_1fr_120px] gap-4 border-b border-white/8 px-4 py-4 text-xs font-black uppercase tracking-[0.18em] text-zinc-400 sm:grid-cols-[88px_1fr_160px] sm:px-6">
                  <div>#</div>
                  <div>Người chơi</div>
                  <div className="text-right">Số tiền</div>
                </div>

                <div className="divide-y divide-white/5">
                  {sortedPlayers.slice(3, 20).map((player, index) => {
                    const avatar = `https://mc-heads.net/avatar/${encodeURIComponent(getPlayerName(player))}/64`;
                    return (
                      <div
                        key={getPlayerName(player)}
                        className="grid grid-cols-[72px_1fr_120px] items-center gap-4 px-4 py-4 transition hover:bg-white/4 sm:grid-cols-[88px_1fr_160px] sm:px-6"
                      >
                        <div className="text-lg font-black text-zinc-300">
                          #{index + 4}
                        </div>

                        <div className="flex min-w-0 items-center gap-3">
                          <img
                            src={avatar}
                            alt={getPlayerName(player)}
                            className="h-11 w-11 shrink-0 rounded-xl border border-white/10 bg-zinc-950 object-cover shadow-lg"
                            onError={(e) => {
                              const target = e.currentTarget as HTMLImageElement;
                              target.src = "https://mc-heads.net/avatar/Steve/64";
                            }}
                          />
                          <div className="min-w-0">
                            <div className="truncate font-bold text-white">
                              {getPlayerName(player)}
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
