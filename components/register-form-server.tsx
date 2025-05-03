"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { registerUser } from "@/lib/actions/auth-actions"

const formSchema = z.object({
  username: z.string().min(3, {
    message: "El nombre de usuario debe tener al menos 3 caracteres.",
  }),
  fullName: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un email válido.",
  }),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
})

export function RegisterFormServer() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setDebugInfo(null)

    try {
      const result = await registerUser({
        email: values.email,
        password: values.password,
        username: values.username,
        fullName: values.fullName,
      })

      if (!result.success) {
        setDebugInfo(`Error: ${result.error}`)
        toast({
          title: "Error",
          description: result.error || "Hubo un problema al crear tu cuenta. Inténtalo de nuevo.",
          variant: "destructive",
        })
        return
      }

      setDebugInfo("Usuario registrado correctamente")
      toast({
        title: "Cuenta creada",
        description: "Tu cuenta ha sido creada exitosamente. Verifica tu correo electrónico.",
      })

      // Redirigir al dashboard
      router.push("/dashboard")
      router.refresh()
    } catch (error: any) {
      console.error("Error de registro:", error)
      setDebugInfo(`Error inesperado: ${error.message}`)
      toast({
        title: "Error",
        description: "Hubo un problema al crear tu cuenta. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de usuario</FormLabel>
                <FormControl>
                  <Input placeholder="usuario123" {...field} />
                </FormControl>
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
                  <Input placeholder="Juan Pérez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="tu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={isLoading}>
            {isLoading ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
        </form>
      </Form>

      {debugInfo && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="font-semibold">Información de depuración:</h3>
          <p className="text-sm">{debugInfo}</p>
        </div>
      )}
    </>
  )
}
