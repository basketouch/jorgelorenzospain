import { requireAdmin } from "@/lib/admin-guard";
import CrearUsuario from "./CrearUsuario";
import QuickEmailBtn from "./QuickEmailBtn";

export default async function AdminUsuarios() {
  const { admin } = await requireAdmin();

  const { data: perfiles } = await admin.from("perfiles").select("id, nombre, apellido, is_admin").eq("is_admin", false);

  if (!perfiles) return <p>Error cargando datos.</p>;

  // Para cada usuario: último acceso, compras y progreso
  const userIds = perfiles.map((p) => p.id);

  const [{ data: accesos }, { data: compras }, { data: progresos }, authRes] = await Promise.all([
    admin.from("accesos").select("user_id, created_at").in("user_id", userIds).order("created_at", { ascending: false }),
    admin.from("compras").select("user_id, curso_id, lemon_order_id").in("user_id", userIds),
    admin.from("progreso").select("user_id, completada").in("user_id", userIds),
    fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/admin/users?per_page=1000`,
      {
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        },
        cache: "no-store",
      }
    ).then(r => r.json()).catch(() => ({ users: [] })),
  ]);

  const emailMap = new Map<string, string>(
    (authRes?.users ?? []).map((u: { id: string; email: string }) => [u.id, u.email])
  );

  const ultimoAccesoMap = new Map<string, string>();
  accesos?.forEach((a) => {
    if (!ultimoAccesoMap.has(a.user_id)) ultimoAccesoMap.set(a.user_id, a.created_at);
  });

  function formatFecha(iso?: string) {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
  }

  return (
    <>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 8 }}>Admin</p>
      <h2 style={{ marginBottom: 8 }}>Usuarios</h2>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <p style={{ color: "var(--texto-suave)" }}>{perfiles.length} alumnos registrados</p>
        <div style={{ display: "flex", gap: 10 }}>
          <a
            href="/api/admin/export-usuarios"
            style={{
              fontSize: 12, fontWeight: 600, padding: "7px 16px", borderRadius: 6,
              border: "1px solid var(--borde)", color: "var(--texto-suave)",
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6,
            }}
          >
            ↓ Exportar CSV
          </a>
          <CrearUsuario />
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--borde)" }}>
              {["Nombre", "Email", "Último acceso", "Lecciones", ""].map((h) => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--texto-suave)", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {perfiles.map((p) => {
              const completadas = progresos?.filter((pr) => pr.user_id === p.id && pr.completada).length ?? 0;
              const total = progresos?.filter((pr) => pr.user_id === p.id).length ?? 0;

              return (
                <tr key={p.id} style={{ borderBottom: "1px solid var(--borde)" }}>
                  <td style={{ padding: "14px 16px", fontWeight: 600, whiteSpace: "nowrap" }}>
                    <a href={`/admin/usuarios/${p.id}`} style={{ color: "var(--texto)", textDecoration: "none" }}>
                      {p.nombre || "—"} {p.apellido} →
                    </a>
                  </td>
                  <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                    {emailMap.get(p.id)
                      ? <span style={{ color: "var(--texto-suave)" }}>{emailMap.get(p.id)}</span>
                      : <span style={{ fontSize: 11, color: "#e06", border: "1px solid #e0666655", borderRadius: 4, padding: "2px 8px" }}>sin cuenta auth</span>
                    }
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--texto-suave)", whiteSpace: "nowrap" }}>
                    {formatFecha(ultimoAccesoMap.get(p.id))}
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--texto-suave)", whiteSpace: "nowrap" }}>
                    {completadas}/{total}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    {emailMap.get(p.id) ? (
                      <QuickEmailBtn
                        email={emailMap.get(p.id)!}
                        nombre={`${p.nombre ?? ""} ${p.apellido ?? ""}`.trim()}
                      />
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
