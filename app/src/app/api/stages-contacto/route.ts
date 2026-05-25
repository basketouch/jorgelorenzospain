import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const SENDER = { name: "Jorge Lorenzo Coach", email: "info@jorgelorenzo.coach" };

export async function POST(req: NextRequest) {
  const { nombre, email, club, pais, jugadores, fechas, mensaje } = await req.json();

  if (!nombre || !email || !club) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const contenidoAdmin = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#111;color:#e8e8e8;padding:32px;border-radius:8px;">
      <p style="font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#c9a84c;margin-bottom:4px;">NUEVA CONSULTA · STAGES SPAIN</p>
      <h2 style="font-size:22px;margin-bottom:24px;color:#fff;">${nombre} — ${club}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${[
          ["Nombre", nombre],
          ["Email", email],
          ["Club / Equipo", club],
          ["País de origen", pais || "—"],
          ["Nº de jugadores", jugadores || "—"],
          ["Fechas", fechas || "—"],
        ].map(([k, v]) => `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #242830;color:#8a8f9a;width:160px;vertical-align:top;">${k}</td>
            <td style="padding:10px 0;border-bottom:1px solid #242830;color:#e8e8e8;font-weight:600;">${v}</td>
          </tr>
        `).join("")}
      </table>
      ${mensaje ? `
        <div style="margin-top:24px;">
          <p style="font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#8a8f9a;margin-bottom:8px;">Mensaje</p>
          <p style="font-size:14px;color:#e8e8e8;line-height:1.7;background:#16191f;border:1px solid #242830;border-radius:6px;padding:16px;">${mensaje.replace(/\n/g, "<br/>")}</p>
        </div>
      ` : ""}
      <div style="margin-top:24px;">
        <a href="mailto:${email}" style="display:inline-block;background:#c9a84c;color:#0a0a0a;font-size:13px;font-weight:700;text-decoration:none;padding:10px 20px;border-radius:4px;">
          Responder a ${nombre} →
        </a>
      </div>
    </div>
  `;

  const confirmacionHtml = `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8"><title>Consulta recibida — Stages Spain</title></head>
    <body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <div style="max-width:580px;margin:0 auto;padding:40px 24px;">
        <p style="font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#c9a84c;margin-bottom:8px;">STAGES SPAIN · JORGE LORENZO COACH</p>
        <h1 style="font-size:28px;font-weight:800;color:#fff;margin-bottom:16px;">Consulta recibida, ${nombre.split(" ")[0]}.</h1>
        <p style="font-size:15px;color:#8a8f9a;line-height:1.7;margin-bottom:24px;">
          Hemos recibido vuestra solicitud para <strong style="color:#e8e8e8;">${club}</strong>.
          En menos de 48 horas os preparamos una propuesta personalizada.
        </p>
        <div style="background:#16191f;border:1px solid #242830;border-radius:8px;padding:24px;margin-bottom:32px;">
          <p style="font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#8a8f9a;margin-bottom:12px;">Resumen de vuestra consulta</p>
          <p style="font-size:14px;color:#e8e8e8;margin-bottom:4px;">📍 Sedes disponibles: Málaga, Madrid y Valencia</p>
          ${jugadores ? `<p style="font-size:14px;color:#e8e8e8;margin-bottom:4px;">👥 ${jugadores} jugadores</p>` : ""}
          ${fechas ? `<p style="font-size:14px;color:#e8e8e8;margin-bottom:4px;">📅 ${fechas}</p>` : ""}
        </div>
        <p style="font-size:14px;color:#8a8f9a;line-height:1.7;">
          Si necesitáis contactar directamente:<br/>
          <a href="mailto:info@jorgelorenzo.coach" style="color:#c9a84c;">info@jorgelorenzo.coach</a> · +34 666 136 257
        </p>
        <div style="margin-top:40px;padding-top:24px;border-top:1px solid #242830;">
          <p style="font-size:12px;color:#8a8f9a;">© 2025 Jorge Lorenzo Coach · <a href="https://jorgelorenzo.coach" style="color:#c9a84c;text-decoration:none;">jorgelorenzo.coach</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    // Email al admin
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: SENDER,
        to: [{ email: "info@jorgelorenzo.coach", name: "Jorge Lorenzo" }],
        replyTo: { email, name: nombre },
        subject: `🏀 Stages Spain — Consulta de ${nombre} (${club})`,
        htmlContent: contenidoAdmin,
      }),
    });

    // Confirmación al cliente
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: SENDER,
        to: [{ email, name: nombre }],
        subject: "Hemos recibido vuestra consulta — Stages Spain",
        htmlContent: confirmacionHtml,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error enviando email stages:", err);
    return NextResponse.json({ error: "Error de envío" }, { status: 500 });
  }
}
