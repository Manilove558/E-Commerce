import { SiteHeader } from "@/components/site-header"
import { ProductCard } from "@/components/product-card"
import { getProductsByCategory } from "@/lib/products"
import { notFound } from "next/navigation"

const categoryNames = {
  "mens-clothing": "Men's Clothing",
  "womens-clothing": "Women's Clothing",
  "kids-wear": "Kids Wear",
  combo: "Combo Offers",
  hoodies: "Hoodies",
  "track-pants": "Track Pants",
  "top-sellers": "Top Sellers",
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const products = getProductsByCategory(params.slug)
  const categoryName = categoryNames[params.slug as keyof typeof categoryNames]

  if (!categoryName) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>
          {products.length === 0 ? (
            <p className="text-muted-foreground">No products found in this category.</p>
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

