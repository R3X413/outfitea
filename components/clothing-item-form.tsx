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
import type { ClothingItem } from "@/lib/types"
import { createClothingItem, updateClothingItem } from "@/lib/data"
import { ImageUpload } from "@/components/image-upload"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  category: z.string().min(1, {
    message: "Por favor selecciona una categoría.",
  }),
  color: z.string().min(1, {
    message: "Por favor selecciona un color.",
  }),
  colorName: z.string().min(1, {
    message: "Por favor ingresa el nombre del color.",
  }),
  season: z.string().min(1, {
    message: "Por favor selecciona una temporada.",
  }),
  brand: z.string().optional(),
  description: z.string().optional(),
  tags: z.string().optional(),
  imageUrl: z.string().optional(),
})

interface ClothingItemFormProps {
  item?: ClothingItem
}

export function ClothingItemForm({ item }: ClothingItemFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(item?.imageUrl || "")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item?.name || "",
      category: item?.category || "",
      color: item?.color || "#000000",
      colorName: item?.colorName || "",
      season: item?.season || "",
      brand: item?.brand || "",
      description: item?.description || "",
      tags: item?.tags ? item.tags.join(", ") : "",
      imageUrl: item?.imageUrl || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const formData = {
        ...values,
        imageUrl: imageUrl || values.imageUrl,
        tags: values.tags ? values.tags.split(",").map((tag) => tag.trim()) : [],
      }

      if (item) {
        await updateClothingItem(item.id, formData)
        toast({
          title: "Prenda actualizada",
          description: "La prenda ha sido actualizada exitosamente.",
        })
      } else {
        await createClothingItem(formData)
        toast({
          title: "Prenda creada",
          description: "La prenda ha sido agregada a tu armario digital.",
        })
      }

      router.push("/dashboard/prendas")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al guardar la prenda. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (url: string) => {
    setImageUrl(url)
    form.setValue("imageUrl", url)
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
                    <Input placeholder="Camiseta azul" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="camiseta">Camiseta</SelectItem>
                      <SelectItem value="camisa">Camisa</SelectItem>
                      <SelectItem value="blusa">Blusa</SelectItem>
                      <SelectItem value="suéter">Suéter</SelectItem>
                      <SelectItem value="chaqueta">Chaqueta</SelectItem>
                      <SelectItem value="pantalón">Pantalón</SelectItem>
                      <SelectItem value="jeans">Jeans</SelectItem>
                      <SelectItem value="falda">Falda</SelectItem>
                      <SelectItem value="vestido">Vestido</SelectItem>
                      <SelectItem value="zapatos">Zapatos</SelectItem>
                      <SelectItem value="accesorio">Accesorio</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input type="color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="colorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del color</FormLabel>
                    <FormControl>
                      <Input placeholder="Azul marino" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Input placeholder="Opcional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen</FormLabel>
                  <FormControl>
                    <ImageUpload value={imageUrl || field.value} onChange={handleImageUpload} />
                  </FormControl>
                  <FormDescription>Sube una foto de tu prenda</FormDescription>
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
                    <Textarea placeholder="Descripción opcional de la prenda" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-rose-500 hover:bg-rose-600" disabled={isLoading}>
            {isLoading ? "Guardando..." : item ? "Actualizar prenda" : "Crear prenda"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
