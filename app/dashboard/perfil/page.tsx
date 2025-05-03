import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { createServerClient } from "@/lib/supabase/server"
import { ProfileForm } from "@/components/profile-form"
import { VerificationStatus } from "@/components/verification-status"

export default async function ProfilePage() {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return null
  }

  // Obtener perfil del usuario
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  // Obtener solicitud de verificación si existe
  const { data: verificationRequest } = await supabase
    .from("verification_requests")
    .select("*")
    .eq("user_id", session.user.id)
    .order("requested_at", { ascending: false })
    .limit(1)
    .single()

  return (
    <DashboardShell>
      <DashboardHeader heading="Mi Perfil" description="Gestiona tu información personal y verificación" />

      <div className="grid gap-8">
        <ProfileForm profile={profile} />

        <VerificationStatus isVerified={profile?.is_verified || false} verificationRequest={verificationRequest} />
      </div>
    </DashboardShell>
  )
}
