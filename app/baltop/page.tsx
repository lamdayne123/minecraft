"use client";

import { useEffect, useState } from "react";

export default function BaltopPage() {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadBaltop() {
    try {
      const res = await fetch("/api/baltop", {
        cache: "no-store",
      });

      const data = await res.json();

      setPlayers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBaltop();

    const interval = setInterval(loadBaltop, 30000);

    return () => clearInterval(interval);
  }, []);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white px-6 py-20">

      <div className="mx-auto max-w-6xl">

        <h1 className="text-center text-5xl font-black bg-gradient-to-r from-yellow-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
          💰 Baltop
        </h1>

        <p className="mt-4 text-center text-zinc-400">
          Top 20 người chơi giàu nhất Craftopia Survival
        </p>

        {loading ? (
          <div className="mt-20 text-center text-zinc-400">
            Đang tải...
          </div>
        ) : (
          <>
            {/* Top 3 */}
            <div className="mt-14 grid gap-6 md:grid-cols-3">

              {players.slice(0, 3).map((player, index) => (

                <div
                  key={player.player}
                  className="rounded-3xl border border-zinc-700 bg-zinc-900/80 p-8 text-center shadow-2xl transition hover:-translate-y-2 hover:border-yellow-500"
                >

                  <div className="text-6xl">
                    {medals[index]}
                  </div>

                  <h2 className="mt-5 text-2xl font-black">
                    {player.player}
                  </h2>

                  <p className="mt-4 text-2xl font-bold text-green-400">
                    💰 {Number(player.money).toLocaleString()}
                  </p>

                </div>

              ))}

            </div>

            {/* Top 4-20 */}
            <div className="mt-10 space-y-4">

              {players.slice(3).map((player, index) => (

                <div
                  key={player.player}
                  className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-green-500 hover:bg-zinc-800"
                >

                  <div className="flex items-center gap-5">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 font-black text-green-400">
                      #{index + 4}
                    </div>

                    <span className="text-lg font-bold">
                      {player.player}
                    </span>

                  </div>

                  <span className="text-lg font-black text-green-400">
                    💰 {Number(player.money).toLocaleString()}
                  </span>

                </div>

              ))}

            </div>

          </>
        )}

      </div>

    </main>
  );
}
