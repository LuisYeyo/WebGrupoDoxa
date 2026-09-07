import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";

function Doxa() {
  const { t } = useLanguage();

  return (
    <main className="company-page">

      <section className="company-hero">

        <div className="company-container company-hero-grid">

          <div>
            <p className="company-eyebrow">
              01 / DOXA
            </p>

            <h1>
              Grupo Industrial DOXA
            </h1>

            <p className="company-hero-subtitle">
              {t(
                "Ingeniería · Fabricación · Mantenimiento",
                "Engineering · Fabrication · Maintenance"
              )}
            </p>
          </div>

          <p className="company-hero-description">
            {t(
              "Empresa especializada en soluciones industriales, fabricación metalmecánica, mantenimiento y ejecución de proyectos para distintos sectores.",
              "Company specialized in industrial solutions, metal fabrication, maintenance and project execution across multiple sectors."
            )}
          </p>

        </div>

      </section>

      <section className="company-content-section">

        <div className="company-container company-content-grid">

          <div>
            <p className="company-eyebrow">
              {t("CAPACIDADES", "CAPABILITIES")}
            </p>

            <h2>
              {t(
                "Soluciones integrales para proyectos industriales.",
                "Integrated solutions for industrial projects."
              )}
            </h2>
          </div>

          <div className="company-capability-list">

            <span>{t("Fabricación", "Fabrication")}</span>
            <span>{t("Tubería industrial", "Industrial piping")}</span>
            <span>{t("Estructuras metálicas", "Steel structures")}</span>
            <span>{t("Tanques y equipos", "Tanks and equipment")}</span>
            <span>{t("Mantenimiento", "Maintenance")}</span>

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
              {t("TRABAJEMOS JUNTOS", "LET'S WORK TOGETHER")}
            </p>

            <h2>
              {t(
                "Conoce cómo podemos apoyar tu proyecto.",
                "See how we can support your project."
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

export default Doxa;