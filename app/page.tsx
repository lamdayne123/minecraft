"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);

  const [server, setServer] = useState({
    online: false,
    players: 0,
    max: 0,
    version: "",
  });

  const [copied, setCopied] = useState(false);


  const copyIP = async () => {
    try {

      await navigator.clipboard.writeText(
        "craftopia.zencheap.net:30263"
      );

      setCopied(true);

      setTimeout(
        () => setCopied(false),
        2000
      );

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
  return (
  <main
    className="min-h-screen bg-cover bg-center bg-fixed text-white"
    style={{
      backgroundImage:
        "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.55)), url('/images/background.jpg')",
    }}
  >
      {/* Navbar */}
    <header className="sticky top-5 z-50 px-4">
  <div className="mx-auto max-w-7xl rounded-3xl border border-zinc-800 bg-zinc-900/80 px-5 py-4 backdrop-blur-xl">

    <div className="flex items-center justify-between">

      <a
        href="/"
        className="text-2xl font-black text-green-400"
      >
        Craftopia
      </a>

      <nav className="hidden items-center gap-8 md:flex">
        <a href="/donate" className="text-zinc-300 hover:text-green-400">
          💎 Donate
        </a>

        <a href="/rules" className="text-zinc-300 hover:text-green-400">
          📜 Rules
        </a>

        <a
          href="https://discord.gg/maY22mamA"
          target="_blank"
          className="text-zinc-300 hover:text-green-400"
        >
          💬 Discord
        </a>
      </nav>

      <div className="flex items-center gap-3">


        <a
          href="minecraft://?addExternalServer=Craftopia|craftopia.zencheap.net:30263"
          className="hidden rounded-full bg-green-500 px-5 py-2 font-bold text-black md:block"
        >
          🎮 Vào Server
        </a>


        {/* Mobile button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl border border-zinc-700 px-3 py-2 text-xl md:hidden"
        >
          ☰
        </button>


      </div>


    </div>


    {/* Mobile menu */}

    {menuOpen && (

  <div className="mt-4 space-y-3 border-t border-zinc-800 pt-4 md:hidden">

    <a
      href="/"
      className="
        block
        rounded-2xl
        border
        border-zinc-700
        bg-zinc-800/40
        p-4
        font-semibold
        text-zinc-300
        backdrop-blur-xl
        transition
        active:bg-green-500/20
        active:border-green-500
      "
    >
      🏠 Trang chủ
    </a>


    <a
      href="/donate"
      className="
        block
        rounded-2xl
        border
        border-zinc-700
        bg-zinc-800/40
        p-4
        font-semibold
        text-zinc-300
        backdrop-blur-xl
        transition
        active:bg-purple-500/20
        active:border-purple-500
      "
    >
      💎 Donate
    </a>


    <a
      href="/rules"
      className="
        block
        rounded-2xl
        border
        border-zinc-700
        bg-zinc-800/40
        p-4
        font-semibold
        text-zinc-300
        backdrop-blur-xl
        transition
        active:bg-sky-500/20
        active:border-sky-500
      "
    >
      📜 Rules
    </a>


    <a
      href="/news"
      className="
        block
        rounded-2xl
        border
        border-zinc-700
        bg-zinc-800/40
        p-4
        font-semibold
        text-zinc-300
        backdrop-blur-xl
        transition
        active:bg-red-500/20
        active:border-red-500
      "
    >
      📰 Tin tức
    </a>


    <a
      href="https://discord.gg/maY22mamA"
      target="_blank"
      className="
        block
        rounded-2xl
        border
        border-zinc-700
        bg-zinc-800/40
        p-4
        font-semibold
        text-zinc-300
        backdrop-blur-xl
        transition
        active:bg-indigo-500/20
        active:border-indigo-500
      "
    >
      💬 Discord
    </a>


    <a
      href="minecraft://?addExternalServer=Craftopia|craftopia.zencheap.net:30263"
      className="
        block
        rounded-2xl
        bg-green-500
        p-4
        text-center
        font-black
        text-black
        transition
        active:scale-95
      "
    >
      🎮 Vào Server
    </a>


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
          Máy chủ Minecraft Survival với Claim, AuraSkills, Crate,
          Kinh tế, Voice Chat và nhiều tính năng hấp dẫn khác.
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


    {/* Online */}

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
          server.online
          ? "bg-green-500 animate-pulse"
          : "bg-red-500"
        }`}
      />

      <span className="text-xl font-black sm:text-3xl">
        {server.players}
      </span>

      <span className="hidden text-sm text-zinc-400 sm:block">
        đang chơi
      </span>

    </div>



    {/* Divider */}

    <div className="hidden h-8 w-px bg-zinc-700 sm:block" />



    {/* IP */}

    <div className="
      min-w-0
      flex-1
      px-3
      text-center
    ">

      <p className="
        truncate
        text-sm
        font-bold
        sm:text-2xl
      ">
        craftopia.zencheap.net
      </p>

      <p className="hidden text-xs text-zinc-500 sm:block">
        Port: 30263
      </p>

    </div>



    {/* Copy */}

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

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-black">
            ✨ Khám phá
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <a
            href="/events"
            className="group rounded-2xl border border-orange-500/40 bg-gradient-to-br from-orange-500/10 to-red-500/10 p-6 transition hover:-translate-y-1 hover:border-orange-400"
          >
            <h3 className="text-xl font-bold text-orange-400">
              🎉 Events
            </h3>

            <p className="mt-3 text-sm text-zinc-400">
              Theo dõi các sự kiện mới nhất, phần thưởng và hoạt động đang diễn ra tại Craftopia.
            </p>

            <div className="mt-6 flex items-center justify-between">
              <span className="font-semibold text-orange-400">
                Xem Events →
              </span>

              <span className="text-3xl transition group-hover:scale-110">
                🎁
              </span>
            </div>
          </a>

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
