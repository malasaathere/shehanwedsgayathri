import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; }
  catch { return NextResponse.json({ message: "Please check your details and try again." }, { status: 400 }); }

  if (body.website) return NextResponse.json({ ok: true });
  const name = String(body.name ?? "").trim().slice(0, 80);
  const telephone = String(body.telephone ?? "").trim().slice(0, 20);
  const count = Number(body.count);
  if (name.length < 2 || telephone.length < 7 || !Number.isInteger(count) || count < 1 || count > 20) {
    return NextResponse.json({ message: "Please enter a valid name, telephone number, and guest count." }, { status: 400 });
  }

  const sheetUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL;
  if (!sheetUrl) return NextResponse.json({ needsSetup: true, message: "The Google Sheet connection still needs to be configured." }, { status: 503 });

  try {
    const response = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ name, telephone, count, submittedAt: new Date().toISOString() }),
      redirect: "follow",
    });
    if (!response.ok) throw new Error("Sheet error");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "We could not save your response. Please try again." }, { status: 502 });
  }
}
