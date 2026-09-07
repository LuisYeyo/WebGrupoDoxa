import chemoursImg from "../assets/images/projects/chemours-tr1.jpg"
import cryoinfraImg from "../assets/images/projects/cryoinfra-aislamiento.jpg"
import dynasolImg from "../assets/images/projects/dynasol-ponton.jpg"
import sinoxisImg from "../assets/images/projects/sinoxis-plataforma.jpg"
import vibrantsImg from "../assets/images/projects/vibrants-lifters.jpg"
import vopakImg from "../assets/images/projects/vopak-meg.jpg"


export const projects = [
  {
    id: "vopak-meg",
    slug: "vopak-meg",
    number: "01",

    client: "VOPAK",

    title: {
      es:
        "Tubería inoxidable para nueva bomba de MEG",

      en:
        "Stainless steel piping for new MEG pump",
    },

    location: {
      es:
        "Planta · Altamira, Tamaulipas",

      en:
        "Plant · Altamira, Tamaulipas",
    },

    service: "piping",

    serviceLabel: {
      es: "Tubería",
      en: "Piping",
    },

    work: {
      es:
        "Montaje de tubería de acero inoxidable para nueva bomba de MEG.",

      en:
        "Installation of stainless steel piping for a new MEG pump.",
    },

    image: vopakImg,

    featured: true,
  },


  {
    id: "dynasol-ponton",
    slug: "dynasol-ponton",
    number: "02",

    client: "DYNASOL",

    title: {
      es:
        "Fabricación de pontón",

      en:
        "Pontoon fabrication",
    },

    location: {
      es:
        "Altamira, Tamaulipas",

      en:
        "Altamira, Tamaulipas",
    },

    service: "structures",

    serviceLabel: {
      es: "Estructuras",
      en: "Structures",
    },

    work: {
      es:
        "Fabricación y trabajos metalmecánicos para componente tipo pontón.",

      en:
        "Fabrication and metalworking for a pontoon-type component.",
    },

    image: dynasolImg,

    featured: true,
  },


  {
    id: "cryoinfra-aislamiento",
    slug: "cryoinfra-aislamiento",
    number: "03",

    client: "CRYOINFRA",

    title: {
      es:
        "Aislamiento industrial",

      en:
        "Industrial insulation",
    },

    location: {
      es:
        "Altamira, Tamaulipas",

      en:
        "Altamira, Tamaulipas",
    },

    service: "insulation",

    serviceLabel: {
      es: "Aislamiento",
      en: "Insulation",
    },

    work: {
      es:
        "Trabajos de aislamiento y acabado en instalaciones y equipos industriales.",

      en:
        "Insulation and finishing work on industrial facilities and equipment.",
    },

    image: cryoinfraImg,

    featured: true,
  },


  {
    id: "chemours-tr1",
    slug: "chemours-tr1",
    number: "04",

    client: "CHEMOURS",

    title: {
      es:
        "Trabajos industriales TR1",

      en:
        "TR1 industrial works",
    },

    location: {
      es:
        "Altamira, Tamaulipas",

      en:
        "Altamira, Tamaulipas",
    },

    service: "maintenance",

    serviceLabel: {
      es:
        "Mantenimiento",

      en:
        "Maintenance",
    },

    work: {
      es:
        "Trabajos de mantenimiento e intervención industrial en instalaciones de cliente.",

      en:
        "Industrial maintenance and intervention work at the client's facilities.",
    },

    image: chemoursImg,

    featured: false,
  },


  {
    id: "sinoxis-plataforma",
    slug: "sinoxis-plataforma",
    number: "05",

    client: "SINOXIS",

    title: {
      es:
        "Plataforma estructural",

      en:
        "Structural platform",
    },

    location: {
      es:
        "Altamira, Tamaulipas",

      en:
        "Altamira, Tamaulipas",
    },

    service: "structures",

    serviceLabel: {
      es:
        "Estructuras",

      en:
        "Structures",
    },

    work: {
      es:
        "Fabricación y montaje de plataforma para aplicación industrial.",

      en:
        "Fabrication and installation of a platform for industrial use.",
    },

    image: sinoxisImg,

    featured: false,
  },


  {
    id: "vibrants-lifters",
    slug: "vibrants-lifters",
    number: "06",

    client: "VIBRANTZ",

    title: {
      es:
        "Lifters y componentes industriales",

      en:
        "Lifters and industrial components",
    },

    location: {
      es:
        "Altamira, Tamaulipas",

      en:
        "Altamira, Tamaulipas",
    },

    service: "fabrication",

    serviceLabel: {
      es:
        "Fabricación",

      en:
        "Fabrication",
    },

    work: {
      es:
        "Fabricación de componentes y elementos para operación industrial.",

      en:
        "Fabrication of components and elements for industrial operations.",
    },

    image: vibrantsImg,

    featured: false,
  },
]


export default projects