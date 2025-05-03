-- Desactivar RLS temporalmente para poder modificar las tablas
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings DISABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes que puedan estar causando problemas
DROP POLICY IF EXISTS "Los usuarios pueden ver sus propios perfiles" ON profiles;
DROP POLICY IF EXISTS "Los usuarios pueden actualizar sus propios perfiles" ON profiles;
DROP POLICY IF EXISTS "Los usuarios pueden ver sus propias configuraciones" ON user_settings;
DROP POLICY IF EXISTS "Los usuarios pueden actualizar sus propias configuraciones" ON user_settings;

-- Crear función para manejar nuevos usuarios
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Crear perfil para el nuevo usuario
  INSERT INTO public.profiles (id, username, full_name, avatar_url, created_at, updated_at)
  VALUES (NEW.id, SPLIT_PART(NEW.email, '@', 1), '', '', NOW(), NOW());
  
  -- Crear configuración para el nuevo usuario
  INSERT INTO public.user_settings (user_id, theme_id, language_id, created_at, updated_at)
  VALUES (NEW.id, 1, 1, NOW(), NOW());
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crear trigger para manejar nuevos usuarios
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Crear políticas RLS para profiles
CREATE POLICY "Los usuarios pueden ver sus propios perfiles"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden actualizar sus propios perfiles"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Crear políticas RLS para user_settings
CREATE POLICY "Los usuarios pueden ver sus propias configuraciones"
  ON user_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden actualizar sus propias configuraciones"
  ON user_settings FOR UPDATE
  USING (auth.uid() = user_id);

-- Volver a activar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Asegurarse de que las tablas existan
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_settings (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  theme_id INTEGER DEFAULT 1,
  language_id INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Asegurarse de que existan los temas e idiomas básicos
INSERT INTO public.themes (id, name, created_at, updated_at)
VALUES (1, 'light', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.languages (id, name, code, created_at, updated_at)
VALUES (1, 'Español', 'es', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
