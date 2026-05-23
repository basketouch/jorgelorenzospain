import { createAdminClient } from "@/lib/supabase-admin";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import PreviewGate from "./PreviewGate";

type Params = { slug: string; leccionId: string };

async function getLeccion(slug: string, leccionId: string) {
  const admin = createAdminClient();
  const { data: curso } = await admin
    .from("cursos")
    .select("id, titulo, modulos(id, titulo, orden, lecciones_curso(id, titulo, orden, video_id, duracion, es_preview))")
    .eq("slug", slug)
    .single();

  if (!curso) return null;

  const todasLecciones = (curso.modulos as { orden: number; lecciones_curso: { id: number; orden: number }[] }[])
    ?.sort((a, b) => a.orden - b.orden)
    .flatMap((m) => m.lecciones_curso.sort((a, b) => a.orden - b.orden)) ?? [];

  const leccion = todasLecciones.find((l) => l.id === parseInt(leccionId)) as
    | { id: number; titulo: string; video_id?: string; duracion?: string; es_preview: boolean }
    | undefined;

  return { curso, leccion };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, leccionId } = await params;
  const result = await getLeccion(slug, leccionId);
  if (!result || !result.leccion?.es_preview) return { title: "Vista previa gratuita — Jorge Lorenzo" };

  const { curso, leccion } = result;
  const title = `${leccion!.titulo} — Lección gratuita · Jorge Lorenzo`;
  const description = `Accede gratis a esta lección de "${curso.titulo}". Contenido de élite de la Selección Española de baloncesto por Jorge Lorenzo, Campeón del Mundo y de Europa.`;
  const image = "https://otsbpiukzftacmvmkajy.supabase.co/storage/v1/object/public/portadas/Con%20la%20copa.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 800, height: 1000, alt: "Jorge Lorenzo — Campeón de Europa" }],
      type: "website",
      siteName: "Jorge Lorenzo",
      locale: "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function PreviewLeccion({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, leccionId } = await params;
  const result = await getLeccion(slug, leccionId);

  if (!result || !result.curso) notFound();
  const { curso, leccion } = result;
  if (!leccion) notFound();
  if (!leccion.es_preview) redirect(`/cursos/${slug}`);

  const libraryId = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID ?? "";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jorgelorenzo.coach";
  const cursoUrl = `${siteUrl}/cursos/${slug}`;

  return (
    <div style={{ minHeight: "100vh", background: "var(--negro)", color: "var(--texto)" }}>
      <header style={{ padding: "16px 24px", borderBottom: "1px solid var(--borde)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: "var(--texto)" }}>JORGE </span>
          <span style={{ fontWeight: 700, fontSize: 15, color: "var(--oro)" }}>LORENZO</span>
        </Link>
        <a href={cursoUrl} style={{ fontSize: 13, color: "var(--oro)", textDecoration: "none", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 6, padding: "6px 14px" }}>
          Ver el curso →
        </a>
      </header>

      <PreviewGate
        leccion={leccion}
        cursoTitulo={curso.titulo}
        slug={slug}
        cursoUrl={cursoUrl}
        libraryId={libraryId}
      />
    </div>
  );
}
