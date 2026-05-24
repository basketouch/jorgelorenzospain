import { requireAdmin } from "@/lib/admin-guard";
import { NextRequest, NextResponse } from "next/server";

function contenidoAHtml(asunto: string, texto: string): string {
  const year = new Date().getFullYear();
  const paragraphs = texto.split("\n\n").map(p =>
    `<p style="margin:0 0 16px;font-size:15px;color:#aaa;line-height:1.7;">${p.replace(/\n/g, "<br/>")}</p>`
  ).join("");

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${asunto}</title></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;min-height:100vh;">
    <tr><td align="center" style="padding:48px 24px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
        <tr><td align="center" style="padding-bottom:40px;">
          <span style="font-size:20px;font-weight:800;letter-spacing:0.08em;color:#ffffff;">
            JORGE <span style="color:#c9a84c;">LORENZO</span>
          </span>
        </td></tr>
        <tr><td style="background:#141414;border:1px solid #2a2a2a;border-radius:16px;padding:40px;">
          <p style="margin:0 0 6px;font-size:11px;color:#666;letter-spacing:0.12em;text-transform:uppercase;">Asunto del email</p>
          <p style="margin:0 0 28px;font-size:18px;font-weight:800;color:#fff;">${asunto}</p>
          <div style="width:40px;height:2px;background:#c9a84c;margin:0 0 28px;"></div>
          ${paragraphs}
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

export async function POST(req: NextRequest) {
  await requireAdmin();
  const { asunto, contenido } = await req.json();
  const html = contenidoAHtml(asunto, contenido);
  return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
