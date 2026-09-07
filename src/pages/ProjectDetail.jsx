import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Wrench,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useLanguage,
} from "../context/LanguageContext";

import {
  projects,
} from "../data/projects";


function ProjectDetail() {
  const {
    slug,
  } = useParams();

  const {
    language,
    t,
  } = useLanguage();


  const project =
    projects.find(
      (item) =>
        item.slug === slug
    );


  if (!project) {
    return (
      <main className="project-detail-page">

        <div className="project-detail-not-found">

          <p className="projects-eyebrow">
            404
          </p>

          <h1>
            {t(
              "Proyecto no encontrado",
              "Project not found"
            )}
          </h1>

          <Link
            to="/proyectos"
            className="project-detail-back"
          >
            <ArrowLeft
              size={16}
            />

            {t(
              "Volver a proyectos",
              "Back to projects"
            )}
          </Link>

        </div>

      </main>
    );
  }


  return (
    <main className="project-detail-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="project-detail-hero">

        <div className="projects-container">

          <Link
            to="/proyectos"
            className="project-detail-back"
          >
            <ArrowLeft
              size={16}
            />

            {t(
              "Todos los proyectos",
              "All projects"
            )}
          </Link>


          <p className="project-detail-client">
            {
              project.client
            }
          </p>


          <h1>
            {
              project.title[
                language
              ]
            }
          </h1>


          <div className="project-detail-meta">

            <div>

              <MapPin
                size={16}
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
                size={16}
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

        </div>

      </section>


      {/* =====================================================
          IMAGE
      ===================================================== */}

      <section className="project-detail-image-section">

        <div className="projects-container">

          <div className="project-detail-image">

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

          </div>

        </div>

      </section>


      {/* =====================================================
          INFO
      ===================================================== */}

      <section className="project-detail-info-section">

        <div className="projects-container project-detail-info-grid">

          <div>

            <p className="projects-eyebrow">
              {t(
                "TRABAJOS EFECTUADOS",
                "WORK PERFORMED"
              )}
            </p>

            <h2>
              {
                project.title[
                  language
                ]
              }
            </h2>

          </div>


          <div>

            <p className="project-detail-description">
              {
                project.work[
                  language
                ]
              }
            </p>


            <Link
              to="/contacto"
              className="project-detail-cta"
            >
              {t(
                "Solicitar cotización",
                "Request a quote"
              )}

              <ArrowRight
                size={16}
              />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}


export default ProjectDetail;