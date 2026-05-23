import { requireAdmin } from "@/lib/admin-guard";
import AccesoToggle from "./AccesoToggle";
import AccesoModuloPanel from "./AccesoModuloPanel";

export default async function AdminUsuarios() {
  const { admin } = await requireAdmin();

  const [{ data: perfiles }, { data: cursos }, { data: modulos }] = await Promise.all([
    admin.from("perfiles").select("id, nombre, apellido, is_admin").eq("is_admin", false),
    admin.from("cursos").select("id, slug, titulo").eq("activo", true),
    admin.from("modulos").select("id, titulo, orden, curso_id").order("orden"),
  ]);

  if (!perfiles || !cursos) return <p>Error cargando datos.</p>;

  // Para cada usuario: último acceso, compras y progreso
  const userIds = perfiles.map((p) => p.id);

  const [{ data: accesos }, { data: compras }, { data: progresos }, { data: authUsers }, { data: accesoModulos }] = await Promise.all([
    admin.from("accesos").select("user_id, created_at").in("user_id", userIds).order("created_at", { ascending: false }),
    admin.from("compras").select("user_id, curso_id, lemon_order_id").in("user_id", userIds),
    admin.from("progreso").select("user_id, completada").in("user_id", userIds),
    admin.auth.admin.listUsers(),
    admin.from("accesos_modulo").select("user_id, modulo_id").in("user_id", userIds),
  ]);

  const emailMap = new Map(authUsers?.users?.map((u) => [u.id, u.email]) ?? []);

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
      <p style={{ color: "var(--texto-suave)", marginBottom: 32 }}>{perfiles.length} alumnos registrados</p>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--borde)" }}>
              {["Nombre", "Email", "Último acceso", "Lecciones", ...cursos.map(c => c.titulo), "Módulos"].map((h) => (
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
                  <td style={{ padding: "14px 16px", color: "var(--texto-suave)", whiteSpace: "nowrap" }}>
                    {emailMap.get(p.id) ?? "—"}
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--texto-suave)", whiteSpace: "nowrap" }}>
                    {formatFecha(ultimoAccesoMap.get(p.id))}
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--texto-suave)", whiteSpace: "nowrap" }}>
                    {completadas}/{total}
                  </td>
                  {cursos.map((curso) => {
                    const tieneAcceso = compras?.some((c) => c.user_id === p.id && c.curso_id === curso.id) ?? false;
                    return (
                      <td key={curso.id} style={{ padding: "14px 16px" }}>
                        <AccesoToggle
                          userId={p.id}
                          cursoId={curso.id}
                          cursoSlug={curso.slug}
                          tieneAcceso={tieneAcceso}
                        />
                      </td>
                    );
                  })}
                  <td style={{ padding: "14px 16px", position: "relative" }}>
                    <AccesoModuloPanel
                      userId={p.id}
                      modulos={modulos ?? []}
                      accesoModuloIds={accesoModulos?.filter((a) => a.user_id === p.id).map((a) => a.modulo_id) ?? []}
                    />
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
