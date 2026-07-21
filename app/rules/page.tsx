const rules = [
  { icon: '🤝', title: 'Tôn trọng nhau', content: 'Không xúc phạm, gây war, spam chat hoặc làm phiền người khác.' },
  { icon: '🚫', title: 'Không gian lận', content: 'Không sử dụng hack, cheat, duping hoặc bất kỳ công cụ gian lận nào.' },
  { icon: '⚒️', title: 'Không phá hoại', content: 'Không grief hoặc phá hoại công trình người khác.' },
  { icon: '📢', title: 'Không quảng cáo', content: 'Không quảng bá server khác, link hay nội dung không liên quan.' },
  { icon: '👮', title: 'Tuân thủ Staff', content: 'Lắng nghe hướng dẫn của Admin, Mod và Helper khi chơi.' },
  { icon: '⚠️', title: 'Bảo vệ Server', content: 'Mọi hành vi gây hại cho server đều bị nghiêm cấm (ban vĩnh viễn).' },
];

export default function RulesPage() {
  return (
    <main
      className="min-h-screen overflow-x-hidden text-white"
      style={{
        backgroundImage:
          'radial-gradient(circle at top, rgba(34,197,94,0.16), transparent 32%), ' +
          'radial-gradient(circle at 20% 20%, rgba(132,204,22,0.10), transparent 22%), ' +
          'radial-gradient(circle at 80% 0%, rgba(74,222,128,0.10), transparent 24%), ' +
          'linear-gradient(to bottom, #050505 0%, #050705 52%, #030303 100%)',
      }}
    >
      <style>{`
        @keyframes craftopia-fade-up {
          from { opacity: 0; transform: translateY(16px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes craftopia-pulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.06); }
        }
        @keyframes craftopia-glow-sweep {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        .craftopia-card-enter { animation: craftopia-fade-up 0.6s ease-out both; }
        .craftopia-pulse { animation: craftopia-pulse 4s ease-in-out infinite; }
        .craftopia-cta-sheen {
          position: relative;
          overflow: hidden;
        }
        .craftopia-cta-sheen::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-120%);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent);
          animation: craftopia-glow-sweep 2.6s ease-in-out infinite;
          pointer-events: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .craftopia-card-enter, .craftopia-pulse, .craftopia-cta-sheen::after {
            animation: none !important;
          }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-40">
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

        <section className="relative mt-8 px-4 text-center">
          <div className="pointer-events-none absolute inset-0">
            <div className="craftopia-pulse absolute left-8 top-10 h-3 w-3 rounded-full bg-emerald-300 blur-lg" />
            <div className="craftopia-pulse absolute right-10 top-16 h-4 w-4 rounded-full bg-lime-300 blur-xl" />
            <div className="craftopia-pulse absolute left-16 bottom-16 h-2 w-2 rounded-full bg-green-300 blur-lg" />
            <div className="craftopia-pulse absolute right-16 bottom-20 h-3 w-3 rounded-full bg-emerald-400 blur-lg" />
          </div>
          <div className="relative z-10 space-y-3">
            <div className="text-5xl">📜</div>
            <h1 className="bg-gradient-to-b from-white to-green-400 bg-clip-text text-5xl font-black uppercase text-transparent drop-shadow-[0_8px_12px_rgba(0,0,0,0.4)] sm:text-7xl">
              Craftopia Rules
            </h1>
            <p className="mx-auto max-w-xl text-zinc-400">
              Nội quy chính thức của server Craftopia Survival
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-green-300 backdrop-blur-md transition hover:bg-white/10">
              ⚖️ Công bằng
            </div>
            <div className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-green-300 backdrop-blur-md transition hover:bg-white/10">
              🛡️ Thân thiện
            </div>
            <div className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-green-300 backdrop-blur-md transition hover:bg-white/10">
              🌟 An toàn
            </div>
          </div>
        </section>

        {/* Server Guide CTA — điểm nhấn chính, dễ chú ý */}
        <section className="mx-auto mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
          <a
            href="/guide"
            className="craftopia-cta-sheen group relative flex flex-col items-center gap-4 overflow-hidden rounded-[2rem] border border-emerald-400/40 bg-gradient-to-r from-emerald-500/15 via-emerald-500/5 to-lime-500/15 p-6 text-center shadow-[0_0_50px_rgba(34,197,94,0.18)] transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_0_70px_rgba(34,197,94,0.28)] sm:flex-row sm:justify-between sm:text-left sm:p-8"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/40 bg-black/40 text-3xl shadow-[0_0_20px_rgba(34,197,94,0.25)] sm:h-16 sm:w-16">
                ⚖️
              </div>
              <div>
                <div className="inline-flex rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-emerald-300">
                  MỚI · CHI TIẾT HƠN
                </div>
                <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">
                  Xem đầy đủ Server Guide
                </h2>
                <p className="mt-1 max-w-md text-sm text-zinc-300">
                  Mod được phép, hình phạt, kinh tế, gameplay, chat và FAQ — tất cả chi tiết ở một nơi.
                </p>
              </div>
            </div>

            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-bold text-black transition group-hover:scale-105 group-hover:bg-emerald-400">
              Mở Server Guide
              <span className="transition group-hover:translate-x-1">→</span>
            </span>
          </a>
        </section>

        <section className="mx-auto mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {rules.map((rule, idx) => (
              <div
                key={rule.title}
                className="craftopia-card-enter group relative rounded-[2rem] border border-white/10 bg-black/50 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(34,197,94,0.16)]"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center rounded-full border border-red-500/25 bg-red-500/10 px-2 py-0.5 text-xs font-bold text-red-300">
                    QUAN TRỌNG
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-2xl transition duration-300 group-hover:scale-110">
                    {rule.icon}
                  </div>
                  <h2 className="text-xl font-bold text-green-300">{rule.title}</h2>
                </div>
                <p className="mt-4 text-zinc-300">{rule.content}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-emerald-500/20 bg-black/40 p-6 text-center backdrop-blur-md sm:p-8">
            <h3 className="text-2xl font-black text-green-300">Craftopia Survival</h3>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Hãy tuân thủ các quy tắc để duy trì cộng đồng chơi lành mạnh và công bằng. Cần biết chi tiết
              hơn về mod, kinh tế hay hình phạt? Xem{' '}
              <a href="/server-guide" className="font-semibold text-emerald-400 underline underline-offset-4 hover:text-emerald-300">
                Server Guide
              </a>
              .
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://discord.gg/maY22mamA"
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-full bg-emerald-500 px-8 py-3 font-bold text-black transition hover:bg-emerald-400 focus:ring-4 focus:ring-emerald-300"
              >
                💬 Tham gia Discord
              </a>
              <a
                href="/guide"
                className="inline-block rounded-full border border-emerald-400/50 bg-emerald-500/10 px-8 py-3 font-bold text-emerald-300 transition hover:-translate-y-0.5 hover:bg-emerald-500/15"
              >
                ⚖️ Server Guide
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
