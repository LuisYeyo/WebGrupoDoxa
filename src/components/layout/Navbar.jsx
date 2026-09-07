import {
  useEffect,
  useRef,
  useState,
} from "react"

import {
  ChevronDown,
  Menu,
  X,
} from "lucide-react"

import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom"

import {
  useLanguage,
} from "../../context/LanguageContext"

import DailyVerse from "./DailyVerse"

import mxFlag from "../../assets/images/flags/mx.svg"
import usFlag from "../../assets/images/flags/us.svg"


function Navbar() {
  const location =
    useLocation()

  const navigate =
    useNavigate()

  const {
    language,
    setLanguage,
    t,
  } = useLanguage()

  const [
    scrolled,
    setScrolled,
  ] = useState(false)

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false)

  const [
    languageOpen,
    setLanguageOpen,
  ] = useState(false)

  const [
    visible,
    setVisible,
  ] = useState(false)

  const languageRef =
    useRef(null)

  const isHome =
    location.pathname === "/"


  useEffect(() => {
    const timer =
      setTimeout(() => {
        setVisible(true)
      }, 700)

    return () =>
      clearTimeout(timer)
  }, [])


  useEffect(() => {
    const handleScroll =
      () => {
        setScrolled(
          window.scrollY > 55
        )
      }

    handleScroll()

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    )

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      )
    }
  }, [])


  useEffect(() => {
    setMenuOpen(false)
    setLanguageOpen(false)
    setVisible(true)
  }, [location.pathname])


  useEffect(() => {
    const handleClickOutside =
      (event) => {
        if (
          languageRef.current &&
          !languageRef.current.contains(
            event.target
          )
        ) {
          setLanguageOpen(false)
        }
      }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      )
    }
  }, [])


  const navigation = [
    {
      id: "home",
      es: "Inicio",
      en: "Home",
      path: "/",
      width:
        "navbar-item--home",
      end: true,
    },

    {
      id: "group",
      es: "Grupo",
      en: "Group",
      path: "/grupo",
      width:
        "navbar-item--group",
    },

    {
      id: "services",
      es: "Servicios",
      en: "Services",
      path: "/servicios",
      width:
        "navbar-item--services",
    },

    {
      id:
        "infrastructure",
      es:
        "Infraestructura",
      en:
        "Infrastructure",
      path:
        "/infraestructura",
      width:
        "navbar-item--infrastructure",
    },

    {
      id: "rental",
      es: "Renta",
      en: "Rental",
      path: "/renta",
      width:
        "navbar-item--rental",
    },

    {
      id: "projects",
      es: "Proyectos",
      en: "Projects",
      path: "/proyectos",
      width:
        "navbar-item--projects",
    },

    {
      id: "contact",
      es: "Contacto",
      en: "Contact",
      path: "/contacto",
      width:
        "navbar-item--contact",
    },
  ]


  const handleHome =
    () => {
      if (isHome) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })

        return
      }

      navigate("/")
    }


  const handleQuote =
    () => {
      navigate(
        "/contacto"
      )
    }


  const selectLanguage =
    (nextLanguage) => {
      setLanguage(
        nextLanguage
      )

      setLanguageOpen(
        false
      )
    }


  const currentFlag =
    language === "es"
      ? mxFlag
      : usFlag


  const overlayMode =
    isHome &&
    !scrolled


  return (
    <header
      className={`
        doxa-navbar

        ${
          visible
            ? "doxa-navbar--visible"
            : ""
        }

        ${
          overlayMode
            ? "doxa-navbar--overlay"
            : "doxa-navbar--solid"
        }

        ${
          scrolled
            ? "doxa-navbar--scrolled"
            : ""
        }
      `}
    >


      {/* ================================================
          DESKTOP
      ================================================ */}

      <div
        className="
          doxa-navbar-inner
          doxa-navbar-desktop
        "
      >

        <div className="navbar-verse-slot">

          <DailyVerse
            compact={
              scrolled
            }
            light={
              overlayMode
            }
          />

        </div>


        <nav className="navbar-links">

          {navigation.map(
            (item) => {

              if (
                item.id ===
                "home"
              ) {
                const active =
                  isHome

                return (
                  <button
                    key={
                      item.id
                    }
                    type="button"
                    onClick={
                      handleHome
                    }
                    className={`
                      navbar-link
                      ${item.width}

                      ${
                        active
                          ? "navbar-link--active"
                          : ""
                      }
                    `}
                  >
                    <span>
                      {
                        language ===
                        "en"
                          ? item.en
                          : item.es
                      }
                    </span>
                  </button>
                )
              }


              return (
                <NavLink
                  key={
                    item.id
                  }
                  to={
                    item.path
                  }
                  className={({
                    isActive,
                  }) => `
                    navbar-link
                    ${item.width}

                    ${
                      isActive
                        ? "navbar-link--active"
                        : ""
                    }
                  `}
                >
                  <span>
                    {
                      language ===
                      "en"
                        ? item.en
                        : item.es
                    }
                  </span>
                </NavLink>
              )
            }
          )}

        </nav>


        <div className="navbar-actions">


          {/* LANGUAGE DROPDOWN */}

          <div
            className="language-dropdown"
            ref={
              languageRef
            }
          >

            <button
              type="button"
              onClick={() =>
                setLanguageOpen(
                  (
                    current
                  ) =>
                    !current
                )
              }
              className="language-dropdown-trigger"
              aria-label={t(
                "Seleccionar idioma",
                "Select language"
              )}
              aria-expanded={
                languageOpen
              }
            >

              <img
                src={
                  currentFlag
                }
                alt=""
                className="language-dropdown-flag"
              />

              <ChevronDown
                size={14}
                className={`
                  language-dropdown-chevron

                  ${
                    languageOpen
                      ? "language-dropdown-chevron--open"
                      : ""
                  }
                `}
              />

            </button>


            <div
              className={`
                language-dropdown-menu

                ${
                  languageOpen
                    ? "language-dropdown-menu--open"
                    : ""
                }
              `}
            >

              <button
                type="button"
                onClick={() =>
                  selectLanguage(
                    "es"
                  )
                }
                className={`
                  language-dropdown-item

                  ${
                    language ===
                    "es"
                      ? "language-dropdown-item--active"
                      : ""
                  }
                `}
                aria-label="Español"
              >

                <img
                  src={mxFlag}
                  alt="México"
                />

              </button>


              <button
                type="button"
                onClick={() =>
                  selectLanguage(
                    "en"
                  )
                }
                className={`
                  language-dropdown-item

                  ${
                    language ===
                    "en"
                      ? "language-dropdown-item--active"
                      : ""
                  }
                `}
                aria-label="English"
              >

                <img
                  src={usFlag}
                  alt="United States"
                />

              </button>

            </div>

          </div>


          {/* QUOTE */}

          <button
            type="button"
            onClick={
              handleQuote
            }
            className="navbar-quote"
          >
            <span>
              {
                language ===
                "en"
                  ? "Request a quote"
                  : "Solicitar cotización"
              }
            </span>
          </button>

        </div>

      </div>


      {/* ================================================
          MOBILE
      ================================================ */}

      <div
        className="
          doxa-navbar-inner
          doxa-navbar-mobile
        "
      >

        <div className="navbar-mobile-verse">

          <DailyVerse
            compact
            light={
              overlayMode
            }
          />

        </div>


        <div className="navbar-mobile-actions">


          <div
            className="language-dropdown"
          >

            <button
              type="button"
              onClick={() =>
                setLanguageOpen(
                  (
                    current
                  ) =>
                    !current
                )
              }
              className="
                language-dropdown-trigger
                language-dropdown-trigger--mobile
              "
              aria-label={t(
                "Seleccionar idioma",
                "Select language"
              )}
            >

              <img
                src={
                  currentFlag
                }
                alt=""
                className="language-dropdown-flag"
              />

              <ChevronDown
                size={13}
              />

            </button>


            <div
              className={`
                language-dropdown-menu
                language-dropdown-menu--mobile

                ${
                  languageOpen
                    ? "language-dropdown-menu--open"
                    : ""
                }
              `}
            >

              <button
                type="button"
                onClick={() =>
                  selectLanguage(
                    "es"
                  )
                }
                className="language-dropdown-item"
                aria-label="Español"
              >
                <img
                  src={mxFlag}
                  alt="México"
                />
              </button>


              <button
                type="button"
                onClick={() =>
                  selectLanguage(
                    "en"
                  )
                }
                className="language-dropdown-item"
                aria-label="English"
              >
                <img
                  src={usFlag}
                  alt="United States"
                />
              </button>

            </div>

          </div>


          <button
            type="button"
            onClick={() =>
              setMenuOpen(
                (
                  current
                ) =>
                  !current
              )
            }
            className="navbar-menu-button"
            aria-label={
              menuOpen
                ? t(
                    "Cerrar menú",
                    "Close menu"
                  )
                : t(
                    "Abrir menú",
                    "Open menu"
                  )
            }
          >
            {menuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>

        </div>

      </div>


      {/* ================================================
          MOBILE PANEL
      ================================================ */}

      <div
        className={`
          navbar-mobile-panel

          ${
            menuOpen
              ? "navbar-mobile-panel--open"
              : ""
          }
        `}
      >

        <nav>

          {navigation.map(
            (item) => (

              <NavLink
                key={
                  item.id
                }
                to={
                  item.path
                }
                end={
                  item.end
                }
                className={({
                  isActive,
                }) => `
                  navbar-mobile-link

                  ${
                    isActive
                      ? "navbar-mobile-link--active"
                      : ""
                  }
                `}
              >
                {
                  language ===
                  "en"
                    ? item.en
                    : item.es
                }
              </NavLink>

            )
          )}

        </nav>


        <button
          type="button"
          onClick={
            handleQuote
          }
          className="navbar-mobile-quote"
        >
          {t(
            "Solicitar cotización",
            "Request a quote"
          )}
        </button>

      </div>

    </header>
  )
}


export default Navbar