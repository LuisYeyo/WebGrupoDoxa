import {
  ArrowRight,
  MapPin,
  Wrench,
} from "lucide-react"

import {
  Link,
} from "react-router-dom"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  useLanguage,
} from "../context/LanguageContext"

import {
  projects,
} from "../data/projects"

import PageReveal from "../components/ui/PageReveal"


const filters = [
  {
    value: "all",
    es: "Todos",
    en: "All",
  },

  {
    value: "piping",
    es: "Tubería",
    en: "Piping",
  },

  {
    value: "structures",
    es: "Estructuras",
    en: "Structures",
  },

  {
    value: "fabrication",
    es: "Fabricación",
    en: "Fabrication",
  },

  {
    value: "tanks",
    es: "Tanques y equipos",
    en: "Tanks & equipment",
  },

  {
    value: "insulation",
    es: "Aislamiento",
    en: "Insulation",
  },

  {
    value: "maintenance",
    es: "Mantenimiento",
    en: "Maintenance",
  },

  {
    value: "drilling",
    es: "Perforación",
    en: "Drilling",
  },

  {
    value: "sandblast",
    es: "Sandblast y pintura",
    en: "Sandblasting & painting",
  },
]

function publicServiceCategory(value = "") {
  const service = value.toLocaleLowerCase("es-MX")
  if (service.includes("tuber") || service.includes("piping")) return "piping"
  if (service.includes("estructura") || service.includes("plataforma")) return "structures"
  if (service.includes("fabric")) return "fabrication"
  if (service.includes("tanque") || service.includes("equipo")) return "tanks"
  if (service.includes("aisla")) return "insulation"
  if (service.includes("manten")) return "maintenance"
  if (service.includes("perfora")) return "drilling"
  if (service.includes("sandblast") || service.includes("pintura")) return "sandblast"
  return "all"
}


function Projects() {

  const {
    language,
    t,
  } = useLanguage()


  const [
    activeFilter,
    setActiveFilter,
  ] = useState("all")

  const [publishedProjects, setPublishedProjects] = useState([])

  useEffect(() => {
    let active = true
    fetch("/api/public/projects")
      .then((response) => response.ok ? response.json() : { projects: [] })
      .then(({ projects: rows = [] }) => {
        if (!active) return
        setPublishedProjects(rows.filter((project) => project.image).map((project) => ({
          ...project,
          service: publicServiceCategory(project.service),
          title: { es: project.title, en: project.title },
          location: { es: project.location, en: project.location },
          serviceLabel: { es: project.service, en: project.service },
          work: { es: project.description, en: project.description },
        })))
      })
      .catch(() => {})
    return () => { active = false }
  }, [])

  const allProjects = useMemo(() => [...publishedProjects, ...projects], [publishedProjects])


  const filteredProjects =
    useMemo(
      () => {

        if (
          activeFilter ===
          "all"
        ) {
          return allProjects
        }

        return allProjects.filter(
          (project) =>
            project.service ===
            activeFilter
        )

      },
      [
        activeFilter,
        allProjects,
      ]
    )


  return (
    <main className="projects-page">


      {/* HERO */}

      <section className="projects-hero">

        <div className="projects-container projects-hero-grid">

          <div>

            <PageReveal
              delay={0.05}
              y={14}
            >

              <p className="projects-eyebrow">
                {t(
                  "EXPERIENCIA EN CAMPO",
                  "FIELD EXPERIENCE"
                )}
              </p>

            </PageReveal>


            <PageReveal
              delay={0.17}
              y={38}
              duration={0.85}
            >

              <h1>
                {t(
                  <>
                    Proyectos que
                    <br />
                    respaldan
                    <br />
                    nuestro trabajo.
                  </>,
                  <>
                    Projects that
                    <br />
                    support
                    <br />
                    our work.
                  </>
                )}
              </h1>

            </PageReveal>

          </div>


          <PageReveal
            delay={0.32}
            y={22}
          >

            <p className="projects-hero-description">

              {t(
                "Experiencia documentada en fabricación, estructuras, tubería, mantenimiento, aislamiento, sandblast, pintura, equipos y cimentaciones industriales.",
                "Documented experience in fabrication, structures, piping, maintenance, insulation, sandblasting, painting, industrial equipment and foundation work."
              )}

            </p>

          </PageReveal>

        </div>

      </section>


      {/* FILTROS */}

      <section className="projects-filter-section">

        <div className="projects-container">

          <PageReveal
            delay={0.08}
            y={16}
          >

            <div className="projects-filters">

              {filters.map(
                (filter) => (

                  <button
                    type="button"

                    key={
                      filter.value
                    }

                    className={`
                      projects-filter

                      ${
                        activeFilter ===
                        filter.value
                          ? "projects-filter--active"
                          : ""
                      }
                    `}

                    onClick={() =>
                      setActiveFilter(
                        filter.value
                      )
                    }
                  >

                    {
                      filter[
                        language
                      ]
                    }

                  </button>

                )
              )}

            </div>

          </PageReveal>

        </div>

      </section>


      {/* PROYECTOS */}

      <section className="projects-grid-section">

        <div className="projects-container">

          <div className="projects-grid">

            {filteredProjects.map(
              (
                project,
                index
              ) => (

                <PageReveal
                  key={
                    project.slug
                  }

                  delay={
                    0.04 +
                    (index % 4) *
                      0.07
                  }

                  y={30}

                  className="project-reveal-item"
                >

                  <article className="project-card">


                    <Link
                      to={`/proyectos/${project.slug}`}
                      className="project-card-image"
                    >

                      <img
                        src={
                          project.image
                        }

                        alt={
                          project.title[
                            language
                          ]
                        }
                      />


                      <span className="project-card-client">
                        {
                          project.client
                        }
                      </span>

                    </Link>


                    <div className="project-card-content">

                      <p className="project-card-kicker">
                        {
                          project.client
                        }
                      </p>


                      <h2>
                        {
                          project.title[
                            language
                          ]
                        }
                      </h2>


                      <div className="project-card-meta">

                        <div>

                          <MapPin
                            size={15}
                          />

                          <span>

                            {
                              project.location[
                                language
                              ]
                            }

                          </span>

                        </div>


                        <div>

                          <Wrench
                            size={15}
                          />

                          <span>

                            {
                              project
                                .serviceLabel[
                                  language
                                ]
                            }

                          </span>

                        </div>

                      </div>


                      <p className="project-card-work">

                        {
                          project.work[
                            language
                          ]
                        }

                      </p>


                      <Link
                        to={`/proyectos/${project.slug}`}
                        className="project-card-link"
                      >

                        {t(
                          "Ver proyecto",
                          "View project"
                        )}

                        <ArrowRight
                          size={16}
                        />

                      </Link>

                    </div>

                  </article>

                </PageReveal>

              )
            )}

          </div>

        </div>

      </section>

    </main>
  )
}


export default Projects
