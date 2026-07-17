export async function GET() {
  const res = await fetch(
    "https://api.mcsrvstat.us/3/node1.zencheap.net:30263",
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return Response.json({
    online: data.online,
    players: data.players?.online ?? 0,
    max: data.players?.max ?? 0,
    version: data.version ?? "Unknown",
  });
}