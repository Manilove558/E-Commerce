"use client"

import type React from "react"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products } from "@/lib/products"
import { Download, Plus, RefreshCw } from "lucide-react"
import * as XLSX from "xlsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import type { WordPressConfig } from "@/lib/wordpress"
import { syncWithWooCommerce } from "@/lib/wordpress"
import { Overview } from "@/components/admin/overview"
import { RecentSales } from "@/components/admin/recent-sales"

interface ProductFormData {
  name: string
  description: string
  price: number
  category: string
  image: File | null
  isSale: boolean
  isTopSeller: boolean
  originalPrice?: number
}

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [productForm, setProductForm] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: null,
    isSale: false,
    isTopSeller: false,
  })
  const [wpConfig, setWpConfig] = useState<WordPressConfig>({
    siteUrl: "",
    username: "",
    password: "",
  })
  const [isSyncing, setIsSyncing] = useState(false)
  const { toast } = useToast()

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(products)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products")
    XLSX.writeFile(workbook, "products.xlsx")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProductForm({ ...productForm, image: file })
    }
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would upload the image and save the product
    toast({
      title: "Success",
      description: "Product has been added successfully.",
    })
    setIsAddingProduct(false)
    setProductForm({
      name: "",
      description: "",
      price: 0,
      category: "",
      image: null,
      isSale: false,
      isTopSeller: false,
    })
  }

  const handleWPSync = async () => {
    setIsSyncing(true)
    try {
      const wpProducts = await syncWithWooCommerce(wpConfig)
      toast({
        title: "Sync Complete",
        description: `Successfully synced ${wpProducts.length} products from WooCommerce.`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sync Failed",
        description: "Failed to sync products from WooCommerce.",
      })
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <Button onClick={exportToExcel}>
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+201 since last hour</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">+19% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+201 since last hour</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>You made 265 sales this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="space-x-4">
              <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>Fill in the product details below.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={productForm.category}
                          onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                        >
                          <SelectTrigger>
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
                        <Label htmlFor="image">Product Image</Label>
                        <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} required />
                      </div>
                    </div>
                    <div className="flex items-center space-x-8">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="sale"
                          checked={productForm.isSale}
                          onCheckedChange={(checked) => setProductForm({ ...productForm, isSale: checked })}
                        />
                        <Label htmlFor="sale">On Sale</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="topSeller"
                          checked={productForm.isTopSeller}
                          onCheckedChange={(checked) => setProductForm({ ...productForm, isTopSeller: checked })}
                        />
                        <Label htmlFor="topSeller">Top Seller</Label>
                      </div>
                    </div>
                    {productForm.isSale && (
                      <div className="space-y-2">
                        <Label htmlFor="originalPrice">Original Price (₹)</Label>
                        <Input
                          id="originalPrice"
                          type="number"
                          value={productForm.originalPrice}
                          onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                        />
                      </div>
                    )}
                    <div className="flex justify-end space-x-4">
                      <Button type="button" variant="outline" onClick={() => setIsAddingProduct(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Add Product</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Tabs defaultValue="products">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="wordpress">WordPress Integration</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>Manage your store products</CardDescription>
                  <div className="mt-4">
                    <Label htmlFor="search">Search Products</Label>
                    <Input
                      id="search"
                      placeholder="Search by name or category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Image</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div className="relative w-10 h-10">
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="rounded object-cover"
                                  width={40}
                                  height={40}
                                />
                              </div>
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>₹{product.price}</TableCell>
                            <TableCell>
                              {product.isSale ? "On Sale" : "Regular"}
                              {product.isTopSeller && ", Top Seller"}
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                              <Button variant="destructive" size="sm">
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wordpress">
              <Card>
                <CardHeader>
                  <CardTitle>WordPress Integration</CardTitle>
                  <CardDescription>Sync products with your WooCommerce store</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="wpUrl">WordPress Site URL</Label>
                      <Input
                        id="wpUrl"
                        placeholder="https://your-site.com"
                        value={wpConfig.siteUrl}
                        onChange={(e) => setWpConfig({ ...wpConfig, siteUrl: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wpUsername">Username</Label>
                      <Input
                        id="wpUsername"
                        value={wpConfig.username}
                        onChange={(e) => setWpConfig({ ...wpConfig, username: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wpPassword">Password/API Key</Label>
                    <Input
                      id="wpPassword"
                      type="password"
                      value={wpConfig.password}
                      onChange={(e) => setWpConfig({ ...wpConfig, password: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button onClick={handleWPSync} disabled={isSyncing}>
                      <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
                      {isSyncing ? "Syncing..." : "Sync with WooCommerce"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>View your store analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Total Sales</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold">₹12,345</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Orders</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold">123</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Customers</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold">456</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>View and manage orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>#1234</TableCell>
                          <TableCell>John Doe</TableCell>
                          <TableCell>Processing</TableCell>
                          <TableCell>₹99.99</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
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

