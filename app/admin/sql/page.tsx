"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"

export default function SqlPage() {
  const [sql, setSql] = useState(`-- Inserta aquí tu SQL`)
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  async function executeSql() {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.rpc("execute_sql", { sql_query: sql })

      if (error) throw error

      setResult({
        success: true,
        data,
      })
    } catch (error: any) {
      console.error("Error al ejecutar SQL:", error)
      setResult({
        success: false,
        error: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Ejecutar SQL</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Editor SQL</CardTitle>
          <CardDescription>Ejecuta consultas SQL directamente en tu base de datos Supabase</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            className="min-h-[300px] font-mono text-sm mb-4"
          />
          <Button onClick={executeSql} disabled={isLoading}>
            {isLoading ? "Ejecutando..." : "Ejecutar SQL"}
          </Button>

          {result && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Resultado:</h3>
              <div
                className={`p-4 rounded-md ${
                  result.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                }`}
              >
                {result.success ? (
                  <pre className="text-xs overflow-auto">{JSON.stringify(result.data, null, 2)}</pre>
                ) : (
                  <p className="text-red-600">{result.error}</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instrucciones</CardTitle>
          <CardDescription>Cómo usar el editor SQL</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Escribe o pega tu consulta SQL en el editor.</li>
            <li>Haz clic en "Ejecutar SQL" para ejecutar la consulta.</li>
            <li>Los resultados se mostrarán debajo del botón.</li>
            <li>
              <strong>Importante:</strong> Asegúrate de que tu usuario tiene los permisos necesarios para ejecutar las
              consultas.
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
