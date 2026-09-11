import {
  useState,
} from "react"

import {
  AlertCircle,
  ArrowRight,
  Building2,
  Check,
  Home,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
} from "lucide-react"

import {
  motion,
} from "motion/react"

import {
  useNavigate,
} from "react-router-dom"

import {
  contactInfo,
} from "../data/contact"

import {
  useLanguage,
} from "../context/LanguageContext"

import PageReveal from "../components/ui/PageReveal"


const contacts = [
  {
    name: "Ing. Ramiro Robles Del Angel",
    phone: "833-252-45-14",
    email: "ramiro.robles@grupoindustrialdoxa.com",
  },

  {
    name: "Ing. Carlos Robles Del Angel",
    phone: "833-365-56-81",
    email: "carlos.robles@grupoindustrialdoxa.com",
  },

  {
    name: "Ing. Nezahualcoyotl Piña Palmillas",
    phone: "720-585-33-73",
    whatsapp: "833-405-29-82",
    email: "ing.netzahualcoyotl1973@gmail.com",
  },
]


function Contact() {
  const navigate =
    useNavigate()

  const {
    language,
    t,
  } = useLanguage()


  const initialForm = {
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    website: "",
  }


  const [
    form,
    setForm,
  ] = useState(
    initialForm
  )


  const [
    status,
    setStatus,
  ] = useState("idle")


  const [
    requestId,
    setRequestId,
  ] = useState("")


  const [
    errorMessage,
    setErrorMessage,
  ] = useState("")


  const services = [
    {
      value: "Fabricación",
      es: "Fabricación",
      en: "Fabrication",
    },

    {
      value: "Mantenimiento",
      es: "Mantenimiento",
      en: "Maintenance",
    },

    {
      value: "Montaje",
      es: "Montaje",
      en: "Installation",
    },

    {
      value: "Tubería industrial",
      es: "Tubería industrial",
      en: "Industrial piping",
    },

    {
      value: "Perforación",
      es: "Perforación",
      en: "Drilling",
    },

    {
      value: "Aislamiento industrial",
      es: "Aislamiento industrial",
      en: "Industrial insulation",
    },

    {
      value: "Sandblast y pintura",
      es: "Sandblast y pintura",
      en: "Sandblasting and painting",
    },

    {
      value: "Renta de equipo",
      es: "Renta de equipo",
      en: "Equipment rental",
    },

    {
      value: "Otro",
      es: "Otro",
      en: "Other",
    },
  ]


  const handleChange =
    (event) => {
      const {
        name,
        value,
      } = event.target

      setForm(
        (current) => ({
          ...current,
          [name]: value,
        })
      )
    }


  const handleSubmit =
    async (
      event
    ) => {
      event.preventDefault()

      if (
        status ===
        "sending"
      ) {
        return
      }


      setStatus(
        "sending"
      )

      setErrorMessage("")


      try {

        const response =
          await fetch(
            "/api/quote",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  form
                ),
            }
          )


        const data =
          await response.json()


        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "Unable to send"
          )
        }


        setRequestId(
          data.requestId ||
            ""
        )

        setStatus(
          "success"
        )

      } catch (error) {

        console.error(
          error
        )

        setStatus(
          "error"
        )

        setErrorMessage(
          t(
            "No pudimos enviar tu solicitud. Inténtalo nuevamente o comunícate directamente con nosotros.",
            "We couldn't send your request. Please try again or contact us directly."
          )
        )
      }
    }


  const resetForm = () => {
    setForm(
      initialForm
    )

    setRequestId("")

    setErrorMessage("")

    setStatus("idle")
  }


  return (
    <main
      className="
        min-h-screen
        bg-[#f7f9fc]
        text-[#0b1830]
      "
    >


      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          bg-white
          pb-20
          pt-20
          md:pb-24
          md:pt-28
        "
      >

        <div
          className="
            mx-auto
            max-w-7xl
            px-6
          "
        >

          <div
            className="
              grid
              gap-10
              lg:grid-cols-[1fr_0.8fr]
            "
          >

            <div>

              <PageReveal
                delay={0.05}
                y={14}
              >

                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.3em]
                    text-blue-600
                  "
                >
                  {t(
                    "Contacto",
                    "Contact"
                  )}
                </p>

              </PageReveal>


              <PageReveal
                delay={0.17}
                y={38}
                duration={0.85}
              >

                <h1
                  className="
                    mt-5
                    max-w-3xl
                    text-4xl
                    font-bold
                    leading-[0.98]
                    tracking-tight
                    sm:text-5xl
                    lg:text-7xl
                  "
                >
                  {t(
                    <>
                      Hablemos de tu
                      <br />
                      próximo proyecto.
                    </>,
                    <>
                      Let's talk about
                      <br />
                      your next project.
                    </>
                  )}
                </h1>

              </PageReveal>

            </div>


            <div className="flex items-end">

              <PageReveal
                delay={0.32}
                y={22}
              >

                <p
                  className="
                    max-w-xl
                    text-base
                    leading-7
                    text-slate-600
                    lg:text-lg
                  "
                >
                  {t(
                    "Cuéntanos qué necesitas y nuestro equipo podrá ayudarte a evaluar los requerimientos de tu proyecto industrial.",
                    "Tell us what you need and our team can help evaluate the requirements of your industrial project."
                  )}
                </p>

              </PageReveal>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACTOS
      ===================================================== */}

      <section className="py-10">

        <div
          className="
            mx-auto
            max-w-7xl
            px-6
          "
        >

          <PageReveal
            delay={0.04}
            y={18}
          >

            <div className="mb-7">

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-blue-600
                "
              >
                {t(
                  "Contacto directo",
                  "Direct contact"
                )}
              </p>

              <h2
                className="
                  mt-3
                  text-2xl
                  font-bold
                  tracking-tight
                  sm:text-3xl
                "
              >
                {t(
                  "Nuestro equipo",
                  "Our team"
                )}
              </h2>

            </div>

          </PageReveal>


          <div
            className="
              grid
              gap-4
              md:grid-cols-3
            "
          >

            {contacts.map(
              (
                contact,
                index
              ) => (

                <PageReveal
                  key={
                    contact.email
                  }
                  delay={
                    0.06 +
                    index * 0.08
                  }
                  y={24}
                  className="contact-reveal-card"
                >

                  <PersonContactCard
                    contact={
                      contact
                    }
                    t={t}
                  />

                </PageReveal>

              )
            )}

          </div>


          <PageReveal
            delay={0.26}
            y={20}
          >

            <div
              className="
                mt-4
                rounded-[24px]
                border
                border-slate-200
                bg-white
                p-6
                shadow-[0_0_25px_rgba(15,23,42,0.025)]
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-50
                    text-blue-600
                  "
                >
                  <MapPin
                    size={19}
                  />
                </div>


                <div>

                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-slate-400
                    "
                  >
                    {t(
                      "Ubicación",
                      "Location"
                    )}
                  </p>

                  <p
                    className="
                      mt-1
                      text-base
                      font-semibold
                      text-[#0b1830]
                    "
                  >
                    {
                      contactInfo.location[
                        language
                      ]
                    }
                  </p>

                </div>

              </div>

            </div>

          </PageReveal>

        </div>

      </section>


      {/* =====================================================
          QUOTE FORM
      ===================================================== */}

      <section
        className="
          pb-24
          pt-10
          md:pb-32
        "
      >

        <div
          className="
            mx-auto
            max-w-7xl
            px-6
          "
        >

          <PageReveal
            delay={0.08}
            y={34}
          >

            <div
              className="
                overflow-hidden
                rounded-[32px]
                border
                border-slate-200
                bg-white
                shadow-[0_0_45px_rgba(15,23,42,0.035)]
                lg:grid
                lg:grid-cols-[0.72fr_1.28fr]
              "
            >


              {/* =================================================
                  LEFT
              ================================================= */}

              <div
                className="
                  bg-[#0a2547]
                  p-8
                  text-white
                  sm:p-10
                  lg:p-12
                "
              >

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white/10
                    text-blue-300
                  "
                >
                  <Building2
                    size={27}
                  />
                </div>


                <p
                  className="
                    mt-12
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-blue-300
                  "
                >
                  {t(
                    "Solicitud de cotización",
                    "Request a quote"
                  )}
                </p>


                <h2
                  className="
                    mt-4
                    text-3xl
                    font-bold
                    leading-tight
                    tracking-tight
                    sm:text-4xl
                  "
                >
                  {t(
                    "¿Qué podemos hacer por tu proyecto?",
                    "How can we help your project?"
                  )}
                </h2>


                <p
                  className="
                    mt-6
                    max-w-md
                    text-sm
                    leading-7
                    text-slate-300
                    sm:text-base
                  "
                >
                  {t(
                    "Comparte la información general de tu proyecto y podremos canalizar tu solicitud con el área correspondiente.",
                    "Share the general information about your project and we can direct your request to the appropriate team."
                  )}
                </p>


                <div
                  className="
                    mt-10
                    flex
                    flex-wrap
                    gap-2
                  "
                >

                  {services.map(
                    (
                      service
                    ) => (

                      <span
                        key={
                          service.value
                        }
                        className="
                          rounded-full
                          border
                          border-white/15
                          bg-white/[0.04]
                          px-4
                          py-2
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.12em]
                          text-slate-300
                        "
                      >
                        {
                          service[
                            language
                          ]
                        }
                      </span>

                    )
                  )}

                </div>

              </div>


              {/* =================================================
                  RIGHT
              ================================================= */}

              <div
                className="
                  relative
                  min-h-[650px]
                  p-8
                  sm:p-10
                  lg:p-12
                "
              >


                {status !==
                  "success" && (

                  <form
                    onSubmit={
                      handleSubmit
                    }
                  >


                    {/* HONEYPOT */}

                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        -left-[9999px]
                        -top-[9999px]
                      "
                    >

                      <label>

                        Website

                        <input
                          type="text"
                          name="website"
                          value={
                            form.website
                          }
                          onChange={
                            handleChange
                          }
                          tabIndex="-1"
                          autoComplete="off"
                        />

                      </label>

                    </div>


                    {/* NAME / COMPANY */}

                    <div
                      className="
                        grid
                        gap-7
                        sm:grid-cols-2
                      "
                    >

                      <InputField
                        label={t(
                          "Nombre",
                          "Name"
                        )}
                        name="name"
                        value={
                          form.name
                        }
                        onChange={
                          handleChange
                        }
                        required
                      />


                      <InputField
                        label={t(
                          "Empresa",
                          "Company"
                        )}
                        name="company"
                        value={
                          form.company
                        }
                        onChange={
                          handleChange
                        }
                      />

                    </div>


                    {/* EMAIL / PHONE */}

                    <div
                      className="
                        mt-8
                        grid
                        gap-7
                        sm:grid-cols-2
                      "
                    >

                      <InputField
                        label={t(
                          "Correo",
                          "Email"
                        )}
                        name="email"
                        type="email"
                        value={
                          form.email
                        }
                        onChange={
                          handleChange
                        }
                        required
                      />


                      <InputField
                        label={t(
                          "Teléfono",
                          "Phone"
                        )}
                        name="phone"
                        type="tel"
                        value={
                          form.phone
                        }
                        onChange={
                          handleChange
                        }
                      />

                    </div>


                    {/* SERVICE */}

                    <div className="mt-8">

                      <label
                        htmlFor="service"
                        className="
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.2em]
                          text-slate-400
                        "
                      >
                        {t(
                          "Servicio requerido",
                          "Required service"
                        )}
                      </label>


                      <select
                        id="service"
                        name="service"
                        value={
                          form.service
                        }
                        onChange={
                          handleChange
                        }
                        required
                        className="
                          mt-3
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-[#f7f9fc]
                          px-4
                          py-4
                          text-sm
                          text-[#0b1830]
                          outline-none
                          transition
                          focus:border-blue-600
                        "
                      >

                        <option value="">
                          {t(
                            "Selecciona una opción",
                            "Select an option"
                          )}
                        </option>


                        {services.map(
                          (
                            service
                          ) => (

                            <option
                              key={
                                service.value
                              }
                              value={
                                service.value
                              }
                            >
                              {
                                service[
                                  language
                                ]
                              }
                            </option>

                          )
                        )}

                      </select>

                    </div>


                    {/* MESSAGE */}

                    <div className="mt-8">

                      <label
                        htmlFor="message"
                        className="
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.2em]
                          text-slate-400
                        "
                      >
                        {t(
                          "Cuéntanos sobre el proyecto",
                          "Tell us about the project"
                        )}
                      </label>


                      <textarea
                        id="message"
                        name="message"
                        rows="6"
                        value={
                          form.message
                        }
                        onChange={
                          handleChange
                        }
                        required
                        placeholder={t(
                          "Tipo de trabajo, dimensiones aproximadas, ubicación, fechas o cualquier información que consideres importante...",
                          "Type of work, approximate dimensions, location, dates or any information you consider important..."
                        )}
                        className="
                          mt-3
                          w-full
                          resize-none
                          rounded-xl
                          border
                          border-slate-200
                          bg-[#f7f9fc]
                          p-4
                          text-sm
                          leading-6
                          outline-none
                          transition
                          placeholder:text-slate-400
                          focus:border-blue-600
                        "
                      />

                    </div>


                    {/* ERROR */}

                    {status ===
                      "error" && (

                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="
                          mt-6
                          flex
                          items-start
                          gap-3
                          rounded-xl
                          border
                          border-red-200
                          bg-red-50
                          p-4
                        "
                      >

                        <AlertCircle
                          size={19}
                          className="
                            mt-0.5
                            shrink-0
                            text-red-500
                          "
                        />


                        <p
                          className="
                            text-sm
                            leading-6
                            text-red-700
                          "
                        >
                          {
                            errorMessage
                          }
                        </p>

                      </motion.div>

                    )}


                    {/* SEND */}

                    <button
                      type="submit"
                      disabled={
                        status ===
                        "sending"
                      }
                      className="
                        group
                        mt-8
                        flex
                        min-w-[180px]
                        cursor-pointer
                        items-center
                        justify-center
                        gap-3
                        rounded-xl
                        border-0
                        bg-blue-600
                        px-7
                        py-4
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-blue-500
                        disabled:cursor-not-allowed
                        disabled:opacity-65
                      "
                    >

                      {status ===
                      "sending" ? (

                        <>
                          <LoaderCircle
                            size={18}
                            className="
                              animate-spin
                            "
                          />

                          {t(
                            "Enviando...",
                            "Sending..."
                          )}
                        </>

                      ) : (

                        <>
                          {t(
                            "Enviar solicitud",
                            "Send request"
                          )}

                          <ArrowRight
                            size={17}
                            className="
                              transition-transform
                              group-hover:translate-x-1
                            "
                          />
                        </>

                      )}

                    </button>

                  </form>

                )}


                {/* =================================================
                    SUCCESS
                ================================================= */}

                {status ===
                  "success" && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="
                      flex
                      min-h-[550px]
                      flex-col
                      items-center
                      justify-center
                      text-center
                    "
                  >

                    <div
                      className="
                        relative
                        flex
                        h-32
                        w-32
                        items-center
                        justify-center
                      "
                    >

                      <motion.div
                        initial={{
                          scale: 0,
                          opacity: 0,
                        }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                        className="
                          absolute
                          inset-0
                          rounded-full
                          border
                          border-blue-200
                        "
                      />


                      <motion.div
                        initial={{
                          scale: 0.4,
                          opacity: 0,
                        }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                        }}
                        transition={{
                          delay: 0.12,
                          duration: 0.45,
                        }}
                        className="
                          flex
                          h-[96px]
                          w-[96px]
                          items-center
                          justify-center
                          rounded-full
                          bg-blue-600
                          text-white
                          shadow-[0_0_40px_rgba(37,99,235,0.22)]
                        "
                      >

                        <motion.div
                          initial={{
                            scale: 0,
                            rotate: -20,
                          }}
                          animate={{
                            scale: 1,
                            rotate: 0,
                          }}
                          transition={{
                            delay: 0.35,
                            type: "spring",
                            stiffness: 220,
                            damping: 14,
                          }}
                        >

                          <Check
                            size={43}
                            strokeWidth={3}
                          />

                        </motion.div>

                      </motion.div>

                    </div>


                    <motion.p
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.35,
                      }}
                      className="
                        mt-7
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.3em]
                        text-blue-600
                      "
                    >
                      {t(
                        "Solicitud enviada",
                        "Request sent"
                      )}
                    </motion.p>


                    <motion.h2
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.43,
                      }}
                      className="
                        mt-4
                        text-3xl
                        font-bold
                        tracking-tight
                        sm:text-4xl
                      "
                    >
                      {t(
                        `Gracias, ${form.name}.`,
                        `Thank you, ${form.name}.`
                      )}
                    </motion.h2>


                    <motion.p
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.5,
                      }}
                      className="
                        mt-5
                        max-w-lg
                        text-sm
                        leading-7
                        text-slate-500
                        sm:text-base
                      "
                    >
                      {t(
                        "Recibimos correctamente la información de tu proyecto. Nuestro equipo revisará la solicitud y podrá ponerse en contacto contigo para darle seguimiento.",
                        "We successfully received your project information. Our team will review your request and may contact you for follow-up."
                      )}
                    </motion.p>


                    {requestId && (

                      <motion.div
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        transition={{
                          delay: 0.6,
                        }}
                        className="
                          mt-7
                          rounded-xl
                          bg-blue-50
                          px-6
                          py-4
                        "
                      >

                        <p
                          className="
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.22em]
                            text-slate-400
                          "
                        >
                          {t(
                            "Folio de solicitud",
                            "Request ID"
                          )}
                        </p>


                        <p
                          className="
                            mt-2
                            text-sm
                            font-bold
                            tracking-[0.12em]
                            text-blue-600
                          "
                        >
                          {
                            requestId
                          }
                        </p>

                      </motion.div>

                    )}


                    <motion.div
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        delay: 0.68,
                      }}
                      className="
                        mt-9
                        flex
                        flex-col
                        gap-3
                        sm:flex-row
                      "
                    >

                      <button
                        type="button"
                        onClick={() =>
                          navigate("/")
                        }
                        className="
                          flex
                          cursor-pointer
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border-0
                          bg-blue-600
                          px-6
                          py-3.5
                          text-sm
                          font-semibold
                          text-white
                          transition
                          hover:bg-blue-500
                        "
                      >

                        <Home
                          size={17}
                        />

                        {t(
                          "Volver al inicio",
                          "Back to home"
                        )}

                      </button>


                      <button
                        type="button"
                        onClick={
                          resetForm
                        }
                        className="
                          flex
                          cursor-pointer
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          px-6
                          py-3.5
                          text-sm
                          font-semibold
                          text-slate-600
                          transition
                          hover:border-blue-600
                          hover:text-blue-600
                        "
                      >

                        <RotateCcw
                          size={16}
                        />

                        {t(
                          "Enviar otra solicitud",
                          "Send another request"
                        )}

                      </button>

                    </motion.div>

                  </motion.div>

                )}

              </div>

            </div>

          </PageReveal>

        </div>

      </section>

    </main>
  )
}


/* =========================================================
   PERSON CONTACT CARD
========================================================= */

function PersonContactCard({
  contact,
  t,
}) {
  return (
    <div
      className="
        h-full
        rounded-[24px]
        border
        border-slate-200
        bg-white
        p-6
        shadow-[0_0_25px_rgba(15,23,42,0.025)]
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-blue-50
            text-blue-600
          "
        >
          <Building2
            size={19}
          />
        </div>

      </div>


      <p
        className="
          mt-6
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.22em]
          text-blue-600
        "
      >
        {t(
          "Contacto",
          "Contact"
        )}
      </p>


      <h3
        className="
          mt-2
          text-lg
          font-bold
          leading-snug
          tracking-tight
          text-[#0b1830]
        "
      >
        {
          contact.name
        }
      </h3>


      <div
        className="
          mt-6
          space-y-4
        "
      >

        <ContactDetail
          icon={
            <Phone
              size={16}
            />
          }
          label={t(
            "Teléfono",
            "Phone"
          )}
          value={
            contact.phone
          }
        />


        {contact.whatsapp && (

          <ContactDetail
            icon={
              <Phone
                size={16}
              />
            }
            label="WhatsApp"
            value={
              contact.whatsapp
            }
          />

        )}


        <ContactDetail
          icon={
            <Mail
              size={16}
            />
          }
          label={t(
            "Correo",
            "Email"
          )}
          value={
            contact.email
          }
          small
        />

      </div>

    </div>
  )
}


/* =========================================================
   CONTACT DETAIL
========================================================= */

function ContactDetail({
  icon,
  label,
  value,
  small = false,
}) {
  return (
    <div
      className="
        flex
        items-start
        gap-3
      "
    >

      <div
        className="
          mt-0.5
          shrink-0
          text-blue-600
        "
      >
        {icon}
      </div>


      <div className="min-w-0">

        <p
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-slate-400
          "
        >
          {label}
        </p>


        <p
          className={`
            mt-1
            font-semibold
            text-[#0b1830]

            ${
              small
                ? "break-all text-xs sm:text-sm"
                : "text-sm"
            }
          `}
        >
          {value}
        </p>

      </div>

    </div>
  )
}


/* =========================================================
   INPUT
========================================================= */

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.2em]
          text-slate-400
        "
      >
        {label}
      </label>


      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={
          onChange
        }
        required={
          required
        }
        className="
          mt-2
          w-full
          border-0
          border-b
          border-slate-300
          bg-transparent
          px-0
          py-3
          text-sm
          outline-none
          transition
          focus:border-blue-600
        "
      />

    </div>
  )
}


export default Contact