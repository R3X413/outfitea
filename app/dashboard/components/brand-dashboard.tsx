"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shirt, Users, BarChart3, Eye, MessageSquare } from "lucide-react"
import Link from "next/link"
import { VerificationBadge } from "./verification-badge"
import { supabase } from "@/lib/supabase"

interface BrandDashboardProps {
  userId: string
  isVerified: boolean
}

export function BrandDashboard({ userId, isVerified }: BrandDashboardProps) {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalViews: 0,
    totalCollaborations: 0,
    totalMessages: 0,
  })

  const [featuredProducts, setFeaturedProducts] = useState<any[]>([])
  const [collaborationRequests, setCollaborationRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [brandId, setBrandId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBrandData() {
      setLoading(true)

      try {
        // Primero, obtener el ID de la marca asociada al usuario
        const { data: brandData } = await supabase.from("brands").select("id").eq("user_id", userId).single()

        if (!brandData) {
          console.error("No brand found for this user")
          return
        }

        const brand_id = brandData.id
        setBrandId(brand_id)

        // Obtener estadísticas de productos
        const { count: productsCount } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true })
          .eq("brand_id", brand_id)

        // Obtener total de vistas (suma de vistas de todos los productos)
        const { data: viewsData } = await supabase.from("products").select("views").eq("brand_id", brand_id)

        const totalViews = viewsData ? viewsData.reduce((sum, product) => sum + (product.views || 0), 0) : 0

        // Obtener total de colaboraciones activas
        const { count: collaborationsCount } = await supabase
          .from("collaborations")
          .select("*", { count: "exact", head: true })
          .eq("brand_id", brand_id)
          .eq("status", "active")

        // Obtener total de mensajes sin leer (asumimos que existe una tabla de mensajes)
        const { count: messagesCount } = await supabase
          .from("messages")
          .select("*", { count: "exact", head: true })
          .eq("recipient_id", brand_id)
          .eq("read", false)

        setStats({
          totalProducts: productsCount || 0,
          totalViews: totalViews,
          totalCollaborations: collaborationsCount || 0,
          totalMessages: messagesCount || 0,
        })

        // Obtener productos destacados (los más vistos)
        const { data: products } = await supabase
          .from("products")
          .select("id, name, views, saves")
          .eq("brand_id", brand_id)
          .order("views", { ascending: false })
          .limit(4)

        if (products) {
          setFeaturedProducts(products)
        }

        // Obtener solicitudes de colaboración pendientes
        const { data: requests } = await supabase
          .from("collaboration_requests")
          .select(`
            id,
            status,
            profiles (
              id,
              full_name,
              followers_count
            )
          `)
          .eq("brand_id", brand_id)
          .eq("status", "pending")
          .limit(2)

        if (requests) {
          const formattedRequests = requests.map((request) => ({
            id: request.id,
            name: request.profiles.full_name,
            followers: `${Math.floor(request.profiles.followers_count / 1000)}K`,
            status: request.status,
          }))

          setCollaborationRequests(formattedRequests)
        }
      } catch (error) {
        console.error("Error fetching brand data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBrandData()
  }, [userId])

  async function handleVerificationRequest() {
    if (!brandId) return

    try {
      // Crear una solicitud de verificación
      await supabase.from("verification_requests").insert({
        user_id: userId,
        request_date: new Date().toISOString(),
        status: "pending",
        reason: "Solicitud de verificación de marca",
      })

      alert("Solicitud de verificación enviada correctamente")
    } catch (error) {
      console.error("Error sending verification request:", error)
      alert("Error al enviar la solicitud de verificación")
    }
  }

  if (loading) {
    return <div>Cargando datos del dashboard de marca...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Panel de Marca</h2>
        {isVerified ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Cuenta verificada</span>
            <VerificationBadge />
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={handleVerificationRequest}>
            Solicitar verificación
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos</CardTitle>
            <Shirt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">productos en catálogo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizaciones</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews}</div>
            <p className="text-xs text-muted-foreground">en los últimos 30 días</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Colaboraciones</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCollaborations}</div>
            <p className="text-xs text-muted-foreground">colaboraciones activas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensajes</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMessages}</div>
            <p className="text-xs text-muted-foreground">mensajes sin leer</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Productos Destacados</CardTitle>
            <CardDescription>Tus productos más populares</CardDescription>
          </CardHeader>
          <CardContent>
            {featuredProducts.length > 0 ? (
              <div className="space-y-4">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="flex items-center">
                    <div className="mr-4 rounded-full p-2 bg-muted">
                      <Shirt className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.views} vistas • {product.saves} guardados
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <Link href={`/dashboard/brand/products/${product.id}`}>
                        <Button variant="ghost" size="sm">
                          Ver detalles
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <p className="text-muted-foreground">No hay productos destacados</p>
                <Link href="/dashboard/brand/products/add">
                  <Button variant="link" className="mt-2">
                    Añadir producto
                  </Button>
                </Link>
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <Link href="/dashboard/brand/products">
                <Button variant="outline">Ver todos</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Solicitudes de Colaboración</CardTitle>
            <CardDescription>Influencers interesados en colaborar</CardDescription>
          </CardHeader>
          <CardContent>
            {collaborationRequests.length > 0 ? (
              <div className="space-y-4">
                {collaborationRequests.map((request) => (
                  <div key={request.id} className="flex items-center">
                    <div className="mr-4 rounded-full p-2 bg-muted">
                      <Users className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{request.name}</p>
                      <p className="text-xs text-muted-foreground">{request.followers} seguidores</p>
                    </div>
                    <div className="ml-auto flex gap-2">
                      <Button variant="outline" size="sm">
                        Rechazar
                      </Button>
                      <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                        Aceptar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <p className="text-muted-foreground">No hay solicitudes pendientes</p>
                <Button variant="link" className="mt-2">
                  Explorar influencers
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/dashboard/brand/products">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <Shirt className="h-6 w-6" />
                  <span>Mis Productos</span>
                </Button>
              </Link>
              <Link href="/dashboard/brand/stats">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <BarChart3 className="h-6 w-6" />
                  <span>Estadísticas</span>
                </Button>
              </Link>
              <Link href="/dashboard/brand/collaborations">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <Users className="h-6 w-6" />
                  <span>Colaboraciones</span>
                </Button>
              </Link>
              <Link href="/dashboard/brand/messages">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <MessageSquare className="h-6 w-6" />
                  <span>Mensajes</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
