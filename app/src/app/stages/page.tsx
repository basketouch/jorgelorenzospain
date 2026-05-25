import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase-server";
import ContactoForm from "./ContactoForm";

export const metadata = { title: "Stages Spain — Jorge Lorenzo Coach" };

const instalaciones = [
  {
    ciudad: "Málaga · Fuengirola",
    pabellon: "The Embassy — Training Center Higuerón",
    hotel: "Hilton Higuerón Hotel",
    descripcion: "El centro de entrenamiento más moderno de Andalucía. Pavimento de madera profesional, equipamiento de última generación y acceso directo a la Costa del Sol.",
    detalles: [
      "25 min de Marbella · 15 min del aeropuerto",
      "Hotel 5★ a 3 minutos con spa y piscina",
      "Playas de la Costa del Sol a 10 minutos",
    ],
    emoji: "☀️",
  },
  {
    ciudad: "Madrid · Torrejón de Ardoz",
    pabellon: "Training Center José Antonio Paraíso",
    hotel: "Hotel Asset Torrejón",
    descripcion: "Instalaciones profesionales a 25 minutos del centro de Madrid y 10 minutos del aeropuerto Adolfo Suárez. Acceso privilegiado a la capital del baloncesto europeo.",
    detalles: [
      "10 min del aeropuerto Madrid-Barajas",
      "Tour por el Santiago Bernabéu y Gran Vía",
      "Hotel con restaurante, gimnasio y sauna",
    ],
    emoji: "🏛️",
  },
  {
    ciudad: "Valencia",
    pabellon: "L'Alqueria del Basket",
    hotel: "Hotel en Valencia ciudad",
    descripcion: "La sede oficial del Valencia Basket y referente del baloncesto europeo. 13 pistas simultáneas para trabajar con grupos de cualquier tamaño.",
    detalles: [
      "14 min del centro de Valencia",
      "13 pistas para entrenamiento simultáneo",
      "Instalación de referencia en Europa",
    ],
    emoji: "🏟️",
  },
];

const serviciosBase = [
  { icono: "✈️", texto: "Transporte aeropuerto e instalaciones" },
  { icono: "🏀", texto: "Amistosos contra equipos de nivel similar" },
  { icono: "🏨", texto: "Alojamiento 3–5★ según necesidades" },
  { icono: "🍽️", texto: "Pensión completa (todas las comidas)" },
  { icono: "🎭", texto: "Actividades culturales y turísticas" },
  { icono: "🏥", texto: "Asistencia médica durante el stage" },
];

const serviciosExtra = [
  "Lavandería", "Sala de reuniones", "Grabación de sesiones", "Dietas personalizadas",
  "Soporte 24h", "Charlas de entrenadores de élite",
];

export default async function StagesPage() {
  let user = null;
  try {
    const supabase = await createClient();
    const { data: { user: u } } = await supabase.auth.getUser();
    user = u;
  } catch { /* anónimo */ }

  return (
    <>
      {/* NAV */}
      <nav>
        <a href="/" className="nav-logo">Jorge <span>Lorenzo</span></a>
        <div className="nav-links">
          <a href="/#niveles" className="nav-link">Comunidad</a>
          <a href="/cursos" className="nav-link">Cursos</a>
          <a href="/stages#contacto" className="nav-link">Contacto</a>
          {user ? (
            <a href="/cuenta" className="nav-cta">Mi cuenta</a>
          ) : (
            <a href="/login" className="nav-cta">Acceder</a>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "90vh", display: "flex", alignItems: "center", paddingTop: 120, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 40%, rgba(201,168,76,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div className="container" style={{ maxWidth: 1100, position: "relative" }}>
          <p className="hero-eyebrow">Stages Spain · Baloncesto de Alto Rendimiento</p>
          <h1 style={{ fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 800, lineHeight: 1.05, color: "var(--blanco)", letterSpacing: "-0.02em", marginBottom: 24, maxWidth: 800 }}>
            Entrena en España.<br />
            <span style={{ color: "var(--oro)" }}>Al más alto nivel.</span>
          </h1>
          <p style={{ fontSize: 18, color: "var(--texto-suave)", maxWidth: 580, lineHeight: 1.7, marginBottom: 48 }}>
            Stages de preparación integral para equipos y clubes de baloncesto.
            Instalaciones de élite, amistosos de nivel, alojamiento premium y la experiencia de quien ha competido en los mayores escenarios del mundo.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#contacto" className="btn-primary" style={{ fontSize: 14 }}>
              Solicitar presupuesto →
            </a>
            <a href="#instalaciones" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--texto-suave)", textDecoration: "none", padding: "16px 0", borderBottom: "1px solid var(--borde)" }}>
              Ver instalaciones ↓
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, marginTop: 72, paddingTop: 48, borderTop: "1px solid var(--borde)" }}>
            {[
              { n: "3", label: "Sedes en España" },
              { n: "15+", label: "Años de experiencia" },
              { n: "2×", label: "Campeón del Mundo" },
              { n: "360°", label: "Servicio integral" },
            ].map(({ n, label }) => (
              <div key={label}>
                <p style={{ fontSize: 36, fontWeight: 800, color: "var(--oro)", lineHeight: 1 }}>{n}</p>
                <p style={{ fontSize: 13, color: "var(--texto-suave)", marginTop: 6 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUÉ INCLUYE */}
      <section style={{ paddingTop: 100, paddingBottom: 100, borderTop: "1px solid var(--borde)", background: "var(--oscuro)" }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          <p className="hero-eyebrow" style={{ marginBottom: 12 }}>Servicio integral</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: 16 }}>Todo organizado.<br />Vosotros, solo entrenad.</h2>
          <p style={{ fontSize: 16, color: "var(--texto-suave)", maxWidth: 560, marginBottom: 56, lineHeight: 1.7 }}>
            Nos encargamos de la logística completa para que el cuerpo técnico y los jugadores puedan centrarse exclusivamente en el trabajo de pista.
          </p>

          {/* Servicios base */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 48 }}>
            {serviciosBase.map(({ icono, texto }) => (
              <div key={texto} style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 10, padding: "20px 24px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{icono}</span>
                <span style={{ fontSize: 15, color: "var(--texto-suave)", lineHeight: 1.5 }}>{texto}</span>
              </div>
            ))}
          </div>

          {/* Extras */}
          <div style={{ background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 10, padding: "24px 28px" }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>
              Servicios adicionales
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {serviciosExtra.map(s => (
                <span key={s} style={{ fontSize: 13, color: "var(--texto-suave)", background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 20, padding: "5px 14px" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INSTALACIONES */}
      <section id="instalaciones" style={{ paddingTop: 100, paddingBottom: 100, borderTop: "1px solid var(--borde)" }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          <p className="hero-eyebrow" style={{ marginBottom: 12 }}>Dónde entrenamos</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: 56 }}>Tres sedes. Tres experiencias.</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {instalaciones.map((inst, i) => (
              <div key={inst.ciudad} style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr", gap: 48, alignItems: "center" }}>
                {/* Info */}
                <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                  <p style={{ fontSize: 28, marginBottom: 8 }}>{inst.emoji}</p>
                  <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 8 }}>{inst.ciudad}</p>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: "var(--blanco)", marginBottom: 4 }}>{inst.pabellon}</h3>
                  <p style={{ fontSize: 14, color: "var(--texto-suave)", marginBottom: 16 }}>🏨 {inst.hotel}</p>
                  <p style={{ fontSize: 15, color: "var(--texto-suave)", lineHeight: 1.7, marginBottom: 24 }}>{inst.descripcion}</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {inst.detalles.map(d => (
                      <li key={d} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--texto-suave)" }}>
                        <span style={{ color: "var(--oro)", flexShrink: 0 }}>→</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual placeholder card */}
                <div style={{ order: i % 2 === 0 ? 1 : 0, background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 12, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontSize: 48 }}>{inst.emoji}</span>
                  <p style={{ fontSize: 13, color: "var(--texto-suave)", textAlign: "center", padding: "0 20px" }}>{inst.ciudad}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE JORGE */}
      <section style={{ paddingTop: 100, paddingBottom: 100, borderTop: "1px solid var(--borde)", background: "var(--oscuro)" }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <p className="hero-eyebrow" style={{ marginBottom: 12 }}>Por qué elegirnos</p>
              <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", marginBottom: 24 }}>Experiencia en los mayores escenarios del mundo.</h2>
              <p style={{ fontSize: 16, color: "var(--texto-suave)", lineHeight: 1.8, marginBottom: 24 }}>
                Jorge Lorenzo no es un organizador de viajes. Es un entrenador con 25 años en la élite del baloncesto que usa esa red y ese conocimiento para diseñar stages que realmente impactan en el juego de tu equipo.
              </p>
              <p style={{ fontSize: 16, color: "var(--texto-suave)", lineHeight: 1.8 }}>
                Cada stage se planifica con la misma mentalidad que una preparación para un Eurobasket: objetivos claros, rivales adecuados, instalaciones de primer nivel y una experiencia que el equipo recordará.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icono: "🥇", titulo: "2× Campeón del Mundo", sub: "Selección Española · FIBA" },
                { icono: "🥇", titulo: "2× Medalla Olímpica", sub: "Tokyo 2021 · París 2024" },
                { icono: "🏅", titulo: "Eurobasket · Mundiales", sub: "Berlín 2022 · Jakarta 2023 · Chipre 2025" },
                { icono: "🏀", titulo: "Director de Academia", sub: "Clube 1º de Agosto · Angola" },
                { icono: "📋", titulo: "CEO Basketouch Solutions Spain", sub: "Consultoría y formación en baloncesto" },
              ].map(({ icono, titulo, sub }) => (
                <div key={titulo} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 16px", background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 8 }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{icono}</span>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "var(--texto)", marginBottom: 2 }}>{titulo}</p>
                    <p style={{ fontSize: 12, color: "var(--texto-suave)" }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" style={{ paddingTop: 100, paddingBottom: 120, borderTop: "1px solid var(--borde)" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <p className="hero-eyebrow" style={{ marginBottom: 12 }}>Solicitar información</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", marginBottom: 12 }}>Cuéntanos vuestro proyecto.</h2>
          <p style={{ fontSize: 16, color: "var(--texto-suave)", marginBottom: 48, lineHeight: 1.7 }}>
            Cada stage es diferente. Rellena el formulario y te preparamos una propuesta personalizada en menos de 48 horas.
          </p>

          <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 12, padding: 40 }}>
            <ContactoForm />
          </div>

          {/* Contacto directo */}
          <div style={{ marginTop: 40, display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:info@jorgelorenzo.coach" style={{ fontSize: 14, color: "var(--texto-suave)", textDecoration: "none", display: "flex", gap: 8, alignItems: "center" }}>
              ✉ info@jorgelorenzo.coach
            </a>
            <a href="tel:+34666136257" style={{ fontSize: 14, color: "var(--texto-suave)", textDecoration: "none", display: "flex", gap: 8, alignItems: "center" }}>
              📞 +34 666 136 257
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
