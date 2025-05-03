import { createServerClient } from "@/lib/supabase/server"

export type Theme = {
  id: string
  name: string
  is_dark: boolean
  primary_color: string
  secondary_color: string
  background_color: string
  text_color: string
}

export async function getThemes(): Promise<Theme[]> {
  const supabase = createServerClient()
  const { data } = await supabase.from("themes").select("*").eq("is_active", true)
  return data || []
}

export async function getUserTheme(userId: string): Promise<Theme | null> {
  const supabase = createServerClient()

  const { data: settingsData } = await supabase.from("user_settings").select("theme_id").eq("user_id", userId).single()

  if (!settingsData?.theme_id) return null

  const { data: themeData } = await supabase.from("themes").select("*").eq("id", settingsData.theme_id).single()

  return themeData
}
