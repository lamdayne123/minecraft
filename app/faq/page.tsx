"use client";

import { useMemo, useState } from "react";

const faq = [
  {
    icon: "🚀",
    title: "Bắt đầu chơi",
    color: "border-green-500 text-green-400",
    desc: "Thông tin cơ bản để tham gia Craftopia Survival.",
    items: [
      "IP: craftopia.zencheap.net:30263",
      "Java: 1.20 trở lên",
      "Bedrock: 26.0 trở lên",
      "Hỗ trợ Java & Bedrock",
      "Tham gia Discord nếu cần hỗ trợ."
    ],
    tip: "Lần đầu vào server hãy đọc Rules trước."
  },
  {
    icon: "🏡",
    title: "Claim",
    color: "border-emerald-500 text-emerald-400",
    desc: "Bảo vệ đất và công trình của bạn.",
    items: [
      "Dùng /claim để claim 1 chunk tối đa 15 lần.",
      "Không ai có thể phá block trong claim của bạn.",
      "Có thể thêm bạn bè vào claim.",
      "Claim giúp chống grief."
    ],
    tip: "Luôn claim trước khi xây nhà."
  },
  {
    icon: "⚔️",
    title: "Kỹ năng",
    color: "border-purple-500 text-purple-400",
    desc: "AuraSkills giúp tăng sức mạnh nhân vật.",
    items: [
      "Đào sẽ tăng Mining.",
      "Chặt cây tăng Foraging.",
      "Đánh quái tăng Fighting.",
      "Câu cá tăng Fishing."
    ],
    tip: "Skill càng cao càng mở nhiều buff."
  },
  {
    icon: "🎣",
    title: "Kiếm tiền",
    color: "border-cyan-500 text-cyan-400",
    desc: "Có nhiều cách kiếm tiền trong server.",
    items: [
      "Câu cá.",
      "Làm nông.",
      "Farm mob.",
      "Bán đồ cho Shop.",
      "Mua bán với người chơi qua AH."
    ],
    tip: "Fishing là cách kiếm tiền ổn định cho người mới."
  },
  {
    icon: "🛒",
    title: "Auction House",
    color: "border-yellow-500 text-yellow-400",
    desc: "Mua bán vật phẩm với người chơi.",
    items: [
      "/ah để mở chợ.",
      "Đăng bán vật phẩm.",
      "Mua vật phẩm của người khác.",
      "Giá hoàn toàn do người chơi quyết định."
    ],
    tip: "So sánh giá trước khi mua."
  },
  {
    icon: "🎁",
    title: "Daily Rewards",
    color: "border-pink-500 text-pink-400",
    desc: "Nhận quà mỗi ngày.",
    items: [
      "Sử dụng /rewards.",
      "Đăng nhập mỗi ngày để nhận thưởng.",
      "Không nhận sẽ mất chuỗi."
    ],
    tip: "Đừng quên nhận quà mỗi ngày."
  },
  {
    icon: "🏆",
    title: "Baltop",
    color: "border-orange-500 text-orange-400",
    desc: "Bảng xếp hạng giàu nhất server.",
    items: [
      "Top 20 người chơi giàu nhất.",
      "Có phần thưởng định kỳ.",
      "Kiếm tiền để leo BXH."
    ],
    tip: "Càng chăm chỉ càng dễ lên top."
  },
  {
    icon: "💬",
    title: "Discord",
    color: "border-indigo-500 text-indigo-400",
    desc: "Nơi hỗ trợ và cập nhật server.",
    items: [
      "Nhận thông báo mới.",
      "Hỏi đáp với Staff.",
      "Báo lỗi.",
      "Tham gia sự kiện."
    ],
    tip: "Discord là nơi hỗ trợ nhanh nhất."
  }
];

export default function FAQPage() {
  const [selected, setSelected] = useState(faq[0]);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return faq.filter((x) =>
      x.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white">

      <div className="mx-auto max-w-7xl px-5 py-16">

        <div className="text-center">

          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            📚 Craftopia FAQ
          </h1>

          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Hướng dẫn dành cho người chơi mới của Craftopia Survival.
          </p>

        </div>

        <div className="mt-10">

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Tìm kiếm..."
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-4 outline-none transition focus:border-green-500"
          />

        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[300px_1fr]">

          {/* Sidebar */}

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4">

            <div className="space-y-2">

              {filtered.map((item) => (

                <button
                  key={item.title}
                  onClick={() => setSelected(item)}
                  className={`w-full rounded-2xl border px-4 py-4 text-left transition hover:bg-zinc-800 ${
                    selected.title === item.title
                      ? item.color + " bg-zinc-800"
                      : "border-zinc-800"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <span className="text-2xl">
                      {item.icon}
                    </span>

                    <span className="font-bold">
                      {item.title}
                    </span>

                  </div>

                </button>

              ))}

            </div>

          </div>

          {/* Content */}

          <div className={`rounded-3xl border ${selected.color} bg-zinc-900 p-8`}>

            <div className="flex items-center gap-4">

              <span className="text-5xl">
                {selected.icon}
              </span>

              <div>

                <h2 className="text-3xl font-black">
                  {selected.title}
                </h2>

                <p className="mt-2 text-zinc-400">
                  {selected.desc}
                </p>

              </div>

            </div>

            <div className="mt-8 space-y-3">

              {selected.items.map((item) => (

                <div
                  key={item}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4"
                >
                  ✅ {item}
                </div>

              ))}

            </div>

            <div className="mt-8 rounded-2xl border border-yellow-500/40 bg-yellow-500/10 p-5">

              <div className="font-bold text-yellow-400">
                💡 Mẹo
              </div>

              <p className="mt-2 text-zinc-300">
                {selected.tip}
              </p>

            </div>

          </div>

        </div>

        <div className="mt-12 rounded-3xl border border-green-500/30 bg-green-500/10 p-8 text-center">

          <h3 className="text-2xl font-bold text-green-400">
            🎮 Craftopia Survival
          </h3>

          <div className="mt-6 grid gap-4 md:grid-cols-4">

            <div>
              <p className="text-zinc-400">IP</p>
              <p className="font-bold">craftopia.zencheap.net:30263</p>
            </div>

            <div>
              <p className="text-zinc-400">Java</p>
              <p className="font-bold">1.20+</p>
            </div>

            <div>
              <p className="text-zinc-400">Bedrock</p>
              <p className="font-bold">26.0+</p>
            </div>

            <div>
              <p className="text-zinc-400">Nền tảng</p>
              <p className="font-bold">Java & Bedrock</p>
            </div>

          </div>

          <a
            href="https://discord.gg/maY22mamA"
            target="_blank"
            className="mt-8 inline-flex rounded-full bg-green-500 px-8 py-4 font-bold text-black transition hover:scale-105"
          >
            💬 Tham gia Discord
          </a>

        </div>

      </div>

    </main>
  );
}
