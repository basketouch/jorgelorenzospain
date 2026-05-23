import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, nombre } = await req.json();

    if (!email?.trim()) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        attributes: { FIRSTNAME: nombre?.trim() ?? "" },
        listIds: [35],
        updateEnabled: true,
      }),
    });

    if (!res.ok && res.status !== 204) {
      const err = await res.text();
      console.error("Brevo error:", err);
      return NextResponse.json({ error: "Error al suscribir" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("preview-lead error:", e);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
