"use client";

import { useState } from "react";

const LINKS = [
  {
    href: "https://www.skool.com/jorge-lorenzo-coach-4943/about?ref=7bba3fd4d581486b9173ed99dec4f666",
    label: "Comunidad JLC",
    url: "skool.com/jorge-lorenzo-coach",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    href: "https://www.jorgelorenzo.coach/",
    label: "Jorge Lorenzo Coach",
    url: "jorgelorenzo.coach",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    href: "https://www.jorgelorenzo.coach/cursos/laboratorio-2526",
    label: "El Laboratorio del Entrenador",
    url: "jorgelorenzo.coach/cursos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
    ),
  },
  {
    href: "https://www.jorgelorenzo.coach/newsletter",
    label: "Lista de Correo para Entrenadores",
    url: "jorgelorenzo.coach/newsletter",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    href: "https://x.com/JLbasket",
    label: "X (Twitter)",
    url: "x.com/JLbasket",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/jorgelorenzo.coach/",
    label: "Instagram",
    url: "instagram.com/jorgelorenzo.coach",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@jorgelorenzocoach",
    label: "YouTube",
    url: "youtube.com/@jorgelorenzocoach",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/jorge-lorenzo-25ba3518/",
    label: "LinkedIn",
    url: "linkedin.com/in/jorge-lorenzo",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@jlbasket13",
    label: "TikTok",
    url: "tiktok.com/@jlbasket13",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/profile.php?id=61560544524528",
    label: "Facebook",
    url: "facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    href: "https://basketouch.com/",
    label: "Basketouch (empresa)",
    url: "basketouch.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
];

const SHARE_OPTIONS = [
  {
    key: "airdrop",
    label: "AirDrop",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    key: "url",
    label: "URL",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    ),
  },
  {
    key: "mensaje",
    label: "Mensaje",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
        <path d="M7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z"/>
      </svg>
    ),
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    key: "x",
    label: "X",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function BioPage() {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const profileUrl = typeof window !== "undefined" ? window.location.href : "https://www.jorgelorenzo.coach/bio";
  const shareText = "Perfil de Jorge Lorenzo Coach — Entrenador de baloncesto";

  function handleShare(key: string) {
    setShareOpen(false);
    switch (key) {
      case "airdrop":
        if (navigator.share) {
          navigator.share({ title: "Jorge Lorenzo Coach", text: shareText, url: profileUrl }).catch(() => {});
        }
        break;
      case "url":
        navigator.clipboard?.writeText(profileUrl).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
        break;
      case "whatsapp":
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + profileUrl)}`, "_blank");
        break;
      case "mensaje":
        window.open(`sms:&body=${encodeURIComponent(shareText + " " + profileUrl)}`);
        break;
      case "instagram":
        window.open(`https://www.instagram.com/direct/new/?text=${encodeURIComponent(shareText + " " + profileUrl)}`, "_blank");
        break;
      case "x":
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(shareText)}`, "_blank");
        break;
    }
  }

  return (
    <>
      <div style={{
        background: "#0F0F0F", minHeight: "100vh",
        display: "flex", justifyContent: "center", alignItems: "flex-start",
        padding: "24px 16px 60px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}>
        <div style={{ width: "100%", maxWidth: 520 }}>
          {/* CARD */}
          <div style={{
            background: "linear-gradient(180deg, #141414 0%, #0F0F0F 100%)",
            border: "1px solid #3a3a3a",
            borderRadius: 24, padding: 28,
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            position: "relative",
          }}>

            {/* Botón compartir */}
            <button
              onClick={() => setShareOpen(true)}
              style={{
                position: "absolute", top: 16, left: 16,
                width: 36, height: 36, borderRadius: "50%",
                border: "1px solid #3a3a3a", background: "rgba(26,26,26,0.9)",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all 0.2s",
              }}
              aria-label="Compartir"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
            </button>

            {copied && (
              <div style={{
                position: "absolute", top: 16, left: 60,
                background: "#1a1a1a", border: "1px solid var(--oro, #c9a84c)",
                borderRadius: 8, padding: "6px 12px", fontSize: 12, color: "#c9a84c",
              }}>
                ✓ Enlace copiado
              </div>
            )}

            {/* HEADER */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14, paddingTop: 8 }}>
              {/* Avatar */}
              <div style={{
                width: 100, height: 100, borderRadius: "50%",
                background: "linear-gradient(135deg, #c9a84c, #8a6820)",
                border: "3px solid #FF4757",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 36, fontWeight: 800, color: "#0d0d0d", flexShrink: 0,
              }}>
                JL
              </div>

              <div>
                <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.5px" }}>
                  Jorge Lorenzo
                </h1>
                <p style={{ color: "#bdbdbd", fontSize: 14, marginTop: 10, lineHeight: 1.6 }}>
                  🏀 Entrenador de baloncesto<br />
                  8 años en la Selección Española · 🥇 Mundial 2019 · 🥇 EuroBasket 2022<br />
                  2 JJOO, Mundiales y Eurobaskets
                </p>
                <p style={{ color: "#FF4757", fontSize: 12, fontWeight: 600, fontStyle: "italic", marginTop: 8 }}>
                  IA, automatizaciones &amp; crecimiento personal
                </p>
              </div>
            </div>

            {/* LINKS */}
            <nav style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 28 }}>
              {LINKS.map(({ href, label, url, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    textDecoration: "none", color: "#fff",
                    background: "#1a1a1a", border: "1px solid #3a3a3a",
                    padding: "14px 16px", borderRadius: 14,
                    transition: "all 0.2s", position: "relative", overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#FF4757";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(255,71,87,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#3a3a3a";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span style={{ width: 22, height: 22, flexShrink: 0, opacity: 0.9 }}>{icon}</span>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{label}</span>
                  <span style={{
                    marginLeft: "auto", color: "#888", fontSize: 12,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    maxWidth: "40%",
                  }} className="bio-url">{url}</span>
                </a>
              ))}
            </nav>

            {/* ICONOS DE CONTACTO */}
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 24, marginBottom: 24 }}>
              <a
                href="mailto:info@basketouch.com"
                style={contactIconStyle}
                aria-label="Email"
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FF4757"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#3a3a3a"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=34666136257&text=Hola+Jorge%2C+quiero+hacerte+una+pregunta"
                target="_blank" rel="noopener noreferrer"
                style={contactIconStyle}
                aria-label="WhatsApp"
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FF4757"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#3a3a3a"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>

            {/* FOTOS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 8 }}>
              {[
                { src: "https://newsletter.jorgelorenzo.coach/Con_Scariolo.png", caption: "Eurobasket 2022", alt: "Jorge Lorenzo con Scariolo, Eurobasket 2022" },
                { src: "https://newsletter.jorgelorenzo.coach/Copa_vertical.png", caption: "Mundial 2019", alt: "Jorge Lorenzo con la Copa del Mundo 2019" },
              ].map(({ src, caption, alt }) => (
                <div key={caption} style={{ display: "flex", flexDirection: "column" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src} alt={alt}
                    style={{
                      width: "100%", borderRadius: 14,
                      border: "1px solid #3a3a3a",
                      objectFit: "cover", aspectRatio: "3/4",
                      objectPosition: "top",
                      display: "block",
                    }}
                  />
                  <p style={{ marginTop: 8, fontSize: 12, color: "#888", textAlign: "center" }}>{caption}</p>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #2a2a2a", textAlign: "center" }}>
              <p style={{ color: "#555", fontSize: 12 }}>© {new Date().getFullYear()} Jorge Lorenzo</p>
            </div>
          </div>
        </div>
      </div>

      {/* SHARE MODAL */}
      {shareOpen && (
        <div
          onClick={() => setShareOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex", alignItems: "flex-start", justifyContent: "center",
            padding: "48px 16px 24px", zIndex: 50,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(420px, 100%)",
              background: "#191919", border: "1px solid #3a3a3a",
              borderRadius: 24, padding: "20px 16px 16px",
              boxShadow: "0 18px 45px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Compartir</span>
              <button
                onClick={() => setShareOpen(false)}
                style={{ background: "none", border: "none", color: "#888", fontSize: 22, cursor: "pointer", lineHeight: 1 }}
              >×</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {SHARE_OPTIONS.map(({ key, label, icon }) => (
                <button
                  key={key}
                  onClick={() => handleShare(key)}
                  style={{
                    background: "#252525", border: "1px solid #3a3a3a",
                    borderRadius: 16, padding: "14px 8px",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                    color: "#fff", cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FF4757"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#3a3a3a"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <span style={{ width: 28, height: 28 }}>{icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 500 }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 480px) {
          .bio-url { display: none !important; }
        }
      `}</style>
    </>
  );
}

const contactIconStyle: React.CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "center",
  width: 48, height: 48, borderRadius: "50%",
  background: "#1a1a1a", border: "1px solid #3a3a3a",
  textDecoration: "none", color: "#fff", transition: "all 0.2s",
};
