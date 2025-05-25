"use client"

export function PhoenixLogo({ size = 50 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="phoenixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="phoenixGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Phoenix body */}
        <path
          d="M50 20 C60 25, 70 35, 65 50 C70 65, 60 75, 50 80 C40 75, 30 65, 35 50 C30 35, 40 25, 50 20 Z"
          fill="url(#phoenixGradient)"
          className="animate-pulse"
        />

        {/* Phoenix wings */}
        <path d="M35 40 C25 35, 15 40, 20 50 C15 55, 25 60, 35 55" fill="url(#phoenixGradient)" opacity="0.8" />
        <path d="M65 40 C75 35, 85 40, 80 50 C85 55, 75 60, 65 55" fill="url(#phoenixGradient)" opacity="0.8" />

        {/* Phoenix tail feathers */}
        <path d="M50 80 C45 90, 40 95, 35 90 C40 85, 45 85, 50 80" fill="url(#phoenixGradient)" opacity="0.7" />
        <path d="M50 80 C55 90, 60 95, 65 90 C60 85, 55 85, 50 80" fill="url(#phoenixGradient)" opacity="0.7" />

        {/* Phoenix head/beak */}
        <circle cx="50" cy="30" r="8" fill="url(#phoenixGradient)" />
        <path d="M50 25 L55 20 L50 22 Z" fill="#f59e0b" />

        {/* Glow effect */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="url(#phoenixGlow)"
          opacity="0.3"
          className="animate-ping"
          style={{ animationDuration: "3s" }}
        />
      </svg>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-2 right-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-4 left-3 w-1 h-1 bg-red-400 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-3 right-4 w-1 h-1 bg-orange-400 rounded-full animate-ping"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </div>
  )
}
