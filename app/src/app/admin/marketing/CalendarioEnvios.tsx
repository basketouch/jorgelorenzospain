"use client";

interface Campana {
  id: string;
  enviar_en: string;
  tipo: string;
  asunto: string;
  activa: boolean;
  enviada: boolean;
}

const TIPO_COLOR: Record<string, string> = {
  apertura: "#4a9",
  recordatorio: "#c9a84c",
  cierre: "#e06",
};

function getMeses(campanas: Campana[]) {
  const meses = new Set<string>();
  const ahora = new Date();
  meses.add(`${ahora.getFullYear()}-${ahora.getMonth()}`);
  for (const c of campanas) {
    const d = new Date(c.enviar_en);
    meses.add(`${d.getFullYear()}-${d.getMonth()}`);
  }
  return Array.from(meses).sort().slice(0, 3); // máx 3 meses
}

export default function CalendarioEnvios({ campanas }: { campanas: Campana[] }) {
  const pendientes = campanas.filter(c => !c.enviada);
  const meses = getMeses(pendientes);

  // Agrupar campañas por día "YYYY-MM-DD"
  const porDia = new Map<string, Campana[]>();
  for (const c of pendientes) {
    const d = new Date(c.enviar_en);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (!porDia.has(key)) porDia.set(key, []);
    porDia.get(key)!.push(c);
  }

  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      {meses.map((mesKey) => {
        const [year, month] = mesKey.split("-").map(Number);
        return <MesCalendario key={mesKey} year={year} month={month} porDia={porDia} />;
      })}
    </div>
  );
}

function MesCalendario({ year, month, porDia }: { year: number; month: number; porDia: Map<string, Campana[]> }) {
  const nombreMes = new Date(year, month, 1).toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  const primerDia = new Date(year, month, 1).getDay(); // 0=dom
  const diasEnMes = new Date(year, month + 1, 0).getDate();
  const hoy = new Date();

  // Ajustar para lunes como primer día
  const offset = primerDia === 0 ? 6 : primerDia - 1;
  const celdas = Array(offset).fill(null).concat(Array.from({ length: diasEnMes }, (_, i) => i + 1));
  while (celdas.length % 7 !== 0) celdas.push(null);

  const dias = ["L", "M", "X", "J", "V", "S", "D"];

  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 10, padding: 16, minWidth: 240 }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--texto)", marginBottom: 12, textTransform: "capitalize" }}>
        {nombreMes}
      </p>

      {/* Cabecera días */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 4 }}>
        {dias.map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: 9, fontWeight: 700, color: "var(--texto-suave)", padding: "2px 0" }}>{d}</div>
        ))}
      </div>

      {/* Semanas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {celdas.map((dia, i) => {
          if (!dia) return <div key={i} />;

          const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
          const cams = porDia.get(key) ?? [];
          const esHoy = hoy.getFullYear() === year && hoy.getMonth() === month && hoy.getDate() === dia;

          return (
            <div key={i} title={cams.map(c => c.asunto).join("\n")} style={{
              textAlign: "center", padding: "4px 2px", borderRadius: 4,
              background: esHoy ? "rgba(201,168,76,0.1)" : "transparent",
              border: esHoy ? "1px solid rgba(201,168,76,0.3)" : "1px solid transparent",
              cursor: cams.length ? "pointer" : "default",
            }}>
              <span style={{ fontSize: 11, color: esHoy ? "var(--oro)" : "var(--texto-suave)", fontWeight: esHoy ? 700 : 400 }}>
                {dia}
              </span>
              {/* Puntos de campañas */}
              {cams.length > 0 && (
                <div style={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 2 }}>
                  {cams.slice(0, 3).map((c, j) => (
                    <div key={j} style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: c.activa ? TIPO_COLOR[c.tipo] ?? "var(--oro)" : "var(--borde)",
                    }} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Leyenda */}
      <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid var(--borde)", display: "flex", gap: 10, flexWrap: "wrap" }}>
        {Object.entries(TIPO_COLOR).map(([tipo, color]) => (
          <div key={tipo} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
            <span style={{ fontSize: 9, color: "var(--texto-suave)", textTransform: "capitalize" }}>{tipo}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--borde)" }} />
          <span style={{ fontSize: 9, color: "var(--texto-suave)" }}>borrador</span>
        </div>
      </div>
    </div>
  );
}
