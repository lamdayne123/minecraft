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
      await navigator.clipboard.writeText("craftopia.zencheap.net:30263");
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

  return (
    <main className="relative min-h-screen text-white">
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

      <header className="sticky top-5 z-50 px-4">
        <div className="mx-auto max-w-7xl rounded-3xl border border-emerald-500/15 bg-black/55 px-5 py-4 shadow-[0_0_40px_rgba(34,197,94,0.08)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-black text-emerald-400">
              Craftopia
            </a>

            <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-2 backdrop-blur-xl md:flex">
              <a
                href="/"
                className="rounded-full px-5 py-2 text-zinc-300 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
              >
                🏠 Trang chủ
              </a>
              <a
                href="/donate"
                className="rounded-full px-5 py-2 text-zinc-300 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
              >
                💎 Donate
              </a>
              <a
                href="/rules"
                className="rounded-full px-5 py-2 text-zinc-300 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
              >
                📜 Rules
              </a>
              <a
                href="http://node1.zencheap.net:30275/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-5 py-2 text-zinc-300 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
              >
                🚫 Danh sách cấm
              </a>
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <a
                href="minecraft://?addExternalServer=Craftopia|craftopia.zencheap.net:30263"
                className="rounded-full bg-emerald-500 px-6 py-3 font-bold text-black transition hover:scale-105 hover:bg-emerald-400 active:scale-95"
              >
                🎮 Vào Server
              </a>
              <a
                href="https://discord.gg/maY22mamA"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl transition hover:scale-105 hover:bg-white/10 active:scale-95"
              >
                💬
              </a>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-xl border border-zinc-700 bg-black/30 px-3 py-2 text-xl md:hidden"
              aria-label="Mở menu"
            >
              ☰
            </button>
          </div>

          {menuOpen && (
            <div className="absolute right-0 top-[90px] w-[320px] rounded-[32px] border border-white/10 bg-black/80 p-6 shadow-[0_20px_80px_rgba(0,0,0,.55)] backdrop-blur-3xl md:hidden">
              <div className="space-y-1">
                <a
                  href="/"
                  className="block rounded-xl px-4 py-3 text-lg text-zinc-300 transition hover:bg-white/5 hover:text-white"
                >
                  🏠 Trang chủ
                </a>
                <a
                  href="/donate"
                  className="block rounded-xl px-4 py-3 text-lg text-zinc-300 transition hover:bg-white/5 hover:text-white"
                >
                  💎 Donate
                </a>
                <a
                  href="/rules"
                  className="block rounded-xl px-4 py-3 text-lg text-zinc-300 transition hover:bg-white/5 hover:text-white"
                >
                  📜 Rules
                </a>
                <a
                  href="http://node1.zencheap.net:30275/"
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl px-4 py-3 text-lg text-zinc-300 transition hover:bg-white/5 hover:text-white"
                >
                  🚫 Danh sách cấm
                </a>
              </div>

              <div className="my-5 border-t border-white/10" />

              <div className="flex items-center gap-3">
                <a
                  href="https://discord.gg/maY22mamA"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl transition hover:bg-white/10"
                >
                  💬
                </a>
                <a
                  href="minecraft://?addExternalServer=Craftopia|craftopia.zencheap.net:30263"
                  className="flex-1 rounded-full bg-emerald-500 py-4 text-center font-bold text-black transition hover:bg-emerald-400"
                >
                  🎮 Vào Server
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-emerald-500/35 bg-emerald-500/10 px-4 py-2 text-emerald-300 backdrop-blur-md">
            🟢 Java & Bedrock
          </span>
          {server.version && (
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur-md">
              📦 {server.version}
            </span>
          )}
        </div>

        <h2 className="mt-8 text-4xl font-black sm:text-6xl">Craftopia Survival</h2>

        <p className="mt-6 max-w-2xl text-lg text-zinc-300">
          Máy chủ Minecraft Survival với Claim, Skills, Crate, Kinh tế, Xây dựng và nhiều tính năng hấp dẫn khác.
        </p>

        <div className="mt-12 w-full px-3">
          <div className="mx-auto flex max-w-3xl items-center rounded-full border border-white/10 bg-black/55 px-3 py-3 shadow-2xl backdrop-blur-xl">
            <div className="flex shrink-0 items-center gap-2 px-2 sm:px-5">
              <span
                className={`h-3 w-3 rounded-full ${
                  server.online ? "bg-emerald-400 animate-pulse" : "bg-red-500"
                }`}
              />
              <span className="text-xl font-black sm:text-3xl">{server.players}</span>
              <span className="hidden text-sm text-zinc-400 sm:block">đang chơi</span>
            </div>

            <div className="hidden h-8 w-px bg-white/10 sm:block" />

            <div className="min-w-0 flex-1 px-3 text-center">
              <p className="truncate text-sm font-bold sm:text-2xl">
                craftopia.zencheap.net
              </p>
              <p className="hidden text-xs text-zinc-500 sm:block">Port: 30263</p>
            </div>

            <button
              onClick={copyIP}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 active:scale-90 sm:h-12 sm:w-12"
              aria-label="Sao chép địa chỉ IP"
            >
              {copied ? "✅" : "📋"}
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-4xl px-6">
        <div className="rounded-[2rem] border border-emerald-500/12 bg-black/50 p-6 shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <h2 className="mb-5 text-center text-2xl font-bold">📖 Hướng dẫn tham gia</h2>

          <div className="mb-5 flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
            <button
              onClick={() => setGuideTab("java")}
              className={`flex-1 rounded-full py-3 font-bold transition-all duration-300 ${
                guideTab === "java"
                  ? "bg-emerald-500 text-black shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              🖥 Java
            </button>

            <button
              onClick={() => setGuideTab("bedrock")}
              className={`flex-1 rounded-full py-3 font-bold transition-all duration-300 ${
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

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-black">✨ Khám phá</h2>
        </div>

        <div className="grid items-stretch gap-6 md:grid-cols-3">
          <a
            href="/events"
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-orange-500/20 bg-black/55 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-orange-400/40 hover:bg-white/5"
          >
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.10),transparent_55%)] opacity-80" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-orange-300">🎉 Events</h3>
              <p className="mt-3 text-sm text-zinc-300">
                Theo dõi các sự kiện mới nhất, phần thưởng và hoạt động đang diễn ra tại Craftopia.
              </p>
            </div>
            <div className="relative z-10 mt-6 flex items-center justify-between">
              <span className="font-semibold text-orange-300">Xem Events →</span>
              <span className="text-3xl transition group-hover:scale-110">🎁</span>
            </div>
          </a>

          <a
            href="/faq"
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-purple-500/20 bg-black/55 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-400/40 hover:bg-white/5"
          >
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.10),transparent_55%)] opacity-80" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-purple-300">📚 FAQ</h3>
              <p className="mt-3 text-sm text-zinc-300">
                Hướng dẫn các hệ thống, lệnh và tính năng của máy chủ.
              </p>
            </div>
            <div className="relative z-10 mt-6 flex items-center justify-between">
              <span className="font-semibold text-purple-300">Mở FAQ →</span>
              <span className="text-3xl transition group-hover:scale-110">📖</span>
            </div>
          </a>

          <a
            href="/rules"
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-sky-500/20 bg-black/55 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-sky-400/40 hover:bg-white/5"
          >
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.10),transparent_55%)] opacity-80" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-sky-300">📜 Rules</h3>
              <p className="mt-3 text-sm text-zinc-300">
                Đọc nội quy chính thức của máy chủ trước khi tham gia chơi.
              </p>
            </div>
            <div className="relative z-10 mt-6 flex items-center justify-between">
              <span className="font-semibold text-sky-300">Xem Rules →</span>
              <span className="text-3xl transition group-hover:scale-110">⚖️</span>
            </div>
          </a>

          <a
            href="/gallery"
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-emerald-500/25 bg-emerald-500/8 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300/60 hover:bg-emerald-500/12"
          >
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.14),transparent_55%)] opacity-90" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-emerald-300">🖼 Gallery</h3>
              <p className="mt-3 text-sm text-zinc-200">
                Xem những khoảnh khắc đẹp nhất của Craftopia Survival.
              </p>
            </div>
            <div className="relative z-10 mt-6 flex items-center justify-between">
              <span className="font-semibold text-emerald-300">Mở Gallery →</span>
              <span className="text-3xl transition group-hover:scale-110">✨</span>
            </div>
          </a>

          <a
            href="/news"
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-red-500/20 bg-black/55 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-red-400/40 hover:bg-white/5"
          >
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.10),transparent_55%)] opacity-80" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-red-300">📰 Tin tức</h3>
              <p className="mt-3 text-sm text-zinc-300">
                Xem các thông báo và cập nhật mới nhất của máy chủ.
              </p>
            </div>
            <div className="relative z-10 mt-6 flex items-center justify-between">
              <span className="font-semibold text-red-300">Xem Tin tức →</span>
              <span className="text-3xl transition group-hover:scale-110">📢</span>
            </div>
          </a>

          <a
            href="/baltop"
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-yellow-500/20 bg-black/55 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400/40 hover:bg-white/5"
          >
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.10),transparent_55%)] opacity-80" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-yellow-300">💰 Kinh tế</h3>
              <p className="mt-3 text-sm text-zinc-300">
                Xem bảng xếp hạng Baltop và nền kinh tế của máy chủ.
              </p>
            </div>
            <div className="relative z-10 mt-6 flex items-center justify-between">
              <span className="font-semibold text-yellow-300">Xem Baltop →</span>
              <span className="text-3xl transition group-hover:scale-110">🏆</span>
            </div>
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <h2 className="text-5xl font-black">⚡ Tính năng nổi bật</h2>
          <p className="max-w-xl text-zinc-400">
            Những gì khiến Craftopia Survival trở nên đáng chơi.
          </p>
          <span className="mt-1 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-4 py-1.5 text-sm text-emerald-300">
            <span
              className={`h-2 w-2 rounded-full ${
                server.online ? "bg-emerald-400 animate-pulse" : "bg-red-500"
              }`}
            />
            {server.online
              ? `${server.players} người đang chơi ngay bây giờ`
              : "Server hiện đang offline"}
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className={`rounded-[2rem] border bg-black/55 p-8 text-center shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${featureBorder[f.color]}`}
            >
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 text-4xl">
                {f.icon}
              </div>
              <h3 className={`mt-2 text-xl font-bold ${featureText[f.color]}`}>
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
