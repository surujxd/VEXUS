"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Coins,
  Users,
  Twitter,
  MessageCircle,
  Send,
  ArrowRight,
  Star,
  BarChart3,
  Crown,
  Menu,
  X,
  Rocket,
  Target,
  Lock,
  Globe,
  CloudLightningIcon as Lightning,
  Cpu,
  Orbit,
  Atom,
  Hexagon,
  Activity,
  Zap,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { VexusLogo } from "../components/vexus-logo"

// Animated Counter with more sophisticated animation
function AnimatedCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(easeOutQuart * end)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animationFrame = requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
    }
  }, [end, duration])

  return (
    <span ref={countRef} className="tabular-nums">
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}

// Advanced Gradient Text with animation
function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`bg-gradient-to-r from-purple-400 via-pink-500 to-violet-600 bg-clip-text text-transparent font-bold animate-pulse ${className}`}
      style={{
        backgroundSize: "200% 200%",
        animation: "gradient 3s ease infinite",
      }}
    >
      {children}
    </span>
  )
}

// Floating Animation Component
function FloatingElement({
  children,
  delay = 0,
  duration = 3,
}: { children: React.ReactNode; delay?: number; duration?: number }) {
  return (
    <div
      className="animate-bounce"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        animationIterationCount: "infinite",
        animationTimingFunction: "ease-in-out",
      }}
    >
      {children}
    </div>
  )
}

// Simplified Trading Interface
function SimplifiedTradingInterface() {
  const [data, setData] = useState({
    price: 0.000001247,
    change24h: 1847.3,
    volume: 2847000,
    marketCap: 847000,
    holders: 3247,
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
        {[...Array(4)].map((_, i) => (
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
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-purple-400 text-sm font-bold flex items-center">
                <Activity className="mr-2 h-4 w-4" />
                Current Price
              </div>
            </div>
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
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-pink-400 text-sm font-bold flex items-center">
                <Zap className="mr-2 h-4 w-4" />
                Market Cap
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2 font-mono">${(data.marketCap / 1000).toFixed(0)}K</div>
            <div className="text-pink-400 text-sm font-bold">Rank #847</div>
            <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/50 font-bold mt-2">GROWING</Badge>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-2xl border border-violet-500/30 shadow-2xl hover:shadow-violet-500/40 transition-all duration-300 hover:scale-105 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-violet-400 text-sm font-bold flex items-center">
                <Target className="mr-2 h-4 w-4" />
                24H Volume
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2 font-mono">${(data.volume / 1000000).toFixed(2)}M</div>
            <div className="text-violet-400 text-sm font-bold">+247% vs yesterday</div>
            <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/50 font-bold mt-2">HIGH VOLUME</Badge>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-2xl border border-emerald-500/30 shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-emerald-400 text-sm font-bold flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Holders
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2 font-mono">{data.holders.toLocaleString()}</div>
            <div className="text-emerald-400 text-sm font-bold">+{Math.floor(Math.random() * 50 + 10)} today</div>
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 font-bold mt-2">EXPANDING</Badge>
          </CardContent>
        </Card>
      </div>

      {/* New Raydium Card */}
      <div className="mt-6 text-center p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
        <div className="text-green-400 font-bold text-lg mb-2">🚀 NOW LIVE ON RAYDIUM</div>
        <div className="text-white font-medium">Trade VEXUS on Solana's premier DEX</div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold py-6 text-lg"
          onClick={openDexScreener}
        >
          Buy VEXUS
        </Button>
        <Button
          variant="outline"
          className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 font-bold py-6 text-lg"
          onClick={openDexScreener}
        >
          View Chart
        </Button>
      </div>
    </div>
  )
}

const openDexScreener = () => {
  window.open("https://dexscreener.com/solana/dhj76vphaw2b4cczza5eqajtmpdber7ncvnw4djpecaj", "_blank")
}

const openTelegram = () => {
  window.open("https://t.me/VEXUS_ELITE_OFC", "_blank")
}

const openDiscord = () => {
  window.open("https://discord.gg/j77UE7ptuJ", "_blank")
}

export default function VexusLanding() {
  const [isVisible, setIsVisible] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const communityRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToCommunity = () => {
    if (communityRef.current) {
      communityRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setActiveSection("community")
    setMobileMenuOpen(false)
  }

  const scrollToHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    setActiveSection("home")
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-pink-950 text-white overflow-hidden relative">
      {/* Advanced CSS for animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
        }
        
        .glow-animation {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Advanced Header */}
      <header className="relative z-50 border-b border-purple-500/20 backdrop-blur-3xl bg-black/60 sticky top-0 shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FloatingElement>
                <div className="glow-animation">
                  <VexusLogo size={window.innerWidth < 768 ? 60 : 80} />
                </div>
              </FloatingElement>
              <div>
                <span className="text-3xl md:text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-violet-600 bg-clip-text text-transparent">
                  VEXUS
                </span>
              </div>
            </div>

            {/* Advanced Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <button
                onClick={scrollToHome}
                className={`flex items-center space-x-2 text-sm font-bold transition-all duration-300 hover:scale-105 ${
                  activeSection === "home" ? "text-purple-400" : "text-gray-300 hover:text-purple-400"
                }`}
              >
                <Hexagon className="w-4 h-4" />
                <span>Home</span>
              </button>
              <button
                onClick={scrollToCommunity}
                className={`flex items-center space-x-2 text-sm font-bold transition-all duration-300 hover:scale-105 ${
                  activeSection === "community" ? "text-purple-400" : "text-gray-300 hover:text-purple-400"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Community</span>
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="border-purple-400/50 text-purple-400 hover:bg-purple-400/10 backdrop-blur-sm hidden md:flex font-bold glow-animation"
                onClick={openDexScreener}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Live Chart
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 hover:from-purple-700 hover:via-pink-700 hover:to-violet-700 shadow-lg shadow-purple-500/25 backdrop-blur-sm font-bold glow-animation"
                onClick={openDexScreener}
              >
                <Coins className="mr-2 h-4 w-4" />
                Buy VEXUS
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-purple-500/20">
              <nav className="flex flex-col space-y-3 mt-4">
                <button
                  onClick={scrollToHome}
                  className="text-left text-sm font-bold transition-all duration-300 hover:text-purple-400 text-gray-300"
                >
                  Home
                </button>
                <button
                  onClick={scrollToCommunity}
                  className="text-left text-sm font-bold transition-all duration-300 hover:text-purple-400 text-gray-300"
                >
                  Community
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 z-10">
        <div className="container mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Badge className="mb-8 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-violet-500/20 text-purple-400 border border-purple-500/50 text-lg px-10 py-4 backdrop-blur-sm shadow-2xl font-bold glow-animation">
              <Crown className="mr-3 h-6 w-6" />⚡ LIVE ON RAYDIUM - NOW TRADING ⚡
              <Lightning className="ml-3 h-6 w-6" />
            </Badge>

            <h1 className="text-8xl md:text-9xl xl:text-[14rem] font-black mb-8 leading-tight tracking-wider">
              <GradientText>VEXUS</GradientText>
            </h1>

            <p className="text-2xl md:text-4xl xl:text-6xl mb-16 text-gray-200 max-w-6xl mx-auto leading-relaxed font-bold">
              Now <span className="text-green-400">LIVE on Raydium</span> - The{" "}
              <span className="text-purple-400">next-generation</span> memecoin with
              <br className="hidden md:block" />
              <span className="text-pink-400">advanced DeFi mechanics</span> and{" "}
              <span className="text-violet-400">institutional-grade security</span> 💎
            </p>

            <div className="flex justify-center mb-20">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 hover:from-purple-700 hover:via-pink-700 hover:to-violet-700 text-2xl px-16 py-8 shadow-2xl shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm font-bold glow-animation"
                onClick={openDexScreener}
              >
                <Coins className="mr-4 h-8 w-8" />
                Buy VEXUS
                <ArrowRight className="ml-4 h-8 w-8" />
              </Button>
            </div>
          </div>

          {/* Simplified Trading Interface */}
          <SimplifiedTradingInterface />
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-white">
              Why <GradientText>VEXUS</GradientText> Dominates the Market 🚀
            </h2>
            <p className="text-xl md:text-3xl text-gray-300 max-w-5xl mx-auto font-bold">
              Revolutionary technology meets memecoin culture - the perfect investment opportunity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: <Atom className="h-12 w-12" />,
                title: "Quantum Burn Engine",
                description:
                  "Advanced deflationary mechanism that burns 2% of every transaction, creating exponential scarcity and value appreciation over time.",
                color: "from-purple-400 to-purple-600",
                borderColor: "border-purple-400/30",
                shadowColor: "hover:shadow-purple-500/30",
                badges: ["Deflationary", "Auto-Burn", "Quantum"],
              },
              {
                icon: <Orbit className="h-12 w-12" />,
                title: "Multi-Layer Staking",
                description:
                  "Earn up to 247% APY through our revolutionary multi-dimensional staking protocol with compound rewards and bonus multipliers.",
                color: "from-pink-400 to-pink-600",
                borderColor: "border-pink-400/30",
                shadowColor: "hover:shadow-pink-500/30",
                badges: ["247% APY", "Compound", "Rewards"],
              },
              {
                icon: <Cpu className="h-12 w-12" />,
                title: "AI-Powered Trading",
                description:
                  "Integrated artificial intelligence optimizes trading patterns and provides real-time market analysis for maximum profit potential.",
                color: "from-violet-400 to-violet-600",
                borderColor: "border-violet-400/30",
                shadowColor: "hover:shadow-violet-500/30",
                badges: ["AI-Powered", "Smart", "Optimized"],
              },
              {
                icon: <Lock className="h-12 w-12" />,
                title: "Fort Knox Security",
                description:
                  "Military-grade security protocols with multi-signature wallets, time-locked contracts, and quantum-resistant encryption.",
                color: "from-emerald-400 to-emerald-600",
                borderColor: "border-emerald-400/30",
                shadowColor: "hover:shadow-emerald-500/30",
                badges: ["Military-Grade", "Quantum-Safe", "Audited"],
              },
              {
                icon: <Globe className="h-12 w-12" />,
                title: "Global Ecosystem",
                description:
                  "Cross-chain compatibility with Ethereum, BSC, Polygon, and Solana. Trade anywhere, anytime, with lightning-fast speeds.",
                color: "from-cyan-400 to-cyan-600",
                borderColor: "border-cyan-400/30",
                shadowColor: "hover:shadow-cyan-500/30",
                badges: ["Multi-Chain", "Lightning", "Global"],
              },
              {
                icon: <Target className="h-12 w-12" />,
                title: "Institutional Grade",
                description:
                  "Built for serious investors with advanced analytics, portfolio management tools, and institutional-level reporting.",
                color: "from-orange-400 to-orange-600",
                borderColor: "border-orange-400/30",
                shadowColor: "hover:shadow-orange-500/30",
                badges: ["Institutional", "Analytics", "Professional"],
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`bg-black/40 backdrop-blur-2xl border ${feature.borderColor} shadow-2xl ${feature.shadowColor} transition-all duration-500 hover:scale-105 group overflow-hidden`}
              >
                <CardContent className="p-10 text-center relative">
                  <FloatingElement delay={index * 0.2}>
                    <div
                      className={`w-24 h-24 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:animate-spin`}
                    >
                      <div className="text-white">{feature.icon}</div>
                    </div>
                  </FloatingElement>
                  <h3 className="text-2xl font-black mb-6 text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed mb-6 font-medium text-lg">{feature.description}</p>
                  <div className="flex justify-center space-x-2 flex-wrap gap-2">
                    {feature.badges.map((badge, badgeIndex) => (
                      <Badge key={badgeIndex} className="bg-white/10 text-white border-white/20 font-bold text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-white">
              <GradientText>VEXUS</GradientText> Roadmap 🗺️
            </h2>
            <p className="text-xl md:text-3xl text-gray-300 max-w-5xl mx-auto font-bold">
              Our journey to revolutionize the memecoin space with cutting-edge technology
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-violet-500 rounded-full"></div>

            <div className="space-y-16">
              {[
                {
                  phase: "Phase 1",
                  title: "Launch & Foundation",
                  status: "completed",
                  date: "Q4 2024",
                  items: [
                    "✅ Token Launch on Solana",
                    "✅ Raydium DEX Launch",
                    "✅ DexScreener Listing",
                    "✅ Community Building",
                    "✅ Initial Marketing Campaign",
                    "✅ Liquidity Pool Creation",
                  ],
                  color: "from-green-400 to-green-600",
                  borderColor: "border-green-400/30",
                  shadowColor: "hover:shadow-green-500/30",
                  bgColor: "bg-green-500/10",
                },
                {
                  phase: "Phase 2",
                  title: "Growth & Expansion",
                  status: "in-progress",
                  date: "Q1 2025",
                  items: [
                    "🔄 Major CEX Listings",
                    "🔄 Advanced Staking Platform",
                    "🔄 NFT Collection Launch",
                    "🔄 Partnership Announcements",
                    "🔄 Mobile App Development",
                  ],
                  color: "from-yellow-400 to-orange-600",
                  borderColor: "border-yellow-400/30",
                  shadowColor: "hover:shadow-yellow-500/30",
                  bgColor: "bg-yellow-500/10",
                },
                {
                  phase: "Phase 3",
                  title: "Innovation & Utility",
                  status: "upcoming",
                  date: "Q2 2025",
                  items: [
                    "🚀 AI Trading Bot Integration",
                    "🚀 Cross-Chain Bridge",
                    "🚀 DeFi Ecosystem Launch",
                    "🚀 Governance Token Features",
                    "🚀 Metaverse Integration",
                  ],
                  color: "from-purple-400 to-purple-600",
                  borderColor: "border-purple-400/30",
                  shadowColor: "hover:shadow-purple-500/30",
                  bgColor: "bg-purple-500/10",
                },
                {
                  phase: "Phase 4",
                  title: "Global Domination",
                  status: "future",
                  date: "Q3-Q4 2025",
                  items: [
                    "🌟 Institutional Partnerships",
                    "🌟 Global Marketing Campaign",
                    "🌟 Advanced Analytics Platform",
                    "🌟 Educational Academy",
                    "🌟 VEXUS Ecosystem Expansion",
                  ],
                  color: "from-pink-400 to-pink-600",
                  borderColor: "border-pink-400/30",
                  shadowColor: "hover:shadow-pink-500/30",
                  bgColor: "bg-pink-500/10",
                },
              ].map((roadmapItem, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                    <div
                      className={`w-8 h-8 bg-gradient-to-br ${roadmapItem.color} rounded-full border-4 border-black shadow-2xl flex items-center justify-center`}
                    >
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                    <Card
                      className={`bg-black/40 backdrop-blur-2xl border ${roadmapItem.borderColor} shadow-2xl ${roadmapItem.shadowColor} transition-all duration-500 hover:scale-105 group overflow-hidden`}
                    >
                      <CardContent className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <Badge
                            className={`${roadmapItem.bgColor} ${roadmapItem.borderColor} font-bold text-lg px-4 py-2`}
                          >
                            {roadmapItem.phase}
                          </Badge>
                          <span className="text-gray-400 font-bold text-sm">{roadmapItem.date}</span>
                        </div>

                        <h3 className="text-2xl font-black mb-4 text-white">{roadmapItem.title}</h3>

                        <div className="space-y-3">
                          {roadmapItem.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center text-gray-300 font-medium">
                              <span className="text-lg mr-3">{item.split(" ")[0]}</span>
                              <span>{item.substring(item.indexOf(" ") + 1)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6">
                          <Badge
                            className={`
                              ${roadmapItem.status === "completed" ? "bg-green-500/20 text-green-400 border-green-500/50" : ""}
                              ${roadmapItem.status === "in-progress" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50" : ""}
                              ${roadmapItem.status === "upcoming" ? "bg-purple-500/20 text-purple-400 border-purple-500/50" : ""}
                              ${roadmapItem.status === "future" ? "bg-pink-500/20 text-pink-400 border-pink-500/50" : ""}
                              font-bold
                            `}
                          >
                            {roadmapItem.status === "completed" && "✅ COMPLETED"}
                            {roadmapItem.status === "in-progress" && "🔄 IN PROGRESS"}
                            {roadmapItem.status === "upcoming" && "🚀 UPCOMING"}
                            {roadmapItem.status === "future" && "🌟 FUTURE"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap CTA */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-purple-500/10 via-black/60 to-pink-500/10 backdrop-blur-2xl rounded-3xl p-12 border border-purple-500/30 shadow-2xl glow-animation">
              <h3 className="text-3xl md:text-5xl font-black mb-6 text-white">
                Be Part of the <GradientText>VEXUS Journey</GradientText> 🚀
              </h3>
              <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-bold">
                Join thousands of early adopters who are already benefiting from our revolutionary roadmap execution
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 hover:from-purple-700 hover:via-pink-700 hover:to-violet-700 text-xl px-12 py-6 shadow-2xl shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm font-bold glow-animation"
                onClick={openDexScreener}
              >
                <Rocket className="mr-3 h-6 w-6" />
                Join the Revolution
                <Star className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Community Section */}
      <section ref={communityRef} className="py-24 px-4 relative z-10">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-white">
            Join the <GradientText>Elite Community</GradientText> 💎
          </h2>
          <p className="text-xl md:text-3xl text-gray-300 mb-16 max-w-5xl mx-auto font-bold">
            Connect with sophisticated investors and crypto veterans in our exclusive ecosystem
          </p>

          <div className="grid md:grid-cols-3 gap-10 mb-20">
            {[
              {
                icon: <Twitter className="h-12 w-12" />,
                title: "Elite Twitter",
                description: "Exclusive insights and alpha calls",
                color: "from-blue-400 to-blue-600",
                borderColor: "border-blue-400/30",
                shadowColor: "hover:shadow-blue-500/30",
                buttonText: "Follow @VexusElite",
                buttonColor: "border-blue-500/50 text-blue-400 hover:bg-blue-500/10",
              },
              {
                icon: <Send className="h-12 w-12" />,
                title: "VIP Telegram",
                description: "Real-time trading signals and analysis",
                color: "from-purple-400 to-purple-600",
                borderColor: "border-purple-400/30",
                shadowColor: "hover:shadow-purple-500/30",
                buttonText: "Join VIP Channel",
                buttonColor: "border-purple-500/50 text-purple-400 hover:bg-purple-500/10",
              },
              {
                icon: <MessageCircle className="h-12 w-12" />,
                title: "Premium Discord",
                description: "Exclusive community for holders",
                color: "from-indigo-400 to-indigo-600",
                borderColor: "border-indigo-400/30",
                shadowColor: "hover:shadow-indigo-500/30",
                buttonText: "Enter Premium",
                buttonColor: "border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10",
              },
            ].map((social, index) => (
              <Card
                key={index}
                className={`bg-black/40 backdrop-blur-2xl border ${social.borderColor} shadow-2xl ${social.shadowColor} transition-all duration-300 hover:scale-105`}
              >
                <CardContent className="p-10 text-center">
                  <FloatingElement delay={index * 0.3}>
                    <div
                      className={`w-24 h-24 bg-gradient-to-br ${social.color} rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:animate-pulse`}
                    >
                      <div className="text-white">{social.icon}</div>
                    </div>
                  </FloatingElement>
                  <h3 className="text-2xl font-black mb-4 text-white">{social.title}</h3>
                  <p className="text-gray-300 mb-6 font-medium text-lg">{social.description}</p>
                  <Button
                    variant="outline"
                    className={`${social.buttonColor} backdrop-blur-sm font-bold text-lg px-8 py-3 glow-animation`}
                    onClick={
                      social.title === "VIP Telegram"
                        ? openTelegram
                        : social.title === "Premium Discord"
                          ? openDiscord
                          : undefined
                    }
                  >
                    {social.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Ultimate CTA */}
          <div className="bg-gradient-to-r from-purple-500/10 via-black/60 to-pink-500/10 backdrop-blur-2xl rounded-3xl p-16 border border-purple-500/30 shadow-2xl relative overflow-hidden glow-animation">
            <div className="relative z-10">
              <FloatingElement>
                <div className="mb-10">
                  <VexusLogo size={200} />
                </div>
              </FloatingElement>
              <h3 className="text-4xl md:text-6xl font-black mb-8 text-white">
                Ready to Join the <GradientText>VEXUS Revolution</GradientText>? 💎
              </h3>
              <p className="text-xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto font-bold">
                Early adopters are already seeing 2000%+ gains. Don't miss your chance to be part of the next crypto
                phenomenon!
              </p>
              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 hover:from-purple-700 hover:via-pink-700 hover:to-violet-700 text-2xl px-20 py-10 shadow-2xl shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm font-bold glow-animation"
                  onClick={openDexScreener}
                >
                  <Rocket className="mr-4 h-8 w-8" />
                  Buy VEXUS Now
                  <Star className="ml-4 h-8 w-8" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="border-t border-purple-500/20 py-16 px-4 bg-gradient-to-r from-black/80 to-purple-950/80 backdrop-blur-2xl relative z-10">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <FloatingElement>
                <VexusLogo size={60} />
              </FloatingElement>
              <span className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-violet-600 bg-clip-text text-transparent">
                VEXUS
              </span>
            </div>
            <p className="text-gray-300 text-lg mb-6 font-medium max-w-2xl mx-auto">
              The most advanced memecoin ecosystem with institutional-grade technology and revolutionary DeFi mechanics.
              💎
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              <Link href="#" className="text-blue-400 hover:text-blue-300 transition-colors transform hover:scale-110">
                <Twitter className="h-8 w-8" />
              </Link>
              <Link
                href="#"
                className="text-purple-400 hover:text-purple-300 transition-colors transform hover:scale-110"
              >
                <Send className="h-8 w-8" />
              </Link>
              <Link
                href="#"
                className="text-indigo-400 hover:text-indigo-300 transition-colors transform hover:scale-110"
              >
                <MessageCircle className="h-8 w-8" />
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              © 2024 VEXUS Protocol. Built for the future of decentralized finance. Not financial advice - DYOR.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
