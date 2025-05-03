import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { createServerClient } from "@/lib/supabase/server"
import { DataTable } from "@/components/data-table"
import { columns } from "./columns"

export default async function AdminUsersPage() {
  const supabase = createServerClient()

  const { data: users } = await supabase
    .from("profiles")
    .select("*, user_settings(language_id, theme_id)")
    .order("created_at", { ascending: false })

  return (
    <DashboardShell>
      <DashboardHeader heading="Gestión de Usuarios" description="Administra los usuarios de la plataforma" />

      <div className="rounded-md border">
        <DataTable columns={columns} data={users || []} />
      </div>
    </DashboardShell>
  )
}
