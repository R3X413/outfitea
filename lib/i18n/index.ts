import { createServerClient } from "@/lib/supabase/server"

export type Language = {
  id: string
  code: string
  name: string
}

export async function getLanguages(): Promise<Language[]> {
  const supabase = createServerClient()
  const { data } = await supabase.from("languages").select("*").eq("is_active", true)
  return data || []
}

export async function getUserLanguage(userId: string): Promise<Language | null> {
  const supabase = createServerClient()

  const { data: settingsData } = await supabase
    .from("user_settings")
    .select("language_id")
    .eq("user_id", userId)
    .single()

  if (!settingsData?.language_id) return null

  const { data: languageData } = await supabase
    .from("languages")
    .select("*")
    .eq("id", settingsData.language_id)
    .single()

  return languageData
}

// Diccionarios de traducción
const translations: Record<string, Record<string, string>> = {
  es: {
    // General
    "app.name": "Outfitea",
    "app.tagline": "Tu armario digital para planificar tus outfits",

    // Navegación
    "nav.home": "Inicio",
    "nav.dashboard": "Dashboard",
    "nav.clothes": "Prendas",
    "nav.outfits": "Outfits",
    "nav.calendar": "Calendario",
    "nav.groups": "Grupos",
    "nav.settings": "Ajustes",

    // Acciones
    "action.login": "Iniciar sesión",
    "action.register": "Registrarse",
    "action.logout": "Cerrar sesión",
    "action.save": "Guardar",
    "action.cancel": "Cancelar",
    "action.delete": "Eliminar",
    "action.edit": "Editar",
    "action.create": "Crear",
    "action.add": "Añadir",

    // Formularios
    "form.name": "Nombre",
    "form.email": "Email",
    "form.password": "Contraseña",
    "form.username": "Nombre de usuario",
    "form.fullName": "Nombre completo",
    "form.bio": "Biografía",
    "form.description": "Descripción",
    "form.tags": "Etiquetas",
    "form.color": "Color",
    "form.colorName": "Nombre del color",
    "form.brand": "Marca",
    "form.category": "Categoría",
    "form.season": "Temporada",
    "form.occasion": "Ocasión",

    // Mensajes
    "message.welcome": "Bienvenido/a",
    "message.loading": "Cargando...",
    "message.error": "Ha ocurrido un error",
    "message.success": "Operación exitosa",
    "message.emptyState": "No hay elementos para mostrar",
    "message.confirmDelete": "¿Estás seguro de que deseas eliminar esto?",
  },

  en: {
    // General
    "app.name": "Outfitea",
    "app.tagline": "Your digital wardrobe to plan your outfits",

    // Navigation
    "nav.home": "Home",
    "nav.dashboard": "Dashboard",
    "nav.clothes": "Clothes",
    "nav.outfits": "Outfits",
    "nav.calendar": "Calendar",
    "nav.groups": "Groups",
    "nav.settings": "Settings",

    // Actions
    "action.login": "Log in",
    "action.register": "Sign up",
    "action.logout": "Log out",
    "action.save": "Save",
    "action.cancel": "Cancel",
    "action.delete": "Delete",
    "action.edit": "Edit",
    "action.create": "Create",
    "action.add": "Add",

    // Forms
    "form.name": "Name",
    "form.email": "Email",
    "form.password": "Password",
    "form.username": "Username",
    "form.fullName": "Full name",
    "form.bio": "Bio",
    "form.description": "Description",
    "form.tags": "Tags",
    "form.color": "Color",
    "form.colorName": "Color name",
    "form.brand": "Brand",
    "form.category": "Category",
    "form.season": "Season",
    "form.occasion": "Occasion",

    // Messages
    "message.welcome": "Welcome",
    "message.loading": "Loading...",
    "message.error": "An error has occurred",
    "message.success": "Operation successful",
    "message.emptyState": "No items to display",
    "message.confirmDelete": "Are you sure you want to delete this?",
  },
}

export function getTranslation(code: string, key: string): string {
  return translations[code]?.[key] || translations.es[key] || key
}
