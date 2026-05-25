"use client";

import { useState } from "react";

export default function ContactoForm() {
  const [form, setForm] = useState({
    nombre: "", email: "", club: "", pais: "",
    jugadores: "", fechas: "", mensaje: "",
  });
  const [estado, setEstado] = useState<"idle" | "loading" | "ok" | "error">("idle");

  function set(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEstado("loading");
    const res = await fetch("/api/stages-contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setEstado(res.ok ? "ok" : "error");
  }

  if (estado === "ok") {
    return (
      <div style={{ textAlign: "center", padding: "48px 0" }}>
        <p style={{ fontSize: 40, marginBottom: 16 }}>✅</p>
        <h3 style={{ fontSize: 22, marginBottom: 12 }}>Consulta recibida</h3>
        <p style={{ color: "var(--texto-suave)", fontSize: 15 }}>
          Nos pondremos en contacto contigo en menos de 48 horas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Nombre completo *">
          <input required value={form.nombre} onChange={set("nombre")} placeholder="Jorge López" style={iS} />
        </Field>
        <Field label="Email *">
          <input required type="email" value={form.email} onChange={set("email")} placeholder="tu@email.com" style={iS} />
        </Field>
        <Field label="Club / Equipo *">
          <input required value={form.club} onChange={set("club")} placeholder="Club Baloncesto Madrid" style={iS} />
        </Field>
        <Field label="País de origen *">
          <input required value={form.pais} onChange={set("pais")} placeholder="España, Francia, Turquía…" style={iS} />
        </Field>
        <Field label="Número de jugadores">
          <select value={form.jugadores} onChange={set("jugadores")} style={iS}>
            <option value="">Seleccionar…</option>
            <option>Menos de 10</option>
            <option>10 – 15</option>
            <option>16 – 20</option>
            <option>Más de 20</option>
          </select>
        </Field>
        <Field label="Fechas aproximadas">
          <input value={form.fechas} onChange={set("fechas")} placeholder="Agosto 2025, 10 días" style={iS} />
        </Field>
      </div>

      <Field label="Cuéntanos más sobre vuestro proyecto">
        <textarea
          value={form.mensaje} onChange={set("mensaje")}
          placeholder="Categoría del equipo, objetivos del stage, instalación preferida, servicios adicionales que necesitáis…"
          rows={5}
          style={{ ...iS, resize: "vertical", lineHeight: 1.6 }}
        />
      </Field>

      {estado === "error" && (
        <p style={{ fontSize: 13, color: "#e06" }}>Ha ocurrido un error. Escríbenos directamente a info@jorgelorenzo.coach</p>
      )}

      <div>
        <button
          type="submit"
          disabled={estado === "loading"}
          className="btn-primary"
          style={{ fontSize: 14, cursor: "pointer", border: "none" }}
        >
          {estado === "loading" ? "Enviando…" : "Enviar consulta →"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontSize: 12, color: "var(--texto-suave)", display: "block", marginBottom: 6, fontWeight: 600, letterSpacing: "0.05em" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const iS: React.CSSProperties = {
  width: "100%", background: "var(--card)", border: "1px solid var(--borde)",
  borderRadius: 6, padding: "10px 14px", color: "var(--texto)",
  fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box",
  transition: "border-color 0.15s",
};
