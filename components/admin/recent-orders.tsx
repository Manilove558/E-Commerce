"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCurrency } from "@/components/currency-selector"
import { formatPrice } from "@/lib/currency"

export function RecentOrders() {
  const { currency } = useCurrency()

  // Mock data for recent orders
  const recentOrders = [
    {
      id: "ORD-7652",
      customer: {
        name: "Rahul Sharma",
        email: "rahul.s@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "processing",
      date: "2 hours ago",
      amount: 2499,
    },
    {
      id: "ORD-7651",
      customer: {
        name: "Priya Patel",
        email: "priya.p@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "shipped",
      date: "5 hours ago",
      amount: 3999,
    },
    {
      id: "ORD-7650",
      customer: {
        name: "Amit Kumar",
        email: "amit.k@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "delivered",
      date: "Yesterday",
      amount: 1299,
    },
    {
      id: "ORD-7649",
      customer: {
        name: "Neha Singh",
        email: "neha.s@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "delivered",
      date: "Yesterday",
      amount: 4599,
    },
    {
      id: "ORD-7648",
      customer: {
        name: "Vikram Reddy",
        email: "vikram.r@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "delivered",
      date: "2 days ago",
      amount: 2199,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-yellow-100 text-yellow-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {recentOrders.map((order) => (
        <div key={order.id} className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={order.customer.avatar} alt={order.customer.name} />
            <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{order.customer.name}</p>
            <p className="text-sm text-muted-foreground">{order.customer.email}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge className={getStatusColor(order.status)} variant="outline">
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
            <p className="text-sm text-muted-foreground">{order.date}</p>
          </div>
          <div className="text-right font-medium">{formatPrice(order.amount, currency)}</div>
        </div>
      ))}
      <div className="flex justify-center">
        <Button variant="outline" size="sm">
          View All Orders
        </Button>
      </div>
    </div>
  )
}

