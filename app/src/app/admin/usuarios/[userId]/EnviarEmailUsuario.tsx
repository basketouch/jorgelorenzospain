"use client";

import { useState } from "react";

interface Props {
  email: string;
  nombre: string;
}

export default function EnviarEmailUsuario({ email, nombre }: Props) {
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
      setTimeout(() => { setAbierto(false); setEstado("idle"); setAsunto(""); setContenido(""); }, 2000);
    } else {
      setEstado("error");
    }
  }

  return (
    <>
      <button
        onClick={() => setAbierto(true)}
        style={{
          fontSize: 12, padding: "7px 16px", borderRadius: 6, cursor: "pointer",
          background: "none", border: "1px solid var(--borde)",
          color: "var(--texto-suave)", fontFamily: "inherit",
        }}
      >
        ✉ Enviar email
      </button>

      {abierto && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
        }} onClick={() => setAbierto(false)}>
          <div
            style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 12, padding: 32, width: "100%", maxWidth: 560 }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h3 style={{ marginBottom: 4 }}>Enviar email</h3>
                <p style={{ fontSize: 13, color: "var(--texto-suave)" }}>Para: {nombre} · {email}</p>
              </div>
              <button onClick={() => setAbierto(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--texto-suave)", fontSize: 22 }}>×</button>
            </div>

            <form onSubmit={enviar} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <p style={{ fontSize: 11, color: "var(--texto-suave)", marginBottom: 6 }}>Asunto</p>
                <input
                  value={asunto}
                  onChange={e => setAsunto(e.target.value)}
                  placeholder="Asunto del email"
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <p style={{ fontSize: 11, color: "var(--texto-suave)", marginBottom: 6 }}>Contenido</p>
                <textarea
                  value={contenido}
                  onChange={e => setContenido(e.target.value)}
                  placeholder={"Escribe el mensaje aquí.\n\nSepara párrafos con una línea en blanco.\n\nPuedes añadir un botón con:\n→ Texto del botón: https://url.com"}
                  required
                  rows={10}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                />
                <p style={{ fontSize: 11, color: "var(--texto-suave)", marginTop: 4 }}>
                  Usa <code style={{ color: "var(--oro)" }}>→ Texto: https://url</code> para añadir un botón dorado.
                </p>
              </div>

              {estado === "error" && (
                <p style={{ fontSize: 13, color: "#e06" }}>Error al enviar. Comprueba la configuración de Brevo.</p>
              )}
              {estado === "ok" && (
                <p style={{ fontSize: 13, color: "#4a9" }}>✓ Email enviado correctamente.</p>
              )}

              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
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
