import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { createServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GroupMembers } from "@/components/group-members"
import { GroupSharedOutfits } from "@/components/group-shared-outfits"
import { ShareOutfitButton } from "@/components/share-outfit-button"
import { LeaveGroupButton } from "@/components/leave-group-button"
import { Users, Settings } from "lucide-react"
import Link from "next/link"

export default async function GroupPage({ params }: { params: { id: string } }) {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return null
  }

  // Obtener información del grupo
  const { data: group } = await supabase.from("groups").select("*").eq("id", params.id).single()

  if (!group) {
    notFound()
  }

  // Verificar si el usuario es miembro del grupo
  const { data: membership } = await supabase
    .from("group_members")
    .select("role")
    .eq("group_id", params.id)
    .eq("user_id", session.user.id)
    .single()

  const isAdmin = membership?.role === "admin"
  const isMember = !!membership

  // Si el grupo es privado y el usuario no es miembro, no permitir acceso
  if (group.is_private && !isMember) {
    notFound()
  }

  // Obtener outfits compartidos en el grupo
  const { data: sharedOutfits } = await supabase
    .from("shared_outfits")
    .select(`
      id,
      shared_at,
      shared_by,
      outfit_id,
      outfits (
        id,
        name,
        description,
        tags,
        occasion_id,
        season_id,
        user_id,
        profiles (username, avatar_url)
      )
    `)
    .eq("group_id", params.id)
    .order("shared_at", { ascending: false })

  // Obtener miembros del grupo
  const { data: members } = await supabase
    .from("group_members")
    .select(`
      id,
      role,
      joined_at,
      user_id,
      profiles:user_id (
        username,
        full_name,
        avatar_url,
        is_verified
      )
    `)
    .eq("group_id", params.id)
    .order("role", { ascending: false })
    .order("joined_at", { ascending: true })

  return (
    <DashboardShell>
      <DashboardHeader heading={group.name} description={group.description || "Grupo de compartición de outfits"}>
        <div className="flex gap-2">
          {isMember && <ShareOutfitButton groupId={params.id} userId={session.user.id} />}
          {isMember && !isAdmin && <LeaveGroupButton groupId={params.id} />}
          {isAdmin && (
            <Link href={`/dashboard/grupos/${params.id}/editar`}>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Administrar
              </Button>
            </Link>
          )}
          {!isMember && <Button>Unirse al grupo</Button>}
        </div>
      </DashboardHeader>

      <Tabs defaultValue="outfits" className="mt-6">
        <TabsList>
          <TabsTrigger value="outfits">Outfits compartidos</TabsTrigger>
          <TabsTrigger value="members">
            <Users className="mr-2 h-4 w-4" />
            Miembros ({members?.length || 0})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="outfits" className="space-y-4">
          <GroupSharedOutfits outfits={sharedOutfits || []} isAdmin={isAdmin} />
        </TabsContent>
        <TabsContent value="members">
          <GroupMembers members={members || []} isAdmin={isAdmin} groupId={params.id} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
