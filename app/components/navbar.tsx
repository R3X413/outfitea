"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  const { isSignedIn } = useUser()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Características", href: "#caracteristicas" },
    { name: "Cómo funciona", href: "#como-funciona" },
    { name: "Planes", href: "#planes" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-rose-500">Outfitea</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-rose-500"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          {isSignedIn ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="outline">Iniciar sesión</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Registrarse</Button>
              </SignUpButton>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
          >
            <span className="sr-only">Abrir menú principal</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="px-3 py-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : (
              <>
                <div className="px-3 py-2">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="w-full">
                      Iniciar sesión
                    </Button>
                  </SignInButton>
                </div>
                <div className="px-3 py-2">
                  <SignUpButton mode="modal">
                    <Button className="w-full">Registrarse</Button>
                  </SignUpButton>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
