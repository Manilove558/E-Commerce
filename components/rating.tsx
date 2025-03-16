"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps {
  value?: number
  onChange?: (value: number) => void
  readonly?: boolean
}

export function Rating({ value = 0, onChange, readonly = false }: RatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          className={cn("text-primary transition-colors", !readonly && "cursor-pointer hover:text-primary")}
          onClick={() => onChange?.(rating)}
          disabled={readonly}
        >
          <Star
            className={cn("w-5 h-5", rating <= (value || 0) ? "fill-primary" : "fill-muted stroke-muted-foreground")}
          />
          <span className="sr-only">Rate {rating} out of 5</span>
        </button>
      ))}
    </div>
  )
}

