"use client";

import { useState } from "react";
import LeccionEditor from "./LeccionEditor";

interface Leccion {
  id: number;
  titulo: string;
  video_id?: string;
  duracion?: string;
  es_preview: boolean;
  orden: number;
}

export default function LeccionesOrdenables({
  lecciones: inicial,
  cursoSlug,
}: {
  lecciones: Leccion[];
  cursoSlug: string;
}) {
  const [lecciones, setLecciones] = useState(() =>
    [...inicial].sort((a, b) => a.orden - b.orden)
  );
  const [moviendo, setMoviendo] = useState(false);

  async function mover(index: number, dir: "up" | "down") {
    const otro = dir === "up" ? index - 1 : index + 1;
    if (otro < 0 || otro >= lecciones.length || moviendo) return;

    setMoviendo(true);
    const nuevas = [...lecciones];
    const ordenA = nuevas[index].orden;
    const ordenB = nuevas[otro].orden;

    nuevas[index] = { ...nuevas[index], orden: ordenB };
    nuevas[otro] = { ...nuevas[otro], orden: ordenA };
    nuevas.sort((a, b) => a.orden - b.orden);
    setLecciones(nuevas);

    await Promise.all([
      fetch(`/api/admin/leccion/${lecciones[index].id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orden: ordenB }),
      }),
      fetch(`/api/admin/leccion/${lecciones[otro].id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orden: ordenA }),
      }),
    ]);

    setMoviendo(false);
  }

  return (
    <div>
      {lecciones.map((leccion, index) => (
        <div key={leccion.id} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
          {/* Flechas de orden */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 13, flexShrink: 0 }}>
            <button
              onClick={() => mover(index, "up")}
              disabled={index === 0 || moviendo}
              title="Mover arriba"
              style={{
                width: 20, height: 20, border: "1px solid var(--borde)", borderRadius: 3,
                background: "none", padding: 0, lineHeight: 1,
                cursor: index === 0 ? "default" : "pointer",
                color: index === 0 ? "var(--borde)" : "var(--texto-suave)",
                fontSize: 11,
              }}
            >↑</button>
            <button
              onClick={() => mover(index, "down")}
              disabled={index === lecciones.length - 1 || moviendo}
              title="Mover abajo"
              style={{
                width: 20, height: 20, border: "1px solid var(--borde)", borderRadius: 3,
                background: "none", padding: 0, lineHeight: 1,
                cursor: index === lecciones.length - 1 ? "default" : "pointer",
                color: index === lecciones.length - 1 ? "var(--borde)" : "var(--texto-suave)",
                fontSize: 11,
              }}
            >↓</button>
          </div>

          {/* Editor de lección — key incluye orden para reflejar número actualizado */}
          <div style={{ flex: 1 }}>
            <LeccionEditor
              key={`${leccion.id}-${leccion.orden}`}
              leccion={leccion}
              cursoSlug={cursoSlug}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
