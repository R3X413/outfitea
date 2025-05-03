import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ClothingItemForm } from "@/components/clothing-item-form"
import { getClothingItemById } from "@/lib/data"
import { notFound } from "next/navigation"

export default async function EditClothingItemPage({ params }: { params: { id: string } }) {
  const item = await getClothingItemById(params.id)

  if (!item) {
    notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Editar Prenda" description="Modifica los detalles de tu prenda" />
      <div className="grid gap-8">
        <ClothingItemForm item={item} />
      </div>
    </DashboardShell>
  )
}
