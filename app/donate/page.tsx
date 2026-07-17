"use client";

import { useState } from "react";

export default function DonatePage() {

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
    <main className="min-h-screen bg-zinc-950 text-white">

      <section className="mx-auto max-w-6xl px-6 py-16">

        <h1 className="mb-3 text-center text-5xl font-black text-green-400">
          💎 Donate
        </h1>

        <p className="mb-12 text-center text-zinc-400">
          Cảm ơn bạn đã ủng hộ Craftopia Survival ❤️
        </p>


        <div className="grid gap-8 lg:grid-cols-2">


          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

            <h2 className="mb-6 text-3xl font-bold">
              📷 Donate bằng QR
            </h2>

            <div className="flex justify-center">
              <img
                src="/images/zalopay-qr.png"
                alt="QR Donate"
                className="w-72 rounded-xl bg-white p-2"
              />
            </div>

            <p className="mt-6 text-center text-zinc-400">
              Quét mã QR bằng ZaloPay để ủng hộ server.
            </p>

          </div>



          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

            <h2 className="mb-6 text-3xl font-bold">
              📱 Donate bằng thẻ cào
            </h2>


            <div className="space-y-4">


              <input
                value={minecraft}
                onChange={(e)=>setMinecraft(e.target.value)}
                placeholder="Tên Minecraft"
                className="w-full rounded-xl bg-zinc-800 p-3 outline-none focus:ring-2 focus:ring-green-500"
              />


              <select
                value={telco}
                onChange={(e)=>setTelco(e.target.value)}
                className="w-full rounded-xl bg-zinc-800 p-3 outline-none"
              >
                <option value="VIETTEL">Viettel</option>
                <option value="VINAPHONE">Vinaphone</option>
                <option value="MOBIFONE">Mobifone</option>
                <option value="GARENA">Garena</option>
                <option value="ZING">Zing</option>
              </select>



              <select
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                className="w-full rounded-xl bg-zinc-800 p-3 outline-none"
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
  onChange={(e)=>setSerial(e.target.value)}
  placeholder="Số seri"
  className="w-full rounded-xl bg-zinc-800 p-3 text-white outline-none focus:ring-2 focus:ring-green-500"
/>


              <input
                value={code}
                onChange={(e)=>setCode(e.target.value)}
                placeholder="Mã thẻ"
                className="w-full rounded-xl bg-zinc-800 p-3 outline-none focus:ring-2 focus:ring-green-500"
              />



              <button
                onClick={submitCard}
                disabled={loading}
                className="w-full rounded-xl bg-green-500 py-3 font-bold transition hover:bg-green-600 active:scale-95 disabled:opacity-50"
              >
                {
                  loading
                  ? "⏳ Đang kiểm tra..."
                  : `💳 Nạp ${telco}`
                }
              </button>



              {message && (
                <p
                  className={`text-center font-bold ${
                    success
                    ? "text-green-400"
                    : "text-red-400"
                  }`}
                >
                  {message}
                </p>
              )}


              <p className="text-center text-sm text-zinc-500">
                Sau khi nạp thành công, phần thưởng sẽ được gửi vào tài khoản Minecraft.
              </p>


            </div>

          </div>


        </div>

      </section>

    </main>
  );
}