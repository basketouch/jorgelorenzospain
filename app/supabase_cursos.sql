-- ─────────────────────────────────────────────────────────────
-- CURSOS · TABLAS · EJECUTAR EN SUPABASE SQL EDITOR
-- ─────────────────────────────────────────────────────────────

-- 1. Cursos
create table if not exists cursos (
  id          serial primary key,
  slug        text unique not null,
  titulo      text not null,
  descripcion text,
  precio      integer not null,        -- en céntimos (ej. 9700 = 97€)
  portada_url text,
  activo      boolean default false,
  created_at  timestamptz default now()
);

-- 2. Módulos
create table if not exists modulos (
  id        serial primary key,
  curso_id  integer references cursos(id) on delete cascade,
  titulo    text not null,
  orden     integer not null default 0
);

-- 3. Lecciones de curso
create table if not exists lecciones_curso (
  id         serial primary key,
  modulo_id  integer references modulos(id) on delete cascade,
  titulo     text not null,
  vimeo_id   text,
  duracion   text,                     -- ej: '12:34'
  orden      integer not null default 0,
  es_preview boolean default false
);

-- 4. Compras
create table if not exists compras (
  id               serial primary key,
  user_id          uuid references auth.users(id) on delete cascade,
  curso_id         integer references cursos(id),
  lemon_order_id   text unique,
  created_at       timestamptz default now()
);

-- 5. Progreso
create table if not exists progreso (
  id          serial primary key,
  user_id     uuid references auth.users(id) on delete cascade,
  leccion_id  integer references lecciones_curso(id) on delete cascade,
  completada  boolean default false,
  updated_at  timestamptz default now(),
  unique(user_id, leccion_id)
);

-- ─── RLS ───

alter table cursos enable row level security;
alter table modulos enable row level security;
alter table lecciones_curso enable row level security;
alter table compras enable row level security;
alter table progreso enable row level security;

-- Cursos activos: lectura pública
create policy "Cursos públicos" on cursos for select using (activo = true);

-- Módulos y lecciones: lectura pública (el acceso al vídeo se controla en la app)
create policy "Módulos públicos" on modulos for select using (true);
create policy "Lecciones públicas" on lecciones_curso for select using (true);

-- Compras: solo el propio usuario
create policy "Mis compras" on compras for select using (auth.uid() = user_id);
create policy "Insertar compra" on compras for insert with check (auth.uid() = user_id);

-- Progreso: solo el propio usuario
create policy "Mi progreso select" on progreso for select using (auth.uid() = user_id);
create policy "Mi progreso upsert" on progreso for insert with check (auth.uid() = user_id);
create policy "Mi progreso update" on progreso for update using (auth.uid() = user_id);

-- ─── FUNCIÓN: verificar acceso a curso ───
-- Devuelve true si el usuario ha comprado el curso
create or replace function tiene_acceso(p_curso_id integer)
returns boolean
language sql security definer
as $$
  select exists (
    select 1 from compras
    where user_id = auth.uid()
    and curso_id = p_curso_id
  );
$$;
