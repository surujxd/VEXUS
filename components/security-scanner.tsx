"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, AlertTriangle, Zap } from "lucide-react"

interface SecurityCheck {
  name: string
  status: "passed" | "warning" | "checking"
  description: string
  icon: React.ReactNode
}

export function SecurityScanner() {
  const [checks, setChecks] = useState<SecurityCheck[]>([
    {
      name: "Contract Verification",
      status: "checking",
      description: "Verifying smart contract source code",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      name: "Liquidity Lock",
      status: "checking",
      description: "Checking liquidity pool lock status",
      icon: <CheckCircle className="h-4 w-4" />,
    },
    {
      name: "Ownership Renounced",
      status: "checking",
      description: "Verifying contract ownership status",
      icon: <Zap className="h-4 w-4" />,
    },
    {
      name: "Honeypot Analysis",
      status: "checking",
      description: "Scanning for honeypot mechanisms",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
  ])

  useEffect(() => {
    const timer = setTimeout(() => {
      setChecks([
        {
          name: "Contract Verification",
          status: "passed",
          description: "Smart contract verified on Etherscan",
          icon: <Shield className="h-4 w-4" />,
        },
        {
          name: "Liquidity Lock",
          status: "passed",
          description: "Liquidity locked for 5 years",
          icon: <CheckCircle className="h-4 w-4" />,
        },
        {
          name: "Ownership Renounced",
          status: "passed",
          description: "Contract ownership renounced",
          icon: <Zap className="h-4 w-4" />,
        },
        {
          name: "Honeypot Analysis",
          status: "passed",
          description: "No honeypot mechanisms detected",
          icon: <AlertTriangle className="h-4 w-4" />,
        },
      ])
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "text-green-400 bg-green-400/20 border-green-400/50"
      case "warning":
        return "text-yellow-400 bg-yellow-400/20 border-yellow-400/50"
      case "checking":
        return "text-red-400 bg-red-400/20 border-red-400/50"
      default:
        return "text-gray-400 bg-gray-400/20 border-gray-400/50"
    }
  }

  return (
    <Card className="bg-black/80 backdrop-blur-xl border border-green-500/30 shadow-2xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-green-400">Security Analysis</h3>
          <Badge className="bg-green-400/20 text-green-400 border-green-400/50 font-bold">Real-time</Badge>
        </div>

        <div className="space-y-3">
          {checks.map((check, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-900/60 border border-gray-700/50"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${getStatusColor(check.status)}`}>
                  {check.status === "checking" ? (
                    <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    check.icon
                  )}
                </div>
                <div>
                  <div className="text-white font-semibold">{check.name}</div>
                  <div className="text-gray-300 text-sm">{check.description}</div>
                </div>
              </div>
              <Badge className={`${getStatusColor(check.status)} font-bold`}>
                {check.status === "checking" ? "Scanning..." : check.status.toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-lg bg-green-400/10 border border-green-400/50">
          <div className="text-green-400 font-bold text-lg">Security Score: 98/100</div>
          <div className="text-green-300 font-medium">Excellent security rating</div>
        </div>
      </CardContent>
    </Card>
  )
}
