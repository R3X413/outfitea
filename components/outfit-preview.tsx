import type { ClothingItem } from "@/lib/types"
import Image from "next/image"

interface OutfitPreviewProps {
  items: ClothingItem[]
}

export function OutfitPreview({ items }: OutfitPreviewProps) {
  // Determinar qué tipo de outfit es (superior/inferior, vestido completo, etc.)
  const hasTop = items.some((item) =>
    ["camiseta", "camisa", "blusa", "suéter", "chaqueta"].includes(item.category.toLowerCase()),
  )

  const hasBottom = items.some((item) => ["pantalón", "falda", "shorts", "jeans"].includes(item.category.toLowerCase()))

  const hasDress = items.some((item) => ["vestido", "mono"].includes(item.category.toLowerCase()))

  const topItem = items.find((item) =>
    ["camiseta", "camisa", "blusa", "suéter", "chaqueta"].includes(item.category.toLowerCase()),
  )

  const bottomItem = items.find((item) =>
    ["pantalón", "falda", "shorts", "jeans"].includes(item.category.toLowerCase()),
  )

  const dressItem = items.find((item) => ["vestido", "mono"].includes(item.category.toLowerCase()))

  const accessories = items.filter((item) =>
    ["zapatos", "bolso", "accesorio", "sombrero", "joya"].includes(item.category.toLowerCase()),
  )

  if (items.length === 0) {
    return (
      <div className="border rounded-md p-4 text-center text-muted-foreground">
        Selecciona prendas para ver la vista previa
      </div>
    )
  }

  return (
    <div className="border rounded-md p-4 grid gap-2">
      {/* Outfit principal */}
      <div className="grid grid-cols-1 gap-2">
        {hasDress && dressItem && (
          <div className="aspect-[2/3] relative rounded-md overflow-hidden">
            <Image
              src={dressItem.imageUrl || "/placeholder.svg?height=300&width=200"}
              alt={dressItem.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        {!hasDress && (
          <div className="grid grid-cols-1 gap-2">
            {hasTop && topItem && (
              <div className="aspect-[3/2] relative rounded-md overflow-hidden">
                <Image
                  src={topItem.imageUrl || "/placeholder.svg?height=200&width=300"}
                  alt={topItem.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {hasBottom && bottomItem && (
              <div className="aspect-[3/2] relative rounded-md overflow-hidden">
                <Image
                  src={bottomItem.imageUrl || "/placeholder.svg?height=200&width=300"}
                  alt={bottomItem.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Accesorios */}
      {accessories.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {accessories.map((item) => (
            <div key={item.id} className="h-12 w-12 relative rounded-md overflow-hidden">
              <Image
                src={item.imageUrl || "/placeholder.svg?height=48&width=48"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
