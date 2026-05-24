-- ─────────────────────────────────────────────────────────────
-- USUARIOS DEL LABORATORIO → SUPABASE AUTH + ACCESO AL CURSO
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ─────────────────────────────────────────────────────────────
-- Crea las cuentas de auth y da acceso gratuito al curso
-- laboratorio-2526 a los 11 usuarios existentes.
-- Contraseña inicial: Lab2526! (el usuario puede cambiarla)
-- ─────────────────────────────────────────────────────────────

do $$
declare
  v_curso_id integer;
  v_user_id  uuid;
  v_emails   text[] := array[
    'martinezmorera1985@gmail.com',
    'arnauguellperez@gmail.com',
    'carlosvaqueras@gmail.com',
    'cantalejo1998@gmail.com',
    'egoitz.arizmendi@gmail.com',
'j_escolano@hotmail.com',
    'josebalopezhervella@gmail.com',
    'marcosmocholibaguena@gmail.com',
    'roi_xinzo@hotmail.com',
    'magic3278@hotmail.com'
  ];
  v_email    text;
begin
  -- Obtener id del curso
  select id into v_curso_id from cursos where slug = 'laboratorio-2526';

  foreach v_email in array v_emails loop
    -- Crear usuario en auth.users si no existe
    if not exists (select 1 from auth.users where email = v_email) then
      insert into auth.users (
        id,
        email,
        encrypted_password,
        email_confirmed_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        role,
        aud
      )
      values (
        gen_random_uuid(),
        v_email,
        crypt('Lab2526!', gen_salt('bf')),
        now(),
        '{"provider":"email","providers":["email"]}',
        '{}',
        now(),
        now(),
        'authenticated',
        'authenticated'
      );
    end if;

    -- Obtener el uuid del usuario (recién creado o ya existente)
    select id into v_user_id from auth.users where email = v_email;

    -- Dar acceso gratuito al curso
    insert into compras (user_id, curso_id, lemon_order_id)
    values (v_user_id, v_curso_id, 'lab-acceso-' || v_email)
    on conflict (lemon_order_id) do nothing;

  end loop;
end $$;

-- Verificar resultado
select u.email, c.lemon_order_id, cu.slug
from auth.users u
join compras c on c.user_id = u.id
join cursos cu on cu.id = c.curso_id
where cu.slug = 'laboratorio-2526'
order by u.email;
