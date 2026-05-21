import { requireAdmin } from "@/lib/admin-guard";
import LeccionEditor from "./LeccionEditor";
import AddLeccionForm from "./AddLeccionForm";
import AddModuloForm from "./AddModuloForm";
import CursoEditor from "./CursoEditor";

export default async function AdminCursos() {
  const { admin } = await requireAdmin();

  const { data: cursos } = await admin
    .from("cursos")
    .select("*, modulos(*, lecciones_curso(*))")
    .order("id");

  return (
    <>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 8 }}>Admin</p>
      <h2 style={{ marginBottom: 40 }}>Contenido</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
        {cursos?.map((curso) => {
          const modulos = [...(curso.modulos ?? [])].sort((a, b) => a.orden - b.orden);

          return (
            <div key={curso.id}>
              {/* Cabecera del curso */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, paddingBottom: 16, borderBottom: "2px solid var(--oro)" }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 20, color: "var(--blanco)", marginBottom: 4 }}>{curso.titulo}</h3>
                  <p style={{ fontSize: 13, color: "var(--texto-suave)" }}>
                    slug: <code style={{ color: "var(--oro)" }}>{curso.slug}</code> ·{" "}
                    {(curso.precio / 100).toFixed(0)}€ ·{" "}
                    {modulos.length} módulos
                  </p>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 4,
                  background: curso.activo ? "rgba(74,170,100,0.1)" : "rgba(200,80,80,0.1)",
                  color: curso.activo ? "#4aa" : "#e06",
                  border: `1px solid ${curso.activo ? "#4aa" : "#e06"}`,
                }}>
                  {curso.activo ? "Activo" : "Inactivo"}
                </span>
              </div>

              {/* Lemon Squeezy */}
              <CursoEditor curso={{
                id: curso.id,
                slug: curso.slug,
                precio: curso.precio,
                lemon_variant_id: curso.lemon_variant_id,
                en_venta: curso.en_venta,
                activo: curso.activo,
              }} />

              {/* Módulos */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {modulos.map((modulo) => {
                  const lecciones = [...(modulo.lecciones_curso ?? [])].sort((a, b) => a.orden - b.orden);

                  return (
                    <div key={modulo.id} style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 8, padding: 20 }}>
                      <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 12 }}>
                        Cap. {modulo.orden} — {modulo.titulo}
                      </p>

                      <div>
                        {lecciones.map((leccion) => (
                          <LeccionEditor key={leccion.id} leccion={leccion} />
                        ))}
                      </div>

                      <AddLeccionForm moduloId={modulo.id} nextOrden={lecciones.length + 1} />
                    </div>
                  );
                })}

                <AddModuloForm cursoId={curso.id} nextOrden={modulos.length + 1} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
