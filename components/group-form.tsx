"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { createGroup } from "@/lib/supabase/actions"
import { ImageUpload } from "@/components/image-upload"

const formSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres.",
  }),
  description: z.string().optional(),
  isPrivate: z.boolean().default(true),
  imageUrl: z.string().optional(),
})

interface GroupFormProps {
  group?: {
    id: string
    name: string
    description: string | null
    is_private: boolean
    image_url: string | null
  }
}

export function GroupForm({ group }: GroupFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(group?.image_url || "")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: group?.name || "",
      description: group?.description || "",
      isPrivate: group?.is_private !== undefined ? group.is_private : true,
      imageUrl: group?.image_url || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const formData = {
        ...values,
        imageUrl: imageUrl || values.imageUrl,
      }

      const result = await createGroup(formData)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Grupo creado",
          description: "El grupo ha sido creado exitosamente.",
        })
        router.push(`/dashboard/grupos/${result.data?.id}`)
        router.refresh()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al crear el grupo. Inténtalo de nuevo.",
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
                  <FormLabel>Nombre del grupo</FormLabel>
                  <FormControl>
                    <Input placeholder="Amantes de la moda" {...field} />
                  </FormControl>
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
                    <Textarea
                      placeholder="Describe el propósito del grupo..."
                      className="resize-none"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>Una breve descripción del grupo y su propósito.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPrivate"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Grupo privado</FormLabel>
                    <FormDescription>Los grupos privados requieren invitación para unirse.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
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
                  <FormLabel>Imagen del grupo</FormLabel>
                  <FormControl>
                    <ImageUpload value={imageUrl || field.value} onChange={handleImageUpload} />
                  </FormControl>
                  <FormDescription>Sube una imagen para tu grupo (opcional)</FormDescription>
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
            {isLoading ? "Creando..." : "Crear grupo"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
