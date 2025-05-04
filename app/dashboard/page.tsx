import { UserDashboard } from "./components/user-dashboard"
import { AdminDashboard } from "./components/admin-dashboard"
import { BrandDashboard } from "./components/brand-dashboard"
import { redirect } from "next/navigation"
import { getUserProfile, getUserRole, isUserVerified, supabase } from "@/lib/supabase"

export default async function Dashboard() {
  // Obtener la sesión actual
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  const userId = session.user.id

  // Obtener el perfil del usuario
  const userProfile = await getUserProfile(userId)

  if (!userProfile) {
    // Si no existe el perfil, redirigir a la página de completar perfil
    redirect("/complete-profile")
  }

  // Obtener el rol del usuario
  const userRole = await getUserRole(userId)

  // Verificar si el usuario está verificado
  const isVerified = await isUserVerified(userId)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido/a a tu panel de control de Outfitea
          {isVerified && <span className="ml-2">✓</span>}
        </p>
      </div>

      {userRole === "admin" && <AdminDashboard userId={userId} />}
      {userRole === "brand" && <BrandDashboard userId={userId} isVerified={isVerified} />}
      {userRole === "user" && <UserDashboard userId={userId} />}
    </div>
  )
}
