export default function RulesPage() {
  const rules = [
    {
      title: "1. Tôn trọng người chơi",
      content:
        "Không xúc phạm, gây war, spam chat hoặc làm phiền người chơi khác."
    },
    {
      title: "2. Không gian lận",
      content:
        "Cấm sử dụng hack, cheat, dupe, tool hỗ trợ gian lận hoặc exploit lỗi server (dưới mọi hình thức)."
    },
    {
      title: "3. Không phá hoại",
      content:
        "Không grief, phá công trình người khác hoặc cố tình gây lag server."
    },
    {
      title: "4. Không quảng cáo",
      content:
        "Không quảng cáo server khác, link lạ hoặc nội dung không liên quan."
    },
    {
      title: "5. Tuân thủ Staff",
      content:
        "Lắng nghe hướng dẫn của Admin, Mod và Helper trong quá trình chơi."
    },
    {
      title: "6. Không gây hại server",
      content:
        "Mọi hành vi gây hại cho server sẽ bị ban vĩnh viễn."
    }
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-20">

      <div className="mx-auto max-w-4xl">

        <h1 className="text-center text-5xl font-black text-green-400">
          📜 Craftopia Rules
        </h1>

        <p className="mt-4 text-center text-zinc-400">
          Nội quy chính thức của Craftopia Survival
        </p>


        <div className="mt-12 space-y-5">

          {rules.map((rule, index) => (

            <div
              key={index}
              className="
              rounded-2xl
              border border-zinc-800
              bg-zinc-900
              p-6
              transition
              hover:border-green-500
              "
            >

              <h2 className="text-xl font-bold text-green-400">
                {rule.title}
              </h2>

              <p className="mt-3 text-zinc-300">
                {rule.content}
              </p>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}