import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const galleryPath = path.join(process.cwd(), "public", "gallery");

    if (!fs.existsSync(galleryPath)) {
      return NextResponse.json([]);
    }

    const files = fs
      .readdirSync(galleryPath)
      .filter((file) =>
        /\.(png|jpg|jpeg|webp|gif)$/i.test(file)
      )
      .sort((a, b) => a.localeCompare(b));

    const images = files.map((file) => ({
      name: file.replace(/\.[^/.]+$/, ""),
      file,
      url: `/gallery/${file}`,
    }));

    return NextResponse.json(images);
  } catch (err) {
    console.error("Gallery API Error:", err);

    return NextResponse.json(
      { error: "Không thể đọc thư mục gallery." },
      { status: 500 }
    );
  }
}
