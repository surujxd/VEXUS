"use client"

export function ApexLogo({ size = 50 }: { size?: number }) {
  return (
    <div
      className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-red-800 shadow-2xl"
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-400/20 to-transparent"></div>
      <div className="relative z-10 text-white font-bold" style={{ fontSize: size * 0.4 }}>
        A
      </div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
    </div>
  )
}
