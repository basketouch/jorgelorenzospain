import Footer from "@/components/Footer";

interface Leccion { id: number; titulo: string; duracion?: string; es_preview: boolean; orden: number; }
interface Curso { id: number; slug: string; titulo: string; precio: number; lemon_variant_id: string | null; en_venta: boolean; }
interface Modulo { id: number; titulo: string; orden: number; }

export default function ModuloAcceso({
  modulo, lecciones, curso, lemonStore,
}: {
  modulo: Modulo; lecciones: Leccion[]; curso: Curso; lemonStore: string;
}) {
  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 100 }}>

      {/* Breadcrumb */}
      <a href={`/cursos/${curso.slug}`} style={{ fontSize: 13, color: "var(--texto-suave)", textDecoration: "none", display: "inline-block", marginBottom: 24 }}>
        ← {curso.titulo}
      </a>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 48, alignItems: "start" }}>

        {/* Lecciones */}
        <div>
          <p className="section-label">Módulo {String(modulo.orden).padStart(2, "0")}</p>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 38px)", marginBottom: 32 }}>{modulo.titulo}</h1>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {lecciones.map((l, i) => (
              <a
                key={l.id}
                href={`/ver/${curso.slug}/${l.id}`}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "16px 0", borderBottom: "1px solid var(--borde)",
                  textDecoration: "none", gap: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 12, color: "var(--oro)", fontWeight: 700, minWidth: 20 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: 14, color: "var(--texto)" }}>{l.titulo}</span>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
                  {l.duracion && <span style={{ fontSize: 12, color: "var(--texto-suave)" }}>{l.duracion}</span>}
                  <span style={{ fontSize: 12, color: "var(--oro)" }}>▶</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Sidebar upsell — curso completo */}
        <div style={{ position: "sticky", top: 100 }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.02) 100%)",
            border: "1px solid rgba(201,168,76,0.3)", borderRadius: 12, padding: 24,
          }}>
            <p style={{ fontSize: 11, color: "var(--oro)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
              Curso completo
            </p>
            <h3 style={{ fontSize: 16, marginBottom: 8 }}>{curso.titulo}</h3>
            <p style={{ fontSize: 13, color: "var(--texto-suave)", lineHeight: 1.6, marginBottom: 20 }}>
              Accede a todos los módulos, técnica, táctica y gestión de la temporada completa.
            </p>

            {/* Skool */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
                <span style={{ fontSize: 26, fontWeight: 900, color: "var(--oro)" }}>297€</span>
                <span style={{ fontSize: 12, color: "var(--texto-suave)", textDecoration: "line-through" }}>347€</span>
              </div>
              <a
                href="https://www.skool.com/jorge-lorenzo-coach/plans"
                target="_blank" rel="noopener noreferrer"
                className="btn-primary"
                style={{ display: "block", textAlign: "center", fontSize: 13, textDecoration: "none" }}
              >
                Entrar a Skool →
              </a>
              <p style={{ fontSize: 11, color: "var(--texto-suave)", marginTop: 6, textAlign: "center" }}>
                Cualquier nivel · desde $20/mes
              </p>
            </div>

            {/* Web si está en venta */}
            {curso.en_venta && curso.lemon_variant_id && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "12px 0" }}>
                  <div style={{ flex: 1, height: 1, background: "var(--borde)" }} />
                  <span style={{ fontSize: 11, color: "var(--texto-suave)" }}>o</span>
                  <div style={{ flex: 1, height: 1, background: "var(--borde)" }} />
                </div>
                <a
                  href={`https://${lemonStore}/checkout/buy/${curso.lemon_variant_id}?checkout[custom][slug]=${curso.slug}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "block", textAlign: "center", fontSize: 13, padding: "10px",
                    border: "1px solid var(--borde)", borderRadius: 6, color: "var(--texto)",
                    textDecoration: "none",
                  }}
                >
                  Comprar en la web — 347€
                </a>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
