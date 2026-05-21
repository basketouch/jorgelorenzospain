"use client";

import { useState } from "react";
import Link from "next/link";

interface Leccion {
  id: number;
  titulo: string;
  duracion?: string;
  orden: number;
}

interface Modulo {
  id: number;
  titulo: string;
  orden: number;
  lecciones_curso: Leccion[];
}

interface Props {
  modulos: Modulo[];
  slug: string;
  completadas: number[];
}

export default function ModuloAccordion({ modulos, slug, completadas }: Props) {
  const completadasSet = new Set(completadas);
  const ultimoModulo = modulos[modulos.length - 1];
  const [abiertos, setAbiertos] = useState<Set<number>>(new Set(ultimoModulo ? [ultimoModulo.id] : []));

  function toggle(id: number) {
    setAbiertos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <>
      {modulos.map((modulo) => {
        const abierto = abiertos.has(modulo.id);
        const lecciones = [...modulo.lecciones_curso].sort((a, b) => a.orden - b.orden);
        const total = lecciones.length;
        const hechas = lecciones.filter((l) => completadasSet.has(l.id)).length;

        return (
          <div key={modulo.id} style={{ marginBottom: 12 }}>
            {/* Cabecera del módulo */}
            <button
              onClick={() => toggle(modulo.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "14px 20px",
                background: "var(--card)",
                border: "1px solid var(--borde)",
                borderRadius: abierto ? "8px 8px 0 0" : 8,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--oro)" }}>
                {modulo.titulo}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                <span style={{ fontSize: 12, color: "var(--texto-suave)" }}>
                  {hechas}/{total}
                </span>
                <span style={{ color: "var(--texto-suave)", fontSize: 14, transition: "transform 0.2s", display: "inline-block", transform: abierto ? "rotate(180deg)" : "rotate(0deg)" }}>
                  ▾
                </span>
              </span>
            </button>

            {/* Lecciones */}
            {abierto && (
              <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderTop: "none", borderRadius: "0 0 8px 8px", overflow: "hidden" }}>
                {lecciones.map((leccion, i) => {
                  const hecha = completadasSet.has(leccion.id);
                  return (
                    <Link key={leccion.id} href={`/ver/${slug}/${leccion.id}`} style={{ textDecoration: "none" }}>
                      <div className="leccion-item" style={{
                        padding: "14px 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        borderBottom: i < lecciones.length - 1 ? "1px solid var(--borde)" : "none",
                      }}>
                        <span style={{ fontSize: 15, flexShrink: 0 }}>{hecha ? "✅" : "⬜"}</span>
                        <span style={{ fontSize: 14, color: hecha ? "var(--texto-suave)" : "var(--texto)", flex: 1 }}>{leccion.titulo}</span>
                        {leccion.duracion && (
                          <span style={{ fontSize: 12, color: "var(--texto-suave)", flexShrink: 0 }}>{leccion.duracion}</span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
