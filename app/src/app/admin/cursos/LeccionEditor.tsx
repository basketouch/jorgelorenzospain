"use client";

import { useState } from "react";

interface Leccion {
  id: number;
  titulo: string;
  vimeo_id?: string;
  duracion?: string;
  es_preview: boolean;
  orden: number;
}

export default function LeccionEditor({ leccion }: { leccion: Leccion }) {
  const [editando, setEditando] = useState(false);
  const [data, setData] = useState(leccion);
  const [loading, setLoading] = useState(false);

  async function guardar() {
    setLoading(true);
    await fetch(`/api/admin/leccion/${data.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: data.titulo,
        vimeo_id: data.vimeo_id || null,
        duracion: data.duracion || null,
        es_preview: data.es_preview,
      }),
    });
    setLoading(false);
    setEditando(false);
  }

  if (!editando) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--borde)" }}>
        <span style={{ fontSize: 12, color: "var(--texto-suave)", minWidth: 24 }}>{leccion.orden}</span>
        <span style={{ flex: 1, fontSize: 13, color: data.vimeo_id ? "var(--texto)" : "var(--texto-suave)" }}>
          {data.titulo}
        </span>
        {data.vimeo_id
          ? <span style={{ fontSize: 11, color: "var(--oro)", border: "1px solid var(--oro)", padding: "2px 8px", borderRadius: 4 }}>▶ {data.vimeo_id}</span>
          : <span style={{ fontSize: 11, color: "var(--texto-suave)", border: "1px solid var(--borde)", padding: "2px 8px", borderRadius: 4 }}>Sin vídeo</span>
        }
        {data.duracion && <span style={{ fontSize: 12, color: "var(--texto-suave)" }}>{data.duracion}</span>}
        {data.es_preview && <span style={{ fontSize: 11, color: "#4a9", border: "1px solid #4a9", padding: "2px 8px", borderRadius: 4 }}>Preview</span>}
        <button onClick={() => setEditando(true)} style={{ fontSize: 12, color: "var(--texto-suave)", background: "none", border: "1px solid var(--borde)", borderRadius: 4, padding: "4px 10px", cursor: "pointer" }}>
          Editar
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "12px 0", borderBottom: "1px solid var(--borde)", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 100px", gap: 8 }}>
        <input value={data.titulo} onChange={(e) => setData({ ...data, titulo: e.target.value })}
          placeholder="Título" style={inputStyle} />
        <input value={data.vimeo_id ?? ""} onChange={(e) => setData({ ...data, vimeo_id: e.target.value })}
          placeholder="Vimeo ID" style={inputStyle} />
        <input value={data.duracion ?? ""} onChange={(e) => setData({ ...data, duracion: e.target.value })}
          placeholder="Duración (14:32)" style={inputStyle} />
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <label style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13, color: "var(--texto-suave)", cursor: "pointer" }}>
          <input type="checkbox" checked={data.es_preview} onChange={(e) => setData({ ...data, es_preview: e.target.checked })} />
          Preview gratuito
        </label>
        <button onClick={guardar} disabled={loading} className="btn-primary" style={{ fontSize: 12, padding: "6px 16px", border: "none", cursor: "pointer" }}>
          {loading ? "..." : "Guardar"}
        </button>
        <button onClick={() => setEditando(false)} style={{ fontSize: 12, color: "var(--texto-suave)", background: "none", border: "none", cursor: "pointer" }}>
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
