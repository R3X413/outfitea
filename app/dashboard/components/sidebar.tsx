"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { UserRole } from "@/types/user"
import {
  LayoutDashboard,
  Shirt,
  Calendar,
  User,
  Settings,
  Users,
  ShoppingBag,
  BarChart3,
  Building2,
  Heart,
  MessageSquare,
  BadgeCheck,
} from "lucide-react"
import { VerificationBadge } from "./verification-badge"

interface DashboardSidebarProps {
  userRole: UserRole
  isVerified?: boolean
}

export function DashboardSidebar({ userRole, isVerified }: DashboardSidebarProps) {
  const pathname = usePathname()

  // Enlaces comunes para todos los usuarios
  const commonLinks = [
    {
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
    },
    {
      href: "/dashboard/profile",
      icon: <User className="h-5 w-5" />,
      label: "Perfil",
    },
    {
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
      label: "Configuración",
    },
  ]

  // Enlaces específicos para usuarios normales
  const userLinks = [
    {
      href: "/dashboard/wardrobe",
      icon: <Shirt className="h-5 w-5" />,
      label: "Mi Armario",
    },
    {
      href: "/dashboard/outfits",
      icon: <ShoppingBag className="h-5 w-5" />,
      label: "Mis Outfits",
    },
    {
      href: "/dashboard/calendar",
      icon: <Calendar className="h-5 w-5" />,
      label: "Calendario",
    },
    {
      href: "/dashboard/brands",
      icon: <Building2 className="h-5 w-5" />,
      label: "Marcas Destacadas",
    },
    {
      href: "/dashboard/favorites",
      icon: <Heart className="h-5 w-5" />,
      label: "Favoritos",
    },
  ]

  // Enlaces específicos para administradores
  const adminLinks = [
    {
      href: "/dashboard/admin/users",
      icon: <Users className="h-5 w-5" />,
      label: "Gestión de Usuarios",
    },
    {
      href: "/dashboard/admin/brands",
      icon: <Building2 className="h-5 w-5" />,
      label: "Gestión de Marcas",
    },
    {
      href: "/dashboard/admin/verifications",
      icon: <BadgeCheck className="h-5 w-5" />,
      label: "Verificaciones",
    },
    {
      href: "/dashboard/admin/stats",
      icon: <BarChart3 className="h-5 w-5" />,
      label: "Estadísticas",
    },
  ]

  // Enlaces específicos para marcas
  const brandLinks = [
    {
      href: "/dashboard/brand/products",
      icon: <Shirt className="h-5 w-5" />,
      label: "Mis Productos",
    },
    {
      href: "/dashboard/brand/collaborations",
      icon: <Users className="h-5 w-5" />,
      label: "Colaboraciones",
    },
    {
      href: "/dashboard/brand/stats",
      icon: <BarChart3 className="h-5 w-5" />,
      label: "Estadísticas",
    },
    {
      href: "/dashboard/brand/messages",
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Mensajes",
    },
  ]

  // Determinar qué enlaces mostrar según el rol
  let roleSpecificLinks = userLinks
  if (userRole === "admin") {
    roleSpecificLinks = adminLinks
  } else if (userRole === "brand") {
    roleSpecificLinks = brandLinks
  }

  return (
    <div className="hidden md:flex flex-col w-64 border-r bg-background h-[calc(100vh-4rem)]">
      <div className="flex flex-col space-y-6 p-4">
        <div className="flex items-center space-x-2 px-2">
          <span className="text-xl font-bold text-rose-500">Outfitea</span>
          {isVerified && <VerificationBadge size="sm" />}
        </div>

        <nav className="flex flex-col space-y-1">
          <div className="py-2">
            <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">General</p>
            <ul className="mt-2 space-y-1">
              {commonLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-rose-500 ${
                      pathname === link.href ? "bg-muted font-medium text-rose-500" : "text-muted-foreground"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="py-2">
            <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {userRole === "admin" ? "Administración" : userRole === "brand" ? "Gestión de Marca" : "Mi Contenido"}
            </p>
            <ul className="mt-2 space-y-1">
              {roleSpecificLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-rose-500 ${
                      pathname === link.href ? "bg-muted font-medium text-rose-500" : "text-muted-foreground"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}
