"use client"

import { createContext, useContext, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/products"

type WishlistContextType = {
  wishlistItems: Product[]
  addToWishlist: (item: Product) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])

  const addToWishlist = (item: Product) => {
    setWishlistItems((prev) => {
      if (prev.find((i) => i.id === item.id)) {
        return prev
      }
      return [...prev, item]
    })
    toast({
      title: "Added to wishlist",
      description: `${item.name} has been added to your wishlist.`,
    })
  }

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
    })
  }

  const isInWishlist = (id: string) => {
    return wishlistItems.some((item) => item.id === id)
  }

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

