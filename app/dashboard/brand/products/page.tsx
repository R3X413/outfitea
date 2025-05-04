import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, MoreHorizontal, Eye, Shirt } from "lucide-react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function BrandProductsPage() {
  // Datos simulados para productos
  const products = [
    {
      id: 1,
      name: "Camiseta Premium",
      category: "Tops",
      status: "active",
      price: "29.99€",
      stock: 120,
      views: 342,
      saves: 56,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Jeans Slim Fit",
      category: "Pantalones",
      status: "active",
      price: "59.99€",
      stock: 85,
      views: 289,
      saves: 42,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Chaqueta de Invierno",
      category: "Abrigos",
      status: "active",
      price: "89.99€",
      stock: 45,
      views: 187,
      saves: 28,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "Vestido de Verano",
      category: "Vestidos",
      status: "active",
      price: "49.99€",
      stock: 60,
      views: 156,
      saves: 19,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      name: "Zapatillas Casual",
      category: "Calzado",
      status: "low_stock",
      price: "69.99€",
      stock: 10,
      views: 134,
      saves: 15,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 6,
      name: "Camisa Formal",
      category: "Tops",
      status: "out_of_stock",
      price: "45.99€",
      stock: 0,
      views: 98,
      saves: 12,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 7,
      name: "Pantalón Chino",
      category: "Pantalones",
      status: "active",
      price: "49.99€",
      stock: 75,
      views: 112,
      saves: 18,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 8,
      name: "Sudadera con Capucha",
      category: "Tops",
      status: "active",
      price: "39.99€",
      stock: 95,
      views: 145,
      saves: 22,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mis Productos</h1>
          <p className="text-muted-foreground">Gestiona y supervisa todos tus productos</p>
        </div>
        <Button className="bg-rose-500 hover:bg-rose-600">
          <Plus className="mr-2 h-4 w-4" />
          Añadir producto
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar producto..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Exportar</Button>
          <Button variant="outline">Importar</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Productos</CardTitle>
          <CardDescription>Lista de todos tus productos en la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="active">Activos</TabsTrigger>
              <TabsTrigger value="low_stock">Stock bajo</TabsTrigger>
              <TabsTrigger value="out_of_stock">Sin stock</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <ProductsTable products={products} />
            </TabsContent>

            <TabsContent value="active">
              <ProductsTable products={products.filter((product) => product.status === "active")} />
            </TabsContent>

            <TabsContent value="low_stock">
              <ProductsTable products={products.filter((product) => product.status === "low_stock")} />
            </TabsContent>

            <TabsContent value="out_of_stock">
              <ProductsTable products={products.filter((product) => product.status === "out_of_stock")} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Productos Populares</CardTitle>
            <CardDescription>Productos con más visualizaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products
                .sort((a, b) => b.views - a.views)
                .slice(0, 5)
                .map((product, index) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div className="relative h-12 w-12 overflow-hidden rounded-md">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{product.name}</h4>
                      <p className="text-xs text-muted-foreground">{product.views} visualizaciones</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productos Guardados</CardTitle>
            <CardDescription>Productos más guardados por usuarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products
                .sort((a, b) => b.saves - a.saves)
                .slice(0, 5)
                .map((product, index) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div className="relative h-12 w-12 overflow-hidden rounded-md">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{product.name}</h4>
                      <p className="text-xs text-muted-foreground">{product.saves} guardados</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventario</CardTitle>
            <CardDescription>Estado del inventario por categoría</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Tops", "Pantalones", "Vestidos", "Abrigos", "Calzado"].map((category) => {
                const categoryProducts = products.filter((product) => product.category === category)
                const totalStock = categoryProducts.reduce((sum, product) => sum + product.stock, 0)
                const totalProducts = categoryProducts.length

                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shirt className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{category}</span>
                      </div>
                      <span className="text-sm">
                        {totalStock} unidades ({totalProducts} productos)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className={`h-2 rounded-full ${
                          totalStock > 100 ? "bg-green-500" : totalStock > 50 ? "bg-amber-500" : "bg-red-500"
                        }`}
                        style={{ width: `${Math.min((totalStock / 200) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ProductsTable({ products }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Producto</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Estadísticas</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-md">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div className="font-medium">{product.name}</div>
              </div>
            </TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>
              <Badge
                className={
                  product.status === "active"
                    ? "bg-green-500"
                    : product.status === "low_stock"
                      ? "bg-amber-500"
                      : "bg-red-500"
                }
              >
                {product.status === "active" ? "Activo" : product.status === "low_stock" ? "Stock bajo" : "Sin stock"}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="text-sm">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3 text-muted-foreground" />
                  <span>{product.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-3 w-3 text-muted-foreground"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span>{product.saves}</span>
                </div>
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
                  <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                  <DropdownMenuItem>Editar producto</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Actualizar stock</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">Eliminar producto</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
