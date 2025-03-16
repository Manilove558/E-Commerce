export interface ShippingZone {
  id: string
  name: string
  countries: string[]
  states?: string[]
  baseRate: number
  freeShippingThreshold?: number
}

export interface ShippingAddress {
  country: string
  state: string
  zipCode: string
}

export const calculateShipping = (subtotal: number, address: ShippingAddress): number => {
  // Mock shipping calculation logic
  if (subtotal > 50) {
    return 0 // Free shipping
  } else {
    return 10 // Fixed shipping rate
  }
}

