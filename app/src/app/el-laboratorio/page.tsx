import { supabase } from "@/lib/supabase";
import FaqAccordion from "./FaqAccordion";

export const metadata = {
  title: "El Laboratorio del Entrenador — Jorge Lorenzo",
  description: "Programa mensual de formación para entrenadores de baloncesto. Técnica, táctica, gestión y liderazgo.",
  robots: "noindex",
};

async function getData() {
  const [{ data: temas }, { data: capitulos }] = await Promise.all([
    supabase.from("laboratorio_temas").select("*").eq("activo", true).order("orden"),
    supabase.from("laboratorio_programa").select("*").eq("activo", true).eq("en_curso", false).order("numero"),
  ]);
  return {
    tecnico: (temas ?? []).filter((t) => t.area === "tecnico"),
    gestion: (temas ?? []).filter((t) => t.area === "gestion"),
    capitulos: capitulos ?? [],
  };
}

export default async function ElLaboratorio() {
  const { tecnico, gestion, capitulos } = await getData();

  return (
    <>
      {/* NAV */}
      <nav>
        <a href="/" className="nav-logo">Jorge <span>Lorenzo</span></a>
        <div className="nav-links">
          <a href="#programa" className="nav-link">Programa</a>
          <a href="#faq" className="nav-link">FAQ</a>
          <a href="https://www.skool.com/jorge-lorenzo-coach/plans" target="_blank" rel="noopener noreferrer" className="nav-cta">Acceder en Skool</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <p className="hero-eyebrow">Jorge Lorenzo · Comunidad de Entrenadores</p>
            <h1>El Laboratorio<br /><span className="accent">del Entrenador.</span></h1>
            <p className="hero-body">
              Un programa mensual para entrenadores que quieren ir más allá del ejercicio y el sistema. Técnica, táctica, gestión y liderazgo — todo construido sobre situaciones reales de pista.
            </p>
            <div className="hero-botones">
              <a href="https://www.skool.com/jorge-lorenzo-coach/plans" target="_blank" rel="noopener noreferrer" className="btn-primary">Acceder en Skool</a>
              <a href="#programa" className="btn-outline">Ver el programa</a>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section>
        <div className="container">
          <p className="section-label">Cómo funciona</p>
          <h2>Cada mes, tres entregas.</h2>
          <p className="lead">El Laboratorio sigue el ritmo de la temporada: septiembre a junio, más post-temporada en julio y pre-temporada en agosto.</p>
          <div className="cadencia-grid">
            <div className="cadencia-item destacado">
              <div className="cadencia-icon">📹</div>
              <p className="cadencia-titulo">Primer miércoles</p>
              <p className="cadencia-desc">Contenido central del mes. Vídeos de técnica, táctica y aplicación directa.</p>
            </div>
            <div className="cadencia-item">
              <div className="cadencia-icon">🎙</div>
              <p className="cadencia-titulo">Tercer miércoles</p>
              <p className="cadencia-desc">Charla sobre gestión de equipo, lecturas y contexto del mes.</p>
            </div>
            <div className="cadencia-item">
              <div className="cadencia-icon">💬</div>
              <p className="cadencia-titulo">Q&A en Skool</p>
              <p className="cadencia-desc">Preguntas, debate y análisis con la comunidad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VÍDEOS PREVIEW */}
      <section>
        <div className="container">
          <p className="section-label">El Laboratorio por dentro</p>
          <h2>Así suena el Laboratorio.</h2>
          <p className="lead">Dos muestras de la temporada 2025/26 — para que veas de qué va antes de entrar.</p>
          <div className="videos-preview">
            <div className="video-card">
              <div className="video-wrapper">
                <iframe src="https://player.vimeo.com/video/1190934536?color=c9a84c&byline=0&portrait=0&title=0&dnt=1" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
              </div>
              <p className="video-label"><span>↳</span>Puntos Clave del Scouting — Temporada 2025/26</p>
            </div>
            <div className="video-card">
              <div className="video-wrapper">
                <iframe src="https://player.vimeo.com/video/1191259291?color=c9a84c&byline=0&portrait=0&title=0&dnt=1" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
              </div>
              <p className="video-label"><span>↳</span>Liderazgo del entrenador — de la pizarra al día a día</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMA */}
      <section id="programa">
        <div className="container">
          <p className="section-label">Temporada 2026/27</p>
          <h2>El programa del año.</h2>
          <p className="lead">Un guión definido antes de empezar la temporada. Sabes desde el primer día qué vamos a trabajar y cuándo.</p>
          <div className="capitulos-grid">
            {capitulos.length > 0 ? capitulos.map((cap) => (
              <div key={cap.id} className="capitulo-item">
                <div className="capitulo-numero">{String(cap.numero).padStart(2, "0")}</div>
                <div>
                  <p className="capitulo-titulo">{cap.titulo}</p>
                  {cap.descripcion && <p className="capitulo-desc">{cap.descripcion}</p>}
                </div>
              </div>
            )) : (
              <div className="capitulo-loading">El programa de la nueva temporada se publicará próximamente.</div>
            )}
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section>
        <div className="container">
          <p className="section-label">Temporada 2025/26 · De referencia</p>
          <h2>Lo que trabajamos el año pasado.</h2>
          <p className="lead" style={{ marginBottom: 0 }}>El programa 2026/27 se publicará antes del inicio de temporada. Esto es lo que cubrimos en 2025/26.</p>
          <div className="contenido-grid">
            <div>
              <p className="contenido-col-titulo">Técnico y táctico</p>
              <ul className="contenido-lista">
                {tecnico.map((t) => <li key={t.id}>{t.tema}</li>)}
              </ul>
            </div>
            <div>
              <p className="contenido-col-titulo">Gestión y liderazgo</p>
              <ul className="contenido-lista">
                {gestion.map((t) => <li key={t.id}>{t.tema}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="container">
          <p className="section-label">FAQ</p>
          <h2>Preguntas necesarias.</h2>
          <FaqAccordion />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-final">
        <div className="container">
          <p className="section-label">Accede al Laboratorio</p>
          <h2>Empieza cuando quieras.</h2>
          <p className="lead">Incluido en el plan Premium ($45/mes). Si prefieres el archivo completo de la temporada, está disponible como producto independiente dentro de la comunidad.</p>
          <div className="cta-botones">
            <a href="https://www.skool.com/jorge-lorenzo-coach/plans" target="_blank" rel="noopener noreferrer" className="btn-primary">Acceder en Skool</a>
            <a href="/" className="btn-outline">Volver a la comunidad</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 Jorge Lorenzo · Comunidad de Entrenadores · Baloncesto</p>
      </footer>
    </>
  );
}
