"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Modulo {
  id: number;
  titulo: string;
  orden: number;
  fecha_apertura?: string | null;
  fecha_cierre_venta?: string | null;
  cursos: { titulo: string } | { titulo: string }[] | null;
}

export default function CampanaEditor({ modulos }: { modulos: Modulo[] }) {
  const [moduloId, setModuloId] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const modulosConFechas = modulos.filter(m => m.fecha_apertura && m.fecha_cierre_venta);

  async function generar() {
    if (!moduloId) return;
    setLoading(true);
    setMsg("");
    const res = await fetch("/api/admin/campanas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modulo_id: parseInt(moduloId) }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.ok) {
      setMsg("✓ 3 campañas generadas — revísalas y actívalas");
      router.refresh();
    } else {
      setMsg(`Error: ${data.error}`);
    }
  }

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
      <div>
        <p style={{ fontSize: 11, color: "var(--texto-suave)", marginBottom: 6 }}>Módulo</p>
        <select
          value={moduloId}
          onChange={(e) => setModuloId(e.target.value)}
          style={{ background: "var(--negro)", border: "1px solid var(--borde)", borderRadius: 6, padding: "8px 12px", color: "var(--texto)", fontSize: 13, fontFamily: "inherit", minWidth: 280 }}
        >
          <option value="">Selecciona un módulo...</option>
          {modulosConFechas.map((m) => (
            <option key={m.id} value={m.id}>
              Cap. {m.orden} — {m.titulo}
            </option>
          ))}
        </select>
        {modulos.length > modulosConFechas.length && (
          <p style={{ fontSize: 11, color: "var(--texto-suave)", marginTop: 4 }}>
            {modulos.length - modulosConFechas.length} módulos sin fechas configuradas
          </p>
        )}
      </div>
      <button
        onClick={generar}
        disabled={!moduloId || loading}
        className="btn-primary"
        style={{ fontSize: 13, padding: "8px 20px", border: "none", cursor: "pointer" }}
      >
        {loading ? "..." : "📧 Generar 3 emails"}
      </button>
      {msg && <p style={{ fontSize: 13, color: msg.startsWith("✓") ? "#4a9" : "#e06" }}>{msg}</p>}
    </div>
  );
}
