"use client";

import { useState, useEffect } from "react";

interface Leccion {
  id: number;
  titulo: string;
  video_id?: string;
  duracion?: string;
}

export default function PreviewGate({
  leccion,
  cursoTitulo,
  slug,
  libraryId,
}: {
  leccion: Leccion;
  cursoTitulo: string;
  slug: string;
  libraryId: string;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(`preview_${leccion.id}`)) {
      setUnlocked(true);
    }
  }, [leccion.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await fetch("/api/preview-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), nombre: nombre.trim() }),
      });
    } finally {
      localStorage.setItem(`preview_${leccion.id}`, "1");
      setUnlocked(true);
      setLoading(false);
    }
  }

  /* ── VISTA DESBLOQUEADA ── */
  if (unlocked) {
    return (
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Etiqueta + título */}
        <div style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 11, color: "var(--oro)", letterSpacing: 2, textTransform: "uppercase" }}>
            Vista previa gratuita · {cursoTitulo}
          </span>
          <h1 style={{ fontSize: "clamp(22px, 3vw, 30px)", marginTop: 8, marginBottom: 0 }}>
            {leccion.titulo}
          </h1>
          {leccion.duracion && (
            <p style={{ fontSize: 13, color: "var(--texto-suave)", marginTop: 6 }}>{leccion.duracion}</p>
          )}
        </div>

        {/* Player */}
        {leccion.video_id ? (
          <div style={{ position: "relative", paddingBottom: "56.25%", background: "#000", borderRadius: 10, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}>
            <iframe
              src={`https://iframe.mediadelivery.net/embed/${libraryId}/${leccion.video_id}?autoplay=false&preload=true&responsive=true&primaryColor=c9a84c&muted=false&loop=false`}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div style={{ aspectRatio: "16/9", background: "var(--card)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10 }}>
            <p style={{ color: "var(--texto-suave)" }}>Vídeo próximamente</p>
          </div>
        )}

        {/* CTA tras el vídeo */}
        <div style={{
          marginTop: 48,
          padding: "36px 40px",
          background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.03) 100%)",
          border: "1px solid rgba(201,168,76,0.25)",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
          flexWrap: "wrap",
        }}>
          <div>
            <p style={{ fontSize: 11, color: "var(--oro)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
              {cursoTitulo}
            </p>
            <h2 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", marginBottom: 10 }}>
              Esto es solo el principio.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                "9 capítulos · 47 lecciones",
                "Sistemas de ataque y defensa desde la élite",
                "Gestión, liderazgo y toma de decisiones",
              ].map((item) => (
                <p key={item} style={{ fontSize: 13, color: "var(--texto-suave)", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "var(--oro)" }}>→</span> {item}
                </p>
              ))}
            </div>
          </div>
          <a
            href={`/cursos/${slug}`}
            className="btn-primary"
            style={{ fontSize: 14, padding: "14px 32px", display: "inline-block", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}
          >
            Ver el curso completo →
          </a>
        </div>
      </div>
    );
  }

  /* ── GATE: FORMULARIO EMAIL ── */
  return (
    <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ maxWidth: 480, width: "100%" }}>

        {/* Credencial */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: 100, padding: "6px 16px", marginBottom: 24,
          }}>
            <span style={{ fontSize: 12, color: "var(--oro)" }}>🏆 2× Campeón del Mundo · 2× JJOO</span>
          </div>

          <p style={{ fontSize: 11, color: "var(--texto-suave)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
            {cursoTitulo}
          </p>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", lineHeight: 1.2, marginBottom: 12 }}>
            {leccion.titulo}
          </h1>
          {leccion.duracion && (
            <p style={{ fontSize: 13, color: "var(--texto-suave)" }}>{leccion.duracion}</p>
          )}
        </div>

        {/* Card formulario */}
        <div style={{
          background: "var(--card)",
          border: "1px solid var(--borde)",
          borderRadius: 14,
          padding: "32px 28px",
        }}>
          <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, textAlign: "center" }}>
            Ve esta lección gratis
          </p>
          <p style={{ fontSize: 13, color: "var(--texto-suave)", textAlign: "center", marginBottom: 24 }}>
            Déjanos tu email y accede al vídeo al instante.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              style={inputStyle}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu email"
              required
              style={inputStyle}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ padding: "13px", fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer", marginTop: 4, borderRadius: 8 }}
            >
              {loading ? "..." : "Ver lección gratis →"}
            </button>
          </form>

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--borde)", display: "flex", justifyContent: "center", gap: 24 }}>
            {["Sin spam", "Baja cuando quieras", "Gratis"].map((item) => (
              <span key={item} style={{ fontSize: 11, color: "var(--texto-suave)" }}>✓ {item}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--negro)",
  border: "1px solid var(--borde)",
  borderRadius: 8,
  padding: "13px 16px",
  color: "var(--texto)",
  fontSize: 14,
  fontFamily: "inherit",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};
