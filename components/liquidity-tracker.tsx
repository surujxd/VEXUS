"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function LiquidityTracker() {
  const [liquidityData, setLiquidityData] = useState({
    totalLiquidity: 0,
    lockedPercentage: 0,
    timeRemaining: "Forever",
    providers: 0,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setLiquidityData({
        totalLiquidity: 2847000,
        lockedPercentage: 100,
        timeRemaining: "Forever",
        providers: 1247,
      })
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="bg-black/80 backdrop-blur-xl border border-yellow-500/30 shadow-2xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-yellow-400 mb-4">Liquidity Analysis</h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-200 font-medium">Total Liquidity</span>
              <span className="text-yellow-400 font-mono font-bold">
                ${liquidityData.totalLiquidity.toLocaleString()}
              </span>
            </div>
            <Progress value={85} className="h-3 bg-gray-700" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-200 font-medium">Locked Liquidity</span>
              <span className="text-green-400 font-mono font-bold">{liquidityData.lockedPercentage}%</span>
            </div>
            <Progress value={liquidityData.lockedPercentage} className="h-3 bg-gray-700" />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-lg bg-gray-900/60 border border-gray-700/50">
              <div className="text-gray-300 text-sm font-medium">Lock Duration</div>
              <div className="text-red-400 font-bold text-lg">{liquidityData.timeRemaining}</div>
            </div>
            <div className="p-4 rounded-lg bg-gray-900/60 border border-gray-700/50">
              <div className="text-gray-300 text-sm font-medium">LP Providers</div>
              <div className="text-yellow-400 font-bold text-lg">{liquidityData.providers}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
