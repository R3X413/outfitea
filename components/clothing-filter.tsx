"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal } from "lucide-react"

export function ClothingFilter() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar prendas..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">Filtrar</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Filtrar por categoría</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>Camisetas</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>Pantalones</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>Vestidos</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>Zapatos</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>Accesorios</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Filtrar por temporada</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>Primavera</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>Verano</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>Otoño</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>Invierno</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
