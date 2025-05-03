import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { OutfitForm } from "@/components/outfit-form"
import { getOutfitById, getClothingItems } from "@/lib/data"
import { notFound } from "next/navigation"

export default async function EditOutfitPage({ params }: { params: { id: string } }) {
  const outfit = await getOutfitById(params.id)
  const clothingItems = await getClothingItems()

  if (!outfit) {
    notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Editar Outfit" description="Modifica los detalles de tu outfit" />
      <div className="grid gap-8">
        <OutfitForm outfit={outfit} clothingItems={clothingItems} />
      </div>
    </DashboardShell>
  )
}
