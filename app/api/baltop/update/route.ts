import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  return NextResponse.json({
    status: "API is running"
  });
}

export async function POST(req: Request) {
  try {
    console.log("=== UPDATE API CALLED ===");

    const body = await req.json();

    console.log("BODY:", body);

    if (body.secret !== process.env.API_SECRET) {
      console.log("Wrong Secret");
      return NextResponse.json(
        { success: false, message: "Wrong secret" },
        { status: 401 }
      );
    }

    const folder = path.join(process.cwd(), "data");

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    const file = path.join(folder, "baltop.json");

    fs.writeFileSync(
      file,
      JSON.stringify(body.players ?? [], null, 2),
      "utf8"
    );

    console.log("Saved:", file);

    return NextResponse.json({
      success: true
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: String(err)
      },
      {
        status: 500
      }
    );
  }
}