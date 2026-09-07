import {
  ArrowLeft,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useLanguage,
} from "../context/LanguageContext";

const companies = {
  doxa: {
    name:
      "Grupo Industrial DOXA",

    sector: {
      es:
        "Ingeniería · Fabricación · Mantenimiento",
      en:
        "Engineering · Fabrication · Maintenance",
    },

    description: {
      es:
        "Grupo Industrial DOXA integra capacidades de fabricación, mantenimiento, montaje e ingeniería para atender proyectos industriales de distintas escalas.",
      en:
        "Grupo Industrial DOXA integrates fabrication, maintenance, installation and engineering capabilities to support industrial projects of different scales.",
    },
  },

  remsa: {
    name:
      "Grupo Industrial REMSA",

    sector: {
      es:
        "Mantenimiento · Metalmecánica",
      en:
        "Maintenance · Metalworking",
    },

    description: {
      es:
        "Grupo Industrial REMSA desarrolla trabajos de mantenimiento industrial metalmecánico y soluciones para instalaciones y proyectos industriales.",
      en:
        "Grupo Industrial REMSA performs industrial metal-mechanical maintenance and provides solutions for industrial facilities and projects.",
    },
  },

  secmimar: {
    name: "SECMIMAR",

    sector: {
      es:
        "Construcción · Mantenimiento · Marítimo",
      en:
        "Construction · Maintenance · Maritime",
    },

    description: {
      es:
        "SECMIMAR participa en trabajos de construcción, mantenimiento industrial y servicios relacionados con operaciones marítimas y offshore.",
      en:
        "SECMIMAR participates in construction, industrial maintenance and services related to maritime and offshore operations.",
    },
  },

  "doxa-mantenimiento": {
    name:
      "DOXA Mantenimiento Industrial",

    sector: {
      es:
        "Mantenimiento · Reparación · Servicio",
      en:
        "Maintenance · Repair · Service",
    },

    description: {
      es:
        "DOXA Mantenimiento Industrial brinda atención especializada para mantenimiento, reparación y servicio de instalaciones y equipos industriales.",
      en:
        "DOXA Industrial Maintenance provides specialized maintenance, repair and service for industrial facilities and equipment.",
    },
  },
};

function CompanyDetail() {
  const {
    company,
  } = useParams();

  const {
    language,
    t,
  } = useLanguage();

  const data =
    companies[company];

  if (!data) {
    return (
      <main
        className="
          min-h-[70vh]
          bg-white
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-6
            py-24
          "
        >
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.3em]
              text-blue-600
            "
          >
            404
          </p>

          <h1
            className="
              mt-4
              text-4xl
              font-bold
              tracking-tight
              text-[#0b1830]
            "
          >
            {t(
              "Empresa no encontrada",
              "Company not found"
            )}
          </h1>

          <Link
            to="/grupo"
            className="
              mt-8
              inline-flex
              items-center
              gap-2

              text-sm
              font-semibold
              text-blue-600

              no-underline
            "
          >
            <ArrowLeft
              size={16}
            />

            {t(
              "Volver al grupo",
              "Back to group"
            )}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className="
        min-h-screen
        bg-white
        text-[#0b1830]
      "
    >
      <section
        className="
          bg-[#0a2547]
          py-24
          text-white
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
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.3em]
              text-blue-300
            "
          >
            {t(
              "Grupo Industrial DOXA",
              "Grupo Industrial DOXA"
            )}
          </p>

          <h1
            className="
              mt-6
              max-w-5xl

              text-5xl
              font-bold
              leading-[0.95]
              tracking-tight

              md:text-7xl
            "
          >
            {data.name}
          </h1>

          <p
            className="
              mt-6
              text-sm
              font-semibold
              uppercase
              tracking-[0.2em]
              text-slate-300
            "
          >
            {
              data.sector[
                language
              ]
            }
          </p>
        </div>
      </section>

      <section
        className="
          py-20
          md:py-24
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-7xl
            gap-12
            px-6

            lg:grid-cols-[0.9fr_1.1fr]
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
                "Sobre la empresa",
                "About the company"
              )}
            </p>

            <h2
              className="
                mt-4
                text-4xl
                font-bold
                tracking-tight
              "
            >
              {data.name}
            </h2>
          </div>

          <div>
            <p
              className="
                text-lg
                leading-8
                text-slate-600
              "
            >
              {
                data.description[
                  language
                ]
              }
            </p>

            <p
              className="
                mt-6
                text-sm
                leading-7
                text-slate-500
              "
            >
              {t(
                "En la siguiente etapa integraremos capacidades, fotografías, proyectos y datos específicos de esta empresa.",
                "In the next stage we will integrate capabilities, photographs, projects and specific information for this company."
              )}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CompanyDetail;