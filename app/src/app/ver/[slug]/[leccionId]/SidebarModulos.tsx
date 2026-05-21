"use client";

import { useState } from "react";
import Link from "next/link";

interface Leccion {
  id: number;
  titulo: string;
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
  leccionActivaId: number;
  completadasIds: number[];
  cursoTitulo: string;
}

export default function SidebarModulos({ modulos, slug, leccionActivaId, completadasIds, cursoTitulo }: Props) {
  const completadas = new Set(completadasIds);

  // Solo el módulo que contiene la lección activa empieza abierto
  const moduloActivo = modulos.find((m) =>
    m.lecciones_curso.some((l) => l.id === leccionActivaId)
  );
  const [abiertos, setAbiertos] = useState<Set<number>>(
    new Set(moduloActivo ? [moduloActivo.id] : [])
  );

  function toggle(id: number) {
    setAbiertos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div style={{ background: "var(--oscuro)", borderRight: "1px solid var(--borde)", overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "0 16px 16px", borderBottom: "1px solid var(--borde)", marginBottom: 8 }}>
        <Link href={`/ver/${slug}`} style={{ fontSize: 12, color: "var(--texto-suave)", textDecoration: "none" }}>
          ← {cursoTitulo}
        </Link>
      </div>

      {modulos.sort((a, b) => a.orden - b.orden).map((modulo) => {
        const abierto = abiertos.has(modulo.id);
        const lecciones = [...modulo.lecciones_curso].sort((a, b) => a.orden - b.orden);

        return (
          <div key={modulo.id} style={{ marginBottom: 2 }}>
            {/* Cabecera del módulo */}
            <button
              onClick={() => toggle(modulo.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                padding: "8px 16px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--oro)", lineHeight: 1.4 }}>
                {modulo.titulo}
              </span>
              <span style={{
                color: "var(--texto-suave)", fontSize: 12, flexShrink: 0,
                transition: "transform 0.2s", display: "inline-block",
                transform: abierto ? "rotate(180deg)" : "rotate(0deg)"
              }}>▾</span>
            </button>

            {/* Lecciones */}
            {abierto && lecciones.map((l) => {
              const hecha = completadas.has(l.id);
              const activa = l.id === leccionActivaId;
              return (
                <Link key={l.id} href={`/ver/${slug}/${l.id}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    padding: "10px 16px", fontSize: 13, display: "flex", alignItems: "center", gap: 8,
                    color: activa ? "var(--oro)" : "var(--texto-suave)",
                    background: activa ? "rgba(201,168,76,0.08)" : "transparent",
                    borderLeft: activa ? "2px solid var(--oro)" : "2px solid transparent",
                  }}>
                    <span style={{ flexShrink: 0, fontSize: 11 }}>{hecha ? "✅" : "⬜"}</span>
                    <span>{l.titulo}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
