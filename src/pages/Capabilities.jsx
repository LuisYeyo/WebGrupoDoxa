import { capabilities } from "../../data/capabilities"
import AnimatedCounter from "../ui/AnimatedCounter"

function Capabilities() {
  return (
    <section
      id="capacidades"
      className="bg-slate-950 py-24 text-white md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* ENCABEZADO */}
        <div className="grid gap-10 border-b border-white/15 pb-14 lg:grid-cols-2">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
              Capacidad industrial
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Infraestructura
              <br />
              que responde.
            </h2>
          </div>

          <div className="flex items-end">
            <p className="max-w-xl text-base leading-7 text-slate-400 lg:text-lg">
              Instalaciones y capacidad productiva diseñadas para atender
              proyectos industriales de diferentes escalas y requerimientos.
            </p>
          </div>

        </div>

        {/* NÚMEROS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5">

          {capabilities.map((item, index) => (
            <div
              key={item.label}
              className="
                border-b border-white/15
                py-10
                sm:border-r
                sm:px-6
                lg:border-b-0
                lg:px-6
                first:pl-0
                last:border-r-0
              "
            >
              {/* NÚMERO */}
              <p className="text-4xl font-bold tracking-tight md:text-5xl">
                <AnimatedCounter value={item.value} />

                <span className="ml-1 text-xl font-medium text-blue-400">
                  {item.suffix}
                </span>
              </p>

              {/* ETIQUETA */}
              <p className="mt-5 max-w-[180px] text-sm leading-6 text-slate-400">
                {item.label}
              </p>

              {/* ÍNDICE */}
              <p className="mt-8 text-xs tracking-[0.2em] text-slate-600">
                0{index + 1}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default Capabilities