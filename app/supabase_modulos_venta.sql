-- Añadir columnas de venta individual a módulos
ALTER TABLE modulos
  ADD COLUMN IF NOT EXISTS fecha_apertura timestamptz,
  ADD COLUMN IF NOT EXISTS fecha_cierre_venta timestamptz,
  ADD COLUMN IF NOT EXISTS precio integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS lemon_variant_id text;
