```ts
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

type DbBit = string | number | boolean | null | undefined;
type DbNumber = string | number | null | undefined;
type DbDate = string | number | Date | null | undefined;

type RawBanRow = {
  id: number;
  uuid: string;
  name: string | null;

  ip: string | null;
  reason: string | null;

  banned_by_uuid: string | null;
  banned_by_name: string | null;

  removed_by_uuid: string | null;
  removed_by_name: string | null;
  removed_by_reason: string | null;
  removed_by_date: DbDate;

  time: DbNumber;
  until: DbNumber;

  template: DbNumber;
  server_scope: string | null;
  server_origin: string | null;

  silent: DbBit;
  ipban: DbBit;
  ipban_wildcard: DbBit;
  active: DbBit;
};

type IncomingBan = {
  id: number | string;
  uuid: string;
  ip?: string | null;
  reason?: string | null;
  banned_by_uuid?: string | null;
  banned_by_name?: string | null;
  removed_by_uuid?: string | null;
  removed_by_name?: string | null;
  removed_by_reason?: string | null;
  removed_by_date?: DbDate;
  time?: DbNumber;
  until?: DbNumber;
  template?: DbNumber;
  server_scope?: string | null;
  server_origin?: string | null;
  silent?: DbBit;
  ipban?: DbBit;
  ipban_wildcard?: DbBit;
  active?: DbBit;
};

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

function toNumber(value: DbNumber): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toBooleanBit(value: DbBit): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;

  const v = String(value).trim().toLowerCase();
  return v === "1" || v === "t" || v === "true" || v === "b'1'" || v === "'1'";
}

function toDbBit(value: DbBit): string {
  return toBooleanBit(value) ? "1" : "0";
}

function toDbSmallInt(value: DbNumber, fallback = 0): number {
  const n = toNumber(value);
  return Number.isFinite(n) ? n : fallback;
}

function toDbTimestamp(value: DbDate): Date | null {
  if (value === null || value === undefined || value === "") return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;

  if (typeof value === "number") {
    if (!Number.isFinite(value) || value <= 0) return null;
    return new Date(value);
  }

  const trimmed = String(value).trim();
  if (!trimmed) return null;

  const numeric = Number(trimmed);
  if (Number.isFinite(numeric) && /^\d+$/.test(trimmed)) {
    return new Date(numeric);
  }

  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function normalizeRemovedDate(value: DbDate): number | null {
  const ts = toDbTimestamp(value);
  return ts ? ts.getTime() : null;
}

function normalizeRow(row: RawBanRow) {
  return {
    id: row.id,
    uuid: row.uuid,
    name: row.name,

    ip: row.ip,
    reason: row.reason,

    banned_by_uuid: row.banned_by_uuid,
    banned_by_name: row.banned_by_name,

    removed_by_uuid: row.removed_by_uuid,
    removed_by_name: row.removed_by_name,
    removed_by_reason: row.removed_by_reason,
    removed_by_date: normalizeRemovedDate(row.removed_by_date),

    time: toNumber(row.time),
    until: toNumber(row.until),

    template: toDbSmallInt(row.template) !== 0,

    server_scope: row.server_scope,
    server_origin: row.server_origin,

    silent: toBooleanBit(row.silent),
    ipban: toBooleanBit(row.ipban),
    ipban_wildcard: toBooleanBit(row.ipban_wildcard),
    active: toBooleanBit(row.active),
  };
}

export async function GET() {
  try {
    const sql = getSql();
    if (!sql) {
      return NextResponse.json(
        { success: false, error: "Missing DATABASE_URL" },
        { status: 500 }
      );
    }

    const rows = (await sql`
      SELECT
        b.id,
        b.uuid,
        h.name,
        b.ip,
        b.reason,
        b.banned_by_uuid,
        b.banned_by_name,
        b.removed_by_uuid,
        b.removed_by_name,
        b.removed_by_reason,
        b.removed_by_date,
        b.time,
        b.until,
        b.template,
        b.server_scope,
        b.server_origin,
        b.silent,
        b.ipban,
        b.ipban_wildcard,
        b.active
      FROM litebans_bans b
      LEFT JOIN LATERAL (
        SELECT lh.name
        FROM litebans_history lh
        WHERE lh.uuid = b.uuid
        ORDER BY lh.date DESC, lh.id DESC
        LIMIT 1
      ) h ON true
      ORDER BY b.time DESC, b.id DESC
    `) as RawBanRow[];

    return NextResponse.json(rows.map(normalizeRow));
  } catch (err) {
    console.error("GET /api/bans error:", err);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const sql = getSql();
    if (!sql) {
      return NextResponse.json(
        { success: false, message: "Missing DATABASE_URL" },
        { status: 500 }
      );
    }

    const API_SECRET = process.env.API_SECRET;
    if (!API_SECRET) {
      return NextResponse.json(
        { success: false, message: "Missing API_SECRET" },
        { status: 500 }
      );
    }

    const body = await req.json();

    if (body?.secret !== API_SECRET) {
      return NextResponse.json(
        {
          success: false,
          message: "Wrong secret",
        },
        { status: 401 }
      );
    }

    const bans: IncomingBan[] = Array.isArray(body?.bans) ? body.bans : [];

    await sql`DELETE FROM litebans_bans`;

    for (const ban of bans) {
      await sql`
        INSERT INTO litebans_bans (
          id,
          uuid,
          ip,
          reason,
          banned_by_uuid,
          banned_by_name,
          removed_by_uuid,
          removed_by_name,
          removed_by_reason,
          removed_by_date,
          time,
          until,
          template,
          server_scope,
          server_origin,
          silent,
          ipban,
          ipban_wildcard,
          active
        )
        VALUES (
          ${Number(ban.id)},
          ${ban.uuid},
          ${ban.ip ?? null},
          ${ban.reason ?? null},
          ${ban.banned_by_uuid ?? null},
          ${ban.banned_by_name ?? null},
          ${ban.removed_by_uuid ?? null},
          ${ban.removed_by_name ?? null},
          ${ban.removed_by_reason ?? null},
          ${toDbTimestamp(ban.removed_by_date)},
          ${toDbSmallInt(ban.time)},
          ${toDbSmallInt(ban.until)},
          ${toDbSmallInt(ban.template, 0)},
          ${ban.server_scope ?? null},
          ${ban.server_origin ?? null},
          ${toDbBit(ban.silent)},
          ${toDbBit(ban.ipban)},
          ${toDbBit(ban.ipban_wildcard)},
          ${toDbBit(ban.active)}
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
```
