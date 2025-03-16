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
    id: "6",
    name: "Golden Embroidered Anarkali Gown",
    description: "Elegant golden embroidered Anarkali gown with a graceful flared silhouette.",
    price: 70.99,
    originalPrice: 89.99,
    image: "https://i.pinimg.com/736x/f1/79/16/f1791688a56c2d3298c4bdc2dc823d4b.jpg",
    category: "womens-clothing",
    isSale: true,
    isTopSeller: true
  },
  {
    id: "7",
    name: "Vintage White Lace Midi Dress",
    description: "A dreamy white lace midi dress with puff sleeves and delicate pleated detailing, perfect for a romantic and elegant look.",
    price: 70.99,
    originalPrice: 89.99,
    image: "https://i.pinimg.com/736x/82/1f/27/821f27bbbd2bc48949e4ecdca349401c.jpg",
    category: "womens-clothing",
    isSale: true,
    isTopSeller: true
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
  {
    id: "8",
    name: "Black Corduroy Hooded Shirt Jacket",
    description: "A stylish black corduroy shirt jacket with a contrast gray hood, perfect for casual and streetwear looks.",
    price: 33.99,
    image: "http://i.pinimg.com/736x/51/19/cb/5119cb0354b390efedc1b3d3dd1f2881.jpg",
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

