import {
  useState,
} from "react"

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react"

import {
  equipment,
} from "../../data/equipment"

import {
  useLanguage,
} from "../../context/LanguageContext"

function EquipmentRentalPreview() {
  const [currentIndex, setCurrentIndex] =
    useState(0)

  const {
    language,
    t,
  } = useLanguage()

  const currentEquipment =
    equipment[currentIndex]

  const nextEquipment = () => {
    setCurrentIndex(
      (current) =>
        current ===
        equipment.length - 1
          ? 0
          : current + 1
    )
  }

  const previousEquipment = () => {
    setCurrentIndex(
      (current) =>
        current === 0
          ? equipment.length - 1
          : current - 1
    )
  }

  return (
    <section
      id="renta"
      className="
        bg-slate-950
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
                "Renta de equipos",
                "Equipment rental"
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
                  Equipo listo
                  <br />
                  para tu proyecto.
                </>,
                <>
                  Equipment ready
                  <br />
                  for your project.
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
                "Consulta nuestra disponibilidad de equipos para trabajos industriales, mantenimiento, fabricación y ejecución de proyectos.",
                "Check the availability of equipment for industrial work, maintenance, fabrication and project execution."
              )}
            </p>
          </div>

        </div>

        {/* CARRUSEL */}
        <div
          className="
            grid
            gap-12
            pt-12
            lg:grid-cols-[1.15fr_0.85fr]
          "
        >

          {/* IMAGEN */}
          <div>

            <div
              className="
                relative
                aspect-[16/10]
                overflow-hidden
                bg-slate-900
              "
            >

              {currentEquipment.image ? (
                <img
                  key={
                    currentEquipment.id
                  }
                  src={
                    currentEquipment.image
                  }
                  alt={
                    currentEquipment.name[
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
                    items-center
                    justify-center
                  "
                >
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.3em]
                      text-slate-600
                    "
                  >
                    {t(
                      "Fotografía del equipo",
                      "Equipment photo"
                    )}
                  </p>
                </div>
              )}

              <div
                className="
                  absolute
                  left-6
                  top-6
                  bg-slate-950/80
                  px-4
                  py-2
                  backdrop-blur
                "
              >
                <span
                  className="
                    text-xs
                    tracking-[0.25em]
                    text-white
                  "
                >
                  {String(
                    currentIndex + 1
                  ).padStart(
                    2,
                    "0"
                  )}
                  {" / "}
                  {String(
                    equipment.length
                  ).padStart(
                    2,
                    "0"
                  )}
                </span>
              </div>

            </div>

            {/* CONTROLES */}
            <div
              className="
                mt-5
                flex
                items-center
                justify-between
              "
            >

              <div className="flex gap-2">

                <button
                  type="button"
                  onClick={
                    previousEquipment
                  }
                  aria-label={t(
                    "Equipo anterior",
                    "Previous equipment"
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

                    hover:border-blue-400
                    hover:bg-blue-600
                  "
                >
                  <ArrowLeft
                    size={20}
                  />
                </button>

                <button
                  type="button"
                  onClick={
                    nextEquipment
                  }
                  aria-label={t(
                    "Equipo siguiente",
                    "Next equipment"
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

                    hover:border-blue-400
                    hover:bg-blue-600
                  "
                >
                  <ArrowRight
                    size={20}
                  />
                </button>

              </div>

              {/* INDICADORES */}
              <div
                className="
                  hidden
                  items-center
                  gap-2
                  sm:flex
                "
              >
                {equipment.map(
                  (item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setCurrentIndex(
                          index
                        )
                      }
                      aria-label={
                        item.name[
                          language
                        ]
                      }
                      className={`
                        h-1
                        cursor-pointer
                        border-0
                        transition-all
                        duration-300

                        ${
                          index ===
                          currentIndex
                            ? `
                              w-10
                              bg-blue-500
                            `
                            : `
                              w-5
                              bg-white/20
                            `
                        }
                      `}
                    />
                  )
                )}
              </div>

            </div>

          </div>

          {/* INFORMACIÓN */}
          <div
            className="
              flex
              flex-col
              justify-center
              lg:pl-8
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
                currentEquipment.category[
                  language
                ]
              }
            </p>

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
                currentEquipment.name[
                  language
                ]
              }
            </h3>

            <p
              className="
                mt-7
                max-w-lg
                text-base
                leading-7
                text-slate-400
              "
            >
              {
                currentEquipment.description[
                  language
                ]
              }
            </p>

            {/* SPECS */}
            <div
              className="
                mt-10
                border-t
                border-white/15
              "
            >

              <div
                className="
                  grid
                  grid-cols-2
                  border-b
                  border-white/15
                  py-5
                "
              >
                <p className="text-sm text-slate-500">
                  {t(
                    "Categoría",
                    "Category"
                  )}
                </p>

                <p
                  className="
                    text-right
                    text-sm
                    font-medium
                  "
                >
                  {
                    currentEquipment.category[
                      language
                    ]
                  }
                </p>
              </div>

              <div
                className="
                  grid
                  grid-cols-2
                  border-b
                  border-white/15
                  py-5
                "
              >
                <p className="text-sm text-slate-500">
                  {t(
                    "Capacidad",
                    "Capacity"
                  )}
                </p>

                <p
                  className="
                    text-right
                    text-sm
                    font-medium
                  "
                >
                  {
                    currentEquipment.capacity[
                      language
                    ]
                  }
                </p>
              </div>

              <div
                className="
                  grid
                  grid-cols-2
                  border-b
                  border-white/15
                  py-5
                "
              >
                <p className="text-sm text-slate-500">
                  {t(
                    "Disponibilidad",
                    "Availability"
                  )}
                </p>

                <p
                  className="
                    text-right
                    text-sm
                    font-medium
                    text-blue-400
                  "
                >
                  {
                    currentEquipment.availability[
                      language
                    ]
                  }
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById(
                    "contacto"
                  )
                  ?.scrollIntoView({
                    behavior:
                      "smooth",
                  })
              }}
              className="
                group
                mt-9
                inline-flex
                w-fit
                cursor-pointer
                items-center
                gap-3
                border-0
                bg-blue-600
                px-6
                py-4
                text-sm
                font-semibold
                text-white
                transition

                hover:bg-blue-500
              "
            >
              {t(
                "Solicitar disponibilidad",
                "Request availability"
              )}

              <ArrowUpRight
                size={18}
                className="
                  transition-transform
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </button>

          </div>

        </div>

      </div>
    </section>
  )
}

export default EquipmentRentalPreview