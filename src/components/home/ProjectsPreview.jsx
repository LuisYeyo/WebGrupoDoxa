import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react"

import {
  useNavigate,
} from "react-router-dom"

import {
  projects,
} from "../../data/projects"

import {
  useLanguage,
} from "../../context/LanguageContext"


function ProjectsPreview() {
  const navigate =
    useNavigate()

  const {
    language,
    t,
  } = useLanguage()


  /*
    Solo usamos los proyectos marcados
    como destacados.

    Y mostramos máximo tres.
  */

  const featured =
    projects
      .filter(
        (project) =>
          project.featured
      )
      .slice(0, 3)


  return (
    <section
      className="
        bg-[#f7f9fc]
        py-24
        text-[#0b1830]
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


        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            flex-col
            gap-8
            border-b
            border-slate-200
            pb-12

            lg:flex-row
            lg:items-end
            lg:justify-between
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
                "Experiencia en campo",
                "Field experience"
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
                  Proyectos que
                  <br />
                  respaldan nuestro trabajo.
                </>,
                <>
                  Projects that
                  <br />
                  support our work.
                </>
              )}
            </h2>

          </div>


          {/* VER TODOS */}

          <button
            type="button"
            onClick={() =>
              navigate(
                "/proyectos"
              )
            }
            className="
              group
              flex
              w-fit
              cursor-pointer
              items-center
              gap-3
              border-0
              bg-transparent
              text-sm
              font-semibold
              text-blue-600
            "
          >

            {t(
              "Ver todos los proyectos",
              "View all projects"
            )}

            <ArrowRight
              size={18}
              className="
                transition-transform
                group-hover:translate-x-1
              "
            />

          </button>

        </div>


        {/* =================================================
            PROJECTS
        ================================================= */}

        <div
          className="
            mt-10
            grid
            gap-7
            lg:grid-cols-3
          "
        >

          {featured.map(
            (project) => (

              <button
                key={
                  project.slug
                }

                type="button"

                onClick={() =>
                  navigate(
                    `/proyectos/${project.slug}`
                  )
                }

                className="
                  group
                  cursor-pointer
                  border-0
                  bg-transparent
                  p-0
                  text-left
                "
              >


                <div
                  className="
                    relative
                    aspect-[4/3]
                    overflow-hidden
                    rounded-[22px]
                    bg-[#0a2547]
                  "
                >


                  {/* IMAGEN */}

                  <img
                    src={
                      project.image
                    }

                    alt={
                      project.title[
                        language
                      ]
                    }

                    className="
                      h-full
                      w-full
                      object-cover

                      transition-transform
                      duration-700

                      group-hover:scale-[1.025]
                    "
                  />


                  {/* GRADIENTE */}

                  <div
                    className="
                      absolute
                      inset-0

                      bg-gradient-to-t
                      from-[#020817]/95
                      via-[#020817]/10
                      to-transparent
                    "
                  />


                  {/* NÚMERO */}

                  <span
                    className="
                      absolute
                      right-5
                      top-5

                      text-2xl
                      font-bold
                      tracking-[0.08em]

                      text-white/30
                    "
                  >
                    {
                      project.number
                    }
                  </span>


                  {/* TEXTO */}

                  <div
                    className="
                      absolute
                      bottom-6
                      left-6
                      right-6
                    "
                  >

                    <p
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.22em]
                        text-blue-300
                      "
                    >
                      {
                        project.client
                      }
                    </p>


                    <div
                      className="
                        mt-3
                        flex
                        items-end
                        justify-between
                        gap-5
                      "
                    >

                      <h3
                        className="
                          max-w-[85%]
                          text-xl
                          font-semibold
                          leading-tight
                          text-white
                        "
                      >
                        {
                          project.title[
                            language
                          ]
                        }
                      </h3>


                      <ArrowUpRight
                        size={20}

                        className="
                          shrink-0
                          text-white

                          transition-transform

                          group-hover:-translate-y-1
                          group-hover:translate-x-1
                        "
                      />

                    </div>

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


export default ProjectsPreview