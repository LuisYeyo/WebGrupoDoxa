import { motion } from "motion/react"

function PageLoader() {
  return (
    <motion.div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-slate-950 text-white
      "
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.6,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
    >
      <div className="flex flex-col items-center">

        {/* SÍMBOLO */}
        <div className="relative flex h-28 w-28 items-center justify-center">

          {/* CÍRCULO EXTERIOR */}
          <motion.div
            className="
              absolute inset-0
              rounded-full
              border border-white/20
              border-t-blue-500
            "
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* CÍRCULO INTERIOR */}
          <motion.div
            className="
              absolute inset-3
              rounded-full
              border border-white/10
            "
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
            }}
          />

          {/* DOXA */}
          <motion.span
            className="
              text-lg font-bold
              tracking-[0.25em]
            "
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.2,
              duration: 0.6,
            }}
          >
            DOXA
          </motion.span>

        </div>

        {/* NOMBRE */}
        <motion.p
          className="
            mt-8
            text-xs font-semibold
            uppercase
            tracking-[0.35em]
            text-slate-300
          "
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.35,
            duration: 0.6,
          }}
        >
          Grupo Industrial DOXA
        </motion.p>

        {/* LINEA */}
        <div className="mt-7 h-px w-40 overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-blue-500"
            initial={{
              x: "-100%",
            }}
            animate={{
              x: "0%",
            }}
            transition={{
              duration: 1.4,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        </div>

      </div>
    </motion.div>
  )
}

export default PageLoader