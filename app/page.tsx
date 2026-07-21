"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [guideTab, setGuideTab] = useState<"java" | "bedrock">("java");
  const [server, setServer] = useState({
    online: false,
    players: 0,
    max: 0,
    version: "",
  });

  const [copied, setCopied] = useState(false);

  const copyIP = async () => {
    try {
      await navigator.clipboard.writeText("node1.zencheap.net:30263");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
      alert("Không thể sao chép IP.");
    }
  };

  useEffect(() => {
    async function loadServer() {
      try {
        const res = await fetch("/api/server");
        const data = await res.json();
        setServer(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadServer();
    const interval = setInterval(loadServer, 30000);
    return () => clearInterval(interval);
  }, []);

  // Khoá scroll nền khi menu mobile mở
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const features = [
    {
      icon: "🛡️",
      title: "Chống Grief tuyệt đối",
      desc: "Hệ thống Claim giúp bảo vệ đất đai — không ai phá được block trong khu vực của bạn.",
      color: "emerald",
    },
    {
      icon: "⚔️",
      title: "Skills nâng cấp nhân vật",
      desc: "Đào, chặt cây, chiến đấu, câu cá — mọi hành động đều tích lũy kỹ năng và mở khóa buff.",
      color: "cyan",
    },
    {
      icon: "💰",
      title: "Kinh tế do người chơi dẫn dắt",
      desc: "Mua bán tự do qua Auction House, kiếm tiền từ farm, câu cá, và leo bảng xếp hạng Baltop.",
      color: "amber",
    },
    {
      icon: "🎁",
      title: "Thưởng & sự kiện đều đặn",
      desc: "Đăng nhập mỗi ngày để nhận quà, cùng các sự kiện cộng đồng thường xuyên.",
      color: "fuchsia",
    },
  ] as const;

  const featureBorder: Record<(typeof features)[number]["color"], string> = {
    emerald: "border-emerald-500/15 hover:border-emerald-400/40",
    cyan: "border-cyan-500/15 hover:border-cyan-400/40",
    amber: "border-amber-500/15 hover:border-amber-400/40",
    fuchsia: "border-fuchsia-500/15 hover:border-fuchsia-400/40",
  };

  const featureText: Record<(typeof features)[number]["color"], string> = {
    emerald: "text-emerald-300",
    cyan: "text-cyan-300",
    amber: "text-amber-300",
    fuchsia: "text-fuchsia-300",
  };

  const navLinks = [
    ["🏠", "Trang chủ", "/"],
    ["💎", "Donate", "/donate"],
    ["📜", "Rules", "/rules"],
    ["🚫", "Danh sách cấm", "http://node1.zencheap.net:30275/", true],
  ] as const;

  return (
    <main className="relative min-h-screen text-white">
      <style>{`
        @keyframes craftopia-fade-up {
          from { opacity: 0; transform: translateY(16px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes craftopia-menu-in {
          from { opacity: 0; transform: translateY(-12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes craftopia-overlay-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .craftopia-fade-up {
          animation: craftopia-fade-up 0.7s ease-out both;
        }
        .craftopia-menu-in {
          animation: craftopia-menu-in 0.22s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .craftopia-overlay-in {
          animation: craftopia-overlay-in 0.2s ease-out both;
        }
      `}</style>

      <div
        className="fixed inset-0 -z-10 md:hidden bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,.55)), url('/images/background.jpg')",
        }}
      />
      <div
        className="fixed inset-0 -z-10 hidden md:block bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,.55)), url('/images/background-pc.jpg')",
        }}
      />

      <header className="sticky top-4 z-50 px-4 sm:top-5 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl rounded-3xl border border-emerald-500/15 bg-black/55 px-4 py-3.5 shadow-[0_0_40px_rgba(34,197,94,0.08)] backdrop-blur-xl sm:px-5 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <a href="/" className="shrink-0 text-xl font-black tracking-tight text-emerald-400 sm:text-2xl">
              Craftopia
            </a>

            <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-xl md:flex">
              
                href="/"
                className="rounded-full px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 lg:px-5"
              >
                🏠 Trang chủ
              </a>
              
                href="/donate"
                className="rounded-full px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 lg:px-5"
              >
                💎 Donate
              </a>
              
                href="/rules"
                className="rounded-full px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 lg:px-5"
              >
                📜 Rules
              </a>
              
                href="http://node1.zencheap.net:30275/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 lg:px-5"
              >
                🚫 Danh sách cấm
              </a>
            </nav>

            <div className="hidden items-center gap-2.5 md:flex">
              
                href="minecraft://?addExternalServer=Craftopia|node1.zencheap.net:30263"
                className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-bold text-black transition hover:scale-105 hover:bg-emerald-400 active:scale-95 lg:px-6 lg:py-3"
              >
                🎮 Vào Server
              </a>
              
                href="https://discord.gg/maY22mamA"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg transition hover:scale-105 hover:bg-white/10 active:scale-95 lg:h-12 lg:w-12 lg:text-xl"
              >
                💬
              </a>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition active:scale-90 md:hidden"
              aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={menuOpen}
            >
              <span className="relative flex h-4 w-5 flex-col justify-between">
                <span
                  className={`h-0.5 w-full rounded-full bg-white transition-all duration-300 ${
                    menuOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full rounded-full bg-white transition-all duration-300 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`h-0.5 w-full rounded-full bg-white transition-all duration-300 ${
                    menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>

          {/* Menu sổ xuống mobile */}
          {menuOpen && (
            <div
              className="craftopia-menu-in absolute inset-x-3 top-[calc(100%+10px)] z-50 overflow-hidden rounded-[28px] border border-white/10 bg-black/90 shadow-[0_24px_70px_rgba(0,0,0,0.6)] backdrop-blur-2xl md:hidden"
              style={{ transformOrigin: "top center" }}
            >
              <div className="p-2.5">
                {navLinks.map(([icon, label, href, external]) => (
                  
                    key={href}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[15px] font-medium text-zinc-200 transition active:bg-white/10"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-lg">
                      {icon}
                    </span>
                    <span className="flex-1">{label}</span>
                    <span className="text-zinc-600">›</span>
                  </a>
                ))}
              </div>

              <div className="mx-4 border-t border-white/10" />

              <div className="flex items-center gap-3 p-4">
                
                  href="https://discord.gg/maY22mamA"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl transition active:scale-90 active:bg-white/10"
                  aria-label="Discord"
                >
                  💬
                </a>
                
                  href="minecraft://?addExternalServer=Craftopia|node1.zencheap.net:30263"
                  onClick={() => setMenuOpen(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 text-center font-bold text-black transition active:scale-[0.98] active:bg-emerald-400"
                >
                  🎮 Vào Server
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Lớp phủ tối phía sau menu, bấm ra ngoài để đóng */}
        {menuOpen && (
          <div
            className="craftopia-overlay-in fixed inset-0 -z-10 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </header>

      <section className="mx-auto flex max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
        <div className="craftopia-fade-up flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-emerald-500/35 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 backdrop-blur-md">
            🟢 Java & Bedrock
          </span>
          {server.version && (
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur-md">
              📦 {server.version}
            </span>
          )}
        </div>

        <h2 className="craftopia-fade-up mt-7 text-4xl font-black leading-[1.1] sm:mt-8 sm:text-6xl" style={{ animationDelay: "80ms" }}>
          Craftopia Survival
        </h2>

        <p className="craftopia-fade-up mt-5 max-w-2xl text-base text-zinc-300 sm:mt-6 sm:text-lg" style={{ animationDelay: "140ms" }}>
          Máy chủ Minecraft Survival với Claim, Skills, Crate, Kinh tế, Xây dựng và nhiều tính năng hấp dẫn khác.
        </p>

        <div className="craftopia-fade-up mt-10 w-full sm:mt-12" style={{ animationDelay: "200ms" }}>
          <div className="mx-auto flex max-w-3xl items-center rounded-full border border-white/10 bg-black/55 px-2.5 py-2.5 shadow-2xl backdrop-blur-xl sm:px-3 sm:py-3">
            <div className="flex shrink-0 items-center gap-2 px-2.5 sm:px-5">
              <span
                className={`h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3 ${
                  server.online ? "bg-emerald-400 animate-pulse" : "bg-red-500"
                }`}
              />
              <span className="text-lg font-black sm:text-3xl">{server.players}</span>
              <span className="hidden text-sm text-zinc-400 sm:block">đang chơi</span>
            </div>

            <div className="hidden h-8 w-px bg-white/10 sm:block" />

            <div className="min-w-0 flex-1 px-2 text-center sm:px-3">
              <p className="truncate text-xs font-bold sm:text-2xl">
                node1.zencheap.net
              </p>
              <p className="hidden text-xs text-zinc-500 sm:block">Port: 30263</p>
            </div>

            <button
              onClick={copyIP}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 active:scale-90 sm:h-12 sm:w-12"
              aria-label="Sao chép địa chỉ IP"
            >
              {copied ? "✅" : "📋"}
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-4 max-w-4xl px-4 sm:mt-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-emerald-500/12 bg-black/50 p-4 shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6">
          <h2 className="mb-5 text-center text-xl font-bold sm:text-2xl">📖 Hướng dẫn tham gia</h2>

          <div className="mb-5 flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
            <button
              onClick={() => setGuideTab("java")}
              className={`flex-1 rounded-full py-2.5 text-sm font-bold transition-all duration-300 sm:py-3 sm:text-base ${
                guideTab === "java"
                  ? "bg-emerald-500 text-black shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              🖥 Java
            </button>

            <button
              onClick={() => setGuideTab("bedrock")}
              className={`flex-1 rounded-full py-2.5 text-sm font-bold transition-all duration-300 sm:py-3 sm:text-base ${
                guideTab === "bedrock"
                  ? "bg-emerald-500 text-black shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              📱 Bedrock
            </button>
          </div>

          <video
            key={guideTab}
            controls
            autoPlay
            muted
            playsInline
            preload="auto"
            className="w-full rounded-2xl border border-white/10 bg-black"
          >
            <source src={guideTab === "java" ? "/videos/java.mp4" : "/videos/bedrock.mp4"} type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <h2 className="text-3xl font-black sm:text-5xl">✨ Khám phá</h2>
        </div>

        <div className="grid items-stretch gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          
            href="/events"
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-orange-500/20 bg-black/55 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-orange-400/40 hover:bg-white/5 sm:p-6"
          >
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.10),transparent_55%)] opacity-80" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-orange-300 sm:text-xl">🎉 Events</h3>
              <p className="mt-2.5 text-sm text-zinc-300 sm:mt-3">
                Theo dõi các sự kiện mới nhất, phần thưởng và hoạt động đang diễn ra tại Craftopia.
              </p>
            </div>
            <div className="relative z-10 mt-5 flex items-center justify-between
