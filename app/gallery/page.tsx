"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface GalleryItem {
  id: number;
  image: string;
  title: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then(setImages);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white">
          Server Gallery
        </h1>

        <p className="mt-3 text-gray-400">
          Những khoảnh khắc đẹp nhất trong thế giới Minecraft.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((img) => (
          <div
            key={img.id}
            onClick={() => setSelected(img.image)}
            className="group relative overflow-hidden rounded-2xl cursor-pointer"
          >
            <Image
              src={img.image}
              alt={img.title}
              width={600}
              height={400}
              className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

            <div className="absolute bottom-0 left-0 p-5 opacity-0 transition group-hover:opacity-100">
              <h3 className="text-lg font-bold text-white">
                {img.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() => setSelected(null)}
        >
          <Image
            src={selected}
            alt=""
            width={1400}
            height={900}
            className="max-h-[90vh] w-auto rounded-xl"
          />
        </div>
      )}
    </section>
  );
}
