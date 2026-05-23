-- Tabla accesos_modulo
CREATE TABLE IF NOT EXISTS accesos_modulo (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  modulo_id integer NOT NULL REFERENCES modulos(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, modulo_id)
);

-- RLS
ALTER TABLE accesos_modulo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own module access"
  ON accesos_modulo FOR SELECT
  USING (auth.uid() = user_id);

-- RPC: comprobar acceso a un módulo específico
CREATE OR REPLACE FUNCTION tiene_acceso_modulo(p_modulo_id integer)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM accesos_modulo
    WHERE user_id = auth.uid() AND modulo_id = p_modulo_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
