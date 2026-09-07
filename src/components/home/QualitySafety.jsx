import {
  useEffect,
  useState,
} from "react"

import {
  AnimatePresence,
  motion,
} from "motion/react"

import {
  CheckCircle2,
  ShieldCheck,
} from "lucide-react"

import {
  qualitySafety,
} from "../../data/qualitySafety"

import {
  useLanguage,
} from "../../context/LanguageContext"

function QualitySafety() {
  const [
    activeCategory,
    setActiveCategory,
  ] = useState("quality")

  const [
    activeItemIndex,
    setActiveItemIndex,
  ] = useState(0)

  const {
    language,
    t,
  } = useLanguage()

  const category =
    qualitySafety[
      activeCategory
    ]

  const activeItem =
    category.items[
      activeItemIndex
    ] ?? category.items[0]

  /*
    Cada vez que cambiamos entre
    Calidad y Seguridad regresamos
    al primer procedimiento.
  */
  useEffect(() => {
    setActiveItemIndex(0)
  }, [activeCategory])

  return (
    <section
      id="calidad"
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

        {/* ==================================
            HEADER
        ================================== */}

        <div
          className="
            grid
            gap-10
            border-b
            border-white/15
            pb-14
            lg:grid-cols-[1fr_0.8fr]
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
                "Calidad + Seguridad",
                "Quality + Safety"
              )}
            </p>

            <h2
              className="
                mt-5
                text-4xl
                font-bold
                leading-[0.98]
                tracking-tight
                sm:text-5xl
                lg:text-6xl
              "
            >
              {t(
                <>
                  Precisión en cada proceso.
                  <br />
                  Seguridad en cada proyecto.
                </>,
                <>
                  Precision in every process.
                  <br />
                  Safety in every project.
                </>
              )}
            </h2>

          </div>

          <div
            className="
              flex
              items-end
            "
          >

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
                "Procedimientos operativos que forman parte del control técnico y de seguridad aplicado por Grupo Industrial DOXA.",
                "Operating procedures that form part of Grupo Industrial DOXA's technical and safety control."
              )}
            </p>

          </div>

        </div>

        {/* ==================================
            SELECTOR CALIDAD / SEGURIDAD
        ================================== */}

        <div
          className="
            grid
            border-b
            border-white/15
            sm:grid-cols-2
          "
        >

          {/* CALIDAD */}
          <button
            type="button"
            onClick={() =>
              setActiveCategory(
                "quality"
              )
            }
            className={`
              relative
              cursor-pointer
              border-0
              border-b
              border-white/15
              bg-transparent
              px-6
              py-7
              text-left
              transition

              sm:border-b-0
              sm:border-r

              ${
                activeCategory ===
                "quality"
                  ? "text-white"
                  : `
                    text-slate-500
                    hover:text-white
                  `
              }
            `}
          >

            <div
              className="
                flex
                items-center
                justify-between
                gap-6
              "
            >

              <div>

                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.3em]
                    text-blue-400
                  "
                >
                  01
                </p>

                <p
                  className="
                    mt-2
                    text-2xl
                    font-semibold
                  "
                >
                  {t(
                    "Calidad",
                    "Quality"
                  )}
                </p>

              </div>

              <div
                className="
                  text-right
                "
              >

                <p
                  className="
                    text-4xl
                    font-bold
                  "
                >
                  {
                    qualitySafety
                      .quality
                      .count
                  }
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    text-slate-500
                  "
                >
                  {t(
                    "Procedimientos",
                    "Procedures"
                  )}
                </p>

              </div>

            </div>

            {activeCategory ===
              "quality" && (
              <motion.div
                layoutId="quality-safety-active"
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  w-full
                  bg-blue-500
                "
              />
            )}

          </button>

          {/* SEGURIDAD */}
          <button
            type="button"
            onClick={() =>
              setActiveCategory(
                "safety"
              )
            }
            className={`
              relative
              cursor-pointer
              border-0
              bg-transparent
              px-6
              py-7
              text-left
              transition

              ${
                activeCategory ===
                "safety"
                  ? "text-white"
                  : `
                    text-slate-500
                    hover:text-white
                  `
              }
            `}
          >

            <div
              className="
                flex
                items-center
                justify-between
                gap-6
              "
            >

              <div>

                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.3em]
                    text-blue-400
                  "
                >
                  02
                </p>

                <p
                  className="
                    mt-2
                    text-2xl
                    font-semibold
                  "
                >
                  {t(
                    "Seguridad",
                    "Safety"
                  )}
                </p>

              </div>

              <div
                className="
                  text-right
                "
              >

                <p
                  className="
                    text-4xl
                    font-bold
                  "
                >
                  {
                    qualitySafety
                      .safety
                      .count
                  }
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    text-slate-500
                  "
                >
                  {t(
                    "Procedimientos",
                    "Procedures"
                  )}
                </p>

              </div>

            </div>

            {activeCategory ===
              "safety" && (
              <motion.div
                layoutId="quality-safety-active"
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  w-full
                  bg-blue-500
                "
              />
            )}

          </button>

        </div>

        {/* ==================================
            CONTENIDO
        ================================== */}

        <AnimatePresence
          mode="wait"
        >

          <motion.div
            key={
              activeCategory +
              language
            }
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
            className="
              grid
              gap-14
              pt-12
              lg:grid-cols-[1fr_0.8fr]
            "
          >

            {/* ==================================
                LISTA
            ================================== */}

            <div>

              <div
                className="
                  mb-8
                "
              >

                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.3em]
                    text-blue-400
                  "
                >
                  {
                    category.eyebrow[
                      language
                    ]
                  }
                </p>

                <h3
                  className="
                    mt-4
                    text-3xl
                    font-bold
                    tracking-tight
                    sm:text-4xl
                  "
                >
                  {
                    category.title[
                      language
                    ]
                  }
                </h3>

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
                    category.description[
                      language
                    ]
                  }
                </p>

              </div>

              {/* PROCEDIMIENTOS */}
              <div
                className="
                  grid
                  sm:grid-cols-2
                "
              >

                {category.items.map(
                  (
                    item,
                    index
                  ) => {
                    const isActive =
                      index ===
                      activeItemIndex

                    return (
                      <button
                        key={
                          item.code
                        }
                        type="button"
                        onClick={() =>
                          setActiveItemIndex(
                            index
                          )
                        }
                        className={`
                          group
                          relative
                          cursor-pointer
                          border-0
                          border-b
                          border-white/10
                          bg-transparent
                          px-0
                          py-5
                          text-left
                          transition

                          sm:odd:pr-6
                          sm:even:pl-6

                          ${
                            isActive
                              ? "text-white"
                              : `
                                text-slate-500
                                hover:text-white
                              `
                          }
                        `}
                      >

                        <div
                          className="
                            flex
                            items-start
                            gap-4
                          "
                        >

                          <span
                            className={`
                              mt-1
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              text-[10px]
                              font-semibold
                              transition

                              ${
                                isActive
                                  ? `
                                    border-blue-500
                                    bg-blue-500
                                    text-white
                                  `
                                  : `
                                    border-white/15
                                    text-slate-500
                                  `
                              }
                            `}
                          >
                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <div
                            className="
                              min-w-0
                            "
                          >

                            <p
                              className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-blue-400
                              "
                            >
                              {
                                item.code
                              }
                            </p>

                            <p
                              className="
                                mt-2
                                text-sm
                                font-medium
                                leading-6
                              "
                            >
                              {
                                item.title[
                                  language
                                ]
                              }
                            </p>

                          </div>

                        </div>

                      </button>
                    )
                  }
                )}

              </div>

            </div>

            {/* ==================================
                PROCEDIMIENTO ACTIVO
            ================================== */}

            <div
              className="
                lg:pl-8
              "
            >

              <div
                className="
                  sticky
                  top-24
                "
              >

                <AnimatePresence
                  mode="wait"
                >

                  <motion.div
                    key={
                      activeItem.code +
                      language
                    }
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -20,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="
                      relative
                      overflow-hidden
                      border
                      border-white/15
                      bg-white/[0.03]
                      p-8
                      sm:p-10
                    "
                  >

                    {/* NÚMERO DECORATIVO */}
                    <span
                      className="
                        absolute
                        -right-4
                        -top-8
                        text-[9rem]
                        font-bold
                        leading-none
                        text-white/[0.025]
                      "
                    >
                      {String(
                        activeItemIndex +
                          1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    {/* ICONO */}
                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-blue-500/30
                        bg-blue-500/10
                        text-blue-400
                      "
                    >

                      {activeCategory ===
                      "quality" ? (
                        <CheckCircle2
                          size={25}
                        />
                      ) : (
                        <ShieldCheck
                          size={26}
                        />
                      )}

                    </div>

                    <p
                      className="
                        mt-10
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.3em]
                        text-blue-400
                      "
                    >
                      {
                        activeItem.code
                      }
                    </p>

                    <h4
                      className="
                        mt-4
                        max-w-lg
                        text-3xl
                        font-bold
                        leading-tight
                        sm:text-4xl
                      "
                    >
                      {
                        activeItem.title[
                          language
                        ]
                      }
                    </h4>

                    <div
                      className="
                        mt-10
                        border-t
                        border-white/15
                        pt-7
                      "
                    >

                      <p
                        className="
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.25em]
                          text-slate-600
                        "
                      >
                        {t(
                          "Tipo de documento",
                          "Document type"
                        )}
                      </p>

                      <p
                        className="
                          mt-2
                          text-sm
                          text-slate-300
                        "
                      >
                        {t(
                          "Procedimiento operativo documentado",
                          "Documented operating procedure"
                        )}
                      </p>

                    </div>

                    <div
                      className="
                        mt-7
                        flex
                        items-center
                        justify-between
                        gap-4
                        border-t
                        border-white/15
                        pt-7
                      "
                    >

                      <p
                        className="
                          text-xs
                          uppercase
                          tracking-[0.2em]
                          text-slate-500
                        "
                      >
                        {
                          category.label[
                            language
                          ]
                        }
                      </p>

                      <p
                        className="
                          text-xs
                          tracking-[0.2em]
                          text-slate-600
                        "
                      >
                        {String(
                          activeItemIndex +
                            1
                        ).padStart(
                          2,
                          "0"
                        )}

                        {" / "}

                        {String(
                          category.items
                            .length
                        ).padStart(
                          2,
                          "0"
                        )}
                      </p>

                    </div>

                  </motion.div>

                </AnimatePresence>

              </div>

            </div>

          </motion.div>

        </AnimatePresence>

      </div>
    </section>
  )
}

export default QualitySafety