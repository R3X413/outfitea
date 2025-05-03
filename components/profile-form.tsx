"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { updateProfile } from "@/lib/supabase/actions"
import { ImageUpload } from "@/components/image-upload"

const formSchema = z.object({
  username: z.string().min(3, {
    message: "El nombre de usuario debe tener al menos 3 caracteres.",
  }),
  fullName: z.string().optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
})

interface ProfileFormProps {
  profile?: {
    id: string
    username: string
    full_name: string | null
    bio: string | null
    avatar_url: string | null
  }
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || "")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: profile?.username || "",
      fullName: profile?.full_name || "",
      bio: profile?.bio || "",
      avatarUrl: profile?.avatar_url || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const formData = {
        ...values,
        avatarUrl: avatarUrl || values.avatarUrl,
      }

      const result = await updateProfile(formData)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Perfil actualizado",
          description: "Tu perfil ha sido actualizado exitosamente.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al actualizar tu perfil. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarUpload = (url: string) => {
    setAvatarUrl(url)
    form.setValue("avatarUrl", url)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del perfil</CardTitle>
        <CardDescription>Actualiza tu información personal y foto de perfil.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de usuario</FormLabel>
                      <FormControl>
                        <Input placeholder="usuario" {...field} />
                      </FormControl>
                      <FormDescription>Este es tu nombre de usuario público.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Juan Pérez" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormDescription>Tu nombre completo (opcional).</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biografía</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Cuéntanos sobre ti..."
                          className="resize-none"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>Una breve descripción sobre ti (opcional).</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="avatarUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Foto de perfil</FormLabel>
                      <FormControl>
                        <ImageUpload value={avatarUrl || field.value} onChange={handleAvatarUpload} />
                      </FormControl>
                      <FormDescription>Sube una foto para tu perfil (opcional).</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar cambios"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
