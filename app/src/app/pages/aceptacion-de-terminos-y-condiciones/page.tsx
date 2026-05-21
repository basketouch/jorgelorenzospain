import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y condiciones — Jorge Lorenzo",
};

export default function TerminosPage() {
  return (
    <>
      {/* NAV */}
      <nav>
        <a href="/" className="nav-logo">Jorge <span>Lorenzo</span></a>
        <div className="nav-links">
          <a href="/#niveles" className="nav-link">Comunidad</a>
          <a href="/cursos/laboratorio-2526" className="nav-link">El Laboratorio</a>
          <a href="/newsletter" className="nav-link">Newsletter</a>
          <a href="/login" className="nav-cta">Iniciar sesión</a>
        </div>
      </nav>

      <div style={{ paddingTop: 64 }}>
        <div className="container" style={{ maxWidth: 740, paddingTop: 64, paddingBottom: 100 }}>
          <a href="/newsletter" style={{ color: "var(--texto-suave)", fontSize: 13, textDecoration: "none", display: "inline-block", marginBottom: 32 }}>
            ← Volver
          </a>

          <p className="section-label">Legal</p>
          <h1 style={{ marginBottom: 40 }}>Términos y condiciones</h1>

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

            <section>
              <h2 style={{ fontSize: 17, marginBottom: 12 }}>1. Aceptación de términos</h2>
              <p style={{ color: "var(--texto-suave)", fontSize: 15, lineHeight: 1.8 }}>
                Al suscribirte a la newsletter de Jorge Lorenzo Coach, aceptas recibir comunicaciones periódicas
                por correo electrónico con contenido relacionado con el baloncesto, el entrenamiento y la formación
                de entrenadores. Puedes darte de baja en cualquier momento.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: 17, marginBottom: 12 }}>2. Datos personales</h2>
              <p style={{ color: "var(--texto-suave)", fontSize: 15, lineHeight: 1.8 }}>
                Los datos recogidos (nombre y dirección de email) se utilizan exclusivamente para el envío de la
                newsletter. No se ceden ni venden a terceros. El tratamiento de datos se realiza conforme al
                Reglamento General de Protección de Datos (RGPD) y la normativa española vigente.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: 17, marginBottom: 12 }}>3. Contenido</h2>
              <p style={{ color: "var(--texto-suave)", fontSize: 15, lineHeight: 1.8 }}>
                El contenido enviado tiene carácter informativo y formativo. Jorge Lorenzo Coach se reserva el
                derecho de modificar, suspender o cancelar la newsletter en cualquier momento sin previo aviso.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: 17, marginBottom: 12 }}>4. Baja de la suscripción</h2>
              <p style={{ color: "var(--texto-suave)", fontSize: 15, lineHeight: 1.8 }}>
                Puedes cancelar tu suscripción en cualquier momento haciendo clic en el enlace de baja incluido
                en cada correo o contactando directamente a través de la web.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: 17, marginBottom: 12 }}>5. Responsabilidad</h2>
              <p style={{ color: "var(--texto-suave)", fontSize: 15, lineHeight: 1.8 }}>
                Jorge Lorenzo Coach no se hace responsable de los resultados derivados de la aplicación de
                los contenidos de la newsletter. Cada entrenador es responsable de adaptar las ideas a su
                contexto particular.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: 17, marginBottom: 12 }}>6. Contacto</h2>
              <p style={{ color: "var(--texto-suave)", fontSize: 15, lineHeight: 1.8 }}>
                Para cualquier consulta relacionada con estos términos, puedes ponerte en contacto a través
                del formulario disponible en <a href="/" style={{ color: "var(--oro)" }}>jorgelorenzo.coach</a>.
              </p>
            </section>

          </div>

          <p style={{ fontSize: 12, color: "var(--texto-suave)", marginTop: 48 }}>
            Última actualización: mayo 2025
          </p>
        </div>
      </div>

      <footer style={{ borderTop: "1px solid var(--borde)", padding: "32px 0" }}>
        <div className="container">
          <p style={{ fontSize: 13, color: "var(--texto-suave)" }}>
            © 2025 Jorge Lorenzo · Comunidad de Entrenadores · Baloncesto
          </p>
        </div>
      </footer>
    </>
  );
}
