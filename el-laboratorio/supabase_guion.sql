-- ─────────────────────────────────────────────────────────────
-- LABORATORIO GUIÓN · EJECUTAR EN SUPABASE SQL EDITOR
-- Tabla pública para los capítulos del programa de cada temporada
-- ─────────────────────────────────────────────────────────────

-- 1. Crear tabla
create table if not exists laboratorio_guion (
  id          serial primary key,
  temporada   text not null,        -- ej: '2026/27'
  numero      integer not null,     -- orden del capítulo
  titulo      text not null,        -- nombre del capítulo
  descripcion text,                 -- descripción breve (opcional)
  activo      boolean default true,
  created_at  timestamptz default now()
);

-- 2. RLS
alter table laboratorio_guion enable row level security;

create policy "Lectura pública del guión activo"
on laboratorio_guion
for select
using (activo = true);

-- 3. Capítulos placeholder para la temporada 2026/27
-- Edita los títulos y descripciones en el dashboard de Supabase cuando tengas el guión listo
insert into laboratorio_guion (temporada, numero, titulo, descripcion) values
  ('2026/27', 1,  'Capítulo 1',  'Próximamente'),
  ('2026/27', 2,  'Capítulo 2',  'Próximamente'),
  ('2026/27', 3,  'Capítulo 3',  'Próximamente'),
  ('2026/27', 4,  'Capítulo 4',  'Próximamente'),
  ('2026/27', 5,  'Capítulo 5',  'Próximamente'),
  ('2026/27', 6,  'Capítulo 6',  'Próximamente'),
  ('2026/27', 7,  'Capítulo 7',  'Próximamente'),
  ('2026/27', 8,  'Capítulo 8',  'Próximamente'),
  ('2026/27', 9,  'Capítulo 9',  'Próximamente'),
  ('2026/27', 10, 'Capítulo 10', 'Próximamente');
