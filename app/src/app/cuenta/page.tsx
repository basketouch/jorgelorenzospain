import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = { title: "Mi cuenta — Jorge Lorenzo" };

export default async function CuentaPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: compras }, { data: perfil }] = await Promise.all([
    supabase.from("compras").select("*, cursos(slug, titulo, portada_url)").eq("user_id", user.id),
    supabase.from("perfiles").select("nombre, apellido").eq("id", user.id).single(),
  ]);

  return (
    <>
      <nav>
        <a href="/" className="nav-logo">Jorge <span>Lorenzo</span></a>
        <div className="nav-links">
          <a href="/cursos" className="nav-link">Cursos</a>
          <form action="/api/logout" method="post">
            <button type="submit" className="nav-link" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              Salir
            </button>
          </form>
        </div>
      </nav>

      <section style={{ paddingTop: 140 }}>
        <div className="container">
          <p className="section-label">Mi cuenta</p>
          <h2>Mis cursos.</h2>
          {perfil?.nombre && (
            <p style={{ fontSize: 20, fontWeight: 600, color: "var(--texto)", marginBottom: 4 }}>
              {perfil.nombre} {perfil.apellido}
            </p>
          )}
          <p style={{ color: "var(--texto-suave)", marginBottom: 48 }}>{user.email}</p>

          {compras && compras.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
              {compras.map((compra) => (
                <Link key={compra.id} href={`/ver/${compra.cursos.slug}`} style={{ textDecoration: "none" }}>
                  <div className="tier-card" style={{ cursor: "pointer" }}>
                    {compra.cursos.portada_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={compra.cursos.portada_url} alt={compra.cursos.titulo} style={{ width: "100%", borderRadius: 6, marginBottom: 16, aspectRatio: "16/9", objectFit: "cover" }} />
                    )}
                    <p className="tier-nombre">{compra.cursos.titulo}</p>
                    <span className="tier-cta tier-cta-primary" style={{ display: "block", textAlign: "center", marginTop: 16 }}>Continuar →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 10, padding: 48, textAlign: "center" }}>
              <p style={{ fontSize: 18, color: "var(--texto-suave)", marginBottom: 24 }}>Todavía no tienes ningún curso.</p>
              <Link href="/cursos" className="btn-primary">Ver cursos disponibles</Link>
            </div>
          )}
        </div>
      </section>

      <footer style={{ marginTop: 120 }}>
        <p>© 2025 Jorge Lorenzo · Comunidad de Entrenadores · Baloncesto</p>
      </footer>
    </>
  );
}
