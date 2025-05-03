"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { uploadImage } from "@/lib/supabase/actions"
import { useToast } from "@/hooks/use-toast"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (!file.type.includes("image")) {
      toast({
        title: "Tipo de archivo no válido",
        description: "Por favor selecciona una imagen.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsUploading(true)
      const result = await uploadImage(file)

      if (result.error) {
        toast({
          title: "Error al subir la imagen",
          description: result.error,
          variant: "destructive",
        })
      } else if (result.url) {
        onChange(result.url)
      }
    } catch (error) {
      toast({
        title: "Error al subir la imagen",
        description: "Hubo un problema al subir la imagen. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    onChange("")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
        >
          {value ? (
            <div className="relative w-full h-full">
              <Image src={value || "/placeholder.svg"} alt="Imagen subida" fill className="object-contain p-2" />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleRemove()
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
              </p>
              <p className="text-xs text-muted-foreground">PNG, JPG o WEBP (máx. 5MB)</p>
              {isUploading && <p className="mt-2 text-sm text-muted-foreground">Subiendo...</p>}
            </div>
          )}
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={isUploading}
          />
        </label>
      </div>
    </div>
  )
}
