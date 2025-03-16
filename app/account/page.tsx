"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { getUserById } from "@/lib/auth"
import { AlertCircle, PackageSearch } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
}

interface Order {
  id: string
  date: string
  status: string
  total: number
}

interface ReturnRequest {
  orderId: string
  reason: string
  videoUrl: string
}

export default function AccountPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const { toast } = useToast()
  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>([])
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [returnReason, setReturnReason] = useState("")
  const [returnVideo, setReturnVideo] = useState<File | null>(null)

  const handleReturnSubmit = async (orderId: string) => {
    if (!returnReason || !returnVideo) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide both a reason and unboxing video for your return.",
      })
      return
    }

    // In a real app, you would upload the video to a storage service
    // and send the URL to your backend
    const mockVideoUrl = URL.createObjectURL(returnVideo)

    setReturnRequests([
      ...returnRequests,
      {
        orderId,
        reason: returnReason,
        videoUrl: mockVideoUrl,
      },
    ])

    toast({
      title: "Return requested",
      description: "Your return request has been submitted successfully.",
    })

    setSelectedOrder(null)
    setReturnReason("")
    setReturnVideo(null)
  }

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // In a real app, get the user ID from session/token
        const userId = "1" // Example user ID
        const user = await getUserById(userId)

        if (user) {
          setProfile({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: "+1 234 567 890", // Example phone number
          })

          // In a real app, fetch orders from API
          // For now, leaving it empty to show the "no orders" state
          setOrders([])
        } else {
          setError("User not found")
        }
      } catch (err) {
        setError("Failed to load profile")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: profile.id,
          updates: {
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      toast({
        title: "Success! 🎉",
        description: "Your changes have been saved successfully ✨",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save changes. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 py-8">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-center h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                <p className="mt-4 text-muted-foreground">Loading...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 py-8">
          <div className="container px-4 md:px-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile && (
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          />
                        </div>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View your past orders and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <PackageSearch className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-semibold">No Orders Found</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        You haven't placed any orders yet. Start shopping to see your orders here.
                      </p>
                      <Button className="mt-4" onClick={() => (window.location.href = "/")}>
                        Start Shopping
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => {
                        const hasReturn = returnRequests.some((req) => req.orderId === order.id)

                        return (
                          <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">{order.id}</p>
                              <p className="text-sm text-muted-foreground">{order.date}</p>
                              <p className="text-sm text-muted-foreground">{order.status}</p>
                            </div>
                            <div className="text-right space-y-2">
                              <p className="font-medium">${order.total}</p>
                              {!hasReturn && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      Return Order
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Return Order #{order.id}</DialogTitle>
                                      <DialogDescription>
                                        Please provide the required information for your return request.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="reason">Return Reason</Label>
                                        <Input
                                          id="reason"
                                          placeholder="Why are you returning this order?"
                                          value={returnReason}
                                          onChange={(e) => setReturnReason(e.target.value)}
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="video">Unboxing Video</Label>
                                        <Input
                                          id="video"
                                          type="file"
                                          accept="video/*"
                                          onChange={(e) => setReturnVideo(e.target.files?.[0] || null)}
                                        />
                                        <p className="text-sm text-muted-foreground">
                                          Please upload a video showing the unboxing and condition of your items.
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex justify-end">
                                      <Button onClick={() => handleReturnSubmit(order.id)}>
                                        Submit Return Request
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              )}
                              {hasReturn && <Badge variant="secondary">Return Requested</Badge>}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>Manage your shipping addresses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">Home</p>
                          <p className="text-sm text-muted-foreground">
                            123 Main St, Apt 4B
                            <br />
                            New York, NY 10001
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full">Add New Address</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

