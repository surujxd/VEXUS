"use client"

import { useEffect, useRef } from "react"

export function AdvancedParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    // Advanced particle system
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
      life: number
      maxLife: number
      type: "float" | "energy" | "spark"
    }> = []

    // Energy waves
    const waves: Array<{
      x: number
      y: number
      radius: number
      maxRadius: number
      opacity: number
      color: string
    }> = []

    const colors = ["#8b5cf6", "#a855f7", "#c084fc", "#e879f9", "#f0abfc"]

    // Initialize particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 300 + 200,
        type: Math.random() > 0.7 ? "energy" : Math.random() > 0.5 ? "spark" : "float",
      })
    }

    function createWave(x: number, y: number) {
      waves.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.random() * 200 + 100,
        opacity: 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Create waves periodically
    setInterval(() => {
      createWave(Math.random() * canvas.width, Math.random() * canvas.height)
    }, 3000)

    function drawParticles() {
      if (!ctx || !canvas) return

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        // Boundary collision
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8

        // Reset particle if life exceeded
        if (particle.life > particle.maxLife) {
          particle.life = 0
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          particle.vx = (Math.random() - 0.5) * 2
          particle.vy = (Math.random() - 0.5) * 2
        }

        const alpha = particle.opacity * (1 - particle.life / particle.maxLife)

        // Draw based on type
        if (particle.type === "energy") {
          // Energy particle with glow
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = particle.color + "20"
          ctx.fill()

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.globalAlpha = alpha
          ctx.fill()
        } else if (particle.type === "spark") {
          // Spark particle
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(particle.x + particle.vx * 5, particle.y + particle.vy * 5)
          ctx.strokeStyle = particle.color
          ctx.lineWidth = particle.size
          ctx.globalAlpha = alpha
          ctx.stroke()
        } else {
          // Regular floating particle
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.globalAlpha = alpha
          ctx.fill()
        }

        // Draw connections between nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex && particle.type === "energy" && otherParticle.type === "energy") {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 120) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = particle.color
              ctx.globalAlpha = alpha * (1 - distance / 120) * 0.3
              ctx.lineWidth = 1
              ctx.stroke()
            }
          }
        })
      })
    }

    function drawWaves() {
      if (!ctx) return

      waves.forEach((wave, index) => {
        wave.radius += 2
        wave.opacity *= 0.995

        if (wave.radius > wave.maxRadius || wave.opacity < 0.01) {
          waves.splice(index, 1)
          return
        }

        ctx.beginPath()
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
        ctx.strokeStyle = wave.color
        ctx.lineWidth = 2
        ctx.globalAlpha = wave.opacity
        ctx.stroke()
      })
    }

    function drawEnergyGrid() {
      if (!ctx || !canvas) return

      const time = Date.now() * 0.001
      const gridSize = 100

      ctx.strokeStyle = "#8b5cf6"
      ctx.lineWidth = 1
      ctx.globalAlpha = 0.1

      // Animated grid
      for (let x = 0; x <= canvas.width; x += gridSize) {
        const offset = Math.sin(time + x * 0.01) * 10
        ctx.beginPath()
        ctx.moveTo(x + offset, 0)
        ctx.lineTo(x + offset, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y <= canvas.height; y += gridSize) {
        const offset = Math.cos(time + y * 0.01) * 10
        ctx.beginPath()
        ctx.moveTo(0, y + offset)
        ctx.lineTo(canvas.width, y + offset)
        ctx.stroke()
      }
    }

    function animate() {
      if (!ctx || !canvas) return

      // Clear with fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.globalAlpha = 1

      drawEnergyGrid()
      drawWaves()
      drawParticles()

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
