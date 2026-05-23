"use client";

import { useState } from "react";

interface Leccion {
  id: number;
  titulo: string;
  video_id?: string;
  duracion?: string;
  es_preview: boolean;
  orden: number;
}

export default function LeccionEditor({ leccion, cursoSlug }: { leccion: Leccion; cursoSlug: string }) {
  const [editando, setEditando] = useState(false);
  const [data, setData] = useState(leccion);
  const [loading, setLoading] = useState(false);
  const [copiado, setCopiado] = useState(false);

  function copiarUrlPreview() {
    const url = `${window.location.origin}/preview/${cursoSlug}/${leccion.id}`;
    navigator.clipboard.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  async function guardar() {
    setLoading(true);
    await fetch(`/api/admin/leccion/${data.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: data.titulo,
        video_id: data.video_id || null,
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
        <span style={{ flex: 1, fontSize: 13, color: data.video_id ? "var(--texto)" : "var(--texto-suave)" }}>
          {data.titulo}
        </span>
        {data.video_id
          ? <span style={{ fontSize: 11, color: "var(--oro)", border: "1px solid var(--oro)", padding: "2px 8px", borderRadius: 4 }}>▶ {data.video_id}</span>
          : <span style={{ fontSize: 11, color: "var(--texto-suave)", border: "1px solid var(--borde)", padding: "2px 8px", borderRadius: 4 }}>Sin vídeo</span>
        }
        {data.duracion && <span style={{ fontSize: 12, color: "var(--texto-suave)" }}>{data.duracion}</span>}
        {data.es_preview && (
          <span style={{ fontSize: 11, color: "#4a9", border: "1px solid #4a9", padding: "2px 8px", borderRadius: 4 }}>Preview</span>
        )}
        {data.es_preview && (
          <button onClick={copiarUrlPreview} style={{ fontSize: 11, color: copiado ? "#4a9" : "var(--oro)", background: "none", border: `1px solid ${copiado ? "#4a9" : "var(--oro)"}`, borderRadius: 4, padding: "2px 10px", cursor: "pointer" }}>
            {copiado ? "✓ Copiado" : "🔗 Copiar URL"}
          </button>
        )}
        <button onClick={() => setEditando(true)} style={{ fontSize: 12, color: "var(--texto-suave)", background: "none", border: "1px solid var(--borde)", borderRadius: 4, padding: "4px 10px", cursor: "pointer" }}>
          Editar
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "12px 0", borderBottom: "1px solid var(--borde)", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 180px", gap: 8 }}>
        <input value={data.titulo} onChange={(e) => setData({ ...data, titulo: e.target.value })}
          placeholder="Título" style={inputStyle} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <input value={data.video_id ?? ""} onChange={(e) => setData({ ...data, video_id: e.target.value })}
            placeholder="Bunny Video ID" style={inputStyle} />
          <label style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 12, color: "var(--texto-suave)", cursor: "pointer", paddingLeft: 4 }}>
            <input type="checkbox" checked={data.es_preview} onChange={(e) => setData({ ...data, es_preview: e.target.checked })} />
            Preview gratuito
          </label>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "flex-end" }}>
        <button onClick={() => setEditando(false)} style={{ fontSize: 12, color: "var(--texto-suave)", background: "none", border: "none", cursor: "pointer" }}>
          Cancelar
        </button>
        <button onClick={guardar} disabled={loading} className="btn-primary" style={{ fontSize: 12, padding: "6px 16px", border: "none", cursor: "pointer" }}>
          {loading ? "..." : "Guardar"}
        </button>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--negro)", border: "1px solid var(--borde)", borderRadius: 6,
  padding: "8px 12px", color: "var(--texto)", fontSize: 13, fontFamily: "inherit", outline: "none",
};
