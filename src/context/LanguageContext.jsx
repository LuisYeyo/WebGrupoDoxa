import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"


const LanguageContext =
  createContext(null)


export function LanguageProvider({
  children,
}) {
  const [
    language,
    setLanguage,
  ] = useState(() => {
    const saved =
      localStorage.getItem(
        "doxa-language"
      )

    if (
      saved === "es" ||
      saved === "en"
    ) {
      return saved
    }

    return "es"
  })


  useEffect(() => {
    localStorage.setItem(
      "doxa-language",
      language
    )

    document.documentElement.lang =
      language
  }, [language])


  const t = (
    spanish,
    english
  ) => {
    return language === "en"
      ? english
      : spanish
  }


  const value =
    useMemo(
      () => ({
        language,
        setLanguage,
        t,
      }),
      [
        language,
      ]
    )


  return (
    <LanguageContext.Provider
      value={value}
    >
      {children}
    </LanguageContext.Provider>
  )
}


export function useLanguage() {
  const context =
    useContext(
      LanguageContext
    )


  if (!context) {
    throw new Error(
      "useLanguage debe utilizarse dentro de LanguageProvider"
    )
  }


  return context
}