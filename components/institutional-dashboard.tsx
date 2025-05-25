"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, TrendingUp, Users, Lock, Award, Globe } from "lucide-react"

export function InstitutionalDashboard() {
  const [metrics, setMetrics] = useState({
    communityGrowth: 0,
    liquidityHealth: 0,
    tradingMomentum: 0,
    viralPotential: 0,
    communityScore: 0,
    hypeLevel: 0,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setMetrics({
        communityGrowth: 89,
        liquidityHealth: 94,
        tradingMomentum: 156,
        viralPotential: 87,
        communityScore: 92,
        hypeLevel: 96,
      })
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const dashboardItems = [
    {
      title: "Community Growth",
      value: `${metrics.communityGrowth}%`,
      progress: metrics.communityGrowth,
      icon: <Users className="h-5 w-5" />,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
      description: "Percentage of community growth",
    },
    {
      title: "Liquidity Health",
      value: `${metrics.liquidityHealth}%`,
      progress: metrics.liquidityHealth,
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
      description: "Market depth and liquidity strength",
    },
    {
      title: "Community Score",
      value: `${metrics.communityScore}/100`,
      progress: metrics.communityScore,
      icon: <Shield className="h-5 w-5" />,
      color: "text-red-400",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/30",
      description: "Comprehensive community assessment",
    },
    {
      title: "Hype Level",
      value: `${metrics.hypeLevel}%`,
      progress: metrics.hypeLevel,
      icon: <Award className="h-5 w-5" />,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500/30",
      description: "Community hype score",
    },
    {
      title: "Viral Potential",
      value: `${metrics.viralPotential}%`,
      progress: metrics.viralPotential,
      icon: <Lock className="h-5 w-5" />,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30",
      description: "Viral potential metrics",
    },
    {
      title: "Telegram Members",
      value: "47 Countries",
      progress: 85,
      icon: <Globe className="h-5 w-5" />,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
      borderColor: "border-cyan-500/30",
      description: "International market presence",
    },
  ]

  return (
    <Card className="bg-black/90 backdrop-blur-xl border border-red-500/30 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-red-400 font-bold text-xl flex items-center">
          <Shield className="mr-2 h-6 w-6" />
          Community Growth Dashboard
        </CardTitle>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/50 font-bold w-fit">Live Launch Data</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg bg-gray-900/60 border ${item.borderColor} hover:scale-105 transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-full ${item.bgColor}`}>
                  <div className={item.color}>{item.icon}</div>
                </div>
                <div className={`text-2xl font-bold ${item.color} font-mono`}>{item.value}</div>
              </div>
              <div className="mb-2">
                <div className="text-white font-semibold text-sm">{item.title}</div>
                <div className="text-gray-400 text-xs">{item.description}</div>
              </div>
              <Progress value={item.progress} className="h-2 bg-gray-700" />
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-yellow-500/10 border border-red-500/30">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-bold text-lg">Overall Investment Grade</div>
              <div className="text-gray-300 text-sm">Based on institutional metrics</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-red-400">A+</div>
              <div className="text-yellow-400 text-sm font-medium">Excellent</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
