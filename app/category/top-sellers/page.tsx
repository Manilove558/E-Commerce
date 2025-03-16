import { SiteHeader } from "@/components/site-header"
import { ProductCard } from "@/components/product-card"
import { getTopSellers } from "@/lib/products"

export default function TopSellersPage() {
  const products = getTopSellers()

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-2 mb-8">
            <h1 className="text-3xl font-bold">Top Sellers</h1>
          </div>
          {products.length === 0 ? (
            <p className="text-muted-foreground">No top selling products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

