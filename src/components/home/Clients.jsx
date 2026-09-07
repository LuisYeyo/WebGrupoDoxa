import {
  useLanguage,
} from "../../context/LanguageContext";

const logoFiles =
  import.meta.glob(
    "../../assets/logos/*.{png,jpg,jpeg,svg,webp}",
    {
      eager: true,
      query: "?url",
      import: "default",
    }
  );

const clients = [
  {
    id: "chemours",
    name: "CHEMOURS",
    file: "chemours.jpg",
  },

  {
    id: "cryoinfra",
    name: "CRYOINFRA",
    file: "cryoinfra.jpg",
  },

  {
    id: "dynasol",
    name: "DYNASOL",
    file: "dynasol.jpg",
  },

  {
    id: "glass-glass",
    name: "GLASS & GLASS",
    file: "glass&glass.jpg",
  },

  {
    id: "hascor",
    name: "HASCOR",
    file: "hascor.jpg",
  },

  {
    id: "mcdermott",
    name: "McDERMOTT",
    file: "mcdermott.jpg",
  },

  {
    id: "municipio-altamira",
    name: "MUNICIPIO DE ALTAMIRA",
    file: "municipio-altamira.jpg",
  },

  {
    id: "perenco",
    name: "PERENCO",
    file: "perenco.jpg",
  },

  {
    id: "velamar",
    name: "VELAMAR",
    file: "velamar.jpg",
  },

  {
    id: "vibrantz",
    name: "VIBRANTZ",
    file: "vibrants.jpg",
  },

  {
    id: "vopak",
    name: "VOPAK",
    file: "vopak.jpg",
  },
];

const rowOne = [
  clients[0],
  clients[1],
  clients[2],
  clients[3],
  clients[4],
  clients[5],
];

const rowTwo = [
  clients[6],
  clients[7],
  clients[8],
  clients[9],
  clients[10],
];

function getLogo(fileName) {
  const match =
    Object.entries(
      logoFiles
    ).find(([path]) =>
      path.endsWith(
        `/${fileName}`
      )
    );

  return match
    ? match[1]
    : null;
}

function Clients() {
  const {
    t,
  } = useLanguage();

  return (
    <section className="clients-section">

      <div className="clients-heading">

        <div>

          <p className="clients-eyebrow">
            {t(
              "EXPERIENCIA",
              "EXPERIENCE"
            )}
          </p>

          <h2>
            {t(
              <>
                Empresas que han
                <br />
                confiado en nosotros.
              </>,
              <>
                Companies that have
                <br />
                trusted our work.
              </>
            )}
          </h2>

        </div>

        <p className="clients-description">
          {t(
            "Nuestra experiencia incluye proyectos y trabajos realizados para empresas y organizaciones de distintos sectores industriales.",
            "Our experience includes projects and work delivered for companies and organizations across different industrial sectors."
          )}
        </p>

      </div>

      <div className="clients-marquee-container">

        <LogoRow
          clients={
            rowOne
          }
          direction="left"
        />

        <LogoRow
          clients={
            rowTwo
          }
          direction="right"
        />

      </div>

      <p className="clients-note">
        {t(
          "Una selección de clientes y organizaciones presentes en la experiencia de Grupo Industrial DOXA.",
          "A selection of clients and organizations represented in Grupo Industrial DOXA's experience."
        )}
      </p>

    </section>
  );
}

function LogoRow({
  clients,
  direction,
}) {
  const repeatedClients = [
    ...clients,
    ...clients,
    ...clients,
  ];

  return (
    <div
      className={`
        clients-marquee

        ${
          direction ===
          "right"
            ? "clients-marquee--right"
            : "clients-marquee--left"
        }
      `}
    >
      <div className="clients-track">

        {repeatedClients.map(
          (
            client,
            index
          ) => {
            const logo =
              getLogo(
                client.file
              );

            return (
              <div
                key={`${client.id}-${index}`}
                className="client-logo-card"
              >

                {logo ? (
                  <img
                    src={logo}
                    alt={`Logo ${client.name}`}
                    className="client-logo-image"
                    loading="lazy"
                  />
                ) : (
                  <span className="client-logo-fallback">
                    {
                      client.name
                    }
                  </span>
                )}

              </div>
            );
          }
        )}

      </div>
    </div>
  );
}

export default Clients;