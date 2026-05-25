export const metadata = {
  title: "Pre-Season Tours — Jorge Lorenzo Coach",
  description: "Elite training camps for college basketball in Spain. World Champion coaching, professional competition, 5-star accommodation, and unforgettable cultural experiences.",
};

export default function Stages() {
  return (
    <>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(10,10,10,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--borde)", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--blanco)", textDecoration: "none" }}>
          Jorge <span style={{ color: "var(--oro)" }}>Lorenzo</span>
        </a>
        <a href="/" style={{ fontSize: 13, color: "var(--texto-suave)", textDecoration: "none" }}>
          ← Back to home
        </a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 40px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 40%, rgba(201,168,76,0.07) 0%, transparent 65%)", pointerEvents: "none" }}></div>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 24 }}>Pre-Season Tours · Elite Basketball Training</p>
          <h1 style={{ fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 800, lineHeight: 1.05, color: "var(--blanco)", letterSpacing: "-0.02em", marginBottom: 24 }}>
            Train in Spain.<br />
            <span style={{ color: "var(--oro)" }}>At the highest level.</span>
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "var(--texto-suave)", marginBottom: 48, maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
            Full-service training camps for college basketball programs. Elite facilities, competitive scrimmages, premium accommodation, and the coaching experience of a World Champion who has competed on the world's biggest stages.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginTop: 60, paddingTop: 48, borderTop: "1px solid var(--borde)" }}>
            {[
              { icon: "🏀", title: "3 Elite Venues", sub: "Málaga · Madrid · Valencia" },
              { icon: "🥇", title: "2x World Champion", sub: "Beijing 2019 · Berlin 2022" },
              { icon: "🌍", title: "25 Years Coaching", sub: "Elite level experience" },
              { icon: "360", title: "Full-Service", sub: "Everything included" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, fontSize: 13, color: "var(--texto-suave)" }}>
                <span style={{ fontSize: 28 }}>{item.icon}</span>
                <span><strong style={{ color: "var(--texto)", display: "block", marginBottom: 2 }}>{item.title}</strong>{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL SERVICE */}
      <section style={{ padding: "96px 40px", position: "relative", background: "var(--oscuro)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>What's included</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 24 }}>Everything taken care of.</h2>
          <p style={{ fontSize: 17, color: "var(--texto-suave)", maxWidth: 560, marginBottom: 60, lineHeight: 1.7 }}>We handle all logistics so coaching staff and players focus exclusively on court work and team development.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 48 }}>
            {[
              { icon: "✈️", text: "Airport & venue transfers" },
              { icon: "🏀", text: "Scrimmages vs comparable teams" },
              { icon: "🏨", text: "5-star hotel accommodation" },
              { icon: "🍽️", text: "Full board (all meals included)" },
              { icon: "🎭", text: "Cultural & sightseeing activities" },
              { icon: "🏥", text: "Medical assistance 24/7" },
            ].map((item, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 10, padding: "20px 24px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 15, color: "var(--texto-suave)", lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 10, padding: "24px 28px" }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>Additional services</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Laundry", "Meeting rooms", "Session recording", "Custom diets", "24h support", "Elite coach talks"].map((svc, i) => (
                <span key={i} style={{ fontSize: 13, color: "var(--texto-suave)", background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 20, padding: "5px 14px" }}>{svc}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THREE VENUES */}
      <section style={{ padding: "96px 40px", position: "relative" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>Where we train</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 60 }}>Three venues. Three elite experiences.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
            {[
              { icon: "☀️", city: "Málaga · Fuengirola", name: "Higuerón Training Center", hotel: "Hilton Higuerón Hotel", desc: "Andalusia's most modern facility with professional hardwood courts, state-of-the-art equipment and direct access to the Costa del Sol.", points: ["25 min from Marbella · 15 min from airport", "5★ hotel 3 minutes away with spa & pool", "Costa del Sol beaches 10 minutes away"] },
              { icon: "🏛️", city: "Madrid", name: "José Antonio Paraíso Center", hotel: "Hotel Asset Torrejón", desc: "Professional facilities 25 minutes from central Madrid and 10 minutes from Adolfo Suárez airport. Prime access to Europe's basketball capital.", points: ["10 min from Madrid-Barajas airport", "Tour of Santiago Bernabéu & Gran Vía", "Hotel with restaurant, gym and sauna"] },
              { icon: "🏟️", city: "Valencia", name: "L'Alqueria del Basket", hotel: "Hotel Valencia City Centre", desc: "Official home of Valencia Basket and a European basketball landmark. 13 simultaneous courts for groups of any size.", points: ["14 min from Valencia city centre", "13 courts for simultaneous training", "A benchmark facility in European basketball"] },
            ].map((venue, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
                <div style={{ order: i === 1 ? 1 : 0 }}>
                  <p style={{ fontSize: 28, marginBottom: 8 }}>{venue.icon}</p>
                  <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 8 }}>{venue.city}</p>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: "var(--blanco)", marginBottom: 4 }}>{venue.name}</h3>
                  <p style={{ fontSize: 14, color: "var(--texto-suave)", marginBottom: 20 }}>🏨 {venue.hotel}</p>
                  <p style={{ fontSize: 15, color: "var(--texto-suave)", lineHeight: 1.7, marginBottom: 24 }}>{venue.desc}</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {venue.points.map((pt, j) => (
                      <li key={j} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--texto-suave)" }}>
                        <span style={{ color: "var(--oro)", flexShrink: 0 }}>→</span> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ order: i === 1 ? 0 : 1, background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 12, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontSize: 56 }}>{venue.icon}</span>
                  <p style={{ fontSize: 13, color: "var(--texto-suave)", textAlign: "center" }}>{venue.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINED ALONGSIDE GLOBAL ELITE */}
      <section id="achievements" style={{ padding: "96px 40px", position: "relative", background: "var(--oscuro)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>Elite Experience</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 16 }}>Trained alongside global elite.</h2>
          <p style={{ fontSize: 17, color: "var(--texto-suave)", maxWidth: 560, marginBottom: 60, lineHeight: 1.7 }}>Nearly a decade with Spain's National Team, working with world-class players and coaching staff. That knowledge is now available for your program.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            {[
              { src: "/fotos/Con Scariolo.png", label: "With Sergio Scariolo" },
              { src: "/fotos/Con Pau Gasol.png", label: "With Pau Gasol" },
              { src: "/fotos/Con Ricky Rubio.png", label: "With Ricky Rubio" },
              { src: "/fotos/Con Santi Aldama.png", label: "With Santi Aldama" },
            ].map((foto, i) => (
              <div key={i}>
                <img src={foto.src} alt={foto.label} style={{ width: "100%", borderRadius: 12, border: "1px solid var(--borde)", display: "block", marginBottom: 12 }} />
                <p style={{ fontSize: 13, color: "var(--texto-suave)", textAlign: "center" }}>{foto.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ padding: "96px 40px", position: "relative" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>Experience matters</p>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 24 }}>Not a travel agent.<br />A basketball coach.</h2>
              <p style={{ fontSize: 16, color: "var(--texto-suave)", lineHeight: 1.8, marginBottom: 24 }}>Jorge Lorenzo is not selling trips. He designs training camps with the same mindset as a EuroBasket preparation: clear objectives, right opponents, top facilities, and an experience that impacts your team's game.</p>
              <p style={{ fontSize: 16, color: "var(--texto-suave)", lineHeight: 1.8 }}>Every stage is planned for genuine improvement, not tourism.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "🥇", title: "2× World Champion", sub: "Spanish National Team · FIBA" },
                { icon: "🥇", title: "2× Olympic Medalist", sub: "Tokyo 2021 · Paris 2024" },
                { icon: "🏅", title: "EuroBasket & World Cups", sub: "Berlin 2022 · Jakarta 2023 · Cyprus 2025" },
                { icon: "🏀", title: "25 Years Coaching", sub: "Elite level experience" },
              ].map((cred, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 16px", background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 8 }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{cred.icon}</span>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "var(--texto)", marginBottom: 2 }}>{cred.title}</p>
                    <p style={{ fontSize: 12, color: "var(--texto-suave)" }}>{cred.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section style={{ padding: "96px 40px", position: "relative", background: "var(--card)", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>Get in touch</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 24 }}>Tell us about your team.</h2>
          <p style={{ fontSize: 18, color: "var(--texto-suave)", marginBottom: 40, lineHeight: 1.7 }}>
            Every camp is different. Contact us and we'll send you a tailored proposal within 48 hours.
          </p>
          <a href="mailto:coach@jorgelorenzospain.com?subject=Pre-Season%20Tours%20Inquiry" style={{ display: "inline-block", background: "var(--oro)", color: "var(--negro)", fontSize: 15, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", textDecoration: "none", padding: "16px 36px", borderRadius: 4, transition: "all 0.2s", cursor: "pointer" }}>
            Request Your Quote
          </a>
          <div style={{ marginTop: 40, display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:coach@jorgelorenzospain.com" style={{ fontSize: 14, color: "var(--texto-suave)", textDecoration: "none" }}>✉ coach@jorgelorenzospain.com</a>
            <a href="tel:+34666136257" style={{ fontSize: 14, color: "var(--texto-suave)", textDecoration: "none" }}>📞 +34 666 136 257</a>
          </div>
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
