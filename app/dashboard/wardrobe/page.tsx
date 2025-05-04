import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Search,
  Filter,
  Shirt,
  PenIcon as Pants,
  SaladIcon as Dress,
  PocketIcon as Jacket,
  FootprintsIcon as Shoe,
} from "lucide-react"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { redirect } from "next/navigation"

export default async function WardrobePage() {
  // Obtener la sesión actual
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  const userId = session.user.id

  // Obtener categorías y contar prendas por categoría
  const { data: categoryCounts } = await supabase.rpc("get_item_counts_by_category", { user_id_param: userId })

  const categories = [
    { id: "tops", name: "Tops", icon: <Shirt className="h-4 w-4" />, count: 0 },
    { id: "bottoms", name: "Pantalones", icon: <Pants className="h-4 w-4" />, count: 0 },
    { id: "dresses", name: "Vestidos", icon: <Dress className="h-4 w-4" />, count: 0 },
    { id: "outerwear", name: "Abrigos", icon: <Jacket className="h-4 w-4" />, count: 0 },
    { id: "shoes", name: "Zapatos", icon: <Shoe className="h-4 w-4" />, count: 0 },
  ]

  // Actualizar los conteos de categorías con datos reales
  if (categoryCounts) {
    categoryCounts.forEach((item: { category: string; count: number }) => {
      const category = categories.find((c) => c.id === item.category)
      if (category) {
        category.count = item.count
      }
    })
  }

  // Obtener todas las prendas del usuario
  const { data: clothingItems } = await supabase
    .from("items")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mi Armario</h1>
          <p className="text-muted-foreground">Gestiona y organiza todas tus prendas</p>
        </div>
        <Button className="bg-rose-500 hover:bg-rose-600">
          <Plus className="mr-2 h-4 w-4" />
          Añadir prenda
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Categorías</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-md px-3 py-2 bg-muted">
                  <span className="font-medium">Todas</span>
                  <span className="text-muted-foreground">{clothingItems?.length || 0}</span>
                </div>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-muted"
                  >
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <span>{category.name}</span>
                    </div>
                    <span className="text-muted-foreground">{category.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Color</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los colores" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los colores</SelectItem>
                    <SelectItem value="black">Negro</SelectItem>
                    <SelectItem value="white">Blanco</SelectItem>
                    <SelectItem value="blue">Azul</SelectItem>
                    <SelectItem value="red">Rojo</SelectItem>
                    <SelectItem value="beige">Beige</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Marca</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las marcas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las marcas</SelectItem>
                    <SelectItem value="zara">Zara</SelectItem>
                    <SelectItem value="hm">H&M</SelectItem>
                    <SelectItem value="mango">Mango</SelectItem>
                    <SelectItem value="levis">Levi's</SelectItem>
                    <SelectItem value="nike">Nike</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Temporada</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las temporadas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las temporadas</SelectItem>
                    <SelectItem value="spring-summer">Primavera/Verano</SelectItem>
                    <SelectItem value="fall-winter">Otoño/Invierno</SelectItem>
                    <SelectItem value="all-year">Todo el año</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Aplicar filtros
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Mis Prendas</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar prenda..." className="pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="grid" className="space-y-4">
                <div className="flex justify-end">
                  <TabsList>
                    <TabsTrigger value="grid">Cuadrícula</TabsTrigger>
                    <TabsTrigger value="list">Lista</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="grid" className="space-y-4">
                  {clothingItems && clothingItems.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {clothingItems.map((item) => (
                        <div key={item.id} className="border rounded-lg overflow-hidden group">
                          <div className="relative aspect-square">
                            <Image
                              src={item.image_url || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium truncate">{item.name}</h3>
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>{item.brand}</span>
                              <span>{item.color}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="rounded-full bg-muted p-6 mb-4">
                        <Shirt className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No hay prendas en tu armario</h3>
                      <p className="text-muted-foreground mb-4">
                        Comienza a añadir prendas para organizar tu armario digital
                      </p>
                      <Button className="bg-rose-500 hover:bg-rose-600">
                        <Plus className="mr-2 h-4 w-4" />
                        Añadir primera prenda
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="list">
                  {clothingItems && clothingItems.length > 0 ? (
                    <div className="space-y-2">
                      {clothingItems.map((item) => (
                        <div key={item.id} className="flex items-center border rounded-lg p-3 hover:bg-muted/50">
                          <div className="h-16 w-16 relative rounded overflow-hidden mr-4">
                            <Image
                              src={item.image_url || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <div className="text-sm text-muted-foreground">
                              {item.brand} • {item.color} • {item.season}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Ver
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="rounded-full bg-muted p-6 mb-4">
                        <Shirt className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No hay prendas en tu armario</h3>
                      <p className="text-muted-foreground mb-4">
                        Comienza a añadir prendas para organizar tu armario digital
                      </p>
                      <Button className="bg-rose-500 hover:bg-rose-600">
                        <Plus className="mr-2 h-4 w-4" />
                        Añadir primera prenda
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
