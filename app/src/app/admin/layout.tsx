import { requireAdmin } from "@/lib/admin-guard";
import AdminSidebar from "./AdminSidebar";

export const metadata = { title: "Admin — Jorge Lorenzo" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />

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
            {user.email}
          </span>
        </div>

        <main style={{ padding: "40px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
