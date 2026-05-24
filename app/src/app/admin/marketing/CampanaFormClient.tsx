"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CampanaFormClient({ campana }: { campana: Record<string, unknown> }) {
  const [asunto, setAsunto] = useState(campana.asunto as string);
  const [contenido, setContenido] = useState(campana.contenido as string);
  const [activa, setActiva] = useState(campana.activa as boolean);
  const [loading, setLoading] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  async function guardar() {
    setLoading(true);
    await fetch(`/api/admin/campanas/${campana.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ asunto, contenido, activa }),
    });
    setLoading(false);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
    router.refresh();
  }

  async function eliminar() {
    if (!confirm("¿Eliminar esta campaña?")) return;
    setDeleting(true);
    await fetch(`/api/admin/campanas/${campana.id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Asunto */}
      <div>
        <p style={{ fontSize: 11, color: "var(--texto-suave)", marginBottom: 4 }}>Asunto</p>
        <input
          value={asunto}
          onChange={(e) => setAsunto(e.target.value)}
          style={{ width: "100%", background: "var(--negro)", border: "1px solid var(--borde)", borderRadius: 6, padding: "8px 12px", color: "var(--texto)", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" }}
        />
      </div>

      {/* Contenido */}
      <div>
        <p style={{ fontSize: 11, color: "var(--texto-suave)", marginBottom: 4 }}>Contenido del email</p>
        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          rows={6}
          style={{ width: "100%", background: "var(--negro)", border: "1px solid var(--borde)", borderRadius: 6, padding: "8px 12px", color: "var(--texto)", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box", resize: "vertical", lineHeight: 1.6 }}
        />
        <p style={{ fontSize: 11, color: "var(--texto-suave)", marginTop: 4 }}>Separa párrafos con una línea en blanco. Los enlaces se muestran directamente.</p>
      </div>

      {/* Acciones */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        {/* Toggle activa */}
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "var(--texto)" }}>
          <input
            type="checkbox"
            checked={activa}
            onChange={(e) => setActiva(e.target.checked)}
            style={{ accentColor: "var(--oro)", width: 16, height: 16 }}
          />
          Activar envío automático
        </label>

        <button
          onClick={guardar}
          disabled={loading}
          className="btn-primary"
          style={{ fontSize: 12, padding: "7px 16px", border: "none", cursor: "pointer" }}
        >
          {loading ? "..." : guardado ? "✓ Guardado" : "Guardar"}
        </button>

        <button
          onClick={eliminar}
          disabled={deleting}
          style={{ fontSize: 12, padding: "7px 12px", background: "none", border: "1px solid #633", borderRadius: 6, color: "#e06", cursor: "pointer" }}
        >
          {deleting ? "..." : "Eliminar"}
        </button>
      </div>
    </div>
  );
}
