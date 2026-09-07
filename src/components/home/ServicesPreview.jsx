import {
  useState,
} from "react"

import {
  ArrowUpRight,
} from "lucide-react"

import {
  services,
} from "../../data/services"

import {
  useLanguage,
} from "../../context/LanguageContext"

function ServicesPreview() {
  const [activeServiceId, setActiveServiceId] =
    useState(services[0].id)

  const {
    language,
    t,
  } = useLanguage()

  const activeService =
    services.find(
      (service) =>
        service.id ===
        activeServiceId
    ) || services[0]

  return (
    <section
      id="servicios"
      className="
        bg-white
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

        {/* HEADER */}
        <div
          className="
            grid
            gap-10
            border-b
            border-slate-200
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
                text-blue-600
              "
            >
              {t(
                "Servicios",
                "Services"
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
                  Soluciones para
                  <br />
                  cada etapa.
                </>,
                <>
                  Solutions for
                  <br />
                  every stage.
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
                text-slate-600
                lg:text-lg
              "
            >
              {t(
                "Capacidad técnica y operativa para responder a diferentes necesidades dentro de proyectos industriales.",
                "Technical and operational capabilities to address different needs throughout industrial projects."
              )}
            </p>
          </div>

        </div>

        {/* CONTENIDO */}
        <div
          className="
            grid
            gap-14
            pt-10
            lg:grid-cols-[1fr_0.9fr]
          "
        >

          {/* SERVICIOS */}
          <div>
            {services.map(
              (service) => {
                const isActive =
                  activeService.id ===
                  service.id

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() =>
                      setActiveServiceId(
                        service.id
                      )
                    }
                    onMouseEnter={() =>
                      setActiveServiceId(
                        service.id
                      )
                    }
                    className={`
                      grid
                      w-full
                      cursor-pointer
                      grid-cols-[48px_1fr_auto]
                      items-center
                      gap-4
                      border-0
                      border-b
                      border-slate-200
                      bg-transparent
                      py-7
                      text-left
                      transition

                      ${
                        isActive
                          ? "text-blue-600"
                          : "text-slate-950"
                      }
                    `}
                  >

                    <span
                      className="
                        text-xs
                        font-semibold
                        tracking-[0.2em]
                        text-slate-400
                      "
                    >
                      {service.number}
                    </span>

                    <span
                      className="
                        text-xl
                        font-semibold
                        sm:text-2xl
                      "
                    >
                      {
                        service.title[
                          language
                        ]
                      }
                    </span>

                    <ArrowUpRight
                      size={22}
                      className={
                        isActive
                          ? `
                            translate-x-1
                            -translate-y-1
                            text-blue-600
                            transition
                          `
                          : `
                            text-slate-400
                            transition
                          `
                      }
                    />

                  </button>
                )
              }
            )}
          </div>

          {/* ACTIVO */}
          <div className="lg:pl-10">

            <div className="sticky top-24">

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-blue-600
                "
              >
                {activeService.number}
                {" / "}
                {t(
                  "Servicio",
                  "Service"
                )}
              </p>

              <h3
                className="
                  mt-5
                  text-3xl
                  font-bold
                  tracking-tight
                  sm:text-4xl
                "
              >
                {
                  activeService.title[
                    language
                  ]
                }
              </h3>

              {/* FOTO */}
              <div
                className="
                  mt-8
                  aspect-[16/10]
                  overflow-hidden
                  bg-slate-100
                "
              >
                <img
                  key={
                    activeService.id
                  }
                  src={
                    activeService.image
                  }
                  alt={
                    activeService.title[
                      language
                    ]
                  }
                  className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-500
                  "
                />
              </div>

              <p
                className="
                  mt-7
                  max-w-xl
                  text-base
                  leading-7
                  text-slate-600
                "
              >
                {
                  activeService.description[
                    language
                  ]
                }
              </p>

              {/* FEATURES */}
              <div
                className="
                  mt-7
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {
                  activeService.features[
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
                          text-xs
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

              <a
                href="/servicios"
                className="
                  mt-9
                  inline-flex
                  items-center
                  gap-3
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-blue-600
                "
              >
                {t(
                  "Ver servicio",
                  "View service"
                )}

                <ArrowUpRight
                  size={18}
                />
              </a>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default ServicesPreview