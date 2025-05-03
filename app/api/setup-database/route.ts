import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { Database } from "@/lib/supabase/database.types"

export async function GET() {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies })

    // Verificar si el usuario es administrador
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    // Verificar si el usuario es administrador
    const { data: profileData } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

    if (!profileData?.is_admin) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    // Verificar y crear tablas necesarias
    const results = {
      tables: {},
      initialData: {},
    }

    // 1. Verificar tabla de idiomas
    const { data: languagesData, error: languagesError } = await supabase.from("languages").select("count")

    if (languagesError) {
      // La tabla no existe o hay un error
      results.tables["languages"] = "Error: " + languagesError.message
    } else {
      results.tables["languages"] = "OK"

      // Verificar si hay datos
      if (languagesData.length === 0) {
        // Insertar datos iniciales
        const { error: insertError } = await supabase.from("languages").insert([
          { code: "es", name: "Español", is_active: true },
          { code: "en", name: "English", is_active: true },
        ])

        results.initialData["languages"] = insertError ? "Error: " + insertError.message : "Datos insertados"
      } else {
        results.initialData["languages"] = "Datos existentes"
      }
    }

    // 2. Verificar tabla de temas
    const { data: themesData, error: themesError } = await supabase.from("themes").select("count")

    if (themesError) {
      // La tabla no existe o hay un error
      results.tables["themes"] = "Error: " + themesError.message
    } else {
      results.tables["themes"] = "OK"

      // Verificar si hay datos
      if (themesData.length === 0) {
        // Insertar datos iniciales
        const { error: insertError } = await supabase.from("themes").insert([
          {
            name: "Light",
            is_dark: false,
            primary_color: "#f43f5e",
            secondary_color: "#ec4899",
            background_color: "#ffffff",
            text_color: "#000000",
            is_active: true,
          },
          {
            name: "Dark",
            is_dark: true,
            primary_color: "#f43f5e",
            secondary_color: "#ec4899",
            background_color: "#1f2937",
            text_color: "#ffffff",
            is_active: true,
          },
        ])

        results.initialData["themes"] = insertError ? "Error: " + insertError.message : "Datos insertados"
      } else {
        results.initialData["themes"] = "Datos existentes"
      }
    }

    // 3. Verificar tabla de perfiles
    const { error: profilesError } = await supabase.from("profiles").select("count").limit(1)

    results.tables["profiles"] = profilesError ? "Error: " + profilesError.message : "OK"

    // 4. Verificar tabla de configuraciones de usuario
    const { error: settingsError } = await supabase.from("user_settings").select("count").limit(1)

    results.tables["user_settings"] = settingsError ? "Error: " + settingsError.message : "OK"

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error en la configuración de la base de datos:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
