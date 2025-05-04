"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import Image from "next/image"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Datos simulados para outfits planificados
  const plannedOutfits = [
    {
      id: 1,
      name: "Casual de oficina",
      date: new Date(2023, 4, 8), // Mayo 8, 2023
      image: "/placeholder.svg?height=300&width=200",
      occasion: "Trabajo",
    },
    {
      id: 2,
      name: "Reunión importante",
      date: new Date(2023, 4, 10), // Mayo 10, 2023
      image: "/placeholder.svg?height=300&width=200",
      occasion: "Trabajo",
    },
    {
      id: 3,
      name: "Cena con amigos",
      date: new Date(2023, 4, 12), // Mayo 12, 2023
      image: "/placeholder.svg?height=300&width=200",
      occasion: "Social",
    },
    {
      id: 4,
      name: "Casual de fin de semana",
      date: new Date(2023, 4, 13), // Mayo 13, 2023
      image: "/placeholder.svg?height=300&width=200",
      occasion: "Casual",
    },
    {
      id: 5,
      name: "Evento formal",
      date: new Date(2023, 4, 15), // Mayo 15, 2023
      image: "/placeholder.svg?height=300&width=200",
      occasion: "Formal",
    },
  ]

  // Función para verificar si hay un outfit planificado para una fecha
  const hasOutfitForDate = (date: Date) => {
    return plannedOutfits.some(
      (outfit) =>
        outfit.date.getDate() === date.getDate() &&
        outfit.date.getMonth() === date.getMonth() &&
        outfit.date.getFullYear() === date.getFullYear(),
    )
  }

  // Función para obtener los outfits para una fecha específica
  const getOutfitsForDate = (date: Date) => {
    return plannedOutfits.filter(
      (outfit) =>
        outfit.date.getDate() === date.getDate() &&
        outfit.date.getMonth() === date.getMonth() &&
        outfit.date.getFullYear() === date.getFullYear(),
    )
  }

  // Outfits para la fecha seleccionada
  const selectedDateOutfits = selectedDate ? getOutfitsForDate(selectedDate) : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendario de Outfits</h1>
          <p className="text-muted-foreground">Planifica tus outfits para cada día</p>
        </div>
        <Button className="bg-rose-500 hover:bg-rose-600">
          <Plus className="mr-2 h-4 w-4" />
          Planificar outfit
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-7 lg:grid-cols-3">
        <Card className="md:col-span-3 lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendario</CardTitle>
            <CardDescription>Selecciona una fecha para ver o planificar outfits</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate)
                setSelectedDate(newDate)
              }}
              className="rounded-md border"
              modifiers={{
                booked: (date) => hasOutfitForDate(date),
              }}
              modifiersStyles={{
                booked: {
                  backgroundColor: "rgba(244, 63, 94, 0.1)",
                  color: "rgb(244, 63, 94)",
                  fontWeight: "bold",
                },
              }}
              components={{
                IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                IconRight: () => <ChevronRight className="h-4 w-4" />,
              }}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-4 lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedDate
                ? `Outfits para ${selectedDate.toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}`
                : "Selecciona una fecha"}
            </CardTitle>
            <CardDescription>
              {selectedDateOutfits.length > 0
                ? `${selectedDateOutfits.length} outfit(s) planificado(s)`
                : "No hay outfits planificados para esta fecha"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDateOutfits.length > 0 ? (
              <div className="space-y-4">
                {selectedDateOutfits.map((outfit) => (
                  <div key={outfit.id} className="flex border rounded-lg overflow-hidden">
                    <div className="w-1/3 relative">
                      <Image src={outfit.image || "/placeholder.svg"} alt={outfit.name} fill className="object-cover" />
                    </div>
                    <div className="w-2/3 p-4">
                      <h3 className="font-medium text-lg">{outfit.name}</h3>
                      <p className="text-sm text-muted-foreground">Ocasión: {outfit.occasion}</p>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          Ver detalles
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No hay outfits planificados</h3>
                <p className="text-muted-foreground mb-4">
                  Planifica un outfit para {selectedDate?.toLocaleDateString("es-ES", { weekday: "long" })}
                </p>
                <Button className="bg-rose-500 hover:bg-rose-600">Planificar outfit</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximos outfits planificados</CardTitle>
          <CardDescription>Vista general de tu planificación de vestuario</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {plannedOutfits
              .filter((outfit) => outfit.date >= new Date())
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 6)
              .map((outfit) => (
                <div key={outfit.id} className="border rounded-lg overflow-hidden">
                  <div className="relative aspect-[3/4]">
                    <Image src={outfit.image || "/placeholder.svg"} alt={outfit.name} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{outfit.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {outfit.date.toLocaleDateString("es-ES", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </p>
                    <p className="text-sm">{outfit.occasion}</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
