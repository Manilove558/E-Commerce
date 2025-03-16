export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  isSale?: boolean
  isTopSeller?: boolean
}

// Sample product data
export const products: Product[] = [
  {
    id: "1",
    name: "Floral Summer Dress",
    description: "Light and breezy floral print dress",
    price: 29.99,
    originalPrice: 59.99,
    image: "https://i.pinimg.com/736x/dd/4d/56/dd4d565f69b0f39a9b0ec3699f5a328e.jpg",
    category: "womens-clothing",
    isSale: true,
    isTopSeller: true
  },
  {
    id: "2",
    name: "Classic Black T-Shirt",
    description: "Essential cotton t-shirt in classic black",
    price: 12.99,
    image: "https://i.pinimg.com/736x/03/f7/bf/03f7bf34dd9c863260ee17ca8f050b32.jpg",
    category: "mens-clothing",
    isTopSeller: true,
  },
  
  {
    id: "3",
    name: "Kids Hoodie",
    description: "Fun dinosaur print hoodie for kids",
    price: 11.99,
    image: "https://i.pinimg.com/736x/74/fe/4a/74fe4afff7d04375d184ff667a94f99b.jpg",
    category: "kids-wear",
    isTopSeller: true,
  },
  {
    id: "4",
    name: "Family Pack - Basic Tees",
    description: "Set of 3 basic t-shirts for the whole family",
    price: 49.99,
    originalPrice: 50.99,
    image: "https://i.pinimg.com/736x/e5/ef/e6/e5efe6a01c610cb3d891330c25f5f31a.jpg",
    category: "combo",
    isSale: true,
  },
  {
    id: "5",
    name: "Premium Zip Hoodie",
    description: "Comfortable zip-up hoodie in premium cotton",
    price: 33.99,
    image: "https://i.pinimg.com/736x/78/0b/29/780b2916bec7720efaa1e69991e58a8c.jpg",
    category: "hoodies",
    isTopSeller: true,
  },
]

// Helper functions to get filtered products
export function getTopSellers() {
  return products.filter((product) => product.isTopSeller)
}

export function getSaleProducts() {
  return products.filter((product) => product.isSale)
}

export function getProductsByCategory(category: string) {
  return products.filter((product) => product.category === category)
}

