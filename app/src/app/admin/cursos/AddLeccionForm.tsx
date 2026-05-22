"use client";

import { useState } from "react";

export default function AddLeccionForm({ moduloId, nextOrden }: { moduloId: number; nextOrden: number }) {
  const [abierto, setAbierto] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [videoId, setVimeoId] = useState("");
  const [duracion, setDuracion] = useState("");
  const [loading, setLoading] = useState(false);

  async function crear() {
    if (!titulo.trim()) return;
    setLoading(true);
    await fetch("/api/admin/leccion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modulo_id: moduloId, titulo: titulo.trim(), video_id: videoId || null, duracion: duracion || null, orden: nextOrden }),
    });
    setLoading(false);
    setAbierto(false);
    setTitulo(""); setVimeoId(""); setDuracion("");
    window.location.reload();
  }

  if (!abierto) {
    return (
      <button onClick={() => setAbierto(true)} style={{ fontSize: 12, color: "var(--texto-suave)", background: "none", border: "1px dashed var(--borde)", borderRadius: 6, padding: "8px 16px", cursor: "pointer", width: "100%", marginTop: 8, textAlign: "left" }}>
        + Añadir lección
      </button>
    );
  }

  return (
    <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 100px", gap: 8 }}>
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título de la lección" style={inputStyle} autoFocus />
        <input value={videoId} onChange={(e) => setVimeoId(e.target.value)} placeholder="Bunny Video ID" style={inputStyle} />
        <input value={duracion} onChange={(e) => setDuracion(e.target.value)} placeholder="Duración" style={inputStyle} />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={crear} disabled={loading} className="btn-primary" style={{ fontSize: 12, padding: "6px 16px", border: "none", cursor: "pointer" }}>
          {loading ? "..." : "Crear lección"}
        </button>
        <button onClick={() => setAbierto(false)} style={{ fontSize: 12, color: "var(--texto-suave)", background: "none", border: "none", cursor: "pointer" }}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--negro)", border: "1px solid var(--borde)", borderRadius: 6,
  padding: "8px 12px", color: "var(--texto)", fontSize: 13, fontFamily: "inherit", outline: "none",
};
