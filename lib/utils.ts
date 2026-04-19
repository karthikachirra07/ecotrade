import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// 🔥 Required for shadcn/ui
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}

// Your existing functions
export function calculateCarbon(distance: number) {
  return distance * 0.12
}

export function averageEcoScore(items: any[]) {
  if (!items.length) return 0
  return Math.round(
    items.reduce((a, b) => a + b.ecoScore, 0) / items.length
  )
}