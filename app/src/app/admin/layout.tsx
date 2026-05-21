import { requireAdmin } from "@/lib/admin-guard";

export const metadata = { title: "Admin — Jorge Lorenzo" };

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: "◉" },
  { href: "/admin/usuarios", label: "Usuarios", icon: "👥" },
  { href: "/admin/cursos", label: "Contenido", icon: "📚" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{
        width: 240, flexShrink: 0,
        background: "var(--oscuro)",
        borderRight: "1px solid var(--borde)",
        display: "flex", flexDirection: "column",
        position: "fixed", top: 0, left: 0, bottom: 0,
        zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid var(--borde)" }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--blanco)" }}>
              Jorge <span style={{ color: "var(--oro)" }}>Lorenzo</span>
            </span>
          </a>
          <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--oro)", display: "inline-block" }} />
            <span style={{ fontSize: 11, color: "var(--texto-suave)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Panel Admin</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 0" }}>
          {navLinks.map(({ href, label, icon }) => (
            <a key={href} href={href} className="admin-nav-link" style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 24px", textDecoration: "none",
              fontSize: 14, color: "var(--texto-suave)",
              transition: "all 0.15s",
            }}>
              <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{icon}</span>
              <span style={{ fontWeight: 500 }}>{label}</span>
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: "20px 24px", borderTop: "1px solid var(--borde)" }}>
          <a href="/cuenta" style={{
            display: "flex", alignItems: "center", gap: 8,
            textDecoration: "none", fontSize: 13, color: "var(--texto-suave)",
            transition: "color 0.15s",
          }}>
            <span>←</span>
            <span>Volver a la plataforma</span>
          </a>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ marginLeft: 240, flex: 1, minHeight: "100vh", background: "var(--negro)" }}>
        {/* Top bar */}
        <div style={{
          height: 56, borderBottom: "1px solid var(--borde)",
          display: "flex", alignItems: "center", padding: "0 40px",
          background: "rgba(10,10,10,0.8)", backdropFilter: "blur(8px)",
          position: "sticky", top: 0, zIndex: 40,
        }}>
          <span style={{ fontSize: 12, color: "var(--texto-suave)" }}>
            jorge<span style={{ color: "var(--oro)" }}>lorenzo13</span>@gmail.com
          </span>
        </div>

        <main style={{ padding: "40px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
