import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";

export async function POST(req: NextRequest) {
  const { admin } = await requireAdmin();
  const { user_id, modulo_id, action } = await req.json();

  if (action === "grant") {
    const { error } = await admin
      .from("accesos_modulo")
      .upsert({ user_id, modulo_id }, { onConflict: "user_id,modulo_id" });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    const { error } = await admin
      .from("accesos_modulo")
      .delete()
      .eq("user_id", user_id)
      .eq("modulo_id", modulo_id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
