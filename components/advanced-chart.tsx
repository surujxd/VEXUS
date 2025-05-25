"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface DataPoint {
  time: number
  price: number
  volume: number
}

export function AdvancedChart() {
  const [data, setData] = useState<DataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate real-time data generation
    const generateData = () => {
      const now = Date.now()
      const newData: DataPoint[] = []

      for (let i = 0; i < 50; i++) {
        const time = now - (50 - i) * 60000 // 1 minute intervals
        const basePrice = 0.00002847
        const volatility = 0.1
        const trend = Math.sin(i * 0.1) * 0.05
        const random = (Math.random() - 0.5) * volatility
        const price = basePrice * (1 + trend + random)
        const volume = Math.random() * 100000 + 50000

        newData.push({ time, price, volume })
      }

      setData(newData)
      setIsLoading(false)
    }

    generateData()
    const interval = setInterval(generateData, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <Card className="bg-black/80 backdrop-blur-xl border border-red-500/30 shadow-2xl">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-red-500/20 rounded w-1/4"></div>
            <div className="h-32 bg-gradient-to-r from-red-500/10 to-yellow-500/10 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const maxPrice = Math.max(...data.map((d) => d.price))
  const minPrice = Math.min(...data.map((d) => d.price))
  const priceRange = maxPrice - minPrice

  return (
    <Card className="bg-black/80 backdrop-blur-xl border border-red-500/30 shadow-2xl">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-red-400">APEX/USDT</h3>
          <div className="flex space-x-2">
            <span className="text-green-400 text-sm font-bold">+34.7%</span>
            <span className="text-red-400 text-sm font-bold">Live</span>
          </div>
        </div>

        <div className="relative h-32 overflow-hidden rounded-lg bg-black/60">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(239, 68, 68)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Price line */}
            <path
              d={data
                .map((point, index) => {
                  const x = (index / (data.length - 1)) * 100
                  const y = ((maxPrice - point.price) / priceRange) * 100
                  return `${index === 0 ? "M" : "L"} ${x}% ${y}%`
                })
                .join(" ")}
              fill="none"
              stroke="rgb(239, 68, 68)"
              strokeWidth="3"
              className="drop-shadow-lg"
            />

            {/* Fill area */}
            <path
              d={`${data
                .map((point, index) => {
                  const x = (index / (data.length - 1)) * 100
                  const y = ((maxPrice - point.price) / priceRange) * 100
                  return `${index === 0 ? "M" : "L"} ${x}% ${y}%`
                })
                .join(" ")} L 100% 100% L 0% 100% Z`}
              fill="url(#priceGradient)"
            />
          </svg>

          {/* Animated dots */}
          {data.slice(-5).map((point, index) => (
            <div
              key={index}
              className="absolute w-2 h-2 bg-red-400 rounded-full animate-pulse shadow-lg"
              style={{
                left: `${((data.length - 5 + index) / (data.length - 1)) * 100}%`,
                top: `${((maxPrice - point.price) / priceRange) * 100}%`,
                transform: "translate(-50%, -50%)",
                animationDelay: `${index * 0.2}s`,
              }}
            />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-gray-300 font-medium">Price</div>
            <div className="text-red-400 font-mono font-bold">${data[data.length - 1]?.price.toFixed(8)}</div>
          </div>
          <div>
            <div className="text-gray-300 font-medium">Volume</div>
            <div className="text-yellow-400 font-mono font-bold">
              ${(data[data.length - 1]?.volume || 0).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-gray-300 font-medium">24h High</div>
            <div className="text-green-400 font-mono font-bold">${maxPrice.toFixed(8)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
