import {
  useState,
} from "react"

import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react"

import {
  AnimatePresence,
  motion,
} from "motion/react"

import {
  workshops,
  workshopSummary,
} from "../../data/workshops"

import {
  useLanguage,
} from "../../context/LanguageContext"

function InfrastructurePreview() {
  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0)

  const [
    activeImageIndex,
    setActiveImageIndex,
  ] = useState(0)

  const {
    language,
    t,
  } = useLanguage()

  const activeWorkshop =
    workshops[activeIndex]

  /*
    Si por alguna razón el índice de
    fotografía no existe, utiliza
    automáticamente la primera.
  */
  const activeImage =
    activeWorkshop.images[
      activeImageIndex
    ] ??
    activeWorkshop.images[0]

  /*
    CAMBIAR DE TALLER

    Siempre reinicia la galería
    en la primera fotografía.
  */
  const changeWorkshop = (
    index
  ) => {
    setActiveImageIndex(0)

    setActiveIndex(index)
  }

  /*
    SIGUIENTE TALLER
  */
  const nextWorkshop = () => {
    const nextIndex =
      activeIndex ===
      workshops.length - 1
        ? 0
        : activeIndex + 1

    changeWorkshop(
      nextIndex
    )
  }

  /*
    TALLER ANTERIOR
  */
  const previousWorkshop = () => {
    const previousIndex =
      activeIndex === 0
        ? workshops.length - 1
        : activeIndex - 1

    changeWorkshop(
      previousIndex
    )
  }

  /*
    SIGUIENTE FOTO
  */
  const nextImage = () => {
    setActiveImageIndex(
      (current) =>
        current ===
        activeWorkshop.images.length - 1
          ? 0
          : current + 1
    )
  }

  /*
    FOTO ANTERIOR
  */
  const previousImage = () => {
    setActiveImageIndex(
      (current) =>
        current === 0
          ? activeWorkshop.images.length - 1
          : current - 1
    )
  }

  return (
    <section
      id="infraestructura"
      className="
        bg-slate-50
        py-24
        text-slate-950
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

        {/* ======================================
            ENCABEZADO
        ====================================== */}

        <div
          className="
            grid
            gap-10
            border-b
            border-slate-200
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
                text-blue-600
              "
            >
              {t(
                "Tecnología e infraestructura",
                "Technology & infrastructure"
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
                  Espacios preparados
                  <br />
                  para producir.
                </>,

                <>
                  Facilities built
                  <br />
                  to deliver.
                </>
              )}
            </h2>

          </div>

          {/* RESUMEN */}
          <div
            className="
              grid
              grid-cols-2
              items-end
              gap-6
            "
          >

            {/* TALLERES */}
            <div>

              <p
                className="
                  text-4xl
                  font-bold
                  tracking-tight
                  sm:text-5xl
                "
              >
                {
                  workshopSummary.workshops
                }
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  text-slate-500
                "
              >
                {t(
                  "Talleres industriales",
                  "Industrial workshops"
                )}
              </p>

            </div>

            {/* SUPERFICIE */}
            <div>

              <p
                className="
                  text-4xl
                  font-bold
                  tracking-tight
                  sm:text-5xl
                "
              >
                {
                  workshopSummary.totalArea.toLocaleString(
                    "en-US"
                  )
                }

                <span
                  className="
                    ml-2
                    text-xl
                    font-semibold
                    text-blue-600
                  "
                >
                  m²
                </span>

              </p>

              <p
                className="
                  mt-2
                  text-sm
                  text-slate-500
                "
              >
                {t(
                  "Superficie total",
                  "Total area"
                )}
              </p>

            </div>

          </div>

        </div>

        {/* ======================================
            3 TALLERES
        ====================================== */}

        <div
          className="
            grid
            border-b
            border-slate-200
            md:grid-cols-3
          "
        >

          {workshops.map(
            (
              workshop,
              index
            ) => {
              const isActive =
                index ===
                activeIndex

              return (
                <button
                  key={
                    workshop.id
                  }
                  type="button"
                  onClick={() =>
                    changeWorkshop(
                      index
                    )
                  }
                  className={`
                    relative
                    cursor-pointer
                    border-0
                    border-b
                    border-slate-200
                    bg-transparent
                    px-5
                    py-7
                    text-left
                    transition

                    md:border-b-0
                    md:border-r

                    last:border-r-0

                    ${
                      isActive
                        ? "text-blue-600"
                        : `
                          text-slate-500
                          hover:text-slate-950
                        `
                    }
                  `}
                >

                  {/* NÚMERO */}
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      tracking-[0.25em]
                      text-slate-400
                    "
                  >
                    {
                      workshop.number
                    }
                  </p>

                  {/* TALLER */}
                  <p
                    className="
                      mt-2
                      text-lg
                      font-semibold
                    "
                  >
                    {
                      workshop.workshop[
                        language
                      ]
                    }
                  </p>

                  {/* TIPO */}
                  <p
                    className="
                      mt-1
                      text-xs
                      text-slate-400
                    "
                  >
                    {
                      workshop.title[
                        language
                      ]
                    }
                  </p>

                  {/* INDICADOR ACTIVO */}
                  {isActive && (
                    <motion.div
                      layoutId="workshop-active"
                      className="
                        absolute
                        bottom-0
                        left-0
                        h-[2px]
                        w-full
                        bg-blue-600
                      "
                    />
                  )}

                </button>
              )
            }
          )}

        </div>

        {/* ======================================
            CONTENIDO
        ====================================== */}

        <AnimatePresence
          mode="wait"
        >

          <motion.div
            key={
              activeWorkshop.id +
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
              gap-12
              pt-12

              lg:grid-cols-[1.2fr_0.8fr]
            "
          >

            {/* ======================================
                GALERÍA
            ====================================== */}

            <div>

              <div
                className="
                  relative
                  aspect-[16/10]
                  overflow-hidden
                  bg-[#020817]
                "
              >

                <AnimatePresence
                  mode="wait"
                >

                  <motion.img
                    key={
                      activeWorkshop.id +
                      "-" +
                      activeImageIndex
                    }

                    src={
                      activeImage.src
                    }

                    alt={
                      activeImage.label[
                        language
                      ]
                    }

                    initial={{
                      opacity: 0,
                      scale: 1.02,
                    }}

                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}

                    exit={{
                      opacity: 0,
                      scale: 0.98,
                    }}

                    transition={{
                      duration: 0.35,
                    }}

                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                    "
                  />

                </AnimatePresence>

                {/* GRADIENTE */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/50
                    via-transparent
                    to-transparent
                  "
                />

                {/* TALLER */}
                <div
                  className="
                    absolute
                    left-6
                    top-6
                    bg-[#020817]/85
                    px-4
                    py-2
                    backdrop-blur
                  "
                >
                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.25em]
                      text-white
                    "
                  >
                    {
                      activeWorkshop.workshop[
                        language
                      ]
                    }
                  </p>
                </div>

                {/* NOMBRE FOTO */}
                <div
                  className="
                    absolute
                    bottom-6
                    left-6
                  "
                >
                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-white
                    "
                  >
                    {
                      activeImage.label[
                        language
                      ]
                    }
                  </p>
                </div>

                {/* CONTADOR */}
                {activeWorkshop.images.length > 1 && (
                  <div
                    className="
                      absolute
                      bottom-6
                      right-6
                      bg-[#020817]/80
                      px-4
                      py-2
                      backdrop-blur
                    "
                  >
                    <p
                      className="
                        text-xs
                        tracking-[0.22em]
                        text-white
                      "
                    >
                      {String(
                        activeImageIndex +
                          1
                      ).padStart(
                        2,
                        "0"
                      )}

                      {" / "}

                      {String(
                        activeWorkshop
                          .images
                          .length
                      ).padStart(
                        2,
                        "0"
                      )}
                    </p>
                  </div>
                )}

                {/* FLECHAS GALERÍA */}
                {activeWorkshop.images.length > 1 && (
                  <>
                    <button
                      type="button"

                      onClick={
                        previousImage
                      }

                      aria-label={t(
                        "Fotografía anterior",
                        "Previous photo"
                      )}

                      className="
                        absolute
                        left-5
                        top-1/2

                        flex
                        h-11
                        w-11

                        -translate-y-1/2

                        cursor-pointer
                        items-center
                        justify-center

                        rounded-full

                        border
                        border-white/25

                        bg-black/35

                        text-white

                        backdrop-blur

                        transition

                        hover:bg-blue-600
                      "
                    >
                      <ArrowLeft
                        size={18}
                      />
                    </button>

                    <button
                      type="button"

                      onClick={
                        nextImage
                      }

                      aria-label={t(
                        "Siguiente fotografía",
                        "Next photo"
                      )}

                      className="
                        absolute
                        right-5
                        top-1/2

                        flex
                        h-11
                        w-11

                        -translate-y-1/2

                        cursor-pointer
                        items-center
                        justify-center

                        rounded-full

                        border
                        border-white/25

                        bg-black/35

                        text-white

                        backdrop-blur

                        transition

                        hover:bg-blue-600
                      "
                    >
                      <ArrowRight
                        size={18}
                      />
                    </button>
                  </>
                )}

              </div>

              {/* ======================================
                  SELECTOR DE FOTOS
              ====================================== */}

              {activeWorkshop.images.length > 1 && (
                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    gap-2
                  "
                >

                  {activeWorkshop.images.map(
                    (
                      image,
                      index
                    ) => {
                      const isActive =
                        index ===
                        activeImageIndex

                      return (
                        <button
                          key={
                            `${activeWorkshop.id}-${index}`
                          }

                          type="button"

                          onClick={() =>
                            setActiveImageIndex(
                              index
                            )
                          }

                          className={`
                            cursor-pointer
                            border

                            px-4
                            py-2.5

                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.12em]

                            transition

                            ${
                              isActive
                                ? `
                                  border-blue-600
                                  bg-blue-600
                                  text-white
                                `
                                : `
                                  border-slate-300
                                  bg-transparent
                                  text-slate-500

                                  hover:border-slate-500
                                  hover:text-slate-950
                                `
                            }
                          `}
                        >
                          {
                            image.label[
                              language
                            ]
                          }
                        </button>
                      )
                    }
                  )}

                </div>
              )}

              {/* ======================================
                  FLECHAS PARA CAMBIAR TALLER
              ====================================== */}

              <div
                className="
                  mt-6
                  flex
                  items-center
                  justify-between
                "
              >

                <div className="flex gap-2">

                  <button
                    type="button"

                    onClick={
                      previousWorkshop
                    }

                    aria-label={t(
                      "Taller anterior",
                      "Previous workshop"
                    )}

                    className="
                      flex
                      h-12
                      w-12

                      cursor-pointer

                      items-center
                      justify-center

                      border
                      border-slate-300

                      bg-transparent

                      transition

                      hover:border-blue-600
                      hover:bg-blue-600
                      hover:text-white
                    "
                  >
                    <ArrowLeft
                      size={19}
                    />
                  </button>

                  <button
                    type="button"

                    onClick={
                      nextWorkshop
                    }

                    aria-label={t(
                      "Siguiente taller",
                      "Next workshop"
                    )}

                    className="
                      flex
                      h-12
                      w-12

                      cursor-pointer

                      items-center
                      justify-center

                      border
                      border-slate-300

                      bg-transparent

                      transition

                      hover:border-blue-600
                      hover:bg-blue-600
                      hover:text-white
                    "
                  >
                    <ArrowRight
                      size={19}
                    />
                  </button>

                </div>

                <p
                  className="
                    text-xs
                    tracking-[0.25em]
                    text-slate-400
                  "
                >
                  {String(
                    activeIndex + 1
                  ).padStart(
                    2,
                    "0"
                  )}

                  {" / "}

                  {String(
                    workshops.length
                  ).padStart(
                    2,
                    "0"
                  )}
                </p>

              </div>

            </div>

            {/* ======================================
                INFORMACIÓN
            ====================================== */}

            <div
              className="
                flex
                flex-col
                justify-center
              "
            >

              {/* IDENTIFICADOR */}
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-blue-600
                "
              >
                {
                  activeWorkshop.number
                }

                {" / "}

                {
                  activeWorkshop.workshop[
                    language
                  ]
                }
              </p>

              {/* TÍTULO */}
              <h3
                className="
                  mt-5
                  text-3xl
                  font-bold
                  tracking-tight

                  sm:text-4xl
                  lg:text-5xl
                "
              >
                {
                  activeWorkshop.title[
                    language
                  ]
                }
              </h3>

              {/* DESCRIPCIÓN */}
              <p
                className="
                  mt-6
                  max-w-lg

                  text-base
                  leading-7
                  text-slate-600
                "
              >
                {
                  activeWorkshop.description[
                    language
                  ]
                }
              </p>

              {/* ======================================
                  MÉTRICAS GENERALES
              ====================================== */}

              <div
                className="
                  mt-10
                  grid
                  gap-6

                  border-y
                  border-slate-200

                  py-7

                  sm:grid-cols-2
                "
              >

                {/* PRINCIPAL */}
                <div>

                  <p
                    className="
                      text-4xl
                      font-bold
                    "
                  >
                    {
                      activeWorkshop
                        .mainStat
                        .value
                    }

                    <span
                      className="
                        ml-2
                        text-lg
                        font-semibold
                        text-blue-600
                      "
                    >
                      {
                        activeWorkshop
                          .mainStat
                          .unit
                      }
                    </span>
                  </p>

                  <p
                    className="
                      mt-2
                      text-sm
                      text-slate-500
                    "
                  >
                    {
                      activeWorkshop
                        .mainStat
                        .label[
                        language
                      ]
                    }
                  </p>

                </div>

                {/* SECUNDARIA */}
                {
                  activeWorkshop.secondaryStat && (
                    <div>

                      <p
                        className="
                          text-4xl
                          font-bold
                        "
                      >
                        {
                          activeWorkshop
                            .secondaryStat
                            .value
                        }

                        <span
                          className="
                            ml-2
                            text-lg
                            font-semibold
                            text-blue-600
                          "
                        >
                          {
                            activeWorkshop
                              .secondaryStat
                              .unit
                          }
                        </span>
                      </p>

                      <p
                        className="
                          mt-2
                          text-sm
                          text-slate-500
                        "
                      >
                        {
                          activeWorkshop
                            .secondaryStat
                            .label[
                            language
                          ]
                        }
                      </p>

                    </div>
                  )
                }

              </div>

              {/* ======================================
                  ÁREAS INTERNAS

                  SOLO APARECE SI EL TALLER
                  TIENE SUBÁREAS.
              ====================================== */}

              {
                activeWorkshop.areas.length > 0 && (
                  <div
                    className="
                      mt-8
                    "
                  >

                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.25em]
                        text-slate-400
                      "
                    >
                      {t(
                        "Áreas especializadas",
                        "Specialized areas"
                      )}
                    </p>

                    <div
                      className="
                        mt-4
                        grid
                        gap-3
                        sm:grid-cols-2
                      "
                    >

                      {
                        activeWorkshop.areas.map(
                          (
                            area,
                            index
                          ) => (
                            <div
                              key={
                                index
                              }
                              className="
                                border
                                border-slate-200
                                p-4
                              "
                            >

                              <p
                                className="
                                  text-2xl
                                  font-bold
                                "
                              >
                                {
                                  area.value
                                }

                                <span
                                  className="
                                    ml-1
                                    text-sm
                                    font-semibold
                                    text-blue-600
                                  "
                                >
                                  {
                                    area.unit
                                  }
                                </span>
                              </p>

                              <p
                                className="
                                  mt-1
                                  text-xs
                                  text-slate-500
                                "
                              >
                                {
                                  area.label[
                                    language
                                  ]
                                }
                              </p>

                            </div>
                          )
                        )
                      }

                    </div>

                  </div>
                )
              }

              {/* ======================================
                  CAPACIDADES
              ====================================== */}

              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  gap-2
                "
              >

                {
                  activeWorkshop.features[
                    language
                  ].map(
                    (feature) => (
                      <span
                        key={
                          feature
                        }
                        className="
                          border
                          border-slate-200
                          px-4
                          py-2

                          text-[11px]
                          font-semibold
                          uppercase
                          tracking-[0.12em]

                          text-slate-500
                        "
                      >
                        {feature}
                      </span>
                    )
                  )
                }

              </div>

            </div>

          </motion.div>

        </AnimatePresence>

      </div>
    </section>
  )
}

export default InfrastructurePreview