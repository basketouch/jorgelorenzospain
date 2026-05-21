"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function MarcarCompletada({
  leccionId,
  completada,
  siguienteId,
  slug,
}: {
  leccionId: number;
  completada: boolean;
  siguienteId?: number;
  slug: string;
}) {
  const [hecha, setHecha] = useState(completada);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function toggle() {
    setLoading(true);
    const supabase = createClient();
    await supabase.from("progreso").upsert(
      { leccion_id: leccionId, completada: !hecha },
      { onConflict: "user_id,leccion_id" }
    );
    setHecha(!hecha);
    setLoading(false);
    if (!hecha && siguienteId) {
      router.push(`/ver/${slug}/${siguienteId}`);
    } else {
      router.refresh();
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      style={{
        background: hecha ? "transparent" : "var(--oro)",
        color: hecha ? "var(--oro)" : "var(--negro)",
        border: "1px solid var(--oro)",
        borderRadius: 6,
        padding: "10px 20px",
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "inherit",
        whiteSpace: "nowrap",
        transition: "all 0.2s",
      }}
    >
      {loading ? "..." : hecha ? "✓ Completada" : "Marcar como completada"}
    </button>
  );
}
