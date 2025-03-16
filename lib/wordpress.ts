export interface WordPressConfig {
  siteUrl: string
  username: string
  password: string
}

export interface WPProduct {
  id: number
  name: string
  description: string
  price: string
  regular_price: string
  images: { src: string }[]
  categories: { id: number; name: string }[]
}

export async function syncWithWooCommerce(config: WordPressConfig) {
  try {
    const response = await fetch(`${config.siteUrl}/wp-json/wc/v3/products`, {
      headers: {
        Authorization: `Basic ${btoa(`${config.username}:${config.password}`)}`,
      },
    })

    if (!response.ok) throw new Error("Failed to fetch WooCommerce products")

    const products: WPProduct[] = await response.json()
    return products
  } catch (error) {
    console.error("WooCommerce sync error:", error)
    throw error
  }
}

export async function importWooCommerceProduct(config: WordPressConfig, productId: number) {
  try {
    const response = await fetch(`${config.siteUrl}/wp-json/wc/v3/products/${productId}`, {
      headers: {
        Authorization: `Basic ${btoa(`${config.username}:${config.password}`)}`,
      },
    })

    if (!response.ok) throw new Error("Failed to import WooCommerce product")

    const product: WPProduct = await response.json()
    return product
  } catch (error) {
    console.error("WooCommerce import error:", error)
    throw error
  }
}

