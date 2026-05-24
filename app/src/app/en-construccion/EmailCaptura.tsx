"use client";

import { useState } from "react";

export default function EmailCaptura() {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    try {
      await fetch("/api/preview-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), nombre: nombre.trim() }),
      });
      setEnviado(true);
    } catch {
      setError("Algo ha fallado. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (enviado) {
    return (
      <div style={{ textAlign: "center", padding: "12px 0" }}>
        <p style={{ fontSize: 28, marginBottom: 12 }}>✓</p>
        <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>¡Apuntado!</p>
        <p style={{ fontSize: 13, color: "var(--texto-suave)" }}>Te avisaremos cuando abramos.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <input
        type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre"
        style={inputStyle}
      />
      <input
        type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }}
        placeholder="Tu email" required
        style={{ ...inputStyle, borderColor: error ? "#e06" : undefined }}
      />
      {error && <p style={{ fontSize: 12, color: "#e06" }}>{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary"
        style={{ padding: "13px", fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer", borderRadius: 8, marginTop: 4 }}>
        {loading ? "..." : "Avisarme →"}
      </button>
      <p style={{ fontSize: 11, color: "var(--texto-suave)", textAlign: "center", marginTop: 4 }}>
        ✓ Sin spam &nbsp;·&nbsp; ✓ Gratis
      </p>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--negro)", border: "1px solid var(--borde)", borderRadius: 8,
  padding: "13px 16px", color: "var(--texto)", fontSize: 14,
  fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box",
};
