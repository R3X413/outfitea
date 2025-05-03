"use client"

import type { Row } from "@tanstack/react-table"
import { MoreHorizontal, Pencil, Trash, UserCheck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const { toast } = useToast()

  const handleAction = (action: string) => {
    toast({
      title: "Acción no implementada",
      description: `La acción "${action}" será implementada próximamente.`,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleAction("Ver detalles")}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Ver detalles</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction("Verificar usuario")}>
          <UserCheck className="mr-2 h-4 w-4" />
          <span>Verificar usuario</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction("Cambiar rol")}>
          <Shield className="mr-2 h-4 w-4" />
          <span>Cambiar rol</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleAction("Eliminar usuario")} className="text-destructive">
          <Trash className="mr-2 h-4 w-4" />
          <span>Eliminar usuario</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
