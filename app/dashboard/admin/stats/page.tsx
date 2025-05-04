"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, ShoppingBag, Shirt, Building2, TrendingUp, UserPlus } from "lucide-react"

export default function StatsPage() {
  // Datos simulados para estadísticas
  const overviewStats = {
    totalUsers: 1248,
    activeUsers: 876,
    totalOutfits: 4562,
    totalItems: 15784,
    totalBrands: 32,
    newUsersToday: 24,
  }

  // Datos simulados para gráficos (simplificados)
  const monthlyData = {
    users: [120, 145, 160, 185, 210, 250, 280, 310, 350, 390, 420, 450],
    outfits: [450, 520, 580, 650, 720, 800, 880, 950, 1020, 1100, 1180, 1250],
    items: [1200, 1350, 1500, 1650, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estadísticas</h1>
          <p className="text-muted-foreground">Análisis y métricas de la plataforma</p>
        </div>
        <Select defaultValue="30d">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Últimos 7 días</SelectItem>
            <SelectItem value="30d">Últimos 30 días</SelectItem>
            <SelectItem value="90d">Últimos 90 días</SelectItem>
            <SelectItem value="1y">Último año</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+{overviewStats.newUsersToday}</span> nuevos hoy
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewStats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12%</span> desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Outfits</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewStats.totalOutfits}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+8%</span> desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Prendas</CardTitle>
            <Shirt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewStats.totalItems}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+15%</span> desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Marcas</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewStats.totalBrands}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+4</span> nuevas este mes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Crecimiento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+18.2%</div>
            <p className="text-xs text-muted-foreground">Comparado con el trimestre anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="content">Contenido</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Crecimiento de Usuarios</CardTitle>
              <CardDescription>Nuevos usuarios registrados por mes</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="h-full w-full">
                {/* Aquí iría un gráfico real, pero para simplificar usamos una representación visual básica */}
                <div className="flex h-full items-end gap-2">
                  {monthlyData.users.map((value, index) => (
                    <div
                      key={index}
                      className="relative flex-1 bg-rose-100 dark:bg-rose-950"
                      style={{ height: `${(value / Math.max(...monthlyData.users)) * 100}%` }}
                    >
                      <div className="absolute bottom-0 w-full bg-rose-500" style={{ height: "4px" }}></div>
                      <div className="absolute -top-6 w-full text-center text-xs">{value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                  <span>Ene</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Abr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Ago</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dic</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Rol</CardTitle>
                <CardDescription>Usuarios por tipo de cuenta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Usuarios normales</span>
                      <span className="text-sm font-medium">1184</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-rose-500" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Marcas</span>
                      <span className="text-sm font-medium">32</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-purple-500" style={{ width: "3%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Administradores</span>
                      <span className="text-sm font-medium">8</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: "2%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usuarios Verificados</CardTitle>
                <CardDescription>Proporción de usuarios verificados</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <div className="relative h-40 w-40">
                  <div className="h-40 w-40 rounded-full bg-muted"></div>
                  <div
                    className="absolute top-0 h-40 w-40 rounded-full border-8 border-rose-500"
                    style={{
                      clipPath: "polygon(50% 50%, 100% 0, 100% 100%, 50% 100%)",
                      transform: "rotate(45deg)",
                    }}
                  ></div>
                  <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold">24%</div>
                      <div className="text-sm text-muted-foreground">Verificados</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid w-full grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="font-medium">298</div>
                    <div className="text-xs text-muted-foreground">Usuarios verificados</div>
                  </div>
                  <div>
                    <div className="font-medium">950</div>
                    <div className="text-xs text-muted-foreground">Usuarios no verificados</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contenido Creado</CardTitle>
              <CardDescription>Outfits y prendas añadidos por mes</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="h-full w-full">
                {/* Representación visual simplificada */}
                <div className="flex h-full items-end gap-2">
                  {monthlyData.outfits.map((value, index) => (
                    <div
                      key={index}
                      className="relative flex-1 bg-blue-100 dark:bg-blue-950"
                      style={{ height: `${(value / Math.max(...monthlyData.outfits)) * 100}%` }}
                    >
                      <div className="absolute bottom-0 w-full bg-blue-500" style={{ height: "4px" }}></div>
                      <div className="absolute -top-6 w-full text-center text-xs">{value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                  <span>Ene</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Abr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Ago</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dic</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Categorías Populares</CardTitle>
                <CardDescription>Distribución de prendas por categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tops</span>
                      <span className="text-sm font-medium">5842</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-rose-500" style={{ width: "37%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pantalones</span>
                      <span className="text-sm font-medium">4125</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: "26%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Vestidos</span>
                      <span className="text-sm font-medium">2456</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: "16%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Calzado</span>
                      <span className="text-sm font-medium">2105</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-yellow-500" style={{ width: "13%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Accesorios</span>
                      <span className="text-sm font-medium">1256</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-purple-500" style={{ width: "8%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Outfits por Ocasión</CardTitle>
                <CardDescription>Distribución de outfits por tipo de ocasión</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Casual</span>
                      <span className="text-sm font-medium">2145</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-rose-500" style={{ width: "47%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Trabajo</span>
                      <span className="text-sm font-medium">1256</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: "28%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Formal</span>
                      <span className="text-sm font-medium">685</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Deporte</span>
                      <span className="text-sm font-medium">476</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-yellow-500" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Engagement de Usuarios</CardTitle>
              <CardDescription>Actividad de usuarios en la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2 rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Sesiones diarias</div>
                  <div className="text-2xl font-bold">458</div>
                  <div className="text-xs text-green-500">+12% vs. semana anterior</div>
                </div>
                <div className="space-y-2 rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Tiempo promedio</div>
                  <div className="text-2xl font-bold">12:45</div>
                  <div className="text-xs text-green-500">+3% vs. semana anterior</div>
                </div>
                <div className="space-y-2 rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Outfits compartidos</div>
                  <div className="text-2xl font-bold">124</div>
                  <div className="text-xs text-green-500">+18% vs. semana anterior</div>
                </div>
                <div className="space-y-2 rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Nuevos seguidores</div>
                  <div className="text-2xl font-bold">256</div>
                  <div className="text-xs text-green-500">+8% vs. semana anterior</div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <h3 className="text-lg font-medium">Retención de Usuarios</h3>
                <div className="grid grid-cols-7 gap-2">
                  {[85, 78, 65, 52, 45, 38, 32].map((value, index) => (
                    <div key={index} className="space-y-2">
                      <div className="h-24 w-full rounded-md bg-muted">
                        <div className="rounded-md bg-rose-500" style={{ height: `${value}%`, width: "100%" }}></div>
                      </div>
                      <div className="text-center text-xs text-muted-foreground">
                        {index === 0 ? "1d" : index === 1 ? "7d" : `${index * 7}d`}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Porcentaje de usuarios que regresan después de su primera visita
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
