import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";

function DoxaMaintenance() {
  const { t } = useLanguage();

  return (
    <main className="company-page">

      <section className="company-hero">

        <div className="company-container company-hero-grid">

          <div>
            <p className="company-eyebrow">
              04 / DOXA
            </p>

            <h1>
              Mantenimiento Industrial DOXA
            </h1>

            <p className="company-hero-subtitle">
              {t(
                "Mantenimiento · Reparación · Servicios industriales",
                "Maintenance · Repair · Industrial services"
              )}
            </p>
          </div>

          <p className="company-hero-description">
            {t(
              "Empresa especializada en mantenimiento preventivo y correctivo, reparación e intervención de equipos e instalaciones industriales.",
              "Company specialized in preventive and corrective maintenance, repair and servicing of industrial equipment and facilities."
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
                "Mantener la operación y extender la vida útil de los equipos.",
                "Maintaining operations and extending equipment service life."
              )}
            </h2>
          </div>

          <div className="company-capability-list">

            <span>{t("Mantenimiento preventivo", "Preventive maintenance")}</span>
            <span>{t("Mantenimiento correctivo", "Corrective maintenance")}</span>
            <span>{t("Reparación", "Repair")}</span>
            <span>{t("Sandblast y pintura", "Sandblasting and painting")}</span>

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
              {t("MANTENIMIENTO", "MAINTENANCE")}
            </p>

            <h2>
              {t(
                "Cuéntanos qué equipo necesita atención.",
                "Tell us which equipment needs attention."
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

export default DoxaMaintenance;