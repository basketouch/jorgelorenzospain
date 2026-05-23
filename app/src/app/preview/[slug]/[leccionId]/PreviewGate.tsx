"use client";

import { useState, useEffect } from "react";

const DOMINIOS_DESECHABLES = new Set([
  "mailinator.com","guerrillamail.com","guerrillamail.net","guerrillamail.org",
  "tempmail.com","temp-mail.org","throwam.com","throwaway.email",
  "yopmail.com","yopmail.fr","cool.fr.nf","jetable.fr.nf","nospam.ze.tc",
  "trashmail.com","trashmail.me","trashmail.net","trashmail.at","trashmail.io",
  "sharklasers.com","guerrillamailblock.com","grr.la","guerrillamail.info",
  "spam4.me","dispostable.com","mailnull.com","spamgourmet.com","maildrop.cc",
  "discard.email","spambox.us","mailnesia.com","mailnull.com","mt2015.com",
  "mt2014.com","spamfree24.org","spamfree.eu","spamthisplease.com",
  "fakeinbox.com","filzmail.com","spamgob.com","objectmail.com","obobbo.com",
  "spamherelots.com","discardmail.com","discardmail.de","spamstack.net",
  "crazymailing.com","spamgob.com","spamhereplease.com","spaml.de",
  "binkmail.com","bobmail.info","chammy.info","devnullmail.com",
  "letthemeatspam.com","mailinater.com","mailismagic.com",
  "spaml.com","tempr.email","discard.email","cust.in",
  "h8s.org","spamgourmet.net","spamgourmet.org","jetable.com",
  "jetable.net","jetable.org","nomail.xl.cx","amilegit.com",
  "imgof.com","supergreatmail.com","trbvm.com",
]);

function esDominioDesechable(email: string): boolean {
  const partes = email.toLowerCase().split("@");
  if (partes.length !== 2) return false;
  return DOMINIOS_DESECHABLES.has(partes[1]);
}

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
  cursoUrl,
  libraryId,
}: {
  leccion: Leccion;
  cursoTitulo: string;
  slug: string;
  cursoUrl: string;
  libraryId: string;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem(`preview_${leccion.id}`)) {
      setUnlocked(true);
    }
  }, [leccion.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    if (esDominioDesechable(email)) {
      setError("Usa tu email real para acceder al vídeo.");
      return;
    }
    setError("");
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

        {/* CTA antes del vídeo */}
        <div style={{
          marginBottom: 32,
          padding: "28px 32px",
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
            <h2 style={{ fontSize: "clamp(16px, 2vw, 20px)", marginBottom: 10 }}>
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
          <a href={cursoUrl} className="btn-primary"
            style={{ fontSize: 14, padding: "12px 28px", display: "inline-block", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>
            Ver el curso completo →
          </a>
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

      </div>
    );
  }

  /* ── GATE: FORMULARIO EMAIL ── */
  return (
    <div style={{ minHeight: "85vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>

      {/* Fondo cancha */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: "url(https://otsbpiukzftacmvmkajy.supabase.co/storage/v1/object/public/portadas/Court.png)",
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.12,
        pointerEvents: "none",
      }} />

      {/* Layout: foto + form */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
        gap: 64,
        maxWidth: 960,
        width: "100%",
        alignItems: "center",
      }}
        className="preview-grid"
      >

        {/* Foto copa */}
        <div style={{ textAlign: "center" }}>
          <img
            src="https://otsbpiukzftacmvmkajy.supabase.co/storage/v1/object/public/portadas/Con%20la%20copa.jpg"
            alt="Jorge Lorenzo — Campeón de Europa"
            style={{
              width: "100%",
              maxWidth: 380,
              aspectRatio: "3/4",
              objectFit: "cover",
              borderRadius: 14,
              boxShadow: "0 20px 64px rgba(0,0,0,0.7)",
              display: "block",
              margin: "0 auto",
            }}
          />
          <p style={{ fontSize: 11, color: "var(--texto-suave)", marginTop: 14, letterSpacing: 1.5, textTransform: "uppercase" }}>
            Campeón de Europa · Berlín 2022
          </p>
        </div>

        {/* Columna derecha */}
        <div>

          {/* Credencial */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: 100, padding: "6px 18px", marginBottom: 24,
          }}>
            <span style={{ fontSize: 12, color: "var(--oro)" }}>🏆 Campeón del Mundo · Campeón de Europa</span>
          </div>

          <p style={{ fontSize: 11, color: "var(--texto-suave)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
            {cursoTitulo}
          </p>
          <h1 style={{ fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1.2, marginBottom: 10 }}>
            {leccion.titulo}
          </h1>
          {leccion.duracion && (
            <p style={{ fontSize: 13, color: "var(--texto-suave)", marginBottom: 32 }}>{leccion.duracion}</p>
          )}

          {/* Card formulario */}
          <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 14, padding: "28px 24px" }}>
            <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Ve esta lección gratis</p>
            <p style={{ fontSize: 13, color: "var(--texto-suave)", marginBottom: 20 }}>
              Déjanos tu email y accede al vídeo al instante.
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" style={inputStyle} />
              <div>
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder="Tu email" required style={{ ...inputStyle, borderColor: error ? "#e06" : undefined }} />
                {error && <p style={{ fontSize: 12, color: "#e06", marginTop: 6, paddingLeft: 4 }}>{error}</p>}
              </div>
              <button type="submit" disabled={loading} className="btn-primary"
                style={{ padding: "13px", fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer", marginTop: 4, borderRadius: 8 }}>
                {loading ? "..." : "Ver lección gratis →"}
              </button>
            </form>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--borde)", display: "flex", justifyContent: "center", gap: 20 }}>
              {["Sin spam", "Gratis"].map((item) => (
                <span key={item} style={{ fontSize: 11, color: "var(--texto-suave)" }}>✓ {item}</span>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .preview-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
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
