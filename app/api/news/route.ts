import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const result = await db.query(
      `
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
      `
    );

    return NextResponse.json(result.rows);

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
