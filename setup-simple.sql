-- Desactivar RLS temporalmente para facilitar la configuración
ALTER TABLE IF EXISTS profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS languages DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS themes DISABLE ROW LEVEL SECURITY;

-- Crear tablas básicas si no existen
CREATE TABLE IF NOT EXISTS languages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE
);

-- Insertar datos básicos
INSERT INTO languages (name, code)
VALUES ('Español', 'es'), ('English', 'en')
ON CONFLICT (code) DO NOTHING;

INSERT INTO themes (name)
VALUES ('Light'), ('Dark')
ON CONFLICT (name) DO NOTHING;

-- Crear tabla de perfiles si no existe
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  full_name TEXT,
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de configuraciones si no existe
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  language_id UUID REFERENCES languages(id),
  theme_id UUID REFERENCES themes(id),
  notifications_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configurar políticas RLS simples
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Usuarios pueden ver todos los perfiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY IF NOT EXISTS "Usuarios pueden actualizar su propio perfil"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Usuarios pueden insertar su propio perfil"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Configurar políticas para user_settings
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Usuarios pueden ver sus propias configuraciones"
  ON user_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Usuarios pueden actualizar sus propias configuraciones"
  ON user_settings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Usuarios pueden insertar sus propias configuraciones"
  ON user_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Mantener languages y themes accesibles para todos
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Todos pueden ver idiomas"
  ON languages FOR SELECT
  USING (true);

ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Todos pueden ver temas"
  ON themes FOR SELECT
  USING (true);
