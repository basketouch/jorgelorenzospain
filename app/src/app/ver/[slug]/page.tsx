import { createClient } from "@/lib/supabase-server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function PlayerIndex({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?redirect=/ver/${slug}`);

  const { data: curso } = await supabase
    .from("cursos")
    .select("*, modulos(id, titulo, orden, lecciones_curso(id, titulo, duracion, orden, es_preview))")
    .eq("slug", slug)
    .single();

  if (!curso) notFound();

  const { data: acceso } = await supabase.rpc("tiene_acceso", { p_curso_id: curso.id });
  if (!acceso) redirect(`/cursos/${slug}`);

  const { data: progresos } = await supabase
    .from("progreso")
    .select("leccion_id, completada")
    .eq("user_id", user.id);

  const completadas = new Set(progresos?.filter((p) => p.completada).map((p) => p.leccion_id));

  const modulos = curso.modulos?.sort((a: { orden: number }, b: { orden: number }) => a.orden - b.orden);
  const primeraLeccion = modulos?.[0]?.lecciones_curso?.sort((a: { orden: number }, b: { orden: number }) => a.orden - b.orden)[0];

  return (
    <>
      <nav>
        <a href="/cuenta" className="nav-logo">Jorge <span>Lorenzo</span></a>
        <div className="nav-links">
          <a href="/cuenta" className="nav-link">← Mis cursos</a>
        </div>
      </nav>

      <div style={{ paddingTop: 80, minHeight: "100vh" }}>
        <div className="container" style={{ paddingTop: 48 }}>
          <h2 style={{ marginBottom: 8 }}>{curso.titulo}</h2>
          {primeraLeccion && (
            <Link href={`/ver/${slug}/${primeraLeccion.id}`} className="btn-primary" style={{ display: "inline-block", marginBottom: 48 }}>
              Empezar →
            </Link>
          )}

          {modulos?.map((modulo: { id: number; titulo: string; lecciones_curso: { id: number; titulo: string; duracion?: string; orden: number }[] }) => (
            <div key={modulo.id} style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 12 }}>
                {modulo.titulo}
              </p>
              <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 8, overflow: "hidden" }}>
                {modulo.lecciones_curso?.sort((a, b) => a.orden - b.orden).map((leccion, i: number) => {
                  const hecha = completadas.has(leccion.id);
                  return (
                    <Link key={leccion.id} href={`/ver/${slug}/${leccion.id}`} style={{ textDecoration: "none" }}>
                      <div className="leccion-item" style={{
                        padding: "16px 20px", display: "flex", alignItems: "center", gap: 16,
                        borderBottom: i < modulo.lecciones_curso.length - 1 ? "1px solid var(--borde)" : "none",
                      }}
                      >
                        <span style={{ fontSize: 16, flexShrink: 0 }}>{hecha ? "✅" : "⬜"}</span>
                        <span style={{ fontSize: 14, color: hecha ? "var(--texto-suave)" : "var(--texto)", flex: 1 }}>{leccion.titulo}</span>
                        {leccion.duracion && <span style={{ fontSize: 12, color: "var(--texto-suave)" }}>{leccion.duracion}</span>}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
