"use client";

import { useState, useRef } from "react";
import CalendarioEnvios from "./CalendarioEnvios";
import CampanaFormClient from "./CampanaFormClient";
import CampanaEditor from "./CampanaEditor";

interface Campana extends Record<string, unknown> {
  id: string;
  enviar_en: string;
  tipo: string;
  asunto: string;
  activa: boolean;
  enviada: boolean;
  modulo_id: number;
  contenido: string;
  lista_brevo_id: number;
  enviada_at?: string;
  modulos: { titulo: string; orden: number; portada_url?: string } | null;
}

interface Modulo {
  id: number;
  titulo: string;
  orden: number;
  fecha_apertura?: string | null;
  fecha_cierre_venta?: string | null;
  cursos: { titulo: string } | { titulo: string }[] | null;
}

const tiposLabel: Record<string, { label: string; color: string }> = {
  apertura:     { label: "📢 Apertura",        color: "#4a9" },
  recordatorio: { label: "⏳ Recordatorio 3d", color: "var(--oro)" },
  cierre:       { label: "🔒 Último día",       color: "#e06" },
};

export default function MarketingClient({
  campanas,
  modulos,
}: {
  campanas: Campana[];
  modulos: Modulo[];
}) {
  const [showGenerar, setShowGenerar] = useState(false);
  const [showProximos, setShowProximos] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);

  const pendientes = campanas.filter(c => !c.enviada);
  const enviadas = campanas.filter(c => c.enviada);

  const selectedCampanas = selectedIds
    .map(id => campanas.find(c => c.id === id))
    .filter(Boolean) as Campana[];

  function handleSelectDia(key: string, ids: string[]) {
    if (selectedKey === key) {
      setSelectedKey(null);
      setSelectedIds([]);
    } else {
      setSelectedKey(key);
      setSelectedIds(ids);
      setTimeout(() => editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    }
  }

  const selectedDateLabel = selectedKey
    ? new Date(selectedKey + "T12:00:00").toLocaleDateString("es-ES", {
        weekday: "long", day: "numeric", month: "long",
      })
    : null;

  return (
    <div>
      {/* ── Header ── */}
      <div style={{ marginBottom: 28, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Marketing</h1>
          <p style={{ fontSize: 13, color: "var(--texto-suave)" }}>Emails automáticos de apertura y cierre de módulos</p>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => { setShowProximos(p => !p); setShowGenerar(false); }}
            style={{
              fontSize: 12, padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit",
              background: showProximos ? "rgba(201,168,76,0.15)" : "none",
              border: `1px solid ${showProximos ? "var(--oro)" : "var(--borde)"}`,
              color: showProximos ? "var(--oro)" : "var(--texto-suave)",
              fontWeight: showProximos ? 700 : 400,
              transition: "all 0.15s",
            }}
          >
            📋 Próximos envíos {pendientes.length > 0 && `(${pendientes.length})`}
          </button>

          <button
            onClick={() => { setShowGenerar(g => !g); setShowProximos(false); }}
            style={{
              fontSize: 12, padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit",
              background: showGenerar ? "var(--oro)" : "none",
              border: `1px solid ${showGenerar ? "var(--oro)" : "var(--borde)"}`,
              color: showGenerar ? "#0a0a0a" : "var(--texto-suave)",
              fontWeight: showGenerar ? 700 : 400,
              transition: "all 0.15s",
            }}
          >
            ➕ Generar emails
          </button>
        </div>
      </div>

      {/* ── Panel: Generar ── */}
      {showGenerar && (
        <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Generar emails para un módulo</p>
          <CampanaEditor modulos={modulos} />
        </div>
      )}

      {/* ── Panel: Próximos envíos ── */}
      {showProximos && (
        <div style={{ background: "var(--card)", border: "1px solid var(--borde)", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          {pendientes.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--texto-suave)" }}>No hay campañas pendientes.</p>
          ) : (
            <>
              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Próximos envíos ({pendientes.length})</p>
              <div style={{ position: "relative", paddingLeft: 24 }}>
                <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, background: "var(--borde)" }} />
                {pendientes.map(c => {
                  const tipo = tiposLabel[c.tipo] ?? { label: c.tipo, color: "var(--texto-suave)" };
                  const fecha = new Date(c.enviar_en);
                  const fechaStr = fecha.toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" });
                  const horaStr = fecha.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
                  const pasada = fecha < new Date();
                  return (
                    <div key={c.id} style={{ display: "flex", gap: 16, marginBottom: 12, alignItems: "flex-start", opacity: pasada && !c.activa ? 0.5 : 1 }}>
                      <div style={{ width: 14, height: 14, borderRadius: "50%", background: c.activa ? tipo.color : "var(--borde)", border: `2px solid ${c.activa ? tipo.color : "var(--borde)"}`, flexShrink: 0, marginTop: 3, zIndex: 1 }} />
                      <div style={{ flex: 1, background: "var(--negro)", border: `1px solid ${c.activa ? tipo.color + "55" : "var(--borde)"}`, borderRadius: 8, padding: "10px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: tipo.color }}>{tipo.label}</span>
                          <span style={{ fontSize: 11, color: "var(--texto-suave)" }}>·</span>
                          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--texto)" }}>{fechaStr} · {horaStr}</span>
                          {c.activa
                            ? <span style={{ fontSize: 10, fontWeight: 700, color: tipo.color, border: `1px solid ${tipo.color}`, padding: "1px 6px", borderRadius: 4 }}>Activa</span>
                            : <span style={{ fontSize: 10, color: "var(--texto-suave)", border: "1px solid var(--borde)", padding: "1px 6px", borderRadius: 4 }}>Borrador</span>
                          }
                        </div>
                        <p style={{ fontSize: 11, color: "var(--texto-suave)", marginBottom: 2 }}>Cap. {c.modulos?.orden} — {c.modulos?.titulo}</p>
                        <p style={{ fontSize: 13, color: "var(--texto)" }}>{c.asunto}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Calendario (siempre visible) ── */}
      {pendientes.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--texto-suave)", marginBottom: 16 }}>
            Calendario
          </p>
          <CalendarioEnvios
            campanas={pendientes}
            selectedKey={selectedKey}
            onSelectDia={handleSelectDia}
          />
          {!selectedKey && (
            <p style={{ fontSize: 11, color: "var(--texto-suave)", marginTop: 10 }}>
              Haz clic en un día con puntos para editar las campañas
            </p>
          )}
        </div>
      )}

      {/* ── Editor de día seleccionado ── */}
      <div ref={editorRef}>
        {selectedKey && selectedCampanas.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--oro)", textTransform: "capitalize" }}>
                {selectedDateLabel}
              </p>
              <button
                onClick={() => { setSelectedKey(null); setSelectedIds([]); }}
                style={{ background: "none", border: "1px solid var(--borde)", borderRadius: 6, cursor: "pointer", color: "var(--texto-suave)", fontSize: 11, padding: "2px 10px", fontFamily: "inherit" }}
              >
                ✕ cerrar
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {selectedCampanas.map(c => {
                const tipo = tiposLabel[c.tipo] ?? { label: c.tipo, color: "var(--texto-suave)" };
                const horaStr = new Date(c.enviar_en).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
                return (
                  <div key={c.id} style={{
                    background: "var(--card)",
                    border: `1px solid ${c.activa ? tipo.color + "66" : "var(--borde)"}`,
                    borderRadius: 10, padding: 20,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: tipo.color }}>{tipo.label}</span>
                      <span style={{ fontSize: 11, color: "var(--texto-suave)" }}>· {horaStr}</span>
                      <span style={{ fontSize: 11, color: "var(--texto-suave)" }}>· Cap. {c.modulos?.orden} — {c.modulos?.titulo}</span>
                      {c.activa
                        ? <span style={{ fontSize: 10, fontWeight: 700, color: tipo.color, border: `1px solid ${tipo.color}`, padding: "1px 8px", borderRadius: 4 }}>Activa</span>
                        : <span style={{ fontSize: 10, color: "var(--texto-suave)", border: "1px solid var(--borde)", padding: "1px 8px", borderRadius: 4 }}>Borrador</span>
                      }
                    </div>
                    <CampanaFormClient campana={c} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Empty state ── */}
      {pendientes.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--texto-suave)" }}>
          <p style={{ fontSize: 32, marginBottom: 12 }}>📭</p>
          <p style={{ marginBottom: 16 }}>No hay campañas programadas aún.</p>
          <button
            onClick={() => setShowGenerar(true)}
            style={{ fontSize: 13, color: "var(--oro)", background: "none", border: "1px solid var(--oro)", borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontFamily: "inherit" }}
          >
            ➕ Generar emails
          </button>
        </div>
      )}

      {/* ── Historial enviadas ── */}
      {enviadas.length > 0 && (
        <div style={{ marginTop: 40, borderTop: "1px solid var(--borde)", paddingTop: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--texto-suave)", marginBottom: 16 }}>
            Historial enviadas ({enviadas.length})
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {enviadas.map(c => {
              const tipo = tiposLabel[c.tipo] ?? { label: c.tipo, color: "var(--texto-suave)" };
              const fechaStr = new Date(c.enviada_at ?? c.enviar_en).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
              return (
                <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: "var(--card)", borderRadius: 8, opacity: 0.7 }}>
                  <span style={{ fontSize: 11, color: tipo.color, fontWeight: 700, minWidth: 120 }}>{tipo.label}</span>
                  <span style={{ fontSize: 12, color: "var(--texto)", flex: 1 }}>{c.asunto}</span>
                  <span style={{ fontSize: 11, color: "var(--texto-suave)" }}>Cap. {c.modulos?.orden}</span>
                  <span style={{ fontSize: 11, color: "#4a9" }}>✓ {fechaStr}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
