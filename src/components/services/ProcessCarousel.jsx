import {
  useEffect,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  useLanguage,
} from "../../context/LanguageContext";

function ProcessCarousel({
  title,
  description,
  steps = [],
}) {
  const {
    language,
    t,
  } = useLanguage();

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [steps]);

  if (!steps.length) {
    return null;
  }

  const currentStep =
    steps[currentIndex];

  const previous = () => {
    setCurrentIndex(
      (current) =>
        current === 0
          ? steps.length - 1
          : current - 1
    );
  };

  const next = () => {
    setCurrentIndex(
      (current) =>
        current ===
        steps.length - 1
          ? 0
          : current + 1
    );
  };

  return (
    <section className="process-carousel-section">

      <div className="section-heading">

        <span className="section-eyebrow">
          {t(
            "PROCESO",
            "PROCESS"
          )}
        </span>

        <h2>
          {title}
        </h2>

        <p>
          {description}
        </p>

      </div>

      <div className="process-carousel-card">

        {/* ==================================
            IMAGEN
        ================================== */}

        <div className="process-image-wrap">

          <img
            src={
              currentStep.image
            }
            alt={
              currentStep.title[
                language
              ]
            }
            className="process-main-image"
          />

          {steps.length >
            1 && (
            <>
              <button
                type="button"
                className="
                  process-arrow
                  process-arrow-left
                "
                onClick={
                  previous
                }
                aria-label={t(
                  "Fotografía anterior",
                  "Previous photograph"
                )}
              >
                <ChevronLeft
                  size={20}
                />
              </button>

              <button
                type="button"
                className="
                  process-arrow
                  process-arrow-right
                "
                onClick={
                  next
                }
                aria-label={t(
                  "Siguiente fotografía",
                  "Next photograph"
                )}
              >
                <ChevronRight
                  size={20}
                />
              </button>
            </>
          )}

          <div className="process-counter">
            {String(
              currentIndex + 1
            ).padStart(
              2,
              "0"
            )}

            {" / "}

            {String(
              steps.length
            ).padStart(
              2,
              "0"
            )}
          </div>

        </div>

        {/* ==================================
            INFO
        ================================== */}

        <div className="process-info">

          <span className="process-step-kicker">
            {t(
              `Paso ${String(
                currentIndex + 1
              ).padStart(
                2,
                "0"
              )}`,
              `Step ${String(
                currentIndex + 1
              ).padStart(
                2,
                "0"
              )}`
            )}
          </span>

          <h3>
            {
              currentStep.title[
                language
              ]
            }
          </h3>

          <p>
            {
              currentStep.description[
                language
              ]
            }
          </p>

          <div className="process-dots">

            {steps.map(
              (
                step,
                index
              ) => (
                <button
                  key={
                    index
                  }
                  type="button"
                  className={`
                    process-dot

                    ${
                      index ===
                      currentIndex
                        ? "active"
                        : ""
                    }
                  `}
                  onClick={() =>
                    setCurrentIndex(
                      index
                    )
                  }
                  aria-label={t(
                    `Ir al paso ${index + 1}`,
                    `Go to step ${index + 1}`
                  )}
                />
              )
            )}

          </div>

        </div>

      </div>

    </section>
  );
}

export default ProcessCarousel;