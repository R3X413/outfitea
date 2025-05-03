"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Users, Lock, Unlock } from "lucide-react"
import { joinGroup } from "@/lib/supabase/actions"
import { useToast } from "@/hooks/use-toast"

interface GroupCardProps {
  group: {
    id: string
    name: string
    description: string | null
    image_url: string | null
    is_private: boolean
    created_at: string
  }
  role?: string
  isMember: boolean
}

export function GroupCard({ group, role, isMember }: GroupCardProps) {
  const { toast } = useToast()

  const handleJoin = async () => {
    if (group.is_private) {
      toast({
        title: "Grupo privado",
        description: "Este grupo es privado. Necesitas una invitación para unirte.",
      })
      return
    }

    try {
      const result = await joinGroup(group.id)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Te has unido al grupo",
          description: `Ahora eres miembro de ${group.name}.`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al unirte al grupo.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-medium text-lg">{group.name}</h3>
          {group.is_private ? (
            <Badge variant="outline" className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Privado
            </Badge>
          ) : (
            <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
              <Unlock className="h-3 w-3" />
              Público
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{group.description || "Sin descripción"}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-1" />
          <span>Miembros</span>
          {role && (
            <Badge variant="secondary" className="ml-2">
              {role === "admin" ? "Administrador" : "Miembro"}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4">
        {isMember ? (
          <Link href={`/dashboard/grupos/${group.id}`} className="w-full">
            <Button variant="secondary" className="w-full">
              Ver grupo
            </Button>
          </Link>
        ) : (
          <Button className="w-full" onClick={handleJoin} disabled={group.is_private}>
            {group.is_private ? "Grupo privado" : "Unirse"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
