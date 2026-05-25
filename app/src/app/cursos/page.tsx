import { createAdminClient } from "@/lib/supabase-admin";
import Footer from "@/components/Footer";
import CursosGrid from "./CursosGrid";

export const metadata = { title: "Cursos — Jorge Lorenzo" };

export default async function CursosPage() {
  const admin = createAdminClient();
  const ahora = new Date().toISOString();

  const [{ data: cursos }, { data: modulosEnVenta }] = await Promise.all([
    admin.from("cursos").select("*").eq("activo", true).order("created_at"),
    admin.from("modulos")
      .select("id, titulo, portada_url, precio, fecha_apertura, fecha_cierre_venta, lemon_variant_id, cursos(slug)")
      .lte("fecha_apertura", ahora)
      .or(`fecha_cierre_venta.is.null,fecha_cierre_venta.gte.${ahora}`),
  ]);

  return (
    <>
      <nav>
        <a href="/" className="nav-logo">Jorge <span>Lorenzo</span></a>
        <div className="nav-links">
          <a href="/cuenta" className="nav-link">Mi cuenta</a>
          <a href="https://www.skool.com/jorge-lorenzo-coach/plans" target="_blank" rel="noopener noreferrer" className="nav-cta">Comunidad</a>
        </div>
      </nav>

      <section style={{ paddingTop: 140 }}>
        <div className="container">
          <p className="section-label">Formación</p>
          <h2>Cursos de Jorge Lorenzo.</h2>
          <p className="lead">Formación en profundidad sobre técnica, táctica y gestión de equipo.</p>

          <CursosGrid
            cursos={cursos ?? []}
            modulosEnVenta={(modulosEnVenta ?? []) as any}
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
