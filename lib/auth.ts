"use server"

import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"
import type { User } from "@/lib/types"

type UserData = {
  name: string
  email: string
  password: string
}

const isClient = typeof window !== "undefined"

export async function registerUser(userData: UserData): Promise<User> {
  const user: User = {
    id: uuidv4(),
    name: userData.name,
    email: userData.email,
  }

  // Guardar en localStorage solo en cliente
  if (isClient) {
    localStorage.setItem("outfitea_user", JSON.stringify(user))
  }

  // Crear cookie de sesión
  cookies().set(
    "outfitea_session",
    JSON.stringify({ userId: user.id }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: "/",
    }
  )

  return user
}

export async function loginUser(userData: {
  email: string
  password: string
}): Promise<User> {
  // Simular usuario (en app real se verificaría contra DB)
  const user: User = {
    id: uuidv4(),
    name: "Usuario Demo",
    email: userData.email,
  }

  if (isClient) {
    localStorage.setItem("outfitea_user", JSON.stringify(user))
  }

  cookies().set(
    "outfitea_session",
    JSON.stringify({ userId: user.id }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    }
  )

  return user
}

export async function logoutUser() {
  if (isClient) {
    localStorage.removeItem("outfitea_user")
  }

  cookies().delete("outfitea_session")
}

export async function getSession(): Promise<{ user: User } | null> {
  const session = cookies().get("outfitea_session")

  if (!session?.value) {
    return null
  }

  try {
    const { userId } = JSON.parse(session.value)

    // Simular recuperación de usuario
    const user: User = {
      id: userId,
      name: "Usuario Demo",
      email: "usuario@demo.com",
    }

    return { user }
  } catch (error) {
    return null
  }
}
