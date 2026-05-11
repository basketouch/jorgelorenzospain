-- ─────────────────────────────────────────────────────────────
-- LABORATORIO TEMAS · EJECUTAR EN SUPABASE SQL EDITOR
-- Temas del Laboratorio por temporada y área (técnico / gestión)
-- Edita desde el dashboard de Supabase cada nueva temporada
-- ─────────────────────────────────────────────────────────────

-- 1. Crear tabla
create table if not exists laboratorio_temas (
  id        serial primary key,
  temporada text not null,     -- ej: '2025/26'
  area      text not null,     -- 'tecnico' o 'gestion'
  orden     integer not null,
  tema      text not null,
  activo    boolean default true
);

-- 2. RLS
alter table laboratorio_temas enable row level security;

create policy "Lectura pública de temas activos"
on laboratorio_temas
for select
using (activo = true);

-- 3. Contenido temporada 2025/26
insert into laboratorio_temas (temporada, area, orden, tema) values
  ('2025/26', 'tecnico', 1, 'Estilos de juego actuales y detalles del alto nivel'),
  ('2025/26', 'tecnico', 2, 'Construcción defensiva: 1×1, ayudas y ajustes colectivos'),
  ('2025/26', 'tecnico', 3, 'Técnica individual ofensiva aplicada al juego real'),
  ('2025/26', 'tecnico', 4, 'Defensa del bloqueo directo y toma de decisiones'),
  ('2025/26', 'tecnico', 5, 'Spacing y juego con 4 abiertos'),
  ('2025/26', 'tecnico', 6, 'Sistemas de ataque para diferentes perfiles'),
  ('2025/26', 'tecnico', 7, 'Planificación semanal y desarrollo de entrenamientos'),
  ('2025/26', 'tecnico', 8, 'Scouting y preparación de partido'),
  ('2025/26', 'gestion', 1, 'Gestión del vestuario y reparto de roles'),
  ('2025/26', 'gestion', 2, 'Uso de tecnología, IA y estadísticas aplicadas'),
  ('2025/26', 'gestion', 3, 'Construcción de mentalidad defensiva'),
  ('2025/26', 'gestion', 4, 'Creatividad táctica y lectura del juego'),
  ('2025/26', 'gestion', 5, 'Desarrollo de especialistas'),
  ('2025/26', 'gestion', 6, 'Liderazgo del entrenador en el día a día'),
  ('2025/26', 'gestion', 7, 'Gestión de la presión y cierre de temporada');
