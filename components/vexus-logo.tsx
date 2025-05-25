"use client"

export function VexusLogo({ size = 50 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="vexusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="30%" stopColor="#a855f7" />
            <stop offset="60%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
          <linearGradient id="vexusGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0abfc" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main crystal/diamond shape */}
        <path
          d="M50 10 L75 35 L60 85 L40 85 L25 35 Z"
          fill="url(#vexusGradient)"
          filter="url(#glow)"
          className="animate-pulse"
        />

        {/* Inner crystal facets */}
        <path d="M50 10 L60 30 L50 50 L40 30 Z" fill="url(#vexusGradient)" opacity="0.8" />
        <path d="M40 30 L50 50 L40 85 L25 35 Z" fill="url(#vexusGradient)" opacity="0.6" />
        <path d="M60 30 L75 35 L60 85 L50 50 Z" fill="url(#vexusGradient)" opacity="0.6" />

        {/* Energy core */}
        <circle cx="50" cy="45" r="8" fill="#f0abfc" className="animate-ping" opacity="0.8" />
        <circle cx="50" cy="45" r="4" fill="#ffffff" />

        {/* Floating energy particles */}
        <circle cx="30" cy="25" r="2" fill="#c084fc" className="animate-bounce" opacity="0.7" />
        <circle
          cx="70"
          cy="30"
          r="1.5"
          fill="#a855f7"
          className="animate-bounce"
          opacity="0.8"
          style={{ animationDelay: "0.5s" }}
        />
        <circle
          cx="35"
          cy="70"
          r="1"
          fill="#e879f9"
          className="animate-bounce"
          opacity="0.6"
          style={{ animationDelay: "1s" }}
        />
        <circle
          cx="65"
          cy="65"
          r="1.5"
          fill="#f0abfc"
          className="animate-bounce"
          opacity="0.7"
          style={{ animationDelay: "1.5s" }}
        />

        {/* Outer glow ring */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="url(#vexusGlow)"
          strokeWidth="1"
          opacity="0.4"
          className="animate-spin"
          style={{ animationDuration: "8s" }}
        />
      </svg>

      {/* Additional floating effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1 right-3 w-1 h-1 bg-purple-400 rounded-full animate-ping"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-5 left-2 w-0.5 h-0.5 bg-pink-400 rounded-full animate-ping"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-2 right-2 w-0.5 h-0.5 bg-violet-400 rounded-full animate-ping"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>
    </div>
  )
}
