export const metadata = {
  title: "DrawSports — Coaching Tool by Jorge Lorenzo",
  description: "iPad app for instant video analysis. Tag live, annotate in real-time, give feedback on the court. Used by World Champion coach Jorge Lorenzo.",
};

export default function DrawSports() {
  return (
    <>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(10,10,10,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--borde)", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--blanco)", textDecoration: "none" }}>
          Jorge <span style={{ color: "var(--oro)" }}>Lorenzo</span>
        </a>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <a href="/drawsports" style={{ fontSize: 13, color: "var(--oro)", fontWeight: 600, textDecoration: "none" }}>DrawSports</a>
          <a href="/stages" style={{ fontSize: 13, color: "var(--texto-suave)", textDecoration: "none" }}>Pre-Season Tours</a>
          <a href="/" style={{ fontSize: 13, color: "var(--texto-suave)", textDecoration: "none" }}>← Home</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 40px 80px", position: "relative", overflow: "hidden", marginTop: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 24 }}>DrawSports · iPad Coaching Tool</p>
            <h1 style={{ fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 800, lineHeight: 1.05, color: "var(--blanco)", letterSpacing: "-0.02em", marginBottom: 24 }}>
              How I teach<br />
              <span style={{ color: "var(--oro)" }}>basketball now.</span>
            </h1>
            <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "var(--texto-suave)", marginBottom: 48, lineHeight: 1.7 }}>
              7 years with Spain's National Team. World Champion. Europe Champion. This is the tool that changed how I give feedback to players on the court.
            </p>
            <a href="https://apps.apple.com/es/app/drawsports/id6756434573" style={{ display: "inline-block", background: "var(--oro)", color: "var(--negro)", fontSize: 15, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", textDecoration: "none", padding: "16px 36px", borderRadius: 4, transition: "all 0.2s", cursor: "pointer" }}>
              Download on App Store
            </a>
            <p style={{ fontSize: 13, color: "var(--texto-suave)", marginTop: 16 }}>
              iPad only • 7 days free
            </p>
          </div>
          <div style={{ position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fotos/China_DrawSports.JPG" alt="DrawSports on 9-meter screen" style={{ width: "100%", borderRadius: 12, border: "2px solid var(--oro)", display: "block" }} />
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section style={{ padding: "96px 40px", position: "relative", background: "var(--oscuro)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>The Problem</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 24 }}>Your assistants lose hours tagging videos alone.</h2>
          <p style={{ fontSize: 17, color: "var(--texto-suave)", maxWidth: 560, marginBottom: 60, lineHeight: 1.7 }}>Players wait days to see analysis. By then, the moment is forgotten. Feedback should be instant, on the court, while they feel the mistake.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {[
              { icon: "⏱️", title: "Hours of tagging", desc: "Your assistant spends 3-4 hours on a single game. Alone." },
              { icon: "📱", title: "Slow workflow", desc: "Tag, export, review later. The learning moment is gone." },
            ].map((item, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 10, padding: "24px 28px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ fontSize: 32, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "var(--texto)", marginBottom: 8 }}>{item.title}</p>
                  <p style={{ fontSize: 14, color: "var(--texto-suave)", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE SOLUTION */}
      <section style={{ padding: "96px 40px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>The Solution</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 24 }}>Tag live. Annotate instantly. Coach in real-time.</h2>
          <p style={{ fontSize: 17, color: "var(--texto-suave)", maxWidth: 560, marginBottom: 60, lineHeight: 1.7 }}>Project on the court. Write notes while the video plays. Players see their mistake immediately. Learning happens at that moment.</p>

          {/* Quick benefits */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 80 }}>
            {[
              { icon: "📺", text: "Project iPad on court" },
              { icon: "✍️", text: "Write live annotations" },
              { icon: "⚡", text: "Instant feedback to players" },
            ].map((item, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 10, padding: "20px 24px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 15, color: "var(--texto-suave)", lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* iPad Screenshots Gallery */}
          <div style={{ marginBottom: 80 }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--blanco)", marginBottom: 32, textAlign: "center" }}>Designed for iPad</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {[
                { src: "/fotos/DrawSports_Screenshot1.png", alt: "DrawSports iPad app - Video analysis interface" },
                { src: "/fotos/DrawSports_Screenshot2.png", alt: "DrawSports iPad app - Tactical annotation tools" },
                { src: "/fotos/DrawSports_Screenshot3.png", alt: "DrawSports iPad app - Timeline and playback controls" },
              ].map((img, i) => (
                <div key={i} style={{ borderRadius: 12, border: "1px solid var(--borde)", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} style={{ width: "100%", display: "block" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Features */}
          <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--blanco)", marginBottom: 32, textAlign: "center" }}>Powerful Features Built for Coaches</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            {[
              {
                icon: "⚡️",
                title: "Fast Video Analysis",
                desc: "Import from iCloud, Drive or USB and start in seconds. Mark clips while you watch the game—every action automatically becomes a highlight. Smart history lets you resume work where you left off without wasting time searching."
              },
              {
                icon: "❄️",
                title: "Freeze Frame Effect",
                desc: "Don't just draw—explain. Use the magnifier for details or create a Freeze Frame: pause the image, draw tactical corrections, and decide exactly how long that pause lasts. Turn video into a lesson."
              },
              {
                icon: "📋",
                title: "Pro Tactical Whiteboard",
                desc: "Design plays and concepts without needing video. Switch between Notebook Mode for quick notes or Official Court templates to give your explanations real-court context."
              },
              {
                icon: "🚀",
                title: "Project & Share",
                desc: "In the video room: connect to TV and keep full control (speed, frame-by-frame). Need to send it? Export clips or full sequences, choose whether to include audio or drawings, and share instantly via WhatsApp or AirDrop."
              },
            ].map((feature, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 10, padding: 32 }}>
                <span style={{ fontSize: 32, marginBottom: 12, display: "block" }}>{feature.icon}</span>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--blanco)", marginBottom: 12 }}>{feature.title}</h4>
                <p style={{ fontSize: 14, color: "var(--texto-suave)", lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ME */}
      <section style={{ padding: "96px 40px", position: "relative", background: "var(--oscuro)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>Why This Matters</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 24 }}>Instant feedback = 3x faster learning.</h2>
          <p style={{ fontSize: 17, color: "var(--texto-suave)", maxWidth: 560, marginBottom: 60, lineHeight: 1.7 }}>I spent 7 years with Spain's National Team. We used video feedback at the highest level. But this way — live, on the court — changed everything.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: "🥇", title: "2019 Mundial", sub: "Medalla de Oro" },
              { icon: "🏀", title: "2021 JJOO", sub: "Tokyo" },
              { icon: "🥇", title: "2022 Eurobasket", sub: "Medalla de Oro" },
              { icon: "🏀", title: "2023 Mundial", sub: "Jakarta" },
              { icon: "🏀", title: "2024 JJOO", sub: "Paris" },
              { icon: "🏀", title: "2025 Eurobasket", sub: "Cyprus" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 16px", background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 8 }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--texto)", marginBottom: 2 }}>{item.title}</p>
                  <p style={{ fontSize: 12, color: "var(--texto-suave)" }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: "96px 40px", position: "relative", background: "var(--card)", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>Ready to coach differently?</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 24 }}>7 days free. On your iPad.</h2>
          <p style={{ fontSize: 18, color: "var(--texto-suave)", marginBottom: 40, lineHeight: 1.7 }}>
            No credit card. No commitment. Just instant coaching feedback.
          </p>
          <a href="https://apps.apple.com/es/app/drawsports/id6756434573" style={{ display: "inline-block", background: "var(--oro)", color: "var(--negro)", fontSize: 15, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", textDecoration: "none", padding: "16px 36px", borderRadius: 4, transition: "all 0.2s", cursor: "pointer" }}>
            Download DrawSports
          </a>
          <p style={{ fontSize: 12, color: "var(--texto-suave)", marginTop: 16 }}>
            Available on App Store (iPad only)
          </p>
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
