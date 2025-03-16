"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DateRangePicker } from "@/components/admin/date-range-picker"
import { SalesChart } from "@/components/admin/sales-chart"
import { RevenueReport } from "@/components/admin/revenue-report"
import { CustomerStats } from "@/components/admin/customer-stats"
import { Download, FileText, Mail, Printer } from "lucide-react"
import { useCurrency } from "@/components/currency-selector"
import { formatPrice } from "@/lib/currency"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })
  const { currency } = useCurrency()

  // Mock data for reports
  const salesSummary = {
    totalSales: 124500,
    totalOrders: 450,
    averageOrderValue: 276.67,
    conversionRate: 3.2,
    topSellingProducts: [
      { name: "Classic White T-Shirt", sales: 78, revenue: 1559.22 },
      { name: "Premium Zip Hoodie", sales: 65, revenue: 2924.35 },
      { name: "Floral Summer Dress", sales: 52, revenue: 2599.48 },
      { name: "Kids Dinosaur Hoodie", sales: 45, revenue: 1349.55 },
      { name: "Family Pack - Basic Tees", sales: 38, revenue: 2279.62 },
    ],
    topCategories: [
      { name: "Men's Clothing", sales: 180, revenue: 5400 },
      { name: "Women's Clothing", sales: 150, revenue: 7500 },
      { name: "Hoodies", sales: 120, revenue: 5400 },
      { name: "Kids Wear", sales: 100, revenue: 3000 },
      { name: "Combo Offers", sales: 80, revenue: 4800 },
    ],
  }

  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
        <div className="flex items-center gap-2">
          <DateRangePicker dateRange={dateRange} onChange={setDateRange} />
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Sales Report</TabsTrigger>
          <TabsTrigger value="products">Product Performance</TabsTrigger>
          <TabsTrigger value="customers">Customer Analysis</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Report</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPrice(salesSummary.totalSales, currency)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{salesSummary.totalOrders}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPrice(salesSummary.averageOrderValue, currency)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{salesSummary.conversionRate}%</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sales Trend</CardTitle>
              <CardDescription>Sales performance over the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <SalesChart dateRange={dateRange} detailed />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Products with the highest sales volume</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Units Sold</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesSummary.topSellingProducts.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.sales}</TableCell>
                        <TableCell>{formatPrice(product.revenue, currency)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
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

          <div className="flex justify-end space-x-4">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print Report
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Save as PDF
            </Button>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Email Report
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Detailed analysis of product sales and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Units Sold</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>% of Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesSummary.topCategories.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.sales}</TableCell>
                      <TableCell>{formatPrice(category.revenue, currency)}</TableCell>
                      <TableCell>{Math.round((category.revenue / salesSummary.totalSales) * 100)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
              <CardDescription>Overview of your current inventory status</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This report provides insights into your inventory status, including stock levels, product turnover
                rates, and reorder recommendations.
              </p>
              <div className="flex justify-center py-12">
                <Button variant="outline" asChild>
                  <a href="/admin/inventory">View Inventory Management</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

