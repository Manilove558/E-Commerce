"use client"

import { useState, useEffect } from "react"
import { Line, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"
import type { DateRange } from "react-day-picker"
import { eachDayOfInterval, format } from "date-fns"
import { useCurrency } from "@/components/currency-selector"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

interface SalesChartProps {
  dateRange: DateRange
  detailed?: boolean
}

export function SalesChart({ dateRange, detailed = false }: SalesChartProps) {
  const { currency } = useCurrency()
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      // Generate dates between the range
      const dates = eachDayOfInterval({
        start: dateRange.from,
        end: dateRange.to,
      })

      // Format dates for labels
      const labels = dates.map((date) => format(date, "MMM dd"))

      // Generate random data for demonstration
      const revenueData = dates.map(() => Math.floor(Math.random() * 10000) + 1000)
      const ordersData = dates.map(() => Math.floor(Math.random() * 50) + 10)

      const datasets = [
        {
          label: `Revenue (${currency})`,
          data: revenueData,
          borderColor: "rgb(99, 102, 241)",
          backgroundColor: "rgba(99, 102, 241, 0.5)",
          tension: 0.3,
        },
      ]

      if (detailed) {
        datasets.push({
          label: "Orders",
          data: ordersData,
          borderColor: "rgb(34, 197, 94)",
          backgroundColor: "rgba(34, 197, 94, 0.5)",
          tension: 0.3,
          yAxisID: "y1",
        })
      }

      setChartData({
        labels,
        datasets,
      })
    }
  }, [dateRange, currency, detailed])

  const options: ChartOptions<"line" | "bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: `Revenue (${currency})`,
        },
      },
      ...(detailed
        ? {
            y1: {
              type: "linear",
              display: true,
              position: "right",
              grid: {
                drawOnChartArea: false,
              },
              title: {
                display: true,
                text: "Orders",
              },
            },
          }
        : {}),
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  }

  return (
    <div className="h-[300px] w-full">
      {detailed ? <Line data={chartData} options={options} /> : <Bar data={chartData} options={options} />}
    </div>
  )
}

