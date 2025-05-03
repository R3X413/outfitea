import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shirt, Palette, Calendar } from "lucide-react"
import { getClothingItems, getOutfits } from "@/lib/data"
import { ClothingItemCard } from "@/components/clothing-item-card"
import { OutfitCard } from "@/components/outfit-card"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const clothingItems = await getClothingItems()
  const outfits = await getOutfits()

  const recentItems = clothingItems.slice(0, 4)
  const recentOutfits = outfits.slice(0, 4)

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" description="Gestiona tu armario digital y tus outfits" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Prendas</CardTitle>
            <Shirt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clothingItems.length}</div>
            <p className="text-xs text-muted-foreground">Prendas en tu armario digital</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Outfits</CardTitle>
            <Palette className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outfits.length}</div>
            <p className="text-xs text-muted-foreground">Combinaciones creadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximos Eventos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Eventos planificados</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recientes" className="mt-6">
        <TabsList>
          <TabsTrigger value="recientes">Recientes</TabsTrigger>
          <TabsTrigger value="outfits">Outfits</TabsTrigger>
        </TabsList>
        <TabsContent value="recientes" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentItems.length > 0 ? (
              recentItems.map((item) => <ClothingItemCard key={item.id} item={item} />)
            ) : (
              <EmptyPlaceholder
                className="col-span-full"
                title="No hay prendas"
                description="Comienza a agregar prendas a tu armario digital."
                action={
                  <Link href="/dashboard/prendas/nueva">
                    <Button>Agregar prenda</Button>
                  </Link>
                }
              />
            )}
          </div>
          {clothingItems.length > 4 && (
            <div className="flex justify-end">
              <Link href="/dashboard/prendas">
                <Button variant="outline">Ver todas las prendas</Button>
              </Link>
            </div>
          )}
        </TabsContent>
        <TabsContent value="outfits" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentOutfits.length > 0 ? (
              recentOutfits.map((outfit) => <OutfitCard key={outfit.id} outfit={outfit} />)
            ) : (
              <EmptyPlaceholder
                className="col-span-full"
                title="No hay outfits"
                description="Comienza a crear combinaciones con tus prendas."
                action={
                  <Link href="/dashboard/outfits/nuevo">
                    <Button>Crear outfit</Button>
                  </Link>
                }
              />
            )}
          </div>
          {outfits.length > 3 && (
            <div className="flex justify-end">
              <Link href="/dashboard/outfits">
                <Button variant="outline">Ver todos los outfits</Button>
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
