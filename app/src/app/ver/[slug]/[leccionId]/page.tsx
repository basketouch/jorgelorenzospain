import { createClient } from "@/lib/supabase-server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import MarcarCompletada from "./MarcarCompletada";

export default async function PlayerLeccion({
  params,
}: {
  params: Promise<{ slug: string; leccionId: string }>;
}) {
  const { slug, leccionId } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?redirect=/ver/${slug}/${leccionId}`);

  const { data: curso } = await supabase
    .from("cursos")
    .select("id, titulo, modulos(id, titulo, orden, lecciones_curso(id, titulo, orden, vimeo_id, duracion))")
    .eq("slug", slug)
    .single();

  if (!curso) notFound();

  const { data: acceso } = await supabase.rpc("tiene_acceso", { p_curso_id: curso.id });
  if (!acceso) redirect(`/cursos/${slug}`);

  // Aplanar todas las lecciones en orden
  const todasLecciones = curso.modulos
    ?.sort((a: { orden: number }, b: { orden: number }) => a.orden - b.orden)
    .flatMap((m: { lecciones_curso: { id: number; orden: number }[] }) =>
      m.lecciones_curso.sort((a, b) => a.orden - b.orden)
    ) ?? [];

  const idx = todasLecciones.findIndex((l: { id: number }) => l.id === parseInt(leccionId));
  const leccion = todasLecciones[idx] as unknown as { id: number; titulo: string; vimeo_id?: string; duracion?: string } | undefined;
  if (!leccion) notFound();

  const anterior = todasLecciones[idx - 1] as { id: number } | undefined;
  const siguiente = todasLecciones[idx + 1] as { id: number } | undefined;

  const { data: progreso } = await supabase
    .from("progreso")
    .select("completada")
    .eq("user_id", user.id)
    .eq("leccion_id", leccion.id)
    .single();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ background: "var(--oscuro)", borderRight: "1px solid var(--borde)", overflowY: "auto", paddingTop: 24 }}>
        <div style={{ padding: "0 16px 16px", borderBottom: "1px solid var(--borde)", marginBottom: 16 }}>
          <Link href={`/ver/${slug}`} style={{ fontSize: 12, color: "var(--texto-suave)", textDecoration: "none" }}>
            ← {curso.titulo}
          </Link>
        </div>
        {curso.modulos?.sort((a: { orden: number }, b: { orden: number }) => a.orden - b.orden).map((modulo: { id: number; titulo: string; lecciones_curso: { id: number; titulo: string; orden: number }[] }) => (
          <div key={modulo.id} style={{ marginBottom: 8 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--oro)", padding: "8px 16px" }}>
              {modulo.titulo}
            </p>
            {modulo.lecciones_curso.sort((a, b) => a.orden - b.orden).map((l) => (
              <Link key={l.id} href={`/ver/${slug}/${l.id}`} style={{ textDecoration: "none" }}>
                <div style={{
                  padding: "10px 16px", fontSize: 13,
                  color: l.id === leccion.id ? "var(--oro)" : "var(--texto-suave)",
                  background: l.id === leccion.id ? "rgba(201,168,76,0.08)" : "transparent",
                  borderLeft: l.id === leccion.id ? "2px solid var(--oro)" : "2px solid transparent",
                }}>
                  {l.titulo}
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Player */}
      <div style={{ overflowY: "auto" }}>
        {leccion.vimeo_id ? (
          <div style={{ position: "relative", paddingBottom: "56.25%", background: "#000" }}>
            <iframe
              src={`https://player.vimeo.com/video/${leccion.vimeo_id}?color=c9a84c&byline=0&portrait=0&title=0`}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div style={{ aspectRatio: "16/9", background: "var(--card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ color: "var(--texto-suave)" }}>Vídeo próximamente</p>
          </div>
        )}

        <div style={{ padding: 32 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
            <div>
              <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", marginBottom: 4 }}>{leccion.titulo}</h2>
              {leccion.duracion && <p style={{ fontSize: 13, color: "var(--texto-suave)" }}>{leccion.duracion}</p>}
            </div>
            <MarcarCompletada leccionId={leccion.id} completada={!!progreso?.completada} siguienteId={siguiente?.id} slug={slug} />
          </div>

          {/* Navegación */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {anterior && (
              <Link href={`/ver/${slug}/${anterior.id}`} className="btn-secondary" style={{ fontSize: 13 }}>
                ← Anterior
              </Link>
            )}
            {siguiente && (
              <Link href={`/ver/${slug}/${siguiente.id}`} className="btn-primary" style={{ fontSize: 13 }}>
                Siguiente →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
