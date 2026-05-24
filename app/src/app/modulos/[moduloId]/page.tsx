import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { notFound } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ModuloAcceso from "./ModuloAcceso";
import ModuloGate from "./ModuloGate";

export default async function ModuloPage({ params }: { params: Promise<{ moduloId: string }> }) {
  const { moduloId } = await params;
  const supabase = await createClient();
  const admin = createAdminClient();

  const { data: { user } } = await supabase.auth.getUser();

  // Fetch módulo con curso y lecciones (admin para no depender de RLS)
  const { data: modulo } = await admin
    .from("modulos")
    .select("*, lecciones_curso(id, titulo, duracion, es_preview, orden), cursos(id, slug, titulo, precio, lemon_variant_id, en_venta)")
    .eq("id", parseInt(moduloId))
    .single();

  if (!modulo) notFound();

  const curso = modulo.cursos as {
    id: number; slug: string; titulo: string;
    precio: number; lemon_variant_id: string | null; en_venta: boolean;
  };
  const moduloData = modulo as typeof modulo & { portada_url?: string | null };
  const lecciones = [...(modulo.lecciones_curso ?? [])].sort((a: { orden: number }, b: { orden: number }) => a.orden - b.orden);

  // Comprobar acceso
  let tieneAcceso = false;
  if (user) {
    const [{ data: accesoCurso }, { data: accesoModulo }] = await Promise.all([
      supabase.rpc("tiene_acceso", { p_curso_id: curso.id }),
      supabase.rpc("tiene_acceso_modulo", { p_modulo_id: modulo.id }),
    ]);
    tieneAcceso = !!accesoCurso || !!accesoModulo;
  }

  const lemonStore = process.env.NEXT_PUBLIC_LEMON_STORE ?? "";

  return (
    <>
      <NavBar
        links={user
          ? [{ label: "Mi cuenta", href: "/cuenta" }, { label: "Curso completo", href: `/cursos/${curso.slug}` }]
          : [{ label: "Acceder", href: "/login" }, { label: "Curso completo", href: `/cursos/${curso.slug}` }]
        }
      />

      <div style={{ paddingTop: 64 }}>
        {tieneAcceso ? (
          <ModuloAcceso
            modulo={{ ...moduloData, portada_url: moduloData.portada_url }}
            lecciones={lecciones}
            curso={curso}
            lemonStore={lemonStore}
          />
        ) : (
          <ModuloGate
            modulo={{ ...moduloData, portada_url: moduloData.portada_url }}
            lecciones={lecciones}
            curso={curso}
            lemonStore={lemonStore}
            isLoggedIn={!!user}
          />
        )}
      </div>

      <Footer />
    </>
  );
}
