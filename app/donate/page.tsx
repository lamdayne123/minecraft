"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type DonateTab = "card" | "qr";

type CardResponse = {
  status?: number;
  message?: string;
};

const telcoOptions = [
  { value: "VIETTEL", label: "Viettel" },
  { value: "VINAPHONE", label: "Vinaphone" },
  { value: "MOBIFONE", label: "Mobifone" },
  { value: "GARENA", label: "Garena" },
  { value: "ZING", label: "Zing" },
] as const;

const amountOptions = [
  { value: "10000", label: "10.000đ" },
  { value: "20000", label: "20.000đ" },
  { value: "50000", label: "50.000đ" },
  { value: "100000", label: "100.000đ" },
  { value: "200000", label: "200.000đ" },
  { value: "500000", label: "500.000đ" },
] as const;

export default function DonatePage() {
  const [tab, setTab] = useState<DonateTab>("card");
  const [minecraft, setMinecraft] = useState("");
  const [telco, setTelco] = useState("VIETTEL");
  const [amount, setAmount] = useState("10000");
  const [serial, setSerial] = useState("");
  const [code, setCode] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const amountLabel = useMemo(
    () => amountOptions.find((item) => item.value === amount)?.label ?? amount,
    [amount],
  );

  async function submitCard() {
    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const res = await fetch("/api/card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          minecraft,
          telco,
          amount,
          serial,
          code,
        }),
      });

      const data: CardResponse = await res.json();

      if (data.status === 1) {
        setSuccess(true);
        setMessage("🎉 Nạp thẻ thành công!");
        setMinecraft("");
        setSerial("");
        setCode("");
      } else {
        setSuccess(false);
        setMessage(`❌ ${data.message ?? "Nạp thẻ thất bại"}`);
      }
    } catch {
      setSuccess(false);
      setMessage("❌ Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen overflow-x-hidden text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at top, rgba(34,197,94,0.15), transparent 32%), radial-gradient(circle at 20% 20%, rgba(132,204,22,0.10), transparent 22%), radial-gradient(circle at 80% 0%, rgba(74,222,128,0.10), transparent 24%), linear-gradient(to bottom, #050505 0%, #050705 52%, #030303 100%)",
      }}
    >
      <style>{`
        @keyframes craftopia-fade-up {
          from {
            opacity: 0;
            transform: translateY(18px);
            filter: blur(10px);
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

        .craftopia-enter {
          animation: craftopia-fade-up 0.7s ease-out both;
        }

        .craftopia-pulse {
          animation: craftopia-pulse 4s ease-in-out infinite;
        }
      `}</style>

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <section className="relative mt-4 overflow-hidden rounded-[2rem] border border-emerald-500/10 bg-black/55 px-4 py-14 shadow-2xl sm:px-8 sm:py-18">
          <div className="pointer-events-none absolute inset-0">
            <div className="craftopia-pulse absolute left-10 top-14 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(74,222,128,0.9)]" />
            <div className="craftopia-pulse absolute right-16 top-16 h-3 w-3 rounded-full bg-lime-400 shadow-[0_0_24px_rgba(163,230,53,0.9)]" />
            <div className="craftopia-pulse absolute left-24 top-1/2 h-2 w-2 rounded-full bg-green-300 shadow-[0_0_18px_rgba(134,239,172,0.9)]" />
            <div className="craftopia-pulse absolute right-24 top-2/3 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.10),transparent_42%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent)]" />
          </div>

          <div className="relative z-10 text-center">
            <div className="mb-3 text-4xl">💎</div>
            <h1 className="mx-auto max-w-4xl bg-[linear-gradient(180deg,#ffffff_10%,#f7f7f7_35%,#bafc6d_65%,#43ff4e_100%)] bg-clip-text text-4xl font-black tracking-[0.08em] text-transparent drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] sm:text-7xl">
              DONATE
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium text-zinc-300 sm:text-lg">
              Cảm ơn bạn đã ủng hộ Craftopia Survival ❤️
            </p>

            <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 rounded-[1.75rem] border border-white/10 bg-black/50 p-3 text-sm text-zinc-300 shadow-[0_0_32px_rgba(0,0,0,0.28)] backdrop-blur-md sm:grid-cols-3 sm:p-4">
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                <span>🎁</span>
                <span className="font-semibold text-white">Ủng hộ server</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                <span>⚡</span>
                <span className="font-semibold text-white">Xử lý nhanh</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                <span>🌿</span>
                <span className="font-semibold text-white">Craftopia Survival</span>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-black/50 p-4 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6">
            <div className="mb-5 flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
              <button
                onClick={() => setTab("card")}
                className={`flex-1 rounded-full py-3 text-sm font-bold transition-all duration-300 sm:text-base ${
                  tab === "card"
                    ? "bg-emerald-500 text-black shadow-lg"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                💳 Donate bằng thẻ
              </button>

              <button
                onClick={() => setTab("qr")}
                className={`flex-1 rounded-full py-3 text-sm font-bold transition-all duration-300 sm:text-base ${
                  tab === "qr"
                    ? "bg-emerald-500 text-black shadow-lg"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                📷 Donate bằng QR
              </button>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-black/35 p-4 sm:p-6">
              {tab === "qr" ? (
                <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:items-center">
                  <div className="flex justify-center">
                    <div className="rounded-[2rem] border border-white/10 bg-white p-3 shadow-[0_0_40px_rgba(0,0,0,0.35)]">
                      <Image
                        src="/images/zalopay-qr.png"
                        alt="QR Donate"
                        width={420}
                        height={420}
                        className="h-auto w-full max-w-[280px] rounded-[1.25rem] object-cover"
                        priority
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold tracking-[0.18em] text-emerald-300">
                        DONATE NHANH
                      </div>
                      <h2 className="mt-3 text-2xl font-black sm:text-3xl">Quét mã QR để ủng hộ</h2>
                      <p className="mt-2 text-sm text-zinc-300 sm:text-base">
                        Thanh toán nhanh bằng ZaloPay, sau đó gửi ảnh xác nhận nếu cần hỗ trợ.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-sm text-zinc-400">Ngân hàng</div>
                        <div className="mt-1 font-black text-white">ZaloPay</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-sm text-zinc-400">Chủ TK</div>
                        <div className="mt-1 font-black text-white">Trương Chí Lâm</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-sm text-zinc-400">Nội dung</div>
                        <div className="mt-1 font-black text-white">DONSV</div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-zinc-200">
                      Sau khi chuyển khoản, bạn có thể chụp màn hình giao dịch để báo AD nếu cần xác nhận.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-zinc-300">
                        Tên Minecraft
                      </label>
                      <input
                        value={minecraft}
                        onChange={(e) => setMinecraft(e.target.value)}
                        placeholder="Nhập tên trong game"
                        className="w-full rounded-2xl border border-white/10 bg-black/55 px-4 py-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-400/40 focus:bg-black/70"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-zinc-300">
                        Nhà mạng
                      </label>
                      <select
                        value={telco}
                        onChange={(e) => setTelco(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-black/55 px-4 py-4 text-white outline-none transition focus:border-emerald-400/40 focus:bg-black/70"
                      >
                        {telcoOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-zinc-300">
                        Mệnh giá
                      </label>
                      <select
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-black/55 px-4 py-4 text-white outline-none transition focus:border-emerald-400/40 focus:bg-black/70"
                      >
                        {amountOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm text-zinc-400">Mệnh giá đang chọn</div>
                      <div className="mt-1 text-xl font-black text-emerald-300">{amountLabel}</div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-zinc-300">
                        Số seri
                      </label>
                      <input
                        value={serial}
                        onChange={(e) => setSerial(e.target.value)}
                        placeholder="Nhập số seri"
                        className="w-full rounded-2xl border border-white/10 bg-black/55 px-4 py-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-400/40 focus:bg-black/70"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-zinc-300">
                        Mã thẻ
                      </label>
                      <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Nhập mã thẻ"
                        className="w-full rounded-2xl border border-white/10 bg-black/55 px-4 py-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-400/40 focus:bg-black/70"
                      />
                    </div>
                  </div>

                  <button
                    onClick={submitCard}
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-6 py-4 text-base font-black text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
                  >
                    {loading ? "⏳ Đang xử lý..." : "💳 Nạp thẻ"}
                  </button>

                  {message ? (
                    <div
                      className={`rounded-2xl border px-4 py-4 text-center text-sm font-bold sm:text-base ${
                        success
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                          : "border-red-500/20 bg-red-500/10 text-red-300"
                      }`}
                    >
                      {message}
                    </div>
                  ) : null}

                  <p className="text-center text-sm text-zinc-500">
                    Báo AD nếu có lỗi xảy ra.
                  </p>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-emerald-500/15 bg-black/50 p-5 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6">
              <div className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold tracking-[0.18em] text-emerald-300">
                Donate
              </div>
              <h2 className="mt-4 text-2xl font-black sm:text-3xl">Ủng hộ server giúp</h2>
              <div className="mt-4 space-y-3 text-sm text-zinc-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  🎁 Giúp hỗ trợ phát triển server.
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  ⚡ Giúp admin có tiền mua mỳ gói.
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  🌿 Giúp trải nghiệm mượt mà hơn.
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black/50 p-5 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6">
              <h3 className="text-lg font-black text-white">Lưu ý</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
                <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  • Nhập đúng tên minecraft.
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  • Chụp ảnh giao dịch nếu bạn cần đối soát.
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  • Nếu dùng thẻ cào, kiểm tra kỹ seri và mã thẻ trước khi gửi.
                </li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.16),transparent_50%),linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(0,0,0,0.25))] p-5 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6">
              <div className="text-sm font-semibold tracking-[0.18em] text-zinc-400">
                CRAFTOPIA SURVIVAL
              </div>
              <div className="mt-2 text-2xl font-black text-white">Cảm ơn bạn ❤️</div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                Mỗi đóng góp đều giúp server ổn định hơn và có thêm nội dung mới cho người chơi.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
