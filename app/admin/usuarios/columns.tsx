"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { DataTableRowActions } from "@/components/data-table-row-actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"

export type User = {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  is_verified: boolean
  is_admin: boolean
  created_at: string
}

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Usuario" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={row.original.avatar_url || "/placeholder.svg?height=32&width=32"}
              alt={row.original.username}
            />
            <AvatarFallback>{row.original.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span>{row.original.username}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
    cell: ({ row }) => <div>{row.original.full_name || "-"}</div>,
  },
  {
    accessorKey: "is_verified",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Verificado" />,
    cell: ({ row }) => (
      <div>
        {row.original.is_verified ? (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Verificado
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            No verificado
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "is_admin",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rol" />,
    cell: ({ row }) => (
      <div>
        {row.original.is_admin ? (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Administrador
          </Badge>
        ) : (
          <Badge variant="outline">Usuario</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha de registro" />,
    cell: ({ row }) => <div>{formatDate(row.original.created_at)}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
