import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { getClothingItems } from "@/lib/data"
import { ClothingItemCard } from "@/components/clothing-item-card"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { ClothingFilter } from "@/components/clothing-filter"

export default async function ClothingItemsPage() {
  const clothingItems = await getClothingItems()

  return (
    <DashboardShell>
      <DashboardHeader heading="Mis Prendas" description="Gestiona todas las prendas de tu armario digital">
        <Link href="/dashboard/prendas/nueva">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Prenda
          </Button>
        </Link>
      </DashboardHeader>

      <ClothingFilter />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {clothingItems.length > 0 ? (
          clothingItems.map((item) => <ClothingItemCard key={item.id} item={item} />)
        ) : (
          <EmptyPlaceholder
            className="col-span-full"
            title="No hay prendas"
            description="Comienza a agregar prendas a tu armario digital."
            action={
              <Link href="/dashboard/prendas/nueva">
                <Button>Agregar prenda</Button>
              </Link>
            }
          />
        )}
      </div>
    </DashboardShell>
  )
}
