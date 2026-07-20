// Ensure required variables exist to avoid runtime/TS errors when this file is loaded
const sortedPlayers: any[] = [];
const medals = ["🥇", "🥈", "🥉"];

const getPlayerName = (player: any): string =>
  player?.name ?? player?.username ?? "Steve";

const getMoney = (player: any): string => {
  const money = player?.money ?? player?.balance ?? 0;
  return typeof money === "number" ? money.toLocaleString() : String(money);
};

<section className="grid grid-cols-3 items-stretch gap-2 sm:gap-5">
  {sortedPlayers.slice(0, 3).map((player: any, index: number) => {
    const rank = index + 1;
    const name = getPlayerName(player);
    const avatar = `https://mc-heads.net/avatar/${encodeURIComponent(name)}/128`;

    const rankStyles =
      rank === 1
        ? "col-start-2 border-yellow-300/70 bg-yellow-500/10 shadow-[0_0_40px_rgba(250,204,21,0.18)] scale-[1.06] z-10"
        : rank === 2
        ? "col-start-1 border-zinc-300/60 bg-zinc-400/8"
        : "col-start-3 border-orange-400/70 bg-orange-500/10";

    const rankGlow =
      rank === 1 ? "text-yellow-300" : rank === 2 ? "text-zinc-200" : "text-orange-300";

    const moneyColor =
      rank === 1 ? "text-yellow-400" : rank === 2 ? "text-zinc-100" : "text-orange-300";

    const medalIcon = medals[index] || "🏅";

    return (
      <article
        key={name}
        className={`relative h-full overflow-visible rounded-[2rem] border p-2 text-center backdrop-blur-xl transition hover:-translate-y-1 sm:p-6 ${rankStyles}`}
      >
        {rank === 1 && (
          <>
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.18),transparent_48%)]" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-yellow-300/60 bg-black/80 px-3 py-1 text-[10px] font-black tracking-[0.2em] text-yellow-300 shadow-[0_0_16px_rgba(250,204,21,0.4)] sm:-top-4 sm:px-4 sm:py-1.5 sm:text-xs">
              TOP 1
            </div>
          </>
        )}

        <div className="relative z-10 pt-2 sm:pt-3">
          <div className={`mb-2 text-xl font-black sm:mb-3 sm:text-3xl ${rankGlow}`}>
            {medalIcon}
          </div>

          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-[1rem] border border-white/10 bg-zinc-950/80 shadow-[0_0_20px_rgba(0,0,0,0.35)] sm:mb-4 sm:h-24 sm:w-24 sm:rounded-[1.5rem]">
            <img
              src={avatar}
              alt={name}
              className="h-9 w-9 rounded-[0.8rem] object-cover sm:h-20 sm:w-20 sm:rounded-[1rem]"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = "https://mc-heads.net/avatar/Steve/128";
              }}
            />
          </div>

          <div className="mx-auto flex w-full max-w-full items-center justify-center gap-1 rounded-2xl border border-white/10 bg-black/45 px-1.5 py-1.5 sm:gap-2 sm:px-4 sm:py-2">
            <span className="text-[9px] text-lime-300 sm:text-base">▰</span>
            <span className="block min-w-0 whitespace-normal break-words text-center text-[9px] font-bold leading-tight text-lime-400 sm:text-base sm:whitespace-nowrap sm:leading-normal">
              {name}
            </span>
          </div>

          <div className="mt-3 text-left sm:mt-6">
            <div className="text-[8px] font-bold tracking-[0.2em] text-zinc-400 sm:text-xs">
              SỐ TIỀN
            </div>
            <div className={`mt-1.5 flex items-end justify-between gap-2 sm:mt-2 sm:gap-4 ${moneyColor}`}>
              <div className="text-xs font-black tracking-tight sm:text-3xl">
                {getMoney(player)}
              </div>
              <div className="text-base sm:text-3xl">{rank === 3 ? "💰" : "🪙"}</div>
            </div>
          </div>
        </div>

        {rank === 1 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2 rounded-b-[2rem] bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-60" />
        )}
      </article>
    );
  })}
</section>
