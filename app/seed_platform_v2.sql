-- ─────────────────────────────────────────────────────────────
-- PLATAFORMA v2: PERFILES · ACCESOS · VISUALIZACIONES
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ─────────────────────────────────────────────────────────────

-- 1. Perfiles (nombre y apellido por usuario)
create table if not exists perfiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  nombre     text not null default '',
  apellido   text not null default '',
  updated_at timestamptz default now()
);
alter table perfiles enable row level security;
create policy "perfil_propio" on perfiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- 2. Accesos (log de logins)
create table if not exists accesos (
  id         serial primary key,
  user_id    uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);
alter table accesos enable row level security;
create policy "mis_accesos" on accesos for select using (auth.uid() = user_id);

-- 3. Visualizaciones (qué lecciones ha abierto cada usuario)
create table if not exists visualizaciones (
  id         serial primary key,
  user_id    uuid references auth.users(id) on delete cascade,
  leccion_id integer references lecciones_curso(id) on delete cascade,
  visto_el   timestamptz default now()
);
alter table visualizaciones enable row level security;
create policy "mis_visualizaciones" on visualizaciones for select using (auth.uid() = user_id);

-- 4. Trigger: crear perfil vacío automáticamente al crear cualquier usuario
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.perfiles (id, nombre, apellido)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nombre', ''),
    coalesce(new.raw_user_meta_data->>'apellido', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. Crear perfiles para usuarios ya existentes (los 11 del laboratorio + tú)
insert into perfiles (id, nombre, apellido)
select id, '', ''
from auth.users
on conflict (id) do nothing;

-- 6. Función para sesión única: revoca todas las demás sesiones del usuario
create or replace function public.revocar_otras_sesiones(p_user_id uuid, p_session_id uuid)
returns void language plpgsql security definer set search_path = auth, public as $$
begin
  delete from auth.sessions
  where user_id = p_user_id
    and id != p_session_id;
end;
$$;

-- Verificar
select 'perfiles' as tabla, count(*) from perfiles
union all
select 'accesos', count(*) from accesos
union all
select 'visualizaciones', count(*) from visualizaciones;
