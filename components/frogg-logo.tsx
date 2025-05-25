"use client"

export function FroggLogo({ size = 50 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="froggGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="froggGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Frog body */}
        <ellipse cx="50" cy="65" rx="25" ry="20" fill="url(#froggGradient)" />

        {/* Frog head */}
        <ellipse cx="50" cy="40" rx="20" ry="18" fill="url(#froggGradient)" />

        {/* Eyes */}
        <circle cx="42" cy="32" r="8" fill="#4ade80" />
        <circle cx="58" cy="32" r="8" fill="#4ade80" />
        <circle cx="42" cy="32" r="5" fill="#ffffff" />
        <circle cx="58" cy="32" r="5" fill="#ffffff" />
        <circle cx="43" cy="31" r="3" fill="#000000" />
        <circle cx="59" cy="31" r="3" fill="#000000" />
        <circle cx="44" cy="30" r="1" fill="#ffffff" />
        <circle cx="60" cy="30" r="1" fill="#ffffff" />

        {/* Mouth */}
        <path d="M40 45 Q50 50 60 45" stroke="#15803d" strokeWidth="2" fill="none" />

        {/* Front legs */}
        <ellipse cx="35" cy="70" rx="6" ry="12" fill="url(#froggGradient)" />
        <ellipse cx="65" cy="70" rx="6" ry="12" fill="url(#froggGradient)" />

        {/* Back legs */}
        <ellipse cx="25" cy="75" rx="8" ry="10" fill="url(#froggGradient)" />
        <ellipse cx="75" cy="75" rx="8" ry="10" fill="url(#froggGradient)" />

        {/* Glow effect */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="url(#froggGlow)"
          opacity="0.3"
          className="animate-ping"
          style={{ animationDuration: "3s" }}
        />
      </svg>

      {/* Floating lily pads */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-4 left-3 w-1 h-1 bg-green-500 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-3 right-4 w-1 h-1 bg-green-300 rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </div>
  )
}
