-- ─────────────────────────────────────────────────────────────
-- AÑADIR LECCIÓN · Capítulo 8 · Sesión Zoom
-- EJECUTAR EN SUPABASE SQL EDITOR
-- ─────────────────────────────────────────────────────────────

-- PASO 1: Comprueba el ID del Capítulo 8
select id, titulo from laboratorio_capitulos order by id;

-- PASO 2: Inserta la lección (Capítulo 8 = id 1)
insert into laboratorio_lecciones (capitulo_id, titulo, vimeo_id, orden, es_draft)
values (
  1,
  'Sesión Zoom — Scouting y preparación de partido',
  '1193744291',
  (select coalesce(max(orden), 0) + 1 from laboratorio_lecciones where capitulo_id = 1),
  false
);
