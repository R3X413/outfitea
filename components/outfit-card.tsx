import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Outfit } from "@/lib/types"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { OutfitDisplay } from "@/components/outfit-display"

interface OutfitCardProps {
  outfit: Outfit
}

export function OutfitCard({ outfit }: OutfitCardProps) {
  return (
    <Link href={`/dashboard/outfits/${outfit.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <OutfitDisplay outfit={outfit} />
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4 pt-0">
          <h3 className="font-medium">{outfit.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{outfit.occasion}</Badge>
            <Badge variant="outline">{outfit.season}</Badge>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
