"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BanStatus = "active" | "expired" | "removed";
type BanType = "permanent" | "temporary";
type BanFilter = "all" | "permanent" | "temporary" | "removed";

interface BanRecord {
  id: number;
  uuid: string;
  ip: string | null;
  reason: string | null;
  banned_by_name: string | null;
  banned_by_uuid: string | null;
  time: string;
  until: string;
  removed_by_name: string | null;
  removed_by_uuid: string | null;
  removed_by_reason: string | null;
  removed_by_date: string | null;
  server_origin: string | null;
  server_scope: string | null;
  silent: boolean;
  ipban: boolean;
  name: string | null;
  template: boolean | null;
}

interface BanWithComputed extends BanRecord {
  status: BanStatus;
  banType: BanType;
}

const PAGE_SIZE = 20;

const FILTER_OPTIONS: { value: BanFilter; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "permanent", label: "Ban vĩnh viễn" },
  { value: "temporary", label: "Ban tạm thời" },
  { value: "removed", label: "Đã gỡ ban" },
];

function classifyBan(row: BanRecord): { status: BanStatus; banType: BanType } {
  const untilNum = Number(row.until ?? 0);
  const banType: BanType = untilNum === 0 ? "permanent" : "temporary";

  if (row.removed_by_name) return { status: "removed", banType };
  if (untilNum === 0) return { status: "active", banType };

  const now = Date.now();
  return { status: untilNum > now ? "active" : "expired", banType };
}

function maskIp(ip: string | null): string {
  if (!ip) return "Không có";
  const parts = ip.split(".");
  if (parts.length === 4) return `${parts[0]}.${parts[1]}.***.***`;
  if (ip.length > 6) {
    const half = Math.ceil(ip.length / 2);
    return `${ip.slice(0, half)}${"*".repeat(ip.length - half)}`;
  }
  return "***";
}

function formatMsDate(ms: string | null | undefined): string {
  const num = Number(ms ?? 0);
  if (!num) return "—";
  return new Date(num).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const statusConfig: Record<BanStatus, { label: string; dot: string; text: string; bg: string; border: string }> = {
  active: { label: "Active", dot: "bg-green-400", text: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/25" },
  expired: { label: "Expired", dot: "bg-red-400", text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/25" },
  removed: { label: "Removed", dot: "bg-yellow-400", text: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/25" },
};

function StatusBadge({ status }: { status: BanStatus }) {
  const c = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${c.bg} ${c.border} ${c.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

function Row({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
      <span className="shrink-0 text-zinc-500">{label}</span>
      <span className={`min-w-0 break-all text-right text-zinc-200 ${mono ? "font-mono text-xs" : ""}`}>
        {value}
      </span>
    </div>
  );
}

export default function BansPage() {
  const [allBans, setAllBans] = useState<BanWithComputed[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<BanFilter>("all");
  const [page, setPage] = useState(1);
  const [selectedBan, setSelectedBan] = useState<BanWithComputed | null>(null);

  useEffect(() => {
    async function loadBans() {
      try {
        const res = await fetch("/api/bans", { cache: "no-store" });
        const data: BanRecord[] = await res.json();
        const computed = (Array.isArray(data) ? data : []).map((row) => ({
          ...row,
          ...classifyBan(row),
        }));
        setAllBans(computed);
      } catch (err) {
        console.error("Fetch bans error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadBans();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedBan ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedBan]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return allBans.filter((ban) => {
      const matchesSearch =
        !q ||
        (ban.name ?? "").toLowerCase().includes(q) ||
        ban.uuid.toLowerCase().includes(q) ||
        (ban.reason ?? "").toLowerCase().includes(q);

      const matchesFilter =
        filter === "all" ||
        (filter === "permanent" && ban.status !== "removed" && ban.banType === "permanent") ||
        (filter === "temporary" && ban.status !== "removed" && ban.banType === "temporary") ||
        (filter === "removed" && ban.status === "removed");

      return matchesSearch && matchesFilter;
    });
  }, [allBans, search, filter]);

  useEffect(() => {
    setPage(1);
  }, [search, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main
      className="min-h-screen overflow-x-hidden bg-[#09090b] text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at top, rgba(34,197,94,0.14), transparent 36%), linear-gradient(to bottom, #09090b 0%, #0a0d0a 52%, #09090b 100%)",
      }}
    >
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="sticky top-4 z-40 pt-4">
          <div className="rounded-3xl border border-green-500/20 bg-black/75 px-4 py-3 shadow-[0_0_40px_rgba(34,197,94,0.08)] backdrop-blur-xl sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <a href="/" className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-xl bg-cover bg-center shadow-lg"
                  style={{
                    backgroundImage:
                      "url('https://cdn.modrinth.com/data/zGYJG6Zh/e3730cc2ff44ab6ce952e9b192114fcbce25dbda_96.webp')",
                  }}
                />
                <div className="leading-none">
                  <div className="text-lg font-black tracking-[0.18em] text-green-400">
                    CRAFTOPIA
                  </div>
                  <div className="text-[11px] font-semibold tracking-[0.35em] text-zinc-400">
                    SURVIVAL
                  </div>
                </div>
              </a>

              <nav className="hidden items-center gap-7 text-sm font-medium text-zinc-300 xl:flex">
                {[
                  ["TRANG CHỦ", "/"],
                  ["BALTOP", "/baltop"],
                  ["TIN TỨC", "/news"],
                  ["SỰ KIỆN", "/events"],
                  ["DANH SÁCH CẤM", "/bans"],
                ].map(([label, href]) => (
                  
                    key={href}
                    href={href}
                    className={`transition hover:text-green-400 ${
                      href === "/bans" ? "text-green-400" : ""
                    }`}
                  >
                    {label}
                  </a>
                ))}
              </nav>

              
                href="https://discord.gg/maY22mamA"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-green-400/50 bg-green-500/10 px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-green-300 hover:bg-green-500/15"
              >
                💬 DISCORD
              </a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative mt-8 overflow-hidden rounded-3xl border border-green-500/10 bg-[#18181b]/70 px-4 py-14 shadow-2xl backdrop-blur-xl sm:px-8 sm:py-18">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.10),transparent_45%)]" />
          <div className="relative z-10 text-center">
            <h1 className="mx-auto max-w-3xl bg-gradient-to-b from-white via-green-100 to-green-400 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-6xl">
              🛡️ Danh sách cấm
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-400 sm:text-base">
              Xem toàn bộ người chơi đã bị cấm khỏi máy chủ Craftopia Survival.
            </p>

            <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-5 py-2 text-sm font-bold text-green-300">
              📊 Tổng số lệnh cấm: {loading ? "..." : allBans.length.toLocaleString("vi-VN")}
            </div>
          </div>
        </section>

        {/* Search + Filter */}
        <section className="mt-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
              🔎
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên, UUID hoặc lý do..."
              className="w-full rounded-2xl border border-white/10 bg-[#18181b] py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-green-500/40"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as BanFilter)}
            className="rounded-2xl border border-white/10 bg-[#18181b] px-4 py-3.5 text-sm font-semibold text-zinc-200 outline-none transition focus:border-green-500/40 sm:w-56"
          >
            {FILTER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#18181b]">
                {opt.label}
              </option>
            ))}
          </select>
        </section>

        {/* Table (desktop) / Cards (mobile) */}
        <section className="mt-6 pb-10">
          {loading ? (
            <>
              <div className="hidden overflow-hidden rounded-3xl border border-white/10 bg-[#18181b] md:block">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[1.4fr_1.6fr_0.9fr_1fr_1fr_1fr_0.8fr_0.6fr] items-center gap-3 border-b border-white/5 px-5 py-4"
                  >
                    {Array.from({ length: 8 }).map((_, j) => (
                      <div key={j} className="h-4 w-full animate-pulse rounded-full bg-white/5" />
                    ))}
                  </div>
                ))}
              </div>
              <div className="space-y-3 md:hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="rounded-3xl border border-white/10 bg-[#18181b] p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 animate-pulse rounded-2xl bg-white/5" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-1/2 animate-pulse rounded-full bg-white/5" />
                        <div className="h-3 w-1/3 animate-pulse rounded-full bg-white/5" />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="h-3 w-full animate-pulse rounded-full bg-white/5" />
                      <div className="h-3 w-2/3 animate-pulse rounded-full bg-white/5" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : paginated.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#18181b] p-10 text-center text-zinc-400">
              Không tìm thấy lệnh cấm nào phù hợp.
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-hidden rounded-3xl border border-white/10 bg-[#18181b] shadow-2xl md:block">
                <div className="grid grid-cols-[1.4fr_1.6fr_0.9fr_1fr_1fr_1fr_0.8fr_0.6fr] gap-3 border-b border-white/10 px-5 py-4 text-xs font-black uppercase tracking-wide text-zinc-500">
                  <div>Player</div>
                  <div>Reason</div>
                  <div>Type</div>
                  <div>Staff</div>
                  <div>Ban Date</div>
                  <div>Until</div>
                  <div>Status</div>
                  <div className="text-right">Action</div>
                </div>

                <div>
                  {paginated.map((ban, i) => (
                    <motion.div
                      key={ban.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(i, 10) * 0.03 }}
                      onClick={() => setSelectedBan(ban)}
                      className="grid cursor-pointer grid-cols-[1.4fr_1.6fr_0.9fr_1fr_1fr_1fr_0.8fr_0.6fr] items-center gap-3 border-b border-white/5 px-5 py-4 transition hover:bg-[#27272a]"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <img
                          src={`https://mc-heads.net/avatar/${ban.uuid}/64`}
                          alt={ban.name ?? ban.uuid}
                          className="h-9 w-9 shrink-0 rounded-lg border border-white/10 bg-black object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              "https://mc-heads.net/avatar/Steve/64";
                          }}
                        />
                        <span className="truncate font-semibold text-white">
                          {ban.name ?? "Unknown"}
                        </span>
                      </div>

                      <div className="truncate text-sm text-zinc-400" title={ban.reason ?? ""}>
                        {ban.reason ?? "Không có lý do"}
                      </div>

                      <div className="text-sm text-zinc-300">
                        {ban.banType === "permanent" ? "Vĩnh viễn" : "Tạm thời"}
                      </div>

                      <div className="truncate text-sm text-zinc-400">
                        {ban.banned_by_name ?? "Console"}
                      </div>

                      <div className="text-sm text-zinc-400">{formatMsDate(ban.time)}</div>

                      <div className="text-sm text-zinc-400">
                        {ban.banType === "permanent" ? "—" : formatMsDate(ban.until)}
                      </div>

                      <div>
                        <StatusBadge status={ban.status} />
                      </div>

                      <div className="text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBan(ban);
                          }}
                          className="rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1.5 text-xs font-bold text-green-400 transition hover:bg-green-500/20"
                        >
                          View
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile cards */}
              <div className="space-y-3 md:hidden">
                {paginated.map((ban, i) => (
                  <motion.div
                    key={ban.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(i, 10) * 0.03 }}
                    onClick={() => setSelectedBan(ban)}
                    className="rounded-3xl border border-white/10 bg-[#18181b] p-4 transition active:bg-[#27272a]"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://mc-heads.net/avatar/${ban.uuid}/64`}
                        alt={ban.name ?? ban.uuid}
                        className="h-12 w-12 rounded-2xl border border-white/10 bg-black object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "https://mc-heads.net/avatar/Steve/64";
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold text-white">
                          {ban.name ?? "Unknown"}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {ban.banType === "permanent" ? "Vĩnh viễn" : "Tạm thời"} ·{" "}
                          {formatMsDate(ban.time)}
                        </p>
                      </div>
                      <StatusBadge status={ban.status} />
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm text-zinc-400">
                      {ban.reason ?? "Không có lý do"}
                    </p>

                    <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3 text-xs text-zinc-500">
                      <span>Staff: {ban.banned_by_name ?? "Console"}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBan(ban);
                        }}
                        className="rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1.5 font-bold text-green-400"
                      >
                        View
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <section className="pb-16">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-full border border-white/10 bg-[#18181b] px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-[#27272a] disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>

              {Array.from({ length: totalPages })
                .map((_, i) => i + 1)
                .filter((p) => p >= page - 2 && p <= page + 2)
                .map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`h-10 w-10 rounded-full text-sm font-bold transition ${
                      p === page
                        ? "bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.35)]"
                        : "border border-white/10 bg-[#18181b] text-zinc-300 hover:bg-[#27272a]"
                    }`}
                  >
                    {p}
                  </button>
                ))}

              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-full border border-white/10 bg-[#18181b] px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-[#27272a] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </section>
        )}
      </div>

      {/* Modal chi tiết */}
      <AnimatePresence>
        {selectedBan && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBan(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-green-500/20 bg-[#18181b] shadow-[0_0_60px_rgba(34,197,94,0.15)]"
            >
              <div className="flex items-center justify-between border-b border-white/10 p-5">
                <h3 className="text-lg font-black text-green-400">🛡️ Chi tiết lệnh cấm</h3>
                <button
                  onClick={() => setSelectedBan(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-white/10"
                  aria-label="Đóng"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  
                    href={`https://mc-heads.net/body/${selectedBan.uuid}/200`}
                    target="_blank"
                    rel="noreferrer"
                    className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition hover:border-green-400/40"
                  >
                    <img
                      src={`https://mc-heads.net/body/${selectedBan.uuid}/200`}
                      alt={selectedBan.name ?? selectedBan.uuid}
                      className="h-40 w-auto"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://mc-heads.net/body/Steve/200";
                      }}
                    />
                  </a>
                  <h4 className="mt-4 text-xl font-black text-white">
                    {selectedBan.name ?? "Unknown"}
                  </h4>
                  <div className="mt-2">
                    <StatusBadge status={selectedBan.status} />
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  <Row label="UUID" value={selectedBan.uuid} mono />
                  <Row label="IP" value={maskIp(selectedBan.ip)} mono />
                  <Row label="Lý do" value={selectedBan.reason ?? "Không có lý do"} />
                  <Row label="Staff ban" value={selectedBan.banned_by_name ?? "Console"} />
                  <Row label="Thời gian ban" value={formatMsDate(selectedBan.time)} />
                  <Row
                    label="Thời gian hết hạn"
                    value={
                      selectedBan.banType === "permanent" ? (
                        <span className="font-black text-red-400">Permanent Ban</span>
                      ) : (
                        formatMsDate(selectedBan.until)
                      )
                    }
                  />
                  <Row label="Server" value={selectedBan.server_origin ?? "Toàn bộ server"} />
                  <Row label="Ban ID" value={`#${selectedBan.id}`} mono />

                  {selectedBan.removed_by_name && (
                    <div className="mt-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-yellow-400">
                        Đã gỡ ban
                      </p>
                      <p className="mt-2 text-zinc-300">
                        Gỡ bởi{" "}
                        <span className="font-semibold text-white">
                          {selectedBan.removed_by_name}
                        </span>{" "}
                        — {formatMsDate(selectedBan.removed_by_date)}
                      </p>
                      {selectedBan.removed_by_reason && (
                        <p className="mt-1 text-zinc-400">
                          Lý do: {selectedBan.removed_by_reason}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
