"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { currencies } from "@/lib/currency"
import { useState, createContext, useContext } from "react"

interface CurrencyContextType {
  currency: string
  setCurrency: (currency: string) => void
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "INR",
  setCurrency: () => {},
})

export function useCurrency() {
  return useContext(CurrencyContext)
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState("INR")

  return <CurrencyContext.Provider value={{ currency, setCurrency }}>{children}</CurrencyContext.Provider>
}

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()
  const currentCurrency = currencies.find((c) => c.code === currency)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-24">
          {currentCurrency?.symbol} {currency}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {currencies.map((c) => (
          <DropdownMenuItem key={c.code} onClick={() => setCurrency(c.code)}>
            {c.symbol} {c.code} - {c.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

