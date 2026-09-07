import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";

function Secmimar() {
  const { t } = useLanguage();

  return (
    <main className="company-page">

      <section className="company-hero">

        <div className="company-container company-hero-grid">

          <div>
            <p className="company-eyebrow">
              03 / SECMIMAR
            </p>

            <h1>
              SECMIMAR
            </h1>

            <p className="company-hero-subtitle">
              {t(
                "Fabricación · Equipos industriales · Soldadura",
                "Fabrication · Industrial equipment · Welding"
              )}
            </p>
          </div>

          <p className="company-hero-description">
            {t(
              "Empresa vinculada a trabajos de fabricación, soldadura y atención de equipos industriales dentro de la capacidad operativa del grupo.",
              "Company involved in fabrication, welding and industrial equipment work within the group's operational capacity."
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
                "Soporte para fabricación y equipos industriales.",
                "Support for fabrication and industrial equipment."
              )}
            </h2>
          </div>

          <div className="company-capability-list">

            <span>{t("Soldadura", "Welding")}</span>
            <span>{t("Fabricación", "Fabrication")}</span>
            <span>{t("Equipos industriales", "Industrial equipment")}</span>
            <span>{t("Preparación superficial", "Surface preparation")}</span>

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
              SECMIMAR
            </p>

            <h2>
              {t(
                "Conoce nuestras capacidades industriales.",
                "Explore our industrial capabilities."
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

export default Secmimar;