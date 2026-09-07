import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom"

import MainLayout from "./components/layout/MainLayout"

import Home from "./pages/Home"
import Group from "./pages/Group"
import Services from "./pages/Services"
import ServiceDetail from "./pages/ServiceDetail"
import Infrastructure from "./pages/Infrastructure"
import Rental from "./pages/Rental"
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact"
import CompanyDetail from "./pages/CompanyDetail"
import Privacy from "./pages/Privacy"
import NotFound from "./pages/NotFound"
import Doxa from "./pages/Doxa";
import Remsa from "./pages/Remsa";
import Secmimar from "./pages/Secmimar";
import DoxaMaintenance from "./pages/DoxaMaintenance";

function App() {
  return (
    <Routes>
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
  )
}

export default App