"use client";

import { useMemo, useState } from "react";

type ThemeName =
  | "emerald"
  | "amber"
  | "violet"
  | "cyan"
  | "lime"
  | "indigo";

type RuleSection = {
  icon: string;
  title: string;
  color: ThemeName;
  desc: string;
  allowed: string[];
  forbidden: string[];
  punishment: string;
};

type FaqEntry = {
  q: string;
  a: string;
};

const sections: readonly RuleSection[] = [
  {
    icon: "🧩",
    title: "Mod/Resource Pack",
    color: "emerald",
    desc: "Danh sách mod và công cụ hỗ trợ được phép hoặc bị cấm sử dụng trên server.",
    allowed: [
      "OptiFine",
      "Sodium",
      "Iris",
      "Resource Pack",
      "Shader",
      "Replay Mod",
      "Xaero's Minimap (không Cave Mode)",
      "Inventory HUD",
    ],
    forbidden: [
      "X-Ray",
      "ESP",
      "Block ESP",
      "Kill Aura",
      "Reach",
      "Fly",
      "Freecam (admin cho phép mới được dùng)",
      "Baritone",
      "Nuker",
      "Auto Click",
      "Auto Mine",
      "Chest ESP",
    ],
    punishment:
      "Ban theo mức độ vi phạm. Có thể bị thu hồi vật phẩm hoặc reset Economy nếu gây ảnh hưởng nghiêm trọng.",
  },
  {
    icon: "💰",
    title: "Kinh Tế",
    color: "amber",
    desc: "Quy định về giao dịch, mua bán và các hoạt động kinh tế trong server.",
    allowed: ["Trade", "Auction", "Shop"],
    forbidden: [
      "Scam",
      "Duplication",
      "Block ESP kiếm tiền",
      "Farm tiền trái phép",
    ],
    punishment:
      "Ban vĩnh viễn với hành vi Scam hoặc Duplication. Toàn bộ tài sản liên quan có thể bị thu hồi hoặc reset.",
  },
  {
    icon: "⚔️",
    title: "Gameplay",
    color: "violet",
    desc: "Những hoạt động chơi game thông thường và các hành vi gây ảnh hưởng tới server.",
    allowed: ["AFK", "Farm", "Xây dựng", "Khám phá"],
    forbidden: ["Lag Machine", "TNT Lag", "Exploit", "Grief"],
    punishment:
      "Cảnh cáo lần đầu, ban theo thời gian nếu tái phạm hoặc gây lag nghiêm trọng cho server.",
  },
  {
    icon: "💬",
    title: "Chat",
    color: "cyan",
    desc: "Quy tắc giao tiếp trong kênh chat của server.",
    allowed: ["Trao đổi", "Hỏi đáp", "Hỗ trợ"],
    forbidden: ["Spam", "Quảng cáo", "Toxic", "Nội dung phản cảm"],
    punishment: "Mute theo thời gian, ban nếu vi phạm nhiều lần hoặc nội dung nghiêm trọng.",
  },
  {
    icon: "🐞",
    title: "Bug",
    color: "lime",
    desc: "Cách xử lý khi phát hiện lỗi trong quá trình chơi.",
    allowed: ["Báo Bug cho Staff"],
    forbidden: ["Lợi dụng Bug để trục lợi"],
    punishment: "Ban và thu hồi toàn bộ lợi ích thu được từ việc lợi dụng Bug.",
  },
  {
    icon: "👤",
    title: "Account",
    color: "indigo",
    desc: "Quy định về việc sử dụng tài khoản trên server.",
    allowed: ["Một tài khoản"],
    forbidden: [
      "Tạo nhiều tài khoản để lợi dụng",
      "Chia sẻ tài khoản nhằm phá luật",
    ],
    punishment: "Ban toàn bộ tài khoản liên quan nếu phát hiện lợi dụng đa tài khoản.",
  },
];

const faqEntries: readonly FaqEntry[] = [
  {
    q: "Replay Mod có được phép không?",
    a: "Có. Replay Mod được phép sử dụng để quay lại và dựng video trong server.",
  },
  {
    q: "Shader có được phép không?",
    a: "Có. Bạn có thể dùng Shader (kèm Iris hoặc OptiFine) miễn không thay đổi tầm nhìn để gây lợi thế.",
  },
  {
    q: "Lunar Client có được phép không?",
    a: "Lunar Client chỉ được dùng khi tắt toàn bộ tính năng ESP, HUD gian lận và Reach. Nếu không chắc, hãy hỏi Staff qua Discord trước khi sử dụng.",
  },
  {
    q: "Macro có được phép không?",
    a: "Không. Macro bị xem như Auto Click hoặc Auto Mine và nằm trong danh sách bị cấm.",
  },
  {
    q: "Minimap có được phép không?",
    a: "Có, với Xaero's Minimap, nhưng bắt buộc phải tắt Cave Mode để tránh lộ hang động và công trình ngầm.",
  },
];

function themeClasses(theme: ThemeName) {
  const map: Record<
    ThemeName,
    {
      border: string;
      text: string;
      glow: string;
      soft: string;
      badge: string;
      dot: string;
    }
  > = {
    emerald: {
      border: "border-emerald-500/25",
      text: "text-emerald-300",
      glow: "shadow-[0_0_40px_rgba(34,197,94,0.14)]",
      soft: "bg-emerald-500/8",
      badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
      dot: "bg-emerald-400",
    },
    amber: {
      border: "border-amber-500/25",
      text: "text-amber-300",
      glow: "shadow-[0_0_40px_rgba(245,158,11,0.14)]",
      soft: "bg-amber-500/8",
      badge: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      dot: "bg-amber-400",
    },
    violet: {
      border: "border-violet-500/25",
      text: "text-violet-300",
      glow: "shadow-[0_0_40px_rgba(168,85,247,0.14)]",
      soft: "bg-violet-500/8",
      badge: "bg-violet-500/10 text-violet-300 border-violet-500/20",
      dot: "bg-violet-400",
    },
    cyan: {
      border: "border-cyan-500/25",
      text: "text-cyan-300",
      glow: "shadow-[0_0_40px_rgba(34,211,238,0.14)]",
      soft: "bg-cyan-500/8",
      badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
      dot: "bg-cyan-400",
    },
    lime: {
      border: "border-lime-500/25",
      text: "text-lime-300",
      glow: "shadow-[0_0_40px_rgba(163,230,53,0.14)]",
      soft: "bg-lime-500/8",
      badge: "bg-lime-500/10 text-lime-300 border-lime-500/20",
      dot: "bg-lime-400",
    },
    indigo: {
      border: "border-indigo-500/25",
      text: "text-indigo-300",
      glow: "shadow-[0_0_40px_rgba(99,102,241,0.14)]",
      soft: "bg-indigo-500/8",
      badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
      dot: "bg-indigo-400",
    },
  };

  return map[theme];
}

function RuleCard({ section }: { section: RuleSection }) {
  const theme = themeClasses(section.color);

  return (
    <div
      className={`rounded-[2rem] border bg-black/50 p-5 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 sm:p-7 ${theme.border} ${theme.glow}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-3xl sm:h-16 sm:w-16 sm:text-4xl">
            {section.icon}
          </div>
          <div className="min-w-0">
            <div
              className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.18em] sm:text-xs ${theme.badge}`}
            >
              QUY ĐỊNH
            </div>
            <h3 className={`mt-3 text-xl font-black leading-tight sm:text-2xl ${theme.text}`}>
              {section.title}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300">
              {section.desc}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
            <span>🟢</span>
            <span>ĐƯỢC PHÉP</span>
          </div>
          <ul className="mt-3 space-y-2">
            {section.allowed.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm leading-relaxed text-zinc-100"
              >
                <span className="mt-0.5 text-emerald-400">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-red-300">
            <span>🔴</span>
            <span>BỊ CẤM</span>
          </div>
          <ul className="mt-3 space-y-2">
            {section.forbidden.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm leading-relaxed text-zinc-100"
              >
                <span className="mt-0.5 text-red-400">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-red-500/25 bg-red-500/8 p-4">
        <div className="flex items-center gap-2 text-sm font-bold text-red-300">
          <span>🚨</span>
          <span>HÌNH PHẠT</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-zinc-100">{section.punishment}</p>
      </div>
    </div>
  );
}

function FaqAccordion({ entries }: { entries: readonly FaqEntry[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {entries.map((entry, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={entry.q}
            className={`overflow-hidden rounded-2xl border transition duration-300 ${
              isOpen
                ? "border-emerald-500/30 bg-emerald-500/5"
                : "border-white/10 bg-white/5"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-semibold text-white">{entry.q}</span>
              <span
                className={`shrink-0 text-lg transition duration-300 ${
                  isOpen ? "rotate-45 text-emerald-400" : "text-zinc-400"
                }`}
              >
                +
              </span>
            </button>

            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-300">{entry.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ServerGuidePage() {
  const [activeFilter, setActiveFilter] = useState<string>("Tất cả");

  const filterOptions = useMemo(
    () => ["Tất cả", ...sections.map((s) => s.title)],
    []
  );

  const visibleSections = useMemo(() => {
    if (activeFilter === "Tất cả") return sections;
    return sections.filter((s) => s.title === activeFilter);
  }, [activeFilter]);

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

        @keyframes craftopia-pulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.04); }
        }

        .craftopia-card-enter {
          animation: craftopia-fade-up 0.6s ease-out both;
        }

        .craftopia-pulse {
          animation: craftopia-pulse 4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .craftopia-card-enter,
          .craftopia-pulse {
            animation: none !important;
          }
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
                  ["SERVER GUIDE", "/server-guide"],
                  ["TIN TỨC", "/news"],
                ].map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    className={`transition hover:text-emerald-400 ${
                      href === "/server-guide" ? "text-emerald-400" : ""
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

        <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-emerald-500/10 bg-black/55 px-4 py-12 shadow-2xl sm:px-8 sm:py-18">
          <div className="pointer-events-none absolute inset-0">
            <div className="craftopia-pulse absolute left-10 top-14 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(74,222,128,0.9)]" />
            <div className="craftopia-pulse absolute right-16 top-16 h-3 w-3 rounded-full bg-lime-400 shadow-[0_0_24px_rgba(163,230,53,0.9)]" />
            <div className="craftopia-pulse absolute left-24 top-1/2 h-2 w-2 rounded-full bg-green-300 shadow-[0_0_18px_rgba(134,239,172,0.9)]" />
            <div className="craftopia-pulse absolute right-24 top-2/3 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.10),transparent_42%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent)]" />
          </div>

          <div className="relative z-10 text-center">
            <div className="mb-3 text-4xl">⚖️</div>
            <h1 className="mx-auto max-w-4xl bg-[linear-gradient(180deg,#ffffff_10%,#f7f7f7_35%,#bafc6d_65%,#43ff4e_100%)] bg-clip-text text-4xl font-black tracking-[0.08em] text-transparent drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] sm:text-7xl">
              SERVER GUIDE
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium text-zinc-300 sm:text-lg">
              Hướng dẫn, quy định và chính sách chính thức của Craftopia Survival.
            </p>

            <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 rounded-[1.75rem] border border-white/10 bg-black/50 p-3 text-sm text-zinc-300 shadow-[0_0_32px_rgba(0,0,0,0.28)] backdrop-blur-md sm:grid-cols-4 sm:p-4">
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-3 text-emerald-300">
                <span>🟢</span>
                <span className="font-semibold">Allowed</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-3 text-red-300">
                <span>🔴</span>
                <span className="font-semibold">Forbidden</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-3 py-3 text-amber-300">
                <span>🟡</span>
                <span className="font-semibold">Warning</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-zinc-100">
                <span>⚖</span>
                <span className="font-semibold">Punishment</span>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
        </section>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-black/45 p-5 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-black text-white">Resource Pack chưa tự tải?</div>
              <div className="mt-1 text-sm text-zinc-400">
                Tải thủ công nếu Minecraft không tự động nhận Resource Pack của server (chỉ dùng khi không thấy icon rank hoặc số hiện số 0 đỏ trên scoreboard).
              </div>
            </div>
            <a
              href="https://github.com/lamdayne123/minecraft-web/raw/refs/heads/main/Gi%E1%BA%A3i%20n%C3%A9n%20file%20n%C3%A0y.zip"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-bold text-black transition hover:scale-[1.02] hover:bg-emerald-400"
            >
              <span>⬇</span>
              <span>Tải Resource Pack</span>
            </a>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => {
              const isActive = activeFilter === option;

              return (
                <button
                  key={option}
                  onClick={() => setActiveFilter(option)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 ${
                    isActive
                      ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-300 shadow-[0_0_18px_rgba(34,197,94,0.14)]"
                      : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/8"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          {visibleSections.map((section, index) => (
            <div
              key={section.title}
              className="craftopia-card-enter"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <RuleCard section={section} />
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-black/45 p-5 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
          <div className="mb-6">
            <div className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold tracking-[0.18em] text-emerald-300">
              FAQ
            </div>
            <h2 className="mt-4 text-2xl font-black sm:text-3xl">Câu hỏi thường gặp</h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Những thắc mắc phổ biến nhất về mod và công cụ hỗ trợ.
            </p>
          </div>

          <FaqAccordion entries={faqEntries} />
        </section>

        <section className="mt-10 rounded-[2rem] border border-emerald-500/15 bg-black/50 p-5 shadow-[0_0_40px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold tracking-[0.18em] text-emerald-300">
                VẪN CÒN THẮC MẮC?
              </div>
              <h3 className="mt-4 text-2xl font-black sm:text-3xl">Liên hệ Staff</h3>
              <p className="mt-3 max-w-2xl text-zinc-300">
                Nếu bạn chưa chắc chắn về một hành vi hoặc mod cụ thể có được phép hay không,
                hãy hỏi Staff trước khi sử dụng để tránh bị xử lý oan.
              </p>
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
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
