"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export function SetupProfile() {
  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string[]>([])
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setDebugInfo([])

    try {
      // 1. Obtener el usuario actual
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        throw new Error(`Error al obtener usuario: ${userError?.message || "Usuario no encontrado"}`)
      }

      addDebugInfo(`Usuario autenticado: ${user.id}`)

      // 2. Crear perfil
      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        username,
        full_name: fullName,
      })

      if (profileError) {
        throw new Error(`Error al crear perfil: ${profileError.message}`)
      }

      addDebugInfo("Perfil creado con éxito")

      // 3. Obtener IDs de idioma y tema predeterminados
      const { data: languageData, error: languageError } = await supabase
        .from("languages")
        .select("id")
        .eq("code", "es")
        .single()

      if (languageError) {
        throw new Error(`Error al obtener idioma: ${languageError.message}`)
      }

      const { data: themeData, error: themeError } = await supabase
        .from("themes")
        .select("id")
        .eq("name", "Light")
        .single()

      if (themeError) {
        throw new Error(`Error al obtener tema: ${themeError.message}`)
      }

      addDebugInfo(`Idioma: ${languageData.id}, Tema: ${themeData.id}`)

      // 4. Crear configuración de usuario
      const { error: settingsError } = await supabase.from("user_settings").insert({
        user_id: user.id,
        language_id: languageData.id,
        theme_id: themeData.id,
        notifications_enabled: true,
      })

      if (settingsError) {
        throw new Error(`Error al crear configuración: ${settingsError.message}`)
      }

      addDebugInfo("Configuración creada con éxito")

      // 5. Redirigir al dashboard
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Error al configurar perfil:", error)
      setError(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const addDebugInfo = (info: string) => {
    setDebugInfo((prev) => [...prev, info])
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Configura tu perfil</CardTitle>
        <CardDescription>Completa tu información para comenzar a usar Outfitea</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="usuario123"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName">Nombre completo</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Juan Pérez"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {debugInfo.length > 0 && (
            <Alert>
              <AlertDescription>
                <ul className="list-disc pl-4">
                  {debugInfo.map((info, index) => (
                    <li key={index}>{info}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar perfil"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
