import { createClient } from "@/lib/supabase-server";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "Cursos — Jorge Lorenzo" };

export default async function CursosPage() {
  const supabase = await createClient();
  const { data: cursos } = await supabase
    .from("cursos")
    .select("*")
    .eq("activo", true)
    .order("created_at");

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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24, marginTop: 48 }}>
            {cursos && cursos.length > 0 ? cursos.map((curso) => (
              <Link key={curso.id} href={`/cursos/${curso.slug}`} style={{ textDecoration: "none" }}>
                <div className="tier-card" style={{ cursor: "pointer" }}>
                  {curso.portada_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={curso.portada_url} alt={curso.titulo} style={{ width: "100%", borderRadius: 6, marginBottom: 16, aspectRatio: "16/9", objectFit: "cover" }} />
                  )}
                  <p className="tier-nombre">{curso.titulo}</p>
                  {curso.descripcion && <p className="tier-desc" style={{ marginTop: 8 }}>{curso.descripcion}</p>}
                  <div className="tier-precio" style={{ marginTop: 16 }}>
                    {(curso.precio / 100).toFixed(0)}€
                  </div>
                  <span className="tier-cta tier-cta-primary" style={{ display: "block", textAlign: "center", marginTop: 16 }}>Ver curso</span>
                </div>
              </Link>
            )) : (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "80px 0", color: "var(--texto-suave)" }}>
                <p style={{ fontSize: 32, marginBottom: 16 }}>🏀</p>
                <p style={{ fontSize: 18 }}>Próximamente — los primeros cursos llegan antes del inicio de temporada.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
