"use client";

import { useEffect, useState } from "react";

export default function BaltopPage() {
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/baltop")
      .then(res => res.json())
      .then(data => setPlayers(data));
  }, []);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white px-6 py-20">

      <div className="mx-auto max-w-5xl">

        <h1 className="text-center text-5xl font-black text-green-400">
          💰 Craftopia Survival
        </h1>

        <p className="mt-3 text-center text-zinc-400">
          Top những người chơi giàu nhất server
        </p>


        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {players.slice(0,3).map((player,index)=>(

            <div
              key={player.rank}
              className="rounded-3xl border border-zinc-700 bg-zinc-900/80 p-8 text-center shadow-xl transition hover:-translate-y-2"
            >

              <div className="text-5xl">
                {medals[index]}
              </div>

              <h2 className="mt-4 text-2xl font-black">
                {player.player}
              </h2>

              <p className="mt-3 text-xl font-bold text-green-400">
                💰 {player.money}
              </p>

            </div>

          ))}

        </div>


        <div className="mt-10 space-y-4">

          {players.slice(3).map((player)=>(

            <div
              key={player.rank}
              className="
              flex items-center justify-between
              rounded-2xl
              border border-zinc-800
              bg-zinc-900
              p-5
              transition
              hover:border-green-500
              hover:bg-zinc-800
              "
            >

              <div className="flex items-center gap-4">

                <span className="text-2xl font-black text-zinc-400">
                  #{player.rank}
                </span>

                <span className="font-bold text-lg">
                  {player.player}
                </span>

              </div>


              <span className="font-black text-green-400">
                💰 {player.money}
              </span>


            </div>

          ))}

        </div>

      </div>

    </main>
  );
}