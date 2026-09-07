import {
  capabilities,
} from "../../data/capabilities"

import AnimatedCounter from "../ui/AnimatedCounter"

import {
  useLanguage,
} from "../../context/LanguageContext"

function Capabilities() {
  const {
    language,
    t,
  } = useLanguage()

  return (
    <section
      id="capacidades"
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

        {/* ENCABEZADO */}
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
                "Capacidad industrial",
                "Industrial capabilities"
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
                  Infraestructura
                  <br />
                  que responde.
                </>,
                <>
                  Infrastructure
                  <br />
                  that delivers.
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
                "Instalaciones y capacidad productiva diseñadas para atender proyectos industriales de diferentes escalas y requerimientos.",
                "Facilities and production capacity designed to support industrial projects of different scales and requirements."
              )}
            </p>
          </div>

        </div>

        {/* NÚMEROS */}
        <div
          className="
            grid
            sm:grid-cols-2
            lg:grid-cols-5
          "
        >

          {capabilities.map(
            (item, index) => (
              <div
                key={
                  item.label[
                    language
                  ]
                }
                className="
                  flex
                  min-h-[340px]
                  flex-col
                  border-b
                  border-white/15
                  py-10

                  sm:border-r
                  sm:px-7

                  lg:border-b-0

                  first:pl-0
                  last:border-r-0
                "
              >

                {/* VALOR */}
                <div
                  className="
                    flex
                    items-baseline
                    gap-2
                    whitespace-nowrap
                  "
                >
                  <span
                    className="
                      text-[clamp(2.7rem,3.4vw,4rem)]
                      font-bold
                      tracking-tight
                    "
                  >
                    <AnimatedCounter
                      value={
                        item.value
                      }
                    />
                  </span>

                  {
                    item.suffix[
                      language
                    ] && (
                      <span
                        className="
                          text-base
                          font-semibold
                          text-blue-400
                          lg:text-lg
                          xl:text-xl
                        "
                      >
                        {
                          item.suffix[
                            language
                          ]
                        }
                      </span>
                    )
                  }

                </div>

                {/* DESCRIPCIÓN */}
                <p
                  className="
                    mt-6
                    min-h-[52px]
                    text-sm
                    leading-6
                    text-slate-400
                  "
                >
                  {
                    item.label[
                      language
                    ]
                  }
                </p>

                <div className="flex-1" />

                <p
                  className="
                    mt-8
                    text-xs
                    tracking-[0.25em]
                    text-slate-600
                  "
                >
                  0{index + 1}
                </p>

              </div>
            )
          )}

        </div>

      </div>
    </section>
  )
}

export default Capabilities