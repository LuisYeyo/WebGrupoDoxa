import {
  ArrowRight,
} from "lucide-react"

import {
  Link,
} from "react-router-dom"

import {
  useLanguage,
} from "../context/LanguageContext"

import services from "../data/services"

import PageReveal from "../components/ui/PageReveal"


function Services() {
  const {
    language,
    t,
  } = useLanguage()


  return (
    <main className="page-shell">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="page-hero">

        <div className="page-hero-copy">


          {/* EYEBROW */}

          <PageReveal
            delay={0.05}
            y={14}
          >
            <span className="section-eyebrow">
              {t(
                "SERVICIOS",
                "SERVICES"
              )}
            </span>
          </PageReveal>


          {/* TITLE */}

          <PageReveal
            delay={0.16}
            y={36}
          >
            <h1>
              {t(
                "Capacidades para cada etapa del proyecto.",
                "Capabilities for every stage of your project."
              )}
            </h1>
          </PageReveal>


          {/* DESCRIPTION */}

          <PageReveal
            delay={0.3}
            y={22}
          >
            <p>
              {t(
                "Conoce nuestras capacidades en fabricación, mantenimiento, aislamiento, perforación y soluciones para la industria.",
                "Explore our capabilities in fabrication, maintenance, insulation, drilling and industrial solutions."
              )}
            </p>
          </PageReveal>

        </div>

      </section>


      {/* =====================================================
          SERVICE CARDS
      ===================================================== */}

      <section className="service-list-section">

        <div className="service-grid">

          {services.map(
            (
              service,
              index
            ) => (

              <PageReveal
                key={
                  service.slug
                }
                delay={
                  0.05 +
                  (index % 4) *
                    0.07
                }
                y={30}
                className="service-reveal-item"
              >

                <article className="service-card">


                  {/* =========================================
                      TOP
                  ========================================= */}

                  <div className="service-card-top">

                    <span className="service-number">
                      {
                        service.number
                      }
                    </span>


                    <h2>
                      {
                        service.name[
                          language
                        ]
                      }
                    </h2>


                    <p>
                      {
                        service
                          .shortDescription[
                          language
                        ]
                      }
                    </p>

                  </div>


                  {/* =========================================
                      HIGHLIGHTS
                  ========================================= */}

                  <ul className="service-highlight-list">

                    {service.highlights.map(
                      (
                        item,
                        itemIndex
                      ) => (

                        <li
                          key={
                            itemIndex
                          }
                        >
                          {
                            item[
                              language
                            ]
                          }
                        </li>

                      )
                    )}

                  </ul>


                  {/* =========================================
                      ACTION
                  ========================================= */}

                  <div className="service-card-actions">

                    <Link
                      to={`/servicios/${service.slug}`}
                      className="primary-btn"
                    >
                      {t(
                        "Ver servicio",
                        "View service"
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

      </section>

    </main>
  )
}


export default Services