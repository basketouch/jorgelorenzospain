"use client";

import { useState } from "react";

interface Props {
  curso: {
    id: number;
    slug: string;
    precio: number;
    lemon_variant_id?: string | null;
    activo: boolean;
  };
}

export default function CursoEditor({ curso }: Props) {
  const [variantId, setVariantId] = useState(curso.lemon_variant_id ?? "");
  const [precio, setPrecio] = useState(String(curso.precio / 100));
  const [guardando, setGuardando] = useState(false);
  const [ok, setOk] = useState(false);

  const checkoutUrl = variantId
    ? `https://jorgelorenzo.lemonsqueezy.com/checkout/buy/${variantId}?checkout[custom][slug]=${curso.slug}`
    : null;

  async function guardar() {
    setGuardando(true);
    setOk(false);
    await fetch(`/api/admin/curso/${curso.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lemon_variant_id: variantId || null,
        precio: Math.round(parseFloat(precio) * 100),
      }),
    });
    setGuardando(false);
    setOk(true);
    setTimeout(() => setOk(false), 2000);
  }

  return (
    <div style={{
      background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.2)",
      borderRadius: 8, padding: 16, marginBottom: 20,
    }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--oro)", marginBottom: 12 }}>
        💳 Lemon Squeezy
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div>
          <label style={{ fontSize: 11, color: "var(--texto-suave)", display: "block", marginBottom: 4 }}>
            Variant ID
          </label>
          <input
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
            placeholder="ej. 123456"
            style={{
              width: "100%", background: "var(--negro)", border: "1px solid var(--borde)",
              borderRadius: 4, padding: "7px 10px", color: "var(--blanco)",
              fontSize: 13, fontFamily: "monospace", boxSizing: "border-box",
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: 11, color: "var(--texto-suave)", display: "block", marginBottom: 4 }}>
            Precio (€)
          </label>
          <input
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            type="number"
            style={{
              width: "100%", background: "var(--negro)", border: "1px solid var(--borde)",
              borderRadius: 4, padding: "7px 10px", color: "var(--blanco)",
              fontSize: 13, boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {checkoutUrl && (
        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 11, color: "var(--texto-suave)", marginBottom: 4 }}>URL de checkout generada</p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <code style={{
              fontSize: 11, color: "var(--oro)", background: "var(--negro)",
              padding: "6px 10px", borderRadius: 4, border: "1px solid var(--borde)",
              flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {checkoutUrl}
            </code>
            <button
              onClick={() => navigator.clipboard.writeText(checkoutUrl)}
              style={{
                background: "var(--negro)", border: "1px solid var(--borde)",
                borderRadius: 4, padding: "6px 10px", color: "var(--texto-suave)",
                cursor: "pointer", fontSize: 12, flexShrink: 0,
              }}
            >
              Copiar
            </button>
          </div>
        </div>
      )}

      <button
        onClick={guardar}
        disabled={guardando}
        style={{
          background: ok ? "rgba(74,170,100,0.15)" : "var(--oro)",
          color: ok ? "#4aa" : "var(--negro)",
          border: ok ? "1px solid #4aa" : "none",
          borderRadius: 4, padding: "7px 16px",
          fontSize: 13, fontWeight: 700, cursor: "pointer",
        }}
      >
        {guardando ? "Guardando…" : ok ? "✓ Guardado" : "Guardar"}
      </button>
    </div>
  );
}
