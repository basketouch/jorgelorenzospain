-- ─────────────────────────────────────────────────────────────
-- LABORATORIO PROGRAMA · EJECUTAR EN SUPABASE SQL EDITOR
-- Tabla única para capítulos de todas las temporadas
-- ─────────────────────────────────────────────────────────────
-- Lógica:
--   en_curso = true  → temporada activa → aparece en la landing (archivo)
--   en_curso = false → temporada futura o pasada → aparece en /el-laboratorio
--   activo = false   → oculto en todas partes (draft)
-- ─────────────────────────────────────────────────────────────

-- 1. Eliminar tabla provisional si existe
drop table if exists laboratorio_guion;

-- 2. Crear tabla unificada
create table if not exists laboratorio_programa (
  id          serial primary key,
  temporada   text not null,         -- ej: '2025/26', '2026/27'
  numero      integer not null,      -- orden del capítulo
  titulo      text not null,         -- nombre del capítulo
  descripcion text,                  -- descripción breve (opcional)
  en_curso    boolean default false, -- true = temporada activa en este momento
  activo      boolean default true,  -- false = draft, no visible
  created_at  timestamptz default now()
);

-- 3. RLS
alter table laboratorio_programa enable row level security;

create policy "Lectura pública del programa activo"
on laboratorio_programa
for select
using (activo = true);

-- 4. Temporada 2025/26 — en curso (aparece en la landing como archivo)
insert into laboratorio_programa (temporada, numero, titulo, descripcion, en_curso) values
  ('2025/26', 1,  'Capítulo 1',  'Próximamente', true),
  ('2025/26', 2,  'Capítulo 2',  'Próximamente', true),
  ('2025/26', 3,  'Capítulo 3',  'Próximamente', true),
  ('2025/26', 4,  'Capítulo 4',  'Próximamente', true),
  ('2025/26', 5,  'Capítulo 5',  'Próximamente', true),
  ('2025/26', 6,  'Capítulo 6',  'Próximamente', true),
  ('2025/26', 7,  'Capítulo 7',  'Próximamente', true),
  ('2025/26', 8,  'Capítulo 8',  'Próximamente', true),
  ('2025/26', 9,  'Capítulo 9',  'Próximamente', true),
  ('2025/26', 10, 'Capítulo 10', 'Próximamente', true);

-- 5. Temporada 2026/27 — próxima (aparece en /el-laboratorio)
-- Descomenta y rellena cuando tengas el guión listo:
-- insert into laboratorio_programa (temporada, numero, titulo, descripcion, en_curso) values
--   ('2026/27', 1, 'Capítulo 1', '', false),
--   ('2026/27', 2, 'Capítulo 2', '', false),
--   ...
