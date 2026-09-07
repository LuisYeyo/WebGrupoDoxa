import Hero from "../components/home/Hero"
import CorporateIdentity from "../components/home/CorporateIdentity"
import Clients from "../components/home/Clients"
import ProjectsPreview from "../components/home/ProjectsPreview"
import ContactCTA from "../components/home/ContactCTA"

function Home() {
  return (
    <main>
      <Hero />

      <CorporateIdentity />

      <Clients />

      <ProjectsPreview />

      <ContactCTA />
    </main>
  )
}

export default Home