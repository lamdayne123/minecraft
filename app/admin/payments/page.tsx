import fs from "fs";
import path from "path";

export default function PaymentsPage() {

  const filePath = path.join(
    process.cwd(),
    "data/payments.json"
  );


  let payments = [];


  if (fs.existsSync(filePath)) {
    payments = JSON.parse(
      fs.readFileSync(filePath, "utf8")
    );
  }


  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <section className="mx-auto max-w-7xl px-6 py-16">

        <h1 className="mb-10 text-center text-5xl font-black text-green-400">
          📜 Lịch sử nạp thẻ
        </h1>


        <div className="overflow-x-auto rounded-3xl border border-zinc-800 bg-zinc-900">

          <table className="w-full text-left">

            <thead className="border-b border-zinc-800 bg-zinc-800">

              <tr>

                <th className="p-4">
                  Minecraft
                </th>

                <th className="p-4">
                  Nhà mạng
                </th>

                <th className="p-4">
                  Mệnh giá
                </th>

                <th className="p-4">
                  Trạng thái
                </th>

                <th className="p-4">
                  Thời gian
                </th>

              </tr>

            </thead>


            <tbody>


              {payments.length === 0 ? (

                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-zinc-500"
                  >
                    Chưa có lượt nạp nào
                  </td>
                </tr>


              ) : (


                payments.reverse().map(
                  (payment:any, index:number)=>(

                  <tr
                    key={index}
                    className="border-b border-zinc-800 hover:bg-zinc-800/50"
                  >

                    <td className="p-4 font-bold">
                      {payment.minecraft || "Không có"}
                    </td>


                    <td className="p-4">
                      {payment.telco}
                    </td>


                    <td className="p-4 text-green-400 font-bold">
                      {Number(payment.amount).toLocaleString()}đ
                    </td>


                    <td className="p-4">

                      {payment.status === 1 ? (

                        <span className="text-green-400">
                          ✅ Thành công
                        </span>

                      ) : (

                        <span className="text-red-400">
                          ❌ {payment.message}
                        </span>

                      )}

                    </td>


                    <td className="p-4 text-zinc-400">

                      {new Date(
                        payment.time
                      ).toLocaleString("vi-VN")}

                    </td>


                  </tr>

                ))

              )}


            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}