import { requireAdmin } from "@/lib/admin-guard";

export const metadata = { title: "Admin — Jorge Lorenzo" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{
        background: "var(--oscuro)", borderRight: "1px solid var(--borde)",
        padding: "32px 0", position: "sticky", top: 0, height: "100vh", overflowY: "auto",
      }}>
        <div style={{ padding: "0 20px 32px" }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--blanco)" }}>
              Jorge <span style={{ color: "var(--oro)" }}>Lorenzo</span>
            </span>
          </a>
          <p style={{ fontSize: 11, color: "var(--texto-suave)", marginTop: 4, letterSpacing: "0.1em", textTransform: "uppercase" }}>Panel Admin</p>
        </div>

        <nav style={{ display: "flex", flexDirection: "column" }}>
          {[
            { href: "/admin", label: "Dashboard", icon: "◉" },
            { href: "/admin/usuarios", label: "Usuarios", icon: "👥" },
            { href: "/admin/cursos", label: "Contenido", icon: "📚" },
          ].map(({ href, label, icon }) => (
            <a key={href} href={href} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 20px", textDecoration: "none",
              fontSize: 14, color: "var(--texto-suave)", transition: "all 0.15s",
            }}
              className="admin-nav-link"
            >
              <span>{icon}</span>
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, padding: "0 20px" }}>
          <a href="/cuenta" style={{ fontSize: 12, color: "var(--texto-suave)", textDecoration: "none" }}>
            ← Volver a la plataforma
          </a>
        </div>
      </aside>

      {/* Content */}
      <main style={{ padding: "48px 40px", background: "var(--negro)" }}>
        {children}
      </main>
    </div>
  );
}
