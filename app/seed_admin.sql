-- ─────────────────────────────────────────────────────────────
-- ADMIN PANEL · SETUP
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ─────────────────────────────────────────────────────────────

-- 1. Añadir campo is_admin a perfiles
alter table perfiles add column if not exists is_admin boolean default false;

-- 2. Marcar a Jorge como admin
update perfiles set is_admin = true
where id = (select id from auth.users where email = 'jorgelorenzo13@gmail.com');

-- Verificar
select u.email, p.nombre, p.apellido, p.is_admin
from perfiles p join auth.users u on u.id = p.id
where p.is_admin = true;
