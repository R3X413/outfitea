import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Shirt, Palette, Lightbulb, Smartphone } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Shirt className="h-6 w-6 text-rose-500" />
            <span className="text-xl font-bold">Outfitea</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#caracteristicas" className="text-sm font-medium hover:underline">
              Características
            </Link>
            <Link href="#como-funciona" className="text-sm font-medium hover:underline">
              Cómo funciona
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className="py-20 md:py-28">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
              Tu armario digital para planificar tus outfits
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Organiza, combina y planifica tu ropa de manera fácil y rápida. Nunca más te preocupes por qué ponerte.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                  Comenzar ahora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#como-funciona">
                <Button size="lg" variant="outline">
                  Cómo funciona
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="caracteristicas" className="py-20 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Características principales</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-rose-100 flex items-center justify-center mb-4">
                  <Shirt className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-medium mb-2">Organiza tu armario</h3>
                <p className="text-muted-foreground">
                  Agrega tus prendas y organiza tu ropa de manera sencilla por categorías, colores y temporadas.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-rose-100 flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-medium mb-2">Combina outfits</h3>
                <p className="text-muted-foreground">
                  Crea combinaciones de ropa y encuentra la mejor opción para cada día u ocasión especial.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-rose-100 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-medium mb-2">Inspírate</h3>
                <p className="text-muted-foreground">
                  Descubre ideas de looks y haz que tu vestuario sea más variado con sugerencias personalizadas.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-rose-100 flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-medium mb-2">Accesible desde cualquier lugar</h3>
                <p className="text-muted-foreground">
                  Disponible en tu móvil, para que siempre tengas acceso a tu armario digital estés donde estés.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Cómo funciona</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                  <span className="font-bold text-rose-500">1</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Registra tus prendas</h3>
                <p className="text-muted-foreground">
                  Toma fotos de tu ropa y agrégalas a tu armario digital con detalles como color, categoría y temporada.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                  <span className="font-bold text-rose-500">2</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Crea tus outfits</h3>
                <p className="text-muted-foreground">
                  Combina diferentes prendas para crear outfits completos y guárdalos para usarlos en el futuro.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                  <span className="font-bold text-rose-500">3</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Planifica tu semana</h3>
                <p className="text-muted-foreground">
                  Asigna outfits a días específicos y planifica tu vestuario con anticipación para cada ocasión.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="mt-auto border-t py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Shirt className="h-5 w-5 text-rose-500" />
            <span className="font-bold">Outfitea</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Outfitea. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
