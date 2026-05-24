import { createAdminClient } from "@/lib/supabase-admin";
import CampanaEditor from "./CampanaEditor";

export default async function MarketingPage() {
  const admin = createAdminClient();

  const [{ data: campanas }, { data: modulos }] = await Promise.all([
    admin.from("campanas_programadas").select("*, modulos(titulo, orden)").order("enviar_en"),
    admin.from("modulos").select("id, titulo, orden, fecha_apertura, fecha_cierre_venta, cursos(titulo)").order("orden"),
  ]);

  // Agrupar campañas por módulo
  const porModulo = new Map<number, typeof campanas>();
  for (const c of campanas ?? []) {
    const mid = c.modulo_id;
    if (!porModulo.has(mid)) porModulo.set(mid, []);
    porModulo.get(mid)!.push(c);
  }

  const tiposLabel: Record<string, string> = {
    apertura: "📢 Apertura",
    recordatorio: "⏳ Recordatorio (3 días)",
    cierre: "🔒 Último día",
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Marketing</h1>
          <p style={{ fontSize: 13, color: "var(--texto-suave)" }}>Emails automáticos de apertura y cierre de módulos</p>
        </div>
      </div>

      {/* Generar campañas por módulo */}
      <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 12, padding: 24, marginBottom: 32 }}>
        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Generar emails para un módulo</p>
        <CampanaEditor modulos={modulos ?? []} />
      </div>

      {/* Campañas programadas */}
      {porModulo.size === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--texto-suave)" }}>
          <p style={{ fontSize: 32, marginBottom: 12 }}>📭</p>
          <p>No hay campañas programadas aún.</p>
        </div>
      ) : (
        Array.from(porModulo.entries()).map(([moduloId, cams]) => {
          if (!cams || cams.length === 0) return null;
          const modulo = cams[0].modulos as unknown as { titulo: string; orden: number };
          return (
            <div key={moduloId} style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 12 }}>
                Cap. {modulo.orden} — {modulo.titulo}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {(cams ?? []).sort((a, b) => new Date(a.enviar_en).getTime() - new Date(b.enviar_en).getTime()).map((c) => (
                  <CampanaCard key={c.id} campana={c} tiposLabel={tiposLabel} />
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

function CampanaCard({ campana, tiposLabel }: { campana: Record<string, unknown>; tiposLabel: Record<string, string> }) {
  const fechaEnvio = new Date(campana.enviar_en as string).toLocaleString("es-ES", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const enviada = campana.enviada as boolean;
  const activa = campana.activa as boolean;

  return (
    <div style={{
      background: "var(--card)", border: `1px solid ${enviada ? "#2a5" : activa ? "rgba(201,168,76,0.4)" : "var(--borde)"}`,
      borderRadius: 10, padding: 20,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--texto-suave)" }}>
              {tiposLabel[campana.tipo as string] ?? campana.tipo as string}
            </span>
            <span style={{ fontSize: 11, color: "var(--texto-suave)" }}>· {fechaEnvio}</span>
            {enviada && <span style={{ fontSize: 11, fontWeight: 700, color: "#2a5", border: "1px solid #2a5", padding: "1px 8px", borderRadius: 4 }}>✓ Enviada</span>}
            {!enviada && activa && <span style={{ fontSize: 11, fontWeight: 700, color: "var(--oro)", border: "1px solid var(--oro)", padding: "1px 8px", borderRadius: 4 }}>Activa</span>}
            {!enviada && !activa && <span style={{ fontSize: 11, color: "var(--texto-suave)", border: "1px solid var(--borde)", padding: "1px 8px", borderRadius: 4 }}>Borrador</span>}
          </div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--texto)" }}>{campana.asunto as string}</p>
        </div>
      </div>
      {!enviada && <CampanaEditForm campana={campana} />}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CampanaEditForm({ campana }: { campana: Record<string, any> }) {
  return (
    <div style={{ marginTop: 8 }}>
      <form action={`/api/admin/campanas/${campana.id}`} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <CampanaFormClient campana={campana} />
      </form>
    </div>
  );
}

// Re-export client component inline to keep this file as server component
import CampanaFormClient from "./CampanaFormClient";
