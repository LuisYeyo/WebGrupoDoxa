import { useEffect, useRef } from "react"

const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

export default function Turnstile({ onVerify, resetKey }) {
  const container = useRef(null)
  const widgetId = useRef(null)

  useEffect(() => {
    if (!siteKey) return
    let active = true
    const render = () => {
      if (!active || !container.current || !window.turnstile || widgetId.current !== null) return
      widgetId.current = window.turnstile.render(container.current, {
        sitekey: siteKey,
        action: "quote",
        language: "auto",
        size: "flexible",
        callback: onVerify,
        "expired-callback": () => onVerify(""),
        "error-callback": () => onVerify(""),
      })
    }
    const script = document.querySelector('script[data-turnstile="true"]') || document.createElement("script")
    if (!script.dataset.turnstile) {
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
      script.async = true
      script.dataset.turnstile = "true"
      document.head.appendChild(script)
    }
    script.addEventListener("load", render)
    render()
    return () => {
      active = false
      script.removeEventListener("load", render)
      if (widgetId.current !== null && window.turnstile) window.turnstile.remove(widgetId.current)
      widgetId.current = null
    }
  }, [onVerify])

  useEffect(() => {
    if (resetKey && widgetId.current !== null && window.turnstile) window.turnstile.reset(widgetId.current)
  }, [resetKey])

  if (!siteKey) return <p className="mt-6 text-sm text-red-700">La verificación del formulario no está configurada.</p>
  return <div className="mt-6" ref={container} />
}
