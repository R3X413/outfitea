"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { requestVerification } from "@/lib/supabase/actions"
import { formatDate } from "@/lib/utils"

interface VerificationStatusProps {
  isVerified: boolean
  verificationRequest?: {
    id: string
    status: string
    requested_at: string
    processed_at: string | null
    notes: string | null
  } | null
}

export function VerificationStatus({ isVerified, verificationRequest }: VerificationStatusProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleRequestVerification = async () => {
    setIsLoading(true)

    try {
      const result = await requestVerification()

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Solicitud enviada",
          description: "Tu solicitud de verificación ha sido enviada. Revisaremos tu perfil pronto.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al enviar la solicitud.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estado de verificación</CardTitle>
        <CardDescription>Las cuentas verificadas tienen acceso a funciones adicionales.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          {isVerified ? (
            <>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="mr-1 h-4 w-4" />
                Verificado
              </Badge>
              <p className="text-sm text-muted-foreground">
                Tu cuenta está verificada. Disfruta de todas las funciones de Outfitea.
              </p>
            </>
          ) : verificationRequest?.status === "pending" ? (
            <>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                <Clock className="mr-1 h-4 w-4" />
                Pendiente
              </Badge>
              <p className="text-sm text-muted-foreground">
                Tu solicitud está siendo revisada. Solicitada el {formatDate(verificationRequest.requested_at)}.
              </p>
            </>
          ) : verificationRequest?.status === "rejected" ? (
            <>
              <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
                <AlertCircle className="mr-1 h-4 w-4" />
                Rechazada
              </Badge>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Tu solicitud fue rechazada el {formatDate(verificationRequest.processed_at || "")}.
                </p>
                {verificationRequest.notes && (
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm">{verificationRequest.notes}</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Badge variant="outline">No verificado</Badge>
              <p className="text-sm text-muted-foreground">
                Solicita la verificación para acceder a funciones adicionales.
              </p>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {!isVerified && verificationRequest?.status !== "pending" && (
          <Button onClick={handleRequestVerification} disabled={isLoading}>
            {isLoading ? "Enviando solicitud..." : "Solicitar verificación"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
