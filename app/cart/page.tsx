"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { useCart } from "@/components/cart-provider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { calculateShipping, type ShippingAddress } from "@/lib/shipping"
import { getUserDetails } from "@/lib/user-storage"
import { getCurrentSession } from "@/lib/auth"

const categoryNames = {
  "mens-clothing": "Men's Clothing",
  "womens-clothing": "Women's Clothing",
  "kids-wear": "Kids Wear",
  combo: "Combo Offers",
  hoodies: "Hoodies",
}

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [address, setAddress] = useState<
    ShippingAddress & {
      fullName: string
      streetAddress: string
      city: string
      phone: string
    }
  >({
    fullName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    phone: "",
  })
  const [savedAddresses, setSavedAddresses] = useState<any[]>([])

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = calculateShipping(subtotal, {
    country: address.country,
    state: address.state,
    zipCode: address.zipCode,
  })
  const total = subtotal + shipping

  // Fetch user's saved addresses
  useEffect(() => {
    const fetchUserDetails = async () => {
      const session = getCurrentSession()
      if (session?.user) {
        const details = await getUserDetails(session.user.id)
        if (details?.addresses?.length) {
          setSavedAddresses(details.addresses)
          // Pre-fill with default address if available
          const defaultAddress = details.addresses.find((addr) => addr.isDefault)
          if (defaultAddress) {
            setAddress({
              fullName: defaultAddress.fullName,
              streetAddress: defaultAddress.streetAddress,
              city: defaultAddress.city,
              state: defaultAddress.state,
              zipCode: defaultAddress.zipCode,
              country: defaultAddress.country,
              phone: defaultAddress.phone || "",
            })
          }
        }
      }
    }

    fetchUserDetails()
  }, [])

  const handleAddressSelect = (addressId: string) => {
    const selectedAddress = savedAddresses.find((addr) => addr.id === addressId)
    if (selectedAddress) {
      setAddress({
        fullName: selectedAddress.fullName,
        streetAddress: selectedAddress.streetAddress,
        city: selectedAddress.city,
        state: selectedAddress.state,
        zipCode: selectedAddress.zipCode,
        country: selectedAddress.country,
        phone: selectedAddress.phone || "",
      })
    }
  }

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    try {
      // Save address if user is logged in
      const session = getCurrentSession()
      if (session?.user) {
        await fetch("/api/user/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: session.user.id,
            updates: {
              addresses: [
                ...savedAddresses,
                {
                  ...address,
                  id: Math.random().toString(36).substr(2, 9),
                  type: "shipping",
                },
              ],
            },
          }),
        })
      }

      // Process checkout
      await new Promise((resolve) => setTimeout(resolve, 2000))
      clearCart()
      // Redirect to success page or show success message
    } catch (error) {
      console.error("Checkout error:", error)
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="md:col-span-2">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 rounded-lg border p-4">
                      <div className="relative h-16 w-16">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="destructive" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="rounded-lg border p-6">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-6 space-y-4">
                  <h3 className="font-medium">Shipping Address</h3>
                  {savedAddresses.length > 0 && (
                    <div className="space-y-2">
                      <Label htmlFor="saved-address">Select Saved Address</Label>
                      <Select onValueChange={handleAddressSelect}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an address" />
                        </SelectTrigger>
                        <SelectContent>
                          {savedAddresses.map((addr) => (
                            <SelectItem key={addr.id} value={addr.id}>
                              {addr.fullName} - {addr.streetAddress}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={address.fullName}
                          onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={address.phone}
                          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="streetAddress">Street Address</Label>
                      <Input
                        id="streetAddress"
                        value={address.streetAddress}
                        onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select
                          value={address.country}
                          onValueChange={(value) => setAddress({ ...address, country: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="GB">United Kingdom</SelectItem>
                            {/* Add more countries as needed */}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={address.state}
                          onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={address.city}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={address.zipCode}
                          onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleCheckout} disabled={isCheckingOut}>
                    {isCheckingOut ? "Processing..." : "Checkout"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

