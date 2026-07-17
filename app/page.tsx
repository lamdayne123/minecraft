"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [server, setServer] = useState({
    online: false,
    players: 0,
    max: 0,
    version: "",
  });
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white">

      {/* Navbar */}
    <header className="sticky top-5 z-50 px-4">

  <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-zinc-800 bg-zinc-900/80 px-6 py-4 backdrop-blur-xl">

    {/* Logo */}
    <a
      href="/"
      className="text-3xl font-black text-green-400"
    >
      Craftopia
    </a>

    {/* Desktop */}
    <nav className="hidden items-center gap-8 md:flex">

      <a
        href="/"
        className="text-zinc-300 transition hover:text-green-400"
      >
        🏠 Trang chủ
      </a>

      <a
        href="/donate"
        className="text-zinc-300 transition hover:text-green-400"
      >
        💎 Donate
      </a>

      <a
        href="https://discord.gg/maY22mamA"
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-300 transition hover:text-green-400"
      >
        💬 Discord
      </a>

    </nav>

    {/* Desktop Button */}
    <a
      href="minecraft://?addExternalServer=Craftopia|craftopia.zencheap.net:30263"
      className="hidden rounded-full bg-green-500 px-6 py-3 font-bold text-black transition hover:scale-105 md:block"
    >
      🎮 Vào Server
    </a>

    {/* Mobile Menu */}
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="text-3xl text-white md:hidden"
    >
      ☰
    </button>

  </div>

  {/* Mobile Dropdown */}
  {menuOpen && (
    <div className="mx-auto mt-4 max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/95 p-6 backdrop-blur-xl md:hidden">

      <div className="flex flex-col gap-5">

        <a href="/" className="text-lg">
          🏠 Trang chủ
        </a>

        <a href="/donate" className="text-lg">
          💎 Donate
        </a>

        <a
          href="https://discord.gg/maY22mamA"
          target="_blank"
          className="text-lg"
        >
          💬 Discord
        </a>

        <a
          href="minecraft://?addExternalServer=Craftopia|craftopia.zencheap.net:30263"
          className="mt-2 rounded-xl bg-green-500 py-3 text-center font-bold text-black"
        >
          🎮 Vào Server
        </a>

      </div>

    </div>
  )}

</header>


      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">

        <span className="rounded-full border border-green-500/40 bg-green-500/10 px-4 py-2 text-green-300">
          🟢 Java & Bedrock
        </span>

        <h2 className="mt-8 text-6xl font-black">
          Craftopia Survival
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
  Máy chủ Minecraft Survival với Claim, AuraSkills, Crate,
  Kinh tế, Voice Chat và nhiều tính năng hấp dẫn khác.
</p>

{/* Hai nút */}
<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

  <a
    href="minecraft://?addExternalServer=Craftopia|craftopia.zencheap.net:30263"
    className="w-72 rounded-full bg-green-500 py-4 text-center text-xl font-semibold text-black transition hover:scale-105 hover:bg-green-400"
  >
    🎮 Vào Server →
  </a>

  <a
    href="https://discord.gg/maY22mamA"
    target="_blank"
    rel="noopener noreferrer"
    className="w-72 rounded-full border border-zinc-700 bg-zinc-900/70 py-4 text-center text-xl font-semibold transition hover:border-green-500 hover:bg-zinc-800"
  >
    💬 Tham gia Discord
  </a>

</div>

{/* Thanh IP */}
<div className="mt-10 w-full flex justify-center">
  <div
    className="
    flex items-center
    w-full max-w-md sm:max-w-xl
    rounded-full
    border border-zinc-700
    bg-zinc-900/80
    backdrop-blur-xl
    px-2 py-2
    shadow-xl
    "
  >

    <div className="flex items-center px-4">

      <span
        className={`mr-2 h-3 w-3 rounded-full ${
          server.online
            ? "bg-green-500 animate-pulse"
            : "bg-red-500"
        }`}
      />

      <span className="text-xl sm:text-3xl font-bold">
        {server.players}
      </span>

      <span className="ml-2 hidden sm:block text-zinc-400">
        đang chơi
      </span>

    </div>

    <div className="h-8 w-px bg-zinc-700" />

    <div className="flex-1 px-4 overflow-hidden">

      <span className="block truncate text-lg sm:text-2xl font-bold">
        craftopia.zencheap.net
      </span>

    </div>

    <button
      onClick={copyIP}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 hover:bg-zinc-800"
    >
      {copied ? "✅" : "📋"}
    </button>

  </div>

</div>

</section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-green-500 hover:-translate-y-1">
            <h3 className="text-xl font-bold">🏡 Claim</h3>
          </div>

          <a
            href="/faq"
            className="group rounded-2xl border border-purple-500/40 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 p-6 transition hover:-translate-y-1 hover:border-purple-400"
          >
            <h3 className="text-xl font-bold text-purple-400">
              📚 FAQ
            </h3>

            <p className="mt-3 text-sm text-zinc-400">
              Hướng dẫn các hệ thống, lệnh và tính năng của máy chủ.
            </p>

            <div className="mt-6 flex items-center justify-between">
              <span className="font-semibold text-purple-400">
                Mở FAQ →
              </span>

              <span className="text-3xl transition group-hover:scale-110">
                📖
              </span>
            </div>
          </a>

          <a
            href="/rules"
            className="group rounded-2xl border border-sky-500/40 bg-gradient-to-br from-sky-500/10 to-blue-500/10 p-6 transition hover:-translate-y-1 hover:border-sky-400"
          >
            <h3 className="text-xl font-bold text-sky-400">
              📜 Rules
            </h3>

            <p className="mt-3 text-sm text-zinc-400">
              Đọc nội quy chính thức của máy chủ trước khi tham gia chơi.
            </p>

            <div className="mt-6 flex items-center justify-between">
              <span className="font-semibold text-sky-400">
                Xem Rules →
              </span>

              <span className="text-3xl transition group-hover:scale-110">
                ⚖️
              </span>
            </div>
          </a>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-green-500 hover:-translate-y-1">
            <h3 className="text-xl font-bold">🎲 Tài Xỉu</h3>
          </div>

          <a
  href="/news"
  className="group rounded-2xl border border-red-500/40 bg-gradient-to-br from-red-500/10 to-orange-500/10 p-6 transition hover:-translate-y-1 hover:border-red-400"
>
  <h3 className="text-xl font-bold text-red-400">
    📰 Tin tức
  </h3>

  <p className="mt-3 text-sm text-zinc-400">
    Xem các thông báo và cập nhật mới nhất của máy chủ.
  </p>

  <div className="mt-6 flex items-center justify-between">
    <span className="font-semibold text-red-400">
      Xem Tin tức →
    </span>

    <span className="text-3xl transition group-hover:scale-110">
      📢
    </span>
  </div>
</a>

          <a
            href="/baltop"
            className="group rounded-2xl border border-yellow-500/40 bg-gradient-to-br from-yellow-500/10 to-green-500/10 p-6 transition hover:-translate-y-1 hover:border-yellow-400"
          >
            <h3 className="text-xl font-bold text-yellow-400">
              💰 Kinh tế
            </h3>

            <p className="mt-3 text-sm text-zinc-400">
              Xem bảng xếp hạng Baltop và nền kinh tế của máy chủ.
            </p>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-green-400 font-semibold">
                Xem Baltop →
              </span>

              <span className="text-3xl transition group-hover:scale-110">
                🏆
              </span>
            </div>
          </a>

        </div>
      </section>

      {/* Trạng thái Server */}
      <section className="mx-auto max-w-7xl px-6 pb-24">

        <div className="mb-12 text-center">

          <h2 className="text-5xl font-black">
            📊 Trạng thái Server
          </h2>

          <p className="mt-3 text-zinc-400">
            Theo dõi trạng thái máy chủ theo thời gian thực.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-4">

          {/* Status */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center transition hover:-translate-y-1 hover:border-green-500">

            <div className="text-5xl">
              {server.online ? "🟢" : "🔴"}
            </div>

            <h3 className="mt-5 text-2xl font-bold">
              {server.online ? "Online" : "Offline"}
            </h3>

            <p className="mt-2 text-zinc-400">
              Trạng thái
            </p>

          </div>

          {/* Players */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center transition hover:-translate-y-1 hover:border-cyan-500">

            <div className="text-5xl">
              👥
            </div>

            <h3 className="mt-5 text-2xl font-bold">
              {server.players}/{server.max}
            </h3>

            <p className="mt-2 text-zinc-400">
              Người chơi
            </p>

          </div>

          {/* Version */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center transition hover:-translate-y-1 hover:border-yellow-500">

            <div className="text-5xl">
              📦
            </div>

            <h3 className="mt-5 text-2xl font-bold">
              {server.version}
            </h3>

            <p className="mt-2 text-zinc-400">
              Phiên bản
            </p>

          </div>

          {/* Address */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center transition hover:-translate-y-1 hover:border-purple-500">

            <div className="text-5xl">
              🌐
            </div>

            <h3 className="mt-5 text-xl font-bold">
              craftopia.zencheap.net
            </h3>

            <p className="mt-2 text-zinc-400">
              Port: 30263
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}
