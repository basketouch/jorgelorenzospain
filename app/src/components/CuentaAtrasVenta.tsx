"use client";

import { useState, useEffect } from "react";

export default function CuentaAtrasVenta({ fecha }: { fecha: string }) {
  const [restante, setRestante] = useState("");

  useEffect(() => {
    const cierre = new Date(fecha);
    function calc() {
      const diff = cierre.getTime() - Date.now();
      if (diff <= 0) { setRestante("Cerrado"); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setRestante(d > 0 ? `${d}d ${h}h ${m}m` : `${h}h ${m}m ${s}s`);
    }
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [fecha]);

  if (!restante) return null;

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 6,
      background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)",
      borderRadius: 6, padding: "5px 10px", marginTop: 12,
    }}>
      <span style={{ fontSize: 10 }}>⏱</span>
      <span style={{ fontSize: 11, color: "var(--oro)", fontWeight: 700, letterSpacing: "0.05em" }}>
        Cierra en {restante}
      </span>
    </div>
  );
}
