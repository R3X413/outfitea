import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { createServerClient } from "@/lib/supabase/server"
import { SettingsForm } from "@/components/settings-form"
import { getLanguages } from "@/lib/i18n"
import { getThemes } from "@/lib/themes"

export default async function SettingsPage() {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return null
  }

  // Obtener configuración del usuario
  const { data: settings } = await supabase
    .from("user_settings")
    .select("*, languages(*), themes(*)")
    .eq("user_id", session.user.id)
    .single()

  // Obtener idiomas y temas disponibles
  const languages = await getLanguages()
  const themes = await getThemes()

  return (
    <DashboardShell>
      <DashboardHeader heading="Ajustes" description="Gestiona tus preferencias de la aplicación" />

      <div className="grid gap-8">
        <SettingsForm settings={settings} languages={languages} themes={themes} />
      </div>
    </DashboardShell>
  )
}
