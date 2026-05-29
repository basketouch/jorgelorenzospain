'use client';

import { useState } from 'react';

export default function PhotoGallery({ title, photos }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => setCurrentIndex((prev) => (prev + 1) % photos.length);
  const prevPhoto = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          marginTop: 20,
          padding: "12px 24px",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          background: "transparent",
          color: "var(--oro)",
          border: "1px solid var(--oro)",
          borderRadius: 4,
          cursor: "pointer",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "var(--oro)";
          e.target.style.color = "var(--negro)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent";
          e.target.style.color = "var(--oro)";
        }}
      >
        Ver más fotos ({photos.length}) →
      </button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                top: -40,
                right: 0,
                background: "none",
                border: "none",
                color: "var(--oro)",
                fontSize: 32,
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ✕
            </button>

            {/* Image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={photos[currentIndex].src}
                alt={photos[currentIndex].alt}
                style={{
                  maxWidth: "100%",
                  maxHeight: "70vh",
                  borderRadius: 12,
                  border: "2px solid var(--oro)",
                  objectFit: "contain",
                }}
              />

              {/* Navigation arrows */}
              <button
                onClick={prevPhoto}
                style={{
                  position: "absolute",
                  left: -60,
                  background: "none",
                  border: "none",
                  color: "var(--oro)",
                  fontSize: 40,
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.2)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                ←
              </button>

              <button
                onClick={nextPhoto}
                style={{
                  position: "absolute",
                  right: -60,
                  background: "none",
                  border: "none",
                  color: "var(--oro)",
                  fontSize: 40,
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.2)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                →
              </button>
            </div>

            {/* Counter and description */}
            <div style={{ textAlign: "center", color: "var(--texto-suave)" }}>
              <p style={{ margin: 0, fontSize: 14 }}>
                {currentIndex + 1} / {photos.length}
              </p>
              {photos[currentIndex].alt && (
                <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--texto-suave)" }}>
                  {photos[currentIndex].alt}
                </p>
              )}
            </div>

            {/* Dots indicator */}
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    border: "none",
                    background: index === currentIndex ? "var(--oro)" : "rgba(201,168,76,0.3)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
