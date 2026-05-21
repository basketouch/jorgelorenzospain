import { createAdminClient } from "@/lib/supabase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { accessToken } = await req.json();
    if (!accessToken) return NextResponse.json({ error: "No token" }, { status: 400 });

    // Decodificar JWT para obtener user_id y session_id
    const parts = accessToken.split(".");
    if (parts.length !== 3) return NextResponse.json({ error: "Invalid token" }, { status: 400 });

    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString("utf-8"));
    const userId = payload.sub as string;
    const sessionId = payload.session_id as string;

    if (!userId || !sessionId) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

    const supabase = createAdminClient();

    // Sesión única: revocar todas las demás sesiones activas del usuario
    await supabase.rpc("revocar_otras_sesiones", {
      p_user_id: userId,
      p_session_id: sessionId,
    });

    // Registrar acceso
    await supabase.from("accesos").insert({ user_id: userId });

    return NextResponse.json({ ok: true });
  } catch {
    // No bloquear el login si algo falla
    return NextResponse.json({ ok: true });
  }
}
