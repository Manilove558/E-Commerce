"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, Edit, Trash2, ArrowUpDown, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { products } from "@/lib/products"
import { useCurrency } from "@/components/currency-selector"
import { formatPrice } from "@/lib/currency"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export default function InventoryManagement() {
  const { currency } = useCurrency()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  // Add inventory data to products
  const inventoryProducts = products.map((product) => ({
    ...product,
    stock: Math.floor(Math.random() * 100),
    sku: `SKU-${Math.floor(Math.random() * 10000)}`,
    supplier: ["Supplier A", "Supplier B", "Supplier C"][Math.floor(Math.random() * 3)],
    lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  }))

  // Filter products
  let filteredProducts = [...inventoryProducts]

  if (searchTerm) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.supplier.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  if (categoryFilter !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.category === categoryFilter)
  }

  if (stockFilter !== "all") {
    if (stockFilter === "low") {
      filteredProducts = filteredProducts.filter((product) => product.stock < 10)
    } else if (stockFilter === "out") {
      filteredProducts = filteredProducts.filter((product) => product.stock === 0)
    } else if (stockFilter === "in") {
      filteredProducts = filteredProducts.filter((product) => product.stock > 0)
    }
  }

  // Sort products
  filteredProducts.sort((a, b) => {
    let comparison = 0

    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortBy === "price") {
      comparison = a.price - b.price
    } else if (sortBy === "stock") {
      comparison = a.stock - b.stock
    } else if (sortBy === "category") {
      comparison = a.category.localeCompare(b.category)
    }

    return sortOrder === "asc" ? comparison : -comparison
  })

  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  const lowStockCount = inventoryProducts.filter((p) => p.stock < 10 && p.stock > 0).length
  const outOfStockCount = inventoryProducts.filter((p) => p.stock === 0).length
  const totalProducts = inventoryProducts.length

  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
        <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Fill in the product details below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" placeholder="Enter product name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="Enter SKU" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input id="price" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input id="stock" type="number" placeholder="0" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter product description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mens-clothing">Men's Clothing</SelectItem>
                      <SelectItem value="womens-clothing">Women's Clothing</SelectItem>
                      <SelectItem value="kids-wear">Kids Wear</SelectItem>
                      <SelectItem value="combo">Combo Offers</SelectItem>
                      <SelectItem value="hoodies">Hoodies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input id="supplier" placeholder="Enter supplier name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Product Image</Label>
                <Input id="image" type="file" />
              </div>
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Switch id="sale" />
                  <Label htmlFor="sale">On Sale</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="topSeller" />
                  <Label htmlFor="topSeller">Top Seller</Label>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setIsAddingProduct(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddingProduct(false)}>Add Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStockCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>Manage your product stock and inventory</CardDescription>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-[180px]">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="mens-clothing">Men's Clothing</SelectItem>
                    <SelectItem value="womens-clothing">Women's Clothing</SelectItem>
                    <SelectItem value="kids-wear">Kids Wear</SelectItem>
                    <SelectItem value="combo">Combo Offers</SelectItem>
                    <SelectItem value="hoodies">Hoodies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[180px]">
                <Select value={stockFilter} onValueChange={setStockFilter}>
                  <SelectTrigger>
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Stock Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stock</SelectItem>
                    <SelectItem value="in">In Stock</SelectItem>
                    <SelectItem value="low">Low Stock</SelectItem>
                    <SelectItem value="out">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 font-semibold" onClick={() => toggleSort("name")}>
                    Product
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 font-semibold" onClick={() => toggleSort("category")}>
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 font-semibold" onClick={() => toggleSort("price")}>
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 font-semibold" onClick={() => toggleSort("stock")}>
                    Stock
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="h-10 w-10 relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="rounded object-cover h-10 w-10"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{formatPrice(product.price, currency)}</TableCell>
                  <TableCell>
                    <Badge variant={product.stock === 0 ? "destructive" : product.stock < 10 ? "outline" : "secondary"}>
                      {product.stock} units
                    </Badge>
                  </TableCell>
                  <TableCell>{product.supplier}</TableCell>
                  <TableCell>{product.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

