import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { getOutfits } from "@/lib/data"
import { OutfitCard } from "@/components/outfit-card"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export default async function OutfitsPage() {
  const outfits = await getOutfits()

  return (
    <DashboardShell>
      <DashboardHeader heading="Mis Outfits" description="Gestiona todas tus combinaciones de ropa">
        <Link href="/dashboard/outfits/nuevo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Outfit
          </Button>
        </Link>
      </DashboardHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {outfits.length > 0 ? (
          outfits.map((outfit) => <OutfitCard key={outfit.id} outfit={outfit} />)
        ) : (
          <EmptyPlaceholder
            className="col-span-full"
            title="No hay outfits"
            description="Comienza a crear combinaciones con tus prendas."
            action={
              <Link href="/dashboard/outfits/nuevo">
                <Button>Crear outfit</Button>
              </Link>
            }
          />
        )}
      </div>
    </DashboardShell>
  )
}
