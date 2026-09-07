import {
  useState,
} from "react"

import {
  AnimatePresence,
  motion,
} from "motion/react"

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react"

import {
  processes,
} from "../../data/processes"

import {
  useLanguage,
} from "../../context/LanguageContext"

function ProcessPreview() {
  const [
    activeProcessIndex,
    setActiveProcessIndex,
  ] = useState(0)

  const [
    activeStepIndex,
    setActiveStepIndex,
  ] = useState(0)

  const {
    language,
    t,
  } = useLanguage()

  const activeProcess =
    processes[
      activeProcessIndex
    ]

  const activeStep =
    activeProcess.steps[
      activeStepIndex
    ]

  const changeProcess = (
    index
  ) => {
    setActiveProcessIndex(
      index
    )

    setActiveStepIndex(0)
  }

  const nextStep = () => {
    setActiveStepIndex(
      (current) =>
        current ===
        activeProcess.steps
          .length -
          1
          ? 0
          : current + 1
    )
  }

  const previousStep = () => {
    setActiveStepIndex(
      (current) =>
        current === 0
          ? activeProcess
              .steps.length -
            1
          : current - 1
    )
  }

  const progress =
    ((activeStepIndex + 1) /
      activeProcess.steps
        .length) *
    100

  return (
    <section
      id="procesos"
      className="
        overflow-hidden
        bg-[#020817]
        py-24
        text-white
        md:py-32
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-6
        "
      >

        {/* HEADER */}
        <div
          className="
            grid
            gap-10
            border-b
            border-white/15
            pb-14
            lg:grid-cols-2
          "
        >

          <div>

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.3em]
                text-blue-400
              "
            >
              {t(
                "Así lo hacemos",
                "How we do it"
              )}
            </p>

            <h2
              className="
                mt-5
                text-4xl
                font-bold
                tracking-tight
                sm:text-5xl
                lg:text-6xl
              "
            >
              {t(
                <>
                  De la materia prima
                  <br />
                  al proyecto terminado.
                </>,
                <>
                  From raw material
                  <br />
                  to the finished project.
                </>
              )}
            </h2>

          </div>

          <div className="flex items-end">

            <p
              className="
                max-w-xl
                text-base
                leading-7
                text-slate-400
                lg:text-lg
              "
            >
              {t(
                "Conoce las principales etapas detrás de nuestros procesos de fabricación, control y montaje industrial.",
                "Explore the main stages behind our industrial fabrication, quality control and installation processes."
              )}
            </p>

          </div>

        </div>

        {/* SELECTOR */}
        <div
          className="
            flex
            flex-wrap
            gap-2
            border-b
            border-white/15
            py-7
          "
        >

          {processes.map(
            (
              process,
              index
            ) => {
              const isActive =
                index ===
                activeProcessIndex

              return (
                <button
                  key={process.id}
                  type="button"
                  onClick={() =>
                    changeProcess(
                      index
                    )
                  }
                  className={`
                    min-h-11
                    cursor-pointer
                    px-5
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    transition

                    ${
                      isActive
                        ? `
                          border
                          border-blue-600
                          bg-blue-600
                          text-white
                        `
                        : `
                          border
                          border-white/15
                          bg-transparent
                          text-slate-400
                          hover:border-white/40
                          hover:text-white
                        `
                    }
                  `}
                >
                  {
                    process.name[
                      language
                    ]
                  }
                </button>
              )
            }
          )}

        </div>

        {/* DESCRIPCIÓN */}
        <div
          className="
            grid
            gap-6
            py-8
            md:grid-cols-[1fr_auto]
            md:items-end
          "
        >

          <div>

            <p
              className="
                text-xs
                uppercase
                tracking-[0.25em]
                text-blue-400
              "
            >
              {t(
                "Proceso",
                "Process"
              )}
            </p>

            <h3
              className="
                mt-3
                text-3xl
                font-bold
              "
            >
              {
                activeProcess.name[
                  language
                ]
              }
            </h3>

            <p
              className="
                mt-3
                max-w-xl
                text-sm
                leading-6
                text-slate-400
              "
            >
              {
                activeProcess.description[
                  language
                ]
              }
            </p>

          </div>

          <p
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-slate-500
            "
          >
            {String(
              activeStepIndex +
                1
            ).padStart(
              2,
              "0"
            )}
            {" / "}
            {String(
              activeProcess.steps
                .length
            ).padStart(
              2,
              "0"
            )}
          </p>

        </div>

        {/* PRINCIPAL */}
        <div
          className="
            grid
            gap-12
            lg:grid-cols-[0.7fr_1.3fr]
          "
        >

          {/* TIMELINE */}
          <div>

            {activeProcess.steps.map(
              (
                step,
                index
              ) => {
                const isActive =
                  index ===
                  activeStepIndex

                const isCompleted =
                  index <
                  activeStepIndex

                return (
                  <button
                    key={`${activeProcess.id}-${step.number}`}
                    type="button"
                    onClick={() =>
                      setActiveStepIndex(
                        index
                      )
                    }
                    className="
                      group
                      relative
                      grid
                      w-full
                      cursor-pointer
                      grid-cols-[48px_1fr]
                      gap-4
                      border-0
                      border-b
                      border-white/10
                      bg-transparent
                      py-5
                      text-left
                    "
                  >

                    <span
                      className={`
                        text-xs
                        font-semibold
                        tracking-[0.2em]
                        transition

                        ${
                          isActive
                            ? "text-blue-400"
                            : isCompleted
                            ? "text-white"
                            : "text-slate-600"
                        }
                      `}
                    >
                      {
                        step.number
                      }
                    </span>

                    <span
                      className={`
                        text-base
                        font-medium
                        transition
                        sm:text-lg

                        ${
                          isActive
                            ? `
                              translate-x-2
                              text-white
                            `
                            : `
                              text-slate-500
                              group-hover:text-white
                            `
                        }
                      `}
                    >
                      {
                        step.title[
                          language
                        ]
                      }
                    </span>

                  </button>
                )
              }
            )}

          </div>

          {/* PANEL */}
          <div>

            <AnimatePresence
              mode="wait"
            >

              <motion.div
                key={`${activeProcess.id}-${activeStep.number}-${language}`}
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -18,
                }}
                transition={{
                  duration: 0.35,
                }}
              >

                {/* FOTO */}
                <div
                  className="
                    relative
                    aspect-[16/10]
                    overflow-hidden
                    bg-slate-900
                  "
                >

                  {activeStep.image ? (
                    <img
                      src={
                        activeStep.image
                      }
                      alt={
                        activeStep.title[
                          language
                        ]
                      }
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex
                        h-full
                        flex-col
                        items-center
                        justify-center
                        bg-gradient-to-br
                        from-slate-900
                        to-slate-950
                      "
                    >
                      <span
                        className="
                          text-[clamp(5rem,12vw,11rem)]
                          font-bold
                          leading-none
                          text-white/[0.025]
                        "
                      >
                        {
                          activeStep.number
                        }
                      </span>

                      <p
                        className="
                          -mt-6
                          text-xs
                          uppercase
                          tracking-[0.3em]
                          text-slate-600
                        "
                      >
                        {t(
                          "Fotografía del proceso",
                          "Process photo"
                        )}
                      </p>

                    </div>
                  )}

                  <div
                    className="
                      absolute
                      left-6
                      top-6
                      border
                      border-white/15
                      bg-slate-950/75
                      px-4
                      py-2
                      backdrop-blur
                    "
                  >
                    <span
                      className="
                        text-xs
                        tracking-[0.25em]
                      "
                    >
                      {
                        activeStep.number
                      }
                    </span>
                  </div>

                </div>

                {/* INFO */}
                <div
                  className="
                    grid
                    gap-8
                    pt-8
                    sm:grid-cols-[1fr_auto]
                  "
                >

                  <div>

                    <p
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.25em]
                        text-blue-400
                      "
                    >
                      {t(
                        `Etapa ${activeStep.number}`,
                        `Stage ${activeStep.number}`
                      )}
                    </p>

                    <h4
                      className="
                        mt-3
                        text-3xl
                        font-bold
                        sm:text-4xl
                      "
                    >
                      {
                        activeStep.title[
                          language
                        ]
                      }
                    </h4>

                    <p
                      className="
                        mt-5
                        max-w-2xl
                        text-base
                        leading-7
                        text-slate-400
                      "
                    >
                      {
                        activeStep.description[
                          language
                        ]
                      }
                    </p>

                  </div>

                  {/* FLECHAS */}
                  <div
                    className="
                      flex
                      items-start
                      gap-2
                    "
                  >

                    <button
                      type="button"
                      onClick={
                        previousStep
                      }
                      aria-label={t(
                        "Etapa anterior",
                        "Previous stage"
                      )}
                      className="
                        flex
                        h-12
                        w-12
                        cursor-pointer
                        items-center
                        justify-center
                        border
                        border-white/20
                        bg-transparent
                        text-white
                        transition

                        hover:border-blue-500
                        hover:bg-blue-600
                      "
                    >
                      <ArrowLeft
                        size={19}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={
                        nextStep
                      }
                      aria-label={t(
                        "Etapa siguiente",
                        "Next stage"
                      )}
                      className="
                        flex
                        h-12
                        w-12
                        cursor-pointer
                        items-center
                        justify-center
                        border
                        border-white/20
                        bg-transparent
                        text-white
                        transition

                        hover:border-blue-500
                        hover:bg-blue-600
                      "
                    >
                      <ArrowRight
                        size={19}
                      />
                    </button>

                  </div>

                </div>

              </motion.div>

            </AnimatePresence>

          </div>

        </div>

        {/* PROGRESO */}
        <div className="mt-14">

          <div
            className="
              mb-3
              flex
              justify-between
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-slate-600
            "
          >
            <span>
              {t(
                "Inicio",
                "Start"
              )}
            </span>

            <span>
              {t(
                "Proceso",
                "Process"
              )}
            </span>

            <span>
              {t(
                "Final",
                "Finish"
              )}
            </span>
          </div>

          <div
            className="
              h-px
              overflow-hidden
              bg-white/15
            "
          >
            <motion.div
              className="
                h-full
                bg-blue-500
              "
              animate={{
                width:
                  `${progress}%`,
              }}
              transition={{
                duration: 0.4,
                ease: [
                  0.76,
                  0,
                  0.24,
                  1,
                ],
              }}
            />
          </div>

        </div>

        <div
          className="
            mt-12
            flex
            justify-end
          "
        >
          <a
            href="/procesos"
            className="
              group
              inline-flex
              items-center
              gap-3
              text-sm
              font-semibold
              uppercase
              tracking-[0.15em]
              text-blue-400
            "
          >
            {t(
              "Conocer nuestros procesos",
              "Explore our processes"
            )}

            <ArrowUpRight
              size={18}
              className="
                transition-transform
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </a>
        </div>

      </div>
    </section>
  )
}

export default ProcessPreview