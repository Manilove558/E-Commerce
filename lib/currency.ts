export interface Currency {
  code: string
  symbol: string
  name: string
  rate: number // Rate relative to USD
}

export const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 82.97 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
]

export function convertPrice(amount: number, fromCurrency: string, toCurrency: string): number {
  const from = currencies.find((c) => c.code === fromCurrency)
  const to = currencies.find((c) => c.code === toCurrency)

  if (!from || !to) return amount

  // Convert to USD first, then to target currency
  const inUSD = amount / from.rate
  return inUSD * to.rate
}

export function formatPrice(amount: number, currencyCode: string): string {
  const currency = currencies.find((c) => c.code === currencyCode)
  if (!currency) return `$${amount.toFixed(2)}`

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

