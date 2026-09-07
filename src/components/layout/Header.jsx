import DailyVerse from "./DailyVerse"

function Header() {
  return (
    <header className="bg-[#020817] text-white">
      <div
        className="
          mx-auto
          grid max-w-7xl
          items-center
          gap-4
          px-6
          py-4

          md:grid-cols-[auto_1fr]
          md:gap-10
        "
      >
        {/* GRUPO */}
        <div className="text-center md:text-left">
          <p
            className="
              whitespace-nowrap
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.32em]
              text-white
              sm:text-xs
            "
          >
            Grupo Industrial DOXA
          </p>
        </div>

        {/* VERSÍCULO */}
        <div className="md:flex md:justify-end">
          <DailyVerse />
        </div>
      </div>
    </header>
  )
}

export default Header