import { authMiddleware } from "@clerk/nextjs/server"

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ["/", "/api(.*)"],
})

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
