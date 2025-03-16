"use client"

import React from "react";
import { SiteHeader } from "@/components/site-header";
import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCurrency } from "@/components/currency-selector";
import { convertPrice, formatPrice } from "@/lib/currency";
import { useState } from "react";
import { Rating } from "@/components/rating";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap the params object using React.use()
  const { id } = React.use(params);
  const product = products.find((p) => p.id === id);
  const { currency } = useCurrency();
  const [userRating, setUserRating] = useState<number | null>(null);

  if (!product) {
    notFound();
  }

  const displayPrice = convertPrice(product.price, "USD", currency);
  const displayOriginalPrice = product.originalPrice ? convertPrice(product.originalPrice, "USD", currency) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Product Image */}
            <div className="relative aspect-square">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
                priority
              />
              {product.isSale && (
                <Badge variant="destructive" className="absolute left-4 top-4">
                  Sale
                </Badge>
              )}
              {product.isTopSeller && (
                <Badge variant="secondary" className="absolute left-4 top-14">
                  Top Seller
                </Badge>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-lg text-muted-foreground mt-2">{product.description}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold">{formatPrice(displayPrice, currency)}</div>
                {displayOriginalPrice && (
                  <div className="text-lg text-muted-foreground line-through">
                    {formatPrice(displayOriginalPrice, currency)}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Rating value={4} onChange={setUserRating} />
                  <span className="text-muted-foreground">(124 reviews)</span>
                </div>
                {userRating && <p className="text-sm text-muted-foreground">Thank you for rating this product!</p>}
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="w-5 h-5" />
                  <span className="sr-only">Add to Wishlist</span>
                </Button>
              </div>

              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  <TabsTrigger value="returns">Returns</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Product Details</h3>
                        <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                          <li>High-quality materials</li>
                          <li>Durable construction</li>
                          <li>Perfect for everyday use</li>
                          <li>Available in multiple sizes</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="shipping">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Shipping Information</h3>
                        <p className="text-muted-foreground">
                          Free shipping on orders over ₹4,373.53. Standard delivery 2 to 3 business weeks. Express
                          delivery available at checkout.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="returns">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Returns Policy</h3>
                        <p className="text-muted-foreground">
                          Easy returns within 3 days of delivery. Items must be unused and in original packaging. An
                          unboxing video is required for all returns.
                        </p>
                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Return Requirements:</h4>
                          <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                            <li>Original packaging and tags intact</li>
                            <li>Unboxing video showing product condition</li>
                            <li>Return request within 3 days of delivery</li>
                            <li>Product must be unused</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}