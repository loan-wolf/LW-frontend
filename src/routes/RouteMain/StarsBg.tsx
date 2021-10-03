import { useRef, useEffect } from 'react'

type Star = {
  x: number
  y: number
  z: number
  o: string
  s: number
}

type Props = {
  className?: string
}

export function StarsBg({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const pixelRatio = window.devicePixelRatio || 1
    const canvas = canvasRef.current as HTMLCanvasElement

    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    let nextTime = Date.now()
    let prevTime = Date.now()
    let timeDiff = 0
    let numStars = 1900
    let focalLength: number
    let centerX: number
    let centerY: number

    let stars: Star[] = []
    let star: Star
    let i

    let animate = true

    function initializeStars() {
      const width = window.innerWidth
      const height = window.innerHeight
      focalLength = Math.min(width, height)
      centerX = width / 2
      centerY = height / 2
      stars = []
      for (i = 0; i < numStars; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const z = Math.random() * width
        const o = `0.${Math.floor(Math.random() * 99) + 1}`
        // const halfW = width / 2
        // const positionSpeedCoeff = 1 - Math.abs(x - halfW) / halfW
        // const s = Math.max(0.3, positionSpeedCoeff) * 0.1
        const s = 0.05
        stars.push({ x, y, z, o, s })
      }
    }

    function moveStars() {
      for (i = 0; i < numStars; i++) {
        star = stars[i]
        star.z -= timeDiff * star.s

        if (star.z <= 0) {
          star.z = window.innerWidth
        }
      }
    }

    function drawStars() {
      let pixelX, pixelY, pixelRadius

      // Resize to the screen
      const width = window.innerWidth * pixelRatio
      const height = window.innerHeight * pixelRatio
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        canvas.style.width = window.innerWidth + 'px'
        canvas.style.height = window.innerHeight + 'px'
        initializeStars()
      }

      ctx.save()
      ctx.scale(pixelRatio, pixelRatio)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (i = 0; i < numStars; i++) {
        star = stars[i]

        pixelX = (star.x - centerX) * (focalLength / star.z)
        pixelX += centerX
        pixelY = (star.y - centerY) * (focalLength / star.z)
        pixelY += centerY
        pixelRadius = 1 * (focalLength / star.z)

        ctx.fillRect(pixelX, pixelY, pixelRadius, pixelRadius)
        ctx.fillStyle = 'rgba(209, 255, 255, ' + star.o + ')'
      }

      ctx.restore()
    }

    function executeFrame() {
      if (animate) window.requestAnimationFrame(executeFrame)
      nextTime = Date.now()
      timeDiff = nextTime - prevTime
      moveStars()
      drawStars()
      prevTime = nextTime
    }

    initializeStars()
    executeFrame()

    return () => {
      animate = false
    }
  }, [])

  return <canvas ref={canvasRef} className={className} />
}
