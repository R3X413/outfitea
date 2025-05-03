"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Shirt, Palette, Calendar, Settings, Users, Shield } from "lucide-react"

interface DashboardNavProps {
  isAdmin?: boolean
}

export function DashboardNav({ isAdmin }: DashboardNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <Shirt className="mr-2 h-4 w-4" />,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/prendas",
      label: "Prendas",
      icon: <Shirt className="mr-2 h-4 w-4" />,
      active: pathname.includes("/dashboard/prendas"),
    },
    {
      href: "/dashboard/outfits",
      label: "Outfits",
      icon: <Palette className="mr-2 h-4 w-4" />,
      active: pathname.includes("/dashboard/outfits"),
    },
    {
      href: "/dashboard/calendario",
      label: "Calendario",
      icon: <Calendar className="mr-2 h-4 w-4" />,
      active: pathname.includes("/dashboard/calendario"),
    },
    {
      href: "/dashboard/grupos",
      label: "Grupos",
      icon: <Users className="mr-2 h-4 w-4" />,
      active: pathname.includes("/dashboard/grupos"),
    },
    {
      href: "/dashboard/ajustes",
      label: "Ajustes",
      icon: <Settings className="mr-2 h-4 w-4" />,
      active: pathname.includes("/dashboard/ajustes"),
    },
  ]

  // Añadir enlace al panel de administración si el usuario es admin
  if (isAdmin) {
    routes.push({
      href: "/admin",
      label: "Panel Admin",
      icon: <Shield className="mr-2 h-4 w-4" />,
      active: pathname.includes("/admin"),
    })
  }

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
