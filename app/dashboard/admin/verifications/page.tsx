import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Building2, User, BadgeCheck, X } from "lucide-react"

export default function VerificationsPage() {
  // Datos simulados para solicitudes de verificación
  const pendingVerifications = [
    {
      id: 1,
      name: "Fashion Brand Co.",
      type: "brand",
      requestDate: "2023-05-01",
      followers: 15600,
      reason: "Marca oficial de moda con presencia internacional",
    },
    {
      id: 2,
      name: "Style Influencer",
      type: "user",
      requestDate: "2023-05-02",
      followers: 45000,
      reason: "Influencer de moda con más de 45K seguidores",
    },
    {
      id: 3,
      name: "Trendy Clothes Inc.",
      type: "brand",
      requestDate: "2023-05-03",
      followers: 8900,
      reason: "Marca registrada con tiendas físicas",
    },
    {
      id: 4,
      name: "Fashion Blogger",
      type: "user",
      requestDate: "2023-05-04",
      followers: 28000,
      reason: "Blogger de moda reconocido en el sector",
    },
    {
      id: 5,
      name: "Eco Fashion",
      type: "brand",
      requestDate: "2023-05-05",
      followers: 12300,
      reason: "Marca sostenible con certificaciones oficiales",
    },
  ]

  // Datos simulados para verificaciones completadas
  const completedVerifications = [
    {
      id: 101,
      name: "Premium Clothing",
      type: "brand",
      verificationDate: "2023-04-15",
      verifiedBy: "Admin User",
      status: "approved",
    },
    {
      id: 102,
      name: "Fashion Expert",
      type: "user",
      verificationDate: "2023-04-18",
      verifiedBy: "Admin User",
      status: "approved",
    },
    {
      id: 103,
      name: "Style Guru",
      type: "user",
      verificationDate: "2023-04-20",
      verifiedBy: "Admin User",
      status: "rejected",
    },
    {
      id: 104,
      name: "Fake Brand",
      type: "brand",
      verificationDate: "2023-04-22",
      verifiedBy: "Admin User",
      status: "rejected",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Verificaciones</h1>
        <p className="text-muted-foreground">Revisa y gestiona las solicitudes de verificación de usuarios y marcas</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="completed">Completadas</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes Pendientes</CardTitle>
              <CardDescription>Solicitudes de verificación que requieren revisión</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fecha de Solicitud</TableHead>
                    <TableHead>Seguidores</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingVerifications.map((verification) => (
                    <TableRow key={verification.id}>
                      <TableCell className="font-medium">{verification.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {verification.type === "brand" ? (
                            <>
                              <Building2 className="h-4 w-4" />
                              <span>Marca</span>
                            </>
                          ) : (
                            <>
                              <User className="h-4 w-4" />
                              <span>Usuario</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{verification.requestDate}</TableCell>
                      <TableCell>{verification.followers.toLocaleString()}</TableCell>
                      <TableCell className="max-w-xs truncate">{verification.reason}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <X className="h-4 w-4 mr-1" />
                            Rechazar
                          </Button>
                          <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                            <BadgeCheck className="h-4 w-4 mr-1" />
                            Verificar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verificaciones Completadas</CardTitle>
              <CardDescription>Historial de solicitudes de verificación procesadas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Procesado por</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedVerifications.map((verification) => (
                    <TableRow key={verification.id}>
                      <TableCell className="font-medium">{verification.name}</TableCell>
                      <TableCell>{verification.type === "brand" ? "Marca" : "Usuario"}</TableCell>
                      <TableCell>{verification.verificationDate}</TableCell>
                      <TableCell>{verification.verifiedBy}</TableCell>
                      <TableCell>
                        <Badge
                          variant={verification.status === "approved" ? "default" : "destructive"}
                          className={verification.status === "approved" ? "bg-green-500" : ""}
                        >
                          {verification.status === "approved" ? "Aprobado" : "Rechazado"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Ver detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
