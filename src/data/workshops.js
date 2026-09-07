import taller1InoxImage from "../assets/images/workshops/taller-1-inox.jpg"
import taller1CarbonImage from "../assets/images/workshops/taller-1-carbon.jpg"
import taller2Image from "../assets/images/workshops/taller-2.jpg"
import taller3Image from "../assets/images/workshops/taller-3.jpg"
import taller3Interior1Image from "../assets/images/workshops/taller-3-sold.jpg"
import taller3Interior2Image from "../assets/images/workshops/taller-3-blast.jpg"

export const workshopSummary = {
  workshops: 3,
  totalArea: 5500,
}

export const workshops = [
  {
    id: "taller-1",

    number: "01",

    workshop: {
      es: "Taller 1",
      en: "Workshop 1",
    },

    title: {
      es: "Fabricación especializada",
      en: "Specialized fabrication",
    },

    description: {
      es:
        "Taller dividido en áreas especializadas para trabajos con acero inoxidable y acero al carbón, permitiendo mantener separados los diferentes procesos de fabricación.",

      en:
        "Workshop divided into specialized areas for stainless steel and carbon steel work, allowing different fabrication processes to remain separated.",
    },

    mainStat: {
      value: "1,000",

      unit: "m²",

      label: {
        es: "Superficie total",
        en: "Total area",
      },
    },

    secondaryStat: null,

    /*
      ÁREAS INTERNAS DEL TALLER
    */
    areas: [
      {
        value: "500",
        unit: "m²",

        label: {
          es: "Área de acero inoxidable",
          en: "Stainless steel area",
        },
      },

      {
        value: "500",
        unit: "m²",

        label: {
          es: "Área de acero al carbón",
          en: "Carbon steel area",
        },
      },
    ],

    features: {
      es: [
        "Acero inoxidable",
        "Acero al carbón",
        "Fabricación",
        "Equipo menor",
        "Metalmecánica",
      ],

      en: [
        "Stainless steel",
        "Carbon steel",
        "Fabrication",
        "Small equipment",
        "Metalworking",
      ],
    },

    images: [
      {
        src: taller1InoxImage,

        label: {
          es: "Acero inoxidable",
          en: "Stainless steel",
        },
      },

      {
        src: taller1CarbonImage,

        label: {
          es: "Acero al carbón",
          en: "Carbon steel",
        },
      },
    ],
  },

  {
    id: "taller-2",

    number: "02",

    workshop: {
      es: "Taller 2",
      en: "Workshop 2",
    },

    title: {
      es: "Equipos de mayor escala",
      en: "Large-scale equipment",
    },

    description: {
      es:
        "Patio industrial acondicionado para trabajos metalmecánicos de mayor escala, principalmente en acero al carbón, con áreas para sandblast y pintura.",

      en:
        "Industrial yard prepared for larger-scale metalworking, primarily in carbon steel, with dedicated sandblasting and painting areas.",
    },

    mainStat: {
      value: "3,000",

      unit: "m²",

      label: {
        es: "Patio industrial",
        en: "Industrial yard",
      },
    },

    secondaryStat: {
      value: "700",

      unit: "m²",

      label: {
        es: "Área techada",
        en: "Covered area",
      },
    },

    areas: [],

    features: {
      es: [
        "Acero al carbón",
        "Equipos mayores",
        "Sandblast",
        "Pintura",
        "Metalmecánica",
      ],

      en: [
        "Carbon steel",
        "Large equipment",
        "Sandblasting",
        "Painting",
        "Metalworking",
      ],
    },

    images: [
      {
        src: taller2Image,

        label: {
          es: "Patio industrial",
          en: "Industrial yard",
        },
      },
    ],
  },

  {
    id: "taller-3",

    number: "03",

    workshop: {
      es: "Taller 3",
      en: "Workshop 3",
    },

    title: {
      es: "Fabricación industrial",
      en: "Industrial fabrication",
    },

    description: {
      es:
        "Área especializada en fabricación de equipo industrial, soldadura, sandblast y pintura.",

      en:
        "Area specialized in industrial equipment fabrication, welding, sandblasting and painting.",
    },

    mainStat: {
      value: "1,500",

      unit: "m²",

      label: {
        es: "Superficie",
        en: "Total area",
      },
    },

    secondaryStat: {
      value: "700",

      unit: "m²",

      label: {
        es: "Área techada",
        en: "Covered area",
      },
    },

    areas: [],

    features: {
      es: [
        "Fabricación industrial",
        "Soldadura",
        "Sandblast",
        "Pintura",
      ],

      en: [
        "Industrial fabrication",
        "Welding",
        "Sandblasting",
        "Painting",
      ],
    },

    images: [
      {
        src: taller3Image,

        label: {
          es: "Vista general",
          en: "General view",
        },
      },

      {
        src: taller3Interior1Image,

        label: {
          es: "Interior del taller",
          en: "Workshop interior",
        },
      },

      {
        src: taller3Interior2Image,

        label: {
          es: "Área de fabricación",
          en: "Fabrication area",
        },
      },
    ],
  },
]