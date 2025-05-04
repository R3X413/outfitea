import Image from "next/image"
import { SignUpButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Tu armario digital para planificar tus outfits
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Organiza tu ropa digitalmente, crea combinaciones de outfits, planifica tu vestuario y comparte con
                amigos.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <SignUpButton mode="modal">
                <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                  Comenzar ahora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </SignUpButton>
              <Button size="lg" variant="outline">
                Ver demostración
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-square">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Outfitea App Preview"
                width={600}
                height={600}
                className="rounded-lg shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
