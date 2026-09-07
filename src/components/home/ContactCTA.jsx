import {
  ArrowRight,
} from "lucide-react"

import {
  useNavigate,
} from "react-router"

import {
  useLanguage,
} from "../../context/LanguageContext"

function ContactCTA() {
  const navigate =
    useNavigate()

  const {
    t,
  } = useLanguage()

  return (
    <section
      className="
        bg-blue-600
        py-20
        text-white
        md:py-24
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          flex-col
          gap-10
          px-6
          lg:flex-row
          lg:items-end
          lg:justify-between
        "
      >

        <div>

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.3em]
              text-blue-100
            "
          >
            {t(
              "Hablemos",
              "Let's talk"
            )}
          </p>

          <h2
            className="
              mt-5
              max-w-4xl
              text-4xl
              font-bold
              leading-[1]
              tracking-tight
              sm:text-5xl
              lg:text-6xl
            "
          >
            {t(
              <>
                ¿Tienes un proyecto
                <br />
                industrial?
              </>,
              <>
                Have an industrial
                <br />
                project?
              </>
            )}
          </h2>

          <p
            className="
              mt-6
              max-w-2xl
              text-base
              leading-7
              text-blue-100
            "
          >
            {t(
              "Nuestro equipo puede ayudarte a evaluar los requerimientos de fabricación, mantenimiento o montaje de tu proyecto.",
              "Our team can help evaluate the fabrication, maintenance or installation requirements of your project."
            )}
          </p>

        </div>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/contacto"
            )
          }
          className="
            group
            flex
            w-fit
            cursor-pointer
            items-center
            gap-4
            border
            border-white/30
            bg-white
            px-7
            py-4
            text-sm
            font-semibold
            text-blue-700
            transition
            hover:bg-[#0a2547]
            hover:text-white
          "
        >
          {t(
            "Solicitar cotización",
            "Request a quote"
          )}

          <ArrowRight
            size={18}
            className="
              transition-transform
              group-hover:translate-x-1
            "
          />
        </button>

      </div>
    </section>
  )
}

export default ContactCTA