"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { CheckCircle, MoreHorizontal, UserMinus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface GroupMembersProps {
  members: Array<{
    id: string
    role: string
    joined_at: string
    user_id: string
    profiles: {
      username: string
      full_name: string | null
      avatar_url: string | null
      is_verified: boolean
    }
  }>
  isAdmin: boolean
  groupId: string
}

export function GroupMembers({ members, isAdmin, groupId }: GroupMembersProps) {
  const { toast } = useToast()

  const handleAction = (action: string, memberId: string) => {
    toast({
      title: "Acción no implementada",
      description: `La acción "${action}" será implementada próximamente.`,
    })
  }

  if (members.length === 0) {
    return <p className="text-muted-foreground py-4">Este grupo no tiene miembros.</p>
  }

  return (
    <div className="space-y-4">
      {members.map((member) => (
        <Card key={member.id}>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={member.profiles.avatar_url || "/placeholder.svg?height=40&width=40"}
                  alt={member.profiles.username}
                />
                <AvatarFallback>{member.profiles.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{member.profiles.username}</p>
                  {member.profiles.is_verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                </div>
                <p className="text-sm text-muted-foreground">{member.profiles.full_name || ""}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant={member.role === "admin" ? "default" : "outline"}>
                {member.role === "admin" ? "Administrador" : "Miembro"}
              </Badge>
              <p className="text-xs text-muted-foreground hidden md:block">
                Miembro desde {formatDate(member.joined_at)}
              </p>

              {isAdmin && member.role !== "admin" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Acciones</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleAction("Hacer administrador", member.id)}>
                      Hacer administrador
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleAction("Eliminar del grupo", member.id)}
                      className="text-destructive"
                    >
                      <UserMinus className="mr-2 h-4 w-4" />
                      <span>Eliminar del grupo</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
