"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package2, CheckCircle2, Truck, MapPin } from "lucide-react"

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [isTracking, setIsTracking] = useState(false)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    setIsTracking(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="container max-w-2xl px-4">
          <Card>
            <CardHeader>
              <CardTitle>Track Your Order</CardTitle>
              <CardDescription>Enter your order number to track your package</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrack} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">Order Number</Label>
                  <Input
                    id="orderNumber"
                    placeholder="Enter your order number"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Track Order
                </Button>
              </form>

              {isTracking && (
                <div className="mt-8 space-y-6">
                  <div className="relative">
                    <div className="absolute left-4 top-0 h-full w-px bg-muted-foreground/20" />
                    <div className="space-y-8">
                      <div className="relative flex items-center">
                        <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Package2 className="h-4 w-4" />
                        </div>
                        <div className="ml-12">
                          <h3 className="font-medium">Order Confirmed</h3>
                          <p className="text-sm text-muted-foreground">Your order has been confirmed</p>
                        </div>
                      </div>
                      <div className="relative flex items-center">
                        <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div className="ml-12">
                          <h3 className="font-medium">Processing</h3>
                          <p className="text-sm text-muted-foreground">Your order is being processed</p>
                        </div>
                      </div>
                      <div className="relative flex items-center">
                        <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                          <Truck className="h-4 w-4" />
                        </div>
                        <div className="ml-12">
                          <h3 className="font-medium">In Transit</h3>
                          <p className="text-sm text-muted-foreground">Pending</p>
                        </div>
                      </div>
                      <div className="relative flex items-center">
                        <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div className="ml-12">
                          <h3 className="font-medium">Delivered</h3>
                          <p className="text-sm text-muted-foreground">Pending</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

