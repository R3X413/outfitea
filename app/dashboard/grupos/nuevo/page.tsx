import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { GroupForm } from "@/components/group-form"

export default function NewGroupPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Nuevo Grupo" description="Crea un grupo para compartir outfits con otros usuarios" />
      <div className="grid gap-8">
        <GroupForm />
      </div>
    </DashboardShell>
  )
}
