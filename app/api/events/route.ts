import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const events = await sql`
      SELECT
        id,
        title,
        content,
        image,
        author,
        category,
        created_at
      FROM news
      WHERE category = 'event'
      ORDER BY created_at DESC
    `;

    return NextResponse.json(events);

  } catch (error) {

    console.error("EVENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể tải sự kiện"
      },
      {
        status: 500
      }
    );

  }
}
