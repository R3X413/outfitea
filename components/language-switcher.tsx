"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { updateUserSettings } from "@/lib/supabase/actions"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface LanguageSwitcherProps {
  currentLanguage?: string
}

export function LanguageSwitcher({ currentLanguage }: LanguageSwitcherProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleLanguageChange = async (code: string) => {
    try {
      setIsLoading(true)

      // Obtener el ID del idioma seleccionado
      const supabase = createClient()
      const { data: languageData } = await supabase.from("languages").select("id").eq("code", code).single()

      if (languageData) {
        await updateUserSettings({ languageId: languageData.id })
        router.refresh()

        toast({
          title: "Idioma cambiado",
          description:
            code === "es" ? "El idioma ha sido cambiado a Español." : "Language has been changed to English.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cambiar el idioma.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isLoading}>
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Cambiar idioma</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange("es")}>
          <span className="mr-2">🇪🇸</span>
          <span>Español</span>
          {currentLanguage === "es" && <span className="ml-2">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
          <span className="mr-2">🇺🇸</span>
          <span>English</span>
          {currentLanguage === "en" && <span className="ml-2">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
