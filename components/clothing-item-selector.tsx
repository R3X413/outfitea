"use client"

import { useState } from "react"
import type { ClothingItem } from "@/lib/types"
import { Check, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface ClothingItemSelectorProps {
  allItems: ClothingItem[]
  selectedItems: ClothingItem[]
  onChange: (items: ClothingItem[]) => void
}

export function ClothingItemSelector({ allItems, selectedItems, onChange }: ClothingItemSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = allItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleItem = (item: ClothingItem) => {
    const isSelected = selectedItems.some((selected) => selected.id === item.id)

    if (isSelected) {
      onChange(selectedItems.filter((selected) => selected.id !== item.id))
    } else {
      onChange([...selectedItems, item])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center border rounded-md px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground mr-2" />
        <Input
          placeholder="Buscar prendas..."
          className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setSearchQuery("")}>
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            <Badge key={item.id} variant="secondary" className="flex items-center gap-1">
              {item.name}
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => toggleItem(item)}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      <ScrollArea className="h-[300px] border rounded-md">
        <div className="p-2 grid grid-cols-2 gap-2">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const isSelected = selectedItems.some((selected) => selected.id === item.id)

              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-muted ${
                    isSelected ? "bg-muted" : ""
                  }`}
                  onClick={() => toggleItem(item)}
                >
                  <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.imageUrl || "/placeholder.svg?height=48&width=48"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-rose-500" />}
                </div>
              )
            })
          ) : (
            <div className="col-span-2 py-8 text-center text-muted-foreground">No se encontraron prendas</div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
