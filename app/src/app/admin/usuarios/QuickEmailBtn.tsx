"use client";

import { useState } from "react";

export default function QuickEmailBtn({ email, nombre }: { email: string; nombre: string }) {
  const [abierto, setAbierto] = useState(false);
  const [asunto, setAsunto] = useState("");
  const [contenido, setContenido] = useState("");
  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState<"idle" | "ok" | "error">("idle");

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setEstado("idle");
    const res = await fetch("/api/admin/enviar-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, nombre, asunto, contenido }),
    });
    setLoading(false);
    if (res.ok) {
      setEstado("ok");
      setTimeout(() => { setAbierto(false); setEstado("idle"); setAsunto(""); setContenido(""); }, 1800);
    } else {
      setEstado("error");
    }
  }

  return (
    <>
      <button
        onClick={() => setAbierto(true)}
        title={`Enviar email a ${email}`}
        style={{
          fontSize: 11, padding: "4px 12px", borderRadius: 5, cursor: "pointer",
          background: "none", border: "1px solid var(--borde)",
          color: "var(--texto-suave)", fontFamily: "inherit", whiteSpace: "nowrap",
        }}
      >
        ✉ Email
      </button>

      {abierto && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
          onClick={() => setAbierto(false)}
        >
          <div
            style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 12, padding: 32, width: "100%", maxWidth: 540 }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <h3 style={{ marginBottom: 4 }}>Enviar email</h3>
                <p style={{ fontSize: 13, color: "var(--texto-suave)" }}>Para: <strong style={{ color: "var(--texto)" }}>{nombre}</strong> · {email}</p>
              </div>
              <button onClick={() => setAbierto(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--texto-suave)", fontSize: 22 }}>×</button>
            </div>

            <form onSubmit={enviar} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                value={asunto} onChange={e => setAsunto(e.target.value)}
                placeholder="Asunto" required style={inputStyle}
              />
              <textarea
                value={contenido} onChange={e => setContenido(e.target.value)}
                placeholder={"Escribe el mensaje...\n\nSepara párrafos con línea en blanco.\nUsa → Texto: https://url para botón dorado."}
                required rows={9}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              />
              {estado === "error" && <p style={{ fontSize: 13, color: "#e06" }}>Error al enviar.</p>}
              {estado === "ok"    && <p style={{ fontSize: 13, color: "#4a9" }}>✓ Enviado correctamente.</p>}
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <button type="button" onClick={() => setAbierto(false)}
                  style={{ fontSize: 13, padding: "8px 16px", background: "none", border: "1px solid var(--borde)", borderRadius: 6, color: "var(--texto-suave)", cursor: "pointer", fontFamily: "inherit" }}>
                  Cancelar
                </button>
                <button type="submit" disabled={loading} className="btn-primary"
                  style={{ fontSize: 13, padding: "8px 20px", border: "none", cursor: "pointer" }}>
                  {loading ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", background: "var(--negro)", border: "1px solid var(--borde)",
  borderRadius: 6, padding: "10px 14px", color: "var(--texto)",
  fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box",
};
