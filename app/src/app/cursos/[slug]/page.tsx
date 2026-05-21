import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import CurriculumAccordion from "./CurriculumAccordion";

export default async function CursoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: curso } = await supabase
    .from("cursos")
    .select("*, modulos(*, lecciones_curso(*))")
    .eq("slug", slug)
    .eq("activo", true)
    .single();

  if (!curso) notFound();

  const { data: { user } } = await supabase.auth.getUser();

  let tieneAcceso = false;
  if (user) {
    const { data } = await supabase.rpc("tiene_acceso", { p_curso_id: curso.id });
    tieneAcceso = !!data;
  }

  const modulos = curso.modulos?.sort((a: { orden: number }, b: { orden: number }) => a.orden - b.orden) ?? [];
  const totalLecciones = modulos.reduce(
    (acc: number, m: { lecciones_curso: unknown[] }) => acc + (m.lecciones_curso?.length ?? 0), 0
  );
  const esGratuito = curso.precio === 0;

  return (
    <>
      <nav>
        <a href="/" className="nav-logo">Jorge <span>Lorenzo</span></a>
        <div className="nav-links">
          {user ? (
            <a href="/cuenta" className="nav-link">Mi cuenta</a>
          ) : (
            <a href="/login" className="nav-link">Acceder</a>
          )}
        </div>
      </nav>

      {/* HERO */}
      <div style={{ paddingTop: 64, background: "var(--oscuro)", borderBottom: "1px solid var(--borde)" }}>
        <div className="container" style={{ paddingTop: 60, paddingBottom: 60 }}>
          <a href="/cursos" style={{ color: "var(--texto-suave)", fontSize: 13, textDecoration: "none", display: "inline-block", marginBottom: 24 }}>
            ← Todos los cursos
          </a>
          <p className="section-label">Curso · Temporada 2025/26</p>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 52px)", maxWidth: 700, marginBottom: 20 }}>{curso.titulo}</h2>
          {curso.descripcion && (
            <p style={{ fontSize: 17, color: "var(--texto-suave)", maxWidth: 620, lineHeight: 1.7, marginBottom: 32 }}>
              {curso.descripcion}
            </p>
          )}
          {/* Stats */}
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[
              { valor: modulos.length, etiqueta: "módulos" },
              { valor: totalLecciones, etiqueta: "lecciones" },
              { valor: "9 meses", etiqueta: "de contenido" },
            ].map(({ valor, etiqueta }) => (
              <div key={etiqueta}>
                <span style={{ fontSize: 28, fontWeight: 800, color: "var(--oro)" }}>{valor}</span>
                <span style={{ fontSize: 14, color: "var(--texto-suave)", marginLeft: 6 }}>{etiqueta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <section style={{ paddingTop: 60, paddingBottom: 120 }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 48, alignItems: "start" }}>

            {/* IZQUIERDA */}
            <div>
              {/* Para quién es */}
              <div style={{ marginBottom: 48 }}>
                <p className="section-label">¿Para quién es?</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    "Entrenadores de baloncesto que quieren ir más allá del ejercicio y el sistema.",
                    "Técnicos que buscan contenido práctico aplicable desde el primer día.",
                    "Entrenadores que quieren mejorar su gestión, liderazgo y toma de decisiones.",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15, color: "var(--texto-suave)", lineHeight: 1.6 }}>
                      <span style={{ color: "var(--oro)", fontWeight: 700, flexShrink: 0 }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lo que trabajamos */}
              <div style={{ marginBottom: 48 }}>
                <p className="section-label">Lo que trabajamos</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { icono: "🎯", texto: "Estilos de juego del Eurobasket" },
                    { icono: "🛡️", texto: "Defensa en formación y élite" },
                    { icono: "⚡", texto: "Técnica individual ofensiva" },
                    { icono: "🔄", texto: "Defensa del bloqueo directo" },
                    { icono: "📐", texto: "Spacing con 4 abiertos" },
                    { icono: "📋", texto: "Sistemas de ataque" },
                    { icono: "🗓️", texto: "Planificación de entrenamientos" },
                    { icono: "🔍", texto: "Scouting y preparación de partido" },
                  ].map(({ icono, texto }) => (
                    <div key={texto} style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 8, padding: "14px 16px", display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ fontSize: 18 }}>{icono}</span>
                      <span style={{ fontSize: 13, color: "var(--texto-suave)" }}>{texto}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Temario */}
              <div>
                <p className="section-label">Temario completo</p>
                <CurriculumAccordion modulos={modulos} />
              </div>
            </div>

            {/* DERECHA — Card */}
            <div style={{ position: "sticky", top: 100 }}>
              <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 12, padding: 28, boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
                {curso.portada_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={curso.portada_url} alt={curso.titulo}
                    style={{ width: "100%", borderRadius: 8, marginBottom: 20, aspectRatio: "16/9", objectFit: "cover" }} />
                )}

                {/* Precio */}
                {!esGratuito && (
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 40, fontWeight: 800, color: "var(--blanco)", lineHeight: 1 }}>
                      {(curso.precio / 100).toFixed(0)}€
                    </div>
                    <p style={{ fontSize: 13, color: "var(--texto-suave)", marginTop: 4 }}>Pago único · Acceso permanente</p>
                  </div>
                )}

                {/* CTA */}
                {tieneAcceso ? (
                  <a href={`/ver/${curso.slug}`} className="btn-primary" style={{ display: "block", textAlign: "center", marginBottom: 20 }}>
                    Continuar curso →
                  </a>
                ) : esGratuito ? (
                  <a href="/login" className="btn-primary" style={{ display: "block", textAlign: "center", marginBottom: 20 }}>
                    Acceder al curso →
                  </a>
                ) : (
                  <a
                    href={`https://jorgelorenzo.lemonsqueezy.com/checkout/buy/${curso.slug}`}
                    target="_blank" rel="noopener noreferrer"
                    className="btn-primary" style={{ display: "block", textAlign: "center", marginBottom: 20 }}
                  >
                    Comprar — {(curso.precio / 100).toFixed(0)}€
                  </a>
                )}

                {/* Incluye */}
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, borderTop: "1px solid var(--borde)", paddingTop: 20 }}>
                  {[
                    `${modulos.length} módulos · ${totalLecciones} lecciones`,
                    "Acceso permanente",
                    "Vídeos en alta calidad",
                  ].map((item) => (
                    <li key={item} style={{ fontSize: 13, color: "var(--texto-suave)", display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ color: "var(--oro)", flexShrink: 0 }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      <footer>
        <p>© 2026 Jorge Lorenzo · Comunidad de Entrenadores · Baloncesto</p>
      </footer>
    </>
  );
}
