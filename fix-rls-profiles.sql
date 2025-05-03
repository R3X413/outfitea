-- Desactivar temporalmente RLS para la tabla profiles
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes que puedan estar causando problemas
DROP POLICY IF EXISTS "Usuarios pueden insertar su propio perfil" ON profiles;
DROP POLICY IF EXISTS "Usuarios pueden ver todos los perfiles" ON profiles;
DROP POLICY IF EXISTS "Usuarios pueden actualizar su propio perfil" ON profiles;

-- Crear una política que permita a los usuarios autenticados insertar su propio perfil
CREATE POLICY "Usuarios pueden insertar su propio perfil"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Crear una política que permita a todos ver todos los perfiles
CREATE POLICY "Usuarios pueden ver todos los perfiles"
ON profiles FOR SELECT
TO authenticated
USING (true);

-- Crear una política que permita a los usuarios actualizar su propio perfil
CREATE POLICY "Usuarios pueden actualizar su propio perfil"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- Habilitar RLS para la tabla profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Crear una función para manejar nuevos usuarios automáticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  default_language_id UUID;
  default_theme_id UUID;
BEGIN
  -- Insertar perfil para el nuevo usuario
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (new.id, split_part(new.email, '@', 1), split_part(new.email, '@', 1));
  
  -- Obtener IDs de idioma y tema predeterminados
  SELECT id INTO default_language_id FROM public.languages WHERE code = 'es' LIMIT 1;
  SELECT id INTO default_theme_id FROM public.themes WHERE name = 'Light' LIMIT 1;
  
  -- Insertar configuración para el nuevo usuario
  INSERT INTO public.user_settings (user_id, language_id, theme_id)
  VALUES (new.id, default_language_id, default_theme_id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Eliminar el trigger si ya existe
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Crear trigger para manejar nuevos usuarios
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
