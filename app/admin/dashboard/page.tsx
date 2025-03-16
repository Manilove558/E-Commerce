"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  LineChart,
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { SalesChart } from "@/components/admin/sales-chart"
import { RevenueReport } from "@/components/admin/revenue-report"
import { TopProducts } from "@/components/admin/top-products"
import { CustomerStats } from "@/components/admin/customer-stats"
import { RecentOrders } from "@/components/admin/recent-orders"
import { DateRangePicker } from "@/components/admin/date-range-picker"
import { useCurrency } from "@/components/currency-selector"
import { formatPrice } from "@/lib/currency"

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })
  const { currency } = useCurrency()

  // Mock data for dashboard
  const stats = [
    {
      title: "Total Revenue",
      value: 124500,
      change: 14.5,
      increasing: true,
      icon: DollarSign,
    },
    {
      title: "Orders",
      value: 450,
      change: 5.6,
      increasing: true,
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      value: 2100,
      change: 12.3,
      increasing: true,
      icon: Users,
    },
    {
      title: "Conversion Rate",
      value: 3.2,
      change: -0.8,
      increasing: false,
      icon: TrendingUp,
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Store Dashboard</h2>
        <div className="flex items-center gap-2">
        <div suppressHydrationWarning>{dateRange?.from.toDateString()}</div>

          <Button>Export Report</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <div className="rounded-full bg-muted p-2">
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {stat.title === "Conversion Rate"
                      ? `${stat.value}%`
                      : stat.title === "Orders" || stat.title === "Customers"
                        ? stat.value.toLocaleString()
                        : formatPrice(stat.value, currency)}
                  </p>
                  <div className="flex items-center">
                    {stat.increasing ? (
                      <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-xs ${stat.increasing ? "text-green-500" : "text-red-500"}`}>
                      {stat.change}%
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">from last month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Sales
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Customers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Daily revenue for the selected period</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <SalesChart dateRange={dateRange} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest 5 orders from your store</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentOrders />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Your best-selling products this month</CardDescription>
              </CardHeader>
              <CardContent>
                <TopProducts />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
                <CardDescription>Sales distribution across product categories</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-80 w-80">
                  <RevenueReport />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>Detailed sales data for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <SalesChart dateRange={dateRange} detailed />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>View and analyze your product performance</CardDescription>
            </CardHeader>
            <CardContent>
              <TopProducts detailed />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Analytics</CardTitle>
              <CardDescription>Understand your customer base better</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerStats />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

