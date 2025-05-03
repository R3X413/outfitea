export interface User {
  id: string
  name: string
  email: string
}

export interface ClothingItem {
  id: string
  name: string
  category: string
  color: string
  colorName: string
  season: string
  brand?: string
  description?: string
  tags?: string[]
  imageUrl?: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface Outfit {
  id: string
  name: string
  occasion: string
  season: string
  description?: string
  tags?: string[]
  items: ClothingItem[]
  userId: string
  createdAt: string
  updatedAt: string
}
