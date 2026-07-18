import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {

    const baltop = await sql`
      SELECT
        player,
        money
      FROM baltop
      ORDER BY money DESC
      LIMIT 20
    `;

    return NextResponse.json(baltop);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      [],
      { status: 500 }
    );

  }
}
