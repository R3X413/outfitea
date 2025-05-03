"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { ClothingItem, Outfit } from "@/lib/types"
import { createOutfit, updateOutfit } from "@/lib/data"
import { ClothingItemSelector } from "@/components/clothing-item-selector"
import { OutfitPreview } from "@/components/outfit-preview"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  occasion: z.string().min(1, {
    message: "Por favor selecciona una ocasión.",
  }),
  season: z.string().min(1, {
    message: "Por favor selecciona una temporada.",
  }),
  description: z.string().optional(),
  tags: z.string().optional(),
  itemIds: z.array(z.string()).min(1, {
    message: "Debes seleccionar al menos una prenda.",
  }),
})

interface OutfitFormProps {
  outfit?: Outfit
  clothingItems: ClothingItem[]
}

export function OutfitForm({ outfit, clothingItems }: OutfitFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>(outfit ? outfit.items : [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: outfit?.name || "",
      occasion: outfit?.occasion || "",
      season: outfit?.season || "",
      description: outfit?.description || "",
      tags: outfit?.tags ? outfit.tags.join(", ") : "",
      itemIds: outfit?.items.map((item) => item.id) || [],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const formData = {
        ...values,
        tags: values.tags ? values.tags.split(",").map((tag) => tag.trim()) : [],
      }

      if (outfit) {
        await updateOutfit(outfit.id, formData)
        toast({
          title: "Outfit actualizado",
          description: "El outfit ha sido actualizado exitosamente.",
        })
      } else {
        await createOutfit(formData)
        toast({
          title: "Outfit creado",
          description: "El outfit ha sido creado exitosamente.",
        })
      }

      router.push("/dashboard/outfits")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al guardar el outfit. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleItemsChange = (items: ClothingItem[]) => {
    setSelectedItems(items)
    form.setValue(
      "itemIds",
      items.map((item) => item.id),
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Outfit casual de verano" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="occasion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ocasión</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una ocasión" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="trabajo">Trabajo</SelectItem>
                      <SelectItem value="deporte">Deporte</SelectItem>
                      <SelectItem value="fiesta">Fiesta</SelectItem>
                      <SelectItem value="especial">Ocasión especial</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="season"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Temporada</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una temporada" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="primavera">Primavera</SelectItem>
                      <SelectItem value="verano">Verano</SelectItem>
                      <SelectItem value="otoño">Otoño</SelectItem>
                      <SelectItem value="invierno">Invierno</SelectItem>
                      <SelectItem value="todas">Todas las temporadas</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Etiquetas</FormLabel>
                  <FormControl>
                    <Input placeholder="casual, favorito, trabajo" {...field} />
                  </FormControl>
                  <FormDescription>Separa las etiquetas con comas</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descripción opcional del outfit" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="itemIds"
              render={() => (
                <FormItem>
                  <FormLabel>Prendas</FormLabel>
                  <FormControl>
                    <ClothingItemSelector
                      allItems={clothingItems}
                      selectedItems={selectedItems}
                      onChange={handleItemsChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Vista previa</h3>
              <OutfitPreview items={selectedItems} />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-rose-500 hover:bg-rose-600" disabled={isLoading}>
            {isLoading ? "Guardando..." : outfit ? "Actualizar outfit" : "Crear outfit"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
