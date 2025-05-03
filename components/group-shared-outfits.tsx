"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { OutfitDisplay } from "@/components/outfit-display"
import { useToast } from "@/hooks/use-toast"
import { Trash } from "lucide-react"

interface GroupSharedOutfitsProps {
  outfits: Array<{
    id: string
    shared_at: string
    shared_by: string
    outfit_id: string
    outfits: {
      id: string
      name: string
      description: string | null
      tags: string[] | null
      occasion_id: string
      season_id: string
      user_id: string
      profiles: {
        username: string
        avatar_url: string | null
      }
    }
  }>
  isAdmin: boolean
}

export function GroupSharedOutfits({ outfits, isAdmin }: GroupSharedOutfitsProps) {
  const { toast } = useToast()

  const handleRemove = (id: string) => {
    toast({
      title: "Acción no implementada",
      description: "La eliminación de outfits compartidos será implementada próximamente.",
    })
  }

  if (outfits.length === 0) {
    return <p className="text-muted-foreground py-4">No hay outfits compartidos en este grupo.</p>
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {outfits.map((shared) => (
        <Card key={shared.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={shared.outfits.profiles.avatar_url || "/placeholder.svg?height=24&width=24"}
                    alt={shared.outfits.profiles.username}
                  />
                  <AvatarFallback>{shared.outfits.profiles.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{shared.outfits.profiles.username}</span>
              </div>
              <span className="text-xs text-muted-foreground">{formatDate(shared.shared_at)}</span>
            </div>

            <Link href={`/dashboard/outfits/${shared.outfit_id}`}>
              <div className="aspect-square relative">
                <OutfitDisplay
                  outfit={{
                    ...shared.outfits,
                    items: [], // Aquí deberíamos cargar los items del outfit
                    season: "",
                    occasion: "",
                  }}
                />
              </div>

              <h3 className="font-medium mt-3">{shared.outfits.name}</h3>

              {shared.outfits.tags && shared.outfits.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {shared.outfits.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </Link>
          </CardContent>

          {isAdmin && (
            <CardFooter className="bg-muted/50 p-2 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => handleRemove(shared.id)}
              >
                <Trash className="h-4 w-4 mr-1" />
                Eliminar
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  )
}
