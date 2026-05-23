"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EliminarUsuario({ userId, nombre }: { userId: string; nombre: string }) {
  const [confirmando, setConfirmando] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function eliminar() {
    setLoading(true);
    await fetch("/api/admin/usuario", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    router.push("/admin/usuarios");
    router.refresh();
  }

  if (confirmando) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 13, color: "var(--texto-suave)" }}>¿Eliminar a {nombre}?</span>
        <button
          onClick={eliminar}
          disabled={loading}
          style={{
            fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 6,
            border: "1px solid #e05c5c", background: "rgba(224,92,92,0.1)",
            color: "#e05c5c", cursor: "pointer",
          }}
        >
          {loading ? "Eliminando..." : "Sí, eliminar"}
        </button>
        <button
          onClick={() => setConfirmando(false)}
          style={{
            fontSize: 12, padding: "6px 14px", borderRadius: 6,
            border: "1px solid var(--borde)", background: "transparent",
            color: "var(--texto-suave)", cursor: "pointer",
          }}
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirmando(true)}
      style={{
        fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 6,
        border: "1px solid #e05c5c", background: "transparent",
        color: "#e05c5c", cursor: "pointer",
      }}
    >
      Eliminar usuario
    </button>
  );
}
