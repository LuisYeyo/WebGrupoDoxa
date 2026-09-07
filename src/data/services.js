import piping1 from "../assets/images/processes/piping/01-preparation.jpg";
import piping2 from "../assets/images/processes/piping/02-forming.jpg";
import piping3 from "../assets/images/processes/piping/03-control.jpg";

import structure1 from "../assets/images/processes/structures/01-preparation.jpg";
import structure2 from "../assets/images/processes/structures/02-assembly.jpg";
import structure3 from "../assets/images/processes/structures/03-inspection.jpg";

import isolation1 from "../assets/images/processes/isolation/01-superficie.jpg";
import isolation2 from "../assets/images/processes/isolation/02-corte.jpg";
import isolation3 from "../assets/images/processes/isolation/03-colocacion.jpg";
import isolation4 from "../assets/images/processes/isolation/04-acabado.jpg";

import maintenance1 from "../assets/images/processes/maintenance/01-recepcion.jpg";
import maintenance2 from "../assets/images/processes/maintenance/02-intervencion.jpg";
import maintenance3 from "../assets/images/processes/maintenance/03-resultado.jpg";

import drilling1 from "../assets/images/processes/drilling/01-vista-general.jpg";
import drilling2 from "../assets/images/processes/drilling/02-equipo.jpg";
import drilling3 from "../assets/images/processes/drilling/03-perforacion.jpg";
import drilling4 from "../assets/images/processes/drilling/04-resultado.jpg";

/*
  AJUSTA ESTOS NOMBRES SI TU CARPETA tanks
  USA OTROS NOMBRES.
*/

import tank1 from "../assets/images/processes/tanks/01-inspection.jpg";
import tank2 from "../assets/images/processes/tanks/02-preparation.jpg";
import tank3 from "../assets/images/processes/tanks/03-repair.jpg";
import tank4 from "../assets/images/processes/tanks/04-result.jpg";

const services = [
  {
    slug: "tuberia-industrial",
    number: "01",

    name: {
      es: "Tubería industrial",
      en: "Industrial piping",
    },

    shortDescription: {
      es:
        "Fabricación, habilitado e instalación de tubería industrial para proyectos de alta exigencia.",
      en:
        "Fabrication, preparation and installation of industrial piping for demanding projects.",
    },

    intro: {
      es:
        "Desarrollamos soluciones de tubería industrial para conducción de fluidos, integración de líneas de proceso y adecuaciones en planta.",
      en:
        "We develop industrial piping solutions for fluid transfer, process line integration and plant modifications.",
    },

    highlights: [
      {
        es: "Fabricación y habilitado de tubería",
        en: "Piping fabrication and preparation",
      },
      {
        es: "Corte y preparación de material",
        en: "Material cutting and preparation",
      },
      {
        es: "Armado y soldadura",
        en: "Assembly and welding",
      },
      {
        es: "Inspección y liberación",
        en: "Inspection and release",
      },
    ],

    processTitle: {
      es: "Proceso de tubería industrial",
      en: "Industrial piping process",
    },

    processDescription: {
      es:
        "Una secuencia visual del proceso de fabricación y preparación de tubería industrial.",
      en:
        "A visual sequence of the industrial piping fabrication and preparation process.",
    },

    processSteps: [
      {
        title: {
          es: "Preparación",
          en: "Preparation",
        },
        description: {
          es:
            "Selección, revisión y preparación inicial del material requerido para fabricación.",
          en:
            "Selection, inspection and initial preparation of the material required for fabrication.",
        },
        image: piping1,
      },
      {
        title: {
          es: "Formado y fabricación",
          en: "Forming and fabrication",
        },
        description: {
          es:
            "Conformado, ajuste y fabricación de los elementos conforme al proyecto.",
          en:
            "Forming, fitting and fabrication of components according to project requirements.",
        },
        image: piping2,
      },
      {
        title: {
          es: "Control e inspección",
          en: "Control and inspection",
        },
        description: {
          es:
            "Revisión del trabajo terminado antes de su montaje o entrega.",
          en:
            "Inspection of completed work prior to installation or delivery.",
        },
        image: piping3,
      },
    ],
  },

  {
    slug: "estructuras-metalicas",
    number: "02",

    name: {
      es: "Estructuras metálicas",
      en: "Steel structures",
    },

    shortDescription: {
      es:
        "Fabricación y montaje de estructuras metálicas para aplicaciones industriales.",
      en:
        "Fabrication and installation of steel structures for industrial applications.",
    },

    intro: {
      es:
        "Fabricamos estructuras metálicas para soporte, ampliación e integración de sistemas industriales.",
      en:
        "We fabricate steel structures for support, expansion and integration of industrial systems.",
    },

    highlights: [
      {
        es: "Preparación de perfiles",
        en: "Profile preparation",
      },
      {
        es: "Armado estructural",
        en: "Structural assembly",
      },
      {
        es: "Soldadura",
        en: "Welding",
      },
      {
        es: "Inspección y montaje",
        en: "Inspection and installation",
      },
    ],

    processTitle: {
      es: "Proceso de estructuras metálicas",
      en: "Steel structure process",
    },

    processDescription: {
      es:
        "Secuencia representativa de preparación, armado e inspección de una estructura metálica.",
      en:
        "Representative sequence of preparation, assembly and inspection of a steel structure.",
    },

    processSteps: [
      {
        title: {
          es: "Preparación",
          en: "Preparation",
        },
        description: {
          es:
            "Preparación de perfiles y elementos de acuerdo con las dimensiones del proyecto.",
          en:
            "Preparation of profiles and components according to project dimensions.",
        },
        image: structure1,
      },
      {
        title: {
          es: "Armado",
          en: "Assembly",
        },
        description: {
          es:
            "Ensamble de los componentes estructurales previo a su instalación.",
          en:
            "Assembly of structural components prior to installation.",
        },
        image: structure2,
      },
      {
        title: {
          es: "Inspección",
          en: "Inspection",
        },
        description: {
          es:
            "Revisión dimensional y visual del conjunto estructural.",
          en:
            "Dimensional and visual inspection of the structural assembly.",
        },
        image: structure3,
      },
    ],
  },

  {
    slug: "tanques-y-equipos",
    number: "03",

    name: {
      es: "Tanques y equipos",
      en: "Tanks and equipment",
    },

    shortDescription: {
      es:
        "Fabricación, reparación y acondicionamiento de tanques y equipos industriales.",
      en:
        "Fabrication, repair and conditioning of industrial tanks and equipment.",
    },

    intro: {
      es:
        "Atendemos trabajos relacionados con fabricación, mantenimiento y acondicionamiento de tanques y equipos industriales.",
      en:
        "We perform fabrication, maintenance and conditioning work for industrial tanks and equipment.",
    },

    highlights: [
      {
        es: "Preparación de material",
        en: "Material preparation",
      },
      {
        es: "Formado y armado",
        en: "Forming and assembly",
      },
      {
        es: "Soldadura",
        en: "Welding",
      },
      {
        es: "Inspección final",
        en: "Final inspection",
      },
    ],

    processTitle: {
      es: "Proceso de tanques y equipos",
      en: "Tank and equipment process",
    },

    processDescription: {
      es:
        "Proceso representativo de preparación, conformado e inspección de equipos industriales.",
      en:
        "Representative process of preparation, forming and inspection of industrial equipment.",
    },

    processSteps: [
      {
        title: {
          es: "Inspección",
          en: "Inspection",
        },
        description: {
          es:
            "Revisión dimensional y visual del equipo.",
          en:
            "Dimensional and visual inspection of the equipment.",
        },
        image: tank1,
      },
      {
        title: {
          es: "Preparación",
          en: "Preparation",
        },
        description: {
          es:
            "Preparación del material y del equipo previo a la intervención.",
          en:
            "Preparation of materials and equipment before intervention.",
        },
        image: tank2,
      },
      {
        title: {
          es: "Reparación",
          en: "Repair",
        },
        description: {
          es:
            "Reparación del equipo dañado. Incluye soldadura, reemplazo de piezas y ajustes.",
          en:
            "Repair of damaged equipment. Includes welding, part replacement and adjustments.",
        },
        image: tank3,
      },
      {
        title: {
          es: "Resultado",
          en: "Result",
        },
        description: {
          es:
            "Revisión final y liberación del equipo después de la intervención.",
          en:
            "Final inspection and release of the equipment after intervention.",
        },
        image: tank4,
      },
    ],
  },

  {
    slug: "aislamiento-industrial",
    number: "04",

    name: {
      es: "Aislamiento industrial",
      en: "Industrial insulation",
    },

    shortDescription: {
      es:
        "Instalación de aislamiento térmico para tuberías y equipos industriales.",
      en:
        "Installation of thermal insulation for industrial piping and equipment.",
    },

    intro: {
      es:
        "Ejecutamos soluciones de aislamiento industrial orientadas al control térmico, protección del sistema y eficiencia operativa.",
      en:
        "We provide industrial insulation solutions focused on thermal control, system protection and operating efficiency.",
    },

    highlights: [
      {
        es: "Preparación de superficie",
        en: "Surface preparation",
      },
      {
        es: "Corte de aislamiento",
        en: "Insulation cutting",
      },
      {
        es: "Colocación",
        en: "Installation",
      },
      {
        es: "Acabado final",
        en: "Final finish",
      },
    ],

    processTitle: {
      es: "Proceso de aislamiento industrial",
      en: "Industrial insulation process",
    },

    processDescription: {
      es:
        "Secuencia de preparación, colocación y acabado del aislamiento térmico.",
      en:
        "Sequence of preparation, installation and finishing of thermal insulation.",
    },

    processSteps: [
      {
        title: {
          es: "Preparación de superficie",
          en: "Surface preparation",
        },
        description: {
          es:
            "Revisión y preparación del área antes de colocar el material aislante.",
          en:
            "Inspection and preparation of the area before insulation material is installed.",
        },
        image: isolation1,
      },
      {
        title: {
          es: "Corte",
          en: "Cutting",
        },
        description: {
          es:
            "Dimensionado y corte del material de aislamiento conforme a la geometría requerida.",
          en:
            "Sizing and cutting of insulation material according to the required geometry.",
        },
        image: isolation2,
      },
      {
        title: {
          es: "Colocación",
          en: "Installation",
        },
        description: {
          es:
            "Instalación y ajuste del aislamiento sobre la tubería o equipo.",
          en:
            "Installation and adjustment of insulation around piping or equipment.",
        },
        image: isolation3,
      },
      {
        title: {
          es: "Acabado",
          en: "Finishing",
        },
        description: {
          es:
            "Terminación y revisión final del sistema aislado.",
          en:
            "Final finishing and inspection of the insulated system.",
        },
        image: isolation4,
      },
    ],
  },

  {
    slug: "mantenimiento-industrial",
    number: "05",

    name: {
      es: "Mantenimiento industrial",
      en: "Industrial maintenance",
    },

    shortDescription: {
      es:
        "Mantenimiento preventivo y correctivo para equipos e instalaciones industriales.",
      en:
        "Preventive and corrective maintenance for industrial equipment and facilities.",
    },

    intro: {
      es:
        "Realizamos mantenimiento industrial para conservar la operación, corregir fallas y prolongar la vida útil de los equipos.",
      en:
        "We perform industrial maintenance to preserve operation, correct failures and extend equipment service life.",
    },

    highlights: [
      {
        es: "Recepción y evaluación",
        en: "Reception and evaluation",
      },
      {
        es: "Intervención",
        en: "Intervention",
      },
      {
        es: "Reparación",
        en: "Repair",
      },
      {
        es: "Validación final",
        en: "Final validation",
      },
    ],

    processTitle: {
      es: "Proceso de mantenimiento industrial",
      en: "Industrial maintenance process",
    },

    processDescription: {
      es:
        "Una secuencia del mantenimiento aplicado a equipos industriales.",
      en:
        "A sequence of maintenance work performed on industrial equipment.",
    },

    processSteps: [
      {
        title: {
          es: "Recepción y evaluación",
          en: "Reception and evaluation",
        },
        description: {
          es:
            "Revisión inicial del equipo para identificar el alcance de mantenimiento requerido.",
          en:
            "Initial equipment inspection to determine the required maintenance scope.",
        },
        image: maintenance1,
      },
      {
        title: {
          es: "Intervención",
          en: "Intervention",
        },
        description: {
          es:
            "Ejecución de trabajos preventivos o correctivos sobre el equipo.",
          en:
            "Execution of preventive or corrective maintenance work.",
        },
        image: maintenance2,
      },
      {
        title: {
          es: "Resultado",
          en: "Result",
        },
        description: {
          es:
            "Revisión final y liberación del equipo después de la intervención.",
          en:
            "Final inspection and release of the equipment after maintenance.",
        },
        image: maintenance3,
      },
    ],
  },

  {
    slug: "perforacion",
    number: "06",

    name: {
      es: "Perforación",
      en: "Drilling",
    },

    shortDescription: {
      es:
        "Servicio integral de perforación para proyectos industriales y de obra.",
      en:
        "Comprehensive drilling service for industrial and construction projects.",
    },

    intro: {
      es:
        "Ejecutamos trabajos de perforación como un servicio propio, desde la preparación del sitio hasta el seguimiento del avance.",
      en:
        "We perform drilling as an in-house service, from site preparation through project progress monitoring.",
    },

    highlights: [
      {
        es: "Preparación del sitio",
        en: "Site preparation",
      },
      {
        es: "Movilización de equipo",
        en: "Equipment mobilization",
      },
      {
        es: "Perforación",
        en: "Drilling",
      },
      {
        es: "Seguimiento y resultado",
        en: "Progress and result",
      },
    ],

    processTitle: {
      es: "Proceso de perforación",
      en: "Drilling process",
    },

    processDescription: {
      es:
        "Secuencia del trabajo de perforación desde el contexto general del proyecto hasta el resultado.",
      en:
        "Sequence of drilling work from overall project context through final result.",
    },

    processSteps: [
      {
        title: {
          es: "Vista general",
          en: "Project overview",
        },
        description: {
          es:
            "Vista del sitio y condiciones generales donde se desarrolla el trabajo.",
          en:
            "Overall view of the site and conditions where the work is performed.",
        },
        image: drilling1,
      },
      {
        title: {
          es: "Equipo en sitio",
          en: "Equipment on site",
        },
        description: {
          es:
            "Posicionamiento y preparación de la maquinaria para comenzar la operación.",
          en:
            "Positioning and preparation of machinery before drilling begins.",
        },
        image: drilling2,
      },
      {
        title: {
          es: "Perforación",
          en: "Drilling",
        },
        description: {
          es:
            "Ejecución del proceso de perforación conforme al alcance del proyecto.",
          en:
            "Execution of drilling operations according to project requirements.",
        },
        image: drilling3,
      },
      {
        title: {
          es: "Resultado",
          en: "Result",
        },
        description: {
          es:
            "Vista del avance o resultado obtenido durante los trabajos.",
          en:
            "View of the progress or result achieved during the work.",
        },
        image: drilling4,
      },
    ],
  },
];

export default services;