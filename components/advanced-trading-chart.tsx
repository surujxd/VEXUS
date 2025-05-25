"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

interface CandlestickData {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export function AdvancedTradingChart() {
  const [data, setData] = useState<CandlestickData[]>([])
  const [timeframe, setTimeframe] = useState("1H")
  const [isLoading, setIsLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [timeSinceLaunch, setTimeSinceLaunch] = useState("0h 0m")

  useEffect(() => {
    const generateCandlestickData = () => {
      const now = Date.now()
      const newData: CandlestickData[] = []
      let lastClose = 0.000000847 // Much lower starting price for new memecoin

      for (let i = 0; i < 100; i++) {
        const time = now - (100 - i) * 60000 // 1 minute intervals instead of 1 hour
        const volatility = 0.05
        const trend = Math.sin(i * 0.05) * 0.02

        const open = lastClose
        const change = (Math.random() - 0.5) * volatility + trend
        const close = open * (1 + change)
        const high = Math.max(open, close) * (1 + Math.random() * 0.02)
        const low = Math.min(open, close) * (1 - Math.random() * 0.02)
        const volume = Math.random() * 500000 + 100000

        newData.push({ time, open, high, low, close, volume })
        lastClose = close
      }

      setData(newData)
      setIsLoading(false)
    }

    generateCandlestickData()
    const interval = setInterval(generateCandlestickData, 10000)

    return () => clearInterval(interval)
  }, [timeframe])

  useEffect(() => {
    if (!data.length || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * 2
    canvas.height = rect.height * 2
    ctx.scale(2, 2)

    const width = rect.width
    const height = rect.height
    const padding = 40

    // Clear canvas
    ctx.fillStyle = "rgba(0, 0, 0, 0.9)"
    ctx.fillRect(0, 0, width, height)

    if (data.length === 0) return

    const maxPrice = Math.max(...data.map((d) => d.high))
    const minPrice = Math.min(...data.map((d) => d.low))
    const priceRange = maxPrice - minPrice

    const candleWidth = ((width - padding * 2) / data.length) * 0.8

    data.forEach((candle, index) => {
      const x = padding + (index * (width - padding * 2)) / data.length
      const openY = height - padding - ((candle.open - minPrice) / priceRange) * (height - padding * 2)
      const closeY = height - padding - ((candle.close - minPrice) / priceRange) * (height - padding * 2)
      const highY = height - padding - ((candle.high - minPrice) / priceRange) * (height - padding * 2)
      const lowY = height - padding - ((candle.low - minPrice) / priceRange) * (height - padding * 2)

      const isGreen = candle.close > candle.open

      // Draw wick
      ctx.strokeStyle = isGreen ? "#10b981" : "#ef4444"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x + candleWidth / 2, highY)
      ctx.lineTo(x + candleWidth / 2, lowY)
      ctx.stroke()

      // Draw body
      ctx.fillStyle = isGreen ? "#10b981" : "#ef4444"
      const bodyHeight = Math.abs(closeY - openY)
      const bodyY = Math.min(openY, closeY)

      ctx.fillRect(x, bodyY, candleWidth, Math.max(bodyHeight, 1))
    })

    // Draw price line
    ctx.strokeStyle = "#f59e0b"
    ctx.lineWidth = 2
    ctx.beginPath()
    data.forEach((candle, index) => {
      const x = padding + (index * (width - padding * 2)) / data.length + candleWidth / 2
      const y = height - padding - ((candle.close - minPrice) / priceRange) * (height - padding * 2)

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()
  }, [data])

  useEffect(() => {
    const launchTime = Date.now() - 2 * 3600000 - 15 * 60000 // Example: 2 hours and 15 minutes ago
    const interval = setInterval(() => {
      const now = Date.now()
      const diff = now - launchTime
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      setTimeSinceLaunch(`${hours}h ${minutes}m`)
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <Card className="bg-black/90 backdrop-blur-xl border border-red-500/30 shadow-2xl">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-red-500/20 rounded w-1/3"></div>
            <div className="h-64 bg-gradient-to-r from-red-500/10 to-yellow-500/10 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentPrice = data[data.length - 1]?.close || 0
  const previousPrice = data[data.length - 2]?.close || 0
  const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100
  const isPositive = priceChange > 0

  return (
    <Card className="bg-black/90 backdrop-blur-xl border border-red-500/30 shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-red-400 font-bold text-xl">PHOENIX/USDT - JUST LAUNCHED!</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge
              className={`${isPositive ? "bg-green-500/20 text-green-400 border-green-500/50" : "bg-red-500/20 text-red-400 border-red-500/50"} font-bold`}
            >
              {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {priceChange.toFixed(2)}%
            </Badge>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/50 font-bold animate-pulse">
              <Activity className="w-3 h-3 mr-1" />
              LIVE
            </Badge>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-white font-mono">${currentPrice.toFixed(8)}</div>
          <div className="flex space-x-2">
            {["1M", "5M", "1H", "4H", "1D"].map((tf) => (
              <Button
                key={tf}
                size="sm"
                variant={timeframe === tf ? "default" : "outline"}
                onClick={() => setTimeframe(tf)}
                className={
                  timeframe === tf
                    ? "bg-red-600 hover:bg-red-700"
                    : "border-red-400/50 text-red-400 hover:bg-red-400/10"
                }
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <canvas ref={canvasRef} className="w-full h-64 rounded-lg" style={{ width: "100%", height: "256px" }} />
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6 text-sm">
          <div className="text-center p-3 rounded-lg bg-gray-900/60">
            <div className="text-gray-400 font-medium">24h High</div>
            <div className="text-green-400 font-bold font-mono">${Math.max(...data.map((d) => d.high)).toFixed(8)}</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-900/60">
            <div className="text-gray-400 font-medium">24h Low</div>
            <div className="text-red-400 font-bold font-mono">${Math.min(...data.map((d) => d.low)).toFixed(8)}</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-900/60">
            <div className="text-gray-400 font-medium">Volume</div>
            <div className="text-yellow-400 font-bold font-mono">
              ${(data[data.length - 1]?.volume || 0).toLocaleString()}
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-900/60">
            <div className="text-gray-400 font-medium">Time Since Launch</div>
            <div className="text-red-400 font-bold font-mono">{timeSinceLaunch}</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-900/60 col-span-4">
            <div className="text-gray-400 font-medium">Launch Cap</div>
            <div className="text-red-400 font-bold font-mono">$47K</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
