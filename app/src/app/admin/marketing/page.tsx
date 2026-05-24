import { createAdminClient } from "@/lib/supabase-admin";
import CampanaEditor from "./CampanaEditor";
import CampanaFormClient from "./CampanaFormClient";

export default async function MarketingPage() {
  const admin = createAdminClient();

  const [{ data: campanas }, { data: modulos }] = await Promise.all([
    admin.from("campanas_programadas").select("*, modulos(titulo, orden)").order("enviar_en"),
    admin.from("modulos").select("id, titulo, orden, fecha_apertura, fecha_cierre_venta, cursos(titulo)").order("orden"),
  ]);

  const tiposLabel: Record<string, { label: string; color: string }> = {
    apertura:     { label: "📢 Apertura",          color: "#4a9" },
    recordatorio: { label: "⏳ Recordatorio 3d",   color: "var(--oro)" },
    cierre:       { label: "🔒 Último día",         color: "#e06" },
  };

  // Agrupar por módulo para la sección de edición
  const porModulo = new Map<number, NonNullable<typeof campanas>>();
  for (const c of campanas ?? []) {
    if (!porModulo.has(c.modulo_id)) porModulo.set(c.modulo_id, []);
    porModulo.get(c.modulo_id)!.push(c);
  }

  const pendientes = (campanas ?? []).filter(c => !c.enviada);
  const enviadas = (campanas ?? []).filter(c => c.enviada);

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Marketing</h1>
        <p style={{ fontSize: 13, color: "var(--texto-suave)" }}>Emails automáticos de apertura y cierre de módulos</p>
      </div>

      {/* Generar campañas */}
      <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 12, padding: 24, marginBottom: 40 }}>
        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Generar emails para un módulo</p>
        <CampanaEditor modulos={modulos ?? []} />
      </div>

      {/* Calendario de envíos */}
      {pendientes.length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--texto-suave)", marginBottom: 16 }}>
            Calendario de envíos
          </p>
          <div style={{ position: "relative", paddingLeft: 24 }}>
            {/* Línea vertical */}
            <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, background: "var(--borde)" }} />

            {pendientes.map((c) => {
              const tipo = tiposLabel[c.tipo] ?? { label: c.tipo, color: "var(--texto-suave)" };
              const fecha = new Date(c.enviar_en);
              const fechaStr = fecha.toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" });
              const horaStr = fecha.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
              const modulo = c.modulos as unknown as { titulo: string; orden: number };
              const pasada = fecha < new Date();

              return (
                <div key={c.id} style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "flex-start", opacity: pasada && !c.activa ? 0.5 : 1 }}>
                  {/* Punto en la línea */}
                  <div style={{ width: 14, height: 14, borderRadius: "50%", background: c.activa ? tipo.color : "var(--borde)", border: `2px solid ${c.activa ? tipo.color : "var(--borde)"}`, flexShrink: 0, marginTop: 3, zIndex: 1 }} />

                  <div style={{ flex: 1, background: "var(--card)", border: `1px solid ${c.activa ? tipo.color + "66" : "var(--borde)"}`, borderRadius: 8, padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: tipo.color }}>{tipo.label}</span>
                      <span style={{ fontSize: 11, color: "var(--texto-suave)" }}>·</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--texto)" }}>{fechaStr} · {horaStr}</span>
                      {c.activa
                        ? <span style={{ fontSize: 10, fontWeight: 700, color: tipo.color, border: `1px solid ${tipo.color}`, padding: "1px 6px", borderRadius: 4 }}>Activa</span>
                        : <span style={{ fontSize: 10, color: "var(--texto-suave)", border: "1px solid var(--borde)", padding: "1px 6px", borderRadius: 4 }}>Borrador</span>
                      }
                    </div>
                    <p style={{ fontSize: 12, color: "var(--texto-suave)", marginBottom: 2 }}>Cap. {modulo?.orden} — {modulo?.titulo}</p>
                    <p style={{ fontSize: 13, color: "var(--texto)" }}>{c.asunto}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Campañas por módulo (edición) */}
      {porModulo.size === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--texto-suave)" }}>
          <p style={{ fontSize: 32, marginBottom: 12 }}>📭</p>
          <p>No hay campañas programadas aún.</p>
        </div>
      ) : (
        <>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--texto-suave)", marginBottom: 20 }}>
            Editar campañas
          </p>
          {Array.from(porModulo.entries()).map(([moduloId, cams]) => {
            if (!cams || cams.length === 0) return null;
            const modulo = cams[0].modulos as unknown as { titulo: string; orden: number };
            return (
              <div key={moduloId} style={{ marginBottom: 40 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--oro)", marginBottom: 12 }}>
                  Cap. {modulo.orden} — {modulo.titulo}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {cams.sort((a, b) => new Date(a.enviar_en).getTime() - new Date(b.enviar_en).getTime()).map((c) => {
                    const tipo = tiposLabel[c.tipo] ?? { label: c.tipo, color: "var(--texto-suave)" };
                    const fechaStr = new Date(c.enviar_en).toLocaleDateString("es-ES", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
                    return (
                      <div key={c.id} style={{
                        background: "var(--card)",
                        border: `1px solid ${c.enviada ? "#2a5" : c.activa ? tipo.color + "66" : "var(--borde)"}`,
                        borderRadius: 10, padding: 20,
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: tipo.color }}>{tipo.label}</span>
                          <span style={{ fontSize: 11, color: "var(--texto-suave)" }}>· {fechaStr}</span>
                          {c.enviada
                            ? <span style={{ fontSize: 11, fontWeight: 700, color: "#2a5", border: "1px solid #2a5", padding: "1px 8px", borderRadius: 4 }}>✓ Enviada</span>
                            : c.activa
                              ? <span style={{ fontSize: 11, fontWeight: 700, color: tipo.color, border: `1px solid ${tipo.color}`, padding: "1px 8px", borderRadius: 4 }}>Activa</span>
                              : <span style={{ fontSize: 11, color: "var(--texto-suave)", border: "1px solid var(--borde)", padding: "1px 8px", borderRadius: 4 }}>Borrador</span>
                          }
                        </div>
                        {!c.enviada && <CampanaFormClient campana={c} />}
                        {c.enviada && (
                          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--texto)" }}>{c.asunto}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* Historial enviadas */}
      {enviadas.length > 0 && (
        <div style={{ marginTop: 40, borderTop: "1px solid var(--borde)", paddingTop: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--texto-suave)", marginBottom: 16 }}>
            Historial enviadas ({enviadas.length})
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {enviadas.map((c) => {
              const tipo = tiposLabel[c.tipo] ?? { label: c.tipo, color: "var(--texto-suave)" };
              const modulo = c.modulos as unknown as { titulo: string; orden: number };
              const fechaStr = new Date(c.enviada_at ?? c.enviar_en).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
              return (
                <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: "var(--card)", borderRadius: 8, opacity: 0.7 }}>
                  <span style={{ fontSize: 11, color: tipo.color, fontWeight: 700, minWidth: 120 }}>{tipo.label}</span>
                  <span style={{ fontSize: 12, color: "var(--texto)", flex: 1 }}>{c.asunto}</span>
                  <span style={{ fontSize: 11, color: "var(--texto-suave)" }}>Cap. {modulo?.orden}</span>
                  <span style={{ fontSize: 11, color: "#4a9" }}>✓ {fechaStr}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
