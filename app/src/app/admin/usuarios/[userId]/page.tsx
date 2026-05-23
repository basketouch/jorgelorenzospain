import { requireAdmin } from "@/lib/admin-guard";
import { notFound } from "next/navigation";
import AccesoToggle from "../AccesoToggle";
import AccesoModuloToggle from "./AccesoModuloToggle";
import EliminarUsuario from "./EliminarUsuario";

function formatFecha(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function UsuarioPerfil({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const { admin } = await requireAdmin();

  const [
    { data: perfil },
    { data: authUser },
    { data: cursos },
    { data: modulos },
    { data: compras },
    { data: accesoModulos },
    { data: progreso },
    { data: accesos },
  ] = await Promise.all([
    admin.from("perfiles").select("*").eq("id", userId).single(),
    admin.auth.admin.getUserById(userId),
    admin.from("cursos").select("id, slug, titulo").eq("activo", true),
    admin.from("modulos").select("id, titulo, orden, curso_id").order("orden"),
    admin.from("compras").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    admin.from("accesos_modulo").select("modulo_id").eq("user_id", userId),
    admin.from("progreso").select("leccion_id, completada").eq("user_id", userId),
    admin.from("accesos").select("created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(1),
  ]);

  if (!perfil) notFound();

  const user = authUser.user;
  const completadas = progreso?.filter((p) => p.completada).length ?? 0;
  const total = progreso?.length ?? 0;
  const accesoModuloIds = new Set(accesoModulos?.map((a) => a.modulo_id) ?? []);

  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <a href="/admin/usuarios" style={{ fontSize: 13, color: "var(--texto-suave)", textDecoration: "none" }}>
          ← Todos los usuarios
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 20 }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "var(--oro)", color: "var(--negro)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, fontWeight: 800, flexShrink: 0,
          }}>
            {(perfil.nombre?.[0] ?? "?").toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ marginBottom: 4 }}>{perfil.nombre} {perfil.apellido}</h2>
            <p style={{ color: "var(--texto-suave)", fontSize: 14 }}>{user?.email ?? "—"}</p>
          </div>
          <EliminarUsuario userId={userId} nombre={`${perfil.nombre} ${perfil.apellido}`} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

        {/* Info */}
        <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 10, padding: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>
            Información
          </p>
          {[
            { label: "Email", valor: user?.email ?? "—" },
            { label: "Registrado", valor: formatFecha(user?.created_at) },
            { label: "Último acceso", valor: formatFecha(accesos?.[0]?.created_at) },
            { label: "Progreso", valor: `${completadas} / ${total} lecciones completadas` },
          ].map(({ label, valor }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--borde)" }}>
              <span style={{ fontSize: 13, color: "var(--texto-suave)" }}>{label}</span>
              <span style={{ fontSize: 13, color: "var(--texto)", fontWeight: 600 }}>{valor}</span>
            </div>
          ))}
        </div>

        {/* Compras */}
        <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 10, padding: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>
            Historial de compras
          </p>
          {compras && compras.length > 0 ? compras.map((c) => (
            <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--borde)" }}>
              <div>
                <p style={{ fontSize: 13, color: "var(--texto)", fontWeight: 600 }}>
                  {cursos?.find((cur) => cur.id === c.curso_id)?.titulo ?? "Curso"}
                </p>
                <p style={{ fontSize: 11, color: "var(--texto-suave)", marginTop: 2 }}>
                  {c.lemon_order_id?.startsWith("admin-") ? "Acceso manual" : `Orden: ${c.lemon_order_id}`}
                </p>
              </div>
              <span style={{ fontSize: 12, color: "var(--texto-suave)" }}>{formatFecha(c.created_at)}</span>
            </div>
          )) : (
            <p style={{ fontSize: 13, color: "var(--texto-suave)" }}>Sin compras registradas.</p>
          )}
        </div>

        {/* Acceso a cursos */}
        <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 10, padding: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>
            Acceso a cursos
          </p>
          {cursos?.map((curso) => {
            const tieneAcceso = compras?.some((c) => c.curso_id === curso.id) ?? false;
            return (
              <div key={curso.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--borde)" }}>
                <span style={{ fontSize: 13, color: "var(--texto)" }}>{curso.titulo}</span>
                <AccesoToggle userId={userId} cursoId={curso.id} cursoSlug={curso.slug} tieneAcceso={tieneAcceso} />
              </div>
            );
          })}
        </div>

        {/* Acceso por módulo */}
        <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 10, padding: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>
            Acceso por módulo
          </p>
          {modulos?.map((m) => (
            <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--borde)" }}>
              <span style={{ fontSize: 13, color: "var(--texto-suave)" }}>
                <span style={{ color: "var(--oro)", fontWeight: 700, marginRight: 8 }}>{String(m.orden).padStart(2, "0")}.</span>
                {m.titulo}
              </span>
              <AccesoModuloToggle userId={userId} moduloId={m.id} tieneAcceso={accesoModuloIds.has(m.id)} />
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
