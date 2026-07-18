"use client";

import { useState } from "react";

export default function DonatePage() {
  const [tab, setTab] = useState<"card" | "qr">("card");
  const [minecraft, setMinecraft] = useState("");
  const [telco, setTelco] = useState("VIETTEL");
  const [amount, setAmount] = useState("10000");
  const [serial, setSerial] = useState("");
  const [code, setCode] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);


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


      const data = await res.json();


      if (data.status === 1) {

        setSuccess(true);
        setMessage("🎉 Nạp thẻ thành công!");

      } else {

        setSuccess(false);
        setMessage(`❌ ${data.message}`);

      }


    } catch {

      setSuccess(false);
      setMessage("❌ Lỗi kết nối server");


    } finally {

      setLoading(false);

    }

  }


  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white">
    <section className="mx-auto max-w-3xl px-5 py-14">

      <div className="text-center">
        <h1 className="text-5xl font-black bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          💎 Donate
        </h1>

        <p className="mt-3 text-zinc-400">
          Cảm ơn bạn đã ủng hộ Craftopia Survival ❤️
        </p>
      </div>

      <div className="mt-10 flex overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

        <button
          onClick={() => setTab("card")}
          className={`flex-1 py-4 font-bold transition ${
            tab === "card"
              ? "bg-green-500 text-white"
              : "hover:bg-zinc-800"
          }`}
        >
          💳 Donate bằng thẻ
        </button>

        <button
          onClick={() => setTab("qr")}
          className={`flex-1 py-4 font-bold transition ${
            tab === "qr"
              ? "bg-green-500 text-white"
              : "hover:bg-zinc-800"
          }`}
        >
          📷 Donate bằng QR
        </button>

      </div>

      <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-7 shadow-xl">

        {tab === "qr" ? (

          <div className="text-center">

            <img
              src="/images/zalopay-qr.png"
              alt="QR Donate"
              className="mx-auto w-72 rounded-2xl bg-white p-3"
            />

            <p className="mt-6 text-zinc-300">
              Quét mã QR để ủng hộ server.
            </p>

            <div className="mt-6 rounded-2xl bg-zinc-800 p-4 text-left text-sm">

              <p><b>Ngân hàng:</b> ZaloPay</p>
              <p><b>Chủ TK:</b> Trương Chí Lâm</p>
              <p><b>Nội dung:</b> DONSV</p>

            </div>

          </div>

        ) : (

          <div className="space-y-4">

            <input
              value={minecraft}
              onChange={(e) => setMinecraft(e.target.value)}
              placeholder="Tên Minecraft"
              className="w-full rounded-xl bg-zinc-800 p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <select
              value={telco}
              onChange={(e) => setTelco(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 p-3"
            >
              <option value="VIETTEL">Viettel</option>
              <option value="VINAPHONE">Vinaphone</option>
              <option value="MOBIFONE">Mobifone</option>
              <option value="GARENA">Garena</option>
              <option value="ZING">Zing</option>
            </select>

            <select
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 p-3"
            >
              <option value="10000">10.000đ</option>
              <option value="20000">20.000đ</option>
              <option value="50000">50.000đ</option>
              <option value="100000">100.000đ</option>
              <option value="200000">200.000đ</option>
              <option value="500000">500.000đ</option>
            </select>

            <input
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              placeholder="Số seri"
              className="w-full rounded-xl bg-zinc-800 p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Mã thẻ"
              className="w-full rounded-xl bg-zinc-800 p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              onClick={submitCard}
              disabled={loading}
              className="w-full rounded-xl bg-green-500 py-3 font-bold transition hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? "⏳ Đang xử lý..." : "💳 Nạp thẻ"}
            </button>

            {message && (
              <div
                className={`rounded-xl p-3 text-center font-bold ${
                  success
                    ? "bg-green-500/15 text-green-400"
                    : "bg-red-500/15 text-red-400"
                }`}
              >
                {message}
              </div>
            )}

            <p className="text-center text-sm text-zinc-500">
              Báo AD nếu có lỗi xảy ra.
            </p>

          </div>

        )}

      </div>

    </section>
  </main>
);

}
