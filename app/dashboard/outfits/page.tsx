import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Plus, Search, Heart, Calendar, Share2 } from "lucide-react"
import Image from "next/image"

export default function OutfitsPage() {
  // Datos simulados para outfits
  const outfits = [
    {
      id: 1,
      name: "Casual de oficina",
      description: "Perfecto para un día normal de trabajo",
      season: "Primavera/Verano",
      occasion: "Trabajo",
      items: 4,
      image: "/placeholder.svg?height=400&width=300",
      isFavorite: true,
      isPlanned: true,
    },
    {
      id: 2,
      name: "Noche elegante",
      description: "Para una cena o evento especial",
      season: "Todas",
      occasion: "Formal",
      items: 5,
      image: "/placeholder.svg?height=400&width=300",
      isFavorite: true,
      isPlanned: false,
    },
    {
      id: 3,
      name: "Fin de semana casual",
      description: "Cómodo y estiloso para el fin de semana",
      season: "Primavera/Verano",
      occasion: "Casual",
      items: 3,
      image: "/placeholder.svg?height=400&width=300",
      isFavorite: false,
      isPlanned: false,
    },
    {
      id: 4,
      name: "Deportivo",
      description: "Para ir al gimnasio o hacer deporte",
      season: "Todas",
      occasion: "Deporte",
      items: 4,
      image: "/placeholder.svg?height=400&width=300",
      isFavorite: false,
      isPlanned: true,
    },
    {
      id: 5,
      name: "Reunión importante",
      description: "Para causar buena impresión en reuniones",
      season: "Otoño/Invierno",
      occasion: "Trabajo",
      items: 5,
      image: "/placeholder.svg?height=400&width=300",
      isFavorite: true,
      isPlanned: true,
    },
    {
      id: 6,
      name: "Salida con amigos",
      description: "Informal pero con estilo",
      season: "Primavera/Verano",
      occasion: "Casual",
      items: 4,
      image: "/placeholder.svg?height=400&width=300",
      isFavorite: false,
      isPlanned: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mis Outfits</h1>
          <p className="text-muted-foreground">Gestiona y organiza tus combinaciones de ropa</p>
        </div>
        <Button className="bg-rose-500 hover:bg-rose-600">
          <Plus className="mr-2 h-4 w-4" />
          Crear outfit
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>Todos mis outfits</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar outfit..." className="pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="favorites">Favoritos</TabsTrigger>
              <TabsTrigger value="planned">Planificados</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {outfits.map((outfit) => (
                  <OutfitCard key={outfit.id} outfit={outfit} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="favorites" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {outfits
                  .filter((outfit) => outfit.isFavorite)
                  .map((outfit) => (
                    <OutfitCard key={outfit.id} outfit={outfit} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="planned" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {outfits
                  .filter((outfit) => outfit.isPlanned)
                  .map((outfit) => (
                    <OutfitCard key={outfit.id} outfit={outfit} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function OutfitCard({ outfit }) {
  return (
    <div className="border rounded-lg overflow-hidden group">
      <div className="relative aspect-[3/4]">
        <Image
          src={outfit.image || "/placeholder.svg"}
          alt={outfit.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {outfit.isFavorite && (
            <div className="bg-white/80 dark:bg-black/60 rounded-full p-1.5">
              <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
            </div>
          )}
          {outfit.isPlanned && (
            <div className="bg-white/80 dark:bg-black/60 rounded-full p-1.5">
              <Calendar className="h-4 w-4 text-blue-500" />
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg">{outfit.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{outfit.description}</p>
        <div className="flex justify-between text-sm">
          <span>{outfit.occasion}</span>
          <span>{outfit.season}</span>
        </div>
        <div className="flex justify-between mt-4">
          <Button variant="outline" size="sm">
            <Heart className={`mr-1 h-4 w-4 ${outfit.isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
            {outfit.isFavorite ? "Favorito" : "Favorito"}
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-1 h-4 w-4" />
            Compartir
          </Button>
        </div>
      </div>
    </div>
  )
}
