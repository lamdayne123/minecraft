"use client";
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

type EventItem = {
  id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  category: string;
  created_at: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [filtered, setFiltered] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string>('Tất cả');
  const [page, setPage] = useState<number>(1);
  const eventsPerPage = 6;

  // Fetch events từ API
  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data: EventItem[]) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error('Error loading events:', e);
        setError('Không thể tải sự kiện.');
        setLoading(false);
      });
  }, []);

  // Tính toán bộ lọc và tìm kiếm
  useEffect(() => {
    let list = [...events];
    if (filter !== 'Tất cả') {
      list = list.filter(e => e.category === filter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.content.toLowerCase().includes(q)
      );
    }
    setFiltered(list);
    setPage(1);
  }, [events, filter, search]);

  // Danh sách events hiển thị (phân trang)
  const displayedEvents = useMemo(() => {
    return filtered.slice(0, page * eventsPerPage);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / eventsPerPage);

  // Hàm định dạng thời gian tương đối
  function timeAgo(dateString: string) {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000);
    if (diff < 60) return `${diff} giây trước`;
    if (diff < 3600) return `${Math.floor(diff/60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff/3600)} giờ trước`;
    const days = Math.floor(diff/86400);
    return days === 1 ? 'Hôm qua' : `${days} ngày trước`;
  }

  // Unique categories cho filter chips
  const categories = useMemo(() => {
    const cats = Array.from(new Set(events.map(e => e.category))).sort();
    return ['Tất cả', ...cats];
  }, [events]);

  // Xử lý loading và lỗi
  if (loading) {
    return (
      <div className="p-4 space-y-4 animate-pulse">
        <div className="h-64 rounded-xl bg-gray-700/20" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 rounded-lg bg-gray-700/20" />
          ))}
        </div>
      </div>
    );
  }
  if (error) {
    return <p className="p-4 text-red-500">{error}</p>;
  }

  // Featured event (chọn event đầu tiên sau khi lọc)
  const featured = filtered[0];
  const otherEvents = displayedEvents.slice(1);

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white px-4 py-8">
      {/* Hero */}
      <section className="text-center mb-8">
        <div className="text-4xl sm:text-5xl font-black">
          🎉 CRAFTOPIA EVENTS
        </div>
        <p className="mt-2 text-zinc-400">
          Sự kiện đang diễn ra • Cập nhật liên tục
        </p>
      </section>

      {/* Search và Filter */}
      <div className="mb-6 space-y-4">
        <div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Tìm sự kiện..."
            className="w-full rounded-xl border border-white/20 bg-black/50 px-4 py-2 text-white outline-none focus:border-emerald-400/50"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex-shrink-0 whitespace-nowrap rounded-full px-4 py-1 text-sm font-semibold 
                ${filter === cat 
                  ? 'bg-emerald-500 text-black' 
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Event */}
      {featured && (
        <div className="mb-8 transition-all group">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]">
            <div className="relative h-64 sm:h-[28rem]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="inline-block px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs mr-2">Hot</span>
                <span className="text-xl font-bold">{featured.title}</span>
                <div className="mt-1 text-sm text-zinc-300">
                  {featured.author} • {timeAgo(featured.created_at)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid sự kiện khác */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherEvents.map(event => (
          <div key={event.id}
            className="group bg-black/30 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 transition hover:scale-[1.01] hover:border-emerald-400/40"
          >
            <div className="relative h-40">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
              <div className="absolute top-2 right-2 flex space-x-1">
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-xs rounded">New</span>
              </div>
              <div className="absolute bottom-3 left-3 text-white text-lg font-semibold">
                {event.title}
              </div>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center text-xs text-zinc-400">
                <span>{event.author}</span>
                <span className="mx-2">•</span>
                <span>{timeAgo(event.created_at)}</span>
              </div>
              <p className="text-sm text-zinc-300 line-clamp-3">{event.content}</p>
              <a href={`/events/${event.id}`} className="text-emerald-400 text-sm font-medium hover:underline">
                Xem chi tiết →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Nút Tải thêm (pagination) */}
      {page < totalPages && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setPage(p => p + 1)}
            className="inline-block bg-emerald-500 px-6 py-3 rounded-xl font-bold text-black transition hover:bg-emerald-400"
          >
            ⬇ Tải thêm sự kiện
          </button>
        </div>
      )}
    </main>
  );
}
