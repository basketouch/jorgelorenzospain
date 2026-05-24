-- ─────────────────────────────────────────────────────────────
-- EL LAB. DEL ENTRENADOR 25/26 · SEED
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ─────────────────────────────────────────────────────────────

-- ── CURSO ────────────────────────────────────────────────────
insert into cursos (slug, titulo, descripcion, precio, activo)
values (
  'laboratorio-2526',
  'El Lab. del Entrenador 25/26',
  'Nueve meses de contenido práctico para entrenadores de baloncesto: sistemas de ataque y defensa, técnica individual, planificación semanal, scouting y mucho más.',
  0,
  true
);

-- ── MÓDULOS ──────────────────────────────────────────────────
insert into modulos (curso_id, titulo, orden)
select c.id, m.titulo, m.orden
from cursos c
cross join (values
  ('Estilos de juego del Eurobasket ''25',       1),
  ('Defensa en Formación y Élite',               2),
  ('Técnica individual ofensiva',                3),
  ('Defensa del bloqueo directo',                4),
  ('Spacing con 4 abiertos – 1 dentro',          5),
  ('Sistemas de ataque',                         6),
  ('Planificación de entrenamientos',            7),
  ('Scouting y preparación de partido',          8),
  ('Cierre',                                     9)
) as m(titulo, orden)
where c.slug = 'laboratorio-2526';

-- ── LECCIONES · MÓDULO 1 ─────────────────────────────────────
insert into lecciones_curso (modulo_id, titulo, orden)
select m.id, l.titulo, l.orden
from modulos m
join cursos c on c.id = m.curso_id
cross join (values
  ('Introducción y Objetivos',                   1),
  ('Estilo de juego de Finlandia',               2),
  ('Estilo de juego de Alemania',                3),
  ('Estilo de juego de Turquía',                 4),
  ('Estilo de juego de Grecia',                  5),
  ('Ejercicios prácticos',                       6),
  ('🎓 Gestión del vestuario y reparto de roles',7)
) as l(titulo, orden)
where c.slug = 'laboratorio-2526' and m.orden = 1;

-- ── LECCIONES · MÓDULO 2 ─────────────────────────────────────
insert into lecciones_curso (modulo_id, titulo, orden)
select m.id, l.titulo, l.orden
from modulos m
join cursos c on c.id = m.curso_id
cross join (values
  ('Introducción',                                                      1),
  ('Defender el 1x1',                                                   2),
  ('Defensa Colectiva',                                                  3),
  ('Del concepto al sistema Defensivo',                                  4),
  ('🎓 Herramientas tecnológicas e IA aplicada al baloncesto',           5)
) as l(titulo, orden)
where c.slug = 'laboratorio-2526' and m.orden = 2;

-- ── LECCIONES · MÓDULO 3 ─────────────────────────────────────
insert into lecciones_curso (modulo_id, titulo, orden)
select m.id, l.titulo, l.orden
from modulos m
join cursos c on c.id = m.curso_id
cross join (values
  ('Introducción',                                                  1),
  ('El Pase',                                                       2),
  ('El Tiro',                                                       3),
  ('Finalizaciones',                                                4),
  ('Bote',                                                          5),
  ('Ejercicios',                                                    6),
  ('🎓 Uso de estadísticas básicas para mejorar al jugador',        7)
) as l(titulo, orden)
where c.slug = 'laboratorio-2526' and m.orden = 3;

-- ── LECCIONES · MÓDULO 4 ─────────────────────────────────────
insert into lecciones_curso (modulo_id, titulo, orden)
select m.id, l.titulo, l.orden
from modulos m
join cursos c on c.id = m.curso_id
cross join (values
  ('Introducción',                                               1),
  ('El porqué de las diferentes defensas',                       2),
  ('Defensa Drop',                                               3),
  ('Defensa Show',                                               4),
  ('Defensa Cambio',                                             5),
  ('Bonus: Ejercicio de 2x2',                                    6),
  ('🎓 Mentalidad defensiva: construir cultura de esfuerzo',     7)
) as l(titulo, orden)
where c.slug = 'laboratorio-2526' and m.orden = 4;

-- ── LECCIONES · MÓDULO 5 ─────────────────────────────────────
insert into lecciones_curso (modulo_id, titulo, orden)
select m.id, l.titulo, l.orden
from modulos m
join cursos c on c.id = m.curso_id
cross join (values
  ('Introducción',                                                        1),
  ('Utilización del P&R con 4 exteriores y 1 interior',                  2),
  ('Uso del Dunker con 4 exteriores y 1 interior',                       3),
  ('Bonus: mi filosofía y ejercicios',                                    4),
  ('🎓 Creatividad táctica: enseñar lecturas dentro de sistemas',         5)
) as l(titulo, orden)
where c.slug = 'laboratorio-2526' and m.orden = 5;

-- ── LECCIONES · MÓDULO 6 ─────────────────────────────────────
insert into lecciones_curso (modulo_id, titulo, orden)
select m.id, l.titulo, l.orden
from modulos m
join cursos c on c.id = m.curso_id
cross join (values
  ('Sistemas para el P&R',                                                1),
  ('Sistemas para tiradores',                                             2),
  ('Sistemas para interiores',                                            3),
  ('Sistemas con indirectos y cortes',                                    4),
  ('Bonus: Sistema para generar',                                         5),
  ('🎓 El rol del especialista: potenciar las fortalezas individuales',   6)
) as l(titulo, orden)
where c.slug = 'laboratorio-2526' and m.orden = 6;

-- ── LECCIONES · MÓDULO 7 ─────────────────────────────────────
insert into lecciones_curso (modulo_id, titulo, orden)
select m.id, l.titulo, l.orden
from modulos m
join cursos c on c.id = m.curso_id
cross join (values
  ('Análisis del rival',                                          1),
  ('Planning de entrenamientos de la semana',                     2),
  ('Desarrollo de ejercicios de la semana',                       3),
  ('Resumen y conclusiones',                                      4),
  ('🎓 Liderazgo del entrenador: de la pizarra al día a día',     5)
) as l(titulo, orden)
where c.slug = 'laboratorio-2526' and m.orden = 7;

-- ── LECCIONES · MÓDULO 8 ─────────────────────────────────────
insert into lecciones_curso (modulo_id, titulo, orden)
select m.id, l.titulo, l.orden
from modulos m
join cursos c on c.id = m.curso_id
cross join (values
  ('Scouting Colectivo',                                                  1),
  ('Scouting Individual y Plan de Partido',                               2),
  ('Puntos Clave del Scouting',                                           3),
  ('🎓 Gestión de la presión: del jugador y del entrenador',              4)
) as l(titulo, orden)
where c.slug = 'laboratorio-2526' and m.orden = 8;

-- ── LECCIONES · MÓDULO 9 (pendiente junio 2026) ──────────────
insert into lecciones_curso (modulo_id, titulo, orden)
select m.id, l.titulo, l.orden
from modulos m
join cursos c on c.id = m.curso_id
cross join (values
  ('🎓 Cierre de temporada: lecciones, errores y aprendizajes',   1)
) as l(titulo, orden)
where c.slug = 'laboratorio-2526' and m.orden = 9;

-- ─────────────────────────────────────────────────────────────
-- ACCESO GRATUITO PARA USUARIOS EXISTENTES DEL LABORATORIO
-- Ejecutar DESPUÉS de crear las cuentas en Supabase Auth.
-- Sustituir los UUIDs por los auth.users.id de cada usuario.
-- ─────────────────────────────────────────────────────────────
-- insert into compras (user_id, curso_id, lemon_order_id)
-- select
--   u.id,
--   c.id,
--   'lab-acceso-' || u.email
-- from auth.users u
-- join cursos c on c.slug = 'laboratorio-2526'
-- where u.email in (
--   'email1@ejemplo.com',
--   'email2@ejemplo.com'
--   -- añadir los 10 emails reales
-- );
