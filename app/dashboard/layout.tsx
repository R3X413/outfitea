import type React from "react"
import { Navbar } from "../components/navbar"
import { DashboardSidebar } from "./components/sidebar"
import { redirect } from "next/navigation"
import { getUserRole, isUserVerified, supabase } from "@/lib/supabase"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Obtener la sesión actual
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  const userId = session.user.id

  // Obtener el rol del usuario desde la base de datos
  const userRole = await getUserRole(userId)

  // Verificar si el usuario está verificado
  const isVerified = await isUserVerified(userId)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <DashboardSidebar userRole={userRole} isVerified={isVerified} />
        <main className="flex-1 p-6 md:p-8 pt-6">{children}</main>
      </div>
    </div>
  )
}
