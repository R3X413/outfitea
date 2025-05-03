import type React from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { Shirt } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { LanguageSwitcher } from "@/components/language-switcher"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Obtener perfil del usuario
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  // Obtener configuración del usuario
  const { data: settings } = await supabase
    .from("user_settings")
    .select("*, languages(*), themes(*)")
    .eq("user_id", session.user.id)
    .single()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Shirt className="h-5 w-5 text-rose-500" />
            <span className="font-bold">Outfitea</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher currentLanguage={settings?.languages?.code || "es"} />
            <ThemeSwitcher currentTheme={settings?.themes?.name || "light"} />
            <UserNav user={session.user} profile={profile} />
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <DashboardNav isAdmin={profile?.is_admin || false} />
        </aside>
        <main className="flex w-full flex-col overflow-hidden py-6">{children}</main>
      </div>
    </div>
  )
}
