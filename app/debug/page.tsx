"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)

        // Obtener sesión actual
        const { data: sessionData } = await supabase.auth.getSession()

        if (!sessionData || !sessionData.session) {
          // No hay sesión, no es un error
          setLoading(false)
          return
        }

        // Obtener usuario actual
        const { data: userData } = await supabase.auth.getUser()
        setUser(userData?.user || null)

        if (userData?.user) {
          // Intentar obtener perfil
          const { data: profileData } = await supabase.from("profiles").select("*").eq("id", userData.user.id).single()

          setProfile(profileData)

          // Intentar obtener configuración
          const { data: settingsData } = await supabase
            .from("user_settings")
            .select("*")
            .eq("user_id", userData.user.id)
            .single()

          setSettings(settingsData)
        }
      } catch (err: any) {
        console.error("Error:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [supabase])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Página de Depuración</h1>

      {loading ? (
        <p>Cargando información...</p>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Estado de Autenticación</CardTitle>
            </CardHeader>
            <CardContent>
              {user ? (
                <div>
                  <p className="text-green-600 font-bold">Usuario autenticado</p>
                  <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60 mt-2">
                    {JSON.stringify(user, null, 2)}
                  </pre>
                </div>
              ) : (
                <div>
                  <p className="text-yellow-600 font-bold">No hay usuario autenticado</p>
                  <p className="mt-2">
                    <a href="/login" className="text-blue-600 underline">
                      Ir a la página de inicio de sesión
                    </a>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {user && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Perfil</CardTitle>
                </CardHeader>
                <CardContent>
                  {profile ? (
                    <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
                      {JSON.stringify(profile, null, 2)}
                    </pre>
                  ) : (
                    <p className="text-yellow-600">No hay perfil para este usuario</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configuración</CardTitle>
                </CardHeader>
                <CardContent>
                  {settings ? (
                    <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
                      {JSON.stringify(settings, null, 2)}
                    </pre>
                  ) : (
                    <p className="text-yellow-600">No hay configuración para este usuario</p>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Acciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {user ? (
                <Button
                  onClick={async () => {
                    await supabase.auth.signOut()
                    window.location.reload()
                  }}
                  variant="destructive"
                >
                  Cerrar sesión
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button onClick={() => (window.location.href = "/login")}>Iniciar sesión</Button>
                  <Button onClick={() => (window.location.href = "/register")} variant="outline">
                    Registrarse
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
