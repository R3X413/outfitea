-- SCRIPT DE CONFIGURACIÓN COMPLETA PARA OUTFITEA
-- Ejecutar este script directamente en el SQL Editor de Supabase

-- =============================================
-- PARTE 1: DESACTIVAR RLS TEMPORALMENTE
-- =============================================
ALTER TABLE IF EXISTS profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS languages DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS themes DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS clothing_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS seasons DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS occasions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS clothing_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS outfits DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS outfit_items DISABLE ROW LEVEL SECURITY;

-- =============================================
-- PARTE 2: CREAR TABLAS BÁSICAS
-- =============================================

-- Idiomas
CREATE TABLE IF NOT EXISTS languages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Temas
CREATE TABLE IF NOT EXISTS themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  is_dark BOOLEAN DEFAULT FALSE,
  primary_color TEXT NOT NULL DEFAULT '#000000',
  secondary_color TEXT NOT NULL DEFAULT '#ffffff',
  background_color TEXT NOT NULL DEFAULT '#ffffff',
  text_color TEXT NOT NULL DEFAULT '#000000',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Perfiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configuraciones de usuario
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  language_id UUID REFERENCES languages(id),
  theme_id UUID REFERENCES themes(id),
  notifications_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categorías de ropa
CREATE TABLE IF NOT EXISTS clothing_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Temporadas
CREATE TABLE IF NOT EXISTS seasons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ocasiones
CREATE TABLE IF NOT EXISTS occasions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prendas de ropa
CREATE TABLE IF NOT EXISTS clothing_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category_id UUID REFERENCES clothing_categories(id),
  color TEXT NOT NULL,
  color_name TEXT NOT NULL,
  season_id UUID REFERENCES seasons(id),
  brand TEXT,
  description TEXT,
  image_url TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Outfits
CREATE TABLE IF NOT EXISTS outfits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  occasion_id UUID REFERENCES occasions(id),
  season_id UUID REFERENCES seasons(id),
  description TEXT,
  tags TEXT[],
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Items de outfit
CREATE TABLE IF NOT EXISTS outfit_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  outfit_id UUID NOT NULL REFERENCES outfits(id) ON DELETE CASCADE,
  clothing_item_id UUID NOT NULL REFERENCES clothing_items(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- PARTE 3: INSERTAR DATOS INICIALES
-- =============================================

-- Idiomas
INSERT INTO languages (code, name)
VALUES 
  ('es', 'Español'),
  ('en', 'English')
ON CONFLICT (code) DO NOTHING;

-- Temas
INSERT INTO themes (name, is_dark, primary_color, secondary_color, background_color, text_color)
VALUES 
  ('Light', FALSE, '#f43f5e', '#ffffff', '#ffffff', '#000000'),
  ('Dark', TRUE, '#f43f5e', '#1f2937', '#111827', '#ffffff')
ON CONFLICT (name) DO NOTHING;

-- Categorías de ropa
INSERT INTO clothing_categories (name)
VALUES 
  ('Camisetas'),
  ('Pantalones'),
  ('Vestidos'),
  ('Zapatos'),
  ('Accesorios'),
  ('Abrigos'),
  ('Faldas'),
  ('Shorts'),
  ('Trajes de baño'),
  ('Ropa interior')
ON CONFLICT DO NOTHING;

-- Temporadas
INSERT INTO seasons (name)
VALUES 
  ('Primavera'),
  ('Verano'),
  ('Otoño'),
  ('Invierno'),
  ('Todo el año')
ON CONFLICT DO NOTHING;

-- Ocasiones
INSERT INTO occasions (name)
VALUES 
  ('Casual'),
  ('Formal'),
  ('Deportivo'),
  ('Fiesta'),
  ('Trabajo'),
  ('Playa'),
  ('Especial')
ON CONFLICT DO NOTHING;

-- =============================================
-- PARTE 4: CREAR FUNCIÓN PARA CREAR USUARIO ADMIN
-- =============================================

CREATE OR REPLACE FUNCTION create_admin_user(
  admin_email TEXT,
  admin_password TEXT,
  admin_username TEXT
) RETURNS TEXT AS $$
DECLARE
  new_user_id UUID;
  language_id UUID;
  theme_id UUID;
BEGIN
  -- Crear usuario en auth.users
  INSERT INTO auth.users (email, password, email_confirmed_at)
  VALUES (admin_email, admin_password, NOW())
  RETURNING id INTO new_user_id;
  
  -- Obtener IDs de idioma y tema por defecto
  SELECT id INTO language_id FROM languages WHERE code = 'es' LIMIT 1;
  SELECT id INTO theme_id FROM themes WHERE name = 'Light' LIMIT 1;
  
  -- Crear perfil de administrador
  INSERT INTO profiles (id, username, is_admin, is_verified)
  VALUES (new_user_id, admin_username, TRUE, TRUE);
  
  -- Crear configuración de usuario
  INSERT INTO user_settings (user_id, language_id, theme_id)
  VALUES (new_user_id, language_id, theme_id);
  
  RETURN 'Usuario administrador creado con éxito: ' || admin_email;
EXCEPTION
  WHEN OTHERS THEN
    RETURN 'Error al crear usuario administrador: ' || SQLERRM;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- PARTE 5: CONFIGURAR POLÍTICAS RLS
-- =============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE clothing_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE occasions ENABLE ROW LEVEL SECURITY;
ALTER TABLE clothing_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE outfits ENABLE ROW LEVEL SECURITY;
ALTER TABLE outfit_items ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
DROP POLICY IF EXISTS "Usuarios pueden ver todos los perfiles" ON profiles;
CREATE POLICY "Usuarios pueden ver todos los perfiles" 
  ON profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Usuarios pueden actualizar su propio perfil" ON profiles;
CREATE POLICY "Usuarios pueden actualizar su propio perfil" 
  ON profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Usuarios pueden insertar su propio perfil" ON profiles;
CREATE POLICY "Usuarios pueden insertar su propio perfil" 
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas para user_settings
DROP POLICY IF EXISTS "Usuarios pueden ver sus propias configuraciones" ON user_settings;
CREATE POLICY "Usuarios pueden ver sus propias configuraciones" 
  ON user_settings FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuarios pueden actualizar sus propias configuraciones" ON user_settings;
CREATE POLICY "Usuarios pueden actualizar sus propias configuraciones" 
  ON user_settings FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuarios pueden insertar sus propias configuraciones" ON user_settings;
CREATE POLICY "Usuarios pueden insertar sus propias configuraciones" 
  ON user_settings FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para tablas de referencia (acceso público para lectura)
DROP POLICY IF EXISTS "Acceso público para lectura de idiomas" ON languages;
CREATE POLICY "Acceso público para lectura de idiomas" 
  ON languages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Acceso público para lectura de temas" ON themes;
CREATE POLICY "Acceso público para lectura de temas" 
  ON themes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Acceso público para lectura de categorías" ON clothing_categories;
CREATE POLICY "Acceso público para lectura de categorías" 
  ON clothing_categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Acceso público para lectura de temporadas" ON seasons;
CREATE POLICY "Acceso público para lectura de temporadas" 
  ON seasons FOR SELECT USING (true);

DROP POLICY IF EXISTS "Acceso público para lectura de ocasiones" ON occasions;
CREATE POLICY "Acceso público para lectura de ocasiones" 
  ON occasions FOR SELECT USING (true);

-- Políticas para clothing_items
DROP POLICY IF EXISTS "Usuarios pueden ver sus propias prendas" ON clothing_items;
CREATE POLICY "Usuarios pueden ver sus propias prendas" 
  ON clothing_items FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuarios pueden actualizar sus propias prendas" ON clothing_items;
CREATE POLICY "Usuarios pueden actualizar sus propias prendas" 
  ON clothing_items FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuarios pueden insertar sus propias prendas" ON clothing_items;
CREATE POLICY "Usuarios pueden insertar sus propias prendas" 
  ON clothing_items FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuarios pueden eliminar sus propias prendas" ON clothing_items;
CREATE POLICY "Usuarios pueden eliminar sus propias prendas" 
  ON clothing_items FOR DELETE USING (auth.uid() = user_id);

-- Políticas para outfits
DROP POLICY IF EXISTS "Usuarios pueden ver sus propios outfits" ON outfits;
CREATE POLICY "Usuarios pueden ver sus propios outfits" 
  ON outfits FOR SELECT USING (auth.uid() = user_id OR is_public = true);

DROP POLICY IF EXISTS "Usuarios pueden actualizar sus propios outfits" ON outfits;
CREATE POLICY "Usuarios pueden actualizar sus propios outfits" 
  ON outfits FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuarios pueden insertar sus propios outfits" ON outfits;
CREATE POLICY "Usuarios pueden insertar sus propios outfits" 
  ON outfits FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuarios pueden eliminar sus propios outfits" ON outfits;
CREATE POLICY "Usuarios pueden eliminar sus propios outfits" 
  ON outfits FOR DELETE USING (auth.uid() = user_id);

-- Políticas para outfit_items
DROP POLICY IF EXISTS "Usuarios pueden ver items de outfits" ON outfit_items;
CREATE POLICY "Usuarios pueden ver items de outfits" 
  ON outfit_items FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM outfits o 
      WHERE o.id = outfit_items.outfit_id 
      AND (o.user_id = auth.uid() OR o.is_public = true)
    )
  );

DROP POLICY IF EXISTS "Usuarios pueden actualizar items de sus outfits" ON outfit_items;
CREATE POLICY "Usuarios pueden actualizar items de sus outfits" 
  ON outfit_items FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM outfits o 
      WHERE o.id = outfit_items.outfit_id 
      AND o.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Usuarios pueden insertar items en sus outfits" ON outfit_items;
CREATE POLICY "Usuarios pueden insertar items en sus outfits" 
  ON outfit_items FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM outfits o 
      WHERE o.id = outfit_items.outfit_id 
      AND o.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Usuarios pueden eliminar items de sus outfits" ON outfit_items;
CREATE POLICY "Usuarios pueden eliminar items de sus outfits" 
  ON outfit_items FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM outfits o 
      WHERE o.id = outfit_items.outfit_id 
      AND o.user_id = auth.uid()
    )
  );

-- =============================================
-- PARTE 6: CREAR TRIGGERS PARA ACTUALIZAR TIMESTAMPS
-- =============================================

-- Función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para profiles
DROP TRIGGER IF EXISTS update_profiles_timestamp ON profiles;
CREATE TRIGGER update_profiles_timestamp
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Trigger para user_settings
DROP TRIGGER IF EXISTS update_user_settings_timestamp ON user_settings;
CREATE TRIGGER update_user_settings_timestamp
BEFORE UPDATE ON user_settings
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Trigger para clothing_items
DROP TRIGGER IF EXISTS update_clothing_items_timestamp ON clothing_items;
CREATE TRIGGER update_clothing_items_timestamp
BEFORE UPDATE ON clothing_items
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Trigger para outfits
DROP TRIGGER IF EXISTS update_outfits_timestamp ON outfits;
CREATE TRIGGER update_outfits_timestamp
BEFORE UPDATE ON outfits
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- =============================================
-- PARTE 7: CREAR FUNCIÓN PARA REGISTRAR USUARIOS
-- =============================================

CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
  language_id UUID;
  theme_id UUID;
BEGIN
  -- Obtener IDs de idioma y tema por defecto
  SELECT id INTO language_id FROM languages WHERE code = 'es' LIMIT 1;
  SELECT id INTO theme_id FROM themes WHERE name = 'Light' LIMIT 1;
  
  -- Crear perfil básico
  INSERT INTO profiles (id, username)
  VALUES (NEW.id, NEW.email);
  
  -- Crear configuración de usuario
  INSERT INTO user_settings (user_id, language_id, theme_id)
  VALUES (NEW.id, language_id, theme_id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil automáticamente al registrar usuario
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =============================================
-- PARTE 8: MENSAJE DE CONFIRMACIÓN
-- =============================================

DO $$
BEGIN
  RAISE NOTICE 'Configuración completada con éxito.';
  RAISE NOTICE 'Para crear un usuario administrador, ejecuta:';
  RAISE NOTICE 'SELECT create_admin_user(''admin@example.com'', ''password'', ''admin'');';
  RAISE NOTICE 'Reemplaza los valores con tu email, contraseña y nombre de usuario deseados.';
END $$;
