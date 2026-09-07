import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react"

import {
  NavLink,
} from "react-router-dom"

import {
  useLanguage,
} from "../../context/LanguageContext"


function Footer() {
  const {
    t,
  } = useLanguage()

  const year =
    new Date().getFullYear()


  /*
    IMPORTANTE:
    Después reemplaza esta URL
    por la de tu LinkedIn real.
  */

  const linkedinUrl =
    "www.linkedin.com/in/luis-eduardo-flores-peña"


  return (
    <footer className="doxa-footer">

      <div className="doxa-footer-container doxa-footer-grid">


        {/* =================================================
            EMPRESA
        ================================================= */}

        <div>

          <p className="doxa-footer-brand">
            DOXA
          </p>


          <p className="doxa-footer-description">
            {t(
              "Soluciones de ingeniería, fabricación, mantenimiento y construcción para proyectos industriales.",
              "Engineering, fabrication, maintenance and construction solutions for industrial projects."
            )}
          </p>


          <p className="doxa-footer-group">
            Grupo Industrial DOXA
          </p>

        </div>


        {/* =================================================
            NAVEGACIÓN
        ================================================= */}

        <div>

          <p className="doxa-footer-heading">
            {t(
              "Navegación",
              "Navigation"
            )}
          </p>


          <nav className="doxa-footer-navigation">

            <NavLink to="/">
              {t(
                "Inicio",
                "Home"
              )}
            </NavLink>


            <NavLink to="/grupo">
              {t(
                "Grupo",
                "Group"
              )}
            </NavLink>


            <NavLink to="/servicios">
              {t(
                "Servicios",
                "Services"
              )}
            </NavLink>


            <NavLink to="/infraestructura">
              {t(
                "Infraestructura",
                "Infrastructure"
              )}
            </NavLink>


            <NavLink to="/renta">
              {t(
                "Renta",
                "Rental"
              )}
            </NavLink>


            <NavLink to="/proyectos">
              {t(
                "Proyectos",
                "Projects"
              )}
            </NavLink>


            <NavLink to="/contacto">
              {t(
                "Contacto",
                "Contact"
              )}
            </NavLink>

          </nav>

        </div>


        {/* =================================================
            CONTACTO
        ================================================= */}

        <div>

          <p className="doxa-footer-heading">
            {t(
              "Contacto",
              "Contact"
            )}
          </p>


          <div className="doxa-footer-contact">


            {/* UBICACIÓN */}

            <div className="doxa-footer-contact-row">

              <MapPin size={18} />

              <p>
                Altamira,
                Tamaulipas,
                México
              </p>

            </div>


            {/* TELÉFONO — SOLO INFORMACIÓN */}

            <div className="doxa-footer-contact-row">

              <Phone size={18} />

              <p>
                833 328 5935
              </p>

            </div>


            {/* CORREO — SOLO INFORMACIÓN */}

            <div className="doxa-footer-contact-row">

              <Mail size={18} />

              <p className="doxa-footer-email">
                ramiro.robles@grupoindustrialdoxa.com
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* ===================================================
          PARTE INFERIOR
      =================================================== */}

      <div className="doxa-footer-bottom">

        <div className="doxa-footer-container doxa-footer-bottom-inner">


          <p>
            © {year} Grupo Industrial DOXA.
            {" "}
            {t(
              "Todos los derechos reservados.",
              "All rights reserved."
            )}
          </p>


          <div className="doxa-footer-legal">

            <NavLink
              to="/aviso-de-privacidad"
              className="doxa-footer-privacy"
            >
              {t(
                "Aviso de privacidad",
                "Privacy notice"
              )}
            </NavLink>


            <span className="doxa-footer-separator">
              •
            </span>


            <p className="doxa-footer-developer">

              {t(
                "Desarrollado por",
                "Developed by"
              )}

              {" "}

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Luis Flores
              </a>

            </p>

          </div>

        </div>

      </div>

    </footer>
  )
}


export default Footer