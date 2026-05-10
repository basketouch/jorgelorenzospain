-- ─────────────────────────────────────────────
-- LABORATORIO DEL ENTRENADOR · SUPABASE SETUP
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ─────────────────────────────────────────────

-- Extensión para generar tokens aleatorios
create extension if not exists "pgcrypto";


-- ── TABLA: USUARIOS CON ACCESO TEMPORAL ──────
create table if not exists laboratorio_usuarios (
  id          uuid    default gen_random_uuid() primary key,
  email       text    not null unique,
  nombre      text    not null,
  token       text    unique not null,
  expira_el   date    not null default '2026-07-31',
  activo      boolean default true,
  created_at  timestamptz default now()
);


-- ── TABLA: CAPÍTULOS ─────────────────────────
create table if not exists laboratorio_capitulos (
  id      serial  primary key,
  titulo  text    not null,
  orden   integer not null
);


-- ── TABLA: LECCIONES ─────────────────────────
create table if not exists laboratorio_lecciones (
  id           serial  primary key,
  capitulo_id  integer references laboratorio_capitulos(id) on delete cascade,
  titulo       text    not null,
  vimeo_id     text    default '',
  orden        integer not null,
  es_draft     boolean default false
);


-- ── ROW LEVEL SECURITY ───────────────────────
alter table laboratorio_usuarios   enable row level security;
alter table laboratorio_capitulos  enable row level security;
alter table laboratorio_lecciones  enable row level security;

-- Anon puede leer usuarios (la lógica de token se valida en el cliente)
create policy "anon_read_usuarios" on laboratorio_usuarios
  for select using (true);

-- Anon puede leer capítulos
create policy "anon_read_capitulos" on laboratorio_capitulos
  for select using (true);

-- Anon solo ve lecciones que NO son draft
create policy "anon_read_lecciones" on laboratorio_lecciones
  for select using (es_draft = false);


-- ── CAPÍTULOS ────────────────────────────────
insert into laboratorio_capitulos (titulo, orden) values
  ('Capítulo 8: Scouting y preparación de partido', 1),
  ('Capítulo 9: Preguntas reales de entrenadores',  2);


-- ── LECCIONES · CAPÍTULO 8 ───────────────────
-- Sustituir VIMEO_ID_X por el ID real de cada vídeo en Vimeo
-- Para ocultar una lección: es_draft = true
insert into laboratorio_lecciones (capitulo_id, titulo, vimeo_id, orden, es_draft) values
  (1, '¿Qué vamos a ver?',                     'VIMEO_ID_1', 1, false),
  (1, 'Scouting Colectivo',                    'VIMEO_ID_2', 2, false),
  (1, 'Scouting Individual y Plan de Partido', 'VIMEO_ID_3', 3, false),
  (1, 'Puntos Clave del Scouting',             'VIMEO_ID_4', 4, false),
  (1, 'Noticias importantes',                  'VIMEO_ID_5', 5, false),
  (1, 'Sesión Zoom',                           'VIMEO_ID_6', 6, false);


-- ── LECCIONES · CAPÍTULO 9 ───────────────────
-- Todas en draft hasta que estén listas → cambiar es_draft a false
insert into laboratorio_lecciones (capitulo_id, titulo, vimeo_id, orden, es_draft) values
  (2, 'Introducción',  'VIMEO_ID_7', 1, true),
  (2, 'Lección 2',     'VIMEO_ID_8', 2, true),
  (2, 'Lección 3',     'VIMEO_ID_9', 3, true);


-- ── USUARIOS (sustituir con datos reales) ────
-- Generar token: select encode(gen_random_bytes(16), 'hex');
-- Ejecutar esa query 12 veces para obtener 12 tokens únicos
-- Luego rellenar esta tabla con email, nombre y token generado

insert into laboratorio_usuarios (email, nombre, token, expira_el) values
  ('email1@ejemplo.com', 'Nombre 1',  'TOKEN_1',  '2026-07-31'),
  ('email2@ejemplo.com', 'Nombre 2',  'TOKEN_2',  '2026-07-31'),
  ('email3@ejemplo.com', 'Nombre 3',  'TOKEN_3',  '2026-07-31'),
  ('email4@ejemplo.com', 'Nombre 4',  'TOKEN_4',  '2026-07-31'),
  ('email5@ejemplo.com', 'Nombre 5',  'TOKEN_5',  '2026-07-31'),
  ('email6@ejemplo.com', 'Nombre 6',  'TOKEN_6',  '2026-07-31'),
  ('email7@ejemplo.com', 'Nombre 7',  'TOKEN_7',  '2026-07-31'),
  ('email8@ejemplo.com', 'Nombre 8',  'TOKEN_8',  '2026-07-31'),
  ('email9@ejemplo.com', 'Nombre 9',  'TOKEN_9',  '2026-07-31'),
  ('email10@ejemplo.com','Nombre 10', 'TOKEN_10', '2026-07-31'),
  ('email11@ejemplo.com','Nombre 11', 'TOKEN_11', '2026-07-31'),
  ('email12@ejemplo.com','Nombre 12', 'TOKEN_12', '2026-07-31');
