-- ─────────────────────────────────────────────────────────────
-- TRACKING · EJECUTAR EN SUPABASE SQL EDITOR
-- ─────────────────────────────────────────────────────────────

-- 1. Añadir campo de último acceso a usuarios
alter table laboratorio_usuarios
  add column if not exists ultimo_acceso timestamptz;


-- 2. Tabla de visualizaciones
create table if not exists laboratorio_visualizaciones (
  id          serial primary key,
  usuario_id  uuid references laboratorio_usuarios(id) on delete cascade,
  leccion_id  integer references laboratorio_lecciones(id) on delete cascade,
  visto_el    timestamptz default now()
);

alter table laboratorio_visualizaciones enable row level security;


-- 3. Función: registrar acceso (actualiza ultimo_acceso)
create or replace function registrar_acceso(p_token text)
returns void
language plpgsql
security definer
as $$
begin
  update laboratorio_usuarios
  set ultimo_acceso = now()
  where token = p_token and activo = true;
end;
$$;


-- 4. Función: registrar visualización de lección
create or replace function registrar_visualizacion(p_usuario_id uuid, p_leccion_id integer)
returns void
language plpgsql
security definer
as $$
begin
  insert into laboratorio_visualizaciones (usuario_id, leccion_id)
  values (p_usuario_id, p_leccion_id);
end;
$$;
