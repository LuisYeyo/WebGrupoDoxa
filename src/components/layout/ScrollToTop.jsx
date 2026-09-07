import { useLayoutEffect } from "react"
import { useLocation } from "react-router"

function ScrollToTop() {
  const location = useLocation()

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    })
  }, [location.pathname])

  return null
}

export default ScrollToTop