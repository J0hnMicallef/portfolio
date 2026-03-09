import { useEffect, useRef } from 'react'
import styles from './MatrixRain.module.css'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}()/*&^%$#@!~'

export default function MatrixRain({ opacity = 0.08 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const fontSize = 13
    let columns = Math.floor(canvas.width / fontSize)
    const drops = Array(columns).fill(1)

    const draw = () => {
      ctx.fillStyle = `rgba(8, 12, 14, 0.05)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x = i * fontSize

        // Lead character brighter
        const y = drops[i] * fontSize
        ctx.fillStyle = `rgba(0, 255, 136, 0.9)`
        ctx.fillText(char, x, y)

        // Trail
        ctx.fillStyle = `rgba(0, 212, 255, ${opacity})`
        ctx.fillText(char, x, y - fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      animId = requestAnimationFrame(draw)
    }

    const interval = setInterval(() => {
      columns = Math.floor(canvas.width / fontSize)
    }, 5000)

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [opacity])

  return <canvas ref={canvasRef} className={styles.canvas} />
}
