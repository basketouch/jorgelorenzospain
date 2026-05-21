import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature") ?? "";
  const secret = process.env.LEMON_WEBHOOK_SECRET ?? "";

  // Verificar firma HMAC
  const hmac = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  if (hmac !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const eventName = payload.meta?.event_name;

  if (eventName !== "order_created") {
    return NextResponse.json({ ok: true });
  }

  const order = payload.data?.attributes;
  const orderId = payload.data?.id;
  const customerEmail = order?.user_email;
  const productSlug = payload.meta?.custom_data?.slug; // pasado en el checkout URL

  if (!customerEmail || !productSlug) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  // Buscar usuario por email
  const { data: users } = await supabase.auth.admin.listUsers();
  const user = users?.users?.find((u) => u.email === customerEmail);

  if (!user) {
    // Guardar pending — el usuario se registrará después
    console.log(`Compra pendiente: ${customerEmail} → ${productSlug}`);
    return NextResponse.json({ ok: true, pending: true });
  }

  // Buscar curso por slug
  const { data: curso } = await supabase
    .from("cursos")
    .select("id")
    .eq("slug", productSlug)
    .single();

  if (!curso) {
    return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 });
  }

  // Registrar compra
  await supabase.from("compras").upsert(
    { user_id: user.id, curso_id: curso.id, lemon_order_id: String(orderId) },
    { onConflict: "lemon_order_id" }
  );

  return NextResponse.json({ ok: true });
}
