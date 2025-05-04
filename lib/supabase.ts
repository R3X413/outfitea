import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Estas variables de entorno deben estar configuradas en tu proyecto
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Crear el cliente de Supabase
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Función para obtener el usuario actual
export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session?.user
}

// Función para obtener el perfil del usuario
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return data
}

// Función para obtener el rol del usuario
export async function getUserRole(userId: string): Promise<"user" | "admin" | "brand"> {
  const { data, error } = await supabase.from("profiles").select("role").eq("id", userId).single()

  if (error || !data) {
    console.error("Error fetching user role:", error)
    return "user" // Por defecto, asignamos el rol de usuario
  }

  return data.role as "user" | "admin" | "brand"
}

// Función para verificar si un usuario está verificado
export async function isUserVerified(userId: string): Promise<boolean> {
  const { data, error } = await supabase.from("profiles").select("is_verified").eq("id", userId).single()

  if (error || !data) {
    console.error("Error checking user verification:", error)
    return false
  }

  return data.is_verified || false
}
