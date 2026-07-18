import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const news = await sql`
      SELECT
        id,
        title,
        content,
        image,
        author,
        category,
        created_at
      FROM news
      WHERE category IN ('news', 'update')
      ORDER BY created_at DESC
    `;

    return NextResponse.json(news);

  } catch (error) {

    console.error("NEWS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không thể tải tin tức"
      },
      {
        status: 500
      }
    );

  }
}
