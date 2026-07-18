import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  return NextResponse.json({
    status: "API is running",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.secret !== process.env.API_SECRET) {
      return NextResponse.json(
        {
          success: false,
          message: "Wrong secret",
        },
        {
          status: 401,
        }
      );
    }

    // Xóa dữ liệu cũ
    await sql`DELETE FROM baltop`;

    // Thêm top mới
    for (const player of body.players ?? []) {
      await sql`
        INSERT INTO baltop (
          player,
          money,
          updated_at
        )
        VALUES (
          ${player.player},
          ${Number(player.money)},
          NOW()
        )
      `;
    }

    return NextResponse.json({
      success: true,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: String(err),
      },
      {
        status: 500,
      }
    );
  }
}
