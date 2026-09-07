import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useLanguage,
} from "../context/LanguageContext";

import services from "../data/services";

import ProcessCarousel from "../components/services/ProcessCarousel";


function ServiceDetail() {
  const {
    slug,
  } = useParams();

  const {
    language,
    t,
  } = useLanguage();

  const service =
    services.find(
      (item) =>
        item.slug === slug
    );

  if (!service) {
    return (
      <main className="page-shell">

        <section className="not-found-lite">

          <span className="section-eyebrow">
            {t(
              "SERVICIO",
              "SERVICE"
            )}
          </span>

          <h1>
            {t(
              "Servicio no encontrado",
              "Service not found"
            )}
          </h1>

          <p>
            {t(
              "No encontramos el servicio que intentaste abrir.",
              "We couldn't find the service you tried to open."
            )}
          </p>

          <Link
            to="/servicios"
            className="primary-btn"
          >
            <ArrowLeft size={16} />

            {t(
              "Volver a servicios",
              "Back to services"
            )}
          </Link>

        </section>

      </main>
    );
  }

  return (
    <main className="page-shell">

      {/* HERO */}

      <section className="detail-hero">

        <div className="detail-hero-copy">

          <span className="section-eyebrow">
            {t(
              `SERVICIO ${service.number}`,
              `SERVICE ${service.number}`
            )}
          </span>

          <h1>
            {service.name[language]}
          </h1>

          <p>
            {service.intro[language]}
          </p>

          <div className="detail-hero-actions">

            <Link
              to="/contacto"
              className="primary-btn"
            >
              {t(
                "Solicitar cotización",
                "Request a quote"
              )}

              <ArrowRight size={16} />
            </Link>

            <Link
              to="/servicios"
              className="secondary-btn"
            >
              <ArrowLeft size={16} />

              {t(
                "Volver a servicios",
                "Back to services"
              )}
            </Link>

          </div>

        </div>

      </section>


      {/* ALCANCE */}

      <section className="detail-overview">

        <div className="detail-overview-card">

          <div className="detail-overview-text">

            <span className="section-eyebrow">
              {t(
                "ALCANCE DEL SERVICIO",
                "SERVICE SCOPE"
              )}
            </span>

            <h2>
              {service.name[language]}
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

          <div className="detail-overview-points">

            {service.highlights.map(
              (
                item,
                index
              ) => (
                <div
                  className="detail-point"
                  key={index}
                >
                  <span className="detail-point-icon">
                    •
                  </span>

                  <span>
                    {item[language]}
                  </span>
                </div>
              )
            )}

          </div>

        </div>

      </section>


      {/* PROCESO */}

      <ProcessCarousel
        title={
          service.processTitle[
            language
          ]
        }
        description={
          service
            .processDescription[
            language
          ]
        }
        steps={
          service.processSteps
        }
      />


      {/* CTA */}

      <section className="service-cta-section">

        <div className="service-cta-card">

          <div>

            <span className="section-eyebrow">
              {t(
                "CONTÁCTANOS",
                "CONTACT US"
              )}
            </span>

            <h2>
              {t(
                "¿Necesitas este servicio para tu proyecto?",
                "Do you need this service for your project?"
              )}
            </h2>

            <p>
              {t(
                "Podemos evaluar requerimientos, alcance y necesidades específicas de tu proyecto.",
                "We can evaluate the requirements, scope and specific needs of your project."
              )}
            </p>

          </div>

          <div className="service-cta-actions">

            <Link
              to="/contacto"
              className="primary-btn"
            >
              {t(
                "Ir a contacto",
                "Contact us"
              )}

              <ArrowRight size={16} />
            </Link>

            <Link
              to="/proyectos"
              className="secondary-btn"
            >
              {t(
                "Ver proyectos",
                "View projects"
              )}
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}


export default ServiceDetail;