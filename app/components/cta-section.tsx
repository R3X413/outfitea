import { SignUpButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Comienza a organizar tu armario hoy
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Únete a miles de personas que ya están maximizando su vestuario con Outfitea.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <SignUpButton mode="modal">
              <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                Registrarse gratis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </SignUpButton>
            <Button size="lg" variant="outline">
              Saber más
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
