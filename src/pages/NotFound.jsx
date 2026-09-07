import {
  ArrowLeft,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  useLanguage,
} from "../context/LanguageContext";

function NotFound() {
  const {
    t,
  } = useLanguage();

  return (
    <main
      className="
        flex
        min-h-[70vh]
        items-center
        justify-center

        bg-[#f7f9fc]

        px-6

        text-[#0b1830]
      "
    >
      <div
        className="
          mx-auto
          max-w-3xl
          text-center
        "
      >
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.32em]
            text-blue-600
          "
        >
          404
        </p>

        <h1
          className="
            mt-5

            text-5xl
            font-bold
            tracking-tight

            md:text-7xl
          "
        >
          {t(
            "Página no encontrada",
            "Page not found"
          )}
        </h1>

        <p
          className="
            mx-auto
            mt-6
            max-w-xl

            text-base
            leading-7
            text-slate-600

            md:text-lg
          "
        >
          {t(
            "La página que estás buscando no existe, cambió de ubicación o ya no está disponible.",
            "The page you are looking for does not exist, has moved or is no longer available."
          )}
        </p>

        <Link
          to="/"
          className="
            mt-9

            inline-flex
            items-center
            gap-2

            rounded-xl

            bg-blue-600

            px-6
            py-4

            text-sm
            font-semibold
            text-white

            no-underline

            transition

            hover:bg-blue-500
          "
        >
          <ArrowLeft
            size={17}
          />

          {t(
            "Volver al inicio",
            "Back to home"
          )}
        </Link>
      </div>
    </main>
  );
}

export default NotFound;