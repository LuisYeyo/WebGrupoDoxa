import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

import {
  useLanguage,
} from "../context/LanguageContext"

import doxaLogo from "../assets/images/companies/doxa.jpg"
import remsaLogo from "../assets/images/companies/remsa.jpg"
import secmimarLogo from "../assets/images/companies/secmimar.jpg"
import doxaMaintenanceLogo from "../assets/images/companies/doxa-maintenance.jpg"


// =========================================================
// FOTOS REALES
// =========================================================

import taller1Inox from "../assets/images/workshops/taller-1-inox.jpg"
import taller1Carbon from "../assets/images/workshops/taller-1-carbon.jpg"

import taller2 from "../assets/images/workshops/taller-2.jpg"

import taller3 from "../assets/images/workshops/taller-3.jpg"
import taller3Sold from "../assets/images/workshops/taller-3-sold.jpg"
import taller3Blast from "../assets/images/workshops/taller-3-blast.jpg"


// =========================================================
// UBICACIONES
// =========================================================

const workshopLocations = [
  {
    id: "doxa-remsa",

    number: "01",

    workshops: {
      es: "Talleres 1 y 2",
      en: "Workshops 1 & 2",
    },

    name: {
      es: "Taller Principal DOXA · REMSA",
      en: "DOXA · REMSA Main Workshop",
    },

    description: {
      es:
        "Ubicación principal de las instalaciones operativas de DOXA y REMSA.",

      en:
        "Main location for DOXA and REMSA operational facilities.",
    },

    coordinates: {
      lat: 22.430694,
      lng: -97.955778,
    },

    mapsUrl:
      "https://www.google.com/maps?q=22.430694,-97.955778",

    embedUrl:
      "https://maps.google.com/maps?q=22.430694,-97.955778&z=17&output=embed",
  },


  {
    id: "secmimar",

    number: "02",

    workshops: {
      es: "Taller 3",
      en: "Workshop 3",
    },

    name: {
      es: "Taller SECMIMAR",
      en: "SECMIMAR Workshop",
    },

    description: {
      es:
        "Ubicación de SECMIMAR y las operaciones asociadas a mantenimiento industrial.",

      en:
        "Location of SECMIMAR and associated industrial maintenance operations.",
    },

    coordinates: {
      lat: 22.397167,
      lng: -97.918472,
    },

    mapsUrl:
      "https://www.google.com/maps?q=22.397167,-97.918472",

    embedUrl:
      "https://maps.google.com/maps?q=22.397167,-97.918472&z=17&output=embed",
  },
]


// =========================================================
// CAPACIDAD
// =========================================================

const stats = [
  {
    value: "3",
    unit: "",
    es: "Talleres industriales",
    en: "Industrial workshops",
  },

  {
    value: "5,500",
    unit: "m²",
    es: "Superficie total",
    en: "Total area",
  },

  {
    value: "100",
    unit: "TON",
    es: "Transformación mensual",
    en: "Monthly transformation",
  },

  {
    value: "20,000",
    unit: "PULG.",
    es: "Tubería mensual",
    en: "Monthly piping",
    compact: true,
  },

  {
    value: "5,000",
    unit: "m²",
    es: "Sandblast y pintura mensual",
    en: "Monthly sandblasting and painting",
  },
]


// =========================================================
// TALLERES
// =========================================================

const workshops = [
  {
    id: "taller-1",

    number: "01",

    title: {
      es: "Taller 1",
      en: "Workshop 1",
    },

    companies: [
      {
        name: "DOXA",
        logo: doxaLogo,
      },
      {
        name: "REMSA",
        logo: remsaLogo,
      },
    ],

    subtitle: {
      es:
        "Fabricación en acero inoxidable y acero al carbón",

      en:
        "Stainless steel and carbon steel fabrication",
    },

    description: {
      es:
        "Instalación destinada a trabajos de fabricación metalmecánica en acero inoxidable y acero al carbón, con áreas diferenciadas para atender distintos requerimientos de producción.",

      en:
        "Facility dedicated to stainless steel and carbon steel fabrication, with separate work areas designed to support different production requirements.",
    },

    capabilities: [
      {
        es: "Acero inoxidable",
        en: "Stainless steel",
      },

      {
        es: "Acero al carbón",
        en: "Carbon steel",
      },

      {
        es: "Tubería",
        en: "Piping",
      },

      {
        es: "Fabricación",
        en: "Fabrication",
      },
    ],

    images: [
      {
        src: taller1Inox,

        label: {
          es: "Área de acero inoxidable",
          en: "Stainless steel area",
        },
      },

      {
        src: taller1Carbon,

        label: {
          es: "Área de acero al carbón",
          en: "Carbon steel area",
        },
      },
    ],
  },


  {
    id: "taller-2",

    number: "02",

    title: {
      es: "Taller 2",
      en: "Workshop 2",
    },

    companies: [
      {
        name: "DOXA",
        logo: doxaLogo,
      },
      {
        name: "REMSA",
        logo: remsaLogo,
      },
    ],

    subtitle: {
      es:
        "Fabricación y maniobras de mayor escala",

      en:
        "Large-scale fabrication and operations",
    },

    description: {
      es:
        "Espacio operativo preparado para trabajos de mayores dimensiones, maniobras, fabricación de componentes industriales y actividades relacionadas con preparación y acondicionamiento de equipos.",

      en:
        "Operational facility prepared for larger-scale work, maneuvering, industrial component fabrication and equipment preparation activities.",
    },

    capabilities: [
      {
        es: "Equipos de mayor escala",
        en: "Large-scale equipment",
      },

      {
        es: "Fabricación",
        en: "Fabrication",
      },

      {
        es: "Maniobras",
        en: "Operations",
      },

      {
        es: "Preparación de equipos",
        en: "Equipment preparation",
      },
    ],

    images: [
      {
        src: taller2,

        label: {
          es: "Área operativa del Taller 2",
          en: "Workshop 2 operational area",
        },
      },
    ],
  },


  {
    id: "taller-3",

    number: "03",

    title: {
      es: "Taller 3",
      en: "Workshop 3",
    },

    companies: [
      {
        name: "SECMIMAR",
        logo: secmimarLogo,
      },
      {
        name: "Mantenimiento Industrial DOXA",
        logo: doxaMaintenanceLogo,
      },
    ],

    subtitle: {
      es:
        "Equipo industrial, soldadura y preparación superficial",

      en:
        "Industrial equipment, welding and surface preparation",
    },

    description: {
      es:
        "Instalación especializada para fabricación y mantenimiento de equipo industrial, trabajos de soldadura, preparación de superficies, sandblast y pintura.",

      en:
        "Specialized facility for industrial equipment fabrication and maintenance, welding, surface preparation, sandblasting and painting.",
    },

    capabilities: [
      {
        es: "Equipo industrial",
        en: "Industrial equipment",
      },

      {
        es: "Mantenimiento",
        en: "Maintenance",
      },

      {
        es: "Soldadura",
        en: "Welding",
      },

      {
        es: "Sandblast y pintura",
        en: "Sandblasting and painting",
      },
    ],

    images: [
      {
        src: taller3,

        label: {
          es: "Vista general del Taller 3",
          en: "Workshop 3 overview",
        },
      },

      {
        src: taller3Sold,

        label: {
          es: "Trabajos de soldadura",
          en: "Welding operations",
        },
      },

      {
        src: taller3Blast,

        label: {
          es: "Preparación superficial y sandblast",
          en: "Surface preparation and sandblasting",
        },
      },
    ],
  },
]


function Infrastructure() {
  const {
    language,
    t,
  } = useLanguage()


  const [
    activeWorkshop,
    setActiveWorkshop,
  ] = useState(0)


  const [
    activeImage,
    setActiveImage,
  ] = useState(0)


  const workshop =
    workshops[activeWorkshop]


  const imageCount =
    workshop.images.length


  /*
    PROTECCIÓN IMPORTANTE:

    Si el índice anterior no existe
    dentro del nuevo taller usamos
    inmediatamente la primera foto.
  */

  const currentImage =
    workshop.images[
      activeImage
    ] ||
    workshop.images[0]


  // =========================================================
  // SEGURIDAD EXTRA AL CAMBIAR TALLER
  // =========================================================

  useEffect(() => {
    if (
      activeImage >=
      imageCount
    ) {
      setActiveImage(0)
    }
  }, [
    activeImage,
    imageCount,
  ])


  // =========================================================
  // CAMBIAR TALLER
  // =========================================================

  const changeWorkshop =
    (index) => {

      /*
        Primero regresamos el
        carrusel a la foto 1.
      */

      setActiveImage(0)

      /*
        Después cambiamos de taller.
      */

      setActiveWorkshop(
        index
      )
    }


  // =========================================================
  // CARRUSEL
  // =========================================================

  const previousImage =
    () => {

      if (
        imageCount <= 1
      ) {
        return
      }


      setActiveImage(
        (current) =>
          current === 0
            ? imageCount - 1
            : current - 1
      )
    }


  const nextImage =
    () => {

      if (
        imageCount <= 1
      ) {
        return
      }


      setActiveImage(
        (current) =>
          current ===
          imageCount - 1
            ? 0
            : current + 1
      )
    }


  return (
    <main className="infrastructure-page">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="infra-hero infra-hero--animated">

        <div className="infra-container infra-hero-grid">

          <div>

            <p className="infra-eyebrow infra-animate infra-animate--eyebrow">

              {t(
                "CAPACIDAD INDUSTRIAL",
                "INDUSTRIAL CAPABILITY"
              )}

            </p>


            <h1 className="infra-animate infra-animate--title">

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

            </h1>

          </div>


          <p className="infra-hero-description infra-animate infra-animate--description">

            {t(
              "Instalaciones y capacidad productiva diseñadas para atender proyectos industriales de diferentes escalas y requerimientos.",
              "Facilities and production capacity designed to support industrial projects of different scales and requirements."
            )}

          </p>

        </div>

      </section>


      {/* =====================================================
          ESTADÍSTICAS
      ===================================================== */}

      <section className="infra-stats-section">

        <div className="infra-container">

          <div className="infra-stats-grid">

            {stats.map(
              (
                item,
                index
              ) => (

                <article
                  className={`
                    infra-stat
                    infra-stat--animated

                    ${
                      item.compact
                        ? "infra-stat--compact"
                        : ""
                    }
                  `}
                  style={{
                    "--stat-delay":
                      `${
                        0.72 +
                        index *
                          0.11
                      }s`,
                  }}
                  key={
                    item.es
                  }
                >

                  <div className="infra-stat-value">

                    <span className="infra-stat-number">
                      {
                        item.value
                      }
                    </span>


                    {item.unit && (

                      <span className="infra-stat-unit">
                        {
                          item.unit
                        }
                      </span>

                    )}

                  </div>


                  <p className="infra-stat-label">

                    {
                      item[
                        language
                      ]
                    }

                  </p>


                  <span className="infra-stat-index">

                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}

                  </span>

                </article>

              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          TALLERES
      ===================================================== */}

      <section className="infra-workshops-section">

        <div className="infra-container">


          <div className="infra-section-heading">

            <div>

              <p className="infra-eyebrow">

                {t(
                  "INSTALACIONES",
                  "FACILITIES"
                )}

              </p>


              <h2>

                {t(
                  <>
                    Tres talleres.
                    <br />
                    Una capacidad integrada.
                  </>,
                  <>
                    Three workshops.
                    <br />
                    One integrated capability.
                  </>
                )}

              </h2>

            </div>


            <p>

              {t(
                "Cada instalación responde a distintas necesidades de fabricación, mantenimiento y preparación de equipos dentro de Grupo Industrial DOXA.",
                "Each facility supports different fabrication, maintenance and equipment preparation requirements within Grupo Industrial DOXA."
              )}

            </p>

          </div>


          {/* =================================================
              TABS
          ================================================= */}

          <div className="infra-tabs">

            {workshops.map(
              (
                item,
                index
              ) => {

                const active =
                  activeWorkshop ===
                  index


                return (
                  <button
                    key={
                      item.id
                    }
                    type="button"

                    onClick={() =>
                      changeWorkshop(
                        index
                      )
                    }

                    className={`
                      infra-tab

                      ${
                        active
                          ? "infra-tab--active"
                          : ""
                      }
                    `}
                  >

                    <span className="infra-tab-number">
                      {
                        item.number
                      }
                    </span>


                    <div className="infra-tab-main">

                      <div className="infra-tab-copy">

                        <strong>
                          {item.title[language]}
                        </strong>

                        <span className="infra-tab-companies">
                          {item.companies
                            .map((company) => company.name)
                            .join(" · ")}
                        </span>

                      </div>

                      <div className="infra-tab-company-logos">

                        {item.companies.map(
                          (company) => (
                            <div
                              key={company.name}
                              className="infra-tab-company-logo"
                              title={company.name}
                            >
                              <img
                                src={company.logo}
                                alt={company.name}
                              />
                            </div>
                          )
                        )}

                      </div>

                    </div>

                  </button>
                )
              }
            )}

          </div>


          {/* =================================================
              TALLER ACTIVO
          ================================================= */}

          <article className="infra-workshop-card">


            {/* IMAGE */}

            <div className="infra-workshop-image">

              <img
                key={
                  currentImage.src
                }
                src={
                  currentImage.src
                }
                alt={
                  currentImage.label[
                    language
                  ]
                }
              />


              <div className="infra-workshop-gradient" />


              {imageCount >
                1 && (
                <>

                  <button
                    type="button"
                    onClick={
                      previousImage
                    }
                    className="
                      infra-image-arrow
                      infra-image-arrow--left
                    "
                    aria-label={t(
                      "Fotografía anterior",
                      "Previous photograph"
                    )}
                  >
                    <ChevronLeft
                      size={19}
                    />
                  </button>


                  <button
                    type="button"
                    onClick={
                      nextImage
                    }
                    className="
                      infra-image-arrow
                      infra-image-arrow--right
                    "
                    aria-label={t(
                      "Siguiente fotografía",
                      "Next photograph"
                    )}
                  >
                    <ChevronRight
                      size={19}
                    />
                  </button>

                </>
              )}


              <div className="infra-image-label">

                {
                  currentImage.label[
                    language
                  ]
                }

              </div>


              <div className="infra-image-counter">

                {String(
                  activeImage + 1
                ).padStart(
                  2,
                  "0"
                )}

                {" / "}

                {String(
                  imageCount
                ).padStart(
                  2,
                  "0"
                )}

              </div>

            </div>


            {/* CONTENT */}

            <div className="infra-workshop-content">


              <p className="infra-workshop-kicker">

                {workshop.number}

                {" / "}

                {t(
                  "TALLER",
                  "WORKSHOP"
                )}

              </p>


              <h3>
                {
                  workshop.title[
                    language
                  ]
                }
              </h3>


              <p className="infra-workshop-subtitle">

                {
                  workshop.subtitle[
                    language
                  ]
                }

              </p>


              <div className="infra-company-list">

                {workshop.companies.map(
                  (company) => (
                    <span key={company.name}>
                      {company.name}
                    </span>
                  )
                )}

              </div>


              <p className="infra-workshop-description">

                {
                  workshop.description[
                    language
                  ]
                }

              </p>


              <div className="infra-capabilities">

                {workshop.capabilities.map(
                  (
                    capability,
                    index
                  ) => (

                    <span
                      key={
                        index
                      }
                    >

                      {
                        capability[
                          language
                        ]
                      }

                    </span>

                  )
                )}

              </div>

            </div>

          </article>

        </div>

      </section>


      {/* =====================================================
          UBICACIONES
      ===================================================== */}

      <section className="infra-location-section">

        <div className="infra-container">


          <div className="infra-location-heading">

            <div>

              <div className="infra-location-icon">

                <MapPin
                  size={21}
                />

              </div>


              <p className="infra-eyebrow">

                {t(
                  "UBICACIONES",
                  "LOCATIONS"
                )}

              </p>


              <h2>

                {t(
                  "Capacidad estratégica en la zona industrial.",
                  "Strategic capability in the industrial region."
                )}

              </h2>

            </div>


            <p>

              {t(
                "Nuestros tres talleres se distribuyen en dos ubicaciones operativas para atender diferentes necesidades de fabricación y mantenimiento industrial.",
                "Our three workshops operate across two locations to support different industrial fabrication and maintenance requirements."
              )}

            </p>

          </div>


          <div className="infra-location-cards">

            {workshopLocations.map(
              (
                location
              ) => (

                <article
                  className="infra-location-card"
                  key={
                    location.id
                  }
                >


                  <div className="infra-google-map">

                    <iframe
                      src={
                        location.embedUrl
                      }
                      title={
                        location.name[
                          language
                        ]
                      }
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />

                  </div>


                  <div className="infra-location-card-content">


                    <div className="infra-location-card-top">

                      <span className="infra-location-number">
                        {
                          location.number
                        }
                      </span>


                      <span className="infra-location-workshops">

                        {
                          location.workshops[
                            language
                          ]
                        }

                      </span>

                    </div>


                    <h3>

                      {
                        location.name[
                          language
                        ]
                      }

                    </h3>


                    <p>

                      {
                        location.description[
                          language
                        ]
                      }

                    </p>


                    <a
                      href={
                        location.mapsUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="infra-location-link"
                    >

                      {t(
                        "Abrir en Google Maps",
                        "Open in Google Maps"
                      )}


                      <ExternalLink
                        size={15}
                      />

                    </a>

                  </div>

                </article>

              )
            )}

          </div>

        </div>

      </section>

    </main>
  )
}


export default Infrastructure