import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import {
  useMemo,
  useState,
} from "react"

import {
  Link,
} from "react-router-dom"

import {
  useLanguage,
} from "../context/LanguageContext"

import PageReveal from "../components/ui/PageReveal"


// =========================================================
// FOTOGRAFÍAS AUTOMÁTICAS
// =========================================================

const equipmentImages =
  import.meta.glob(
    "../assets/images/equipment/**/*.{jpg,jpeg,png,webp}",
    {
      eager: true,
      query: "?url",
      import: "default",
    }
  )


// =========================================================
// BUSCAR FOTOGRAFÍAS POR CARPETA
// =========================================================

function getEquipmentImages(
  folder
) {
  return Object.entries(
    equipmentImages
  )
    .filter(
      ([path]) =>
        path.includes(
          `/equipment/${folder}/`
        )
    )
    .sort(
      (
        [pathA],
        [pathB]
      ) =>
        pathA.localeCompare(
          pathB,
          undefined,
          {
            numeric: true,
          }
        )
    )
    .map(
      ([, url]) =>
        url
    )
}


// =========================================================
// EQUIPO
// =========================================================

const equipment = [
  {
    id: "titan",

    folder: "titan",

    name: {
      es:
        "Titan de 18 toneladas",

      en:
        "18-ton Titan",
    },

    model:
      "TEREX BT3470",

    description: {
      es:
        "Equipo de izaje para maniobras, montaje de tuberías, estructuras y movimiento de cargas industriales.",

      en:
        "Lifting equipment for industrial operations, piping installation, structural work and heavy-load handling.",
    },

    uses: {
      es:
        "Montaje · Izaje · Estructuras · Tubería",

      en:
        "Installation · Lifting · Structures · Piping",
    },
  },


  {
    id:
      "nissan-np300",

    folder:
      "nissan-np300",

    name: {
      es:
        "Nissan NP300",

      en:
        "Nissan NP300",
    },

    model:
      "Vehículo de carga",

    description: {
      es:
        "Unidad para transporte de herramienta, personal, materiales y apoyo a operaciones industriales en campo.",

      en:
        "Vehicle for transporting tools, personnel and materials while supporting industrial field operations.",
    },

    uses: {
      es:
        "Transporte · Campo · Herramienta",

      en:
        "Transport · Field work · Tools",
    },
  },


  {
    id:
      "ford-f350",

    folder:
      "ford-f350",

    name: {
      es:
        "Ford F350",

      en:
        "Ford F350",
    },

    model:
      "Vehículo industrial",

    description: {
      es:
        "Unidad de trabajo para transporte y apoyo logístico durante proyectos industriales y operaciones en campo.",

      en:
        "Work vehicle for transportation and logistical support during industrial projects and field operations.",
    },

    uses: {
      es:
        "Logística · Transporte · Campo",

      en:
        "Logistics · Transport · Field work",
    },
  },


  {
    id:
      "generador-miller",

    folder:
      "generador-miller",

    name: {
      es:
        "Generador Miller",

      en:
        "Miller Generator",
    },

    model:
      "Miller Bobcat",

    description: {
      es:
        "Generador para suministro eléctrico y apoyo a operaciones de fabricación, soldadura y mantenimiento.",

      en:
        "Generator for power supply supporting fabrication, welding and maintenance operations.",
    },

    uses: {
      es:
        "Energía · Soldadura · Campo",

      en:
        "Power · Welding · Field work",
    },
  },


  {
    id:
      "generador-predator",

    folder:
      "generador-predator",

    name: {
      es:
        "Generador Predator",

      en:
        "Predator Generator",
    },

    model:
      "Predator 9000",

    description: {
      es:
        "Generador portátil para suministro eléctrico en trabajos de mantenimiento, montaje y operación en campo.",

      en:
        "Portable generator for power supply during maintenance, installation and field operations.",
    },

    uses: {
      es:
        "Energía · Mantenimiento · Campo",

      en:
        "Power · Maintenance · Field work",
    },
  },


  {
    id:
      "compresor-sullivan",

    folder:
      "compresor-sullivan",

    name: {
      es:
        "Compresor Sullivan Palatek",

      en:
        "Sullivan Palatek Compressor",
    },

    model:
      "185 FCM",

    description: {
      es:
        "Compresor industrial utilizado para suministro de aire, preparación superficial y distintos trabajos de mantenimiento.",

      en:
        "Industrial compressor used for compressed-air supply, surface preparation and maintenance work.",
    },

    uses: {
      es:
        "Aire comprimido · Sandblast · Mantenimiento",

      en:
        "Compressed air · Sandblasting · Maintenance",
    },
  },


  {
    id:
      "soldadora-lincoln",

    folder:
      "soldadora-lincoln",

    name: {
      es:
        "Soldadora Lincoln Electric",

      en:
        "Lincoln Electric Welder",
    },

    model:
      "RX 550 Pro",

    description: {
      es:
        "Equipo profesional para trabajos de soldadura, montaje y fabricación metalmecánica.",

      en:
        "Professional equipment for welding, installation and metal fabrication work.",
    },

    uses: {
      es:
        "Soldadura · Fabricación · Montaje",

      en:
        "Welding · Fabrication · Installation",
    },
  },


  {
    id:
      "soldadora-infra",

    folder:
      "soldadora-infra",

    name: {
      es:
        "Soldadora INFRA",

      en:
        "INFRA Welder",
    },

    model:
      "MI 2-300",

    description: {
      es:
        "Máquina de soldar para trabajos de fabricación, reparación y mantenimiento industrial.",

      en:
        "Welding machine for fabrication, repair and industrial maintenance work.",
    },

    uses: {
      es:
        "Soldadura · Reparación · Mantenimiento",

      en:
        "Welding · Repair · Maintenance",
    },
  },


  {
    id:
      "remolque",

    folder:
      "remolque",

    name: {
      es:
        "Remolque REMSA",

      en:
        "REMSA Trailer",
    },

    model:
      "REMSA 001",

    description: {
      es:
        "Remolque para traslado de materiales, herramientas y apoyo logístico en proyectos industriales.",

      en:
        "Trailer for transporting materials and tools and providing logistical support for industrial projects.",
    },

    uses: {
      es:
        "Transporte · Logística · Materiales",

      en:
        "Transport · Logistics · Materials",
    },
  },

  {
    id:
      "perforadora",

    folder:
      "perforadora",

    name: {
      es:
        "Perforadora de cimentaciones",
      en:
        "Rotary drilling rig",
    },

    model:
      "ZL140",

    description: {
      es:
        "Perforación de cimentaciones para estructuras",
      en:
        "Foundation Drilling for Structures",
    },

    uses: {
      es:
        "Perforación · Cimentaciones · Estructuras",
      en:
        "Drilling · Foundations · Structures",
    },

  }
]


// =========================================================
// RENTAL
// =========================================================

function Rental() {
  const {
    language,
    t,
  } = useLanguage()


  return (
    <main className="rental-page">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="rental-hero">

        <div className="rental-container rental-hero-grid">


          <div>

            <PageReveal
              delay={0.05}
              y={14}
            >
              <p className="rental-eyebrow">
                {t(
                  "RENTA DE EQUIPO",
                  "EQUIPMENT RENTAL"
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
                    Equipo listo
                    <br />
                    para el trabajo.
                  </>,
                  <>
                    Equipment ready
                    <br />
                    for the job.
                  </>
                )}
              </h1>
            </PageReveal>

          </div>


          <PageReveal
            delay={0.32}
            y={22}
          >
            <p className="rental-hero-description">
              {t(
                "Contamos con equipos para apoyar operaciones de fabricación, mantenimiento, montaje, transporte, perforación y trabajo en campo.",
                "We provide equipment to support fabrication, maintenance, installation, transportation, drilling and field operations."
              )}
            </p>
          </PageReveal>

        </div>

      </section>


      {/* =====================================================
          CATÁLOGO
      ===================================================== */}

      <section className="rental-catalog-section">

        <div className="rental-container">


          <div className="rental-catalog-heading">

            <PageReveal
              delay={0.04}
              y={24}
            >

              <div>

                <p className="rental-eyebrow">
                  {t(
                    "EQUIPO DISPONIBLE",
                    "AVAILABLE EQUIPMENT"
                  )}
                </p>


                <h2>
                  {t(
                    "Capacidad que llega hasta tu proyecto.",
                    "Capability delivered to your project."
                  )}
                </h2>

              </div>

            </PageReveal>


            <PageReveal
              delay={0.13}
              y={20}
            >
              <p>
                {t(
                  "Consulta disponibilidad de acuerdo con las fechas, ubicación y necesidades específicas de tu proyecto.",
                  "Check availability according to the dates, location and specific requirements of your project."
                )}
              </p>
            </PageReveal>

          </div>


          <div className="rental-grid">

            {equipment.map(
              (
                item,
                index
              ) => (

                <PageReveal
                  key={item.id}
                  delay={
                    0.04 +
                    (index % 4) *
                      0.06
                  }
                  y={30}
                  className="rental-reveal-item"
                >

                  <EquipmentCard
                    item={item}
                    number={
                      index + 1
                    }
                    language={
                      language
                    }
                    t={t}
                  />

                </PageReveal>

              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="rental-cta-section">

        <div className="rental-container">

          <PageReveal
            delay={0.08}
            y={30}
          >

            <div className="rental-cta-card">

              <div>

                <p className="rental-eyebrow">
                  {t(
                    "DISPONIBILIDAD",
                    "AVAILABILITY"
                  )}
                </p>


                <h2>
                  {t(
                    "¿Necesitas equipo para tu próximo proyecto?",
                    "Need equipment for your next project?"
                  )}
                </h2>


                <p>
                  {t(
                    "Cuéntanos qué necesitas y podremos revisar disponibilidad y requerimientos.",
                    "Tell us what you need and we can check availability and project requirements."
                  )}
                </p>

              </div>


              <Link
                to="/contacto"
                className="rental-cta-button"
              >
                {t(
                  "Solicitar cotización",
                  "Request a quote"
                )}

                <ArrowRight
                  size={17}
                />
              </Link>

            </div>

          </PageReveal>

        </div>

      </section>

    </main>
  )
}


// =========================================================
// EQUIPMENT CARD
// =========================================================

function EquipmentCard({
  item,
  number,
  language,
  t,
}) {
  const images =
    useMemo(
      () =>
        getEquipmentImages(
          item.folder
        ),
      [item.folder]
    )


  const [
    activeImage,
    setActiveImage,
  ] = useState(0)


  const previousImage = () => {
    setActiveImage(
      (current) =>
        current === 0
          ? images.length - 1
          : current - 1
    )
  }


  const nextImage = () => {
    setActiveImage(
      (current) =>
        current ===
        images.length - 1
          ? 0
          : current + 1
    )
  }


  return (
    <article className="rental-card">


      <div className="rental-card-image">

        {images.length > 0 ? (

          <img
            src={
              images[
                activeImage
              ]
            }
            alt={
              item.name[
                language
              ]
            }
          />

        ) : (

          <div className="rental-image-placeholder">

            {t(
              "Agrega fotografías",
              "Add photographs"
            )}

          </div>

        )}


        <span className="rental-card-number">
          {String(
            number
          ).padStart(
            2,
            "0"
          )}
        </span>


        {images.length >
          1 && (
          <>

            <button
              type="button"
              className="
                rental-image-arrow
                rental-image-arrow--left
              "
              onClick={
                previousImage
              }
              aria-label={t(
                "Foto anterior",
                "Previous photo"
              )}
            >
              <ChevronLeft
                size={19}
              />
            </button>


            <button
              type="button"
              className="
                rental-image-arrow
                rental-image-arrow--right
              "
              onClick={
                nextImage
              }
              aria-label={t(
                "Siguiente foto",
                "Next photo"
              )}
            >
              <ChevronRight
                size={19}
              />
            </button>

          </>
        )}


        {images.length >
          1 && (
          <span className="rental-image-counter">

            {String(
              activeImage + 1
            ).padStart(
              2,
              "0"
            )}

            {" / "}

            {String(
              images.length
            ).padStart(
              2,
              "0"
            )}

          </span>
        )}

      </div>


      <div className="rental-card-content">

        <p className="rental-card-model">
          {
            item.model
          }
        </p>


        <h3>
          {
            item.name[
              language
            ]
          }
        </h3>


        <p className="rental-card-description">
          {
            item.description[
              language
            ]
          }
        </p>


        <div className="rental-card-uses">

          <span>
            {t(
              "USOS",
              "USES"
            )}
          </span>

          <p>
            {
              item.uses[
                language
              ]
            }
          </p>

        </div>


        <Link
          to="/contacto"
          className="rental-card-link"
        >
          {t(
            "Consultar disponibilidad",
            "Check availability"
          )}

          <ArrowRight
            size={16}
          />
        </Link>

      </div>

    </article>
  )
}


export default Rental