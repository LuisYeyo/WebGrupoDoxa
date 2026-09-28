import {
  lazy,
  Suspense,
} from "react"

import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom"

import MainLayout from "./components/layout/MainLayout"

const Home = lazy(() => import("./pages/Home"))
const Group = lazy(() => import("./pages/Group"))
const Services = lazy(() => import("./pages/Services"))
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"))
const Infrastructure = lazy(() => import("./pages/Infrastructure"))
const Rental = lazy(() => import("./pages/Rental"))
const Projects = lazy(() => import("./pages/Projects"))
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"))
const Contact = lazy(() => import("./pages/Contact"))
const CompanyDetail = lazy(() => import("./pages/CompanyDetail"))
const Privacy = lazy(() => import("./pages/Privacy"))
const NotFound = lazy(() => import("./pages/NotFound"))
const Doxa = lazy(() => import("./pages/Doxa"))
const Remsa = lazy(() => import("./pages/Remsa"))
const Secmimar = lazy(() => import("./pages/Secmimar"))
const DoxaMaintenance = lazy(() => import("./pages/DoxaMaintenance"))
const Internal = lazy(() => import("./pages/Internal"))

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" aria-label="Cargando página" />}>
      <Routes>
      <Route path="/interno" element={<Internal />} />

      <Route element={<MainLayout />}>
        {/* INICIO */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* GRUPO */}
        <Route
          path="/grupo"
          element={<Group />}
        />

        <Route
          path="/grupo/:company"
          element={<CompanyDetail />}
        />

        {/* SERVICIOS */}
        <Route
          path="/servicios"
          element={<Services />}
        />

        <Route
          path="/servicios/:slug"
          element={<ServiceDetail />}
        />

        {/* INFRAESTRUCTURA */}
        <Route
          path="/infraestructura"
          element={<Infrastructure />}
        />

        {/* RENTA */}
        <Route
          path="/renta"
          element={<Rental />}
        />

        {/* PROYECTOS */}
        <Route
          path="/proyectos"
          element={<Projects />}
        />

        <Route
          path="/proyectos/:slug"
          element={<ProjectDetail />}
        />

        {/* CONTACTO */}
        <Route
          path="/contacto"
          element={<Contact />}
        />

        {/* PRIVACIDAD */}
        <Route
          path="/aviso-de-privacidad"
          element={<Privacy />}
        />

        {/* RUTAS ANTIGUAS */}
        <Route
          path="/procesos"
          element={
            <Navigate
              to="/servicios"
              replace
            />
          }
        />

        <Route
          path="/capacidades"
          element={
            <Navigate
              to="/infraestructura"
              replace
            />
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

        <Route
          path="/doxa"
          element={<Doxa />} 
        />
        
        <Route
          path="/remsa" 
          element={<Remsa />} 
        />
        
        <Route 
          path="/secmimar" 
          element={<Secmimar />} 
        />
        
        <Route
          path="/mantenimiento-industrial-doxa"
          element={<DoxaMaintenance />}
        />
        
        <Route
        path="/doxa-mantenimiento"
        element={<DoxaMaintenance />}
        />
      </Route>
      </Routes>
    </Suspense>
  )
}

export default App
