import {
  ArrowLeft,
  ShieldCheck,
} from "lucide-react"

import {
  Link,
} from "react-router-dom"

import {
  useLanguage,
} from "../context/LanguageContext"

import PageReveal from "../components/ui/PageReveal"


function Privacy() {
  const {
    t,
  } = useLanguage()


  return (
    <main className="privacy-page">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="privacy-hero">

        <div className="privacy-container">


          {/* VOLVER */}

          <PageReveal
            delay={0.04}
            y={14}
          >

            <Link
              to="/"
              className="privacy-back"
            >
              <ArrowLeft
                size={16}
              />

              {t(
                "Volver al inicio",
                "Back to home"
              )}
            </Link>

          </PageReveal>


          {/* ICONO */}

          <PageReveal
            delay={0.12}
            y={18}
          >

            <div className="privacy-icon">

              <ShieldCheck
                size={28}
              />

            </div>

          </PageReveal>


          {/* TÍTULO */}

          <PageReveal
            delay={0.2}
            y={34}
          >

            <p className="privacy-eyebrow">
              {t(
                "PRIVACIDAD",
                "PRIVACY"
              )}
            </p>


            <h1>
              {t(
                "Aviso de privacidad",
                "Privacy notice"
              )}
            </h1>

          </PageReveal>


          {/* INTRODUCCIÓN */}

          <PageReveal
            delay={0.3}
            y={20}
          >

            <p className="privacy-intro">
              {t(
                "Grupo Industrial DOXA reconoce la importancia de proteger la información personal de clientes, proveedores, colaboradores y usuarios de este sitio web.",
                "Grupo Industrial DOXA recognizes the importance of protecting the personal information of clients, suppliers, collaborators and website users."
              )}
            </p>

          </PageReveal>

        </div>

      </section>


      {/* =====================================================
          DOCUMENTO
      ===================================================== */}

      <section className="privacy-content-section">

        <div className="privacy-container">

          <div className="privacy-document">


            {/* =================================================
                01
            ================================================= */}

            <PageReveal
              delay={0.04}
              y={22}
            >

              <PrivacySection
                number="01"
                title={t(
                  "Responsable de los datos personales",
                  "Personal data controller"
                )}
              >

                <p>
                  {t(
                    "Grupo Industrial DOXA será responsable del tratamiento y protección de los datos personales que, en su caso, sean proporcionados a través de los medios de contacto disponibles en este sitio web.",
                    "Grupo Industrial DOXA will be responsible for the processing and protection of personal data that may be provided through the contact methods available on this website."
                  )}
                </p>

              </PrivacySection>

            </PageReveal>


            {/* =================================================
                02
            ================================================= */}

            <PageReveal
              delay={0.07}
              y={22}
            >

              <PrivacySection
                number="02"
                title={t(
                  "Datos que podemos recibir",
                  "Information we may receive"
                )}
              >

                <p>
                  {t(
                    "Al utilizar el formulario de contacto o solicitar una cotización, el usuario puede proporcionar información como nombre, empresa, correo electrónico, teléfono y datos generales relacionados con su proyecto.",
                    "When using the contact form or requesting a quote, users may provide information such as name, company, email address, phone number and general information related to their project."
                  )}
                </p>

              </PrivacySection>

            </PageReveal>


            {/* =================================================
                03
            ================================================= */}

            <PageReveal
              delay={0.1}
              y={22}
            >

              <PrivacySection
                number="03"
                title={t(
                  "Finalidades del tratamiento",
                  "Purposes of processing"
                )}
              >

                <p>
                  {t(
                    "La información recibida a través del sitio podrá utilizarse para atender solicitudes de contacto, evaluar requerimientos de proyectos, elaborar o dar seguimiento a cotizaciones y establecer comunicación relacionada con los servicios solicitados.",
                    "Information received through the website may be used to respond to contact requests, evaluate project requirements, prepare or follow up on quotations and communicate regarding requested services."
                  )}
                </p>

              </PrivacySection>

            </PageReveal>


            {/* =================================================
                04
            ================================================= */}

            <PageReveal
              delay={0.13}
              y={22}
            >

              <PrivacySection
                number="04"
                title={t(
                  "Uso y protección de la información",
                  "Use and protection of information"
                )}
              >

                <p>
                  {t(
                    "Grupo Industrial DOXA procurará utilizar la información únicamente para las finalidades relacionadas con la comunicación y atención de las solicitudes recibidas, implementando medidas razonables para evitar su acceso, uso o divulgación no autorizados.",
                    "Grupo Industrial DOXA will seek to use the information only for purposes related to communication and handling of received requests, implementing reasonable measures to prevent unauthorized access, use or disclosure."
                  )}
                </p>

              </PrivacySection>

            </PageReveal>


            {/* =================================================
                05
            ================================================= */}

            <PageReveal
              delay={0.16}
              y={22}
            >

              <PrivacySection
                number="05"
                title={t(
                  "Transferencia de información",
                  "Information transfers"
                )}
              >

                <p>
                  {t(
                    "La información proporcionada no deberá utilizarse para fines distintos a los necesarios para atender la relación comercial o de contacto correspondiente, salvo cuando exista una obligación legal o autorización aplicable.",
                    "Information provided should not be used for purposes other than those necessary to handle the corresponding commercial or contact relationship, except where required by law or applicable authorization."
                  )}
                </p>

              </PrivacySection>

            </PageReveal>


            {/* =================================================
                06
            ================================================= */}

            <PageReveal
              delay={0.19}
              y={22}
            >

              <PrivacySection
                number="06"
                title={t(
                  "Derechos sobre los datos personales",
                  "Rights regarding personal data"
                )}
              >

                <p>
                  {t(
                    "Las personas podrán solicitar información relacionada con el tratamiento de sus datos personales o realizar solicitudes de acceso, rectificación, cancelación u oposición mediante los medios de contacto de Grupo Industrial DOXA.",
                    "Individuals may request information regarding the processing of their personal data or submit access, correction, cancellation or objection requests through Grupo Industrial DOXA's contact channels."
                  )}
                </p>

              </PrivacySection>

            </PageReveal>


            {/* =================================================
                07
            ================================================= */}

            <PageReveal
              delay={0.22}
              y={22}
            >

              <PrivacySection
                number="07"
                title={t(
                  "Cambios al aviso de privacidad",
                  "Changes to this privacy notice"
                )}
              >

                <p>
                  {t(
                    "Este aviso podrá actualizarse cuando existan cambios en las prácticas de tratamiento de información, en los servicios ofrecidos o en las disposiciones legales aplicables.",
                    "This notice may be updated when there are changes to information-processing practices, services offered or applicable legal requirements."
                  )}
                </p>

              </PrivacySection>

            </PageReveal>


          </div>

        </div>

      </section>

    </main>
  )
}


/* =========================================================
   SECCIÓN DEL DOCUMENTO
========================================================= */

function PrivacySection({
  number,
  title,
  children,
}) {
  return (
    <article className="privacy-section">

      <div className="privacy-section-heading">

        <span>
          {number}
        </span>

        <h2>
          {title}
        </h2>

      </div>


      <div className="privacy-section-body">

        {children}

      </div>

    </article>
  )
}


export default Privacy