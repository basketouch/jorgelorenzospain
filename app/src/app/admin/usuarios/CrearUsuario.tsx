"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CrearUsuario() {
  const [abierto, setAbierto] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, nombre, apellido, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error ?? "Error al crear usuario"); return; }
    setAbierto(false);
    setNombre(""); setApellido(""); setEmail(""); setPassword("");
    router.refresh();
  }

  if (!abierto) {
    return (
      <button
        onClick={() => setAbierto(true)}
        className="btn-primary"
        style={{ fontSize: 12, padding: "7px 16px", border: "none", cursor: "pointer" }}
      >
        + Crear usuario
      </button>
    );
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 12, padding: 32, width: "100%", maxWidth: 440 }}>
        <h3 style={{ marginBottom: 24 }}>Crear usuario</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre *" required style={inputStyle} />
            <input value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellido" style={inputStyle} />
          </div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email *" required style={inputStyle} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña *" required style={inputStyle} />
          {error && <p style={{ fontSize: 12, color: "#e05c5c" }}>{error}</p>}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <button type="button" onClick={() => { setAbierto(false); setError(""); }}
              style={{ fontSize: 13, padding: "8px 16px", background: "none", border: "1px solid var(--borde)", borderRadius: 6, color: "var(--texto-suave)", cursor: "pointer" }}>
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="btn-primary"
              style={{ fontSize: 13, padding: "8px 20px", border: "none", cursor: "pointer" }}>
              {loading ? "Creando..." : "Crear usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--negro)", border: "1px solid var(--borde)", borderRadius: 6,
  padding: "10px 14px", color: "var(--texto)", fontSize: 13, fontFamily: "inherit",
  outline: "none", width: "100%", boxSizing: "border-box",
};
