import doxaImage from "../assets/images/companies/doxa.jpg"
import remsaImage from "../assets/images/companies/remsa.jpg"
import secmimarImage from "../assets/images/companies/secmimar.jpg"
import doxaMaintenanceImage from "../assets/images/companies/doxa-maintenance.jpg"

export const companies = [
  {
    id: "doxa",
    number: "01",

    name: {
      es: "Grupo Industrial DOXA",
      en: "Grupo Industrial DOXA",
    },

    shortName: "DOXA",

    category: {
      es: "Ingeniería · Fabricación · Mantenimiento",
      en: "Engineering · Fabrication · Maintenance",
    },

    description: {
      es:
        "Soluciones integrales para proyectos industriales, fabricación metalmecánica, mantenimiento y construcción.",
      en:
        "Integrated solutions for industrial projects, metal fabrication, maintenance and construction.",
    },

    href: "/doxa",

    image: doxaImage,
  },

  {
    id: "remsa",
    number: "02",

    name: {
      es: "Grupo Industrial REMSA",
      en: "Grupo Industrial REMSA",
    },

    shortName: "REMSA",

    category: {
      es: "Mantenimiento · Metalmecánica",
      en: "Maintenance · Metalworking",
    },

    description: {
      es:
        "Servicios especializados de mantenimiento industrial y soluciones metalmecánicas para proyectos de alta exigencia.",
      en:
        "Specialized industrial maintenance and metalworking solutions for demanding projects.",
    },

    href: "/remsa",

    image: remsaImage,
  },

  {
    id: "secmimar",
    number: "03",

    name: {
      es: "SECMIMAR",
      en: "SECMIMAR",
    },

    shortName: "SECMIMAR",

    category: {
      es: "Industrial · Marítimo · Offshore",
      en: "Industrial · Marine · Offshore",
    },

    description: {
      es:
        "Servicios de construcción, mantenimiento industrial, marítimo y soluciones offshore.",
      en:
        "Construction, industrial maintenance, marine and offshore services.",
    },

    href: "/secmimar",

    image: secmimarImage,
  },

  {
    id: "doxa-maintenance",
    number: "04",

    name: {
      es: "DOXA Mantenimiento Industrial",
      en: "DOXA Industrial Maintenance",
    },

    shortName: "DOXA Mantenimiento",

    category: {
      es: "Mantenimiento · Reparación · Servicio",
      en: "Maintenance · Repair · Service",
    },

    description: {
      es:
        "Mantenimiento y atención especializada para instalaciones y equipos industriales.",
      en:
        "Specialized maintenance and service for industrial facilities and equipment.",
    },

    href: "/mantenimiento-industrial-doxa",

    image: doxaMaintenanceImage,
  },
]