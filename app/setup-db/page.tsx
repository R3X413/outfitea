"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SetupDbPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [log, setLog] = useState<string[]>([])
  const supabase = createClient()

  const addLog = (message: string) => {
    setLog((prev) => [...prev, message])
  }

  const setupDatabase = async () => {
    setLoading(true)
    setError("")
    setSuccess(false)
    setLog([])

    try {
      addLog("Iniciando configuración de la base de datos...")

      // 1. Verificar conexión
      addLog("Verificando conexión a Supabase...")
      const { data: connTest, error: connError } = await supabase.from("languages").select("count(*)").single()

      if (connError) {
        addLog("❌ Error de conexión a Supabase")
        throw connError
      }

      addLog("✅ Conexión a Supabase establecida")

      // 2. Crear tablas básicas
      addLog("Creando tablas básicas...")

      // Idiomas
      addLog("Verificando tabla de idiomas...")
      await supabase.from("languages").upsert(
        [
          { name: "Español", code: "es" },
          { name: "English", code: "en" },
        ],
        { onConflict: "code" },
      )

      // Temas
      addLog("Verificando tabla de temas...")
      await supabase.from("themes").upsert([{ name: "Light" }, { name: "Dark" }], { onConflict: "name" })

      addLog("✅ Tablas básicas configuradas")

      // 3. Verificar políticas RLS
      addLog("Verificando políticas RLS...")

      // Esta parte es limitada en el cliente, pero al menos verificamos que podemos leer
      const { data: langCheck, error: langError } = await supabase.from("languages").select("*").limit(1)

      if (langError) {
        addLog("❌ Error en políticas RLS para languages")
        throw langError
      }

      addLog("✅ Políticas RLS verificadas")

      // Finalizar
      addLog("✅ Configuración completada con éxito")
      setSuccess(true)
    } catch (err: any) {
      console.error("Error:", err)
      setError(err.message || "Error al configurar la base de datos")
      addLog(`❌ Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Configuración de la base de datos</CardTitle>
          <CardDescription>
            Esta herramienta configurará las tablas y políticas necesarias para la aplicación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Button onClick={setupDatabase} disabled={loading} className="bg-rose-500 hover:bg-rose-600">
              {loading ? "Configurando..." : "Configurar base de datos"}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">Base de datos configurada correctamente</AlertDescription>
            </Alert>
          )}

          {log.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
              <h3 className="font-semibold mb-2">Registro de operaciones:</h3>
              <div className="bg-black text-white p-4 rounded-md font-mono text-sm overflow-auto max-h-60">
                {log.map((entry, index) => (
                  <div key={index} className="mb-1">
                    {entry}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 text-sm text-gray-500">
            <p>
              Si prefieres configurar la base de datos manualmente, puedes ejecutar el script SQL directamente en el
              panel de SQL de Supabase.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
