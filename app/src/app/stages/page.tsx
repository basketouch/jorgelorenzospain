export const metadata = {
  title: "Pre-Season Tours — Jorge Lorenzo Coach",
  description: "Elite training camps for college basketball in Spain. World Champion coaching, professional competition, 5-star accommodation, and unforgettable cultural experiences.",
};

export default function Stages() {
  return (
    <>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(10,10,10,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--borde)", padding: "16px clamp(20px, 5vw, 40px)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--blanco)", textDecoration: "none" }}>
          Jorge <span style={{ color: "var(--oro)" }}>Lorenzo</span>
        </a>
        <div style={{ display: "flex", gap: "clamp(16px, 4vw, 32px)", alignItems: "center" }}>
          <a href="/drawsports" style={{ fontSize: 13, color: "var(--texto-suave)", textDecoration: "none" }}>DrawSports</a>
          <a href="/stages" style={{ fontSize: 13, color: "var(--oro)", fontWeight: 600, textDecoration: "none" }}>Pre-Season Tours</a>
          <a href="/" style={{ fontSize: 13, color: "var(--texto-suave)", textDecoration: "none" }}>← Home</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(100px, 15vw, 120px) clamp(20px, 5vw, 40px) clamp(40px, 8vw, 60px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 40%, rgba(201,168,76,0.07) 0%, transparent 65%)", pointerEvents: "none" }}></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 8vw, 60px)", alignItems: "center", maxWidth: "min(100%, 1200px)", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 24 }}>Pre-Season Tours · Elite Basketball</p>
            <h1 style={{ fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 800, lineHeight: 1.05, color: "var(--blanco)", letterSpacing: "-0.02em", marginBottom: 24 }}>
              Train in Spain.<br />
              <span style={{ color: "var(--oro)" }}>Elite level.</span>
            </h1>
            <p style={{ fontSize: 17, color: "var(--texto-suave)", maxWidth: 500, lineHeight: 1.7, marginBottom: 40 }}>
              Full-service training camps with world-class facilities, competitive scrimmages, and premium accommodation. Coached by a two-time World Champion.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 40 }}>
              <a href="#contacto" style={{ display: "inline-flex", alignItems: "center", fontSize: 14, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", background: "var(--oro)", color: "var(--negro)", textDecoration: "none", padding: "14px 32px", borderRadius: 4, transition: "all 0.2s", cursor: "pointer" }}>Request quote →</a>
              <a href="#instalaciones" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--texto-suave)", textDecoration: "none", padding: "14px 0", borderBottom: "1px solid var(--borde)" }}>View venues ↓</a>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <img src="/fotos/equipos/Filipinos_1.avif" alt="Elite basketball competition" style={{ width: "100%", borderRadius: 12, border: "2px solid var(--oro)", display: "block" }} />
          </div>
        </div>
      </section>

      {/* FULL SERVICE */}
      <section style={{ padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 40px)", position: "relative", background: "var(--oscuro)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 12 }}>What's included</p>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 20 }}>Everything taken care of.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {[
              { icon: "✈️", text: "Airport transfers & daily transportation" },
              { icon: "🏨", text: "5-star accommodation & all meals" },
              { icon: "🏀", text: "Scrimmages vs elite local teams" },
              { icon: "🎭", text: "Cultural activities & sightseeing" },
            ].map((item, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 10, padding: "16px 20px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 14, color: "var(--texto-suave)", lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TWO VENUES */}
      <section id="instalaciones" style={{ padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 40px)", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 12 }}>Elite venues</p>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 48 }}>World-class facilities. Professional infrastructure.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>

            {/* MÁLAGA */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "flex-start" }}>
              <div>
                <p style={{ fontSize: 24, marginBottom: 8 }}>☀️</p>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 8 }}>Málaga · Fuengirola</p>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "var(--blanco)", marginBottom: 20 }}>Higuerón Training Center</h3>

                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--oro)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Facility Highlights</p>
                  <ul style={{ fontSize: 14, color: "var(--texto-suave)", lineHeight: 1.8, paddingLeft: 0, listStyle: "none" }}>
                    <li style={{ marginBottom: 6 }}>✓ 4 professional basketball courts (FIBA standards)</li>
                    <li style={{ marginBottom: 6 }}>✓ Olympic-size training center with lighting systems</li>
                    <li style={{ marginBottom: 6 }}>✓ Strength & conditioning facilities</li>
                    <li style={{ marginBottom: 6 }}>✓ Video analysis room for tactical reviews</li>
                    <li style={{ marginBottom: 6 }}>✓ Sports medicine & physiotherapy services</li>
                  </ul>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--oro)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Accommodation</p>
                  <p style={{ fontSize: 14, color: "var(--texto-suave)", lineHeight: 1.7 }}>5-star Hilton Higuerón resort with ocean views. Private rooms or twin configurations. All meals included in your package. Beachfront access for optional activities.</p>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--oro)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Location & Logistics</p>
                  <p style={{ fontSize: 14, color: "var(--texto-suave)", lineHeight: 1.7 }}>Only 15 minutes from Málaga-Costa del Sol International Airport. Direct highway access. Beachfront location on the Mediterranean. Easy access to local transportation and cultural attractions.</p>
                </div>

                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--oro)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Competition</p>
                  <p style={{ fontSize: 14, color: "var(--texto-suave)", lineHeight: 1.7 }}>Play against professional Spanish league teams and university programs. Competitive scrimmages scheduled throughout your stay. International teams experience.</p>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <img src="/fotos/malaga/498523588-AVL13gvl05Hpx9Wp.avif" alt="Higuerón Training Center court" style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid var(--borde)", display: "block", aspectRatio: "1/1", objectFit: "cover" }} />
                <img src="/fotos/malaga/7.2_1-1200x800-AMqlagB7REi8BDqO.avif" alt="Higuerón facility" style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid var(--borde)", display: "block", aspectRatio: "1/1", objectFit: "cover" }} />
              </div>
            </div>

            {/* MADRID */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "flex-start" }}>
              <div style={{ order: 1 }}>
                <p style={{ fontSize: 24, marginBottom: 8 }}>🏛️</p>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 8 }}>Madrid</p>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "var(--blanco)", marginBottom: 20 }}>Colegio Ideo</h3>

                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--oro)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Facility Highlights</p>
                  <ul style={{ fontSize: 14, color: "var(--texto-suave)", lineHeight: 1.8, paddingLeft: 0, listStyle: "none" }}>
                    <li style={{ marginBottom: 6 }}>✓ 2 professional-grade basketball courts (FIBA certified)</li>
                    <li style={{ marginBottom: 6 }}>✓ Modern gymnasium with multi-sport facilities</li>
                    <li style={{ marginBottom: 6 }}>✓ Advanced strength training center</li>
                    <li style={{ marginBottom: 6 }}>✓ Nutrition & sports science center</li>
                    <li style={{ marginBottom: 6 }}>✓ On-site medical staff and physiotherapy clinic</li>
                  </ul>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--oro)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Accommodation</p>
                  <p style={{ fontSize: 14, color: "var(--texto-suave)", lineHeight: 1.7 }}>Luxury hotel partner accommodations in central Madrid. Private rooms with all amenities. Buffet and à la carte dining options. 24-hour access to training facilities.</p>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--oro)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Location & Logistics</p>
                  <p style={{ fontSize: 14, color: "var(--texto-suave)", lineHeight: 1.7 }}>Located in the heart of Madrid, Spain's capital. 20 minutes from Barajas International Airport. Direct access to metro system. Walking distance to world-class museums, restaurants, and cultural venues.</p>
                </div>

                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--oro)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Competition</p>
                  <p style={{ fontSize: 14, color: "var(--texto-suave)", lineHeight: 1.7 }}>Compete against Madrid's elite teams including professional ACB league players. World-class competition designed to prepare your team for elite tournament play.</p>
                </div>
              </div>

              <div style={{ order: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <img src="/fotos/madrid/ideo/ideo_1.jpg" alt="Colegio Ideo gymnasium" style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid var(--borde)", display: "block", aspectRatio: "1/1", objectFit: "cover" }} />
                <img src="/fotos/madrid/ideo/pabellon_1.png" alt="Colegio Ideo facility" style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid var(--borde)", display: "block", aspectRatio: "1/1", objectFit: "cover" }} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ELITE COACH EXPERIENCE */}
      <section id="achievements" style={{ padding: "clamp(40px, 6vw, 64px) clamp(20px, 5vw, 40px)", position: "relative", background: "var(--oscuro)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 12 }}>Coaching expertise</p>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 12 }}>World Champion coach. Elite experience.</h2>
          <p style={{ fontSize: 15, color: "var(--texto-suave)", maxWidth: 600, margin: "0 auto 36px", lineHeight: 1.7 }}>25 years coaching elite basketball. Two World Championships, Olympic Games, EuroBasket. Working with world-class players and elite coaching staff.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {[
              { src: "/fotos/Con Scariolo.png", label: "Sergio Scariolo" },
              { src: "/fotos/Con Pau Gasol.png", label: "Pau Gasol" },
              { src: "/fotos/Con Ricky Rubio.png", label: "Ricky Rubio" },
              { src: "/fotos/Con Santi Aldama.png", label: "Santi Aldama" },
            ].map((foto, i) => (
              <div key={i}>
                <img src={foto.src} alt={foto.label} style={{ width: "100%", borderRadius: 8, border: "1px solid var(--borde)", display: "block", marginBottom: 8 }} />
                <p style={{ fontSize: 12, color: "var(--texto-suave)" }}>{foto.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* WHY CHOOSE US */}
      <section style={{ padding: "clamp(40px, 6vw, 64px) clamp(20px, 5vw, 40px)", position: "relative", background: "var(--oscuro)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 12 }}>Why choose us</p>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 20 }}>World Champion experience.</h2>
          <p style={{ fontSize: 15, color: "var(--texto-suave)", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.7 }}>Every camp is designed like EuroBasket preparation: clear objectives, elite opponents, world-class facilities. Your team gets the experience of someone who has won at the highest level.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, maxWidth: 600, margin: "0 auto" }}>
            {[
              { icon: "🥇", title: "2× World Champion" },
              { icon: "🥇", title: "2× Olympic Medalist" },
              { icon: "🏀", title: "EuroBasket Winner" },
              { icon: "🌍", title: "25 Years Coaching" },
            ].map((item, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 8, padding: "12px 16px", textAlign: "center" }}>
                <p style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--texto)" }}>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contacto" style={{ padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 40px)", position: "relative", borderTop: "1px solid var(--borde)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 12 }}>Get in touch</p>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 12 }}>Start your training camp.</h2>
          <p style={{ fontSize: 14, color: "var(--texto-suave)", marginBottom: 32, lineHeight: 1.6 }}>
            Fill the form and we'll send you a custom proposal within 48 hours.
          </p>
          <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 12, padding: "40px" }}>
            <form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12, color: "var(--texto-suave)", display: "block", marginBottom: 6, fontWeight: 600, letterSpacing: "0.05em" }}>Full name *</label>
                  <input required placeholder="John Smith" style={{ width: "100%", background: "var(--oscuro)", border: "1px solid var(--borde)", borderRadius: 6, padding: "10px 14px", color: "var(--texto)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--texto-suave)", display: "block", marginBottom: 6, fontWeight: 600, letterSpacing: "0.05em" }}>Email *</label>
                  <input required type="email" placeholder="you@email.com" style={{ width: "100%", background: "var(--oscuro)", border: "1px solid var(--borde)", borderRadius: 6, padding: "10px 14px", color: "var(--texto)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--texto-suave)", display: "block", marginBottom: 6, fontWeight: 600, letterSpacing: "0.05em" }}>College / Team *</label>
                  <input required placeholder="State University" style={{ width: "100%", background: "var(--oscuro)", border: "1px solid var(--borde)", borderRadius: 6, padding: "10px 14px", color: "var(--texto)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--texto-suave)", display: "block", marginBottom: 6, fontWeight: 600, letterSpacing: "0.05em" }}>State / Country *</label>
                  <input required placeholder="California, Texas, etc…" style={{ width: "100%", background: "var(--oscuro)", border: "1px solid var(--borde)", borderRadius: 6, padding: "10px 14px", color: "var(--texto)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--texto-suave)", display: "block", marginBottom: 6, fontWeight: 600, letterSpacing: "0.05em" }}>Number of players</label>
                  <select style={{ width: "100%", background: "var(--oscuro)", border: "1px solid var(--borde)", borderRadius: 6, padding: "10px 14px", color: "var(--texto)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}>
                    <option value="">Select…</option>
                    <option value="Fewer than 10">Fewer than 10</option>
                    <option value="10 – 15">10 – 15</option>
                    <option value="16 – 20">16 – 20</option>
                    <option value="More than 20">More than 20</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--texto-suave)", display: "block", marginBottom: 6, fontWeight: 600, letterSpacing: "0.05em" }}>Approximate dates</label>
                  <input placeholder="June 2025, 10 days" style={{ width: "100%", background: "var(--oscuro)", border: "1px solid var(--borde)", borderRadius: 6, padding: "10px 14px", color: "var(--texto)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, color: "var(--texto-suave)", display: "block", marginBottom: 6, fontWeight: 600, letterSpacing: "0.05em" }}>Tell us more about your project</label>
                <textarea placeholder="Team category, camp objectives, preferred venue, additional services needed…" rows={5} style={{ width: "100%", background: "var(--oscuro)", border: "1px solid var(--borde)", borderRadius: 6, padding: "10px 14px", color: "var(--texto)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box", resize: "vertical", lineHeight: 1.6 }}></textarea>
              </div>
              <div>
                <button type="submit" style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", background: "var(--oro)", color: "var(--negro)", padding: "16px 36px", borderRadius: 4, border: "none", cursor: "pointer", transition: "all 0.2s" }}>Send enquiry →</button>
              </div>
            </form>
          </div>
          <div style={{ marginTop: 40, display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:coach@jorgelorenzospain.com" style={{ fontSize: 14, color: "var(--texto-suave)", textDecoration: "none" }}>✉ coach@jorgelorenzospain.com</a>
            <a href="tel:+14155555555" style={{ fontSize: 14, color: "var(--texto-suave)", textDecoration: "none" }}>📞 +1 (415) 555-5555</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--borde)", padding: "clamp(24px, 5vw, 32px) clamp(20px, 5vw, 40px)", textAlign: "center" }}>
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
