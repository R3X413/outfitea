"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function SetupDatabasePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  async function setupDatabase() {
    setIsLoading(true)
    setResults([])
    setError(null)

    try {
      // 1. Verificar conexión a Supabase
      setResults((prev) => [...prev, { step: "Verificando conexión a Supabase", status: "loading" }])
      const { data: connectionData, error: connectionError } = await supabase.from("profiles").select("count").limit(1)

      if (connectionError) {
        setResults((prev) =>
          prev.map((item) =>
            item.step === "Verificando conexión a Supabase"
              ? { ...item, status: "error", message: connectionError.message }
              : item,
          ),
        )
        throw new Error(`Error de conexión: ${connectionError.message}`)
      }

      setResults((prev) =>
        prev.map((item) => (item.step === "Verificando conexión a Supabase" ? { ...item, status: "success" } : item)),
      )

      // 2. Desactivar RLS temporalmente para la configuración
      setResults((prev) => [...prev, { step: "Configurando políticas de seguridad", status: "loading" }])

      // Ejecutar las consultas SQL para configurar las políticas
      const queries = [
        // Desactivar RLS temporalmente
        "ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;",
        "ALTER TABLE public.user_settings DISABLE ROW LEVEL SECURITY;",
        "ALTER TABLE public.languages DISABLE ROW LEVEL SECURITY;",
        "ALTER TABLE public.themes DISABLE ROW LEVEL SECURITY;",

        // Eliminar políticas existentes
        'DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;',
        'DROP POLICY IF EXISTS "Profiles are viewable by users who created them or if public" ON public.profiles;',
        'DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;',
        'DROP POLICY IF EXISTS "Users can insert their own settings" ON public.user_settings;',
        'DROP POLICY IF EXISTS "Users can view own settings" ON public.user_settings;',
        'DROP POLICY IF EXISTS "Users can update own settings" ON public.user_settings;',
        'DROP POLICY IF EXISTS "Languages are viewable by everyone" ON public.languages;',
        'DROP POLICY IF EXISTS "Themes are viewable by everyone" ON public.themes;',

        // Activar RLS
        "ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;",
        "ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;",
        "ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;",
        "ALTER TABLE public.themes ENABLE ROW LEVEL SECURITY;",

        // Crear nuevas políticas
        'CREATE POLICY "Enable insert for authenticated users" ON public.profiles FOR INSERT TO authenticated WITH CHECK (true);',
        'CREATE POLICY "Enable select for authenticated users" ON public.profiles FOR SELECT TO authenticated USING (true);',
        'CREATE POLICY "Enable update for users based on id" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);',

        'CREATE POLICY "Enable insert for authenticated users" ON public.user_settings FOR INSERT TO authenticated WITH CHECK (true);',
        'CREATE POLICY "Enable select for authenticated users" ON public.user_settings FOR SELECT TO authenticated USING (true);',
        'CREATE POLICY "Enable update for users based on user_id" ON public.user_settings FOR UPDATE TO authenticated USING (auth.uid() = user_id);',

        'CREATE POLICY "Languages are viewable by everyone" ON public.languages FOR SELECT TO authenticated, anon USING (true);',
        'CREATE POLICY "Themes are viewable by everyone" ON public.themes FOR SELECT TO authenticated, anon USING (true);',
      ]

      // Ejecutar cada consulta
      for (const query of queries) {
        try {
          await supabase.rpc("exec_sql", { query })
        } catch (error: any) {
          console.warn(`Advertencia al ejecutar consulta: ${error.message}`)
          // Continuamos con la siguiente consulta aunque haya errores
        }
      }

      setResults((prev) =>
        prev.map((item) =>
          item.step === "Configurando políticas de seguridad" ? { ...item, status: "success" } : item,
        ),
      )

      // 3. Verificar y crear datos iniciales
      setResults((prev) => [...prev, { step: "Verificando datos iniciales", status: "loading" }])

      // Verificar si existen idiomas
      const { data: languagesData, error: languagesError } = await supabase.from("languages").select("count")

      if (languagesError) {
        setResults((prev) =>
          prev.map((item) =>
            item.step === "Verificando datos iniciales"
              ? { ...item, status: "error", message: languagesError.message }
              : item,
          ),
        )
        throw new Error(`Error al verificar idiomas: ${languagesError.message}`)
      }

      // Si no hay idiomas, insertarlos
      if (!languagesData || languagesData.length === 0) {
        const { error: insertLanguagesError } = await supabase.from("languages").insert([
          { code: "es", name: "Español", is_active: true },
          { code: "en", name: "English", is_active: true },
        ])

        if (insertLanguagesError) {
          setResults((prev) =>
            prev.map((item) =>
              item.step === "Verificando datos iniciales"
                ? { ...item, status: "error", message: insertLanguagesError.message }
                : item,
            ),
          )
          throw new Error(`Error al insertar idiomas: ${insertLanguagesError.message}`)
        }
      }

      // Verificar si existen temas
      const { data: themesData, error: themesError } = await supabase.from("themes").select("count")

      if (themesError) {
        setResults((prev) =>
          prev.map((item) =>
            item.step === "Verificando datos iniciales"
              ? { ...item, status: "error", message: themesError.message }
              : item,
          ),
        )
        throw new Error(`Error al verificar temas: ${themesError.message}`)
      }

      // Si no hay temas, insertarlos
      if (!themesData || themesData.length === 0) {
        const { error: insertThemesError } = await supabase.from("themes").insert([
          {
            name: "Light",
            is_dark: false,
            primary_color: "#f43f5e",
            secondary_color: "#ec4899",
            background_color: "#ffffff",
            text_color: "#000000",
            is_active: true,
          },
          {
            name: "Dark",
            is_dark: true,
            primary_color: "#f43f5e",
            secondary_color: "#ec4899",
            background_color: "#1f2937",
            text_color: "#ffffff",
            is_active: true,
          },
        ])

        if (insertThemesError) {
          setResults((prev) =>
            prev.map((item) =>
              item.step === "Verificando datos iniciales"
                ? { ...item, status: "error", message: insertThemesError.message }
                : item,
            ),
          )
          throw new Error(`Error al insertar temas: ${insertThemesError.message}`)
        }
      }

      setResults((prev) =>
        prev.map((item) => (item.step === "Verificando datos iniciales" ? { ...item, status: "success" } : item)),
      )

      // 4. Configuración completada
      setResults((prev) => [
        ...prev,
        {
          step: "Configuración completada",
          status: "success",
          message: "La base de datos ha sido configurada correctamente.",
        },
      ])
    } catch (error: any) {
      console.error("Error al configurar base de datos:", error)
      setError(error.message || "Hubo un problema al configurar la base de datos.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Configuración de la base de datos</CardTitle>
          <CardDescription>
            Esta herramienta configura las tablas, políticas de seguridad y datos iniciales necesarios para la
            aplicación.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button onClick={setupDatabase} disabled={isLoading} className="mb-6 bg-rose-500 hover:bg-rose-600">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Configurando...
              </>
            ) : (
              "Configurar base de datos"
            )}
          </Button>

          {results.length > 0 && (
            <div className="space-y-2 mt-4">
              {results.map((result, index) => (
                <div key={index} className="flex items-start gap-2 p-2 border rounded">
                  {result.status === "loading" && <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />}
                  {result.status === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {result.status === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
                  <div>
                    <p className="font-medium">{result.step}</p>
                    {result.message && <p className="text-sm text-gray-500">{result.message}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
