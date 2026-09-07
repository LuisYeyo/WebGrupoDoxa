import { useEffect, useRef, useState } from "react"

function AnimatedCounter({ value, duration = 1600 }) {
  const [count, setCount] = useState(0)

  const elementRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = elementRef.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) {
          return
        }

        hasAnimated.current = true

        const startTime = performance.now()

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime

          const progress = Math.min(
            elapsed / duration,
            1
          )

          const easedProgress =
            1 - Math.pow(1 - progress, 3)

          const currentValue = Math.floor(
            easedProgress * value
          )

          setCount(currentValue)

          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }

        requestAnimationFrame(animate)

        observer.disconnect()
      },
      {
        threshold: 0.3,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [value, duration])

  return (
    <span ref={elementRef}>
      {count.toLocaleString("en-US")}
    </span>
  )
}

export default AnimatedCounter