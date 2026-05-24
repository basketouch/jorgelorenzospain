import { createAdminClient } from "@/lib/supabase-admin";
import { NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const SENDER = { name: "Jorge Lorenzo Coach", email: "info@jorgelorenzo.coach" };

function contenidoAHtml(asunto: string, texto: string, portadaUrl?: string | null): string {
  const year = new Date().getFullYear();

  const paragraphs = texto.split("\n\n").map(p => {
    const trimmed = p.trim();
    const ctaMatch = trimmed.match(/^→\s*(.+?):\s*(https?:\/\/\S+)$/);
    if (ctaMatch) {
      const label = ctaMatch[1].trim();
      const url = ctaMatch[2].trim();
      return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;">
        <tr><td align="center">
          <a href="${url}" style="display:inline-block;background:#c9a84c;color:#0a0a0a;font-size:15px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:8px;letter-spacing:0.02em;">
            ${label} →
          </a>
        </td></tr>
      </table>`;
    }
    return `<p style="margin:0 0 16px;font-size:15px;color:#aaa;line-height:1.7;">${trimmed.replace(/\n/g, "<br/>")}</p>`;
  }).join("");

  const imagenHtml = portadaUrl
    ? `<img src="${portadaUrl}" alt="" style="width:100%;border-radius:10px 10px 0 0;display:block;aspect-ratio:16/9;object-fit:cover;" />`
    : "";

  const paddingTop = portadaUrl ? "0" : "40px";

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${asunto}</title></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;min-height:100vh;">
    <tr><td align="center" style="padding:48px 24px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
        <tr><td align="center" style="padding-bottom:32px;">
          <span style="font-size:20px;font-weight:800;letter-spacing:0.08em;color:#ffffff;">
            JORGE <span style="color:#c9a84c;">LORENZO</span>
          </span>
        </td></tr>
        <tr><td style="background:#141414;border:1px solid #2a2a2a;border-radius:16px;overflow:hidden;">
          ${imagenHtml}
          <div style="padding:${paddingTop} 40px 40px;">
            <div style="width:40px;height:2px;background:#c9a84c;margin:${portadaUrl ? "32px" : "0"} 0 24px;"></div>
            ${paragraphs}
          </div>
        </td></tr>
        <tr><td align="center" style="padding-top:32px;">
          <p style="margin:0;font-size:12px;color:#444;line-height:1.6;">
            © ${year} Jorge Lorenzo Coach · Campeón del Mundo · Campeón de Europa<br>
            <a href="https://jorgelorenzo.coach" style="color:#666;text-decoration:none;">jorgelorenzo.coach</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function GET(req: Request) {
  // Vercel llama al cron con el header CRON_SECRET automáticamente
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const ahora = new Date().toISOString();

  const { data: campanas } = await admin
    .from("campanas_programadas")
    .select("*")
    .eq("activa", true)
    .eq("enviada", false)
    .lte("enviar_en", ahora);

  if (!campanas || campanas.length === 0) {
    return NextResponse.json({ ok: true, enviadas: 0 });
  }

  let enviadas = 0;

  for (const campana of campanas) {
    try {
      // Fetch portada_url from related module
      const { data: moduloData } = await admin
        .from("campanas_programadas")
        .select("modulos(portada_url)")
        .eq("id", campana.id)
        .single();
      const portadaUrl = (moduloData?.modulos as { portada_url?: string } | null)?.portada_url ?? null;

      const htmlContent = contenidoAHtml(campana.asunto, campana.contenido, portadaUrl);

      // Crear campaña en Brevo
      const createRes = await fetch("https://api.brevo.com/v3/emailCampaigns", {
        method: "POST",
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `[Auto] ${campana.asunto} — ${new Date().toLocaleDateString("es-ES")}`,
          subject: campana.asunto,
          sender: SENDER,
          type: "classic",
          htmlContent,
          recipients: { listIds: [campana.lista_brevo_id] },
        }),
      });

      const created = await createRes.json();
      if (!created.id) {
        console.error("Error creando campaña Brevo:", created);
        continue;
      }

      // Enviar inmediatamente
      await fetch(`https://api.brevo.com/v3/emailCampaigns/${created.id}/sendNow`, {
        method: "POST",
        headers: { "api-key": BREVO_API_KEY },
      });

      // Marcar como enviada
      await admin
        .from("campanas_programadas")
        .update({ enviada: true, enviada_at: new Date().toISOString(), brevo_campaign_id: created.id })
        .eq("id", campana.id);

      enviadas++;
    } catch (err) {
      console.error("Error enviando campaña", campana.id, err);
    }
  }

  return NextResponse.json({ ok: true, enviadas });
}
