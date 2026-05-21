"use client";

import { useState } from "react";

interface Leccion {
  id: number;
  titulo: string;
  duracion?: string;
  es_preview: boolean;
}

interface Modulo {
  id: number;
  titulo: string;
  orden: number;
  lecciones_curso: Leccion[];
}

export default function CurriculumAccordion({ modulos }: { modulos: Modulo[] }) {
  const [abiertos, setAbiertos] = useState<Set<number>>(new Set([modulos[0]?.id]));

  function toggle(id: number) {
    setAbiertos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {modulos.map((modulo, idx) => {
        const abierto = abiertos.has(modulo.id);
        const lecciones = [...modulo.lecciones_curso].sort((a, b) => a.id - b.id);
        return (
          <div key={modulo.id} style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 8, overflow: "hidden" }}>
            <button
              onClick={() => toggle(modulo.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                gap: 12, padding: "16px 20px", background: "transparent", border: "none",
                cursor: "pointer", textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--oro)", minWidth: 20 }}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--texto)" }}>{modulo.titulo}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                <span style={{ fontSize: 12, color: "var(--texto-suave)" }}>{lecciones.length} lecciones</span>
                <span style={{
                  color: "var(--texto-suave)", fontSize: 12,
                  transition: "transform 0.2s", display: "inline-block",
                  transform: abierto ? "rotate(180deg)" : "rotate(0deg)"
                }}>▾</span>
              </div>
            </button>

            {abierto && (
              <div style={{ borderTop: "1px solid var(--borde)" }}>
                {lecciones.map((leccion, i) => (
                  <div key={leccion.id} style={{
                    padding: "12px 20px 12px 52px", display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: i < lecciones.length - 1 ? "1px solid var(--borde)" : "none",
                  }}>
                    <span style={{ fontSize: 13, color: "var(--texto-suave)" }}>{leccion.titulo}</span>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
                      {leccion.duracion && <span style={{ fontSize: 12, color: "var(--texto-suave)" }}>{leccion.duracion}</span>}
                      {leccion.es_preview && (
                        <span style={{ fontSize: 11, color: "var(--oro)", border: "1px solid var(--oro)", padding: "2px 8px", borderRadius: 4 }}>Preview</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
