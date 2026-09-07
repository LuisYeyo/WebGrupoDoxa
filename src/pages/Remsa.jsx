import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";

function Remsa() {
  const { t } = useLanguage();

  return (
    <main className="company-page">

      <section className="company-hero">

        <div className="company-container company-hero-grid">

          <div>
            <p className="company-eyebrow">
              02 / REMSA
            </p>

            <h1>
              Grupo Industrial REMSA
            </h1>

            <p className="company-hero-subtitle">
              {t(
                "Fabricación · Tubería · Estructuras",
                "Fabrication · Piping · Structures"
              )}
            </p>
          </div>

          <p className="company-hero-description">
            {t(
              "Empresa enfocada en fabricación metalmecánica, tubería, estructuras y trabajos industriales desarrollados desde los talleres de Grupo Industrial DOXA.",
              "Company focused on metal fabrication, piping, structures and industrial work carried out through Grupo Industrial DOXA's workshops."
            )}
          </p>

        </div>

      </section>

      <section className="company-content-section">

        <div className="company-container company-content-grid">

          <div>
            <p className="company-eyebrow">
              {t("ESPECIALIDAD", "SPECIALTY")}
            </p>

            <h2>
              {t(
                "Capacidad de fabricación para proyectos metalmecánicos.",
                "Fabrication capacity for metalworking projects."
              )}
            </h2>
          </div>

          <div className="company-capability-list">

            <span>{t("Acero inoxidable", "Stainless steel")}</span>
            <span>{t("Acero al carbón", "Carbon steel")}</span>
            <span>{t("Tubería", "Piping")}</span>
            <span>{t("Estructuras metálicas", "Steel structures")}</span>
            <span>{t("Montaje", "Installation")}</span>

          </div>

        </div>

      </section>

      <CompanyCTA t={t} />

    </main>
  );
}

function CompanyCTA({ t }) {
  return (
    <section className="company-cta-section">
      <div className="company-container">
        <div className="company-cta">

          <div>
            <p className="company-eyebrow">
              {t("REMSA", "REMSA")}
            </p>

            <h2>
              {t(
                "¿Tienes un proyecto de fabricación?",
                "Do you have a fabrication project?"
              )}
            </h2>
          </div>

          <Link to="/contacto" className="company-cta-button">
            {t("Solicitar cotización", "Request a quote")}
            <ArrowRight size={17} />
          </Link>

        </div>
      </div>
    </section>
  );
}

export default Remsa;