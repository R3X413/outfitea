import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { OutfitForm } from "@/components/outfit-form"
import { getClothingItems } from "@/lib/data"

export default async function NewOutfitPage() {
  const clothingItems = await getClothingItems()

  return (
    <DashboardShell>
      <DashboardHeader heading="Nuevo Outfit" description="Crea una nueva combinación con tus prendas" />
      <div className="grid gap-8">
        <OutfitForm clothingItems={clothingItems} />
      </div>
    </DashboardShell>
  )
}
