"use client"
import { useRouter, usePathname } from "next/navigation"
import { ShoppingCart, Heart, Menu, Star, UserCircle2, PenIcon as Pants, BabyIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "./cart-provider"
import { useState, useEffect } from "react"
import { SearchDialog } from "./search-dialog"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { PackageIcon } from "lucide-react"
import { useToast } from "./ui/use-toast"
import { CurrencySelector } from "./currency-selector"

const categories = [
  { name: "Men's Clothing", href: "/category/mens-clothing", icon: UserCircle2 },
  {
    name: "Women's Clothing",
    href: "/category/womens-clothing",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M16 2s1.5 2 2 3c.5 1.5 0 2 0 2" />
        <path d="M12 2s-1.5 2-2 3c-.5 1.5 0 2 0 2" />
        <path d="M9 18h6" />
        <path d="M12 10h.01" />
        <path d="M12 6a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2v0a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2h0" />
      </svg>
    ),
  },
  { name: "Kids Wear", href: "/category/kids-wear", icon: BabyIcon },
  { name: "Combo Offers", href: "/category/combo", icon: PackageIcon },
  {
    name: "Hoodies",
    href: "/category/hoodies",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M12 2L8 6l4 4V2zM12 6l4-4-4 4" />
        <path d="M12 17c-2 0-6-2-6-7v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-9c0 5-4 7-6 7Z" />
        <path d="M12 17c2 0 6-2 6-7V6L12 2 6 6v4c0 5 4 7 6 7Z" />
      </svg>
    ),
  },
  { name: "Track Pants", href: "/category/track-pants", icon: Pants },
]

// Mock getCurrentSession function for demonstration purposes
const getCurrentSession = () => {
  // Replace this with your actual session retrieval logic
  return null // Or return a mock session object
}

export function SiteHeader() {
  const { cartItems } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Check authentication status on mount
  useEffect(() => {
    const session = getCurrentSession()
    setIsLoggedIn(!!session?.user)
  }, [])

  // Handle navigation with error boundary
  const handleNavigation = (href: string) => {
    try {
      router.push(href)
    } catch (error) {
      console.error("Navigation error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to navigate. Please try again.",
      })
    }
  }

  // Check if link is active
  const isLinkActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + "/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus:ring-0 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Browse categories and more</SheetDescription>
            </SheetHeader>
            <nav className="mt-6">
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-semibold">Categories</h3>
                <div className="grid gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon
                    return (
                      <button
                        key={category.href}
                        onClick={() => {
                          handleNavigation(category.href)
                          setMobileMenuOpen(false)
                        }}
                        className={cn(
                          "flex items-center px-2 py-1.5 text-sm hover:bg-muted rounded-md",
                          isLinkActive(category.href) && "bg-muted font-medium",
                        )}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {category.name}
                      </button>
                    )
                  })}
                </div>
              </div>
              <Separator className="my-4" />
              <div className="mb-4">
                <button
                  onClick={() => {
                    handleNavigation("/category/top-sellers")
                    setMobileMenuOpen(false)
                  }}
                  className={cn(
                    "flex items-center px-2 py-1.5 text-sm hover:bg-muted rounded-md w-full text-left",
                    isLinkActive("/category/top-sellers") && "bg-muted font-medium",
                  )}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Top Sellers
                </button>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-2">
                <button
                  onClick={() => {
                    handleNavigation(isLoggedIn ? "/account" : "/auth/login")
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center px-2 py-1.5 text-sm hover:bg-muted rounded-md"
                >
                  <UserCircle2 className="mr-2 h-4 w-4" />
                  {isLoggedIn ? "My Account" : "Login / Register"}
                </button>
                <button
                  onClick={() => {
                    handleNavigation("/cart")
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center px-2 py-1.5 text-sm hover:bg-muted rounded-md"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Cart {cartItems.length > 0 && `(${cartItems.length})`}
                </button>
                <button
                  onClick={() => {
                    handleNavigation("/wishlist")
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center px-2 py-1.5 text-sm hover:bg-muted rounded-md"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <Button
          variant="ghost"
          className="mr-6 px-0 font-bold text-xl text-primary"
          onClick={() => handleNavigation("/")}
        >
          _5201314_
        </Button>

        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.href}
                onClick={() => handleNavigation(category.href)}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  isLinkActive(category.href) && "text-primary",
                )}
              >
                <Icon className="mr-1 h-4 w-4" />
                {category.name}
              </button>
            )
          })}
          <button
            onClick={() => handleNavigation("/category/top-sellers")}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              isLinkActive("/category/top-sellers") && "text-primary",
            )}
          >
            <Star className="mr-1 h-4 w-4" />
            Top Sellers
          </button>
        </div>

        <div className="flex flex-1 items-center space-x-2 sm:space-x-4 justify-end">
          <CurrencySelector />
          <div
            className={cn(
              "w-full max-w-lg hidden md:flex transition-all duration-200",
              isSearchExpanded ? "max-w-2xl" : "max-w-lg",
            )}
          >
            <SearchDialog
              onMouseEnter={() => setIsSearchExpanded(true)}
              onMouseLeave={() => setIsSearchExpanded(false)}
            />
          </div>
          <nav className="flex items-center space-x-2">
            <div className="md:hidden">
              <SearchDialog />
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleNavigation(isLoggedIn ? "/account" : "/auth/login")}
              aria-label={isLoggedIn ? "My Account" : "Login"}
            >
              <UserCircle2 className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => handleNavigation("/wishlist")} aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleNavigation("/cart")}
              className="relative"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </nav>
        </div>
      </div>

      {/* <div className="bg-red-500 text-white py-2 text-center text-sm font-medium">
        🔥 Sale is Live! Free shipping on orders over ₹4,373.53
      </div> */}
      
    </header>
  )
}

