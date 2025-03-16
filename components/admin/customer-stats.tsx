"use client"

import { useState } from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function CustomerStats() {
  const [activeTab, setActiveTab] = useState("acquisition")

  const acquisitionData = {
    labels: ["Direct", "Social Media", "Email", "Referral", "Organic Search", "Paid Ads"],
    datasets: [
      {
        label: "New Customers",
        data: [65, 120, 80, 45, 180, 90],
        backgroundColor: "rgba(99, 102, 241, 0.7)",
      },
    ],
  }

  const retentionData = {
    labels: ["1 Month", "3 Months", "6 Months", "1 Year"],
    datasets: [
      {
        label: "Retention Rate (%)",
        data: [85, 65, 45, 30],
        backgroundColor: "rgba(34, 197, 94, 0.7)",
      },
    ],
  }

  const locationData = {
    labels: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Other"],
    datasets: [
      {
        label: "Customers by Location",
        data: [250, 320, 280, 190, 220, 340],
        backgroundColor: "rgba(249, 115, 22, 0.7)",
      },
    ],
  }

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>

        <TabsContent value="acquisition" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Acquisition</CardTitle>
                <CardDescription>How customers are finding your store</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Bar data={acquisitionData} options={options} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>Analysis of customer acquisition channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Top Performing Channels</h4>
                  <p className="text-sm text-muted-foreground">
                    Organic Search and Social Media are your best performing channels, bringing in 45% of new customers.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Recommendations</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Increase investment in SEO to boost organic search traffic</li>
                    <li>Optimize social media campaigns on Instagram and Facebook</li>
                    <li>Improve email marketing conversion rates</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="retention" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Retention</CardTitle>
                <CardDescription>How well you're keeping customers over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Bar data={retentionData} options={options} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Retention Insights</CardTitle>
                <CardDescription>Analysis of customer loyalty and retention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Retention Challenges</h4>
                  <p className="text-sm text-muted-foreground">
                    Customer retention drops significantly after 3 months, indicating potential issues with product
                    quality or customer service.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Recommendations</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Implement a loyalty program to incentivize repeat purchases</li>
                    <li>Send personalized follow-up emails after purchase</li>
                    <li>Offer exclusive discounts to customers who haven't purchased in 2+ months</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="location" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Locations</CardTitle>
                <CardDescription>Geographic distribution of your customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Bar data={locationData} options={options} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location Insights</CardTitle>
                <CardDescription>Analysis of customer geographic data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Key Markets</h4>
                  <p className="text-sm text-muted-foreground">
                    Mumbai and Bangalore are your strongest markets, accounting for 38% of your customer base.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Recommendations</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Run targeted marketing campaigns in Mumbai and Bangalore</li>
                    <li>Optimize delivery options for these key regions</li>
                    <li>Consider opening physical pop-up stores in these locations</li>
                    <li>Explore expansion opportunities in underserved regions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

