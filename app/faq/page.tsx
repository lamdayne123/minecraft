"use client";

import { useState } from "react";

const faq = [
  {
    icon: "🏡",
    name: "Claim",
    color: "text-green-400 border-green-500/40",
    title: "🏡 Claim System",
    desc: "Bảo vệ vùng đất của bạn khỏi người chơi khác.",
    commands: [
      "/claim - Claim chunk hiện tại.",
      "/claim <radius> - Claim nhiều chunk.",
      "/unclaim - Xóa claim.",
      "/claim list - Danh sách claim.",
      "/claim tp <tên_claim> - Dịch chuyển.",
      "/claim add <player> <tên_claim> - Thêm thành viên vào claim.",
      "/claim remove <player> - Xóa thành viên.",
      "/claim map - Bản đồ claim.",
      "/claim fly - Bay trong claim.",
    ],
    tip: "Claim càng lớn thì càng an toàn.",
  },
  {
    icon: "💰",
    name: "Economy",
    color: "text-yellow-400 border-yellow-500/40",
    title: "💰 Economy",
    desc: "Hệ thống tiền tệ của server.",
    commands: [
      '/bal - Xem số dư.',
      '/pay <player> <money> - Chuyển tiền.',
      '/baltop - BXH giàu nhất.',
      '/shop - Mở cửa hàng.',
      '/sell - Bán vật phẩm.',
      '/sell all - Bán toàn bộ.',
      '/ah - Chợ người chơi.',
      '/ah sell <giá> <sl> - Đăng bán.',
      '/order - Đơn đặt mua.',
    ],
    tip: "Dùng /ah để mua bán với người chơi khác.",
  },
  {
    icon: "🎁",
    name: "Home",
    color: "text-orange-400 border-orange-500/40",
    title: "🎁 Home",
    desc: "Mở rương nhận phần thưởng.",
    commands: [
      'home - Về nhà.',
      '/home <tên> - Về nhà đã đặt.',
      '/sethome <tên> - Đặt nhà.',
      '/delhome <tên> - Xóa nhà.',
      '/homes - Danh sách nhà.',
    ],
    tip: "/home để không phải đi xa.",
  },
  {
    icon: "📜",
    name: "Tiện ích",
    color: "text-sky-400 border-sky-500/40",
    title: "📜 Tiện ích",
    desc: "Nội quy của máy chủ.",
    commands: [
      '/pv - Mở túi đồ ảo.',
      '/nv - Bật/Tắt Night Vision.',
      '/code <code> - Nhập giftcode nhận quà.',
    ],
    tip: "Vi phạm có thể bị ban.",
  },
  {
    icon: "💬",
    name: "thông tin player",
    color: "text-purple-400 border-purple-500/40",
    title: "💬 Thông tin Player",
    desc: "Thông tin player.",
    commands: [
      '/skill - Mở menu kỹ năng.',
      '/stats - Xem chỉ số.',
      '/profile - Xem hồ sơ.',
      '/playtime - Xem thời gian chơi.'
    ],
    tip: "Thông tin của bản thân.",
  },
];

export default function FAQPage() {
  const [selected, setSelected] = useState(faq[0]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-7xl px-8 py-16">

        <h1 className="text-center text-5xl font-black text-green-400">
          📚 Craftopia FAQ
        </h1>

        <p className="mt-4 text-center text-zinc-400">
          Di chuột vào từng mục để xem hướng dẫn.
        </p>

        <div className="relative mt-16 flex gap-8">

          <div className="w-72 rounded-3xl border border-zinc-800 bg-zinc-900 p-4">

            {faq.map((item) => (

              <button
                key={item.name}
                onMouseEnter={() => setSelected(item)}
                className="mb-2 flex w-full items-center rounded-xl px-4 py-4 text-left transition hover:bg-zinc-800"
              >
                <span className="mr-3 text-2xl">
                  {item.icon}
                </span>

                <span className="font-bold">
                  {item.name}
                </span>

              </button>

            ))}

          </div>

          <div
            className={`w-[520px] rounded-3xl border bg-zinc-900/95 p-8 shadow-2xl transition-all duration-300 ${selected.color}`}
          >

            <h2 className="text-3xl font-black">
              {selected.title}
            </h2>

            <p className="mt-3 text-zinc-400">
              {selected.desc}
            </p>

            <div className="mt-8">

              <p className="mb-4 font-bold text-zinc-300">
                Commands
              </p>

              <div className="space-y-3">

                {selected.commands.map((cmd) => (

                  <div
                    key={cmd}
                    className="rounded-xl bg-black/30 px-4 py-3 font-mono text-green-400"
                  >
                    {cmd}
                  </div>

                ))}

              </div>

            </div>

            <div className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-950/40 p-4">

              <p className="font-bold text-yellow-400">
                💡 Tip
              </p>

              <p className="mt-2 text-zinc-400">
                {selected.tip}
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}