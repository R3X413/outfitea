"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Users, CheckCircle, Settings, BarChart, Home } from "lucide-react"

export function AdminNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
      active: pathname === "/admin",
    },
    {
      href: "/admin/usuarios",
      label: "Usuarios",
      icon: <Users className="mr-2 h-4 w-4" />,
      active: pathname.includes("/admin/usuarios"),
    },
    {
      href: "/admin/verificaciones",
      label: "Verificaciones",
      icon: <CheckCircle className="mr-2 h-4 w-4" />,
      active: pathname.includes("/admin/verificaciones"),
    },
    {
      href: "/admin/estadisticas",
      label: "Estadísticas",
      icon: <BarChart className="mr-2 h-4 w-4" />,
      active: pathname.includes("/admin/estadisticas"),
    },
    {
      href: "/admin/configuracion",
      label: "Configuración",
      icon: <Settings className="mr-2 h-4 w-4" />,
      active: pathname.includes("/admin/configuracion"),
    },
    {
      href: "/dashboard",
      label: "Volver al Dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
      active: false,
    },
  ]

  return (
    <nav className="grid items-start gap-2 p-4">
      {routes.map((route) => (
        <Link key={route.href} href={route.href}>
          <Button
            variant={route.active ? "secondary" : "ghost"}
            className={cn("w-full justify-start", route.active && "bg-muted font-medium")}
          >
            {route.icon}
            {route.label}
          </Button>
        </Link>
      ))}
    </nav>
  )
}
