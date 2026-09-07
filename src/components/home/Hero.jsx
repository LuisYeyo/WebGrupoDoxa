import {
  ArrowDown,
  ArrowRight,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  useLanguage,
} from "../../context/LanguageContext";

import heroImage from "../../assets/images/hero/hero-industrial.jpg";

function Hero() {
  const {
    t,
  } = useLanguage();

  const scrollDown = () => {
    const hero =
      document.getElementById(
        "inicio"
      );

    if (!hero) return;

    const nextSection =
      hero.nextElementSibling;

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="inicio"
      className="
        doxa-hero
      "
    >
      <div
        className="
          doxa-hero-inner
        "
      >

        {/* ===================================
            TEXTO
        =================================== */}

        <div
          className="
            doxa-hero-content
          "
        >

          <div
            className="
              doxa-hero-eyebrow
            "
          >
            <span />

            {t(
              "INGENIERÍA · FABRICACIÓN · MANTENIMIENTO",
              "ENGINEERING · FABRICATION · MAINTENANCE"
            )}
          </div>

          <p
            className="
              doxa-hero-company
            "
          >
            GRUPO INDUSTRIAL DOXA
          </p>

          <h1
            className="
              doxa-hero-title
            "
          >
            {t(
              <>
                Soluciones que
                <br />
                mueven a la industria.
              </>,
              <>
                Solutions that
                <br />
                move industry forward.
              </>
            )}
          </h1>

          <p
            className="
              doxa-hero-description
            "
          >
            {t(
              "Ingeniería, fabricación, mantenimiento y construcción para proyectos industriales de alta exigencia.",
              "Engineering, fabrication, maintenance and construction for demanding industrial projects."
            )}
          </p>

          <div
            className="
              doxa-hero-actions
            "
          >

            <Link
              to="/grupo"
              className="
                doxa-hero-primary
              "
            >
              {t(
                "Conocer el grupo",
                "Discover the group"
              )}

              <ArrowRight
                size={17}
              />
            </Link>

            <Link
              to="/servicios"
              className="
                doxa-hero-secondary
              "
            >
              {t(
                "Conocer servicios",
                "Explore services"
              )}
            </Link>

          </div>

        </div>

        {/* ===================================
            FOTO
        =================================== */}

        <div
          className="
            doxa-hero-visual
          "
        >

          <img
            src={heroImage}
            alt={t(
              "Trabajo industrial de Grupo Industrial DOXA",
              "Grupo Industrial DOXA industrial work"
            )}
          />

          <div
            className="
              doxa-hero-image-overlay
            "
          />

          <div
            className="
              doxa-hero-image-label
            "
          >
            <span>
              01
            </span>

            <p>
              {t(
                "Capacidad industrial",
                "Industrial capability"
              )}
            </p>
          </div>

        </div>

      </div>

      {/* ===================================
          SCROLL
      =================================== */}

      <button
        type="button"
        onClick={
          scrollDown
        }
        className="
          doxa-hero-scroll
        "
        aria-label={t(
          "Bajar",
          "Scroll down"
        )}
      >
        <ArrowDown
          size={18}
        />
      </button>

    </section>
  );
}

export default Hero;