import NuevaContrasenaForm from "./NuevaContrasenaForm";

export const metadata = { title: "Nueva contraseña — Jorge Lorenzo" };

export default function NuevaContrasenaPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--negro)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Logo */}
        <p style={{ textAlign: "center", fontSize: 18, fontWeight: 800, letterSpacing: "0.08em", marginBottom: 40 }}>
          JORGE <span style={{ color: "var(--oro)" }}>LORENZO</span>
        </p>

        <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 12, padding: 32 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Nueva contraseña</h1>
          <NuevaContrasenaForm />
        </div>
      </div>
    </div>
  );
}
