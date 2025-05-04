import Link from "next/link"
import { Instagram, Twitter, Facebook, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Outfitea</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#caracteristicas" className="text-muted-foreground hover:text-foreground">
                  Características
                </Link>
              </li>
              <li>
                <Link href="#como-funciona" className="text-muted-foreground hover:text-foreground">
                  Cómo funciona
                </Link>
              </li>
              <li>
                <Link href="#planes" className="text-muted-foreground hover:text-foreground">
                  Planes
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Soporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Tutoriales
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Términos de servicio
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Licencias
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Conecta con nosotros</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Suscríbete a nuestro boletín para recibir las últimas noticias y actualizaciones.
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button
                type="submit"
                className="inline-flex h-9 items-center justify-center rounded-md bg-rose-500 px-3 py-1 text-sm font-medium text-white shadow hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Outfitea. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
