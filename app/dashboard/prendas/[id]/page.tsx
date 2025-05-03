import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { getClothingItemById } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil } from "lucide-react"
import Link from "next/link"
import { DeleteClothingItemButton } from "@/components/delete-clothing-item-button"

export default async function ClothingItemPage({ params }: { params: { id: string } }) {
  const item = await getClothingItemById(params.id)

  if (!item) {
    notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={item.name} description="Detalles de la prenda">
        <div className="flex gap-2">
          <Link href={`/dashboard/prendas/${item.id}/editar`}>
            <Button variant="outline">
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </Link>
          <DeleteClothingItemButton id={item.id} />
        </div>
      </DashboardHeader>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <div className="aspect-square relative overflow-hidden rounded-md">
              <Image
                src={item.imageUrl || "/placeholder.svg?height=400&width=400"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Información</h3>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Categoría</p>
                <p className="font-medium">{item.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Color</p>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: item.color }} />
                  <p className="font-medium">{item.colorName}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Temporada</p>
                <p className="font-medium">{item.season}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Marca</p>
                <p className="font-medium">{item.brand || "No especificada"}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Etiquetas</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags && item.tags.length > 0 ? (
                item.tags.map((tag, index) => (
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
            <p className="mt-2 text-muted-foreground">{item.description || "Sin descripción"}</p>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
