"use client"

import { useState, useEffect } from "react"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartOptions } from "chart.js"
import { useCurrency } from "@/components/currency-selector"

ChartJS.register(ArcElement, Tooltip, Legend)

export function RevenueReport() {
  const { currency } = useCurrency()
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    // Mock data for categories
    const categories = ["Men's Clothing", "Women's Clothing", "Kids Wear", "Combo Offers", "Hoodies"]

    // Generate random data for demonstration
    const data = categories.map(() => Math.floor(Math.random() * 5000) + 1000)

    setChartData({
      labels: categories,
      datasets: [
        {
          label: `Revenue (${currency})`,
          data,
          backgroundColor: [
            "rgba(99, 102, 241, 0.7)",
            "rgba(244, 114, 182, 0.7)",
            "rgba(34, 197, 94, 0.7)",
            "rgba(234, 179, 8, 0.7)",
            "rgba(249, 115, 22, 0.7)",
          ],
          borderColor: [
            "rgb(99, 102, 241)",
            "rgb(244, 114, 182)",
            "rgb(34, 197, 94)",
            "rgb(234, 179, 8)",
            "rgb(249, 115, 22)",
          ],
          borderWidth: 1,
        },
      ],
    })
  }, [currency])

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || ""
            const value = context.raw as number
            const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0)
            const percentage = Math.round((value / total) * 100)
            return `${label}: ${value.toLocaleString()} ${currency} (${percentage}%)`
          },
        },
      },
    },
  }

  return <Pie data={chartData} options={options} />
}

