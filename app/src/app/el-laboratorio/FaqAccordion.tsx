"use client";

import { useState } from "react";

const faqs = [
  {
    q: "¿Qué pasa si entro a mitad de mes?",
    a: "Accederás inmediatamente al contenido del mes en curso, aunque ya se haya liberado parte. Ejemplo: si entras el día 10, verás lo publicado el 1er miércoles y después lo del 3er miércoles.",
  },
  {
    q: "¿Tengo acceso a los capítulos anteriores?",
    a: "Con Premium accedes al mes en curso y al anterior. El archivo completo de la temporada está disponible como producto independiente dentro de la comunidad.",
  },
  {
    q: "¿Qué ocurre si cancelo mi suscripción?",
    a: "Seguirás teniendo acceso hasta que acabe tu periodo ya pagado. Después perderás el acceso al Laboratorio y al contenido de la comunidad.",
  },
  {
    q: "¿Cuándo se me cobra?",
    a: "El primer pago se hace en el momento de la compra. Después se renueva cada mes en la misma fecha. Ejemplo: si compras el día 5, renovarás el 5 de cada mes.",
  },
  {
    q: "¿Puedo compartir mi acceso?",
    a: "No. La suscripción es personal e intransferible. El contenido está diseñado solo para miembros activos.",
  },
];

export default function FaqAccordion() {
  const [abierto, setAbierto] = useState<number | null>(null);

  return (
    <div className="faq-lista">
      {faqs.map((faq, i) => (
        <div key={i} className={`faq-item${abierto === i ? " abierto" : ""}`}>
          <button className="faq-pregunta" onClick={() => setAbierto(abierto === i ? null : i)}>
            {faq.q}
            <span className="faq-icono">+</span>
          </button>
          <div className="faq-respuesta">{faq.a}</div>
        </div>
      ))}
    </div>
  );
}
