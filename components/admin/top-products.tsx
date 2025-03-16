"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useCurrency } from "@/components/currency-selector"
import { formatPrice } from "@/lib/currency"
import { products } from "@/lib/products"

interface TopProductsProps {
  detailed?: boolean
}

export function TopProducts({ detailed = false }: TopProductsProps) {
  const { currency } = useCurrency()
  const [topProducts, setTopProducts] = useState<any[]>([])

  useEffect(() => {
    // Use the existing products and add mock sales data
    const productsWithSales = products.slice(0, detailed ? 10 : 5).map((product) => ({
      ...product,
      sales: Math.floor(Math.random() * 100) + 10,
      revenue: product.price * (Math.floor(Math.random() * 100) + 10),
      stock: Math.floor(Math.random() * 50),
      growth: Math.random() * 40 - 10,
    }))

    // Sort by sales
    productsWithSales.sort((a, b) => b.sales - a.sales)

    setTopProducts(productsWithSales)
  }, [detailed])

  const maxSales = Math.max(...topProducts.map((p) => p.sales))

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Sales</TableHead>
            {detailed && (
              <>
                <TableHead>Revenue</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Growth</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {topProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <span>{product.sales} units</span>
                    <span className="text-muted-foreground text-xs">
                      {Math.round((product.sales / maxSales) * 100)}%
                    </span>
                  </div>
                  <Progress value={(product.sales / maxSales) * 100} className="h-2" />
                </div>
              </TableCell>
              {detailed && (
                <>
                  <TableCell>{formatPrice(product.revenue, currency)}</TableCell>
                  <TableCell>
                    <Badge variant={product.stock < 10 ? "destructive" : "outline"}>{product.stock} in stock</Badge>
                  </TableCell>
                  <TableCell>
                    <span className={product.growth >= 0 ? "text-green-500" : "text-red-500"}>
                      {product.growth >= 0 ? "+" : ""}
                      {product.growth.toFixed(1)}%
                    </span>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

