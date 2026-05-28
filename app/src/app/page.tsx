export default function Home() {

  return (
    <>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(10,10,10,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--borde)", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--blanco)", textDecoration: "none" }}>
          Jorge <span style={{ color: "var(--oro)" }}>Lorenzo</span>
        </a>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <a href="/drawsports" style={{ fontSize: 13, color: "var(--texto-suave)", textDecoration: "none" }}>DrawSports</a>
          <a href="/stages" style={{ fontSize: 13, color: "var(--texto-suave)", textDecoration: "none" }}>Pre-Season Tours</a>
          <a href="#achievements" style={{ fontSize: 13, color: "var(--texto-suave)", textDecoration: "none" }}>Achievements</a>
          <a href="mailto:coach@jorgelorenzospain.com?subject=Coaching%20Inquiry" style={{ fontSize: 13, fontWeight: 700, background: "var(--oro)", color: "var(--negro)", padding: "10px 20px", borderRadius: 4, textDecoration: "none" }}>Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 40px 80px", position: "relative", overflow: "hidden", marginTop: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 24 }}>World Champion Coach</p>
            <h1 style={{ fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 800, lineHeight: 1.05, color: "var(--blanco)", letterSpacing: "-0.02em", marginBottom: 24 }}>
              World Champion.<br />
              <span style={{ color: "var(--oro)" }}>European Champion.</span>
            </h1>
            <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "var(--texto-suave)", marginBottom: 48, lineHeight: 1.7 }}>
              Almost a decade with Spain's National Team. Two World Championships. Two Olympic Games. Professional coaching at the highest level. Now bringing elite training to your college program.
            </p>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <a href="/drawsports" style={{ display: "inline-block", background: "var(--oro)", color: "var(--negro)", fontSize: 15, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", textDecoration: "none", padding: "16px 36px", borderRadius: 4, transition: "all 0.2s", cursor: "pointer" }}>
                Try DrawSports
              </a>
              <a href="/stages" style={{ display: "inline-block", background: "transparent", color: "var(--oro)", fontSize: 15, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", textDecoration: "none", padding: "16px 36px", borderRadius: 4, border: "2px solid var(--oro)", transition: "all 0.2s", cursor: "pointer" }}>
                Pre-Season Tours
              </a>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <img src="/fotos/Mundial Oro 19.png" alt="World Champion 2019 Beijing" style={{ width: "100%", borderRadius: 12, border: "2px solid var(--oro)", display: "block" }} />
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section style={{ padding: "80px 40px", position: "relative", borderTop: "1px solid var(--borde)", borderBottom: "1px solid var(--borde)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
            {[
              { icon: "🥇", title: "World Champion", sub: "Beijing 2019" },
              { icon: "🥇", title: "European Champion", sub: "Berlin 2022" },
              { icon: "🏅", title: "Olympic Games 2021 · 2024", sub: "Tokyo · Paris" },
              { icon: "🏅", title: "World Championship 2023 · Eurobasket 2025", sub: "Jakarta · Cyprus" },
              { icon: "🏅", title: "Youth National Teams", sub: "U15/U16 Spain · 2015–2018" },
              { icon: "🏀", title: "Academy Director · 2021/22", sub: "Clube 1º de Agosto · Angola" },
              { icon: "🏀", title: "Assistant Coach · 2024/25", sub: "Palencia Baloncesto · 1ª FEB" },
              { icon: "📋", title: "25 Years Coaching", sub: "Youth Development & Elite Level" },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                  <strong style={{ color: "var(--texto)", fontSize: 14, lineHeight: 1.2 }}>{item.title}</strong>
                </div>
                <p style={{ fontSize: 12, color: "var(--texto-suave)", margin: 0, paddingLeft: 34, lineHeight: 1.5 }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLABORATORS SECTION */}
      <section id="achievements" style={{ padding: "96px 40px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>Elite Experience</p>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 24 }}>Trained alongside global elite.</h2>
              <p style={{ fontSize: 17, color: "var(--texto-suave)", marginBottom: 32, lineHeight: 1.7 }}>Experience comes from nearly a decade in Spain's National Team, working with world-class players and coaching staff. That knowledge is now available for your program.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              {[
                { src: "/fotos/Con Scariolo.png", label: "With Sergio Scariolo" },
                { src: "/fotos/Con Pau Gasol.png", label: "With Pau Gasol" },
                { src: "/fotos/Con Ricky Rubio.png", label: "With Ricky Rubio" },
                { src: "/fotos/Con Santi Aldama.png", label: "With Santi Aldama" },
              ].map((foto, i) => (
                <div key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={foto.src} alt={foto.label} style={{ width: "100%", borderRadius: 12, border: "1px solid var(--borde)", display: "block", marginBottom: 12 }} />
                  <p style={{ fontSize: 13, color: "var(--texto-suave)", textAlign: "center" }}>{foto.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CHINA CLINIC SECTION */}
      <section style={{ padding: "96px 40px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>International Impact</p>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 24 }}>Training coaches worldwide.</h2>
              <p style={{ fontSize: 17, color: "var(--texto-suave)", marginBottom: 32, lineHeight: 1.7 }}>
                2nd Edition FIBA China Coaching Clinic Workshop. Hosted in Jinhua, March 2026. Training 600 international coaches on elite basketball strategies and player development.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 24 }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 28, margin: "0 0 8px" }}>🌍</p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--oro)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 6px" }}>Location</p>
                  <p style={{ fontSize: 14, color: "var(--texto-suave)", margin: 0, lineHeight: 1.4 }}>Jinhua, China</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 28, margin: "0 0 8px" }}>📅</p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--oro)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 6px" }}>Date</p>
                  <p style={{ fontSize: 14, color: "var(--texto-suave)", margin: 0, lineHeight: 1.4 }}>March 2026</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 28, margin: "0 0 8px" }}>👥</p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--oro)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 6px" }}>Coaches Trained</p>
                  <p style={{ fontSize: 14, color: "var(--texto-suave)", margin: 0, lineHeight: 1.4 }}>600 Chinese Coaches</p>
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              {[
                { src: "/fotos/China_1.JPG", label: "FIBA China Coaching Clinic Workshop" },
                { src: "/fotos/China_2.JPG", label: "Training 600 Chinese Coaches" },
              ].map((foto, i) => (
                <div key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={foto.src} alt={foto.label} style={{ width: "100%", borderRadius: 12, border: "1px solid var(--borde)", display: "block", marginBottom: 12 }} />
                  <p style={{ fontSize: 13, color: "var(--texto-suave)", textAlign: "center" }}>{foto.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "96px 40px", position: "relative", background: "var(--card)", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>Elevate Your Program</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 24 }}>Ready to transform your team?</h2>
          <p style={{ fontSize: 18, color: "var(--texto-suave)", marginBottom: 40, lineHeight: 1.7 }}>
            Whether you're looking for elite pre-season training, matches against top European competition, or specialized coaching clinics—we'll design a custom experience for your college program.
          </p>
          <a href="/stages" style={{ display: "inline-block", background: "var(--oro)", color: "var(--negro)", fontSize: 15, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", textDecoration: "none", padding: "16px 36px", borderRadius: 4, transition: "all 0.2s", cursor: "pointer" }}>
            View Pre-Season Tours
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--borde)", padding: "32px 40px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "var(--texto-suave)", marginBottom: 16 }}>
          © {new Date().getFullYear()} Jorge Lorenzo · World Champion Coach
        </p>
        <p style={{ fontSize: 12, color: "var(--texto-suave)" }}>
          Email: <a href="mailto:coach@jorgelorenzospain.com" style={{ color: "var(--oro)", textDecoration: "none" }}>coach@jorgelorenzospain.com</a>
        </p>
      </footer>
    </>
  );
}
