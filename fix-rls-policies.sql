-- Desactivar temporalmente RLS para poder configurar todo correctamente
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings DISABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes que puedan estar causando problemas
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Profiles are viewable by users who created them or if public" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own settings" ON public.user_settings;
DROP POLICY IF EXISTS "Users can view own settings" ON public.user_settings;
DROP POLICY IF EXISTS "Users can update own settings" ON public.user_settings;

-- Crear políticas más permisivas para la tabla profiles
CREATE POLICY "Enable insert for authenticated users" ON public.profiles
    FOR INSERT TO authenticated
    WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users" ON public.profiles
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Enable update for users based on id" ON public.profiles
    FOR UPDATE TO authenticated
    USING (auth.uid() = id);

-- Crear políticas más permisivas para la tabla user_settings
CREATE POLICY "Enable insert for authenticated users" ON public.user_settings
    FOR INSERT TO authenticated
    WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users" ON public.user_settings
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Enable update for users based on user_id" ON public.user_settings
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id);

-- Volver a activar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Asegurarse de que el rol anónimo también pueda ver ciertos datos
CREATE POLICY "Allow anonymous access to profiles" ON public.profiles
    FOR SELECT TO anon
    USING (true);

-- Verificar que las tablas languages y themes tengan políticas permisivas
DROP POLICY IF EXISTS "Languages are viewable by everyone" ON public.languages;
CREATE POLICY "Languages are viewable by everyone" ON public.languages
    FOR SELECT TO authenticated, anon
    USING (true);

DROP POLICY IF EXISTS "Themes are viewable by everyone" ON public.themes;
CREATE POLICY "Themes are viewable by everyone" ON public.themes
    FOR SELECT TO authenticated, anon
    USING (true);
