import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata = { title: "Acceso — Jorge Lorenzo" };

export default function LoginPage() {
  return (
    <>
      <nav>
        <a href="/" className="nav-logo">Jorge <span>Lorenzo</span></a>
      </nav>
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 60px" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <p className="section-label" style={{ textAlign: "center" }}>Área privada</p>
          <h2 style={{ textAlign: "center", marginBottom: 32 }}>Accede a tus cursos</h2>
          <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 10, padding: 32 }}>
            <Suspense>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
