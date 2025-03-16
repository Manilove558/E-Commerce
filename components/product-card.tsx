"use client"

import type React from "react"

import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "./cart-provider"
import { useWishlist } from "./wishlist-provider"
import { Badge } from "./ui/badge"
import type { Product } from "@/lib/products"
import { useRouter } from "next/navigation"
import { useCurrency } from "./currency-selector"
import { convertPrice, formatPrice } from "@/lib/currency"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { currency } = useCurrency()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const router = useRouter()

  const displayPrice = convertPrice(product.price, "USD", currency)
  const displayOriginalPrice = product.originalPrice ? convertPrice(product.originalPrice, "USD", currency) : null

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click when clicking wishlist button
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click when clicking add to cart button
    addToCart(product)
  }

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={() => router.push(`/product/${product.id}`)}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-all hover:scale-105"
          />
          <Button
            size="icon"
            variant="ghost"
            className={`absolute right-2 top-2 h-8 w-8 rounded-full backdrop-blur-sm
              ${isInWishlist(product.id) ? "bg-primary text-primary-foreground" : "bg-white/80"}`}
            onClick={toggleWishlist}
          >
            <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
            <span className="sr-only">Add to wishlist</span>
          </Button>
          {product.isSale && (
            <Badge variant="destructive" className="absolute left-2 top-2">
              Sale
            </Badge>
          )}
          {product.isTopSeller && (
            <Badge variant="secondary" className="absolute left-2 top-10">
              Top Seller
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2 mt-2">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="space-y-1">
          <div className="font-bold text-lg">{formatPrice(displayPrice, currency)}</div>
          {displayOriginalPrice && (
            <div className="text-sm text-muted-foreground line-through">
              {formatPrice(displayOriginalPrice, currency)}
            </div>
          )}
        </div>
        <Button onClick={handleAddToCart} size="sm">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

