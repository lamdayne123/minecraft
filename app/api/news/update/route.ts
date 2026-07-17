import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.secret !== process.env.API_SECRET) {
      return NextResponse.json(
        { message: "Wrong secret" },
        { status: 401 }
      );
    }

    const folder = path.join(process.cwd(), "data");

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    const file = path.join(folder, "news.json");

    let news = [];

    if (fs.existsSync(file)) {
      try {
        news = JSON.parse(fs.readFileSync(file, "utf8"));
      } catch {}
    }

    news.unshift({
      id: Date.now(),
      title: body.title,
      content: body.content,
      author: body.author,
      time: new Date().toLocaleString("vi-VN")
    });

    news = news.slice(0, 20);

    fs.writeFileSync(
      file,
      JSON.stringify(news, null, 2),
      "utf8"
    );

    return NextResponse.json({ success: true });

  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}