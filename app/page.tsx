import { SiteHeader } from "@/components/site-header"
import { ProductCard } from "@/components/product-card"
import { getTopSellers, getSaleProducts } from "@/lib/products"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShirtIcon, DiamondIcon as DressIcon, BabyIcon, PackageIcon, ClubIcon as HoodieIcon } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Men's Clothing",
    href: "/category/mens-clothing",
    icon: ShirtIcon,
    description: "Explore our collection of men's fashion",
  },
  {
    name: "Women's Clothing",
    href: "/category/womens-clothing",
    icon: DressIcon,
    description: "Discover trendy women's wear",
  },
  {
    name: "Kids Wear",
    href: "/category/kids-wear",
    icon: BabyIcon,
    description: "Adorable clothing for your little ones",
  },
  {
    name: "Combo Offers",
    href: "/category/combo",
    icon: PackageIcon,
    description: "Special deals and combo packs",
  },
  {
    name: "Hoodies",
    href: "/category/hoodies",
    icon: HoodieIcon,
    description: "Comfortable and stylish hoodies",
  },
]

export default function Home() {
  const topSellers = getTopSellers()
  const saleProducts = getSaleProducts()

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="px-4 py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Umar'ia Store
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Discover our latest collection of premium products at amazing prices.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter mb-8">Shop by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Link key={category.href} href={category.href}>
                    <Card className="relative group overflow-hidden transition-colors hover:bg-muted/50">
                      <CardHeader>
                        <div className="mb-2">
                          <Icon className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <CardTitle>{category.name}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter mb-8">Top Sellers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {topSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter mb-8">Sale Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <p className="text-sm text-muted-foreground">© 2024 _5201314_ Store. All rights reserved.</p>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

