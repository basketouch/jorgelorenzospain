import { createClient } from "@/lib/supabase-server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import ModuloAccordion from "./ModuloAccordion";

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

          <ModuloAccordion
            modulos={modulos ?? []}
            slug={slug}
            completadas={progresos?.filter((p) => p.completada).map((p) => p.leccion_id) ?? []}
          />
        </div>
      </div>
    </>
  );
}
