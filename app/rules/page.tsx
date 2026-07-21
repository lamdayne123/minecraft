import { FC } from 'react';

const rules = [
  { icon: '🤝', title: 'Tôn trọng nhau', content: 'Không xúc phạm, gây war, spam chat hoặc làm phiền người khác.' },
  { icon: '🚫', title: 'Không gian lận', content: 'Không sử dụng hack, cheat, duping hoặc bất kỳ công cụ gian lận nào.' },
  { icon: '⚒️', title: 'Không phá hoại', content: 'Không grief hoặc phá hoại công trình người khác.' },
  { icon: '📢', title: 'Không quảng cáo', content: 'Không quảng bá server khác, link hay nội dung không liên quan.' },
  { icon: '👮', title: 'Tuân thủ Staff', content: 'Lắng nghe hướng dẫn của Admin, Mod và Helper khi chơi.' },
  { icon: '⚠️', title: 'Bảo vệ Server', content: 'Mọi hành vi gây hại cho server đều bị nghiêm cấm (ban vĩnh viễn).' }
];

export default function RulesPage() {
  return (
    <main
      className="min-h-screen text-white"
      style={{
        backgroundImage:
          'radial-gradient(circle at top, rgba(34,197,94,0.15), transparent 35%), ' +
          'radial-gradient(circle at 80% 10%, rgba(132,204,22,0.10), transparent 25%), ' +
          'linear-gradient(to bottom, #050505, #080808, #020202)'
      }}
    >
      <section className="relative mt-8 px-4 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-8 top-10 h-3 w-3 rounded-full bg-emerald-300 blur-lg opacity-40"></div>
          <div className="absolute right-10 top-16 h-4 w-4 rounded-full bg-lime-300 blur-xl opacity-30"></div>
          <div className="absolute left-16 bottom-16 h-2 w-2 rounded-full bg-green-300 blur-lg opacity-50"></div>
          <div className="absolute right-16 bottom-20 h-3 w-3 rounded-full bg-emerald-400 blur-lg opacity-40"></div>
        </div>
        <div className="relative z-10 space-y-3">
          <div className="text-5xl">📜</div>
          <h1 className="text-5xl font-black uppercase sm:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-green-400 drop-shadow-[0_8px_12px_rgba(0,0,0,0.4)]">
            Craftopia Rules
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Nội quy chính thức của server Craftopia Survival
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-green-300 backdrop-blur-md hover:bg-white/10 transition">
            ⚖️ Công bằng
          </div>
          <div className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-green-300 backdrop-blur-md hover:bg-white/10 transition">
            🛡️ Thân thiện
          </div>
          <div className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-green-300 backdrop-blur-md hover:bg-white/10 transition">
            🌟 An toàn
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className="relative group rounded-[2rem] border border-white/10 bg-black/50 p-6 backdrop-blur-md transition hover:scale-105 hover:border-emerald-400"
            >
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-bold text-red-300 border-red-500/25 bg-red-500/10">
                  QUAN TRỌNG
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 text-2xl">{rule.icon}</div>
                <h2 className="text-xl font-bold text-green-300">
                  {rule.title}
                </h2>
              </div>
              <p className="mt-4 text-zinc-300">{rule.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-emerald-500/20 bg-black/40 p-6 text-center backdrop-blur-md">
          <h3 className="text-2xl font-black text-green-300">Craftopia Survival</h3>
          <p className="mt-4 text-zinc-400">
            Hãy tuân thủ các quy tắc để duy trì cộng đồng chơi lành mạnh và công bằng.
          </p>
          <a
            href="https://discord.gg/maY22mamA"
            className="mt-6 inline-block rounded-full bg-emerald-500 px-8 py-3 font-bold text-black transition hover:bg-emerald-400 focus:ring-4 focus:ring-emerald-300"
          >
            💬 Tham gia Discord
          </a>
        </div>
      </section>
    </main>
  );
}
