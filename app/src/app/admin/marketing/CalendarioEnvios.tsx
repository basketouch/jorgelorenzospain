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
  // Ordenar por año y mes numérico (no alfabético, para evitar bug con mes >= 10)
  return Array.from(meses).sort((a, b) => {
    const [ay, am] = a.split("-").map(Number);
    const [by, bm] = b.split("-").map(Number);
    return ay !== by ? ay - by : am - bm;
  });
}

export default function CalendarioEnvios({
  campanas,
  selectedKey,
  onSelectDia,
}: {
  campanas: Campana[];
  selectedKey?: string | null;
  onSelectDia?: (key: string, ids: string[]) => void;
}) {
  const pendientes = campanas.filter(c => !c.enviada);
  const meses = getMeses(pendientes);

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
        return (
          <MesCalendario
            key={mesKey}
            year={year}
            month={month}
            porDia={porDia}
            selectedKey={selectedKey}
            onSelectDia={onSelectDia}
          />
        );
      })}
    </div>
  );
}

function MesCalendario({
  year,
  month,
  porDia,
  selectedKey,
  onSelectDia,
}: {
  year: number;
  month: number;
  porDia: Map<string, Campana[]>;
  selectedKey?: string | null;
  onSelectDia?: (key: string, ids: string[]) => void;
}) {
  const nombreMes = new Date(year, month, 1).toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  const primerDia = new Date(year, month, 1).getDay();
  const diasEnMes = new Date(year, month + 1, 0).getDate();
  const hoy = new Date();

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
          const esSeleccionado = selectedKey === key;
          const tieneCampanas = cams.length > 0;

          return (
            <div
              key={i}
              title={cams.map(c => c.asunto).join("\n")}
              onClick={() => tieneCampanas && onSelectDia?.(key, cams.map(c => c.id))}
              style={{
                textAlign: "center",
                padding: "4px 2px",
                borderRadius: 4,
                background: esSeleccionado
                  ? "rgba(201,168,76,0.2)"
                  : esHoy
                    ? "rgba(201,168,76,0.08)"
                    : "transparent",
                border: esSeleccionado
                  ? "1px solid var(--oro)"
                  : esHoy
                    ? "1px solid rgba(201,168,76,0.3)"
                    : "1px solid transparent",
                cursor: tieneCampanas ? "pointer" : "default",
                transition: "background 0.12s, border-color 0.12s",
              }}
            >
              <span style={{
                fontSize: 11,
                color: esSeleccionado ? "var(--oro)" : esHoy ? "var(--oro)" : "var(--texto-suave)",
                fontWeight: esSeleccionado || esHoy ? 700 : 400,
              }}>
                {dia}
              </span>

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
