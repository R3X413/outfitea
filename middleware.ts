import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refrescar la sesión si existe
  await supabase.auth.getSession()

  return res
}

// Configurar las rutas que deben usar el middleware
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * 1. Archivos estáticos (_next/static, favicon.ico, etc.)
     * 2. Rutas de API (/api/*)
     */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
}
