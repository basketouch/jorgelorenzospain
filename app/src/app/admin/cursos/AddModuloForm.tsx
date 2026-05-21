"use client";

import { useState } from "react";

export default function AddModuloForm({ cursoId, nextOrden }: { cursoId: number; nextOrden: number }) {
  const [abierto, setAbierto] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(false);

  async function crear() {
    if (!titulo.trim()) return;
    setLoading(true);
    await fetch("/api/admin/modulo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ curso_id: cursoId, titulo: titulo.trim(), orden: nextOrden }),
    });
    setLoading(false);
    setAbierto(false);
    setTitulo("");
    window.location.reload();
  }

  if (!abierto) {
    return (
      <button onClick={() => setAbierto(true)} style={{ fontSize: 13, color: "var(--oro)", background: "none", border: "1px dashed var(--oro)", borderRadius: 8, padding: "12px 20px", cursor: "pointer", width: "100%", textAlign: "left", opacity: 0.7 }}>
        + Añadir módulo
      </button>
    );
  }

  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 8, padding: 20, display: "flex", gap: 8, alignItems: "center" }}>
      <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título del módulo" autoFocus
        style={{ flex: 1, background: "var(--negro)", border: "1px solid var(--borde)", borderRadius: 6, padding: "8px 12px", color: "var(--texto)", fontSize: 14, fontFamily: "inherit", outline: "none" }} />
      <button onClick={crear} disabled={loading} className="btn-primary" style={{ fontSize: 13, padding: "8px 20px", border: "none", cursor: "pointer" }}>
        {loading ? "..." : "Crear"}
      </button>
      <button onClick={() => setAbierto(false)} style={{ fontSize: 13, color: "var(--texto-suave)", background: "none", border: "none", cursor: "pointer" }}>
        Cancelar
      </button>
    </div>
  );
}
