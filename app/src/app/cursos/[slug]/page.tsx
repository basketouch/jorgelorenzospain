import { createClient } from "@/lib/supabase-server";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import CurriculumAccordion from "./CurriculumAccordion";
import FaqAccordion from "./FaqAccordion";
import NavBar from "@/components/NavBar";

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
      <NavBar links={user ? [{ label: "Mi cuenta", href: "/cuenta" }] : [{ label: "Acceder", href: "/login" }]} />

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

              {/* Vídeos de ejemplo */}
              <div style={{ marginBottom: 48 }}>
                <p className="section-label">Muestra del contenido</p>
                <p style={{ fontSize: 15, color: "var(--texto-suave)", marginBottom: 24, lineHeight: 1.6 }}>
                  Dos lecciones del programa para que veas el nivel y el formato antes de decidir.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {[
                    { id: "1190934536", titulo: "Puntos Clave del Scouting — Temporada 2025/26" },
                    { id: "1191259291", titulo: "Liderazgo del entrenador — de la pizarra al día a día" },
                  ].map(({ id, titulo }) => (
                    <div key={id}>
                      <div style={{ position: "relative", paddingBottom: "56.25%", borderRadius: 10, overflow: "hidden", background: "#000" }}>
                        <iframe
                          src={`https://player.vimeo.com/video/${id}?color=c9a84c&byline=0&portrait=0&title=0&dnt=1`}
                          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <p style={{ fontSize: 13, color: "var(--texto-suave)", marginTop: 10 }}>
                        <span style={{ color: "var(--oro)", marginRight: 6 }}>↳</span>{titulo}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Temario */}
              <div>
                <p className="section-label">Temario completo</p>
                <CurriculumAccordion modulos={modulos} slug={slug} />
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
                  <div style={{ marginBottom: 20 }}>

                    {/* Opción Skool — destacada (siempre visible) */}
                    <div style={{
                      background: "linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.03) 100%)",
                      border: "2px solid rgba(201,168,76,0.5)",
                      borderRadius: 10, padding: "20px",
                      marginBottom: 10, position: "relative",
                    }}>
                      <div style={{ position: "absolute", top: -11, left: 16, background: "var(--oro)", color: "var(--negro)", fontSize: 10, fontWeight: 800, padding: "2px 10px", borderRadius: 4, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        Mejor precio
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 38, fontWeight: 900, color: "var(--oro)", lineHeight: 1 }}>297€</span>
                        <span style={{ fontSize: 13, color: "var(--texto-suave)", textDecoration: "line-through" }}>347€</span>
                      </div>
                      <p style={{ fontSize: 12, color: "var(--texto-suave)", marginBottom: 14, lineHeight: 1.5 }}>
                        Acceso completo · Pago único · Solo para miembros de la comunidad Skool
                      </p>
                      <a
                        href="https://www.skool.com/jorge-lorenzo-coach/plans"
                        target="_blank" rel="noopener noreferrer"
                        className="btn-primary" style={{ display: "block", textAlign: "center", fontSize: 14 }}
                      >
                        Entrar a la comunidad — desde $20/mes →
                      </a>
                    </div>

                    {/* Separador */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div style={{ flex: 1, height: 1, background: "var(--borde)" }} />
                      <span style={{ fontSize: 11, color: "var(--texto-suave)" }}>o</span>
                      <div style={{ flex: 1, height: 1, background: "var(--borde)" }} />
                    </div>

                    {/* Opción web */}
                    <div style={{
                      background: "var(--card)", border: "1px solid var(--borde)",
                      borderRadius: 10, padding: "16px 20px",
                      marginBottom: 10,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: curso.en_venta ? 12 : 6 }}>
                        <div>
                          <span style={{ fontSize: 28, fontWeight: 900, color: "var(--blanco)", lineHeight: 1 }}>347€</span>
                          <p style={{ fontSize: 11, color: "var(--texto-suave)", marginTop: 3 }}>Acceso directo en la web · Pago único</p>
                        </div>
                        {!curso.en_venta && (
                          <div style={{ textAlign: "right" }}>
                            <p style={{ fontSize: 10, fontWeight: 700, color: "var(--oro)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Junio 2026</p>
                            <p style={{ fontSize: 10, color: "var(--texto-suave)", marginTop: 2 }}>Apertura limitada</p>
                          </div>
                        )}
                      </div>
                      <p style={{ fontSize: 11, color: "var(--texto-suave)", lineHeight: 1.5, marginBottom: curso.en_venta ? 12 : 0 }}>
                        Sin suscripción. Acceso permanente al curso completo en jorgelorenzo.coach.
                      </p>
                      {curso.en_venta && curso.lemon_variant_id && (
                        <a
                          href={`https://${process.env.NEXT_PUBLIC_LEMON_STORE}/checkout/buy/${curso.lemon_variant_id}?checkout[custom][slug]=${curso.slug}`}
                          target="_blank" rel="noopener noreferrer"
                          style={{ display: "block", textAlign: "center", fontSize: 13, padding: "10px", border: "1px solid var(--borde)", borderRadius: 6, color: "var(--texto)", textDecoration: "none" }}
                        >
                          Comprar en la web — 347€ →
                        </a>
                      )}
                    </div>

                  </div>
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

      {/* Q&A */}
      <section style={{ paddingTop: 80, paddingBottom: 100, borderTop: "1px solid var(--borde)" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <p className="section-label" style={{ marginBottom: 8 }}>Preguntas frecuentes</p>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", marginBottom: 48 }}>Lo que más nos preguntan.</h2>
          <FaqAccordion />

          <div style={{ marginTop: 56, padding: "28px 32px", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontWeight: 700, marginBottom: 4 }}>¿Tienes alguna otra duda?</p>
              <p style={{ fontSize: 13, color: "var(--texto-suave)" }}>Escríbenos directamente y te respondemos.</p>
            </div>
            <a href="mailto:info@basketouch.com" className="btn-secondary" style={{ fontSize: 14, whiteSpace: "nowrap", textDecoration: "none" }}>
              Contactar →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
