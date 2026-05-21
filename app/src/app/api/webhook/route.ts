import { createAdminClient } from "@/lib/supabase-admin";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

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
  const customerEmail = order?.user_email as string | undefined;
  const customerName = (order?.user_name as string | undefined) ?? "";
  const productSlug = payload.meta?.custom_data?.slug as string | undefined;

  if (!customerEmail || !productSlug) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Separar nombre y apellido (Lemon Squeezy devuelve nombre completo)
  const [nombre = "", ...apellidoParts] = customerName.trim().split(" ");
  const apellido = apellidoParts.join(" ");

  // Buscar o crear usuario en auth.users
  let userId: string;
  const { data: existingUsers } = await supabase.auth.admin.listUsers();
  const existingUser = existingUsers?.users?.find((u) => u.email === customerEmail);

  if (existingUser) {
    userId = existingUser.id;
  } else {
    // Crear cuenta con contraseña temporal — el usuario deberá cambiarla
    const tempPassword = crypto.randomBytes(16).toString("hex");
    const { data: newUser, error } = await supabase.auth.admin.createUser({
      email: customerEmail,
      password: tempPassword,
      email_confirm: true,
      user_metadata: { nombre, apellido },
    });
    if (error || !newUser.user) {
      console.error("Error creando usuario:", error);
      return NextResponse.json({ error: "Error creando usuario" }, { status: 500 });
    }
    userId = newUser.user.id;
    // El trigger handle_new_user crea el perfil automáticamente
  }

  // Actualizar perfil si tiene nombre (usuario existente puede no tenerlo)
  if (nombre) {
    await supabase.from("perfiles")
      .upsert({ id: userId, nombre, apellido, updated_at: new Date().toISOString() })
      .eq("id", userId);
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
    { user_id: userId, curso_id: curso.id, lemon_order_id: String(orderId) },
    { onConflict: "lemon_order_id" }
  );

  return NextResponse.json({ ok: true });
}
