import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";

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

  const totalLecciones = curso.modulos?.reduce(
    (acc: number, m: { lecciones_curso: unknown[] }) => acc + (m.lecciones_curso?.length ?? 0), 0
  ) ?? 0;

  return (
    <>
      <nav>
        <a href="/cursos" className="nav-logo">Jorge <span>Lorenzo</span></a>
        <div className="nav-links">
          {user ? (
            <a href="/cuenta" className="nav-link">Mi cuenta</a>
          ) : (
            <a href="/login" className="nav-link">Acceder</a>
          )}
        </div>
      </nav>

      <section style={{ paddingTop: 140 }}>
        <div className="container">
          <a href="/cursos" style={{ color: "var(--texto-suave)", fontSize: 13, textDecoration: "none", display: "inline-block", marginBottom: 32 }}>
            ← Todos los cursos
          </a>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 48, alignItems: "start" }}>
            {/* Contenido */}
            <div>
              <p className="section-label">Curso</p>
              <h2 style={{ marginBottom: 16 }}>{curso.titulo}</h2>
              {curso.descripcion && <p className="lead" style={{ marginBottom: 40 }}>{curso.descripcion}</p>}

              {/* Programa */}
              {curso.modulos?.sort((a: { orden: number }, b: { orden: number }) => a.orden - b.orden).map((modulo: { id: number; titulo: string; lecciones_curso: { id: number; titulo: string; duracion?: string; es_preview: boolean }[] }) => (
                <div key={modulo.id} style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 12 }}>
                    {modulo.titulo}
                  </p>
                  <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 8, overflow: "hidden" }}>
                    {modulo.lecciones_curso?.sort((a, b) => a.id - b.id).map((leccion, i: number) => (
                      <div key={leccion.id} style={{
                        padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
                        borderBottom: i < modulo.lecciones_curso.length - 1 ? "1px solid var(--borde)" : "none"
                      }}>
                        <span style={{ fontSize: 14, color: "var(--texto)" }}>{leccion.titulo}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                          {leccion.duracion && <span style={{ fontSize: 12, color: "var(--texto-suave)" }}>{leccion.duracion}</span>}
                          {leccion.es_preview && (
                            <span style={{ fontSize: 11, color: "var(--oro)", border: "1px solid var(--oro)", padding: "2px 8px", borderRadius: 4 }}>Preview</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Card compra */}
            <div style={{ position: "sticky", top: 100 }}>
              <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 10, padding: 32 }}>
                {curso.portada_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={curso.portada_url} alt={curso.titulo} style={{ width: "100%", borderRadius: 6, marginBottom: 20, aspectRatio: "16/9", objectFit: "cover" }} />
                )}
                <div style={{ fontSize: 36, fontWeight: 800, color: "var(--blanco)", marginBottom: 4 }}>
                  {(curso.precio / 100).toFixed(0)}€
                </div>
                <p style={{ fontSize: 13, color: "var(--texto-suave)", marginBottom: 24 }}>
                  {totalLecciones} lecciones · Acceso permanente
                </p>

                {tieneAcceso ? (
                  <a href={`/ver/${curso.slug}`} className="btn-primary" style={{ display: "block", textAlign: "center" }}>
                    Ir al curso →
                  </a>
                ) : (
                  <a
                    href={`https://jorgelorenzo.lemonsqueezy.com/checkout/buy/${curso.slug}`}
                    target="_blank" rel="noopener noreferrer"
                    className="btn-primary" style={{ display: "block", textAlign: "center" }}
                  >
                    Comprar curso
                  </a>
                )}

                <ul style={{ listStyle: "none", marginTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                  {["Acceso permanente", "Vídeos en alta calidad", "Actualizado cada temporada"].map((item) => (
                    <li key={item} style={{ fontSize: 13, color: "var(--texto-suave)", display: "flex", gap: 8 }}>
                      <span style={{ color: "var(--oro)" }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ marginTop: 120 }}>
        <p>© 2025 Jorge Lorenzo · Comunidad de Entrenadores · Baloncesto</p>
      </footer>
    </>
  );
}
