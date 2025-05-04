import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VerificationBadge } from "../components/verification-badge"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

export default async function BrandsPage() {
  // Obtener marcas destacadas
  const { data: featuredBrands } = await supabase
    .from("brands")
    .select(`
      id,
      name,
      description,
      logo_url,
      is_verified,
      followers_count,
      products_count
    `)
    .order("followers_count", { ascending: false })
    .limit(6)

  // Obtener colaboraciones destacadas
  const { data: featuredCollaborations } = await supabase
    .from("collaborations")
    .select(`
      id,
      brand_id,
      collaborator_id,
      brands!brand_id (
        id,
        name,
        is_verified
      ),
      profiles!collaborator_id (
        id,
        full_name,
        is_verified
      ),
      description
    `)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(2)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Marcas Destacadas</h1>
        <p className="text-muted-foreground">Descubre y colabora con las mejores marcas de moda</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredBrands?.map((brand) => (
          <Card key={brand.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden border">
                  <Image
                    src={brand.logo_url || "/placeholder.svg"}
                    alt={`${brand.name} logo`}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <CardTitle className="text-lg">{brand.name}</CardTitle>
                    {brand.is_verified && <VerificationBadge size="sm" />}
                  </div>
                  <CardDescription className="text-xs">
                    {brand.followers_count.toLocaleString()} seguidores • {brand.products_count} productos
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{brand.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-3 border-t">
              <Button variant="outline" size="sm">
                Ver perfil
              </Button>
              <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                Seguir
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Colaboraciones Destacadas</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredCollaborations?.map((collab) => (
            <Card key={collab.id}>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Colaboración destacada"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">
                      {collab.brands.name} x {collab.profiles.full_name}
                    </h3>
                    {(collab.brands.is_verified || collab.profiles.is_verified) && <VerificationBadge size="sm" />}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {collab.description || "Colección exclusiva en colaboración."}
                  </p>
                  <Button className="bg-rose-500 hover:bg-rose-600">Ver colección</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">¿Eres una marca?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Únete a nuestra plataforma y conecta con miles de usuarios interesados en moda. Promociona tus productos y
          colabora con influencers.
        </p>
        <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
          Registrar mi marca
        </Button>
      </div>
    </div>
  )
}
