import { createAdminClient } from "@/lib/supabase-admin";
import Footer from "@/components/Footer";
import Link from "next/link";
import CuentaAtrasVenta from "@/components/CuentaAtrasVenta";

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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24, marginTop: 48 }}>
            {/* Cursos completos */}
            {cursos?.map((curso) => (
              <Link key={curso.id} href={`/cursos/${curso.slug}`} style={{ textDecoration: "none" }}>
                <div className="tier-card" style={{ cursor: "pointer", height: "100%" }}>
                  {curso.portada_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={curso.portada_url} alt={curso.titulo} style={{ width: "100%", borderRadius: 6, marginBottom: 16, aspectRatio: "16/9", objectFit: "cover" }} />
                  )}
                  <p className="tier-nombre">{curso.titulo}</p>
                  {curso.descripcion && <p className="tier-desc" style={{ marginTop: 8 }}>{curso.descripcion}</p>}
                  <div className="tier-precio" style={{ marginTop: 16 }}>{(curso.precio / 100).toFixed(0)}€</div>
                  <span className="tier-cta tier-cta-primary" style={{ display: "block", textAlign: "center", marginTop: 16 }}>Ver curso</span>
                </div>
              </Link>
            ))}

            {/* Módulos en venta */}
            {modulosEnVenta?.map((modulo) => {
              const curso = modulo.cursos as unknown as { slug: string };
              const lemonStore = process.env.NEXT_PUBLIC_LEMON_STORE ?? "";
              return (
                <Link key={`mod-${modulo.id}`} href={`/modulos/${modulo.id}`} style={{ textDecoration: "none" }}>
                  <div className="tier-card" style={{ cursor: "pointer", position: "relative", height: "100%" }}>
                    {/* Badge "En venta" */}
                    <div style={{ position: "absolute", top: 12, right: 12, background: "var(--oro)", color: "var(--negro)", fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 4, letterSpacing: "0.08em", textTransform: "uppercase", zIndex: 1 }}>
                      En venta
                    </div>
                    {modulo.portada_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={modulo.portada_url} alt={modulo.titulo} style={{ width: "100%", borderRadius: 6, marginBottom: 16, aspectRatio: "16/9", objectFit: "cover" }} />
                    )}
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--texto-suave)", marginBottom: 6 }}>Módulo individual</p>
                    <p className="tier-nombre">{modulo.titulo}</p>
                    <div className="tier-precio" style={{ marginTop: 16 }}>{modulo.precio ? (modulo.precio / 100).toFixed(0) : "—"}€</div>
                    {modulo.fecha_cierre_venta && (
                      <CuentaAtrasVenta fecha={modulo.fecha_cierre_venta} />
                    )}
                    <span className="tier-cta tier-cta-primary" style={{ display: "block", textAlign: "center", marginTop: 16 }}>Ver módulo</span>
                  </div>
                </Link>
              );
            })}

            {(!cursos || cursos.length === 0) && (!modulosEnVenta || modulosEnVenta.length === 0) && (
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
