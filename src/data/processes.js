export const processes = [
  {
    id: "piping",

    serviceId: "piping",

    title: {
      es:
        "Proceso de fabricación de tubería",
      en:
        "Piping fabrication process",
    },

    description: {
      es:
        "Etapas representativas para la preparación, formación, soldadura, acabado, inspección y entrega de tubería.",
      en:
        "Representative stages for preparation, forming, welding, finishing, inspection and delivery of piping.",
    },

    stages: [
      {
        id: "piping-preparation",

        number: "01",

        title: {
          es: "Preparación",
          en: "Preparation",
        },

        description: {
          es:
            "Recepción del material, inspección inicial y preparación para el proceso de fabricación.",
          en:
            "Material reception, initial inspection and preparation for fabrication.",
        },

        steps: [
          {
            es: "Lámina",
            en: "Sheet material",
          },
          {
            es: "Inspección",
            en: "Inspection",
          },
          {
            es: "Corte",
            en: "Cutting",
          },
        ],

        image:
          "/images/processes/piping/01-preparation.jpg",
      },

      {
        id: "piping-forming",

        number: "02",

        title: {
          es: "Formación",
          en: "Forming",
        },

        description: {
          es:
            "Conformado del material hasta obtener la geometría requerida de la tubería.",
          en:
            "Material forming to obtain the required pipe geometry.",
        },

        steps: [
          {
            es:
              "Tren de laminado",
            en:
              "Rolling mill",
          },
          {
            es:
              "Formado en frío",
            en:
              "Cold forming",
          },
          {
            es:
              "Soldadura GTAW",
            en:
              "GTAW welding",
          },
          {
            es:
              "Planchado mecánico",
            en:
              "Mechanical straightening",
          },
        ],

        image:
          "/images/processes/piping/02-forming.jpg",
      },

      {
        id: "piping-control",

        number: "03",

        title: {
          es:
            "Control y tratamiento",
          en:
            "Control and treatment",
        },

        description: {
          es:
            "Verificación de soldaduras, tratamiento y calibración dimensional.",
          en:
            "Weld verification, treatment and dimensional calibration.",
        },

        steps: [
          {
            es:
              "Prueba no destructiva",
            en:
              "Non-destructive testing",
          },
          {
            es:
              "Tratamiento térmico",
            en:
              "Heat treatment",
          },
          {
            es: "Calibrado",
            en: "Calibration",
          },
          {
            es:
              "Corte a medida",
            en:
              "Cut to length",
          },
        ],

        image:
          "/images/processes/piping/03-control.jpg",
      },

      {
        id: "piping-finishing",

        number: "04",

        title: {
          es: "Acabado",
          en: "Finishing",
        },

        description: {
          es:
            "Procesos de limpieza y acabado superficial interior y exterior.",
          en:
            "Interior and exterior surface cleaning and finishing processes.",
        },

        steps: [
          {
            es: "Decapado #1",
            en: "Pickling #1",
          },
          {
            es:
              "Pulido interior",
            en:
              "Internal polishing",
          },
          {
            es:
              "Pulido exterior",
            en:
              "External polishing",
          },
          {
            es: "Decapado #2",
            en: "Pickling #2",
          },
        ],

        image:
          "/images/processes/piping/04-finishing.jpg",
      },

      {
        id: "piping-quality",

        number: "05",

        title: {
          es:
            "Calidad y entrega",
          en:
            "Quality and delivery",
        },

        description: {
          es:
            "Pruebas finales, identificación, almacenamiento y liberación del producto.",
          en:
            "Final tests, identification, storage and product release.",
        },

        steps: [
          {
            es:
              "Prueba hidrostática",
            en:
              "Hydrostatic test",
          },
          {
            es:
              "Prueba de cámara salina",
            en:
              "Salt spray test",
          },
          {
            es:
              "Pruebas de tensión",
            en:
              "Tensile testing",
          },
          {
            es:
              "Inspección final",
            en:
              "Final inspection",
          },
          {
            es: "Rotulado",
            en: "Marking",
          },
          {
            es: "Almacenaje",
            en: "Storage",
          },
          {
            es: "Transporte",
            en: "Transportation",
          },
        ],

        image:
          "/images/processes/piping/05-quality.jpg",
      },
    ],
  },

  {
    id: "structures",

    serviceId:
      "structures",

    title: {
      es:
        "Proceso de fabricación de estructuras",
      en:
        "Structural fabrication process",
    },

    description: {
      es:
        "Proceso representativo desde la habilitación del material hasta el montaje de la estructura terminada.",
      en:
        "Representative process from material preparation through installation of the completed structure.",
    },

    stages: [
      {
        id:
          "structures-preparation",

        number: "01",

        title: {
          es:
            "Preparación de material",
          en:
            "Material preparation",
        },

        steps: [
          {
            es:
              "Recepción de material",
            en:
              "Material reception",
          },
          {
            es: "Trazado",
            en: "Layout",
          },
          {
            es: "Corte",
            en: "Cutting",
          },
        ],

        image:
          "/images/processes/structures/01-preparation.jpg",
      },

      {
        id:
          "structures-assembly",

        number: "02",

        title: {
          es:
            "Armado y fabricación",
          en:
            "Assembly and fabrication",
        },

        steps: [
          {
            es:
              "Presentación de elementos",
            en:
              "Component fitting",
          },
          {
            es: "Armado",
            en: "Assembly",
          },
          {
            es: "Soldadura",
            en: "Welding",
          },
        ],

        image:
          "/images/processes/structures/02-assembly.jpg",
      },

      {
        id:
          "structures-inspection",

        number: "03",

        title: {
          es:
            "Inspección",
          en:
            "Inspection",
        },

        steps: [
          {
            es:
              "Inspección visual",
            en:
              "Visual inspection",
          },
          {
            es:
              "Control dimensional",
            en:
              "Dimensional control",
          },
          {
            es:
              "Verificación de soldadura",
            en:
              "Weld verification",
          },
        ],

        image:
          "/images/processes/structures/03-inspection.jpg",
      },

      {
        id:
          "structures-finishing",

        number: "04",

        title: {
          es:
            "Recubrimiento y acabado",
          en:
            "Coating and finishing",
        },

        steps: [
          {
            es:
              "Preparación superficial",
            en:
              "Surface preparation",
          },
          {
            es:
              "Recubrimiento anticorrosivo",
            en:
              "Anti-corrosion coating",
          },
          {
            es: "Pintura",
            en: "Painting",
          },
        ],

        image:
          "/images/processes/structures/04-finishing.jpg",
      },

      {
        id:
          "structures-installation",

        number: "05",

        title: {
          es:
            "Transporte y montaje",
          en:
            "Transportation and installation",
        },

        steps: [
          {
            es: "Acarreo",
            en: "Transportation",
          },
          {
            es: "Izaje",
            en: "Lifting",
          },
          {
            es:
              "Montaje en sitio",
            en:
              "On-site installation",
          },
        ],

        image:
          "/images/processes/structures/05-installation.jpg",
      },
    ],
  },

  {
    id: "tanks",

    serviceId: "tanks",

    title: {
      es:
        "Proceso de fabricación y mantenimiento de tanques",
      en:
        "Tank fabrication and maintenance process",
    },

    description: {
      es:
        "Etapas representativas utilizadas en fabricación, reparación y mantenimiento de tanques y equipos industriales.",
      en:
        "Representative stages used in fabrication, repair and maintenance of tanks and industrial equipment.",
    },

    stages: [
      {
        id:
          "tanks-inspection",

        number: "01",

        title: {
          es:
            "Inspección inicial",
          en:
            "Initial inspection",
        },

        steps: [
          {
            es:
              "Evaluación visual",
            en:
              "Visual assessment",
          },
          {
            es:
              "Identificación de áreas",
            en:
              "Area identification",
          },
          {
            es:
              "Definición de intervención",
            en:
              "Work definition",
          },
        ],

        image:
          "/images/processes/tanks/01-inspection.jpg",
      },

      {
        id:
          "tanks-preparation",

        number: "02",

        title: {
          es:
            "Preparación",
          en:
            "Preparation",
        },

        steps: [
          {
            es:
              "Limpieza mecánica",
            en:
              "Mechanical cleaning",
          },
          {
            es: "Resanación",
            en: "Restoration",
          },
          {
            es:
              "Preparación superficial",
            en:
              "Surface preparation",
          },
        ],

        image:
          "/images/processes/tanks/02-preparation.jpg",
      },

      {
        id:
          "tanks-repair",

        number: "03",

        title: {
          es:
            "Reparación y soldadura",
          en:
            "Repair and welding",
        },

        steps: [
          {
            es:
              "Reparación de elementos",
            en:
              "Component repair",
          },
          {
            es: "Soldadura",
            en: "Welding",
          },
          {
            es:
              "Revisión de uniones",
            en:
              "Joint inspection",
          },
        ],

        image:
          "/images/processes/tanks/03-repair.jpg",
      },

      {
        id:
          "tanks-coating",

        number: "04",

        title: {
          es:
            "Recubrimiento",
          en:
            "Coating",
        },

        steps: [
          {
            es:
              "Aplicación de primario",
            en:
              "Primer application",
          },
          {
            es:
              "Aplicación de pintura",
            en:
              "Painting",
          },
          {
            es:
              "Inspección de recubrimiento",
            en:
              "Coating inspection",
          },
        ],

        image:
          "/images/processes/tanks/04-coating.jpg",
      },

      {
        id:
          "tanks-final",

        number: "05",

        title: {
          es:
            "Inspección y liberación",
          en:
            "Inspection and release",
        },

        steps: [
          {
            es:
              "Inspección final",
            en:
              "Final inspection",
          },
          {
            es:
              "Verificación de calidad",
            en:
              "Quality verification",
          },
          {
            es:
              "Entrega del equipo",
            en:
              "Equipment delivery",
          },
        ],

        image:
          "/images/processes/tanks/05-final.jpg",
      },
    ],
  },

  {
    id: "drilling",

    serviceId:
      "drilling",

    title: {
      es:
        "Proceso de perforación",
      en:
        "Drilling process",
    },

    description: {
      es:
        "Etapas generales para la planeación, ejecución, control e inspección de trabajos de perforación.",
      en:
        "General stages for planning, execution, control and inspection of drilling work.",
    },

    /*
      NOTA:
      La estructura queda lista,
      pero sustituiremos/afinaremos
      estos pasos cuando tengamos
      la lámina específica de
      perforación del material
      corporativo.
    */

    stages: [
      {
        id:
          "drilling-planning",

        number: "01",

        title: {
          es:
            "Planeación",
          en:
            "Planning",
        },

        steps: [
          {
            es:
              "Revisión del proyecto",
            en:
              "Project review",
          },
          {
            es:
              "Identificación del punto de trabajo",
            en:
              "Work-point identification",
          },
          {
            es:
              "Selección de equipo",
            en:
              "Equipment selection",
          },
        ],

        image:
          "/images/processes/drilling/01-planning.jpg",
      },

      {
        id:
          "drilling-preparation",

        number: "02",

        title: {
          es:
            "Preparación de área",
          en:
            "Site preparation",
        },

        steps: [
          {
            es:
              "Acondicionamiento",
            en:
              "Site preparation",
          },
          {
            es: "Trazado",
            en: "Layout",
          },
          {
            es:
              "Posicionamiento",
            en:
              "Positioning",
          },
        ],

        image:
          "/images/processes/drilling/02-preparation.jpg",
      },

      {
        id:
          "drilling-execution",

        number: "03",

        title: {
          es:
            "Perforación",
          en:
            "Drilling",
        },

        steps: [
          {
            es:
              "Ejecución de perforación",
            en:
              "Drilling execution",
          },
          {
            es:
              "Control de profundidad",
            en:
              "Depth control",
          },
          {
            es:
              "Control dimensional",
            en:
              "Dimensional control",
          },
        ],

        image:
          "/images/processes/drilling/03-drilling.jpg",
      },

      {
        id:
          "drilling-verification",

        number: "04",

        title: {
          es:
            "Verificación",
          en:
            "Verification",
        },

        steps: [
          {
            es:
              "Inspección del trabajo",
            en:
              "Work inspection",
          },
          {
            es:
              "Verificación dimensional",
            en:
              "Dimensional verification",
          },
          {
            es:
              "Registro de resultados",
            en:
              "Results recording",
          },
        ],

        image:
          "/images/processes/drilling/04-verification.jpg",
      },

      {
        id:
          "drilling-release",

        number: "05",

        title: {
          es:
            "Liberación",
          en:
            "Release",
        },

        steps: [
          {
            es:
              "Limpieza del área",
            en:
              "Area cleanup",
          },
          {
            es:
              "Inspección final",
            en:
              "Final inspection",
          },
          {
            es:
              "Entrega del trabajo",
            en:
              "Work delivery",
          },
        ],

        image:
          "/images/processes/drilling/05-release.jpg",
      },
    ],
  },

  {
    id: "maintenance",

    serviceId:
      "maintenance",

    title: {
      es:
        "Proceso de mantenimiento y montaje",
      en:
        "Maintenance and installation process",
    },

    description: {
      es:
        "Flujo general para mantenimiento, reparación y montaje de equipos e instalaciones industriales.",
      en:
        "General workflow for maintenance, repair and installation of industrial equipment and facilities.",
    },

    stages: [
      {
        id:
          "maintenance-inspection",

        number: "01",

        title: {
          es:
            "Evaluación inicial",
          en:
            "Initial assessment",
        },

        steps: [
          {
            es:
              "Inspección visual",
            en:
              "Visual inspection",
          },
          {
            es:
              "Identificación de requerimientos",
            en:
              "Requirement identification",
          },
        ],

        image:
          "/images/processes/maintenance/01-inspection.jpg",
      },

      {
        id:
          "maintenance-preparation",

        number: "02",

        title: {
          es:
            "Preparación",
          en:
            "Preparation",
        },

        steps: [
          {
            es:
              "Planeación de trabajo",
            en:
              "Work planning",
          },
          {
            es:
              "Preparación de equipo",
            en:
              "Equipment preparation",
          },
        ],

        image:
          "/images/processes/maintenance/02-preparation.jpg",
      },

      {
        id:
          "maintenance-execution",

        number: "03",

        title: {
          es:
            "Ejecución",
          en:
            "Execution",
        },

        steps: [
          {
            es:
              "Reparación",
            en:
              "Repair",
          },
          {
            es:
              "Montaje",
            en:
              "Installation",
          },
          {
            es:
              "Soldadura",
            en:
              "Welding",
          },
        ],

        image:
          "/images/processes/maintenance/03-execution.jpg",
      },

      {
        id:
          "maintenance-quality",

        number: "04",

        title: {
          es:
            "Control de calidad",
          en:
            "Quality control",
        },

        steps: [
          {
            es:
              "Inspección",
            en:
              "Inspection",
          },
          {
            es:
              "Verificación",
            en:
              "Verification",
          },
        ],

        image:
          "/images/processes/maintenance/04-quality.jpg",
      },

      {
        id:
          "maintenance-delivery",

        number: "05",

        title: {
          es:
            "Entrega",
          en:
            "Delivery",
        },

        steps: [
          {
            es:
              "Liberación final",
            en:
              "Final release",
          },
          {
            es:
              "Entrega al cliente",
            en:
              "Client handover",
          },
        ],

        image:
          "/images/processes/maintenance/05-delivery.jpg",
      },
    ],
  },
]

export const getProcessByService =
  (serviceId) => {
    return processes.find(
      (process) =>
        process.serviceId ===
        serviceId
    )
  }