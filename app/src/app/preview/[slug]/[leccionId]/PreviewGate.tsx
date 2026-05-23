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

  if (unlocked) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        <p style={{ fontSize: 12, color: "var(--texto-suave)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
          {cursoTitulo} · Vista previa gratuita
        </p>
        <h1 style={{ fontSize: "clamp(20px, 3vw, 26px)", marginBottom: 24 }}>{leccion.titulo}</h1>

        {leccion.video_id ? (
          <div style={{ position: "relative", paddingBottom: "56.25%", background: "#000", borderRadius: 8, overflow: "hidden" }}>
            <iframe
              src={`https://iframe.mediadelivery.net/embed/${libraryId}/${leccion.video_id}?autoplay=false&preload=true&responsive=true&primaryColor=c9a84c&muted=false&loop=false`}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div style={{ aspectRatio: "16/9", background: "var(--card)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8 }}>
            <p style={{ color: "var(--texto-suave)" }}>Vídeo próximamente</p>
          </div>
        )}

        {leccion.duracion && (
          <p style={{ fontSize: 13, color: "var(--texto-suave)", marginTop: 12 }}>{leccion.duracion}</p>
        )}

        <div style={{ marginTop: 40, padding: 24, background: "var(--card)", borderRadius: 12, border: "1px solid var(--borde)", textAlign: "center" }}>
          <p style={{ fontSize: 15, marginBottom: 20 }}>
            ¿Te ha gustado? Accede a todo el contenido del curso.
          </p>
          <a href={`/cursos/${slug}`} className="btn-primary" style={{ fontSize: 14, padding: "12px 28px", display: "inline-block", textDecoration: "none" }}>
            Ver el curso completo →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 440, width: "100%", textAlign: "center" }}>
        <p style={{ fontSize: 11, color: "var(--oro)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
          Vista previa gratuita
        </p>
        <h1 style={{ fontSize: "clamp(20px, 4vw, 28px)", marginBottom: 8 }}>{leccion.titulo}</h1>
        <p style={{ fontSize: 14, color: "var(--texto-suave)", marginBottom: 32 }}>
          {cursoTitulo}{leccion.duracion ? ` · ${leccion.duracion}` : ""}
        </p>

        <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 12, padding: 32 }}>
          <p style={{ fontSize: 15, color: "var(--texto)", marginBottom: 24 }}>
            Déjanos tu email y ve esta lección gratis.
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
              style={{ padding: "12px", fontSize: 14, border: "none", cursor: "pointer", marginTop: 4 }}
            >
              {loading ? "..." : "Ver lección gratis →"}
            </button>
          </form>
          <p style={{ fontSize: 11, color: "var(--texto-suave)", marginTop: 16 }}>
            Sin spam. Baja cuando quieras.
          </p>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--negro)",
  border: "1px solid var(--borde)",
  borderRadius: 8,
  padding: "12px 16px",
  color: "var(--texto)",
  fontSize: 14,
  fontFamily: "inherit",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};
