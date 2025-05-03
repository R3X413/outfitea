import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ClothingItemForm } from "@/components/clothing-item-form"

export default function NewClothingItemPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Nueva Prenda" description="Agrega una nueva prenda a tu armario digital" />
      <div className="grid gap-8">
        <ClothingItemForm />
      </div>
    </DashboardShell>
  )
}
