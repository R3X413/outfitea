import Image from "next/image"
import { Check } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Registra tus prendas",
      description:
        "Toma fotos de tu ropa y súbelas a la aplicación. Categoriza cada prenda por tipo, color, temporada y más.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      number: "02",
      title: "Crea tus outfits",
      description:
        "Combina diferentes prendas para crear conjuntos completos. Guarda tus outfits favoritos para usarlos más tarde.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      number: "03",
      title: "Planifica tu vestuario",
      description:
        "Asigna outfits a días específicos en el calendario. Planifica tu vestuario para la semana o el mes.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      number: "04",
      title: "Comparte y recibe feedback",
      description: "Comparte tus outfits con amigos y recibe comentarios y sugerencias para mejorar tus combinaciones.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <section id="como-funciona" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Cómo Funciona</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Organizar tu armario y planificar tus outfits nunca ha sido tan fácil.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
          {steps.map((step, index) => (
            <div key={index} className="rounded-lg border p-6">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900">
                  <span className="text-lg font-bold text-rose-500">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
              </div>
              <p className="mt-3 text-muted-foreground">{step.description}</p>
              <div className="mt-4">
                <Image
                  src={step.image || "/placeholder.svg"}
                  alt={step.title}
                  width={400}
                  height={300}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-3xl mt-12 rounded-lg border p-6 bg-muted/50">
          <h3 className="text-xl font-bold text-center mb-6">¿Por qué elegir Outfitea?</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Interfaz intuitiva y fácil de usar",
              "Organización eficiente de tu armario",
              "Ahorro de tiempo en la elección de outfits",
              "Maximiza el uso de tu ropa existente",
              "Planificación anticipada de tu vestuario",
              "Compartición social con amigos",
              "Recomendaciones personalizadas",
              "Acceso desde cualquier dispositivo",
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-rose-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
