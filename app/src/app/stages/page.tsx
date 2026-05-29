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
            <p style={{ fontSize: 13, color: "var(--texto-suave)", textAlign: "center", marginTop: 12, fontStyle: "italic" }}>Philippine Ateneo University Training Camp 2025</p>
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
              { icon: "🏨", text: "Premium accommodation & all meals" },
              { icon: "🏀", text: "2–3 matches vs Spanish teams" },
              { icon: "📸", text: "Professional photographer & video" },
              { icon: "🎓", text: "Elite coaching & training clinics" },
              { icon: "🎭", text: "Cultural immersion & city tours" },
            ].map((item, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 10, padding: "20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ fontSize: 32, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 50, height: 50, background: "rgba(201,168,76,0.08)", borderRadius: 8 }}>{item.icon}</div>
                <span style={{ fontSize: 14, color: "var(--texto-suave)", lineHeight: 1.5, paddingTop: 8 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TWO VENUES */}
      <section id="instalaciones" style={{ padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 40px)", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 12 }}>Elite venues</p>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 24 }}>World-class facilities. Professional infrastructure.</h2>
          <p style={{ fontSize: 15, color: "var(--texto-suave)", maxWidth: 800, marginBottom: 48, lineHeight: 1.7 }}>These are our flagship locations, but not your only options. We customize every program to your team's needs and budget—different venues, accommodation levels, and training schedules available. Let us design the perfect fit for your college program.</p>
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
                  <p style={{ fontSize: 14, color: "var(--texto-suave)", lineHeight: 1.7 }}>2–3 matches vs Spanish professional and university teams. Elite-level competition designed to challenge your program. International tournament-style experience.</p>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <img src="/fotos/malaga/498523588-AVL13gvl05Hpx9Wp.avif" alt="Higuerón Training Center court" style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid var(--borde)", display: "block", aspectRatio: "1/1", objectFit: "cover" }} />
                <img src="/fotos/malaga/7.2_1-1200x800-AMqlagB7REi8BDqO.avif" alt="Higuerón facility" style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid var(--borde)", display: "block", aspectRatio: "1/1", objectFit: "cover" }} />
                <img src="/fotos/malaga/theembassytc-imagen_030-m7V58X7reXT2N2pY.avif" alt="Higuerón accommodation" style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid var(--borde)", display: "block", aspectRatio: "1/1", objectFit: "cover" }} />
                <img src="/fotos/malaga/theembassytc-imagen_025-Yleq2KaPNQi0kj6j.avif" alt="Higuerón amenities" style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid var(--borde)", display: "block", aspectRatio: "1/1", objectFit: "cover" }} />
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
                  <p style={{ fontSize: 14, color: "var(--texto-suave)", lineHeight: 1.7 }}>Ideo Residence Madrid—modern, purpose-built facility for student-athletes. Individual rooms with en-suite bathrooms. 400+ capacity with dedicated dining, gym, cinema, and recreational areas. Walking distance to central Madrid attractions.</p>
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
                <img src="/fotos/madrid/ideo/ideo_2.jpg" alt="Colegio Ideo facility 2" style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid var(--borde)", display: "block", aspectRatio: "1/1", objectFit: "cover" }} />
                <img src="/fotos/madrid/ideo/Pabellon.jpg" alt="Colegio Ideo facility 3" style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid var(--borde)", display: "block", aspectRatio: "1/1", objectFit: "cover" }} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MADRID CULTURAL EXPERIENCES */}
      <section style={{ padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 40px)", position: "relative", background: "var(--oscuro)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 12 }}>Madrid experience</p>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 12 }}>Real Madrid & Cultural Immersion</h2>
          <p style={{ fontSize: 15, color: "var(--texto-suave)", maxWidth: 800, marginBottom: 36, lineHeight: 1.7 }}>Beyond the court—experience the heart of Spanish basketball and culture. Visit the legendary Santiago Bernabéu, explore world-class museums, historic landmarks, and world-class dining that make Madrid unforgettable.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--oro)", marginBottom: 16 }}>Real Madrid Stadium</h3>
              <p style={{ fontSize: 14, color: "var(--texto-suave)", lineHeight: 1.7, marginBottom: 16 }}>Tour the iconic Santiago Bernabéu stadium—home to one of the world's elite basketball programs. Experience the atmosphere where professional teams compete at the highest level.</p>
              <img src="/fotos/madrid/bernabeu.webp" alt="Santiago Bernabéu stadium" style={{ width: "100%", height: 250, borderRadius: 12, border: "1px solid var(--borde)", marginBottom: 12, objectFit: "cover", display: "block" }} />
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--oro)", marginBottom: 16 }}>Madrid City Tour</h3>
              <p style={{ fontSize: 14, color: "var(--texto-suave)", lineHeight: 1.7, marginBottom: 16 }}>Discover iconic landmarks: Plaza Mayor, Gran Vía, Palacio Real, Templo de Debot, and Preciados shopping district. Full-day guided tour included with optional activities.</p>
              <img src="/fotos/madrid/madrid.jpg" alt="Madrid city landmarks" style={{ width: "100%", height: 250, borderRadius: 12, border: "1px solid var(--borde)", marginBottom: 12, objectFit: "cover", display: "block" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ELITE COACHES EXPERIENCE */}
      <section id="achievements" style={{ padding: "clamp(40px, 6vw, 64px) clamp(20px, 5vw, 40px)", position: "relative" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 12 }}>Coaching expertise</p>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 12 }}>World Champion coaches. Elite experience.</h2>
          <p style={{ fontSize: 15, color: "var(--texto-suave)", maxWidth: 600, margin: "0 auto 12px", lineHeight: 1.7 }}>Our coaching team combines world-class expertise: Jorge Lorenzo with 25 years of elite basketball coaching, Two World Championships, Olympic Games, and EuroBasket experience working with world-class players.</p>
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

      {/* LUIS GUIL - ASSISTANT COACH */}
      <section style={{ padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 40px)", position: "relative", background: "var(--oscuro)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <img src="/fotos/colaboradores/Luis_Guil.avif" alt="Luis Guil" style={{ width: "100%", borderRadius: 12, border: "2px solid var(--oro)", display: "block" }} />
            </div>
            <div>
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 20 }}>Luis Guil</h2>
              <p style={{ fontSize: 15, fontWeight: 600, color: "var(--texto-suave)", marginBottom: 8 }}>Assistant Coach · Real Madrid</p>
              <p style={{ fontSize: 14, color: "var(--oro)", marginBottom: 24, lineHeight: 1.6 }}>Co-architect of our coaching program, working alongside Jorge Lorenzo to bring world-class basketball development to your team.</p>

              <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--oro)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>The Connection</h3>
                <p style={{ fontSize: 14, color: "var(--texto-suave)", lineHeight: 1.7 }}>Luis works directly with Jorge Lorenzo to ensure every aspect of your camp—from coaching philosophy to logistics to player development—is seamlessly executed. Together, they deliver the complete world-class basketball experience your team deserves.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* WHY CHOOSE US */}
      <section style={{ padding: "clamp(60px, 10vw, 96px) clamp(20px, 5vw, 40px)", position: "relative", background: "var(--oscuro)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 16 }}>Why choose us</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 24 }}>World Champion experience.</h2>
            <p style={{ fontSize: 16, color: "var(--texto-suave)", maxWidth: 700, margin: "0 auto 48px", lineHeight: 1.8 }}>Every camp is designed like EuroBasket preparation: clear objectives, elite opponents, world-class facilities. Your team gets the experience of coaches who have won at the highest level.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 64 }}>
            {[
              { src: "/fotos/entrenadores/Seleccion.jpg", alt: "Spain national team coaching" },
              { src: "/fotos/entrenadores/Palencia.jpg", alt: "Professional coaching staff" },
              { src: "/fotos/entrenadores/Eurobasket.jpg", alt: "EuroBasket championship" },
            ].map((item, i) => (
              <div key={i} style={{ borderRadius: 12, overflow: "hidden", border: "2px solid var(--oro)" }}>
                <img src={item.src} alt={item.alt} style={{ width: "100%", height: "auto", display: "block", aspectRatio: "4/3", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {[
              { icon: "🥇", title: "World Champion", sub: "Beijing 2019" },
              { icon: "🥇", title: "European Champion", sub: "Berlin 2022" },
              { icon: "🏀", title: "Olympic Games", sub: "Tokyo & Paris" },
              { icon: "🌍", title: "25 Years", sub: "Elite Coaching" },
            ].map((item, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 12, padding: "32px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <p style={{ fontSize: 40, margin: 0, lineHeight: 1 }}>{item.icon}</p>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "var(--texto)", margin: "0 0 4px" }}>{item.title}</p>
                  <p style={{ fontSize: 13, color: "var(--texto-suave)", margin: 0 }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUSIONS & EXCLUSIONS */}
      <section style={{ padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 40px)", position: "relative", background: "var(--oscuro)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--blanco)", lineHeight: 1.15, marginBottom: 40 }}>What's Included & What's Not</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--oro)", marginBottom: 20 }}>Included in Your Package</h3>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {[
                  "World-class training facilities",
                  "2–3 matches vs Spanish teams",
                  "Premium accommodation (Ideo Residence or Hilton Higuerón)",
                  "All meals during your stay",
                  "Airport transfers & daily transportation",
                  "Insurance & 24/7 staff support",
                ].map((item, i) => (
                  <li key={i} style={{ paddingBottom: 12, color: "var(--texto-suave)", fontSize: 14, lineHeight: 1.6 }}>✓ {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--oro)", marginBottom: 20 }}>Not Included</h3>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {[
                  "Flight tickets (we recommend major carriers)",
                  "Visa fees (check EU entry requirements)",
                  "Travel insurance (optional but recommended)",
                  "Personal spending money",
                  "Equipment rental (bring your own gear)",
                ].map((item, i) => (
                  <li key={i} style={{ paddingBottom: 12, color: "var(--texto-suave)", fontSize: 14, lineHeight: 1.6 }}>— {item}</li>
                ))}
              </ul>
              <p style={{ fontSize: 13, color: "var(--texto-suave)", marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--borde)", fontStyle: "italic" }}>Custom packages available. Contact us to discuss your specific needs.</p>
            </div>
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
