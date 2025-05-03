"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/supabase/database.types"

export async function registerUser(formData: {
  email: string
  password: string
  username: string
  fullName: string
}) {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    // 1. Registrar usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })

    if (authError) {
      return { success: false, error: authError.message }
    }

    if (!authData.user) {
      return { success: false, error: "No se pudo crear el usuario" }
    }

    // 2. Crear perfil de usuario
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      username: formData.username,
      full_name: formData.fullName,
      is_verified: false,
      is_admin: false,
    })

    if (profileError) {
      return { success: false, error: `Error al crear perfil: ${profileError.message}` }
    }

    // 3. Obtener IDs de idioma y tema predeterminados
    const { data: languageData, error: languageError } = await supabase
      .from("languages")
      .select("id")
      .eq("code", "es")
      .single()

    if (languageError) {
      return { success: false, error: `Error al obtener idioma: ${languageError.message}` }
    }

    const { data: themeData, error: themeError } = await supabase
      .from("themes")
      .select("id")
      .eq("name", "Light")
      .single()

    if (themeError) {
      return { success: false, error: `Error al obtener tema: ${themeError.message}` }
    }

    // 4. Crear configuración de usuario
    const { error: settingsError } = await supabase.from("user_settings").insert({
      user_id: authData.user.id,
      language_id: languageData.id,
      theme_id: themeData.id,
      notifications_enabled: true,
    })

    if (settingsError) {
      return { success: false, error: `Error al crear configuración: ${settingsError.message}` }
    }

    return { success: true }
  } catch (error: any) {
    return { success: false, error: `Error inesperado: ${error.message}` }
  }
}

export async function loginUser(formData: { email: string; password: string }) {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    return { success: false, error: `Error inesperado: ${error.message}` }
  }
}

export async function logoutUser() {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    return { success: false, error: `Error inesperado: ${error.message}` }
  }
}
