import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { ClothingItem } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface ClothingItemCardProps {
  item: ClothingItem
}

export function ClothingItemCard({ item }: ClothingItemCardProps) {
  return (
    <Link href={`/dashboard/prendas/${item.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <div className="aspect-square relative">
            <Image
              src={item.imageUrl || "/placeholder.svg?height=300&width=300"}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4">
          <div className="flex items-center justify-between w-full">
            <h3 className="font-medium">{item.name}</h3>
            <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: item.color }} />
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{item.category}</Badge>
            <Badge variant="outline">{item.season}</Badge>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
