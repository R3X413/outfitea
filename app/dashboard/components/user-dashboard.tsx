"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shirt, Calendar, ImageIcon, Plus, Clock } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

interface UserDashboardProps {
  userId: string
}

export function UserDashboard({ userId }: UserDashboardProps) {
  const [stats, setStats] = useState({
    totalItems: 0,
    totalOutfits: 0,
    plannedDays: 0,
    favorites: 0,
  })

  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [upcomingOutfits, setUpcomingOutfits] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true)

      try {
        // Obtener el total de prendas
        const { count: itemsCount } = await supabase
          .from("items")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId)

        // Obtener el total de outfits
        const { count: outfitsCount } = await supabase
          .from("outfits")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId)

        // Obtener el total de días planificados
        const { count: plannedDaysCount } = await supabase
          .from("calendar_events")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId)
          .gte("date", new Date().toISOString().split("T")[0])

        // Obtener el total de outfits favoritos
        const { count: favoritesCount } = await supabase
          .from("outfits")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId)
          .eq("is_favorite", true)

        setStats({
          totalItems: itemsCount || 0,
          totalOutfits: outfitsCount || 0,
          plannedDays: plannedDaysCount || 0,
          favorites: favoritesCount || 0,
        })

        // Obtener actividad reciente (últimos outfits y prendas añadidos)
        const { data: recentOutfits } = await supabase
          .from("outfits")
          .select("id, name, created_at")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(2)

        const { data: recentItems } = await supabase
          .from("items")
          .select("id, name, created_at")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(2)

        // Combinar y ordenar por fecha
        const combinedActivity = [
          ...(recentOutfits || []).map((item) => ({ ...item, type: "outfit" })),
          ...(recentItems || []).map((item) => ({ ...item, type: "item" })),
        ]
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 4)
          .map((item) => ({
            ...item,
            date: formatRelativeTime(new Date(item.created_at)),
          }))

        setRecentActivity(combinedActivity)

        // Obtener próximos outfits planificados
        const { data: calendarEvents } = await supabase
          .from("calendar_events")
          .select(`
            id,
            date,
            outfits (
              id,
              name
            )
          `)
          .eq("user_id", userId)
          .gte("date", new Date().toISOString().split("T")[0])
          .order("date", { ascending: true })
          .limit(3)

        if (calendarEvents) {
          const formattedEvents = calendarEvents.map((event) => ({
            id: event.outfits.id,
            name: event.outfits.name,
            date: formatDate(new Date(event.date)),
          }))

          setUpcomingOutfits(formattedEvents)
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [userId])

  // Función para formatear fechas relativas
  function formatRelativeTime(date: Date) {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "Hace unos segundos"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `Hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `Hace ${hours} ${hours === 1 ? "hora" : "horas"}`
    } else {
      const days = Math.floor(diffInSeconds / 86400)
      return `Hace ${days} ${days === 1 ? "día" : "días"}`
    }
  }

  // Función para formatear fechas
  function formatDate(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    }
    return date.toLocaleDateString("es-ES", options)
  }

  if (loading) {
    return <div>Cargando datos del dashboard...</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prendas</CardTitle>
            <Shirt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalItems}</div>
            <p className="text-xs text-muted-foreground">prendas en tu armario</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outfits</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOutfits}</div>
            <p className="text-xs text-muted-foreground">outfits creados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planificados</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.plannedDays}</div>
            <p className="text-xs text-muted-foreground">días con outfit planificado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favoritos</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.favorites}</div>
            <p className="text-xs text-muted-foreground">outfits favoritos</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Tu actividad en los últimos días</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center">
                    <div className="mr-4 rounded-full p-2 bg-muted">
                      {activity.type === "outfit" ? <ImageIcon className="h-4 w-4" /> : <Shirt className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.name}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                    <div className="ml-auto font-medium">
                      <Link
                        href={
                          activity.type === "outfit"
                            ? `/dashboard/outfits/${activity.id}`
                            : `/dashboard/wardrobe/${activity.id}`
                        }
                      >
                        <Button variant="ghost" size="sm">
                          Ver
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <p className="text-muted-foreground">No hay actividad reciente</p>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Próximos Outfits</CardTitle>
            <CardDescription>Outfits planificados para los próximos días</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingOutfits.length > 0 ? (
              <div className="space-y-4">
                {upcomingOutfits.map((outfit) => (
                  <div key={outfit.id} className="flex items-center">
                    <div className="mr-4 rounded-full p-2 bg-muted">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{outfit.name}</p>
                      <p className="text-xs text-muted-foreground">{outfit.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <p className="text-muted-foreground">No hay outfits planificados</p>
                <Link href="/dashboard/calendar">
                  <Button variant="link" className="mt-2">
                    Planificar outfit
                  </Button>
                </Link>
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
              <Link href="/dashboard/wardrobe">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <Shirt className="h-6 w-6" />
                  <span>Ver Armario</span>
                </Button>
              </Link>
              <Link href="/dashboard/outfits">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <ImageIcon className="h-6 w-6" />
                  <span>Ver Outfits</span>
                </Button>
              </Link>
              <Link href="/dashboard/wardrobe/add">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <Plus className="h-6 w-6" />
                  <span>Añadir Prenda</span>
                </Button>
              </Link>
              <Link href="/dashboard/calendar">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <Calendar className="h-6 w-6" />
                  <span>Planificar</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
