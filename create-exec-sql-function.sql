-- Crear función para ejecutar SQL desde la aplicación
-- NOTA: Esta función debe ser creada por un administrador de la base de datos
CREATE OR REPLACE FUNCTION exec_sql(query text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE query;
END;
$$;
