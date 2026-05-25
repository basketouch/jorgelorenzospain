"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function CambiarContrasena() {
  const [abierto, setAbierto] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Mínimo 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError("No se pudo actualizar la contraseña.");
      return;
    }

    setOk(true);
    setPassword("");
    setConfirm("");
    setTimeout(() => { setOk(false); setAbierto(false); }, 2500);
  }

  if (!abierto) {
    return (
      <button
        onClick={() => setAbierto(true)}
        style={{ background: "none", border: "none", color: "var(--texto-suave)", fontSize: 13, cursor: "pointer", padding: 0, textDecoration: "underline" }}
      >
        {ok ? "✓ Contraseña actualizada" : "Cambiar contraseña"}
      </button>
    );
  }

  return (
    <form onSubmit={guardar} style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        minLength={6}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Repetir contraseña"
        value={confirm}
        onChange={e => setConfirm(e.target.value)}
        required
        style={inputStyle}
      />
      {error && <p style={{ color: "#e05c5c", fontSize: 13 }}>{error}</p>}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{ fontSize: 13, padding: "8px 16px", border: "none", cursor: "pointer" }}
        >
          {loading ? "..." : "Guardar"}
        </button>
        <button
          type="button"
          onClick={() => { setAbierto(false); setError(""); setPassword(""); setConfirm(""); }}
          style={{ background: "none", border: "none", color: "var(--texto-suave)", fontSize: 13, cursor: "pointer" }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 6,
  padding: "8px 12px", color: "var(--texto)", fontSize: 14, fontFamily: "inherit",
  outline: "none", width: 220, boxSizing: "border-box",
};
