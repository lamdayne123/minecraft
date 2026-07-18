import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {

    const players = await sql`
      SELECT
        rank,
        player,
        money
      FROM baltop
      ORDER BY rank ASC
    `;

    return NextResponse.json(players);

  } catch (err) {

    console.error(err);

    return NextResponse.json([], {
      status: 500,
    });

  }
}
