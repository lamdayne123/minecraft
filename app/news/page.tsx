"use client";

import { useEffect, useState } from "react";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

type News = {
  id: number;
  title: string;
  content: string;
  author: string;
  image?: string;
  category: string;
  created_at: string;
};

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/news", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch(console.error)
      .finally(() => setLoaded(true));
  }, []);

  function formatDate(date: string) {
    return new Date(date).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <main
      className={`${display.variable} ${mono.variable} min-h-screen bg-[#12151a] px-4 py-14 text-[#eef0f2] sm:px-6 sm:py-20 lg:px-8`}
      style={{ fontFamily: "var(--font-display), sans-serif" }}
    >
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#f0a35e]/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-10 sm:mb-14">
