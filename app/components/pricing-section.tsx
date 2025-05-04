import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SignUpButton } from "@clerk/nextjs"

export function PricingSection() {
  const plans = [
    {
      name: "Gratuito",
      price: "0€",
      description: "Perfecto para empezar a organizar tu armario digital.",
      features: [
        "Hasta 50 prendas",
        "Creación de 10 outfits",
        "Planificación semanal",
        "Categorización básica",
        "1 grupo social",
      ],
      limitations: ["Sin recomendaciones avanzadas", "Sin etiquetado personalizado", "Almacenamiento limitado"],
      buttonText: "Comenzar gratis",
      popular: false,
    },
    {
      name: "Premium",
      price: "4.99€",
      period: "mes",
      description: "Para quienes quieren aprovechar al máximo su armario.",
      features: [
        "Prendas ilimitadas",
        "Outfits ilimitados",
        "Planificación mensual",
        "Categorización avanzada",
        "Etiquetado personalizado",
        "Recomendaciones inteligentes",
        "Grupos ilimitados",
        "Almacenamiento premium",
        "Soporte prioritario",
      ],
      buttonText: "Suscribirse",
      popular: true,
    },
  ]

  return (
    <section id="planes" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Planes y Precios</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Elige el plan que mejor se adapte a tus necesidades.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-lg border p-6 ${plan.popular ? "border-rose-500 shadow-lg" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-rose-500 px-3 py-1 text-xs font-medium text-white">
                  Más popular
                </div>
              )}
              <div className="mb-4 space-y-2">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">/{plan.period}</span>}
                </div>
                <p className="text-center text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="mb-6 space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-rose-500" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.limitations &&
                  plan.limitations.map((limitation, limitationIndex) => (
                    <li key={limitationIndex} className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-sm">✕</span>
                      <span>{limitation}</span>
                    </li>
                  ))}
              </ul>
              <SignUpButton mode="modal">
                <Button
                  className={`w-full ${plan.popular ? "bg-rose-500 hover:bg-rose-600" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </SignUpButton>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-3xl mt-8 text-center">
          <p className="text-muted-foreground">
            Todos los planes incluyen acceso a la aplicación web, sincronización entre dispositivos y actualizaciones
            regulares. Puedes cambiar o cancelar tu plan en cualquier momento.
          </p>
        </div>
      </div>
    </section>
  )
}
