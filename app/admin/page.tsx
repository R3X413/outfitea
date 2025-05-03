import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createServerClient } from "@/lib/supabase/server"
import { Users, AlertCircle, BarChart, Shirt } from "lucide-react"

export default async function AdminDashboardPage() {
  const supabase = createServerClient()

  // Obtener estadísticas
  const { count: usersCount } = await supabase.from("profiles").select("*", { count: "exact", head: true })

  const { count: pendingVerifications } = await supabase
    .from("verification_requests")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  const { count: clothingItemsCount } = await supabase
    .from("clothing_items")
    .select("*", { count: "exact", head: true })

  const { count: outfitsCount } = await supabase.from("outfits").select("*", { count: "exact", head: true })

  return (
    <DashboardShell>
      <DashboardHeader heading="Panel de Administración" description="Gestiona usuarios, verificaciones y más" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersCount}</div>
            <p className="text-xs text-muted-foreground">Usuarios registrados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verificaciones Pendientes</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingVerifications}</div>
            <p className="text-xs text-muted-foreground">Solicitudes por procesar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Prendas</CardTitle>
            <Shirt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clothingItemsCount}</div>
            <p className="text-xs text-muted-foreground">Prendas registradas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Outfits</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outfitsCount}</div>
            <p className="text-xs text-muted-foreground">Outfits creados</p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
