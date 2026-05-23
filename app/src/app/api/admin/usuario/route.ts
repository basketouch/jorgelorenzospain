import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";

export async function DELETE(req: NextRequest) {
  const { admin } = await requireAdmin();
  const { userId } = await req.json();

  if (!userId) return NextResponse.json({ error: "userId requerido" }, { status: 400 });

  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
