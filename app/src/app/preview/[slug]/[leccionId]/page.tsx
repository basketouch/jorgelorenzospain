import { createAdminClient } from "@/lib/supabase-admin";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import PreviewGate from "./PreviewGate";

export default async function PreviewLeccion({
  params,
}: {
  params: Promise<{ slug: string; leccionId: string }>;
}) {
  const { slug, leccionId } = await params;
  const admin = createAdminClient();

  const { data: curso } = await admin
    .from("cursos")
    .select("id, titulo, modulos(id, titulo, orden, lecciones_curso(id, titulo, orden, video_id, duracion, es_preview))")
    .eq("slug", slug)
    .single();

  if (!curso) notFound();

  const todasLecciones = (curso.modulos as { orden: number; lecciones_curso: { id: number; orden: number }[] }[])
    ?.sort((a, b) => a.orden - b.orden)
    .flatMap((m) => m.lecciones_curso.sort((a, b) => a.orden - b.orden)) ?? [];

  const leccion = todasLecciones.find((l) => l.id === parseInt(leccionId)) as
    | { id: number; titulo: string; video_id?: string; duracion?: string; es_preview: boolean }
    | undefined;

  if (!leccion) notFound();
  if (!leccion.es_preview) redirect(`/cursos/${slug}`);

  const libraryId = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID ?? "";

  return (
    <div style={{ minHeight: "100vh", background: "var(--negro)", color: "var(--texto)" }}>
      <header style={{ padding: "16px 24px", borderBottom: "1px solid var(--borde)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: "var(--texto)" }}>JORGE </span>
          <span style={{ fontWeight: 700, fontSize: 15, color: "var(--oro)" }}>LORENZO</span>
        </Link>
        <Link href={`/cursos/${slug}`} style={{ fontSize: 13, color: "var(--texto-suave)", textDecoration: "none" }}>
          Ver el curso →
        </Link>
      </header>

      <PreviewGate
        leccion={leccion}
        cursoTitulo={curso.titulo}
        slug={slug}
        libraryId={libraryId}
      />
    </div>
  );
}
