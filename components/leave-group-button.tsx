"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { leaveGroup } from "@/lib/supabase/actions"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

interface LeaveGroupButtonProps {
  groupId: string
}

export function LeaveGroupButton({ groupId }: LeaveGroupButtonProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLeave = async () => {
    setIsLoading(true)

    try {
      const result = await leaveGroup(groupId)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Has abandonado el grupo",
          description: "Has salido del grupo exitosamente.",
        })
        router.push("/dashboard/grupos")
        router.refresh()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al abandonar el grupo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="text-destructive hover:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Abandonar grupo
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Abandonarás el grupo y perderás acceso a todos los outfits compartidos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLeave}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? "Abandonando..." : "Abandonar grupo"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
