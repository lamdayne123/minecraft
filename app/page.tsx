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

  return (
    <main className="relative min-h-screen text-white">
      {/* Mobile */}
      <div
        className="fixed inset-0 -z-10 md:hidden bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,.55)), url('/images/background.jpg')",
        }}
      />

      {/* PC */}
      <div
        className="fixed inset-0 -z-10 hidden md:block bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,.55)), url('/images/background-pc.jpg')",
        }}
      />

      {/* Nội dung */}
      <header className="sticky top-5 z-50 px-4">
        <div className="mx-auto max-w-7xl rounded-3xl border border-zinc-800 bg-zinc-900/80 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-black text-green-400">
              Craftopia
            </a>

            <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/25 px-2 py-2 backdrop-blur-xl md:flex">
              <a
                href="/"
                className="rounded-full px-5 py-2 text-zinc-300 transition hover:bg-white/10 hover:text-white"
              >
                🏠 Trang chủ
              </a>

              <a
                href="/donate"
                className="rounded-full px-5 py-2 text-zinc-300 transition hover:bg-white/10 hover:text-white"
              >
                💎 Donate
              </a>

              <a
                href="/rules"
                className="rounded-full px-5 py-2 text-zinc-300 transition hover:bg-white/10 hover:text-white"
              >
                📜 Rules
              </a>

              <a
                href="http://node1.zencheap.net:30275/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-5 py-2 text-zinc-300 transition hover:bg-white/10 hover:text-white"
              >
                🚫 Danh sách cấm
              </a>
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <a
                href="minecraft://?addExternalServer=Craftopia|craftopia.zencheap.net:30263"
                className="
                  rounded-full
                  bg-green-500
                  px-6
                  py-3
                  font-bold
                  text-black
                  transition
                  hover:bg-green-400
                  hover:scale-105
                "
              >
                🎮 Vào Server
              </a>

              <a
                href="https://discord.gg/maY22mamA"
                target="_blank"
                rel="noreferrer"
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-zinc-900/70
                  text-xl
                  transition
                  hover:bg-zinc-800
                  hover:scale-105
                "
              >
                💬
              </a>
            </div>

            {/* Mobile button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-xl border border-zinc-700 px-3 py-2 text-xl md:hidden"
            >
              ☰
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div
              className="
                absolute
                right-0
                top-[90px]
                w-[320px]
                rounded-[32px]
                border border-white/10
                bg-zinc-950/90
                p-6
                shadow-[0_20px_80px_rgba(0,0,0,.55)]
                backdrop-blur-3xl
                md:hidden
                animate-in
                fade-in
                slide-in-from-top-2
              "
            >
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
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-zinc-900
                    text-2xl
                    transition
                    hover:bg-zinc-800
                  "
                >
                  💬
                </a>

                <a
                  href="minecraft://?addExternalServer=Craftopia|craftopia.zencheap.net:30263"
                  className="
                    flex-1
                    rounded-full
                    bg-green-500
                    py-4
                    text-center
                    font-bold
                    text-black
                    transition
                    hover:bg-green-400
                  "
                >
                  🎮 Vào Server
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
        <span className="rounded-full border border-green-500/40 bg-green-500/10 px-4 py-2 text-green-300">
          🟢 Java & Bedrock
        </span>

        <h2 className="mt-8 text-4xl font-black sm:text-6xl">
          Craftopia Survival
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          Máy chủ Minecraft Survival với Claim, Skills, Crate, Kinh tế, Xây dựng và nhiều
          tính năng hấp dẫn khác.
        </p>

        <div className="mt-12 w-full px-3">
          <div className="
            mx-auto
            flex
            max-w-3xl
            items-center
            rounded-full
            border
            border-zinc-700
            bg-zinc-900/80
            px-3
            py-3
            shadow-2xl
            backdrop-blur-xl
          ">
            <div className="
              flex
              shrink-0
              items-center
              gap-2
              px-2
              sm:px-5
            ">
              <span
                className={`h-3 w-3 rounded-full ${
                  server.online ? "bg-green-500 animate-pulse" : "bg-red-500"
                }`}
              />

              <span className="text-xl font-black sm:text-3xl">
                {server.players}
              </span>

              <span className="hidden text-sm text-zinc-400 sm:block">
                đang chơi
              </span>
            </div>

            <div className="hidden h-8 w-px bg-zinc-700 sm:block" />

            <div className="
              min-w-0
              flex-1
              px-3
              text-center
            ">
              <p className="truncate text-sm font-bold sm:text-2xl">
                craftopia.zencheap.net
              </p>

              <p className="hidden text-xs text-zinc-500 sm:block">
                Port: 30263
              </p>
            </div>

            <button
              onClick={copyIP}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-zinc-700
                transition
                hover:bg-zinc-800
                active:scale-90
                sm:h-12
                sm:w-12
              "
            >
              {copied ? "✅" : "📋"}
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-4xl px-6">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
          <h2 className="mb-5 text-center text-2xl font-bold">
            📖 Hướng dẫn tham gia
          </h2>

          <div className="mb-5 flex rounded-full bg-zinc-900 p-1">
            <button
              onClick={() => setGuideTab("java")}
              className={`flex-1 rounded-full py-3 font-bold transition-all duration-300 ${
                guideTab === "java"
                  ? "bg-green-500 text-black shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              🖥 Java
            </button>

            <button
              onClick={() => setGuideTab("bedrock")}
              className={`flex-1 rounded-full py-3 font-bold transition-all duration-300 ${
                guideTab === "bedrock"
                  ? "bg-green-500 text-black shadow-lg"
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
            <source
              src={guideTab === "java" ? "/videos/java.mp4" : "/videos/bedrock.mp4"}
              type="video/mp4"
            />
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
            className="group flex h-full flex-col justify-between rounded-2xl border border-orange-500/40 bg-black/50 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-orange-400/60 hover:bg-black/60"
          >
            <h3 className="text-xl font-bold text-orange-400">🎉 Events</h3>
            <p className="mt-3 text-sm text-zinc-400">
              Theo dõi các sự kiện mới nhất, phần thưởng và hoạt động đang diễn ra tại
              Craftopia.
            </p>
            <div className="mt-6 flex items-center justify-between">
              <span className="font-semibold text-orange-400">Xem Events →</span>
              <span className="text-3xl transition group-hover:scale-110">🎁</span>
            </div>
          </a>

          <a
            href="/faq"
            className="group flex h-full flex-col justify-between rounded-2xl border border-purple-500/40 bg-black/50 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-400/60 hover:bg-black/60"
          >
            <h3 className="text-xl font-bold text-purple-400">📚 FAQ</h3>
            <p className="mt-3 text-sm text-zinc-400">
              Hướng dẫn các hệ thống, lệnh và tính năng của máy chủ.
            </p>
            <div className="mt-6 flex items-center justify-between">
              <span className="font-semibold text-purple-400">Mở FAQ →</span>
              <span className="text-3xl transition group-hover:scale-110">📖</span>
            </div>
          </a>

          <a
            href="/rules"
            className="group flex h-full flex-col justify-between rounded-2xl border border-sky-500/40 bg-black/50 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-sky-400/60 hover:bg-black/60"
          >
            <h3 className="text-xl font-bold text-sky-400">📜 Rules</h3>
            <p className="mt-3 text-sm text-zinc-400">
              Đọc nội quy chính thức của máy chủ trước khi tham gia chơi.
            </p>
            <div className="mt-6 flex items-center justify-between">
              <span className="font-semibold text-sky-400">Xem Rules →</span>
              <span className="text-3xl transition group-hover:scale-110">⚖️</span>
            </div>
          </a>

          {/* Gallery */}
          <a
            href="/gallery"
            className="group flex h-full flex-col justify-between rounded-2xl border border-emerald-500/45 bg-emerald-500/8 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300/70 hover:bg-emerald-500/12"
          >
            <div>
              <h3 className="text-xl font-bold text-emerald-300">🖼 Gallery</h3>
              <p className="mt-3 text-sm text-zinc-300">
                Xem những khoảnh khắc đẹp nhất của Craftopia Survival.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="font-semibold text-emerald-300">Mở Gallery →</span>
              <span className="text-3xl transition group-hover:scale-110">✨</span>
            </div>
          </a>

          <a
            href="/news"
            className="group flex h-full flex-col justify-between rounded-2xl border border-red-500/40 bg-black/50 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-red-400/60 hover:bg-black/60"
          >
            <h3 className="text-xl font-bold text-red-400">📰 Tin tức</h3>
            <p className="mt-3 text-sm text-zinc-400">
              Xem các thông báo và cập nhật mới nhất của máy chủ.
            </p>
            <div className="mt-6 flex items-center justify-between">
              <span className="font-semibold text-red-400">Xem Tin tức →</span>
              <span className="text-3xl transition group-hover:scale-110">📢</span>
            </div>
          </a>

          <a
            href="/baltop"
            className="group flex h-full flex-col justify-between rounded-2xl border border-yellow-500/40 bg-black/50 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400/60 hover:bg-black/60"
          >
            <h3 className="text-xl font-bold text-yellow-400">💰 Kinh tế</h3>
            <p className="mt-3 text-sm text-zinc-400">
              Xem bảng xếp hạng Baltop và nền kinh tế của máy chủ.
            </p>
            <div className="mt-6 flex items-center justify-between">
              <span className="font-semibold text-green-400">Xem Baltop →</span>
              <span className="text-3xl transition group-hover:scale-110">🏆</span>
            </div>
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-black">📊 Trạng thái Server</h2>
          <p className="mt-3 text-zinc-400">
            Theo dõi trạng thái máy chủ theo thời gian thực.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center transition hover:-translate-y-1 hover:border-green-500">
            <div className="text-5xl">{server.online ? "🟢" : "🔴"}</div>
            <h3 className="mt-5 text-2xl font-bold">
              {server.online ? "Online" : "Offline"}
            </h3>
            <p className="mt-2 text-zinc-400">Trạng thái</p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center transition hover:-translate-y-1 hover:border-cyan-500">
            <div className="text-5xl">👥</div>
            <h3 className="mt-5 text-2xl font-bold">
              {server.players}/{server.max}
            </h3>
            <p className="mt-2 text-zinc-400">Người chơi</p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center transition hover:-translate-y-1 hover:border-yellow-500">
            <div className="text-5xl">📦</div>
            <h3 className="mt-5 text-2xl font-bold">{server.version}</h3>
            <p className="mt-2 text-zinc-400">Phiên bản</p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center transition hover:-translate-y-1 hover:border-purple-500">
            <div className="text-5xl">🌐</div>
            <h3 className="mt-5 text-xl font-bold">craftopia.zencheap.net</h3>
            <p className="mt-2 text-zinc-400">Port: 30263</p>
          </div>
        </div>
      </section>
    </main>
  );
}
