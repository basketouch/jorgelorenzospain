"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface BrevoLista { id: number; name: string; totalSubscribers?: number; uniqueSubscribers?: number; }

export default function CampanaFormClient({ campana }: { campana: Record<string, unknown> }) {
  const [asunto, setAsunto] = useState(campana.asunto as string);
  const [contenido, setContenido] = useState(campana.contenido as string);
  const [activa, setActiva] = useState(campana.activa as boolean);
  const [listaId, setListaId] = useState<number>(campana.lista_brevo_id as number ?? 15);
  const [listas, setListas] = useState<BrevoLista[]>([]);
  const [loading, setLoading] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/brevo-listas").then(r => r.json()).then(setListas).catch(() => {});
  }, []);

  async function guardar() {
    setLoading(true);
    await fetch(`/api/admin/campanas/${campana.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ asunto, contenido, activa, lista_brevo_id: listaId }),
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

  async function verPreview() {
    setPreviewing(true);
    const res = await fetch("/api/admin/campanas/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ asunto, contenido }),
    });
    const html = await res.text();
    setPreviewHtml(html);
    setPreviewing(false);
  }

  return (
    <>
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
          <p style={{ fontSize: 11, color: "var(--texto-suave)", marginBottom: 4 }}>Contenido</p>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            rows={6}
            style={{ width: "100%", background: "var(--negro)", border: "1px solid var(--borde)", borderRadius: 6, padding: "8px 12px", color: "var(--texto)", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box", resize: "vertical", lineHeight: 1.6 }}
          />
          <p style={{ fontSize: 11, color: "var(--texto-suave)", marginTop: 4 }}>Separa párrafos con una línea en blanco.</p>
        </div>

        {/* Lista Brevo + acciones */}
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: 11, color: "var(--texto-suave)", marginBottom: 4 }}>Lista de envío</p>
            <select
              value={listaId}
              onChange={(e) => setListaId(parseInt(e.target.value))}
              style={{ background: "var(--negro)", border: "1px solid var(--borde)", borderRadius: 6, padding: "7px 10px", color: "var(--texto)", fontSize: 12, fontFamily: "inherit" }}
            >
              {listas.length === 0 && <option value={listaId}>Lista #{listaId}</option>}
              {listas.map(l => {
                const count = l.uniqueSubscribers ?? l.totalSubscribers;
                return (
                  <option key={l.id} value={l.id}>
                    #{l.id} — {l.name}{count ? ` (${count})` : ""}
                  </option>
                );
              })}
            </select>
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "var(--texto)", paddingBottom: 2 }}>
            <input type="checkbox" checked={activa} onChange={(e) => setActiva(e.target.checked)}
              style={{ accentColor: "var(--oro)", width: 16, height: 16 }} />
            Activar envío automático
          </label>
        </div>

        {/* Botones */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <button onClick={guardar} disabled={loading} className="btn-primary"
            style={{ fontSize: 12, padding: "7px 16px", border: "none", cursor: "pointer" }}>
            {loading ? "..." : guardado ? "✓ Guardado" : "Guardar"}
          </button>

          <button onClick={verPreview} disabled={previewing}
            style={{ fontSize: 12, padding: "7px 14px", background: "none", border: "1px solid var(--borde)", borderRadius: 6, color: "var(--texto-suave)", cursor: "pointer" }}>
            {previewing ? "..." : "👁 Ver HTML"}
          </button>

          <button onClick={eliminar} disabled={deleting}
            style={{ fontSize: 12, padding: "7px 12px", background: "none", border: "1px solid #633", borderRadius: 6, color: "#e06", cursor: "pointer" }}>
            {deleting ? "..." : "Eliminar"}
          </button>
        </div>
      </div>

      {/* Modal preview */}
      {previewHtml && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24,
        }} onClick={() => setPreviewHtml("")}>
          <div style={{ width: "100%", maxWidth: 600, height: "80vh", borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column" }}
            onClick={(e) => e.stopPropagation()}>
            <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderBottom: "none", borderRadius: "12px 12px 0 0", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Preview — {asunto}</span>
              <button onClick={() => setPreviewHtml("")}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--texto-suave)", fontSize: 18 }}>×</button>
            </div>
            <iframe
              srcDoc={previewHtml}
              style={{ flex: 1, border: "none", borderRadius: "0 0 12px 12px" }}
              title="Preview email"
            />
          </div>
        </div>
      )}
    </>
  );
}
