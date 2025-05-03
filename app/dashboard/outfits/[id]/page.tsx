import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { getOutfitById } from "@/lib/data"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil } from "lucide-react"
import Link from "next/link"
import { DeleteOutfitButton } from "@/components/delete-outfit-button"
import { OutfitDisplay } from "@/components/outfit-display"

export default async function OutfitPage({ params }: { params: { id: string } }) {
  const outfit = await getOutfitById(params.id)

  if (!outfit) {
    notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={outfit.name} description="Detalles del outfit">
        <div className="flex gap-2">
          <Link href={`/dashboard/outfits/${outfit.id}/editar`}>
            <Button variant="outline">
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </Link>
          <DeleteOutfitButton id={outfit.id} />
        </div>
      </DashboardHeader>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <OutfitDisplay outfit={outfit} />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Información</h3>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Ocasión</p>
                <p className="font-medium">{outfit.occasion}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Temporada</p>
                <p className="font-medium">{outfit.season}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Etiquetas</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {outfit.tags && outfit.tags.length > 0 ? (
                outfit.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Sin etiquetas</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Descripción</h3>
            <p className="mt-2 text-muted-foreground">{outfit.description || "Sin descripción"}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium">Prendas incluidas</h3>
            <div className="mt-3 space-y-2">
              {outfit.items.map((item) => (
                <Link key={item.id} href={`/dashboard/prendas/${item.id}`}>
                  <div className="flex items-center gap-2 rounded-md border p-2 hover:bg-muted">
                    <div
                      className="h-8 w-8 rounded-md bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.imageUrl || "/placeholder.svg?height=32&width=32"})` }}
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
