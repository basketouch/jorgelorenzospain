
export const metadata = {
  title: "Próximamente — Jorge Lorenzo Coach",
  description: "El Laboratorio del Entrenador está cambiando de formato. Déjanos tu email y te avisamos cuando abramos.",
};

export default function EnConstruccion() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--negro)",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Fondo cancha */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: "url(https://otsbpiukzftacmvmkajy.supabase.co/storage/v1/object/public/portadas/Court.png)",
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.06, pointerEvents: "none",
      }} />

      {/* Header */}
      <header style={{ position: "relative", zIndex: 1, padding: "32px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.05em", color: "var(--blanco)" }}>
          JORGE <span style={{ color: "var(--oro)" }}>LORENZO</span>
        </div>
        <a href="/login" style={{ fontSize: 13, color: "var(--texto-suave)", textDecoration: "none" }}>
          Acceder →
        </a>
      </header>

      {/* Contenido central */}
      <main style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 24px", position: "relative", zIndex: 1,
      }}>
        <div style={{ maxWidth: 640, width: "100%", textAlign: "center" }}>

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)",
            borderRadius: 100, padding: "6px 20px", marginBottom: 32,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--oro)", display: "inline-block" }} />
            <span style={{ fontSize: 12, color: "var(--oro)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Nuevo formato en camino
            </span>
          </div>

          {/* Título */}
          <h1 style={{ fontSize: "clamp(32px, 6vw, 58px)", lineHeight: 1.1, marginBottom: 24, fontWeight: 900 }}>
            El Laboratorio<br />
            <span style={{ color: "var(--oro)" }}>del Entrenador</span><br />
            está evolucionando.
          </h1>

          {/* Descripción */}
          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "var(--texto-suave)", lineHeight: 1.7, marginBottom: 16, maxWidth: 520, margin: "0 auto 16px" }}>
            Estamos migrando a una nueva plataforma con un formato más completo:
            contenido mensual, comunidad activa y acceso modular a toda la temporada.
          </p>
          {/* Skool link */}
          <p style={{ marginTop: 8, fontSize: 13, color: "var(--texto-suave)" }}>
            ¿Ya eres entrenador del Lab?{" "}
            <a href="https://www.skool.com/jorge-lorenzo-coach" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--oro)", textDecoration: "none", fontWeight: 600 }}>
              Entra a Skool →
            </a>
          </p>

        </div>
      </main>

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 1, padding: "24px 40px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "var(--texto-suave)" }}>
          © {new Date().getFullYear()} Jorge Lorenzo Coach · Campeón del Mundo · Campeón de Europa
        </p>
      </footer>

    </div>
  );
}
