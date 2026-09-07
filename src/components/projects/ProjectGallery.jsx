import {
  useState,
} from "react"

import {
  ArrowLeft,
  ArrowRight,
  ImageIcon,
} from "lucide-react"

import {
  AnimatePresence,
  motion,
} from "motion/react"

import {
  useLanguage,
} from "../../context/LanguageContext"

function ProjectGallery({
  project,
}) {
  const {
    language,
    t,
  } = useLanguage()

  const [
    activeImageIndex,
    setActiveImageIndex,
  ] = useState(0)

  const [
    failedImages,
    setFailedImages,
  ] = useState({})

  const currentImage =
    project.images[
      activeImageIndex
    ]

  const hasMultiple =
    project.images.length > 1

  const nextImage = () => {
    setActiveImageIndex(
      (current) =>
        current ===
        project.images.length - 1
          ? 0
          : current + 1
    )
  }

  const previousImage = () => {
    setActiveImageIndex(
      (current) =>
        current === 0
          ? project.images.length - 1
          : current - 1
    )
  }

  const imageFailed =
    failedImages[
      currentImage
    ]

  const handleImageError = (
    image
  ) => {
    setFailedImages(
      (current) => ({
        ...current,
        [image]: true,
      })
    )
  }

  return (
    <div
      className="
        w-full
      "
    >

      {/* ==========================
          IMAGEN PRINCIPAL
      ========================== */}

      <div
        className="
          relative
          aspect-[4/3]
          w-full

          overflow-hidden
          rounded-[24px]

          bg-[#0a2547]
        "
      >

        <AnimatePresence
          mode="wait"
        >

          {!imageFailed ? (
            <motion.img
              key={
                currentImage
              }
              src={
                currentImage
              }
              alt={
                project.title[
                  language
                ]
              }
              onError={() =>
                handleImageError(
                  currentImage
                )
              }

              initial={{
                opacity: 0,
                scale: 1.015,
              }}

              animate={{
                opacity: 1,
                scale: 1,
              }}

              exit={{
                opacity: 0,
                scale: 0.985,
              }}

              transition={{
                duration: 0.35,
              }}

              className="
                absolute
                inset-0

                h-full
                w-full

                object-cover
                object-center
              "
            />
          ) : (
            <motion.div
              key={`fallback-${activeImageIndex}`}

              initial={{
                opacity: 0,
              }}

              animate={{
                opacity: 1,
              }}

              className="
                absolute
                inset-0

                flex
                flex-col
                items-center
                justify-center
              "
            >

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/10

                  text-white/30
                "
              >
                <ImageIcon
                  size={27}
                />
              </div>

              <p
                className="
                  mt-5

                  text-xs
                  uppercase
                  tracking-[0.25em]

                  text-white/30
                "
              >
                {t(
                  "Agrega fotografía",
                  "Add photograph"
                )}
              </p>

            </motion.div>
          )}

        </AnimatePresence>

        {/* GRADIENTE */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0

            bg-gradient-to-t
            from-black/30
            via-transparent
            to-black/5
          "
        />

        {/* CLIENTE */}
        <div
          className="
            absolute
            left-5
            top-5

            rounded-full

            bg-[#020817]/75

            px-4
            py-2

            backdrop-blur-md
          "
        >

          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]

              text-white
            "
          >
            {
              project.client
            }
          </p>

        </div>

        {/* CONTADOR */}
        <div
          className="
            absolute
            bottom-5
            right-5

            rounded-full

            bg-[#020817]/75

            px-4
            py-2

            backdrop-blur-md
          "
        >

          <p
            className="
              text-[10px]
              font-semibold
              tracking-[0.2em]

              text-white
            "
          >
            {String(
              activeImageIndex + 1
            ).padStart(
              2,
              "0"
            )}

            {" / "}

            {String(
              project.images.length
            ).padStart(
              2,
              "0"
            )}
          </p>

        </div>

        {/* ==========================
            FLECHAS
        ========================== */}

        {hasMultiple && (
          <>
            <button
              type="button"

              onClick={
                previousImage
              }

              aria-label={t(
                "Fotografía anterior",
                "Previous photo"
              )}

              className="
                absolute
                left-4
                top-1/2

                flex
                h-11
                w-11

                -translate-y-1/2

                cursor-pointer

                items-center
                justify-center

                rounded-full

                border
                border-white/20

                bg-[#020817]/55

                text-white

                backdrop-blur

                transition-all
                duration-300

                hover:scale-105
                hover:border-blue-500
                hover:bg-blue-600
              "
            >
              <ArrowLeft
                size={18}
              />
            </button>

            <button
              type="button"

              onClick={
                nextImage
              }

              aria-label={t(
                "Siguiente fotografía",
                "Next photo"
              )}

              className="
                absolute
                right-4
                top-1/2

                flex
                h-11
                w-11

                -translate-y-1/2

                cursor-pointer

                items-center
                justify-center

                rounded-full

                border
                border-white/20

                bg-[#020817]/55

                text-white

                backdrop-blur

                transition-all
                duration-300

                hover:scale-105
                hover:border-blue-500
                hover:bg-blue-600
              "
            >
              <ArrowRight
                size={18}
              />
            </button>
          </>
        )}

      </div>

      {/* ==========================
          INDICADORES
      ========================== */}

      {hasMultiple && (
        <div
          className="
            mt-4
            flex
            gap-2
          "
        >

          {project.images.map(
            (
              image,
              index
            ) => (
              <button
                key={
                  image
                }

                type="button"

                onClick={() =>
                  setActiveImageIndex(
                    index
                  )
                }

                aria-label={`${t(
                  "Fotografía",
                  "Photo"
                )} ${index + 1}`}

                className={`
                  h-[3px]
                  cursor-pointer
                  rounded-full
                  border-0

                  transition-all
                  duration-300

                  ${
                    activeImageIndex ===
                    index
                      ? `
                        w-12
                        bg-blue-600
                      `
                      : `
                        w-7
                        bg-slate-200
                        hover:bg-slate-400
                      `
                  }
                `}
              />
            )
          )}

        </div>
      )}

    </div>
  )
}

export default ProjectGallery