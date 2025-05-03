"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { formatDate } from "@/lib/utils"
import { processVerification } from "@/lib/supabase/actions"
import { useToast } from "@/hooks/use-toast"

type VerificationRequest = {
  id: string
  user_id: string
  status: "pending" | "approved" | "rejected"
  requested_at: string
  processed_at: string | null
  processed_by: string | null
  notes: string | null
  profiles: {
    username: string
    full_name: string | null
    avatar_url: string | null
  }
}

interface VerificationRequestListProps {
  requests: VerificationRequest[]
}

export function VerificationRequestList({ requests }: VerificationRequestListProps) {
  const { toast } = useToast()
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [notes, setNotes] = useState<string>("")

  const handleProcess = async (id: string, status: "approved" | "rejected") => {
    setProcessingId(id)

    try {
      const result = await processVerification(id, { status, notes })

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Solicitud procesada",
          description: `La solicitud ha sido ${status === "approved" ? "aprobada" : "rechazada"} correctamente.`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al procesar la solicitud.",
        variant: "destructive",
      })
    } finally {
      setProcessingId(null)
      setNotes("")
    }
  }

  if (requests.length === 0) {
    return <p className="text-muted-foreground">No hay solicitudes para mostrar.</p>
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={request.profiles.avatar_url || "/placeholder.svg?height=40&width=40"}
                    alt={request.profiles.username}
                  />
                  <AvatarFallback>{request.profiles.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{request.profiles.username}</p>
                  <p className="text-sm text-muted-foreground">{request.profiles.full_name || "Sin nombre"}</p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <Badge
                  variant={
                    request.status === "approved"
                      ? "success"
                      : request.status === "rejected"
                        ? "destructive"
                        : "outline"
                  }
                >
                  {request.status === "approved"
                    ? "Aprobada"
                    : request.status === "rejected"
                      ? "Rechazada"
                      : "Pendiente"}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  {request.status === "pending"
                    ? `Solicitada: ${formatDate(request.requested_at)}`
                    : `Procesada: ${formatDate(request.processed_at || "")}`}
                </p>
              </div>
            </div>

            {request.status === "pending" && (
              <div className="mt-4">
                <Textarea
                  placeholder="Notas (opcional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="resize-none"
                />
              </div>
            )}

            {request.notes && request.status !== "pending" && (
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-sm">{request.notes}</p>
              </div>
            )}
          </CardContent>

          {request.status === "pending" && (
            <CardFooter className="flex justify-end gap-2 p-4 pt-0">
              <Button variant="outline" onClick={() => handleProcess(request.id, "rejected")} disabled={!!processingId}>
                Rechazar
              </Button>
              <Button onClick={() => handleProcess(request.id, "approved")} disabled={!!processingId}>
                Aprobar
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  )
}
