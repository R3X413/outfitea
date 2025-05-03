"use server"

import type { ClothingItem, Outfit } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"

// Datos de ejemplo para la demostración
// En una aplicación real, esto se conectaría a una base de datos

let clothingItems: ClothingItem[] = [
  {
    id: "item1",
    name: "Camiseta básica blanca",
    category: "camiseta",
    color: "#ffffff",
    colorName: "Blanco",
    season: "todas",
    brand: "H&M",
    description: "Camiseta básica de algodón",
    tags: ["básico", "casual"],
    imageUrl: "/placeholder.svg?height=300&width=300",
    userId: "user_demo_id",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "item2",
    name: "Jeans azules",
    category: "pantalón",
    color: "#0047AB",
    colorName: "Azul",
    season: "todas",
    brand: "Levi's",
    description: "Jeans clásicos de corte recto",
    tags: ["básico", "casual"],
    imageUrl: "/placeholder.svg?height=300&width=300",
    userId: "user_demo_id",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "item3",
    name: "Vestido negro",
    category: "vestido",
    color: "#000000",
    colorName: "Negro",
    season: "primavera",
    brand: "Zara",
    description: "Vestido negro elegante para ocasiones especiales",
    tags: ["elegante", "fiesta"],
    imageUrl: "/placeholder.svg?height=300&width=300",
    userId: "user_demo_id",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "item4",
    name: "Zapatos casuales",
    category: "zapatos",
    color: "#8B4513",
    colorName: "Marrón",
    season: "todas",
    brand: "Clarks",
    description: "Zapatos casuales cómodos para el día a día",
    tags: ["casual", "cómodo"],
    imageUrl: "/placeholder.svg?height=300&width=300",
    userId: "user_demo_id",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

let outfits: Outfit[] = [
  {
    id: "outfit1",
    name: "Casual diario",
    occasion: "casual",
    season: "primavera",
    description: "Outfit casual para el día a día",
    tags: ["casual", "diario"],
    items: [clothingItems[0], clothingItems[1], clothingItems[3]],
    userId: "user_demo_id",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "outfit2",
    name: "Noche elegante",
    occasion: "formal",
    season: "todas",
    description: "Outfit para ocasiones especiales",
    tags: ["elegante", "noche"],
    items: [clothingItems[2], clothingItems[3]],
    userId: "user_demo_id",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Funciones para gestionar prendas

export async function getClothingItems(): Promise<ClothingItem[]> {
  return clothingItems
}

export async function getClothingItemById(id: string): Promise<ClothingItem | undefined> {
  return clothingItems.find((item) => item.id === id)
}

export async function createClothingItem(data: Partial<ClothingItem>): Promise<ClothingItem> {
  const newItem: ClothingItem = {
    id: uuidv4(),
    name: data.name || "",
    category: data.category || "",
    color: data.color || "",
    colorName: data.colorName || "",
    season: data.season || "",
    brand: data.brand,
    description: data.description,
    tags: data.tags,
    imageUrl: data.imageUrl,
    userId: "user_demo_id",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  clothingItems.push(newItem)
  return newItem
}

export async function updateClothingItem(id: string, data: Partial<ClothingItem>): Promise<ClothingItem> {
  const index = clothingItems.findIndex((item) => item.id === id)

  if (index === -1) {
    throw new Error("Prenda no encontrada")
  }

  const updatedItem = {
    ...clothingItems[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }

  clothingItems[index] = updatedItem

  // Actualizar la prenda en los outfits que la contienen
  outfits = outfits.map((outfit) => {
    if (outfit.items.some((item) => item.id === id)) {
      return {
        ...outfit,
        items: outfit.items.map((item) => (item.id === id ? updatedItem : item)),
      }
    }
    return outfit
  })

  return updatedItem
}

export async function deleteClothingItem(id: string): Promise<void> {
  const index = clothingItems.findIndex((item) => item.id === id)

  if (index === -1) {
    throw new Error("Prenda no encontrada")
  }

  clothingItems = clothingItems.filter((item) => item.id !== id)

  // Eliminar la prenda de los outfits que la contienen
  outfits = outfits.map((outfit) => ({
    ...outfit,
    items: outfit.items.filter((item) => item.id !== id),
  }))
}

// Funciones para gestionar outfits

export async function getOutfits(): Promise<Outfit[]> {
  return outfits
}

export async function getOutfitById(id: string): Promise<Outfit | undefined> {
  return outfits.find((outfit) => outfit.id === id)
}

export async function createOutfit(data: {
  name: string
  occasion: string
  season: string
  description?: string
  tags?: string[]
  itemIds: string[]
}): Promise<Outfit> {
  const outfitItems = clothingItems.filter((item) => data.itemIds.includes(item.id))

  const newOutfit: Outfit = {
    id: uuidv4(),
    name: data.name,
    occasion: data.occasion,
    season: data.season,
    description: data.description,
    tags: data.tags,
    items: outfitItems,
    userId: "user_demo_id",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  outfits.push(newOutfit)
  return newOutfit
}

export async function updateOutfit(
  id: string,
  data: {
    name: string
    occasion: string
    season: string
    description?: string
    tags?: string[]
    itemIds: string[]
  },
): Promise<Outfit> {
  const index = outfits.findIndex((outfit) => outfit.id === id)

  if (index === -1) {
    throw new Error("Outfit no encontrado")
  }

  const outfitItems = clothingItems.filter((item) => data.itemIds.includes(item.id))

  const updatedOutfit = {
    ...outfits[index],
    name: data.name,
    occasion: data.occasion,
    season: data.season,
    description: data.description,
    tags: data.tags,
    items: outfitItems,
    updatedAt: new Date().toISOString(),
  }

  outfits[index] = updatedOutfit
  return updatedOutfit
}

export async function deleteOutfit(id: string): Promise<void> {
  const index = outfits.findIndex((outfit) => outfit.id === id)

  if (index === -1) {
    throw new Error("Outfit no encontrado")
  }

  outfits = outfits.filter((outfit) => outfit.id !== id)
}

// Función para simular la subida de imágenes
export async function uploadImage(file: File): Promise<string> {
  // En una aplicación real, aquí subiríamos la imagen a un servicio de almacenamiento
  // y devolveríamos la URL

  // Para la demo, simplemente devolvemos una URL de placeholder
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("/placeholder.svg?height=400&width=400")
    }, 1000)
  })
}
