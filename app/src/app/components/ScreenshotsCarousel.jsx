'use client';

import { useState } from 'react';

export default function ScreenshotsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const screenshots = [
    { src: "/fotos/DrawSports_Screenshot1.png", alt: "DrawSports iPad app - Video analysis interface" },
    { src: "/fotos/DrawSports_Screenshot2.png", alt: "DrawSports iPad app - Tactical annotation tools" },
    { src: "/fotos/DrawSports_Screenshot3.png", alt: "DrawSports iPad app - Timeline and playback controls" },
  ];

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "relative", overflow: "hidden", borderRadius: 12, border: "1px solid var(--borde)" }}>
        {screenshots.map((screenshot, index) => (
          <div key={index} style={{ display: index === currentSlide ? "block" : "none" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={screenshot.src} alt={screenshot.alt} style={{ width: "100%", borderRadius: 12, display: "block" }} />
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
        {screenshots.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              border: "none",
              background: index === currentSlide ? "var(--oro)" : "rgba(255,255,255,0.3)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
