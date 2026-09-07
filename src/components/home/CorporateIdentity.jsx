import {
  Eye,
  Target,
  ShieldCheck,
  Scale,
  Handshake,
  BadgeCheck,
  Users,
} from "lucide-react"

import {
  useLanguage,
} from "../../context/LanguageContext"

function CorporateIdentity() {
  const {
    language,
    t,
  } = useLanguage()

  const values = [
    {
      icon: ShieldCheck,
      es: "Responsabilidad",
      en: "Responsibility",
    },

    {
      icon: BadgeCheck,
      es: "Disciplina",
      en: "Discipline",
    },

    {
      icon: Scale,
      es: "Honestidad",
      en: "Honesty",
    },

    {
      icon: Eye,
      es: "Transparencia",
      en: "Transparency",
    },

    {
      icon: Handshake,
      es: "Compromiso",
      en: "Commitment",
    },

    {
      icon: Users,
      es: "Respeto",
      en: "Respect",
    },
  ]

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

        {/* ==========================
            QUIÉNES SOMOS
        ========================== */}

        <div
          className="
            grid
            gap-12
            lg:grid-cols-[1fr_0.9fr]
          "
        >

          {/* TEXTO */}
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
                "Quiénes somos",
                "About us"
              )}
            </p>

            <h2
              className="
                mt-5
                max-w-2xl

                text-4xl
                font-bold
                leading-[1]
                tracking-tight

                sm:text-5xl
                lg:text-6xl
              "
            >
              {t(
                <>
                  Experiencia que
                  <br />
                  responde a la industria.
                </>,
                <>
                  Experience built
                  <br />
                  for industry.
                </>
              )}
            </h2>

            <p
              className="
                mt-8
                max-w-2xl
                text-base
                leading-8
                text-slate-600
                lg:text-lg
              "
            >
              {t(
                "Grupo Industrial DOXA es una empresa especializada en mantenimiento industrial metalmecánico y construcción de proyectos, con capacidad para desarrollar soluciones de fabricación, montaje y mantenimiento para la industria.",
                "Grupo Industrial DOXA specializes in industrial metalworking maintenance and project construction, with capabilities in fabrication, installation and maintenance for industrial operations."
              )}
            </p>

            <p
              className="
                mt-5
                max-w-2xl
                text-base
                leading-8
                text-slate-600
              "
            >
              {t(
                "Nuestro trabajo se apoya en personal técnico especializado, procedimientos de calidad y seguridad, e infraestructura preparada para atender proyectos de diferentes escalas.",
                "Our work is supported by specialized technical personnel, quality and safety procedures, and infrastructure prepared for projects of different scales."
              )}
            </p>

          </div>

          {/* ==========================
              MISIÓN + VISIÓN
          ========================== */}

          <div
            className="
              grid
              gap-5
            "
          >

            {/* MISIÓN */}
            <article
              className="
                rounded-[28px]
                bg-[#0a2547]
                p-8
                text-white

                shadow-[0_18px_55px_rgba(15,23,42,0.08)]

                sm:p-10
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-blue-300/30

                  bg-white/[0.03]

                  text-blue-300
                "
              >
                <Target
                  size={22}
                />
              </div>

              <p
                className="
                  mt-8
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-blue-300
                "
              >
                {t(
                  "Misión",
                  "Mission"
                )}
              </p>

              <p
                className="
                  mt-4
                  text-base
                  leading-7
                  text-slate-200
                "
              >
                {t(
                  "Diseñar y fabricar estructuras metálicas, montar tuberías y tanques atmosféricos mediante personal calificado, trabajando con seguridad y calidad y cumpliendo los requerimientos establecidos por cada cliente.",
                  "To design and fabricate steel structures, install piping and atmospheric tanks through qualified personnel, working safely and with quality while meeting each client's requirements."
                )}
              </p>

            </article>

            {/* VISIÓN */}
            <article
              className="
                rounded-[28px]
                bg-[#0a2547]
                p-8
                text-white

                shadow-[0_18px_55px_rgba(15,23,42,0.08)]

                sm:p-10
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-blue-300/30

                  bg-white/[0.03]

                  text-blue-300
                "
              >
                <Eye
                  size={22}
                />
              </div>

              <p
                className="
                  mt-8
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-blue-300
                "
              >
                {t(
                  "Visión",
                  "Vision"
                )}
              </p>

              <p
                className="
                  mt-4
                  text-base
                  leading-7
                  text-slate-200
                "
              >
                {t(
                  "Ser una empresa reconocida a nivel nacional por ofrecer soluciones competitivas para proyectos metalmecánicos, respaldadas por personal capacitado y altos estándares de manufactura.",
                  "To become a nationally recognized company for competitive metalworking solutions, supported by skilled personnel and high manufacturing standards."
                )}
              </p>

            </article>

          </div>

        </div>

        {/* ==========================
            VALORES
        ========================== */}

        <div
          className="
            mt-24
            border-t
            border-slate-200
            pt-14
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
                "Nuestros valores",
                "Our values"
              )}
            </p>

            <h3
              className="
                mt-4
                text-3xl
                font-bold
                tracking-tight
                sm:text-4xl
              "
            >
              {t(
                "La forma en que trabajamos.",
                "How we work."
              )}
            </h3>

          </div>

          {/* TARJETAS */}
          <div
            className="
              mt-10
              grid
              gap-4

              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            {values.map(
              (value) => {
                const Icon =
                  value.icon

                return (
                  <article
                    key={
                      value.es
                    }
                    className="
                      min-h-[150px]

                      rounded-[22px]

                      border
                      border-slate-200

                      bg-white

                      p-6

                      transition-all
                      duration-300

                      hover:-translate-y-1

                      hover:border-slate-300

                      hover:shadow-[0_15px_40px_rgba(15,23,42,0.07)]
                    "
                  >

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center

                        rounded-xl

                        bg-blue-50

                        text-blue-600
                      "
                    >
                      <Icon
                        size={20}
                      />
                    </div>

                    <p
                      className="
                        mt-7
                        text-lg
                        font-semibold
                      "
                    >
                      {
                        value[
                          language
                        ]
                      }
                    </p>

                  </article>
                )
              }
            )}

          </div>

        </div>

        {/* ==========================
            POLÍTICA DE CALIDAD
        ========================== */}

        <div
          className="
            mt-24

            overflow-hidden

            rounded-[30px]

            border
            border-slate-200

            bg-white

            shadow-[0_18px_55px_rgba(15,23,42,0.05)]
          "
        >

          <div
            className="
              grid

              lg:grid-cols-[0.35fr_1fr]
            "
          >

            {/* AZUL */}
            <div
              className="
                flex
                flex-col
                justify-between

                bg-blue-600

                p-8

                text-white

                sm:p-10
              "
            >

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center

                  rounded-2xl

                  bg-white/10
                "
              >
                <ShieldCheck
                  size={29}
                />
              </div>

              <div className="mt-20">

                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-blue-100
                  "
                >
                  {t(
                    "Sistema de gestión",
                    "Management system"
                  )}
                </p>

                <h3
                  className="
                    mt-3
                    text-3xl
                    font-bold
                  "
                >
                  {t(
                    "Política de calidad",
                    "Quality policy"
                  )}
                </h3>

              </div>

            </div>

            {/* TEXTO */}
            <div
              className="
                p-8
                sm:p-10
                lg:p-12
              "
            >

              <p
                className="
                  max-w-3xl
                  text-lg
                  leading-8
                  text-slate-600
                "
              >
                {t(
                  "DOXA busca proporcionar soluciones competitivas, productos y servicios de alta calidad en tiempo y forma, cumpliendo las especificaciones de cada cliente y la normatividad aplicable.",
                  "DOXA seeks to provide competitive solutions and high-quality products and services on schedule, meeting each client's specifications and applicable regulations."
                )}
              </p>

              <p
                className="
                  mt-5
                  max-w-3xl
                  text-base
                  leading-7
                  text-slate-500
                "
              >
                {t(
                  "La mejora continua de procesos, metodologías y personal forma parte de su Sistema de Gestión de Calidad y de su objetivo de mantener una posición competitiva dentro del sector metalmecánico.",
                  "Continuous improvement of processes, methodologies and personnel forms part of its Quality Management System and its goal of maintaining a competitive position in the metalworking sector."
                )}
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default CorporateIdentity