import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import MarcarCompletada from "./MarcarCompletada";
import SidebarModulos from "./SidebarModulos";

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

  // Registrar visualización (en background, no bloquea el render)
  createAdminClient()
    .from("visualizaciones")
    .insert({ user_id: user.id, leccion_id: leccion.id })
    .then(() => {})
    .catch(() => {});

  // Progreso de todas las lecciones para el sidebar
  const { data: todoProgreso } = await supabase
    .from("progreso")
    .select("leccion_id, completada")
    .eq("user_id", user.id);

  const completadasIds = new Set(todoProgreso?.filter((p) => p.completada).map((p) => p.leccion_id) ?? []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", minHeight: "100vh" }}>
      {/* Sidebar */}
      <SidebarModulos
        modulos={curso.modulos ?? []}
        slug={slug}
        leccionActivaId={leccion.id}
        completadasIds={[...completadasIds]}
        cursoTitulo={curso.titulo}
      />

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
