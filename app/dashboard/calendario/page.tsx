import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getOutfits } from "@/lib/data"

export default async function CalendarPage() {
  const outfits = await getOutfits()

  return (
    <DashboardShell>
      <DashboardHeader heading="Calendario" description="Planifica tus outfits para cada día" />

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <Card>
          <CardHeader>
            <CardTitle>Calendario de outfits</CardTitle>
            <CardDescription>Selecciona un día para asignar o ver un outfit</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" className="mx-auto" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Outfits planificados</CardTitle>
            <CardDescription>Próximos outfits asignados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-muted-foreground">No hay outfits planificados</div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
