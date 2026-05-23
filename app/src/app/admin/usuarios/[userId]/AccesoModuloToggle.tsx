"use client";

import { useState } from "react";

export default function AccesoModuloToggle({
  userId,
  moduloId,
  tieneAcceso,
}: {
  userId: string;
  moduloId: number;
  tieneAcceso: boolean;
}) {
  const [acceso, setAcceso] = useState(tieneAcceso);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    await fetch("/api/admin/acceso-modulo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, modulo_id: moduloId, action: acceso ? "revoke" : "grant" }),
    });
    setAcceso(!acceso);
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      style={{
        fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 4,
        border: `1px solid ${acceso ? "#4a9" : "var(--borde)"}`,
        background: acceso ? "rgba(64,170,100,0.1)" : "transparent",
        color: acceso ? "#4a9" : "var(--texto-suave)",
        cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
      }}
    >
      {loading ? "..." : acceso ? "✓ Activo" : "+ Dar acceso"}
    </button>
  );
}
