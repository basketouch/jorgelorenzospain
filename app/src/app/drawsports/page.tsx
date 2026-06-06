import ScreenshotsCarousel from '../components/ScreenshotsCarousel';

export const metadata = {
  title: "DrawSports — Coaching Tool by Jorge Lorenzo",
  description: "iPad app for instant video analysis. Tag live, annotate in real-time, give feedback on the court. Used by World Champion coach Jorge Lorenzo.",
};

export default function DrawSports() {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .nav-links { gap: 16px !important; flex-wrap: wrap; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(10,10,10,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--borde)", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--blanco)", textDecoration: "none" }}>
          Jorge <span style={{ color: "var(--oro)" }}>Lorenzo</span>
        </a>
        <div className="nav-links" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <a href="/drawsports" style={{ fontSize: 13, color: "var(--oro)", fontWeight: 600, textDecoration: "none" }}>DrawSports</a>
          <a href="/stages" style={{ fontSize: 13, color: "var(--texto-suave)", textDecoration: "none" }}>Pre-Season Tours</a>
          <a href="/" style={{ fontSize: 13, color: "var(--texto-suave)", textDecoration: "none" }}>← Home</a>
        </div>
      </nav>

      {/* HERO - iPad Product Showcase */}
      <section style={{ minHeight: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(80px, 15vw, 120px) clamp(20px, 5vw, 40px) clamp(60px, 10vw, 80px)", position: "relative", overflow: "hidden", marginTop: 0 }}>
        <div style={{ maxWidth: "min(100%, 1200px)", margin: "0 auto", position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 60, maxWidth: 700 }}>
            <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 24 }}>DrawSports · iPad Coaching Tool</p>
            <h1 style={{ fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 800, lineHeight: 1.05, color: "var(--blanco)", letterSpacing: "-0.02em", marginBottom: 24 }}>
              Draw on live video.<br />
              <span style={{ color: "var(--oro)" }}>Teach instantly.</span>
            </h1>
          </div>

          {/* iPad Screenshots Carousel */}
          <div style={{ width: "100%", maxWidth: 900, marginBottom: 80 }}>
            <ScreenshotsCarousel />
          </div>
        </div>
      </section>

      {/* HERO - Scariolo Credibility */}
      <section style={{ padding: "clamp(60px, 10vw, 96px) clamp(20px, 5vw, 40px)", position: "relative", background: "var(--oscuro)" }}>
        <div style={{ maxWidth: "min(100%, 1200px)", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 8vw, 60px)", alignItems: "center" }}>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/fotos/header-hero.png" alt="Sergio Scariolo and Jorge Lorenzo - Eurobasket 2022 Champions" style={{ width: "100%", borderRadius: 12, border: "3px solid var(--oro)", display: "block", marginBottom: 12 }} />
              <p style={{ fontSize: 12, color: "var(--texto-suave)", textAlign: "center", fontStyle: "italic" }}>Jorge Lorenzo (creator of DrawSports) with Sergio Scariolo — Eurobasket 2022 Champions</p>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 12 }}>Why Elite Coaches Choose DrawSports</p>
              <p style={{ fontSize: 15, color: "var(--texto-suave)", lineHeight: 1.8, marginBottom: 24, fontStyle: "italic" }}>
                "The ultimate tool for elite tactical delivery. Whether in the locker room or mid-game on the iPad, the ability to draw and overlay concepts on video makes teaching complex tactics seamless. Professional, intuitive, and built for winning environments."
              </p>
              <div style={{ marginBottom: 40 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--blanco)", margin: "0 0 4px" }}>Sergio Scariolo</p>
                <p style={{ fontSize: 12, color: "var(--oro)", fontWeight: 600 }}>Eurobasket 2022 Champion · Spain National Team Head Coach</p>
              </div>
              <a href="https://apps.apple.com/es/app/drawsports/id6756434573" style={{ display: "inline-block", background: "var(--oro)", color: "var(--negro)", fontSize: 15, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", textDecoration: "none", padding: "16px 36px", borderRadius: 4, transition: "all 0.2s", cursor: "pointer", marginBottom: 16 }}>
                Download on App Store
              </a>
              <p style={{ fontSize: 13, color: "var(--texto-suave)" }}>
                iPad only • 7 days free
              </p>
              <a href="#teams-in-action" style={{ display: "inline-block", marginTop: 24, fontSize: 13, color: "var(--oro)", textDecoration: "none", fontWeight: 600 }}>
                Teams using DrawSports →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section style={{ padding: "clamp(60px, 10vw, 96px) clamp(20px, 5vw, 40px)", position: "relative", background: "var(--oscuro)" }}>
        <div style={{ maxWidth: "min(100%, 1200px)", margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>The Challenge</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 24 }}>Feedback after practice = players forget the moment.</h2>
          <p style={{ fontSize: 17, color: "var(--texto-suave)", maxWidth: 560, marginBottom: 60, lineHeight: 1.7 }}>Traditional coaching waits for the video room. Players move on. The feeling of the mistake fades. Learning slows. What if you could teach while they're still in that moment?</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(12px, 3vw, 24px)" }}>
            {[
              { icon: "⏰", title: "Delayed feedback", desc: "Players wait days to see what they did wrong. The learning moment is lost." },
              { icon: "📺", title: "Room-bound coaching", desc: "Feedback happens in the video room, far from the court where they played." },
            ].map((item, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 10, padding: "24px 28px", display: "flex", gap: "clamp(8px, 2vw, 16px)", alignItems: "flex-start" }}>
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
      <section style={{ padding: "clamp(60px, 10vw, 96px) clamp(20px, 5vw, 40px)", position: "relative" }}>
        <div style={{ maxWidth: "min(100%, 1200px)", margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>The Solution</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 24 }}>You deliver real-time feedback. On the court. Right now.</h2>
          <p style={{ fontSize: 17, color: "var(--texto-suave)", maxWidth: 560, marginBottom: 60, lineHeight: 1.7 }}>Bring your iPad to the court. You tag plays instantly. You draw tactical corrections while they watch. Players see, learn, and improve—in that moment. No waiting. No forgetting.</p>

          {/* Quick benefits */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(8px, 2vw, 16px)", marginBottom: 80 }}>
            {[
              { icon: "📺", text: "Project iPad on court" },
              { icon: "✍️", text: "Write live annotations" },
              { icon: "⚡", text: "Deliver instant feedback to players" },
            ].map((item, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 10, padding: "20px 24px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 15, color: "var(--texto-suave)", lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* SEE IT IN ACTION - VIDEOS */}
          <div style={{ marginBottom: 100 }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--blanco)", marginBottom: 32, textAlign: "center" }}>See It In Action</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(16px, 3vw, 24px)" }}>
              {[
                { title: "Projection Mode", id: "1159775747", hash: "629fa00f4f", desc: "Universal Import. Project to TV with full control. Coach from the bench.", type: "video" },
                { title: "Analysis & Tagging", id: "1159776689", hash: "4b7ca7c141", desc: "Tag plays while watching. Every action becomes a highlight instantly.", type: "video" },
                { title: "Frame-by-Frame Control", id: "1160262048", hash: "dda5a1df1f", desc: "Precision seeking and detailed frame control for tactical analysis.", type: "video" },
                { title: "Projection Mode", id: "1159775747", hash: "629fa00f4f", desc: "Project and share. Full control on TV with live annotations.", type: "video" },
                { title: "Export Media", desc: "Coming Soon", type: "coming-soon" },
                { title: "Tactical Whiteboard", id: "1197447116", hash: "9c71db1b78", desc: "Design plays and tactical concepts without needing video.", type: "video" },
                { title: "Advanced Features", desc: "Coming Soon", type: "coming-soon" },
              ].map((item, i) => (
                <div key={i} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--borde)" }}>
                  {item.type === "video" ? (
                    <>
                      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", background: "var(--card)" }}>
                        <iframe
                          src={`https://player.vimeo.com/video/${item.id}?h=${item.hash}&badge=0&autopause=0&player_id=0&app_id=58479`}
                          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          title={item.title}
                        />
                      </div>
                      <div style={{ padding: "16px", background: "var(--card)", borderTop: "1px solid var(--borde)" }}>
                        <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--blanco)", marginBottom: 6 }}>{item.title}</h4>
                        <p style={{ fontSize: 13, color: "var(--texto-suave)", lineHeight: 1.5 }}>{item.desc}</p>
                      </div>
                    </>
                  ) : (
                    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", background: "var(--card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "20px" }}>
                        <p style={{ fontSize: 32, marginBottom: 12 }}>🎬</p>
                        <p style={{ fontSize: 14, fontWeight: 700, color: "var(--texto-suave)" }}>Coming Soon</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>


          {/* Detailed Features */}
          <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--blanco)", marginBottom: 32, textAlign: "center" }}>Powerful Features Built for Coaches</h3>
          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "clamp(16px, 4vw, 32px)" }}>
            {[
              {
                icon: "⚡️",
                title: "Analyze Video Instantly",
                desc: "Import from iCloud, Drive or USB and start in seconds. You tag plays while you watch the game—every action you mark becomes a highlight. Smart history lets you resume work where you left off without wasting time searching."
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

      {/* WHAT COACHES SAY */}
      <section style={{ padding: "clamp(60px, 10vw, 96px) clamp(20px, 5vw, 40px)", position: "relative", background: "var(--oscuro)" }}>
        <div style={{ maxWidth: "min(100%, 1200px)", margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16, textAlign: "center" }}>What Coaches Say</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 60, textAlign: "center" }}>Trusted by coaches worldwide.</h2>

          <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "clamp(20px, 3vw, 32px)" }}>
            {[
              {
                title: "All in One Place",
                quote: "An excellent app for studying the game at any level. Built for a coach's daily workflow who uses video as a coaching tool. Tag, organize, draw, and share in one place—fast, intuitive, and professional.",
                author: "Joan Rubio",
                role: "Analytical Coach · Uni Girona (Liga Femenina Endesa · EuroLeague)",
                bio: "30+ years of basketball coaching expertise in Catalonia. Specializes in converting data into actionable basketball intelligence for elite competition.",
                rating: 5
              },
              {
                title: "Intuitive and Powerful",
                quote: "Intuitive and easy-to-use program. Now it's much faster to work with games. The ability to draw on the video while watching it is extremely useful. The price is reasonable for all the features and capabilities it offers. High-quality app.",
                author: "JLombi",
                role: "Head Coach · Estudiantes Madrid / Zentro Basket Madrid",
                bio: "Experienced coach with extensive history developing elite basketball programs in Madrid.",
                rating: 5
              },
              {
                title: "Perfect for Daily Coaching",
                quote: "DrawSports is an easy and intuitive tool for cutting video clips and annotating them, plus it has a whiteboard function. It makes teaching tactical and technical concepts visually to your players simple—just an iPad needed.",
                author: "José Antonio López Hervella",
                role: "Passionate Madrid Coach",
                rating: 5
              },
            ].map((review, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 12, padding: "32px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {[...Array(review.rating)].map((_, idx) => (
                    <span key={idx} style={{ fontSize: 16, color: "var(--oro)" }}>★</span>
                  ))}
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--blanco)", marginBottom: 12 }}>{review.title}</h4>
                <p style={{ fontSize: 14, color: "var(--texto-suave)", lineHeight: 1.7, marginBottom: 20, flex: 1 }}>{review.quote}</p>
                <div style={{ borderTop: "1px solid var(--borde)", paddingTop: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "var(--blanco)", margin: "0 0 4px" }}>{review.author}</p>
                  <p style={{ fontSize: 12, color: "var(--oro)", margin: "0 0 8px", fontWeight: 600 }}>{review.role}</p>
                  {review.bio && <p style={{ fontSize: 12, color: "var(--texto-suave)", margin: 0, lineHeight: 1.5 }}>{review.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: "clamp(60px, 10vw, 96px) clamp(20px, 5vw, 40px)", position: "relative", background: "var(--card)", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>Ready to coach differently?</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 24 }}>7 days free. On your iPad.</h2>
          <p style={{ fontSize: 18, color: "var(--texto-suave)", marginBottom: 40, lineHeight: 1.7 }}>
            7 days free. No commitment. Cancel before your trial ends.
          </p>
          <a href="https://apps.apple.com/es/app/drawsports/id6756434573" style={{ display: "inline-block", background: "var(--oro)", color: "var(--negro)", fontSize: 15, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", textDecoration: "none", padding: "16px 36px", borderRadius: 4, transition: "all 0.2s", cursor: "pointer" }}>
            Download DrawSports
          </a>
          <p style={{ fontSize: 12, color: "var(--texto-suave)", marginTop: 16 }}>
            Available on App Store (iPad only)
          </p>
        </div>
      </section>

      {/* TEAMS IN ACTION */}
      <section id="teams-in-action" style={{ padding: "clamp(60px, 10vw, 96px) clamp(20px, 5vw, 40px)", position: "relative", background: "var(--oscuro)" }}>
        <div style={{ maxWidth: "min(100%, 1200px)", margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16, textAlign: "center" }}>Teams in Action</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 48, textAlign: "center" }}>Professional teams using DrawSports.</h2>

          <div style={{ width: "100%", borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", background: "var(--card)" }}>
              <iframe
                src="https://player.vimeo.com/video/1197649501?h=ec4200d43b&badge=0&autopause=0&player_id=0&app_id=58479"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Professional team using DrawSports"
              />
            </div>
          </div>

          <p style={{ fontSize: 12, color: "var(--texto-suave)", textAlign: "center", fontStyle: "italic" }}>Q2 Performance Shanghai</p>
        </div>
      </section>

      {/* TEAM PLANS LINK */}
      <section style={{ padding: "32px 40px", textAlign: "center", borderTop: "1px solid var(--borde)", borderBottom: "1px solid var(--borde)" }}>
        <p style={{ fontSize: 13, color: "var(--texto-suave)", marginBottom: 8 }}>
          Looking to equip your coaching staff?
        </p>
        <a href="https://drawsports.app/pro/planes/en/index.html" style={{ fontSize: 13, color: "var(--oro)", fontWeight: 600, textDecoration: "none" }}>
          View team plans →
        </a>
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
