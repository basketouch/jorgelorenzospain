"use client";

import { useState } from "react";

const faqs = [
  {
    q: "¿Cuál es la diferencia entre comprarlo en la web o acceder por Skool?",
    a: "Si lo compras en la web (347€), accedes al curso completo aquí, en jorgelorenzo.coach, y lo ves las veces que quieras sin ningún tipo de suscripción. Si entras en Skool, además del curso tienes la comunidad activa de entrenadores, el contenido semanal y la interacción directa. El precio del archivo en Skool es 297€ — 50€ menos.",
  },
  {
    q: "¿Necesito ser miembro Premium de Skool para comprar el curso a 297€?",
    a: "No. Cualquier nivel de la comunidad Skool — desde el plan Standard ($20/mes) — te da acceso a comprar el archivo completo del Laboratorio 25/26 por 297€. El plan Sistema ($45/mes) incluye además los dos meses en curso del Laboratorio.",
  },
  {
    q: "¿Qué incluye exactamente el plan Sistema ($45/mes)?",
    a: "El plan Sistema incluye todo lo del plan Standard más el Laboratorio del Entrenador: mínimo 3 vídeos al mes de técnica, táctica y gestión, y acceso a los dos últimos meses publicados. Si quieres el archivo completo de toda la temporada, está disponible por 297€.",
  },
  {
    q: "¿Cuándo se abre la venta del curso en la web?",
    a: "La apertura está prevista para junio de 2026. Será una ventana de venta limitada — no estará disponible de forma permanente. Si quieres acceso antes y al mejor precio, la forma más directa es entrar en la comunidad Skool.",
  },
  {
    q: "¿El acceso es permanente?",
    a: "Depende de dónde lo compres. Si lo adquieres en la web (347€), el acceso es permanente en jorgelorenzo.coach — sin suscripción, sin caducidad. Si lo compras dentro de Skool (297€), el acceso está ligado a tu membresía: mientras mantengas la suscripción activa, tienes acceso al contenido.",
  },
  {
    q: "¿Puedo cancelar la suscripción a Skool y seguir viendo el curso?",
    a: "No. Si cancelas tu suscripción a Skool, pierdes el acceso a todo el contenido de dentro — comunidad, contenido mensual y el archivo del Laboratorio. Si quieres un acceso permanente e independiente de cualquier suscripción, la opción de la web (347€) es la más adecuada.",
  },
];

export default function FaqAccordion() {
  const [abierto, setAbierto] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {faqs.map(({ q, a }, i) => {
        const activo = abierto === i;
        return (
          <div key={i} style={{ borderBottom: "1px solid var(--borde)" }}>
            <button
              onClick={() => setAbierto(activo ? null : i)}
              style={{
                width: "100%", background: "none", border: "none",
                padding: "22px 0", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 600, color: activo ? "var(--oro)" : "var(--blanco)", lineHeight: 1.4, transition: "color 0.2s" }}>
                {q}
              </span>
              <span style={{
                fontSize: 20, color: "var(--oro)", flexShrink: 0,
                transform: activo ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform 0.25s",
                display: "inline-block", lineHeight: 1,
              }}>
                +
              </span>
            </button>
            {activo && (
              <p style={{ fontSize: 14, color: "var(--texto-suave)", lineHeight: 1.75, paddingBottom: 22, paddingRight: 32 }}>
                {a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
