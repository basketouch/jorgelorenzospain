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
  modulosAccesibles?: number[]; // IDs de módulos con acceso individual. Vacío = acceso completo.
}

export default function SidebarModulos({ modulos, slug, leccionActivaId, completadasIds, cursoTitulo, modulosAccesibles }: Props) {
  const completadas = new Set(completadasIds);
  const accesoCompleto = !modulosAccesibles || modulosAccesibles.length === 0;
  const accesoIds = new Set(modulosAccesibles ?? []);

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
    <div style={{ background: "var(--oscuro)", borderRight: "1px solid var(--borde)", overflowY: "auto", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "0 16px 16px", borderBottom: "1px solid var(--borde)", marginBottom: 8 }}>
        <Link href={`/cursos/${slug}`} style={{ fontSize: 12, color: "var(--texto-suave)", textDecoration: "none" }}>
          ← {cursoTitulo}
        </Link>
      </div>

      <div style={{ flex: 1 }}>
        {modulos.sort((a, b) => a.orden - b.orden).map((modulo) => {
          const tieneAcceso = accesoCompleto || accesoIds.has(modulo.id);
          const abierto = abiertos.has(modulo.id);
          const lecciones = [...modulo.lecciones_curso].sort((a, b) => a.orden - b.orden);

          if (!tieneAcceso) {
            // Módulo bloqueado
            return (
              <div key={modulo.id} style={{ marginBottom: 2, opacity: 0.4 }}>
                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "8px 16px" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--texto-suave)", lineHeight: 1.4 }}>
                    🔒 Cap. {modulo.orden} — {modulo.titulo}
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div key={modulo.id} style={{ marginBottom: 2 }}>
              <button
                onClick={() => toggle(modulo.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "8px 16px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--oro)", lineHeight: 1.4 }}>
                  Cap. {modulo.orden} — {modulo.titulo}
                </span>
                <span style={{ color: "var(--texto-suave)", fontSize: 12, flexShrink: 0, transition: "transform 0.2s", display: "inline-block", transform: abierto ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
              </button>

              {abierto && lecciones.map((l) => {
                const hecha = completadas.has(l.id);
                const activa = l.id === leccionActivaId;
                return (
                  <Link key={l.id} href={`/ver/${slug}/${l.id}`} style={{ textDecoration: "none" }}>
                    <div style={{ padding: "10px 16px", fontSize: 13, display: "flex", alignItems: "center", gap: 8, color: activa ? "var(--oro)" : "var(--texto-suave)", background: activa ? "rgba(201,168,76,0.08)" : "transparent", borderLeft: activa ? "2px solid var(--oro)" : "2px solid transparent" }}>
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

      {/* Upsell si acceso parcial */}
      {!accesoCompleto && (
        <div style={{ padding: 16, borderTop: "1px solid var(--borde)", background: "rgba(201,168,76,0.05)" }}>
          <p style={{ fontSize: 11, color: "var(--texto-suave)", marginBottom: 8, lineHeight: 1.5 }}>
            Tienes acceso a 1 módulo.<br />Desbloquea el curso completo.
          </p>
          <a
            href={`/cursos/${slug}`}
            style={{ display: "block", textAlign: "center", fontSize: 12, fontWeight: 700, background: "var(--oro)", color: "var(--negro)", padding: "8px 12px", borderRadius: 6, textDecoration: "none" }}
          >
            Ver curso completo →
          </a>
        </div>
      )}
    </div>
  );
}
