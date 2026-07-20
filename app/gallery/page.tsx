"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type GalleryItem = {
  name: string;
  url: string;
};

const DEFAULT_RATIO = 4 / 3;
const AUTO_REFRESH_MS = 5 * 60 * 1000;

function isGalleryItem(value: unknown): value is GalleryItem {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return typeof record.name === "string" && typeof record.url === "string";
}

function normalizeGalleryItems(value: unknown): GalleryItem[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isGalleryItem);
}

function makeBlurDataURL(): string {
  return [
    "data:image/svg+xml;base64,",
    btoa(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 24" preserveAspectRatio="none"><rect width="32" height="24" fill="#050505"/><circle cx="7" cy="6" r="2" fill="#22c55e" fill-opacity="0.18"/><circle cx="24" cy="8" r="3" fill="#84cc16" fill-opacity="0.18"/><rect x="4" y="14" width="24" height="4" rx="2" fill="#ffffff" fill-opacity="0.04"/></svg>`,
    ),
  ].join("");
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [aspectRatios, setAspectRatios] = useState<Record<string, number>>({});
  const [loadedNames, setLoadedNames] = useState<Record<string, boolean>>({});
  const [now, setNow] = useState<string>("");
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const blurDataURL = useMemo(() => makeBlurDataURL(), []);

  const loadGallery = async () => {
    try {
      const response = await fetch("/api/gallery", { cache: "no-store" });
      const data: unknown = await response.json();
      setItems(normalizeGalleryItems(data));
    } catch (error) {
      console.error("Gallery load error:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
    const timer = window.setInterval(loadGallery, AUTO_REFRESH_MS);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      setNow(
        new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };

    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenIndex(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        setOpenIndex((current) => {
          if (current === null || items.length === 0) return current;
          return (current - 1 + items.length) % items.length;
        });
        return;
      }

      if (event.key === "ArrowRight") {
        setOpenIndex((current) => {
          if (current === null || items.length === 0) return current;
          return (current + 1) % items.length;
        });
      }
    };

    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [openIndex, items.length]);

  const currentItem = useMemo(() => {
    if (openIndex === null) return null;
    return items[openIndex] ?? null;
  }, [openIndex, items]);

  const openItem = (index: number) => setOpenIndex(index);
  const closeItem = () => setOpenIndex(null);

  const goPrev = () => {
    setOpenIndex((current) => {
      if (current === null || items.length === 0) return current;
      return (current - 1 + items.length) % items.length;
    });
  };

  const goNext = () => {
    setOpenIndex((current) => {
      if (current === null || items.length === 0) return current;
      return (current + 1) % items.length;
    });
  };

  const count = items.length;

  return (
    <main
      className="min-h-screen overflow-x-hidden text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at top, rgba(34,197,94,0.16), transparent 32%), radial-gradient(circle at 20% 20%, rgba(132,204,22,0.10), transparent 22%), radial-gradient(circle at 80% 0%, rgba(74,222,128,0.10), transparent 24%), linear-gradient(to bottom, #050505 0%, #050705 52%, #030303 100%)",
      }}
    >
      <style>{`
        @keyframes craftopia-fade-up {
          from {
            opacity: 0;
            transform: translateY(22px);
            filter: blur(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes craftopia-shimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }

        @keyframes craftopia-pulse-glow {
          0%, 100% { opacity: 0.42; transform: scale(1); }
          50% { opacity: 0.72; transform: scale(1.03); }
        }

        @keyframes craftopia-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .craftopia-card-enter {
          animation: craftopia-fade-up 0.72s ease-out both;
        }

        .craftopia-skeleton {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(39,39,42,0.55), rgba(9,9,11,0.75));
        }

        .craftopia-skeleton::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-120%);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          animation: craftopia-shimmer 1.35s ease-in-out infinite;
        }

        .craftopia-glow {
          animation: craftopia-pulse-glow 4s ease-in-out infinite;
        }

        .craftopia-float {
          animation: craftopia-float 6s ease-in-out infinite;
        }

        @media (max-width: 639px) {
          .craftopia-masonry {
            column-count: 2;
            column-gap: 0.75rem;
          }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .craftopia-masonry {
            column-count: 3;
            column-gap: 1rem;
          }
        }

        @media (min-width: 1024px) {
          .craftopia-masonry {
            column-count: 4;
            column-gap: 1.15rem;
          }
        }
      `}</style>

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-40 pt-4">
          <div className="rounded-3xl border border-emerald-500/20 bg-black/75 px-4 py-3 shadow-[0_0_40px_rgba(34,197,94,0.08)] backdrop-blur-xl sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-xl bg-cover bg-center shadow-lg"
                  style={{
                    backgroundImage:
                      "url('https://cdn.modrinth.com/data/zGYJG6Zh/e3730cc2ff44ab6ce952e9b192114fcbce25dbda_96.webp')",
                  }}
                />
                <div className="leading-none">
                  <div className="text-lg font-black tracking-[0.18em] text-emerald-400">
                    CRAFTOPIA
                  </div>
                  <div className="text-[11px] font-semibold tracking-[0.35em] text-zinc-400">
                    SURVIVAL
                  </div>
                </div>
              </Link>

              <nav className="hidden items-center gap-7 text-sm font-medium text-zinc-300 xl:flex">
                {[
                  ["TRANG CHỦ", "/"],
                  ["BALTOP", "/baltop"],
                  ["GALLERY", "/gallery"],
                  ["DONATE", "/donate"],
                  ["QUY TẮC", "/rules"],
                  ["TIN TỨC", "/news"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className={`transition hover:text-emerald-400 ${
                      href === "/gallery" ? "text-emerald-400" : ""
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <a
                href="https://discord.gg/maY22mamA"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-emerald-400/50 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-white shadow-[0_0_18px_rgba(34,197,94,0.12)] transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/15"
              >
                <span className="text-base">💬</span>
                <span>DISCORD</span>
              </a>
            </div>
          </div>
        </header>

        <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-emerald-500/10 bg-black/55 px-4 py-16 shadow-2xl sm:px-8 sm:py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="craftopia-glow absolute left-10 top-14 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(74,222,128,0.9)]" />
            <div className="craftopia-glow absolute right-16 top-16 h-3 w-3 rounded-full bg-lime-400 shadow-[0_0_24px_rgba(163,230,53,0.9)]" />
            <div className="craftopia-glow absolute left-24 top-1/2 h-2 w-2 rounded-full bg-green-300 shadow-[0_0_18px_rgba(134,239,172,0.9)]" />
            <div className="craftopia-glow absolute right-24 top-2/3 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.10),transparent_42%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.015)_50%,transparent_100%)]" />
          </div>

          <div className="relative z-10 text-center">
            <div className="craftopia-float mb-3 text-4xl">🖼</div>
            <h1 className="mx-auto max-w-4xl bg-[linear-gradient(180deg,#ffffff_10%,#f7f7f7_35%,#bafc6d_65%,#43ff4e_100%)] bg-clip-text text-5xl font-black tracking-[0.08em] text-transparent drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] sm:text-7xl">
              GALLERY
            </h1>
            <p className="mt-4 text-sm font-bold tracking-[0.18em] text-zinc-300 sm:text-lg">
              Khoảnh khắc đẹp nhất của Craftopia Survival
            </p>

            <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 rounded-[1.75rem] border border-white/10 bg-black/50 p-3 text-sm text-zinc-300 shadow-[0_0_32px_rgba(0,0,0,0.28)] backdrop-blur-md sm:grid-cols-3 sm:p-4">
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/4 px-4 py-3">
                <span>📷</span>
                <span className="font-semibold text-white">{count} ảnh</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/4 px-4 py-3">
                <span>✨</span>
                <span className="font-semibold text-white">Auto Update</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/4 px-4 py-3">
                <span>🌎</span>
                <span className="font-semibold text-white">Craftopia Survival</span>
              </div>
            </div>

            <div className="mx-auto mt-5 max-w-3xl rounded-full border border-white/10 bg-black/50 px-5 py-3 text-xs text-zinc-400 shadow-[0_0_24px_rgba(0,0,0,0.22)] backdrop-blur-md sm:text-sm">
              <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
                <span>Cập nhật lúc {now || "--:--:--"}</span>
                <span>Gallery tự làm mới mỗi 5 phút</span>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
        </section>

        <section className="mt-10 flex-1">
          {loading ? (
            <div className="craftopia-masonry">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="mb-4 break-inside-avoid">
                  <div
                    className="craftopia-skeleton rounded-[2rem] border border-white/8"
                    style={{
                      aspectRatio:
                        index % 3 === 0 ? "3 / 4" : index % 3 === 1 ? "4 / 3" : "1 / 1",
                    }}
                  >
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 px-6 py-16 text-center text-zinc-400 backdrop-blur-xl">
              Chưa có dữ liệu Gallery
            </div>
          ) : (
            <div className="craftopia-masonry">
              {items.map((item, index) => {
                const ratio = aspectRatios[item.url] ?? DEFAULT_RATIO;
                const isLoaded = loadedNames[item.url] === true;

                return (
                  <article
                    key={item.url}
                    className="mb-4 break-inside-avoid"
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    <button
                      type="button"
                      onClick={() => openItem(index)}
                      className="group relative w-full overflow-hidden rounded-[2rem] border border-emerald-500/12 bg-black/55 text-left shadow-[0_0_30px_rgba(0,0,0,0.3)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-300/30 hover:shadow-[0_0_40px_rgba(34,197,94,0.18)] focus:outline-none"
                      aria-label={`Xem ảnh ${item.name}`}
                    >
                      <div
                        className={`relative w-full overflow-hidden bg-zinc-950/90 transition duration-300 group-hover:brightness-110 ${
                          isLoaded ? "" : "craftopia-skeleton"
                        }`}
                        style={{ aspectRatio: String(ratio) }}
                      >
                        <Image
                          src={item.url}
                          alt={item.name}
                          fill
                          sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                          className="object-contain transition duration-500 ease-out group-hover:scale-[1.03]"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={blurDataURL}
                          onLoad={(event) => {
                            const width = event.currentTarget.naturalWidth;
                            const height = event.currentTarget.naturalHeight;
                            if (width > 0 && height > 0) {
                              setAspectRatios((current) => ({
                                ...current,
                                [item.url]: width / height,
                              }));
                            }
                            setLoadedNames((current) => ({
                              ...current,
                              [item.url]: true,
                            }));
                          }}
                        />

                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.12)_45%,transparent_72%)] opacity-90 transition group-hover:opacity-100" />
                        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 group-hover:bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.18),transparent_55%)]" />

                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-4 opacity-100 transition duration-300 group-hover:opacity-100 sm:p-5">
                          <div className="min-w-0">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-emerald-300 backdrop-blur-md">
                              <span>🔍</span>
                              <span>Xem ảnh</span>
                            </div>
                            <div className="mt-2 truncate text-sm font-bold text-white sm:text-base">
                              {item.name}
                            </div>
                          </div>

                          <div className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-lime-300 backdrop-blur-md">
                            Gallery
                          </div>
                        </div>
                      </div>
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <footer className="mt-10 border-t border-white/8 py-6 text-sm text-zinc-400">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>© 2025 Craftopia Survival. All rights reserved.</div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🟩</span>
              <span>IP: craftopia.zencheap.net:30263</span>
              <span className="rounded-lg border border-white/10 p-1.5">📋</span>
            </div>
          </div>
        </footer>
      </div>

      {currentItem !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-4 py-6 backdrop-blur-xl"
          onClick={closeItem}
          role="presentation"
        >
          <div
            className="relative flex w-full max-w-6xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => {
              const touch = event.touches[0];
              setTouchStart({ x: touch.clientX, y: touch.clientY });
            }}
            onTouchEnd={(event) => {
              if (!touchStart) return;

              const touch = event.changedTouches[0];
              const deltaX = touch.clientX - touchStart.x;
              const deltaY = touch.clientY - touchStart.y;

              if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                  goPrev();
                } else {
                  goNext();
                }
              }

              setTouchStart(null);
            }}
          >
            <div className="absolute right-2 top-2 z-20 flex items-center gap-2 sm:right-0 sm:top-0 sm:p-0">
              <button
                type="button"
                onClick={closeItem}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/60 text-xl text-white shadow-[0_0_30px_rgba(0,0,0,0.45)] backdrop-blur-md transition hover:scale-105 hover:bg-white/10 sm:h-12 sm:w-12 sm:text-2xl"
                aria-label="Đóng"
              >
                ×
              </button>
            </div>

            <div className="mb-3 flex w-full items-center justify-between gap-2 text-zinc-300 sm:mb-4 sm:gap-3">
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/60 text-lg shadow-[0_0_30px_rgba(0,0,0,0.45)] backdrop-blur-md transition hover:scale-105 hover:bg-white/10 sm:h-12 sm:w-12 sm:text-xl"
                aria-label="Ảnh trước"
              >
                ←
              </button>

              <div className="rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs font-semibold backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
                {openIndex !== null ? `${openIndex + 1} / ${count}` : `0 / ${count}`}
              </div>

              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/60 text-lg shadow-[0_0_30px_rgba(0,0,0,0.45)] backdrop-blur-md transition hover:scale-105 hover:bg-white/10 sm:h-12 sm:w-12 sm:text-xl"
                aria-label="Ảnh tiếp theo"
              >
                →
              </button>
            </div>

            <div className="relative w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/70 shadow-[0_0_60px_rgba(0,0,0,0.65)] sm:rounded-[2rem]">
              <div className="relative max-h-[72vh] w-full bg-black/60 sm:max-h-[78vh]">
                <Image
                  src={currentItem.url}
                  alt={currentItem.name}
                  width={2400}
                  height={1600}
                  sizes="100vw"
                  className="h-auto w-full object-contain"
                  priority
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              </div>

              <div className="border-t border-white/10 bg-black/65 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-[10px] font-bold tracking-[0.18em] text-emerald-300 sm:text-xs">
                      GALLERY
                    </div>
                    <div className="mt-1 text-base font-black text-white sm:text-2xl">
                      {currentItem.name}
                    </div>
                  </div>
                  <div className="text-xs text-zinc-400 sm:text-sm">ESC để đóng • Click nền để đóng</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
