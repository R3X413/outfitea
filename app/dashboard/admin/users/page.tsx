import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, User, MoreHorizontal, BadgeCheck } from "lucide-react"
import { VerificationBadge } from "../../components/verification-badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function UsersPage() {
  // Datos simulados para usuarios
  const users = [
    {
      id: 1,
      name: "Ana García",
      email: "ana.garcia@example.com",
      role: "user",
      status: "active",
      joinDate: "2023-01-15",
      isVerified: false,
      outfits: 24,
      items: 78,
    },
    {
      id: 2,
      name: "Carlos López",
      email: "carlos.lopez@example.com",
      role: "user",
      status: "active",
      joinDate: "2023-02-03",
      isVerified: false,
      outfits: 12,
      items: 45,
    },
    {
      id: 3,
      name: "Laura Martínez",
      email: "laura.martinez@example.com",
      role: "user",
      status: "inactive",
      joinDate: "2023-01-20",
      isVerified: false,
      outfits: 8,
      items: 32,
    },
    {
      id: 4,
      name: "Style Influencer",
      email: "style.influencer@example.com",
      role: "user",
      status: "active",
      joinDate: "2022-11-05",
      isVerified: true,
      outfits: 56,
      items: 124,
    },
    {
      id: 5,
      name: "Fashion Brand Co.",
      email: "contact@fashionbrand.com",
      role: "brand",
      status: "active",
      joinDate: "2022-10-12",
      isVerified: true,
      outfits: 0,
      items: 48,
    },
    {
      id: 6,
      name: "Admin User",
      email: "admin@outfitea.com",
      role: "admin",
      status: "active",
      joinDate: "2022-09-01",
      isVerified: true,
      outfits: 5,
      items: 20,
    },
    {
      id: 7,
      name: "Eco Fashion",
      email: "info@ecofashion.com",
      role: "brand",
      status: "pending",
      joinDate: "2023-04-28",
      isVerified: false,
      outfits: 0,
      items: 15,
    },
    {
      id: 8,
      name: "Fashion Blogger",
      email: "blogger@fashion.com",
      role: "user",
      status: "active",
      joinDate: "2023-03-10",
      isVerified: true,
      outfits: 32,
      items: 87,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
        <p className="text-muted-foreground">Administra y supervisa a todos los usuarios de la plataforma</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar usuario..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button className="bg-rose-500 hover:bg-rose-600">Añadir usuario</Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Usuarios</CardTitle>
          <CardDescription>Lista de todos los usuarios registrados en la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="users">Usuarios</TabsTrigger>
              <TabsTrigger value="brands">Marcas</TabsTrigger>
              <TabsTrigger value="admins">Administradores</TabsTrigger>
              <TabsTrigger value="verified">Verificados</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <UsersTable users={users} />
            </TabsContent>

            <TabsContent value="users">
              <UsersTable users={users.filter((user) => user.role === "user")} />
            </TabsContent>

            <TabsContent value="brands">
              <UsersTable users={users.filter((user) => user.role === "brand")} />
            </TabsContent>

            <TabsContent value="admins">
              <UsersTable users={users.filter((user) => user.role === "admin")} />
            </TabsContent>

            <TabsContent value="verified">
              <UsersTable users={users.filter((user) => user.isVerified)} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function UsersTable({ users }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Usuario</TableHead>
          <TableHead>Rol</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Fecha de registro</TableHead>
          <TableHead>Contenido</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-muted p-2">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium flex items-center gap-1">
                    {user.name}
                    {user.isVerified && <VerificationBadge size="sm" />}
                  </div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  user.role === "admin"
                    ? "border-blue-500 text-blue-500"
                    : user.role === "brand"
                      ? "border-purple-500 text-purple-500"
                      : ""
                }
              >
                {user.role === "admin" ? "Administrador" : user.role === "brand" ? "Marca" : "Usuario"}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                className={
                  user.status === "active"
                    ? "bg-green-500"
                    : user.status === "inactive"
                      ? "bg-amber-500"
                      : "bg-blue-500"
                }
              >
                {user.status === "active" ? "Activo" : user.status === "inactive" ? "Inactivo" : "Pendiente"}
              </Badge>
            </TableCell>
            <TableCell>{user.joinDate}</TableCell>
            <TableCell>
              <div className="text-sm">
                <div>{user.items} prendas</div>
                <div>{user.outfits} outfits</div>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                  <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                  <DropdownMenuItem>Editar usuario</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {!user.isVerified && (
                    <DropdownMenuItem className="text-rose-500">
                      <BadgeCheck className="mr-2 h-4 w-4" />
                      Verificar usuario
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="text-red-500">Desactivar cuenta</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
