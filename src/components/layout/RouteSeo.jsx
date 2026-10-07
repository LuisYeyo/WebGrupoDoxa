import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const SITE_URL = "https://www.grupoindustriadoxa.com"

const PAGE_META = {
  "/": ["Grupo Industrial DOXA | Ingeniería y servicios industriales", "Soluciones de ingeniería, fabricación, mantenimiento, tubería, aislamiento, perforación y renta de equipo industrial en Altamira, Tamaulipas."],
  "/grupo": ["Grupo Industrial DOXA | Empresas y capacidades", "Conoce las empresas, experiencia y capacidades que integran Grupo Industrial DOXA para atender proyectos industriales."],
  "/servicios": ["Servicios industriales | Grupo Industrial DOXA", "Fabricación, montaje, mantenimiento, tubería industrial, perforación, aislamiento, sandblast y pintura para proyectos industriales."],
  "/infraestructura": ["Infraestructura y talleres industriales | Grupo Industrial DOXA", "Conoce los talleres, instalaciones, capacidades y equipo de Grupo Industrial DOXA en Altamira, Tamaulipas."],
  "/renta": ["Renta de maquinaria y equipo industrial | Grupo Industrial DOXA", "Catálogo de maquinaria, equipo y soluciones de renta para construcción, mantenimiento y proyectos industriales."],
  "/proyectos": ["Proyectos industriales | Grupo Industrial DOXA", "Consulta proyectos de fabricación, mantenimiento, montaje, tubería y servicios industriales realizados por Grupo Industrial DOXA."],
  "/contacto": ["Contacto y cotizaciones | Grupo Industrial DOXA", "Solicita una cotización para fabricación, mantenimiento, montaje, tubería, perforación, aislamiento o renta de equipo industrial."],
  "/doxa": ["DOXA | Fabricación y servicios industriales", "Servicios de fabricación, montaje, tubería, mantenimiento y soluciones metalmecánicas de Grupo Industrial DOXA."],
  "/remsa": ["REMSA | Soluciones industriales", "Conoce los servicios, capacidades y experiencia industrial de REMSA, empresa integrante de Grupo Industrial DOXA."],
  "/secmimar": ["SECMIMAR | Servicios industriales especializados", "Conoce los servicios y capacidades especializadas de SECMIMAR dentro de Grupo Industrial DOXA."],
  "/mantenimiento-industrial-doxa": ["Mantenimiento Industrial DOXA | Servicios especializados", "Mantenimiento preventivo y correctivo, rehabilitación y soporte para instalaciones y equipos industriales."],
  "/aviso-de-privacidad": ["Aviso de privacidad | Grupo Industrial DOXA", "Consulta el aviso de privacidad y el tratamiento de datos personales de Grupo Industrial DOXA."],
}

function ensureMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement("meta")
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value))
}

function RouteSeo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const normalizedPath = pathname !== "/" ? pathname.replace(/\/$/, "") : "/"
    const dynamicType = normalizedPath.startsWith("/servicios/") ? "service" : normalizedPath.startsWith("/proyectos/") ? "project" : normalizedPath.startsWith("/grupo/") ? "company" : null
    const dynamicMeta = dynamicType === "service"
      ? ["Servicio industrial | Grupo Industrial DOXA", "Información técnica y alcance de los servicios industriales de Grupo Industrial DOXA."]
      : dynamicType === "project"
        ? ["Proyecto industrial | Grupo Industrial DOXA", "Conoce el alcance y resultados de un proyecto realizado por Grupo Industrial DOXA."]
        : dynamicType === "company"
          ? ["Empresa del grupo | Grupo Industrial DOXA", "Conoce una de las empresas y capacidades que forman parte de Grupo Industrial DOXA."]
          : null
    const meta = PAGE_META[normalizedPath] || dynamicMeta
    const isKnownPage = Boolean(meta)
    const title = meta?.[0] || "Página no encontrada | Grupo Industrial DOXA"
    const description = meta?.[1] || "La página solicitada no se encuentra disponible."
    const canonicalUrl = `${SITE_URL}${isKnownPage ? normalizedPath === "/" ? "/" : normalizedPath : "/"}`

    document.title = title
    ensureMeta('meta[name="description"]', { name: "description", content: description })
    ensureMeta('meta[name="robots"]', { name: "robots", content: isKnownPage ? "index, follow" : "noindex, nofollow" })
    ensureMeta('meta[property="og:title"]', { property: "og:title", content: title })
    ensureMeta('meta[property="og:description"]', { property: "og:description", content: description })
    ensureMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl })
    ensureMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title })
    ensureMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description })

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.rel = "canonical"
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl
  }, [pathname])

  return null
}

export default RouteSeo
