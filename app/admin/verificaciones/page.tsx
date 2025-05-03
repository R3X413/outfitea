import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { createServerClient } from "@/lib/supabase/server"
import { VerificationRequestList } from "@/components/verification-request-list"

export default async function AdminVerificationsPage() {
  const supabase = createServerClient()

  const { data: pendingRequests } = await supabase
    .from("verification_requests")
    .select("*, profiles(username, full_name, avatar_url)")
    .eq("status", "pending")
    .order("requested_at", { ascending: false })

  const { data: processedRequests } = await supabase
    .from("verification_requests")
    .select("*, profiles(username, full_name, avatar_url)")
    .neq("status", "pending")
    .order("processed_at", { ascending: false })
    .limit(10)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Solicitudes de Verificación"
        description="Gestiona las solicitudes de verificación de usuarios"
      />

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-medium mb-4">Solicitudes pendientes</h2>
          <VerificationRequestList requests={pendingRequests || []} />
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Solicitudes procesadas recientemente</h2>
          <VerificationRequestList requests={processedRequests || []} />
        </div>
      </div>
    </DashboardShell>
  )
}
