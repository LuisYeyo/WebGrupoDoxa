import Companies from "../components/home/Companies"

import PageReveal from "../components/ui/PageReveal"


function Group() {
  return (
    <main className="group-page">

      <PageReveal
        delay={0.05}
        y={30}
        duration={0.85}
      >
        <Companies />
      </PageReveal>

    </main>
  )
}


export default Group