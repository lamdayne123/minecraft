import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const bans = await sql`
      SELECT
        id,
        uuid,
        ip,
        reason,
        banned_by_name,
        banned_by_uuid,
        time,
        until,
        removed_by_name,
        removed_by_uuid,
        removed_by_reason,
        removed_by_date,
        server_origin,
        server_scope,
        silent,
        ipban,
        name,
        template
      FROM litebans_bans
      ORDER BY time DESC
    `;

    return NextResponse.json(bans);

  } catch (err) {

    console.error(err);

    return NextResponse.json([], {
      status: 500,
    });

  }
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

    await sql`DELETE FROM litebans_bans`;

    for (const ban of body.bans ?? []) {
      await sql`
        INSERT INTO litebans_bans (
          id,
          uuid,
          ip,
          reason,
          banned_by_name,
          banned_by_uuid,
          time,
          until,
          removed_by_name,
          removed_by_uuid,
          removed_by_reason,
          removed_by_date,
          server_origin,
          server_scope,
          silent,
          ipban,
          name,
          template
        )
        VALUES (
          ${ban.id},
          ${ban.uuid},
          ${ban.ip ?? null},
          ${ban.reason ?? null},
          ${ban.banned_by_name ?? null},
          ${ban.banned_by_uuid ?? null},
          ${ban.time},
          ${ban.until},
          ${ban.removed_by_name ?? null},
          ${ban.removed_by_uuid ?? null},
          ${ban.removed_by_reason ?? null},
          ${ban.removed_by_date ?? null},
          ${ban.server_origin ?? null},
          ${ban.server_scope ?? null},
          ${ban.silent ?? false},
          ${ban.ipban ?? false},
          ${ban.name ?? null},
          ${ban.template ?? false}
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
