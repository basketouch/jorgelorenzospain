"use client";

import { useState } from "react";

interface Props {
  sidebar: React.ReactNode;
  player: React.ReactNode;
  header: React.ReactNode;
}

export default function PlayerLayout({ sidebar, player, header }: Props) {
  const [sidebarAbierto, setSidebarAbierto] = useState(true);

  return (
    <div style={{
      display: "grid",
      gridTemplateRows: "56px 1fr",
      gridTemplateColumns: sidebarAbierto ? "280px 1fr" : "0px 1fr",
      height: "100vh",
      overflow: "hidden",
      transition: "grid-template-columns 0.25s ease",
    }}>
      {/* HEADER */}
      <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1, height: "100%" }}>
          {header}
        </div>
      </div>

      {/* SIDEBAR + toggle */}
      <div style={{ position: "relative", overflow: "hidden", transition: "opacity 0.2s", opacity: sidebarAbierto ? 1 : 0 }}>
        {sidebar}

        {/* Tab toggle pegado al borde derecho del sidebar, alineado con el header */}
        <button
          onClick={() => setSidebarAbierto(false)}
          title="Ocultar temario"
          style={{
            position: "absolute", top: 0, right: 0,
            width: 18, height: 48,
            background: "var(--borde)",
            border: "none",
            borderRadius: "0 0 0 4px",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--texto-suave)", fontSize: 10,
            zIndex: 10,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--oro)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--borde)")}
        >
          ‹
        </button>
      </div>

      {/* PLAYER + tab para abrir sidebar cuando está cerrado */}
      <div style={{ overflowY: "auto", height: "100%", position: "relative" }}>
        {!sidebarAbierto && (
          <button
            onClick={() => setSidebarAbierto(true)}
            title="Ver temario"
            style={{
              position: "absolute", top: 0, left: 0,
              width: 18, height: 48,
              background: "var(--borde)",
              border: "none",
              borderRadius: "0 0 4px 0",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--texto-suave)", fontSize: 10,
              zIndex: 10,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--oro)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--borde)")}
          >
            ›
          </button>
        )}
        {player}
      </div>
    </div>
  );
}
