-- ─────────────────────────────────────────────────────────────
-- USUARIOS · EJECUTAR EN SUPABASE SQL EDITOR
-- Este archivo NO se sube a GitHub (datos personales)
-- ─────────────────────────────────────────────────────────────
-- Acceso válido hasta el 31 de julio de 2026
-- Cada token es el enlace de acceso único de cada entrenador:
-- https://[tu-dominio-vercel]/laboratorio?token=TOKEN
-- ─────────────────────────────────────────────────────────────

insert into laboratorio_usuarios (email, nombre, token, expira_el) values
  ('martinezmorera1985@gmail.com', 'Alberto',  '8aeae3d62e886f7323e8d1b99136f704', '2026-07-31'),
  ('arnauguellperez@gmail.com',    'Arnau',    '483d55522107e9d67cf995ac12219658', '2026-07-31'),
  ('carlosvaqueras@gmail.com',     'Carlos',   '8e9bcbb7587a23ce61ad847b5c279fce', '2026-07-31'),
  ('cantalejo1998@gmail.com',      'David',    'b966acf4260711739d82ba0fc97f3f18', '2026-07-31'),
  ('egoitz.arizmendi@gmail.com',   'Egoitz',   '6911b84f478c7a8bb84b7073303494fb', '2026-07-31'),
  ('fausto@pimientos.net',         'Fausto',   '15363e250be5f47663584be96bc04051', '2026-07-31'),
  ('j_escolano@hotmail.com',       'Jorge',    '022dedfdfe28b6efede3b633dcdc3237', '2026-07-31'),
  ('josebalopezhervella@gmail.com','Joseba',   '5d077751ec51c554a41e86a1770e0371', '2026-07-31'),
  ('marcosmocholibaguena@gmail.com','Marcos',  'aab1bc2a8a58e88dc7fa580ee1d1c924', '2026-07-31'),
  ('roi_xinzo@hotmail.com',        'Roi',      'ceb0399a5dec403f896bc5e05d28e4a2', '2026-07-31'),
  ('magic3278@hotmail.com',        'Vicente',  'a641153437b7e937733e8f22f469f354', '2026-07-31');
