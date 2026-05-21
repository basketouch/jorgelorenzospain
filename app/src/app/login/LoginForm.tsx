"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/cuenta";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modo, setModo] = useState<"login" | "registro">("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (modo === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError("Email o contraseña incorrectos."); setLoading(false); return; }
      router.push(redirect);
      router.refresh();
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) { setError(error.message); setLoading(false); return; }
      setEnviado(true);
    }
    setLoading(false);
  }

  if (enviado) {
    return (
      <div style={{ textAlign: "center", padding: "48px 0" }}>
        <p style={{ fontSize: 32 }}>📧</p>
        <h2 style={{ marginTop: 16, marginBottom: 12 }}>Revisa tu email</h2>
        <p style={{ color: "var(--texto-suave)" }}>Te hemos enviado un enlace de confirmación a <strong style={{ color: "var(--texto)" }}>{email}</strong>.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <input
        type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
        required style={inputStyle}
      />
      <input
        type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}
        required style={inputStyle}
      />
      {error && <p style={{ color: "#e05c5c", fontSize: 14 }}>{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary" style={{ width: "100%", border: "none", cursor: "pointer" }}>
        {loading ? "..." : modo === "login" ? "Entrar" : "Crear cuenta"}
      </button>
      <p style={{ textAlign: "center", fontSize: 14, color: "var(--texto-suave)" }}>
        {modo === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
        <button type="button" onClick={() => setModo(modo === "login" ? "registro" : "login")}
          style={{ background: "none", border: "none", color: "var(--oro)", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
          {modo === "login" ? "Regístrate" : "Inicia sesión"}
        </button>
      </p>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--card)", border: "1px solid var(--borde)",
  borderRadius: 6, padding: "12px 16px",
  color: "var(--texto)", fontSize: 15, fontFamily: "inherit",
  outline: "none", width: "100%",
};
