'use client';

import { useState } from 'react';

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { src: "/fotos/carrusel/Filipinos 1.avif", alt: "Ateneo Filipinas Training Camp", caption: "Ateneo Filipinas Training Camp 2025 — Madrid | Elite University Basketball" },
    { src: "/fotos/carrusel/Filipinos 2.avif", alt: "San Beda Red Lions Training Camp", caption: "San Beda Red Lions Training Camp 2025 — Málaga | 24× NCAA Championship Legacy" },
    { src: "/fotos/carrusel/Filipinos 1.1.avif", alt: "Ateneo Team Leadership", caption: "Ateneo Elite Coaching & Leadership — Madrid 2025 | 12× UAAP National Champions" },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "relative", width: "100%", overflow: "hidden", borderRadius: 12, border: "2px solid var(--oro)" }}>
        <div style={{ position: "relative", width: "100%", paddingBottom: "75%" }}>
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.src}
              alt={slide.alt}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: index === currentSlide ? "block" : "none",
                transition: "opacity 0.5s ease-in-out",
                opacity: index === currentSlide ? 1 : 0,
              }}
            />
          ))}
        </div>
        <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10 }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                border: "none",
                background: index === currentSlide ? "var(--oro)" : "rgba(255,255,255,0.5)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            />
          ))}
        </div>
      </div>
      <p style={{ fontSize: 13, color: "var(--texto-suave)", textAlign: "center", marginTop: 12, fontStyle: "italic" }}>{slides[currentSlide].caption}</p>
    </div>
  );
}
