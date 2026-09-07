import { useState } from "react"

import {
  ArrowUpRight,
} from "lucide-react"

import {
  companies,
} from "../../data/companies"

import {
  useLanguage,
} from "../../context/LanguageContext"

function Companies() {
  const [activeCompanyId, setActiveCompanyId] =
    useState(companies[0].id)

  const {
    language,
    t,
  } = useLanguage()

  const activeCompany =
    companies.find(
      (company) =>
        company.id === activeCompanyId
    ) || companies[0]

  return (
    <section
      id="empresas"
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

        {/* ENCABEZADO */}
        <div
          className="
            grid
            gap-8
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
                "Nuestro grupo",
                "Our group"
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
                  Un grupo.
                  <br />
                  Múltiples capacidades.
                </>,
                <>
                  One group.
                  <br />
                  Multiple capabilities.
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
                text-slate-600
                lg:text-lg
              "
            >
              {t(
                "Grupo Industrial DOXA integra empresas especializadas para responder a diferentes necesidades de la industria mediante ingeniería, fabricación, mantenimiento y servicios industriales.",
                "Grupo Industrial DOXA brings together specialized companies to address different industrial needs through engineering, fabrication, maintenance and industrial services."
              )}
            </p>
          </div>

        </div>

        {/* CONTENIDO */}
        <div
          className="
            grid
            gap-12
            pt-10
            lg:grid-cols-[1fr_0.85fr]
          "
        >

          {/* EMPRESAS */}
          <div>
            {companies.map(
              (company) => {
                const isActive =
                  activeCompany.id ===
                  company.id

                return (
                  <button
                    key={company.id}
                    type="button"
                    onClick={() =>
                      setActiveCompanyId(
                        company.id
                      )
                    }
                    onMouseEnter={() =>
                      setActiveCompanyId(
                        company.id
                      )
                    }
                    className={`
                      group
                      grid
                      w-full
                      cursor-pointer
                      grid-cols-[50px_1fr_auto]
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
                      {company.number}
                    </span>

                    <span
                      className="
                        text-lg
                        font-semibold
                        sm:text-2xl
                      "
                    >
                      {
                        company.name[
                          language
                        ]
                      }
                    </span>

                    <ArrowUpRight
                      size={22}
                      className={`
                        transition-transform
                        duration-300

                        ${
                          isActive
                            ? `
                              translate-x-1
                              -translate-y-1
                              text-blue-600
                            `
                            : "text-slate-400"
                        }
                      `}
                    />

                  </button>
                )
              }
            )}
          </div>

          {/* EMPRESA ACTIVA */}
          <div className="lg:pl-10">

            <div className="sticky top-24">

              <p
                className="
                  text-xs
                  font-semibold
                  tracking-[0.25em]
                  text-blue-600
                "
              >
                {activeCompany.number}
                {" / "}
                {activeCompany.shortName}
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
                  activeCompany.name[
                    language
                  ]
                }
              </h3>

              <p
                className="
                  mt-4
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-slate-400
                "
              >
                {
                  activeCompany.category[
                    language
                  ]
                }
              </p>

              {/* LOGO / IMAGEN */}
              <div
                className="
                  mt-8
                  flex
                  aspect-[16/9]
                  items-center
                  justify-center
                  overflow-hidden
                "
              >
                <img
                  key={
                    activeCompany.id
                  }
                  src={
                    activeCompany.image
                  }
                  alt={
                    activeCompany.name[
                      language
                    ]
                  }
                  className="
                    h-[90%]
                    w-[90%]
                    object-contain
                    transition
                    duration-500
                  "
                />
              </div>

              <p
                className="
                  mt-7
                  max-w-lg
                  text-base
                  leading-7
                  text-slate-600
                "
              >
                {
                  activeCompany.description[
                    language
                  ]
                }
              </p>

              <a
                href={
                  activeCompany.href
                }
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-3
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-blue-600
                "
              >
                {t(
                  "Conocer empresa",
                  "Explore company"
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

export default Companies