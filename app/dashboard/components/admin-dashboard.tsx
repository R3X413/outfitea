"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Building2, BadgeCheck, BarChart3, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supabase } from "@/lib/supabase"

interface AdminDashboardProps {
  userId: string
}

export function AdminDashboard({ userId }: AdminDashboardProps) {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBrands: 0,
    pendingVerifications: 0,
    activeUsers: 0,
  })

  const [pendingVerifications, setPendingVerifications] = useState<any[]>([])
  const [recentReports, setRecentReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAdminData() {
      setLoading(true)

      try {
        // Obtener estadísticas generales
        const { count: usersCount } = await supabase.from("profiles").select("*", { count: "exact", head: true })

        const { count: brandsCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("role", "brand")

        const { count: verificationsCount } = await supabase
          .from("verification_requests")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending")

        // Calcular usuarios activos (usuarios que han iniciado sesión en los últimos 30 días)
        // Esto es una aproximación, ya que necesitaríamos una tabla de sesiones para ser más precisos
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const { count: activeUsersCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .gte("updated_at", thirtyDaysAgo.toISOString())

        setStats({
          totalUsers: usersCount || 0,
          totalBrands: brandsCount || 0,
          pendingVerifications: verificationsCount || 0,
          activeUsers: activeUsersCount || 0,
        })

        // Obtener verificaciones pendientes
        const { data: verifications } = await supabase
          .from("verification_requests")
          .select(`
            id,
            request_date,
            reason,
            profiles (
              id,
              full_name,
              role,
              followers_count
            )
          `)
          .eq("status", "pending")
          .order("request_date", { ascending: false })
          .limit(4)

        if (verifications) {
          const formattedVerifications = verifications.map((verification) => ({
            id: verification.id,
            name: verification.profiles.full_name,
            type: verification.profiles.role,
            requestDate: new Date(verification.request_date).toISOString().split("T")[0],
            followers: verification.profiles.followers_count,
            reason: verification.reason,
          }))

          setPendingVerifications(formattedVerifications)
        }

        // Obtener reportes recientes
        // Nota: Asumimos que existe una tabla de reportes
        const { data: reports } = await supabase
          .from("reports")
          .select(`
            id,
            type,
            subject,
            status,
            created_at
          `)
          .order("created_at", { ascending: false })
          .limit(3)

        if (reports) {
          const formattedReports = reports.map((report) => ({
            id: report.id,
            type: report.type,
            subject: report.subject,
            status: report.status,
            date: new Date(report.created_at).toISOString().split("T")[0],
          }))

          setRecentReports(formattedReports)
        }
      } catch (error) {
        console.error("Error fetching admin data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAdminData()
  }, [userId])

  if (loading) {
    return <div>Cargando datos del dashboard de administrador...</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Marcas</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBrands}</div>
            <p className="text-xs text-muted-foreground">+4 nuevas este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verificaciones Pendientes</CardTitle>
            <BadgeCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingVerifications}</div>
            <p className="text-xs text-muted-foreground">Solicitudes por revisar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">Activos en los últimos 30 días</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Verificaciones Pendientes</CardTitle>
            <CardDescription>Solicitudes de verificación que requieren revisión</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingVerifications.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fecha de Solicitud</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingVerifications.map((verification) => (
                    <TableRow key={verification.id}>
                      <TableCell className="font-medium">{verification.name}</TableCell>
                      <TableCell>{verification.type === "brand" ? "Marca" : "Usuario"}</TableCell>
                      <TableCell>{verification.requestDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Ver
                          </Button>
                          <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                            Verificar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <p className="text-muted-foreground">No hay verificaciones pendientes</p>
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <Link href="/dashboard/admin/verifications">
                <Button variant="outline">Ver todas</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Reportes Recientes</CardTitle>
            <CardDescription>Reportes de usuarios que requieren atención</CardDescription>
          </CardHeader>
          <CardContent>
            {recentReports.length > 0 ? (
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center">
                    <div className="mr-4 rounded-full p-2 bg-muted">
                      {report.status === "pending" ? (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{report.subject}</p>
                      <p className="text-xs text-muted-foreground">
                        {report.type === "brand" ? "Marca" : "Usuario"} • {report.date}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <Button variant="ghost" size="sm">
                        Revisar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <p className="text-muted-foreground">No hay reportes recientes</p>
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <Button variant="outline">Ver todos</Button>
            </div>
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
              <Link href="/dashboard/admin/users">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <Users className="h-6 w-6" />
                  <span>Gestionar Usuarios</span>
                </Button>
              </Link>
              <Link href="/dashboard/admin/brands">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <Building2 className="h-6 w-6" />
                  <span>Gestionar Marcas</span>
                </Button>
              </Link>
              <Link href="/dashboard/admin/verifications">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <BadgeCheck className="h-6 w-6" />
                  <span>Verificaciones</span>
                </Button>
              </Link>
              <Link href="/dashboard/admin/stats">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <BarChart3 className="h-6 w-6" />
                  <span>Estadísticas</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
