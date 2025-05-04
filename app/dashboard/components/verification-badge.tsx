import { BadgeCheck } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface VerificationBadgeProps {
  size?: "sm" | "md" | "lg"
}

export function VerificationBadge({ size = "md" }: VerificationBadgeProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <BadgeCheck className={`${sizeClasses[size]} text-rose-500`} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Cuenta verificada</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
