"use client";

import { useState } from "react";

interface Modulo {
  id: number;
  titulo: string;
  orden: number;
}

interface Props {
  userId: string;
  modulos: Modulo[];
  accesoModuloIds: number[];
}

export default function AccesoModuloPanel({ userId, modulos, accesoModuloIds }: Props) {
  const [abierto, setAbierto] = useState(false);
  const [accesos, setAccesos] = useState<Set<number>>(new Set(accesoModuloIds));
  const [loading, setLoading] = useState<number | null>(null);

  async function toggle(moduloId: number) {
    setLoading(moduloId);
    const tieneAcceso = accesos.has(moduloId);
    await fetch("/api/admin/acceso-modulo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, modulo_id: moduloId, action: tieneAcceso ? "revoke" : "grant" }),
    });
    setAccesos((prev) => {
      const next = new Set(prev);
      if (tieneAcceso) next.delete(moduloId); else next.add(moduloId);
      return next;
    });
    setLoading(null);
  }

  const count = accesos.size;

  return (
    <div>
      <button
        onClick={() => setAbierto(!abierto)}
        style={{
          fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 4,
          border: `1px solid ${count > 0 ? "#4a9" : "var(--borde)"}`,
          background: count > 0 ? "rgba(64,170,100,0.1)" : "transparent",
          color: count > 0 ? "#4a9" : "var(--texto-suave)",
          cursor: "pointer", whiteSpace: "nowrap",
        }}
      >
        {count > 0 ? `✓ ${count} módulo${count > 1 ? "s" : ""}` : "Módulos"} {abierto ? "▲" : "▼"}
      </button>

      {abierto && (
        <div style={{
          position: "absolute", zIndex: 10,
          background: "var(--card)", border: "1px solid var(--borde)",
          borderRadius: 8, padding: 16, marginTop: 6,
          minWidth: 260, boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--texto-suave)", marginBottom: 10 }}>
            Acceso por módulo
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {modulos.sort((a, b) => a.orden - b.orden).map((m) => {
              const tiene = accesos.has(m.id);
              return (
                <div key={m.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <span style={{ fontSize: 12, color: tiene ? "var(--texto)" : "var(--texto-suave)" }}>
                    {String(m.orden).padStart(2, "0")}. {m.titulo}
                  </span>
                  <button
                    onClick={() => toggle(m.id)}
                    disabled={loading === m.id}
                    style={{
                      fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4, flexShrink: 0,
                      border: `1px solid ${tiene ? "#4a9" : "var(--borde)"}`,
                      background: tiene ? "rgba(64,170,100,0.15)" : "transparent",
                      color: tiene ? "#4a9" : "var(--texto-suave)",
                      cursor: "pointer",
                    }}
                  >
                    {loading === m.id ? "..." : tiene ? "✓ Activo" : "+ Dar"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
