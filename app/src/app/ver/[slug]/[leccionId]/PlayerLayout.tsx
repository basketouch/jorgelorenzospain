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
        {/* Botón toggle */}
        <button
          onClick={() => setSidebarAbierto(!sidebarAbierto)}
          title={sidebarAbierto ? "Ocultar temario" : "Ver temario"}
          style={{
            height: "100%",
            width: 44,
            flexShrink: 0,
            background: "none",
            border: "none",
            borderRight: "1px solid var(--borde)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--texto-suave)",
            fontSize: 16,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--oro)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--texto-suave)")}
        >
          {sidebarAbierto ? "◀" : "▶"}
        </button>
        <div style={{ flex: 1, height: "100%" }}>
          {header}
        </div>
      </div>

      {/* SIDEBAR */}
      <div style={{
        overflow: "hidden",
        transition: "opacity 0.2s",
        opacity: sidebarAbierto ? 1 : 0,
      }}>
        {sidebar}
      </div>

      {/* PLAYER */}
      <div style={{ overflowY: "auto", height: "100%" }}>
        {player}
      </div>
    </div>
  );
}
