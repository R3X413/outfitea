import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { createServerClient } from "@/lib/supabase/server"
import { GroupCard } from "@/components/group-card"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export default async function GroupsPage() {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return null
  }

  // Obtener grupos del usuario
  const { data: userGroups } = await supabase
    .from("group_members")
    .select("group_id, role, groups(*)")
    .eq("user_id", session.user.id)

  // Obtener grupos públicos
  const { data: publicGroups } = await supabase
    .from("groups")
    .select("*")
    .eq("is_private", false)
    .not("id", "in", userGroups?.map((g) => g.group_id) || [])
    .limit(5)

  return (
    <DashboardShell>
      <DashboardHeader heading="Mis Grupos" description="Gestiona tus grupos y comparte outfits con otros usuarios">
        <Link href="/dashboard/grupos/nuevo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Grupo
          </Button>
        </Link>
      </DashboardHeader>

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-medium mb-4">Mis grupos</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {userGroups && userGroups.length > 0 ? (
              userGroups.map((membership) => (
                <GroupCard key={membership.group_id} group={membership.groups} role={membership.role} isMember={true} />
              ))
            ) : (
              <EmptyPlaceholder
                className="col-span-full"
                title="No perteneces a ningún grupo"
                description="Crea un grupo o únete a uno existente para compartir tus outfits."
                action={
                  <Link href="/dashboard/grupos/nuevo">
                    <Button>Crear grupo</Button>
                  </Link>
                }
              />
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Grupos públicos</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {publicGroups && publicGroups.length > 0 ? (
              publicGroups.map((group) => <GroupCard key={group.id} group={group} isMember={false} />)
            ) : (
              <p className="text-muted-foreground">No hay grupos públicos disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
