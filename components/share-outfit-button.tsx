"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { shareOutfit } from "@/lib/supabase/actions"
import { createClient } from "@/lib/supabase/client"
import { Share } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface ShareOutfitButtonProps {
  groupId: string
  userId: string
}

export function ShareOutfitButton({ groupId, userId }: ShareOutfitButtonProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [outfits, setOutfits] = useState<Array<{ id: string; name: string }>>([])
  const [selectedOutfitId, setSelectedOutfitId] = useState<string>("")
  const [open, setOpen] = useState(false)

  const loadOutfits = async () => {
    const supabase = createClient()

    const { data } = await supabase
      .from("outfits")
      .select("id, name")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    setOutfits(data || [])
  }

  const handleShare = async () => {
    if (!selectedOutfitId) {
      toast({
        title: "Selecciona un outfit",
        description: "Debes seleccionar un outfit para compartir.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await shareOutfit(selectedOutfitId, groupId)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Outfit compartido",
          description: "El outfit ha sido compartido exitosamente en el grupo.",
        })
        setOpen(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al compartir el outfit.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen)
        if (newOpen) {
          loadOutfits()
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Share className="mr-2 h-4 w-4" />
          Compartir outfit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartir outfit</DialogTitle>
          <DialogDescription>Selecciona un outfit de tu colección para compartir en este grupo.</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {outfits.length > 0 ? (
            <ScrollArea className="h-72">
              <RadioGroup value={selectedOutfitId} onValueChange={setSelectedOutfitId}>
                {outfits.map((outfit) => (
                  <div key={outfit.id} className="flex items-center space-x-2 mb-2 p-2 rounded-md hover:bg-muted">
                    <RadioGroupItem value={outfit.id} id={outfit.id} />
                    <Label htmlFor={outfit.id} className="flex-1 cursor-pointer">
                      {outfit.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </ScrollArea>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No tienes outfits para compartir. Crea uno primero.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleShare} disabled={isLoading || outfits.length === 0}>
            {isLoading ? "Compartiendo..." : "Compartir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
