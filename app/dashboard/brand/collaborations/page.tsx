import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Plus, Users, MessageSquare, Calendar, ArrowRight } from "lucide-react"
import Image from "next/image"
import { VerificationBadge } from "../../components/verification-badge"

export default function BrandCollaborationsPage() {
  // Datos simulados para colaboraciones activas
  const activeCollaborations = [
    {
      id: 1,
      name: "Style Influencer",
      type: "influencer",
      followers: "45K",
      status: "active",
      startDate: "2023-03-15",
      endDate: "2023-06-15",
      image: "/placeholder.svg?height=100&width=100",
      isVerified: true,
      products: 5,
      engagement: "Alto",
    },
    {
      id: 2,
      name: "Fashion Blogger",
      type: "blogger",
      followers: "28K",
      status: "active",
      startDate: "2023-04-01",
      endDate: "2023-07-01",
      image: "/placeholder.svg?height=100&width=100",
      isVerified: true,
      products: 3,
      engagement: "Medio",
    },
    {
      id: 3,
      name: "Trendy Clothes Inc.",
      type: "brand",
      followers: "65K",
      status: "active",
      startDate: "2023-02-10",
      endDate: "2023-08-10",
      image: "/placeholder.svg?height=100&width=100",
      isVerified: true,
      products: 8,
      engagement: "Alto",
    },
  ]

  // Datos simulados para solicitudes de colaboración
  const collaborationRequests = [
    {
      id: 101,
      name: "Fashion Expert",
      type: "influencer",
      followers: "32K",
      requestDate: "2023-05-02",
      image: "/placeholder.svg?height=100&width=100",
      isVerified: true,
      message:
        "Me encantaría colaborar con vuestra marca para crear contenido sobre vuestra nueva colección de verano.",
    },
    {
      id: 102,
      name: "Style Guru",
      type: "blogger",
      followers: "18K",
      requestDate: "2023-05-04",
      image: "/placeholder.svg?height=100&width=100",
      isVerified: false,
      message: "Soy un blogger de moda especializado en estilos minimalistas y me gustaría proponer una colaboración.",
    },
  ]

  // Datos simulados para oportunidades de colaboración
  const collaborationOpportunities = [
    {
      id: 201,
      name: "Summer Fashion Influencer",
      type: "influencer",
      followers: "52K",
      image: "/placeholder.svg?height=100&width=100",
      isVerified: true,
      match: "95%",
      category: "Moda de verano",
    },
    {
      id: 202,
      name: "Urban Style Blogger",
      type: "blogger",
      followers: "38K",
      image: "/placeholder.svg?height=100&width=100",
      isVerified: true,
      match: "87%",
      category: "Moda urbana",
    },
    {
      id: 203,
      name: "Eco Fashion Brand",
      type: "brand",
      followers: "42K",
      image: "/placeholder.svg?height=100&width=100",
      isVerified: true,
      match: "82%",
      category: "Moda sostenible",
    },
    {
      id: 204,
      name: "Minimalist Fashion",
      type: "influencer",
      followers: "25K",
      image: "/placeholder.svg?height=100&width=100",
      isVerified: false,
      match: "78%",
      category: "Moda minimalista",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Colaboraciones</h1>
          <p className="text-muted-foreground">Gestiona tus colaboraciones con influencers y otras marcas</p>
        </div>
        <Button className="bg-rose-500 hover:bg-rose-600">
          <Plus className="mr-2 h-4 w-4" />
          Nueva colaboración
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Activas</TabsTrigger>
          <TabsTrigger value="requests">Solicitudes</TabsTrigger>
          <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar colaboración..." className="pl-8" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeCollaborations.map((collab) => (
              <Card key={collab.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image src={collab.image || "/placeholder.svg"} alt={collab.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <CardTitle className="text-lg">{collab.name}</CardTitle>
                        {collab.isVerified && <VerificationBadge size="sm" />}
                      </div>
                      <CardDescription>
                        {collab.type === "influencer" ? "Influencer" : collab.type === "blogger" ? "Blogger" : "Marca"}
                        {" • "}
                        {collab.followers} seguidores
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Inicio</p>
                        <p className="text-sm font-medium">{collab.startDate}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Fin</p>
                        <p className="text-sm font-medium">{collab.endDate}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Productos</p>
                        <p className="text-sm font-medium">{collab.products}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Engagement</p>
                        <p className="text-sm font-medium">{collab.engagement}</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-1 h-4 w-4" />
                        Mensaje
                      </Button>
                      <Button variant="outline" size="sm">
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {collaborationRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={request.image || "/placeholder.svg"}
                        alt={request.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <CardTitle className="text-lg">{request.name}</CardTitle>
                        {request.isVerified && <VerificationBadge size="sm" />}
                      </div>
                      <CardDescription>
                        {request.type === "influencer"
                          ? "Influencer"
                          : request.type === "blogger"
                            ? "Blogger"
                            : "Marca"}
                        {" • "}
                        {request.followers} seguidores
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Solicitud recibida el {request.requestDate}</p>
                      </div>
                      <div className="rounded-md bg-muted p-3">
                        <p className="text-sm">{request.message}</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Rechazar
                      </Button>
                      <Button className="bg-rose-500 hover:bg-rose-600" size="sm">
                        Aceptar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {collaborationRequests.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-6 mb-4">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No hay solicitudes pendientes</h3>
                  <p className="text-muted-foreground mb-4">
                    Cuando recibas solicitudes de colaboración, aparecerán aquí.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar oportunidades..." className="pl-8" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {collaborationOpportunities.map((opportunity) => (
              <Card key={opportunity.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={opportunity.image || "/placeholder.svg"}
                        alt={opportunity.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <CardTitle className="text-lg">{opportunity.name}</CardTitle>
                        {opportunity.isVerified && <VerificationBadge size="sm" />}
                      </div>
                      <CardDescription>
                        {opportunity.type === "influencer"
                          ? "Influencer"
                          : opportunity.type === "blogger"
                            ? "Blogger"
                            : "Marca"}
                        {" • "}
                        {opportunity.followers} seguidores
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-rose-500">{opportunity.match} coincidencia</Badge>
                        <span className="text-sm">{opportunity.category}</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      Contactar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
