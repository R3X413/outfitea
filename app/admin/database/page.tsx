"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DatabaseSetupPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [results, setResults] = useState<any>(null)

  async function setupDatabase() {
    setStatus("loading")
    try {
      const response = await fetch("/api/setup-database")
      const data = await response.json()
      setResults(data)
      setStatus("success")
    } catch (error) {
      console.error("Error al configurar la base de datos:", error)
      setStatus("error")
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Configuración de la Base de Datos</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Verificar y Configurar Base de Datos</CardTitle>
          <CardDescription>
            Esta herramienta verifica y configura las tablas y datos iniciales necesarios para la aplicación.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={setupDatabase} disabled={status === "loading"}>
            {status === "loading" ? "Configurando..." : "Configurar Base de Datos"}
          </Button>

          {status === "success" && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Resultados:</h3>
              <div className="bg-gray-100 p-4 rounded-md">
                <pre className="text-xs overflow-auto">{JSON.stringify(results, null, 2)}</pre>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="mt-4 text-red-500">
              Ocurrió un error al configurar la base de datos. Verifica la consola para más detalles.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instrucciones</CardTitle>
          <CardDescription>Pasos para configurar correctamente la base de datos</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Asegúrate de que las tablas necesarias existen en tu base de datos Supabase.</li>
            <li>Verifica que las políticas de seguridad estén configuradas correctamente.</li>
            <li>Haz clic en el botón "Configurar Base de Datos" para verificar y crear los datos iniciales.</li>
            <li>Si hay errores, revisa los mensajes y corrige los problemas en tu base de datos Supabase.</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
