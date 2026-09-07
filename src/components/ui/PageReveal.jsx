import {
  motion,
} from "motion/react"

function PageReveal({
  children,
  delay = 0,
  y = 24,
  x = 0,
  duration = 0.72,
  className = "",
  once = true,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y,
        x,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      viewport={{
        once,
        amount: 0.18,
      }}
      transition={{
        duration,
        delay,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default PageReveal