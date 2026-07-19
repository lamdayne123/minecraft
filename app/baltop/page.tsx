"use client";

import { useEffect, useMemo, useState } from "react";

type Player = {
  player?: string;
  name?: string;
  money?: number | string;
};

export default function BaltopPage() {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  function formatMoney(value: any) {
    if (value === null || value === undefined) return "0";

    // Nếu đã là dạng 1.5M, 20K, 2B thì giữ nguyên
    if (typeof value === "string") {
      const upper = value.toUpperCase().trim();

      if (
        upper.endsWith("K") ||
        upper.endsWith("M") ||
        upper.endsWith("B")
      ) {
        return upper;
      }

      value = Number(upper.replace(/,/g, ""));
    }

    value = Number(value);

    if (isNaN(value)) return "0";

    if (value >= 1_000_000_000) {
      return (
        (value / 1_000_000_000)
          .toFixed(1)
          .replace(".0", "") + "B"
      );
    }

    if (value >= 1_000_000) {
      return (
        (value / 1_000_000)
          .toFixed(1)
          .replace(".0", "") + "M"
      );
    }

    if (value >= 1_000) {
      return (
        (value / 1_000)
          .toFixed(1)
          .replace(".0", "") + "K"
      );
    }

    return value.toString();
  }

  async function loadBaltop() {
    try {
      const res = await fetch(
        "/api/baltop",
        {
          cache:"no-store"
        }
      );
      const data = await res.json();
      setPlayers(
        Array.isArray(data)
        ? data
        : []
      );
    } catch(err) {
      console.error(
        "Baltop load error:",
        err
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    loadBaltop();
    const timer =
      setInterval(
        loadBaltop,
        30000
      );
    return ()=>clearInterval(timer);
  },[]);

  const medals = [
    "🥇",
    "🥈",
    "🥉"
  ];

  const parseMoneyValue = (value: any) => {
    if (value === null || value === undefined) return 0;

    if (typeof value === "string") {
      const upper = value.toUpperCase().trim();

      if (upper.endsWith("K")) return Number(upper.slice(0, -1)) * 1_000;
      if (upper.endsWith("M")) return Number(upper.slice(0, -1)) * 1_000_000;
      if (upper.endsWith("B")) return Number(upper.slice(0, -1)) * 1_000_000_000;

      return Number(upper.replace(/,/g, ""));
    }

    return Number(value);
  };

  const sortedPlayers = useMemo(() => {
    return [...players]
      .sort((a, b) => parseMoneyValue(b.money) - parseMoneyValue(a.money))
      .slice(0, 20);
  }, [players]);

  // Helper to get player display name from different possible fields
  const getPlayerName = (player: any) => {
    if (!player) return "Unknown";
    return (
      player.name || player.username || player.player || player.playerName || player.uuid || "Unknown"
    );
  };

  const getMoney = (player: any) => {
    if (!player) return formatMoney(0);
    return formatMoney(player.money ?? player.balance ?? 0);
  };

  return (
    <main
      className="
      min-h-screen
      bg-gradient-to-b
      from-zinc-950
      via-zinc-900
      to-black
      text-white
      px-4
      sm:px-6
      py-16
      "
    >
      <style>{`
        @keyframes craftopia-marquee {
          0% { transform: translateX(0); }
          15% { transform: translateX(0); }
          85% { transform: translateX(-50%); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 767px) {
          .craftopia-marquee-track {
            display: inline-flex;
            width: max-content;
            animation: craftopia-marquee 8s linear 1 forwards;
            will-change: transform;
          }
        }

        @media (min-width: 768px) {
          .craftopia-marquee-track {
            animation: none;
          }
        }
      `}</style>

      <div
        className="
        mx-auto
        max-w-6xl
        "
      >
        <div className="text-center">
          <h1
            className="
            text-4xl
            sm:text-6xl
            font-black
            bg-gradient-to-r
            from-yellow-400
            via-green-400
            to-cyan-400
            bg-clip-text
            text-transparent
            "
          >
            💰 Baltop
          </h1>
          <p
            className="
            mt-4
            text-zinc-400
            "
          >
            Top 20 người chơi giàu nhất Craftopia Survival
          </p>
        </div>
        {
          loading ?
          (
            <div
              className="
              mt-20
              text-center
              text-zinc-400
              animate-pulse
              "
            >
              Đang tải bảng xếp hạng...
            </div>
          )
          :
          players.length === 0 ?
          (
            <div
              className="
              mt-20
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900
              p-10
              text-center
              "
            >
              Chưa có dữ liệu Baltop
            </div>
          )
          :
          (
            <>
              {/* TOP 3 */}
              <section
                className="
                mt-14
                grid
                gap-6
                md:grid-cols-3
                items-end
                "
              >
                {sortedPlayers.slice(0,3).map((player,index)=>{
                  const name = getPlayerName(player);
                  return (
                    <div
                      key={name}
                      className={`
                      relative
                      overflow-hidden
                      rounded-[2rem]
                      border
                      bg-zinc-900/80
                      backdrop-blur-xl
                      p-6
                      text-center
                      shadow-xl
                      transition
                      hover:-translate-y-2

                      ${index===0
                        ?
                        "border-yellow-400 md:order-2 md:-mt-8 md:scale-[1.05]"
                        :
                        index===1
                        ?
                        "border-gray-400 md:order-1 md:mt-6"
                        :
                        "border-orange-500 md:order-3 md:mt-6"
                      }
                      `}
                    >
                      <div
                        className={`
                        mb-3
                        text-6xl
                        ${index===0 ? "text-yellow-300" : index===1 ? "text-gray-300" : "text-orange-300"}
                        `}
                      >
                        {medals[index]}
                      </div>
                      <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-[1.65rem] border border-white/10 bg-zinc-950/80 shadow-[0_10px_24px_rgba(0,0,0,0.4)]">
                        <img
                          src={`https://render.crafty.gg/3d/head/${encodeURIComponent(name)}?width=128&height=128`}
                          alt={name}
                          className="h-24 w-24 rounded-[1.1rem] object-cover"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.src = "https://render.crafty.gg/3d/head/Steve?width=128&height=128";
                          }}
                        />
                      </div>
                      <div className={`
                        mx-auto
                        inline-flex
                        max-w-full
                        items-center
                        gap-2
                        rounded-2xl
                        border
                        border-white/10
                        bg-black/45
                        px-4
                        py-2
                        ${index===0 ? "max-w-[12rem]" : "max-w-[11rem]"}
                      `}>
                        <span className="text-lime-300">▰</span>
                        <div className="min-w-0">
                          <div className="block max-w-[9rem] overflow-hidden whitespace-nowrap md:hidden">
                            <div className="craftopia-marquee-track">
                              <span className="pr-8 text-lime-400">{name}</span>
                              <span className="pr-8 text-lime-400" aria-hidden="true">
                                {name}
                              </span>
                            </div>
                          </div>
                          <span className="hidden truncate font-bold text-lime-400 md:block">
                            {name}
                          </span>
                        </div>
                      </div>
                      <div className="mt-6 text-left">
                        <div className="text-xs font-bold tracking-[0.2em] text-zinc-400">
                          SỐ TIỀN
                        </div>
                        <div className={`mt-2 flex items-end justify-between gap-4 ${index===0 ? "text-yellow-400" : index===1 ? "text-zinc-100" : "text-orange-300"}`}>
                          <div className="text-4xl font-black tracking-tight">
                            {getMoney(player)}
                          </div>
                          <div className="text-4xl">{index===0 ? "🪙" : index===1 ? "🪙" : "💰"}</div>
                        </div>
                      </div>
                      {index===0 && (
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-60" />
                      )}
                    </div>
                  );
                })}
              </section>
              {/* TOP 4 - 20 */}
              <section
                className="
                mt-10
                space-y-4
                "
              >
                {sortedPlayers.slice(3,20).map((player,index)=>{
                  const name = getPlayerName(player);
                  return (
                    <div
                      key={name + index}
                      className="
                      flex
                      items-center
                      justify-between
                      gap-3
                      rounded-2xl
                      border
                      border-zinc-800
                      bg-zinc-900
                      p-4
                      sm:p-5
                      transition
                      hover:border-green-500
                      hover:bg-zinc-800
                      "
                    >
                      <div
                        className="
                        flex
                        items-center
                        gap-3
                        min-w-0
                        "
                      >
                        <div
                          className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-zinc-800
                          font-black
                          text-green-400
                          "
                        >
                          #{index+4}
                        </div>
                        <img
                          src={`https://mc-heads.net/head/${encodeURIComponent(name)}/64`}
                          alt={name}
                          className="h-11 w-11 shrink-0 rounded-xl border border-white/10 bg-zinc-950 object-cover shadow-lg"
                          style={{ imageRendering: "pixelated" }}
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.src = "https://mc-heads.net/head/Steve/64";
                          }}
                        />
                        <div className="min-w-0">
                          <div className="block max-w-[8.5rem] overflow-hidden whitespace-nowrap md:hidden">
                            <div className="craftopia-marquee-track">
                              <span className="pr-8 inline-block font-bold">
                                {name}
                              </span>
                              <span className="pr-8 inline-block font-bold" aria-hidden="true">
                                {name}
                              </span>
                            </div>
                          </div>
                          <span className="hidden font-bold truncate md:block">
                            {name}
                          </span>
                        </div>
                      </div>
                      <span
                        className="
                        font-black
                        text-green-400
                        whitespace-nowrap
                        "
                      >
                        💰 {getMoney(player)}
                      </span>
                    </div>
                  );
                })}
              </section>
              <div className="
                mt-6
                rounded-2xl
                border border-emerald-500/25
                bg-emerald-500/8
                px-4 py-4
                text-sm text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">ℹ️</span>
                  <span>
                    Số tiền được tính dựa trên hệ thống Economy của server Craftopia Survival.
                  </span>
                </div>
              </div>
            </>
          )
        }
      </div>
    </main>
  );
}
