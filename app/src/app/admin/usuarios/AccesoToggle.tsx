"use client";

import { useState } from "react";

interface Props {
  userId: string;
  cursoId: number;
  tieneAcceso: boolean;
  cursoSlug: string;
}

export default function AccesoToggle({ userId, cursoId, tieneAcceso, cursoSlug }: Props) {
  const [acceso, setAcceso] = useState(tieneAcceso);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    await fetch("/api/admin/acceso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, cursoId, cursoSlug, action: acceso ? "revoke" : "grant" }),
    });
    setAcceso(!acceso);
    setLoading(false);
  }

  return (
    <button onClick={toggle} disabled={loading} style={{
      fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 4,
      border: `1px solid ${acceso ? "var(--oro)" : "var(--borde)"}`,
      background: acceso ? "rgba(201,168,76,0.1)" : "transparent",
      color: acceso ? "var(--oro)" : "var(--texto-suave)",
      cursor: "pointer",
    }}>
      {loading ? "..." : acceso ? "✓ Acceso" : "+ Dar acceso"}
    </button>
  );
}
