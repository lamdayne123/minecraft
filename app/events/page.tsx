// Ví dụ cấu trúc chính của trang EventsPage (React + Tailwind)
export default function EventsPage() {
  // state: events, filtered list, loading, error, search, filter, page...
  // (như code mẫu ban đầu)
  // ...fetch từ API /api/events trong useEffect một lần...

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white px-4 py-8">
      {/* Hero */}
      <section className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-black">🎉 CRAFTOPIA EVENTS</h1>
        <p className="mt-2 text-zinc-400">Sự kiện đang diễn ra • Cập nhật liên tục</p>
      </section>

      {/* Search & Filter */}
      <div className="mb-6 space-y-4">
        <input
          type="text" value={search} onChange={...}
          placeholder="🔍 Tìm sự kiện..."
          className="w-full rounded-xl border border-white/20 bg-black/50 px-4 py-2 text-white 
                     focus:border-emerald-400/50"
        />
        <div className="flex space-x-2 overflow-x-auto py-1">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`flex-shrink-0 whitespace-nowrap px-4 py-1 rounded-full text-sm font-semibold 
                ${filter===cat ? 'bg-emerald-500 text-black' : 'bg-white/5 text-zinc-300 hover:bg-white/10'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Event */}
      {featured && (
        <div className="mb-8 transition-all group">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 
                          bg-black/50 backdrop-blur-xl shadow-lg hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]">
            <div className="p-6">
              <span className="inline-block px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs mr-2">Hot</span>
              <h2 className="mt-4 text-2xl font-black">{featured.title}</h2>
              <p className="mt-2 text-zinc-300">{featured.content}</p>
              <div className="mt-4 text-sm text-zinc-400">
                {featured.author} • {timeAgo(featured.created_at)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid các sự kiện khác */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedEvents.slice(1).map(event => (
          <div key={event.id}
               className="group bg-black/30 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10
                          transition hover:scale-105 hover:border-emerald-400/40">
            <div className="p-4">
              <div className="flex items-center mb-2 space-x-2">
                {/* Ví dụ badge theo category */}
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-xs rounded">New</span>
                <h3 className="text-lg font-semibold text-white">{event.title}</h3>
              </div>
              <div className="flex items-center text-xs text-zinc-400 mb-1">
                <span>{event.author}</span>
                <span className="mx-2">•</span>
                <span>{timeAgo(event.created_at)}</span>
              </div>
              <p className="text-sm text-zinc-300 line-clamp-3">{event.content}</p>
              <a href={`/events/${event.id}`} className="mt-2 inline-block text-emerald-400 text-sm font-medium hover:underline">
                Xem chi tiết →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Nút tải thêm */}
      {page < totalPages && (
        <div className="mt-8 text-center">
          <button onClick={() => setPage(p=>p+1)}
                  className="inline-block bg-emerald-500 px-6 py-3 rounded-xl font-bold text-black 
                             hover:bg-emerald-400 transition">
            ⬇ Tải thêm sự kiện
          </button>
        </div>
      )}
    </main>
  );
}
