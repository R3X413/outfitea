import { Shirt, Calendar, Palette, Share2, CloudSun, Search, Tag, Sparkles } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <Shirt className="h-10 w-10 text-rose-500" />,
      title: "Armario Digital",
      description: "Registra tus prendas con fotos y organízalas por categorías, colores, temporadas y marcas.",
    },
    {
      icon: <Palette className="h-10 w-10 text-rose-500" />,
      title: "Creación de Outfits",
      description: "Combina prendas para crear conjuntos completos y guarda tus outfits favoritos.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-rose-500" />,
      title: "Planificación de Vestuario",
      description: "Asigna outfits a días específicos con nuestro calendario integrado.",
    },
    {
      icon: <Share2 className="h-10 w-10 text-rose-500" />,
      title: "Funciones Sociales",
      description: "Comparte tus outfits con amigos y recibe comentarios y sugerencias.",
    },
    {
      icon: <CloudSun className="h-10 w-10 text-rose-500" />,
      title: "Recomendaciones",
      description: "Recibe sugerencias de combinaciones basadas en tus prendas y el clima.",
    },
    {
      icon: <Search className="h-10 w-10 text-rose-500" />,
      title: "Búsqueda Avanzada",
      description: "Encuentra rápidamente lo que buscas con filtros y búsqueda inteligente.",
    },
    {
      icon: <Tag className="h-10 w-10 text-rose-500" />,
      title: "Etiquetado",
      description: "Organiza tu ropa con etiquetas personalizadas para facilitar la búsqueda.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-rose-500" />,
      title: "Inspiración",
      description: "Descubre nuevas ideas para combinar tu ropa y maximizar tu armario.",
    },
  ]

  return (
    <section id="caracteristicas" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Características Principales</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Descubre todas las herramientas que Outfitea ofrece para organizar tu armario y planificar tus outfits.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 rounded-lg border p-4 transition-all hover:border-rose-500"
            >
              {feature.icon}
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
