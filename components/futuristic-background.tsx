"use client"

import { useEffect, useRef } from "react"

export function FuturisticBackground() {
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

    // Geometric grid
    const gridSize = 50
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
    }> = []

    // Matrix-like digital rain
    const matrixChars = "01"
    const matrixColumns = Math.floor(canvas.width / 20)
    const matrixDrops: number[] = []

    for (let i = 0; i < matrixColumns; i++) {
      matrixDrops[i] = Math.random() * canvas.height
    }

    // Floating particles
    const colors = ["#dc2626", "#ef4444", "#f59e0b", "#fbbf24"]
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 200,
      })
    }

    function drawGrid() {
      if (!ctx || !canvas) return

      ctx.strokeStyle = "rgba(239, 68, 68, 0.1)"
      ctx.lineWidth = 1

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    function drawMatrixRain() {
      if (!ctx || !canvas) return

      ctx.fillStyle = "rgba(239, 68, 68, 0.1)"
      ctx.font = "15px monospace"

      for (let i = 0; i < matrixDrops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)]
        ctx.fillText(text, i * 20, matrixDrops[i])

        if (matrixDrops[i] > canvas.height && Math.random() > 0.975) {
          matrixDrops[i] = 0
        }
        matrixDrops[i] += 20
      }
    }

    function drawParticles() {
      if (!ctx || !canvas) return

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        if (particle.life > particle.maxLife) {
          particle.life = 0
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
        }

        const alpha = particle.opacity * (1 - particle.life / particle.maxLife)

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = alpha
        ctx.fill()

        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = particle.color
              ctx.globalAlpha = alpha * (1 - distance / 100) * 0.3
              ctx.lineWidth = 1
              ctx.stroke()
            }
          }
        })
      })
    }

    function drawHolographicEffects() {
      if (!ctx || !canvas) return

      const time = Date.now() * 0.001

      // Scanning lines
      ctx.strokeStyle = "rgba(239, 68, 68, 0.3)"
      ctx.lineWidth = 2
      const scanY = (Math.sin(time) * 0.5 + 0.5) * canvas.height
      ctx.beginPath()
      ctx.moveTo(0, scanY)
      ctx.lineTo(canvas.width, scanY)
      ctx.stroke()

      // Circular radar effect
      const centerX = canvas.width * 0.8
      const centerY = canvas.height * 0.2
      const radius = 150

      ctx.strokeStyle = "rgba(245, 158, 11, 0.2)"
      ctx.lineWidth = 1
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius - i * 30, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Rotating radar line
      const angle = time * 2
      ctx.strokeStyle = "rgba(245, 158, 11, 0.5)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
      ctx.stroke()
    }

    function animate() {
      if (!ctx || !canvas) return

      // Clear with fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.globalAlpha = 1

      drawGrid()
      drawMatrixRain()
      drawParticles()
      drawHolographicEffects()

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
