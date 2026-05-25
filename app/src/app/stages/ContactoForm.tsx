"use client";

import { useState } from "react";

type Lang = "en" | "es";

const tf = {
  en: {
    nombre: "Full name *", email: "Email *", club: "Club / Team *",
    pais: "Country of origin *", jugadores: "Number of players", fechas: "Approximate dates",
    mensaje: "Tell us more about your project",
    jugadoresOpts: ["Select…", "Fewer than 10", "10 – 15", "16 – 20", "More than 20"],
    nombrePh: "John Smith", emailPh: "you@email.com", clubPh: "BC Madrid",
    paisPh: "Germany, France, Turkey…", fechasPh: "August 2025, 10 days",
    mensajePh: "Team category, camp objectives, preferred venue, additional services needed…",
    submit: "Send enquiry →", sending: "Sending…",
    successTitle: "Enquiry received",
    successSub: "We will get back to you with a tailored proposal within 48 hours.",
    error: "Something went wrong. Email us directly at info@jorgelorenzo.coach",
  },
  es: {
    nombre: "Nombre completo *", email: "Email *", club: "Club / Equipo *",
    pais: "País de origen *", jugadores: "Número de jugadores", fechas: "Fechas aproximadas",
    mensaje: "Cuéntanos más sobre vuestro proyecto",
    jugadoresOpts: ["Seleccionar…", "Menos de 10", "10 – 15", "16 – 20", "Más de 20"],
    nombrePh: "Jorge López", emailPh: "tu@email.com", clubPh: "Club Baloncesto Madrid",
    paisPh: "España, Francia, Turquía…", fechasPh: "Agosto 2025, 10 días",
    mensajePh: "Categoría del equipo, objetivos del stage, instalación preferida, servicios adicionales…",
    submit: "Enviar consulta →", sending: "Enviando…",
    successTitle: "Consulta recibida",
    successSub: "Nos pondremos en contacto con una propuesta personalizada en menos de 48 horas.",
    error: "Ha ocurrido un error. Escríbenos a info@jorgelorenzo.coach",
  },
} as const;

export default function ContactoForm({ lang = "en" }: { lang?: Lang }) {
  const tx = tf[lang];
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
      body: JSON.stringify({ ...form, lang }),
    });
    setEstado(res.ok ? "ok" : "error");
  }

  if (estado === "ok") {
    return (
      <div style={{ textAlign: "center", padding: "48px 0" }}>
        <p style={{ fontSize: 40, marginBottom: 16 }}>✅</p>
        <h3 style={{ fontSize: 22, marginBottom: 12 }}>{tx.successTitle}</h3>
        <p style={{ color: "var(--texto-suave)", fontSize: 15 }}>{tx.successSub}</p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label={tx.nombre}>
          <input required value={form.nombre} onChange={set("nombre")} placeholder={tx.nombrePh} style={iS} />
        </Field>
        <Field label={tx.email}>
          <input required type="email" value={form.email} onChange={set("email")} placeholder={tx.emailPh} style={iS} />
        </Field>
        <Field label={tx.club}>
          <input required value={form.club} onChange={set("club")} placeholder={tx.clubPh} style={iS} />
        </Field>
        <Field label={tx.pais}>
          <input required value={form.pais} onChange={set("pais")} placeholder={tx.paisPh} style={iS} />
        </Field>
        <Field label={tx.jugadores}>
          <select value={form.jugadores} onChange={set("jugadores")} style={iS}>
            {tx.jugadoresOpts.map(o => <option key={o} value={o === tx.jugadoresOpts[0] ? "" : o}>{o}</option>)}
          </select>
        </Field>
        <Field label={tx.fechas}>
          <input value={form.fechas} onChange={set("fechas")} placeholder={tx.fechasPh} style={iS} />
        </Field>
      </div>

      <Field label={tx.mensaje}>
        <textarea
          value={form.mensaje} onChange={set("mensaje")}
          placeholder={tx.mensajePh}
          rows={5}
          style={{ ...iS, resize: "vertical", lineHeight: 1.6 }}
        />
      </Field>

      {estado === "error" && (
        <p style={{ fontSize: 13, color: "#e06" }}>{tx.error}</p>
      )}

      <div>
        <button type="submit" disabled={estado === "loading"} className="btn-primary"
          style={{ fontSize: 14, cursor: "pointer", border: "none" }}>
          {estado === "loading" ? tx.sending : tx.submit}
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
  width: "100%", background: "var(--oscuro)", border: "1px solid var(--borde)",
  borderRadius: 6, padding: "10px 14px", color: "var(--texto)",
  fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box",
};
