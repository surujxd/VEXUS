"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, Zap, Target, Users } from "lucide-react"

interface TradingData {
  price: number
  change24h: number
  volume: number
  marketCap: number
  holders: number
  liquidity: number
  burnedTokens: number
  nextBurn: number
}

export function AdvancedTradingInterface() {
  const [data, setData] = useState<TradingData>({
    price: 0.000001247,
    change24h: 1847.3,
    volume: 2847000,
    marketCap: 847000,
    holders: 3247,
    liquidity: 1247000,
    burnedTokens: 15.7,
    nextBurn: 72.5,
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)

    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        price: prev.price * (1 + (Math.random() - 0.5) * 0.03),
        change24h: prev.change24h + (Math.random() - 0.5) * 5,
        volume: prev.volume * (1 + (Math.random() - 0.5) * 0.1),
        holders: prev.holders + Math.floor(Math.random() * 5),
        nextBurn: Math.max(0, prev.nextBurn - 0.1),
      }))
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="bg-black/40 backdrop-blur-2xl border border-purple-500/30 animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-purple-500/20 rounded mb-4"></div>
              <div className="h-8 bg-purple-500/20 rounded mb-2"></div>
              <div className="h-3 bg-purple-500/20 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const isPositive = data.change24h > 0

  return (
    <div className="space-y-8">
      {/* Main Trading Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-black/40 backdrop-blur-2xl border border-purple-500/30 shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 group">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-400 text-sm font-bold flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              Current Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2 font-mono">${data.price.toFixed(8)}</div>
            <div className={`flex items-center text-sm font-bold ${isPositive ? "text-green-400" : "text-red-400"}`}>
              {isPositive ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
              {isPositive ? "+" : ""}
              {data.change24h.toFixed(2)}%
            </div>
            <Badge
              className={`mt-2 ${isPositive ? "bg-green-500/20 text-green-400 border-green-500/50" : "bg-red-500/20 text-red-400 border-red-500/50"} font-bold`}
            >
              24H {isPositive ? "GAIN" : "LOSS"}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-2xl border border-pink-500/30 shadow-2xl hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105 group">
          <CardHeader className="pb-3">
            <CardTitle className="text-pink-400 text-sm font-bold flex items-center">
              <Zap className="mr-2 h-4 w-4" />
              Market Cap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2 font-mono">${(data.marketCap / 1000).toFixed(0)}K</div>
            <div className="text-pink-400 text-sm font-bold">Rank #847</div>
            <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/50 font-bold mt-2">GROWING</Badge>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-2xl border border-violet-500/30 shadow-2xl hover:shadow-violet-500/40 transition-all duration-300 hover:scale-105 group">
          <CardHeader className="pb-3">
            <CardTitle className="text-violet-400 text-sm font-bold flex items-center">
              <Target className="mr-2 h-4 w-4" />
              24H Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2 font-mono">${(data.volume / 1000000).toFixed(2)}M</div>
            <div className="text-violet-400 text-sm font-bold">+247% vs yesterday</div>
            <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/50 font-bold mt-2">HIGH VOLUME</Badge>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-2xl border border-emerald-500/30 shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 group">
          <CardHeader className="pb-3">
            <CardTitle className="text-emerald-400 text-sm font-bold flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Holders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2 font-mono">{data.holders.toLocaleString()}</div>
            <div className="text-emerald-400 text-sm font-bold">+{Math.floor(Math.random() * 50 + 10)} today</div>
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 font-bold mt-2">EXPANDING</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold py-6 text-lg">
          Buy VEXUS
        </Button>
        <Button
          variant="outline"
          className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 font-bold py-6 text-lg"
        >
          View Chart
        </Button>
      </div>
    </div>
  )
}
