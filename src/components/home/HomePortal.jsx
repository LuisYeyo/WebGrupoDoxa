import {
  ArrowUpRight,
} from "lucide-react"

import {
  useNavigate,
} from "react-router"

import {
  useLanguage,
} from "../../context/LanguageContext"

function HomePortal() {
  const navigate =
    useNavigate()

  const {
    t,
  } = useLanguage()

  const sections = [
    {
      number: "01",

      title: t(
        "Nuestro grupo",
        "Our group"
      ),

      description: t(
        "Conoce las empresas, capacidades y alcance de Grupo Industrial DOXA.",
        "Explore the companies, capabilities and scope of Grupo Industrial DOXA."
      ),

      path: "/grupo",
    },

    {
      number: "02",

      title: t(
        "Servicios",
        "Services"
      ),

      description: t(
        "Fabricación, mantenimiento, procesos, calidad y seguridad industrial.",
        "Fabrication, maintenance, processes, quality and industrial safety."
      ),

      path: "/servicios",
    },

    {
      number: "03",

      title: t(
        "Infraestructura",
        "Infrastructure"
      ),

      description: t(
        "Conoce nuestros talleres industriales y los equipos disponibles para renta.",
        "Explore our industrial workshops and equipment available for rental."
      ),

      path:
        "/infraestructura",
    },

    {
      number: "04",

      title: t(
        "Proyectos",
        "Projects"
      ),

      description: t(
        "Una selección de trabajos y soluciones desarrolladas para la industria.",
        "A selection of industrial projects and solutions delivered by our team."
      ),

      path:
        "/proyectos",
    },
  ]

  return (
    <section
      id="home-portal"
      className="
        bg-white
        py-20
        text-slate-950
        md:py-28
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-6
        "
      >

        <div
          className="
            grid
            gap-8
            border-b
            border-slate-200
            pb-12
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
                "Explora DOXA",
                "Explore DOXA"
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
                  Todo lo que
                  <br />
                  necesitas conocer.
                </>,
                <>
                  Everything you
                  <br />
                  need to know.
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
                "Accede directamente a la información que necesitas sin recorrer todo el sitio.",
                "Go directly to the information you need without scrolling through the entire website."
              )}
            </p>
          </div>

        </div>

        {/* PORTALES */}
        <div
          className="
            grid
            md:grid-cols-2
          "
        >

          {sections.map(
            (
              section,
              index
            ) => (
              <button
                key={
                  section.path
                }
                type="button"
                onClick={() =>
                  navigate(
                    section.path
                  )
                }
                className="
                  group
                  relative
                  min-h-[260px]
                  cursor-pointer
                  border-0
                  border-b
                  border-slate-200
                  bg-transparent
                  p-8
                  text-left
                  transition-colors
                  duration-300

                  hover:bg-slate-50

                  md:odd:border-r
                "
              >

                <div
                  className="
                    flex
                    h-full
                    flex-col
                  "
                >

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                    "
                  >

                    <p
                      className="
                        text-xs
                        font-semibold
                        tracking-[0.25em]
                        text-slate-400
                      "
                    >
                      {
                        section.number
                      }
                    </p>

                    <ArrowUpRight
                      size={23}
                      className="
                        text-slate-400
                        transition-all
                        duration-300

                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                        group-hover:text-blue-600
                      "
                    />

                  </div>

                  <div className="mt-auto">

                    <h3
                      className="
                        text-2xl
                        font-bold
                        tracking-tight
                        sm:text-3xl
                      "
                    >
                      {
                        section.title
                      }
                    </h3>

                    <p
                      className="
                        mt-4
                        max-w-md
                        text-sm
                        leading-6
                        text-slate-500
                      "
                    >
                      {
                        section.description
                      }
                    </p>

                  </div>

                </div>

              </button>
            )
          )}

        </div>

      </div>
    </section>
  )
}

export default HomePortal