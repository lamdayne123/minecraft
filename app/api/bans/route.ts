import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

type BanRow = {
  id: number;
  uuid: string;
  ip: string | null;
  reason: string | null;
  banned_by_name: string | null;
  banned_by_uuid: string | null;
  time: string | number | null;
  until: string | number | null;
  removed_by_name: string | null;
  removed_by_uuid: string | null;
  removed_by_reason: string | null;
  removed_by_date: string | number | null;
  server_origin: string | null;
  server_scope: string | null;
  silent: boolean;
  ipban: boolean;
  name: string | null;
  template: boolean | null;
};

const DATABASE_URL = process.env.DATABASE_URL;
const API_SECRET = process.env.API_SECRET;

if (!DATABASE_URL) {
  throw new Error("Missing DATABASE_URL");
}

const sql = neon(DATABASE_URL);

function toNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const num = typeof value === "string" ? Number(value) : value;
  return Number.isFinite(num) ? num : 0;
}

function normalizeBan(row: BanRow) {
  return {
    id: row.id,
    uuid: row.uuid,
    ip: row.ip,
    reason: row.reason,
    banned_by_name: row.banned_by_name,
    banned_by_uuid: row.banned_by_uuid,
    time: toNumber(row.time),
    until: toNumber(row.until),
    removed_by_name: row.removed_by_name,
    removed_by_uuid: row.removed_by_uuid,
    removed_by_reason: row.removed_by_reason,
    removed_by_date: row.removed_by_date ? toNumber(row.removed_by_date) : null,
    server_origin: row.server_origin,
    server_scope: row.server_scope,
    silent: Boolean(row.silent),
    ipban: Boolean(row.ipban),
    name: row.name,
    template: Boolean(row.template),
  };
}

export async function GET() {
  try {
    const bans = await sql<BanRow[]>`
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

    return NextResponse.json(bans.map(normalizeBan));
  } catch (err) {
    console.error("GET /api/bans error:", err);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!API_SECRET) {
      return NextResponse.json(
        { success: false, message: "Missing API_SECRET" },
        { status: 500 }
      );
    }

    const body = await req.json();

    if (body.secret !== API_SECRET) {
      return NextResponse.json(
        {
          success: false,
          message: "Wrong secret",
        },
        { status: 401 }
      );
    }

    const bans: BanRow[] = Array.isArray(body.bans) ? body.bans : [];

    await sql`DELETE FROM litebans_bans`;

    for (const ban of bans) {
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
          ${toNumber(ban.time)},
          ${toNumber(ban.until)},
          ${ban.removed_by_name ?? null},
          ${ban.removed_by_uuid ?? null},
          ${ban.removed_by_reason ?? null},
          ${ban.removed_by_date ? toNumber(ban.removed_by_date) : null},
          ${ban.server_origin ?? null},
          ${ban.server_scope ?? null},
          ${Boolean(ban.silent)},
          ${Boolean(ban.ipban)},
          ${ban.name ?? null},
          ${Boolean(ban.template)}
        )
      `;
    }

    return NextResponse.json({
      success: true,
      count: bans.length,
    });
  } catch (err) {
    console.error("POST /api/bans error:", err);

    return NextResponse.json(
      {
        success: false,
        error: String(err),
      },
      { status: 500 }
    );
  }
}
