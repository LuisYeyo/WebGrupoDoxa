import { useCallback, useEffect, useState } from "react"
import { AlertTriangle, Building2, CalendarDays, Camera, Check, ChevronRight, ClipboardList, Download, Eye, EyeOff, FileText, Lightbulb, LogOut, Mail, Pencil, Plus, RefreshCw, Search, ShieldCheck, Upload, Users, Wrench, X } from "lucide-react"
import Turnstile from "../components/ui/Turnstile"
import { hasAuthSetupParams, isSupabaseConfigured, supabase } from "../utils/supabase"
import "./Internal.css"

const ROLE_LABELS = {
  admin: "Administrador",
  manager: "Gerente",
  supervisor: "Supervisor",
  staff: "Personal",
  viewer: "Consulta",
}

const STATUS_LABELS = {
  lead: "Nueva",
  quoted: "Cotizada",
  approved: "Aprobada",
  in_progress: "En proceso",
  on_hold: "En espera",
  completed: "Completada",
  cancelled: "Cancelada",
}

const EQUIPMENT_CATEGORY_LABELS = {
  lifting: "Izaje y carga",
  power: "Generación eléctrica",
  welding: "Soldadura",
  air: "Aire comprimido",
  transport: "Transporte",
  drilling: "Perforación",
  other: "Otro",
}

const EQUIPMENT_STATUS_LABELS = {
  active: "Activo",
  inactive: "Inactivo",
  archived: "Archivado",
}

const RECORD_STATUS_LABELS = { active: "Activo", inactive: "Inactivo", archived: "Archivado" }

const WORK_ORDER_STATUS_LABELS = {
  pending: "Pendiente",
  scheduled: "Programada",
  in_progress: "En proceso",
  blocked: "Bloqueada",
  completed: "Terminada",
  cancelled: "Cancelada",
}

const DOCUMENT_CATEGORY_LABELS = {
  quote: "Cotización",
  contract: "Contrato",
  purchase_order: "Orden de compra",
  drawing: "Plano o dibujo",
  inspection_report: "Reporte de inspección",
  safety: "Seguridad",
  invoice: "Factura",
  other: "Otro",
}

function formatDate(value) {
  if (!value) return "—"
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

function formatMoney(value, currency = "MXN") {
  if (value === null || value === undefined || value === "") return "Por definir"
  return new Intl.NumberFormat("es-MX", { style: "currency", currency }).format(Number(value))
}

function createProjectCode() {
  const date = new Date().toISOString().slice(2, 10).replaceAll("-", "")
  const random = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `PR-${date}-${random}`
}

function createWorkOrderCode() {
  const date = new Date().toISOString().slice(2, 10).replaceAll("-", "")
  const random = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `OT-${date}-${random}`
}

function locationTypeLabel(location) {
  if (location.kind === "company_workshop") return `Taller ${location.workshop_number}`
  if (location.kind === "client_site") return "Instalaciones del cliente"
  return "Ubicación externa"
}

function PasswordField({ id, value, onChange, autoComplete }) {
  const [visible, setVisible] = useState(false)
  return <div className="internal-password-field">
    <input id={id} type={visible ? "text" : "password"} autoComplete={autoComplete}
      value={value} onChange={onChange} minLength={8} required />
    <button type="button" onClick={() => setVisible((current) => !current)}
      aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
      title={visible ? "Ocultar contraseña" : "Mostrar contraseña"}>
      {visible ? <EyeOff size={19} /> : <Eye size={19} />}
    </button>
  </div>
}

function Login({ onAuthenticated, authLinkInvalid = false }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(authLinkInvalid
    ? "Este enlace de invitación venció, ya fue utilizado o no es válido. Solicita un enlace nuevo."
    : "")
  const [submitting, setSubmitting] = useState(false)
  const [captchaToken, setCaptchaToken] = useState("")
  const [captchaReset, setCaptchaReset] = useState(0)
  const [notice, setNotice] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setNotice("")

    if (!captchaToken) {
      setError("Completa la verificación de seguridad.")
      return
    }

    setSubmitting(true)

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
      options: { captchaToken },
    })

    setSubmitting(false)
    if (signInError) {
      setError("El correo o la contraseña no son correctos.")
      setCaptchaToken("")
      setCaptchaReset((current) => current + 1)
      return
    }
    onAuthenticated(data.session)
  }

  const requestPasswordLink = async () => {
    setError("")
    setNotice("")

    if (!email.trim()) {
      setError("Escribe primero tu correo electrónico.")
      return
    }
    if (!captchaToken) {
      setError("Completa la verificación de seguridad.")
      return
    }

    setSubmitting(true)
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: "https://www.grupoindustriadoxa.com/interno",
        captchaToken,
      }
    )
    setSubmitting(false)
    setCaptchaToken("")
    setCaptchaReset((current) => current + 1)

    if (resetError) {
      setError(resetError.message?.toLowerCase().includes("rate")
        ? "Se alcanzó el límite temporal de correos. Espera un poco e inténtalo nuevamente."
        : `No fue posible enviar el enlace: ${resetError.message}`)
      return
    }

    setNotice("Si la cuenta existe, recibirás un enlace nuevo para crear o cambiar tu contraseña.")
  }

  return (
    <main className="internal-auth-shell">
      <section className="internal-login-card">
        <div className="internal-brand-mark"><Building2 size={27} /></div>
        <p className="internal-eyebrow">GRUPO INDUSTRIAL DOXA</p>
        <h1>Acceso interno</h1>
        <p className="internal-login-copy">
          Ingresa con la cuenta que recibió una invitación de la empresa.
        </p>

        <form onSubmit={handleSubmit} className="internal-form">
          <label htmlFor="internal-email">Correo electrónico</label>
          <input id="internal-email" type="email" autoComplete="email" value={email}
            onChange={(event) => setEmail(event.target.value)} required />

          <label htmlFor="internal-password">Contraseña</label>
          <PasswordField id="internal-password" autoComplete="current-password"
            value={password} onChange={(event) => setPassword(event.target.value)} />

          {error && <div className="internal-alert" role="alert">{error}</div>}
          {notice && <div className="internal-notice" role="status">{notice}</div>}
          <Turnstile
            action="login"
            className="internal-captcha"
            onVerify={setCaptchaToken}
            resetKey={captchaReset}
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "Ingresando…" : "Ingresar"}
          </button>
          <button type="button" className="internal-secondary-action" disabled={submitting} onClick={requestPasswordLink}>
            Crear o restablecer contraseña
          </button>
        </form>

        <div className="internal-private-note">
          <ShieldCheck size={18} /> Sistema privado para personal autorizado
        </div>
      </section>
    </main>
  )
}

function PasswordSetup({ session, onComplete }) {
  const invitedEmail = session.user.email || ""
  const [email, setEmail] = useState(invitedEmail)
  const [fullName, setFullName] = useState(session.user.user_metadata?.full_name || "")
  const [password, setPassword] = useState("")
  const [confirmation, setConfirmation] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const passwordRequirements = [
    { label: "Mínimo 8 caracteres", met: password.length >= 8 },
    { label: "Una letra mayúscula", met: /[A-ZÁÉÍÓÚÑ]/.test(password) },
    { label: "Una letra minúscula", met: /[a-záéíóúñ]/.test(password) },
    { label: "Un número", met: /\d/.test(password) },
    { label: "Un símbolo, por ejemplo: ! @ # $ %", met: /[^A-Za-zÁÉÍÓÚÑáéíóúñ0-9\s]/.test(password) },
  ]
  const passwordIsValid = passwordRequirements.every((requirement) => requirement.met)
  const passwordsMatch = confirmation.length > 0 && password === confirmation

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")

    if (email.trim().toLowerCase() !== invitedEmail.toLowerCase()) {
      setError(`El correo debe coincidir con la invitación enviada a ${invitedEmail}.`)
      return
    }
    if (fullName.trim().length < 2) {
      setError("Escribe tu nombre completo.")
      return
    }
    if (!passwordIsValid) {
      setError("La contraseña todavía no cumple todos los requisitos.")
      return
    }
    if (password !== confirmation) {
      setError("Las contraseñas no coinciden.")
      return
    }

    setSubmitting(true)
    const { error: updateError } = await supabase.auth.updateUser({
      password,
      data: { full_name: fullName.trim() },
    })

    if (updateError) {
      setSubmitting(false)
      const message = updateError.message?.toLowerCase() || ""
      setError(
        message.includes("expired")
          ? "La invitación venció. Pide al administrador que envíe una nueva."
          : message.includes("weak") || message.includes("password")
            ? `Supabase rechazó la contraseña: ${updateError.message}`
            : `No fue posible guardar la contraseña: ${updateError.message}`
      )
      return
    }

    const profileResponse = await fetch("/api/account/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ fullName: fullName.trim() }),
    })
    setSubmitting(false)

    if (!profileResponse.ok) {
      setError("La contraseña se guardó, pero no pudimos actualizar el nombre. Entra con tu nueva contraseña y avisa al administrador.")
      return
    }

    window.history.replaceState({}, "", "/interno")
    onComplete()
  }

  return (
    <main className="internal-auth-shell">
      <section className="internal-login-card">
        <div className="internal-brand-mark"><ShieldCheck size={27} /></div>
        <p className="internal-eyebrow">ACTIVAR CUENTA</p>
        <h1>Crea tu contraseña</h1>
        <p className="internal-login-copy">
          Esta contraseña será la que usarás para entrar al sistema interno.
        </p>

        <form onSubmit={handleSubmit} className="internal-form">
          <label htmlFor="activation-email">Correo electrónico invitado</label>
          <input id="activation-email" type="email" autoComplete="email"
            value={email} onChange={(event) => setEmail(event.target.value)} required />

          <label htmlFor="activation-name">Nombre completo</label>
          <input id="activation-name" type="text" autoComplete="name"
            value={fullName} onChange={(event) => setFullName(event.target.value)}
            minLength={2} maxLength={150} required />

          <label htmlFor="new-password">Nueva contraseña</label>
          <PasswordField id="new-password" autoComplete="new-password"
            value={password} onChange={(event) => setPassword(event.target.value)} />

          <div className="password-requirements" aria-live="polite">
            <p>La contraseña debe incluir:</p>
            <ul>
              {passwordRequirements.map((requirement) => (
                <li className={requirement.met ? "is-met" : ""} key={requirement.label}>
                  <span className="password-check" aria-hidden="true">
                    {requirement.met && <Check size={14} strokeWidth={3} />}
                  </span>
                  {requirement.label}
                </li>
              ))}
            </ul>
          </div>

          <label htmlFor="confirm-password">Confirmar contraseña</label>
          <PasswordField id="confirm-password" autoComplete="new-password"
            value={confirmation} onChange={(event) => setConfirmation(event.target.value)} />
          {confirmation && (
            <p className={`password-match ${passwordsMatch ? "is-met" : ""}`} aria-live="polite">
              <span className="password-check" aria-hidden="true">
                {passwordsMatch && <Check size={14} strokeWidth={3} />}
              </span>
              {passwordsMatch ? "Las contraseñas coinciden" : "Las contraseñas todavía no coinciden"}
            </p>
          )}

          {error && <div className="internal-alert" role="alert">{error}</div>}
          <button type="submit" disabled={submitting || !passwordIsValid || !passwordsMatch}>
            {submitting ? "Guardando…" : "Guardar contraseña"}
          </button>
        </form>
      </section>
    </main>
  )
}

function InternalUsers({ session }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editing, setEditing] = useState(null)
  const [showInvite, setShowInvite] = useState(false)
  const [saving, setSaving] = useState(false)
  const [invite, setInvite] = useState({ fullName: "", email: "", role: "staff" })

  const request = useCallback(async (options = {}) => {
    const response = await fetch("/api/admin/users", {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
        ...options.headers,
      },
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || "Request failed")
    return data
  }, [session.access_token])

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const data = await request()
      setUsers(data.users)
    } catch {
      setError("No fue posible cargar el personal.")
    }
    setLoading(false)
  }, [request])

  useEffect(() => {
    const timeout = window.setTimeout(loadUsers, 0)
    return () => window.clearTimeout(timeout)
  }, [loadUsers])

  const sendInvite = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError("")
    try {
      await request({ method: "POST", body: JSON.stringify(invite) })
      setInvite({ fullName: "", email: "", role: "staff" })
      setShowInvite(false)
      await loadUsers()
    } catch (inviteError) {
      setError(inviteError.message.includes("rate")
        ? "Supabase alcanzó el límite temporal de correos. Inténtalo más tarde."
        : "No fue posible enviar la invitación. Revisa que el correo no exista.")
    }
    setSaving(false)
  }

  const saveUser = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError("")
    try {
      await request({
        method: "PATCH",
        body: JSON.stringify({ id: editing.id, fullName: editing.full_name, role: editing.role, active: editing.active }),
      })
      setEditing(null)
      await loadUsers()
    } catch (updateError) {
      setError(updateError.message.includes("own administrator")
        ? "No puedes quitarte a ti mismo el acceso de administrador."
        : "No fue posible actualizar al empleado.")
    }
    setSaving(false)
  }

  return <>
    <div className="internal-users-toolbar">
      <span>{users.length} cuentas registradas</span>
      <button type="button" className="internal-primary-action" onClick={() => setShowInvite(true)}><Plus size={17} /> Invitar empleado</button>
    </div>
    {error && <div className="internal-alert" role="alert">{error}</div>}
    <div className="internal-table-card">
      {loading ? <div className="internal-empty">Cargando personal…</div> : (
        <div className="internal-table-wrap"><table>
          <thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Estado</th><th></th></tr></thead>
          <tbody>{users.map((user) => <tr key={user.id}>
            <td className="internal-stacked-cell"><strong>{user.full_name || "Sin nombre"}</strong>{user.current && <span>Tu cuenta</span>}</td>
            <td>{user.email}</td>
            <td>{ROLE_LABELS[user.role] || "Sin asignar"}</td>
            <td><span className={`internal-status ${user.active ? "status-active" : "status-cancelled"}`}>{user.active ? "Activo" : "Baja"}</span></td>
            <td><button type="button" className="internal-link-button" onClick={() => setEditing({ ...user })}>Modificar</button></td>
          </tr>)}</tbody>
        </table></div>
      )}
    </div>

    {(showInvite || editing) && <div className="internal-drawer-backdrop" onClick={() => { setShowInvite(false); setEditing(null) }}>
      <aside className="internal-drawer" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="internal-drawer-close" onClick={() => { setShowInvite(false); setEditing(null) }}><X size={20} /></button>
        <p className="internal-eyebrow">PERSONAL</p>
        <h2>{showInvite ? "Invitar empleado" : "Modificar empleado"}</h2>
        <p className="internal-drawer-company">{showInvite ? "Recibirá un enlace para crear su contraseña." : editing.email}</p>
        <form className="internal-form" onSubmit={showInvite ? sendInvite : saveUser}>
          <label htmlFor="employee-name">Nombre completo</label>
          <input id="employee-name" value={showInvite ? invite.fullName : editing.full_name}
            onChange={(event) => showInvite ? setInvite({ ...invite, fullName: event.target.value }) : setEditing({ ...editing, full_name: event.target.value })} required />
          {showInvite && <><label htmlFor="employee-email">Correo</label><input id="employee-email" type="email" value={invite.email} onChange={(event) => setInvite({ ...invite, email: event.target.value })} required /></>}
          <label htmlFor="employee-role">Rol</label>
          <select id="employee-role" value={showInvite ? invite.role : editing.role}
            onChange={(event) => showInvite ? setInvite({ ...invite, role: event.target.value }) : setEditing({ ...editing, role: event.target.value })}>
            <option value="admin">Administrador</option><option value="manager">Gerente</option><option value="supervisor">Supervisor</option><option value="staff">Personal</option><option value="viewer">Consulta</option>
          </select>
          {!showInvite && <label className="internal-toggle"><input type="checkbox" checked={editing.active} onChange={(event) => setEditing({ ...editing, active: event.target.checked })} /> Cuenta activa</label>}
          <button type="submit" disabled={saving}>{saving ? "Guardando…" : showInvite ? "Enviar invitación" : "Guardar cambios"}</button>
        </form>
      </aside>
    </div>}
  </>
}

function Dashboard({ session }) {
  const [dashboardDate] = useState(() => new Date())
  const [profile, setProfile] = useState(null)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [convertingRequest, setConvertingRequest] = useState(false)
  const [requestView, setRequestView] = useState("active")
  const [searchTerm, setSearchTerm] = useState("")
  const [listStatus, setListStatus] = useState("all")
  const [savingStatus, setSavingStatus] = useState(false)
  const [savingConversion, setSavingConversion] = useState(false)
  const [clients, setClients] = useState([])
  const [projects, setProjects] = useState([])
  const [locations, setLocations] = useState([])
  const [equipment, setEquipment] = useState([])
  const [projectEquipment, setProjectEquipment] = useState([])
  const [workOrders, setWorkOrders] = useState([])
  const [editingWorkOrder, setEditingWorkOrder] = useState(null)
  const [team, setTeam] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [editingProject, setEditingProject] = useState(false)
  const [projectLessons, setProjectLessons] = useState([])
  const [projectPhotos, setProjectPhotos] = useState([])
  const [projectDocuments, setProjectDocuments] = useState([])
  const [loadingProject, setLoadingProject] = useState(false)
  const [savingLesson, setSavingLesson] = useState(false)
  const [uploadingPhotos, setUploadingPhotos] = useState(false)
  const [uploadingDocument, setUploadingDocument] = useState(false)
  const [activeModule, setActiveModule] = useState("dashboard")
  const [showClientForm, setShowClientForm] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [savingClient, setSavingClient] = useState(false)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showLocationForm, setShowLocationForm] = useState(false)
  const [showEquipmentForm, setShowEquipmentForm] = useState(false)
  const [editingEquipment, setEditingEquipment] = useState(null)
  const [editingLocation, setEditingLocation] = useState(null)
  const [savingProject, setSavingProject] = useState(false)
  const [savingLocation, setSavingLocation] = useState(false)
  const [savingEquipment, setSavingEquipment] = useState(false)
  const [assigningEquipment, setAssigningEquipment] = useState(false)
  const [savingWorkOrder, setSavingWorkOrder] = useState(false)
  const [clientForm, setClientForm] = useState({
    legal_name: "", trade_name: "", tax_id: "", email: "", phone: "", notes: "",
  })
  const [projectForm, setProjectForm] = useState({
    client_id: "", location_id: "", name: "", service: "", description: "", amount: "", currency: "MXN", status: "lead", start_date: "", due_date: "",
  })
  const [conversionForm, setConversionForm] = useState({ existing_client_id: "", legal_name: "", tax_id: "", project_name: "", location_id: "", amount: "", currency: "MXN" })
  const [projectEditForm, setProjectEditForm] = useState(null)
  const [locationForm, setLocationForm] = useState({
    kind: "client_site", client_id: "", name: "", address_line: "", city: "", state: "Tamaulipas", postal_code: "", notes: "",
  })
  const [equipmentForm, setEquipmentForm] = useState({
    internal_code: "", name: "", category: "other", brand: "", model: "", serial_number: "", location_id: "", notes: "",
  })
  const [assignmentForm, setAssignmentForm] = useState({
    equipment_id: "", purpose: "", planned_from: "", planned_until: "", notes: "",
  })
  const [workOrderForm, setWorkOrderForm] = useState({
    assigned_to: "", title: "", description: "", status: "pending", scheduled_date: "", due_date: "",
  })
  const [documentForm, setDocumentForm] = useState({ category: "other", description: "", file: null })
  const [lessonForm, setLessonForm] = useState({
    category: "challenge", title: "", situation: "", lesson: "",
  })

  const canEditOperations = ["admin", "manager", "supervisor", "staff"].includes(profile?.role)
  const today = dashboardDate.toISOString().slice(0, 10)
  const nextThirtyDays = new Date(dashboardDate.getTime() + 30 * 86400000).toISOString().slice(0, 10)
  const openProjectStatuses = ["lead", "quoted", "approved", "in_progress", "on_hold"]
  const openWorkOrderStatuses = ["pending", "scheduled", "in_progress", "blocked"]
  const activeProjects = projects.filter((project) => openProjectStatuses.includes(project.status))
  const overdueWorkOrders = workOrders.filter((order) => order.due_date && order.due_date < today && openWorkOrderStatuses.includes(order.status))
  const upcomingProjects = projects.filter((project) => project.due_date && project.due_date >= today && project.due_date <= nextThirtyDays && openProjectStatuses.includes(project.status)).sort((a, b) => a.due_date.localeCompare(b.due_date))
  const upcomingMaintenance = equipment.filter((item) => item.next_maintenance_date && item.next_maintenance_date >= today && item.next_maintenance_date <= nextThirtyDays && item.status === "active").sort((a, b) => a.next_maintenance_date.localeCompare(b.next_maintenance_date))
  const myWorkOrders = workOrders.filter((order) => order.assigned_to === session.user.id && openWorkOrderStatuses.includes(order.status))
  const activeRequests = requests.filter((request) => !["completed", "cancelled"].includes(request.status))
  const finishedRequests = requests.filter((request) => ["completed", "cancelled"].includes(request.status))
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase("es-MX")
  const includesSearch = (...values) => !normalizedSearch || values.some((value) => String(value || "").toLocaleLowerCase("es-MX").includes(normalizedSearch))
  const matchesStatus = (status, options) => listStatus === "all" || !Object.hasOwn(options, listStatus) || status === listStatus
  const visibleRequests = (requestView === "finished" ? finishedRequests : activeRequests).filter((request) =>
    matchesStatus(request.status, STATUS_LABELS) && includesSearch(request.request_code, request.requester_name, request.company_name, request.email, request.service)
  )
  const visibleClients = clients.filter((client) => matchesStatus(client.status, RECORD_STATUS_LABELS) && includesSearch(client.legal_name, client.trade_name, client.tax_id, client.email, client.phone))
  const visibleLocations = locations.filter((location) => matchesStatus(location.status, RECORD_STATUS_LABELS) && includesSearch(location.name, location.company_name, location.clients?.legal_name, location.city, location.state))
  const visibleEquipment = equipment.filter((item) => matchesStatus(item.status, RECORD_STATUS_LABELS) && includesSearch(item.internal_code, item.name, item.category, item.brand, item.model, item.serial_number, item.work_locations?.name))
  const visibleWorkOrders = workOrders.filter((order) => matchesStatus(order.status, WORK_ORDER_STATUS_LABELS) && includesSearch(order.code, order.title, order.description, order.projects?.code, order.projects?.name, order.profiles?.full_name))
  const visibleProjects = projects.filter((project) => matchesStatus(project.status, STATUS_LABELS) && includesSearch(project.code, project.name, project.service, project.clients?.legal_name, project.clients?.tax_id, project.work_locations?.name))

  const statusFilterOptions = activeModule === "requests" ? STATUS_LABELS
    : activeModule === "clients" || activeModule === "locations" || activeModule === "equipment" ? RECORD_STATUS_LABELS
      : activeModule === "workOrders" ? WORK_ORDER_STATUS_LABELS
        : activeModule === "projects" ? STATUS_LABELS
          : null

  const openProject = async (project) => {
    setSelectedProject(project)
    setEditingProject(false)
    setProjectEditForm({
      location_id: project.work_locations?.id || "",
      name: project.name || "",
      service: project.service || "",
      description: project.description || "",
      amount: project.amount ?? "",
      currency: project.currency || "MXN",
      status: project.status,
      start_date: project.start_date || "",
      due_date: project.due_date || "",
    })
    setProjectLessons([])
    setProjectPhotos([])
    setProjectDocuments([])
    setProjectEquipment([])
    setLoadingProject(true)
    setError("")

    const [lessonResult, photoResult, documentResult, equipmentResult] = await Promise.all([
      supabase.from("project_lessons")
        .select("id, category, title, situation, lesson, created_at, profiles(full_name)")
        .eq("project_id", project.id)
        .order("created_at", { ascending: false }),
      supabase.from("documents")
        .select("id, file_name, storage_path, description, created_at")
        .eq("project_id", project.id)
        .eq("category", "work_evidence")
        .order("created_at", { ascending: false }),
      supabase.from("documents")
        .select("id, category, file_name, storage_path, description, mime_type, size_bytes, created_at, profiles!documents_uploaded_by_fkey(full_name)")
        .eq("project_id", project.id)
        .neq("category", "work_evidence")
        .order("created_at", { ascending: false }),
      supabase.from("project_equipment")
        .select("equipment_id, purpose, planned_from, planned_until, notes, equipment(id, internal_code, name, brand, model)")
        .eq("project_id", project.id)
        .order("created_at", { ascending: false }),
    ])

    if (lessonResult.error || photoResult.error || documentResult.error || equipmentResult.error) {
      setError("No fue posible cargar el expediente completo del proyecto.")
    } else {
      setProjectLessons(lessonResult.data ?? [])
      const photosWithUrls = await Promise.all((photoResult.data ?? []).map(async (photo) => {
        const { data } = await supabase.storage.from("project-media").createSignedUrl(photo.storage_path, 3600)
        return { ...photo, url: data?.signedUrl || "" }
      }))
      setProjectPhotos(photosWithUrls)
      setProjectDocuments(documentResult.data ?? [])
      setProjectEquipment(equipmentResult.data ?? [])
    }
    setLoadingProject(false)
  }

  const createLesson = async (event) => {
    event.preventDefault()
    if (!selectedProject || !canEditOperations) return

    setSavingLesson(true)
    setError("")
    const { data, error: insertError } = await supabase
      .from("project_lessons")
      .insert({
        project_id: selectedProject.id,
        author_id: session.user.id,
        category: lessonForm.category,
        title: lessonForm.title.trim(),
        situation: lessonForm.situation.trim(),
        lesson: lessonForm.lesson.trim(),
      })
      .select("id, category, title, situation, lesson, created_at, profiles(full_name)")
      .single()

    if (insertError) {
      setError("No fue posible guardar la lección aprendida.")
    } else {
      setProjectLessons((current) => [data, ...current])
      setLessonForm({ category: "challenge", title: "", situation: "", lesson: "" })
    }
    setSavingLesson(false)
  }

  const uploadProjectPhotos = async (event) => {
    const files = Array.from(event.target.files || [])
    event.target.value = ""
    if (!selectedProject || !canEditOperations || files.length === 0) return

    const invalidFile = files.find((file) => !["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 10 * 1024 * 1024)
    if (invalidFile) {
      setError("Las fotografías deben ser JPG, PNG o WebP y pesar máximo 10 MB cada una.")
      return
    }

    setUploadingPhotos(true)
    setError("")
    const uploaded = []

    for (const file of files) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-")
      const storagePath = `${selectedProject.id}/${crypto.randomUUID()}-${safeName}`
      const { error: uploadError } = await supabase.storage
        .from("project-media")
        .upload(storagePath, file, { contentType: file.type, upsert: false })

      if (uploadError) {
        setError("Una o más fotografías no pudieron subirse.")
        continue
      }

      const { data: document, error: documentError } = await supabase
        .from("documents")
        .insert({
          project_id: selectedProject.id,
          uploaded_by: session.user.id,
          category: "work_evidence",
          file_name: file.name,
          storage_path: storagePath,
          mime_type: file.type,
          size_bytes: file.size,
        })
        .select("id, file_name, storage_path, description, created_at")
        .single()

      if (documentError) {
        await supabase.storage.from("project-media").remove([storagePath])
        setError("Una fotografía subió, pero no pudo registrarse en el proyecto.")
        continue
      }

      const { data: signedData } = await supabase.storage.from("project-media").createSignedUrl(storagePath, 3600)
      uploaded.push({ ...document, url: signedData?.signedUrl || "" })
    }

    setProjectPhotos((current) => [...uploaded, ...current])
    setUploadingPhotos(false)
  }

  const uploadProjectDocument = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const file = documentForm.file
    if (!selectedProject || !canEditOperations || !file) return
    if (file.size > 10 * 1024 * 1024) {
      setError("El documento debe pesar máximo 10 MB.")
      return
    }

    setUploadingDocument(true)
    setError("")
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-")
    const storagePath = `${selectedProject.id}/documents/${crypto.randomUUID()}-${safeName}`
    const { error: uploadError } = await supabase.storage.from("project-media").upload(storagePath, file, { contentType: file.type || "application/octet-stream", upsert: false })

    if (uploadError) {
      setError("No fue posible subir el documento. Verifica que ya ejecutaste el SQL del módulo de documentos.")
      setUploadingDocument(false)
      return
    }

    const { data, error: insertError } = await supabase.from("documents").insert({
      project_id: selectedProject.id,
      uploaded_by: session.user.id,
      category: documentForm.category,
      description: documentForm.description.trim() || null,
      file_name: file.name,
      storage_path: storagePath,
      mime_type: file.type || null,
      size_bytes: file.size,
    }).select("id, category, file_name, storage_path, description, mime_type, size_bytes, created_at, profiles!documents_uploaded_by_fkey(full_name)").single()

    if (insertError) {
      await supabase.storage.from("project-media").remove([storagePath])
      setError("El archivo subió, pero no pudo registrarse en el proyecto.")
    } else {
      setProjectDocuments((current) => [data, ...current])
      setDocumentForm({ category: "other", description: "", file: null })
      form.reset()
    }
    setUploadingDocument(false)
  }

  const downloadProjectDocument = async (document) => {
    setError("")
    const { data, error: signedUrlError } = await supabase.storage.from("project-media").createSignedUrl(document.storage_path, 60, { download: document.file_name })
    if (signedUrlError || !data?.signedUrl) {
      setError("No fue posible preparar la descarga del documento.")
      return
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer")
  }

  const loadData = useCallback(async () => {
    setLoading(true)
    setError("")

    const [profileResult, requestResult, clientResult, projectResult, locationResult, equipmentResult, workOrderResult, teamResult] = await Promise.all([
      supabase.from("profiles").select("full_name, role, active")
        .eq("id", session.user.id).single(),
      supabase.from("quote_requests")
        .select("id, request_code, client_id, project_id, requester_name, company_name, email, phone, service, message, status, received_at, projects(id, code, name)")
        .order("received_at", { ascending: false }).limit(100),
      supabase.from("clients")
        .select("id, legal_name, trade_name, tax_id, email, phone, notes, status, created_at")
        .order("legal_name"),
      supabase.from("projects")
        .select("id, code, name, service, description, amount, currency, status, start_date, due_date, created_at, clients(legal_name, tax_id), work_locations(id, name, kind, workshop_number, city, state)")
        .order("created_at", { ascending: false }),
      supabase.from("work_locations")
        .select("id, client_id, company_name, name, kind, workshop_number, address_line, city, state, postal_code, notes, status, clients(legal_name)")
        .order("kind").order("workshop_number").order("name"),
      supabase.from("equipment")
        .select("id, location_id, internal_code, name, category, brand, model, serial_number, status, last_maintenance_date, next_maintenance_date, notes, work_locations(name)")
        .order("internal_code"),
      supabase.from("work_orders")
        .select("id, project_id, assigned_to, code, title, description, status, scheduled_date, due_date, completed_at, created_at, projects(id, code, name), profiles!work_orders_assigned_to_fkey(id, full_name)")
        .order("created_at", { ascending: false }),
      supabase.from("profiles")
        .select("id, full_name, role, active")
        .eq("active", true)
        .order("full_name"),
    ])

    if (profileResult.error || requestResult.error || clientResult.error || projectResult.error || locationResult.error || equipmentResult.error || workOrderResult.error || teamResult.error) {
      setError("No se pudo cargar la información. Verifica que tu usuario esté activo.")
    } else {
      setProfile(profileResult.data)
      setRequests(requestResult.data ?? [])
      setClients(clientResult.data ?? [])
      setProjects(projectResult.data ?? [])
      setLocations(locationResult.data ?? [])
      setEquipment(equipmentResult.data ?? [])
      setWorkOrders(workOrderResult.data ?? [])
      setTeam(teamResult.data ?? [])
    }
    setLoading(false)
  }, [session.user.id])

  const updateStatus = async (status) => {
    if (!selectedRequest || !["admin", "manager", "supervisor"].includes(profile?.role)) return

    setSavingStatus(true)
    setError("")

    const { error: updateError } = await supabase
      .from("quote_requests")
      .update({ status })
      .eq("id", selectedRequest.id)

    if (updateError) {
      setError("No fue posible actualizar el estado de la solicitud.")
    } else {
      setRequests((current) => current.map((item) =>
        item.id === selectedRequest.id ? { ...item, status } : item
      ))
      setSelectedRequest((current) => ({ ...current, status }))
    }

    setSavingStatus(false)
  }

  const beginRequestConversion = () => {
    if (!selectedRequest) return
    setConversionForm({
      existing_client_id: selectedRequest.client_id || "",
      legal_name: selectedRequest.company_name || selectedRequest.requester_name,
      tax_id: "",
      project_name: `${selectedRequest.service} — ${selectedRequest.company_name || selectedRequest.requester_name}`,
      location_id: "",
      amount: "",
      currency: "MXN",
    })
    setConvertingRequest(true)
  }

  const convertRequestToProject = async (event) => {
    event.preventDefault()
    if (!selectedRequest || !["admin", "manager", "supervisor"].includes(profile?.role)) return

    setSavingConversion(true)
    setError("")
    let clientId = conversionForm.existing_client_id
    let createdClient = null

    if (!clientId) {
      const { data, error: clientError } = await supabase.from("clients").insert({
        legal_name: conversionForm.legal_name.trim(),
        tax_id: conversionForm.tax_id.trim().toUpperCase() || null,
        email: selectedRequest.email,
        phone: selectedRequest.phone || null,
        notes: `Creado desde la solicitud ${selectedRequest.request_code}`,
        created_by: session.user.id,
      }).select("id, legal_name, trade_name, tax_id, email, phone, notes, status, created_at").single()

      if (clientError) {
        setError("No fue posible crear el cliente. Revisa que el RFC no esté repetido.")
        setSavingConversion(false)
        return
      }
      clientId = data.id
      createdClient = data
      await supabase.from("client_contacts").insert({ client_id: clientId, full_name: selectedRequest.requester_name, email: selectedRequest.email, phone: selectedRequest.phone || null, is_primary: true })
    }

    const { data: project, error: projectError } = await supabase.from("projects").insert({
      client_id: clientId,
      location_id: conversionForm.location_id || null,
      code: createProjectCode(),
      name: conversionForm.project_name.trim(),
      service: selectedRequest.service,
      description: selectedRequest.message,
      amount: conversionForm.amount === "" ? null : Number(conversionForm.amount),
      currency: conversionForm.currency,
      status: "approved",
      created_by: session.user.id,
    }).select("id, code, name, service, description, amount, currency, status, start_date, due_date, created_at, clients(legal_name, tax_id), work_locations(id, name, kind, workshop_number, city, state)").single()

    if (projectError) {
      setError("El cliente quedó registrado, pero no fue posible crear el proyecto.")
      if (createdClient) setClients((current) => [...current, createdClient].sort((a, b) => a.legal_name.localeCompare(b.legal_name)))
      setSavingConversion(false)
      return
    }

    const { error: requestError } = await supabase.from("quote_requests").update({ client_id: clientId, project_id: project.id, status: "approved" }).eq("id", selectedRequest.id)
    if (requestError) {
      setError("El proyecto se creó, pero la solicitud no pudo vincularse automáticamente.")
    } else {
      const updatedRequest = { ...selectedRequest, client_id: clientId, project_id: project.id, status: "approved", projects: { id: project.id, code: project.code, name: project.name } }
      if (createdClient) setClients((current) => [...current, createdClient].sort((a, b) => a.legal_name.localeCompare(b.legal_name)))
      setProjects((current) => [project, ...current])
      setRequests((current) => current.map((request) => request.id === updatedRequest.id ? updatedRequest : request))
      setSelectedRequest(updatedRequest)
      setConvertingRequest(false)
    }
    setSavingConversion(false)
  }

  const createClient = async (event) => {
    event.preventDefault()
    if (!["admin", "manager", "supervisor"].includes(profile?.role)) return

    setSavingClient(true)
    setError("")
    const payload = Object.fromEntries(
      Object.entries(clientForm).map(([key, value]) => [key, value.trim() || null])
    )

    const { data, error: insertError } = await supabase
      .from("clients")
      .insert({ ...payload, created_by: session.user.id })
      .select("id, legal_name, trade_name, tax_id, email, phone, notes, status, created_at")
      .single()

    if (insertError) {
      setError("No fue posible guardar el cliente. Revisa los datos e inténtalo nuevamente.")
    } else {
      setClients((current) => [...current, data].sort((a, b) => a.legal_name.localeCompare(b.legal_name)))
      setClientForm({ legal_name: "", trade_name: "", tax_id: "", email: "", phone: "", notes: "" })
      setShowClientForm(false)
    }
    setSavingClient(false)
  }

  const updateClient = async (event) => {
    event.preventDefault()
    if (!editingClient || !["admin", "manager", "supervisor"].includes(profile?.role)) return

    setSavingClient(true)
    setError("")
    const { data, error: updateError } = await supabase.from("clients").update({
      legal_name: editingClient.legal_name.trim(),
      trade_name: editingClient.trade_name?.trim() || null,
      tax_id: editingClient.tax_id?.trim().toUpperCase() || null,
      email: editingClient.email?.trim() || null,
      phone: editingClient.phone?.trim() || null,
      notes: editingClient.notes?.trim() || null,
      status: editingClient.status,
    }).eq("id", editingClient.id)
      .select("id, legal_name, trade_name, tax_id, email, phone, notes, status, created_at")
      .single()

    if (updateError) {
      setError("No fue posible actualizar el cliente. Revisa que el RFC no esté repetido.")
    } else {
      setClients((current) => current.map((client) => client.id === data.id ? data : client).sort((a, b) => a.legal_name.localeCompare(b.legal_name)))
      setEditingClient(null)
    }
    setSavingClient(false)
  }

  const createProject = async (event) => {
    event.preventDefault()
    if (!["admin", "manager", "supervisor", "staff"].includes(profile?.role)) return

    setSavingProject(true)
    setError("")
    const { data, error: insertError } = await supabase
      .from("projects")
      .insert({
        client_id: projectForm.client_id,
        location_id: projectForm.location_id || null,
        code: createProjectCode(),
        name: projectForm.name.trim(),
        service: projectForm.service.trim() || null,
        description: projectForm.description.trim() || null,
        amount: projectForm.amount === "" ? null : Number(projectForm.amount),
        currency: projectForm.currency,
        status: projectForm.status,
        start_date: projectForm.start_date || null,
        due_date: projectForm.due_date || null,
        created_by: session.user.id,
      })
      .select("id, code, name, service, description, amount, currency, status, start_date, due_date, created_at, clients(legal_name, tax_id), work_locations(id, name, kind, workshop_number, city, state)")
      .single()

    if (insertError) {
      setError("No fue posible guardar el trabajo. Verifica el cliente y las fechas.")
    } else {
      setProjects((current) => [data, ...current])
      setProjectForm({ client_id: "", location_id: "", name: "", service: "", description: "", amount: "", currency: "MXN", status: "lead", start_date: "", due_date: "" })
      setShowProjectForm(false)
    }
    setSavingProject(false)
  }

  const updateProject = async (event) => {
    event.preventDefault()
    if (!selectedProject || !projectEditForm || !canEditOperations) return

    setSavingProject(true)
    setError("")
    const { data, error: updateError } = await supabase.from("projects").update({
      location_id: projectEditForm.location_id || null,
      name: projectEditForm.name.trim(),
      service: projectEditForm.service.trim() || null,
      description: projectEditForm.description.trim() || null,
      amount: projectEditForm.amount === "" ? null : Number(projectEditForm.amount),
      currency: projectEditForm.currency,
      status: projectEditForm.status,
      start_date: projectEditForm.start_date || null,
      due_date: projectEditForm.due_date || null,
    }).eq("id", selectedProject.id)
      .select("id, code, name, service, description, amount, currency, status, start_date, due_date, created_at, clients(legal_name, tax_id), work_locations(id, name, kind, workshop_number, city, state)")
      .single()

    if (updateError) {
      setError("No fue posible actualizar el proyecto. Revisa los datos y las fechas.")
    } else {
      setProjects((current) => current.map((project) => project.id === data.id ? data : project))
      setSelectedProject(data)
      setEditingProject(false)
    }
    setSavingProject(false)
  }

  const createLocation = async (event) => {
    event.preventDefault()
    if (!["admin", "manager", "supervisor"].includes(profile?.role)) return
    if (locationForm.kind === "client_site" && !locationForm.client_id) {
      setError("Selecciona el cliente al que pertenece la ubicación.")
      return
    }

    setSavingLocation(true)
    setError("")
    const { data, error: insertError } = await supabase
      .from("work_locations")
      .insert({
        kind: locationForm.kind,
        client_id: locationForm.kind === "client_site" ? locationForm.client_id : null,
        name: locationForm.name.trim(),
        address_line: locationForm.address_line.trim() || null,
        city: locationForm.city.trim() || null,
        state: locationForm.state.trim() || null,
        postal_code: locationForm.postal_code.trim() || null,
        notes: locationForm.notes.trim() || null,
      })
      .select("id, client_id, company_name, name, kind, workshop_number, address_line, city, state, postal_code, notes, status, clients(legal_name)")
      .single()

    if (insertError) {
      setError("No fue posible guardar la ubicación. Revisa los datos e inténtalo nuevamente.")
    } else {
      setLocations((current) => [...current, data])
      setLocationForm({ kind: "client_site", client_id: "", name: "", address_line: "", city: "", state: "Tamaulipas", postal_code: "", notes: "" })
      setShowLocationForm(false)
    }
    setSavingLocation(false)
  }

  const updateLocation = async (event) => {
    event.preventDefault()
    if (!editingLocation || !["admin", "manager", "supervisor"].includes(profile?.role)) return

    setSavingLocation(true)
    setError("")
    const { data, error: updateError } = await supabase
      .from("work_locations")
      .update({
        company_name: editingLocation.company_name?.trim() || null,
        name: editingLocation.name.trim(),
        address_line: editingLocation.address_line?.trim() || null,
        city: editingLocation.city?.trim() || null,
        state: editingLocation.state?.trim() || null,
        postal_code: editingLocation.postal_code?.trim() || null,
        notes: editingLocation.notes?.trim() || null,
        status: editingLocation.status,
      })
      .eq("id", editingLocation.id)
      .select("id, client_id, company_name, name, kind, workshop_number, address_line, city, state, postal_code, notes, status, clients(legal_name)")
      .single()

    if (updateError) {
      setError("No fue posible actualizar el taller o ubicación.")
    } else {
      setLocations((current) => current.map((location) => location.id === data.id ? data : location))
      setEditingLocation(null)
    }
    setSavingLocation(false)
  }

  const createEquipment = async (event) => {
    event.preventDefault()
    if (!["admin", "manager", "supervisor"].includes(profile?.role)) return

    setSavingEquipment(true)
    setError("")
    const { data, error: insertError } = await supabase
      .from("equipment")
      .insert({
        internal_code: equipmentForm.internal_code.trim().toUpperCase(),
        name: equipmentForm.name.trim(),
        category: equipmentForm.category,
        brand: equipmentForm.brand.trim() || null,
        model: equipmentForm.model.trim() || null,
        serial_number: equipmentForm.serial_number.trim() || null,
        location_id: equipmentForm.location_id || null,
        notes: equipmentForm.notes.trim() || null,
      })
      .select("id, location_id, internal_code, name, category, brand, model, serial_number, status, last_maintenance_date, next_maintenance_date, notes, work_locations(name)")
      .single()

    if (insertError) {
      setError("No fue posible registrar el equipo. Revisa que el código interno no esté repetido.")
    } else {
      setEquipment((current) => [...current, data].sort((a, b) => a.internal_code.localeCompare(b.internal_code)))
      setEquipmentForm({ internal_code: "", name: "", category: "other", brand: "", model: "", serial_number: "", location_id: "", notes: "" })
      setShowEquipmentForm(false)
    }
    setSavingEquipment(false)
  }

  const updateEquipment = async (event) => {
    event.preventDefault()
    if (!editingEquipment || !["admin", "manager", "supervisor"].includes(profile?.role)) return

    setSavingEquipment(true)
    setError("")
    const { data, error: updateError } = await supabase.from("equipment").update({
      internal_code: editingEquipment.internal_code.trim().toUpperCase(),
      name: editingEquipment.name.trim(),
      category: editingEquipment.category,
      brand: editingEquipment.brand?.trim() || null,
      model: editingEquipment.model?.trim() || null,
      serial_number: editingEquipment.serial_number?.trim() || null,
      location_id: editingEquipment.location_id || null,
      status: editingEquipment.status,
      last_maintenance_date: editingEquipment.last_maintenance_date || null,
      next_maintenance_date: editingEquipment.next_maintenance_date || null,
      notes: editingEquipment.notes?.trim() || null,
    }).eq("id", editingEquipment.id)
      .select("id, location_id, internal_code, name, category, brand, model, serial_number, status, last_maintenance_date, next_maintenance_date, notes, work_locations(name)")
      .single()

    if (updateError) {
      setError("No fue posible actualizar el equipo. Revisa el código interno y las fechas.")
    } else {
      setEquipment((current) => current.map((item) => item.id === data.id ? data : item).sort((a, b) => a.internal_code.localeCompare(b.internal_code)))
      setEditingEquipment(null)
    }
    setSavingEquipment(false)
  }

  const assignEquipment = async (event) => {
    event.preventDefault()
    if (!selectedProject || !canEditOperations || !assignmentForm.equipment_id) return

    setAssigningEquipment(true)
    setError("")
    const { data, error: insertError } = await supabase
      .from("project_equipment")
      .insert({
        project_id: selectedProject.id,
        equipment_id: assignmentForm.equipment_id,
        assigned_by: session.user.id,
        purpose: assignmentForm.purpose.trim() || null,
        planned_from: assignmentForm.planned_from || null,
        planned_until: assignmentForm.planned_until || null,
        notes: assignmentForm.notes.trim() || null,
      })
      .select("equipment_id, purpose, planned_from, planned_until, notes, equipment(id, internal_code, name, brand, model)")
      .single()

    if (insertError) {
      setError("No fue posible asignar el equipo. Puede que ya esté agregado al proyecto o que las fechas sean inválidas.")
    } else {
      setProjectEquipment((current) => [data, ...current])
      setAssignmentForm({ equipment_id: "", purpose: "", planned_from: "", planned_until: "", notes: "" })
    }
    setAssigningEquipment(false)
  }

  const createWorkOrder = async (event) => {
    event.preventDefault()
    if (!selectedProject || !canEditOperations) return

    setSavingWorkOrder(true)
    setError("")
    const { data, error: insertError } = await supabase
      .from("work_orders")
      .insert({
        project_id: selectedProject.id,
        assigned_to: workOrderForm.assigned_to || null,
        code: createWorkOrderCode(),
        title: workOrderForm.title.trim(),
        description: workOrderForm.description.trim() || null,
        status: workOrderForm.status,
        scheduled_date: workOrderForm.scheduled_date || null,
        due_date: workOrderForm.due_date || null,
        completed_at: workOrderForm.status === "completed" ? new Date().toISOString() : null,
        created_by: session.user.id,
      })
      .select("id, project_id, assigned_to, code, title, description, status, scheduled_date, due_date, completed_at, created_at, projects(id, code, name), profiles!work_orders_assigned_to_fkey(id, full_name)")
      .single()

    if (insertError) {
      setError("No fue posible crear la orden de trabajo. Revisa las fechas y los datos.")
    } else {
      setWorkOrders((current) => [data, ...current])
      setWorkOrderForm({ assigned_to: "", title: "", description: "", status: "pending", scheduled_date: "", due_date: "" })
    }
    setSavingWorkOrder(false)
  }

  const updateWorkOrderStatus = async (order, status) => {
    if (!canEditOperations) return
    setError("")
    const { error: updateError } = await supabase
      .from("work_orders")
      .update({
        status,
        completed_at: status === "completed" ? (order.completed_at || new Date().toISOString()) : null,
      })
      .eq("id", order.id)

    if (updateError) {
      setError("No fue posible actualizar la orden de trabajo.")
      return
    }
    setWorkOrders((current) => current.map((item) => item.id === order.id ? { ...item, status, completed_at: status === "completed" ? (item.completed_at || new Date().toISOString()) : null } : item))
  }

  const updateWorkOrder = async (event) => {
    event.preventDefault()
    if (!editingWorkOrder || !canEditOperations) return

    setSavingWorkOrder(true)
    setError("")
    const completedAt = editingWorkOrder.status === "completed" ? (editingWorkOrder.completed_at || new Date().toISOString()) : null
    const { data, error: updateError } = await supabase.from("work_orders").update({
      assigned_to: editingWorkOrder.assigned_to || null,
      title: editingWorkOrder.title.trim(),
      description: editingWorkOrder.description?.trim() || null,
      status: editingWorkOrder.status,
      scheduled_date: editingWorkOrder.scheduled_date || null,
      due_date: editingWorkOrder.due_date || null,
      completed_at: completedAt,
    }).eq("id", editingWorkOrder.id)
      .select("id, project_id, assigned_to, code, title, description, status, scheduled_date, due_date, completed_at, created_at, projects(id, code, name), profiles!work_orders_assigned_to_fkey(id, full_name)")
      .single()

    if (updateError) {
      setError("No fue posible actualizar la orden de trabajo. Revisa los datos y las fechas.")
    } else {
      setWorkOrders((current) => current.map((order) => order.id === data.id ? data : order))
      setEditingWorkOrder(null)
    }
    setSavingWorkOrder(false)
  }

  useEffect(() => {
    const timeout = window.setTimeout(loadData, 0)
    return () => window.clearTimeout(timeout)
  }, [loadData])

  return (
    <main className="internal-dashboard">
      <header className="internal-topbar">
        <div className="internal-topbar-brand">
          <div className="internal-brand-mark small"><Building2 size={22} /></div>
          <div><strong>DOXA Interno</strong><span>Gestión operativa</span></div>
        </div>

        <div className="internal-user-actions">
          <div className="internal-user-copy">
            <strong>{profile?.full_name || session.user.email}</strong>
            <span>{ROLE_LABELS[profile?.role] || "Usuario"}</span>
          </div>
          <button type="button" className="internal-icon-button"
            onClick={() => supabase.auth.signOut()} title="Cerrar sesión">
            <LogOut size={19} />
          </button>
        </div>
      </header>

      <nav className="internal-module-nav" aria-label="Módulos internos">
        <button type="button" className={activeModule === "dashboard" ? "active" : ""} onClick={() => setActiveModule("dashboard")}>Inicio</button>
        <button type="button" className={activeModule === "requests" ? "active" : ""} onClick={() => setActiveModule("requests")}>Solicitudes</button>
        <button type="button" className={activeModule === "clients" ? "active" : ""} onClick={() => setActiveModule("clients")}>Clientes</button>
        <button type="button" className={activeModule === "locations" ? "active" : ""} onClick={() => setActiveModule("locations")}>Talleres y ubicaciones</button>
        <button type="button" className={activeModule === "equipment" ? "active" : ""} onClick={() => setActiveModule("equipment")}>Maquinaria y equipo</button>
        <button type="button" className={activeModule === "workOrders" ? "active" : ""} onClick={() => setActiveModule("workOrders")}>Órdenes de trabajo</button>
        {profile?.role === "admin" && <button type="button" className={activeModule === "users" ? "active" : ""} onClick={() => setActiveModule("users")}>Personal</button>}
        <button type="button" className={activeModule === "projects" ? "active" : ""} onClick={() => setActiveModule("projects")}>Proyectos</button>
      </nav>

      <section className="internal-content">
        <div className="internal-heading-row">
          <div>
            <p className="internal-eyebrow">{activeModule === "dashboard" ? "RESUMEN OPERATIVO" : activeModule === "requests" ? "SOLICITUDES" : activeModule === "clients" ? "DIRECTORIO" : ["locations", "equipment", "workOrders", "projects"].includes(activeModule) ? "OPERACIONES" : "ADMINISTRACIÓN"}</p>
            <h1>{activeModule === "dashboard" ? `Hola, ${profile?.full_name?.split(" ")[0] || "equipo"}` : activeModule === "requests" ? "Solicitudes de cotización" : activeModule === "clients" ? "Clientes" : activeModule === "locations" ? "Talleres y ubicaciones" : activeModule === "equipment" ? "Maquinaria y equipo" : activeModule === "workOrders" ? "Órdenes de trabajo" : activeModule === "projects" ? "Proyectos y trabajos" : "Personal"}</h1>
            <p>{activeModule === "dashboard" ? "Revisa el trabajo pendiente, las entregas y el mantenimiento próximo." : activeModule === "requests" ? "Información recibida desde el formulario del sitio web." : activeModule === "clients" ? "Empresas y personas para las que se realizan trabajos." : activeModule === "locations" ? "Talleres del grupo, instalaciones de clientes y sitios externos de trabajo." : activeModule === "equipment" ? "Inventario, ubicación y disponibilidad de los equipos operativos." : activeModule === "workOrders" ? "Actividades asignadas al personal para ejecutar cada proyecto." : activeModule === "projects" ? "Servicios registrados para cada cliente y su seguimiento." : "Invitaciones, roles y acceso al sistema interno."}</p>
          </div>
          {["dashboard", "requests"].includes(activeModule) ? (
            <button type="button" className="internal-refresh" onClick={loadData} disabled={loading}>
              <RefreshCw size={17} className={loading ? "spin" : ""} /> Actualizar
            </button>
          ) : activeModule === "clients" && ["admin", "manager", "supervisor"].includes(profile?.role) ? (
            <button type="button" className="internal-primary-action" onClick={() => setShowClientForm(true)}>
              <Plus size={17} /> Nuevo cliente
            </button>
          ) : activeModule === "locations" && ["admin", "manager", "supervisor"].includes(profile?.role) ? (
            <button type="button" className="internal-primary-action" onClick={() => setShowLocationForm(true)}>
              <Plus size={17} /> Nueva ubicación
            </button>
          ) : activeModule === "equipment" && ["admin", "manager", "supervisor"].includes(profile?.role) ? (
            <button type="button" className="internal-primary-action" onClick={() => setShowEquipmentForm(true)}>
              <Plus size={17} /> Nuevo equipo
            </button>
          ) : activeModule === "projects" && ["admin", "manager", "supervisor", "staff"].includes(profile?.role) ? (
            <button type="button" className="internal-primary-action" onClick={() => setShowProjectForm(true)}>
              <Plus size={17} /> Nuevo trabajo
            </button>
          ) : null}
        </div>

        {activeModule !== "users" && <div className="internal-summary-grid">
          {activeModule === "dashboard" ? <>
            <article><ClipboardList size={22} /><div><strong>{activeProjects.length}</strong><span>Proyectos activos</span></div></article>
            <article><AlertTriangle size={22} /><div><strong>{overdueWorkOrders.length}</strong><span>Órdenes vencidas</span></div></article>
            <article><CalendarDays size={22} /><div><strong>{upcomingProjects.length}</strong><span>Entregas en 30 días</span></div></article>
            <article><Wrench size={22} /><div><strong>{upcomingMaintenance.length}</strong><span>Mantenimientos próximos</span></div></article>
          </> : activeModule === "requests" ? <>
            <article><ClipboardList size={22} /><div><strong>{activeRequests.length}</strong><span>Pendientes</span></div></article>
            <article><Mail size={22} /><div><strong>{requests.filter((item) => item.status === "lead").length}</strong><span>Nuevas</span></div></article>
          </> : activeModule === "clients" ? <>
            <article><Users size={22} /><div><strong>{clients.length}</strong><span>Clientes registrados</span></div></article>
            <article><Building2 size={22} /><div><strong>{clients.filter((item) => item.status === "active").length}</strong><span>Activos</span></div></article>
          </> : activeModule === "locations" ? <>
            <article><Building2 size={22} /><div><strong>{locations.filter((item) => item.kind === "company_workshop").length}</strong><span>Talleres del grupo</span></div></article>
            <article><ClipboardList size={22} /><div><strong>{locations.filter((item) => item.kind !== "company_workshop").length}</strong><span>Ubicaciones externas</span></div></article>
          </> : activeModule === "equipment" ? <>
            <article><Wrench size={22} /><div><strong>{equipment.length}</strong><span>Equipos registrados</span></div></article>
            <article><Check size={22} /><div><strong>{equipment.filter((item) => item.status === "active").length}</strong><span>Activos</span></div></article>
          </> : activeModule === "workOrders" ? <>
            <article><ClipboardList size={22} /><div><strong>{workOrders.length}</strong><span>Órdenes registradas</span></div></article>
            <article><RefreshCw size={22} /><div><strong>{workOrders.filter((item) => ["scheduled", "in_progress", "blocked"].includes(item.status)).length}</strong><span>En seguimiento</span></div></article>
          </> : <>
            <article><ClipboardList size={22} /><div><strong>{projects.length}</strong><span>Trabajos registrados</span></div></article>
            <article><RefreshCw size={22} /><div><strong>{projects.filter((item) => item.status === "in_progress").length}</strong><span>En proceso</span></div></article>
          </>}
        </div>}

        {error && <div className="internal-alert" role="alert">{error}</div>}

        {activeModule === "requests" && <div className="request-view-tabs" role="tablist" aria-label="Vista de solicitudes">
          <button type="button" role="tab" aria-selected={requestView === "active"} className={requestView === "active" ? "active" : ""} onClick={() => setRequestView("active")}>Pendientes <span>{activeRequests.length}</span></button>
          <button type="button" role="tab" aria-selected={requestView === "finished"} className={requestView === "finished" ? "active" : ""} onClick={() => setRequestView("finished")}>Finalizadas <span>{finishedRequests.length}</span></button>
        </div>}

        {!["dashboard", "users"].includes(activeModule) && <div className="internal-list-toolbar">
          <label className="internal-search-field"><Search size={17} /><span className="sr-only">Buscar</span><input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder={activeModule === "requests" ? "Buscar por folio, cliente o servicio" : activeModule === "clients" ? "Buscar por empresa, RFC o contacto" : activeModule === "locations" ? "Buscar taller o ubicación" : activeModule === "equipment" ? "Buscar código, equipo, marca o serie" : activeModule === "workOrders" ? "Buscar orden, proyecto o responsable" : "Buscar proyecto, cliente o servicio"} /></label>
          {statusFilterOptions && <select aria-label="Filtrar por estado" value={Object.hasOwn(statusFilterOptions, listStatus) ? listStatus : "all"} onChange={(event) => setListStatus(event.target.value)}><option value="all">Todos los estados</option>{Object.entries(statusFilterOptions).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>}
        </div>}

        {activeModule === "users" ? <InternalUsers session={session} /> : activeModule === "dashboard" ? <div className="dashboard-panels">
          <section className="dashboard-panel dashboard-panel-wide">
            <div className="dashboard-panel-heading"><div><ClipboardList size={20} /><h2>Mis órdenes pendientes</h2></div><button type="button" onClick={() => setActiveModule("workOrders")}>Ver todas</button></div>
            {myWorkOrders.length === 0 ? <p className="dashboard-empty">No tienes órdenes pendientes asignadas.</p> : <div className="dashboard-list">{myWorkOrders.slice(0, 6).map((order) => <article key={order.id}><div><strong>{order.title}</strong><span>{order.projects?.name || "Proyecto"} · {order.code}</span></div><div><span className={`internal-status status-${order.status}`}>{WORK_ORDER_STATUS_LABELS[order.status]}</span><small>{order.due_date ? `Entrega ${order.due_date}` : "Sin fecha de entrega"}</small></div></article>)}</div>}
          </section>
          <section className="dashboard-panel">
            <div className="dashboard-panel-heading"><div><CalendarDays size={20} /><h2>Próximas entregas</h2></div></div>
            {upcomingProjects.length === 0 ? <p className="dashboard-empty">No hay entregas en los próximos 30 días.</p> : <div className="dashboard-compact-list">{upcomingProjects.slice(0, 6).map((project) => <button type="button" key={project.id} onClick={() => openProject(project)}><div><strong>{project.name}</strong><span>{project.clients?.legal_name || "Sin cliente"}</span></div><time>{project.due_date}</time></button>)}</div>}
          </section>
          <section className="dashboard-panel">
            <div className="dashboard-panel-heading"><div><Wrench size={20} /><h2>Mantenimiento próximo</h2></div></div>
            {upcomingMaintenance.length === 0 ? <p className="dashboard-empty">No hay mantenimientos programados en 30 días.</p> : <div className="dashboard-compact-list">{upcomingMaintenance.slice(0, 6).map((item) => <button type="button" key={item.id} onClick={() => ["admin", "manager", "supervisor"].includes(profile?.role) && setEditingEquipment({ ...item })}><div><strong>{item.name}</strong><span>{item.internal_code} · {item.work_locations?.name || "Sin ubicación"}</span></div><time>{item.next_maintenance_date}</time></button>)}</div>}
          </section>
          {overdueWorkOrders.length > 0 && <section className="dashboard-panel dashboard-panel-wide dashboard-warning-panel"><div className="dashboard-panel-heading"><div><AlertTriangle size={20} /><h2>Órdenes vencidas</h2></div></div><div className="dashboard-list">{overdueWorkOrders.slice(0, 6).map((order) => <article key={order.id}><div><strong>{order.title}</strong><span>{order.projects?.name || "Proyecto"} · {order.profiles?.full_name || "Sin responsable"}</span></div><div><span className={`internal-status status-${order.status}`}>{WORK_ORDER_STATUS_LABELS[order.status]}</span><small>Venció {order.due_date}</small></div></article>)}</div></section>}
        </div> : <div className="internal-table-card">
          {loading ? (
            <div className="internal-empty">Cargando información…</div>
          ) : activeModule === "requests" ? (visibleRequests.length === 0 ? (
            <div className="internal-empty">{requestView === "finished" ? "Todavía no hay solicitudes finalizadas." : "No hay solicitudes pendientes."}</div>
          ) : (
            <div className="internal-table-wrap">
              <table>
                <thead><tr><th>Folio</th><th>Cliente</th><th>Servicio</th><th>Estado</th><th>Recibida</th></tr></thead>
                <tbody>
                  {visibleRequests.map((request) => (
                    <tr key={request.id} className="internal-clickable-row" onClick={() => { setSelectedRequest(request); setConvertingRequest(false) }}>
                      <td><strong>{request.request_code}</strong></td>
                      <td className="internal-stacked-cell"><strong>{request.requester_name}</strong><span>{request.company_name || request.email}</span></td>
                      <td>{request.service}</td>
                      <td><span className={`internal-status status-${request.status}`}>{STATUS_LABELS[request.status] || request.status}</span></td>
                      <td>{formatDate(request.received_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )) : activeModule === "clients" ? (visibleClients.length === 0 ? (
            <div className="internal-empty">Todavía no hay clientes registrados.</div>
          ) : (
            <div className="internal-table-wrap">
              <table>
                <thead><tr><th>Razón social</th><th>Nombre comercial</th><th>RFC</th><th>Contacto</th><th>Estado</th></tr></thead>
                <tbody>{visibleClients.map((client) => (
                  <tr key={client.id} className={["admin", "manager", "supervisor"].includes(profile?.role) ? "internal-clickable-row" : ""} onClick={() => ["admin", "manager", "supervisor"].includes(profile?.role) && setEditingClient({ ...client })}>
                    <td><strong>{client.legal_name}</strong></td>
                    <td>{client.trade_name || "—"}</td>
                    <td>{client.tax_id || "—"}</td>
                    <td className="internal-stacked-cell"><strong>{client.email || "—"}</strong><span>{client.phone || "Sin teléfono"}</span></td>
                    <td><span className={`internal-status status-${client.status}`}>{client.status === "active" ? "Activo" : client.status === "inactive" ? "Inactivo" : "Archivado"}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )) : activeModule === "locations" ? (visibleLocations.length === 0 ? (
            <div className="internal-empty">Todavía no hay talleres o ubicaciones registradas.</div>
          ) : (
            <div className="internal-table-wrap"><table>
              <thead><tr><th>Nombre</th><th>Tipo</th><th>Empresa relacionada</th><th>Ubicación</th><th>Estado</th></tr></thead>
              <tbody>{visibleLocations.map((location) => <tr key={location.id} className={["admin", "manager", "supervisor"].includes(profile?.role) ? "internal-clickable-row" : ""} onClick={() => ["admin", "manager", "supervisor"].includes(profile?.role) && setEditingLocation({ ...location })}>
                <td><strong>{location.name}</strong></td>
                <td>{locationTypeLabel(location)}</td>
                <td>{location.kind === "company_workshop" ? (location.company_name || "Empresa por asignar") : location.kind === "client_site" ? (location.clients?.legal_name || "Cliente por asignar") : "Sitio externo"}</td>
                <td>{[location.address_line, location.city, location.state].filter(Boolean).join(", ") || "Por definir"}</td>
                <td><span className={`internal-status status-${location.status}`}>{location.status === "active" ? "Activa" : location.status === "inactive" ? "Inactiva" : "Archivada"}</span></td>
              </tr>)}</tbody>
            </table></div>
          )) : activeModule === "equipment" ? (visibleEquipment.length === 0 ? (
            <div className="internal-empty">Todavía no hay maquinaria o equipo registrado.</div>
          ) : (
            <div className="internal-table-wrap"><table>
              <thead><tr><th>Código</th><th>Equipo</th><th>Categoría</th><th>Marca / modelo</th><th>Ubicación</th><th>Estado</th></tr></thead>
              <tbody>{visibleEquipment.map((item) => <tr key={item.id} className={["admin", "manager", "supervisor"].includes(profile?.role) ? "internal-clickable-row" : ""} onClick={() => ["admin", "manager", "supervisor"].includes(profile?.role) && setEditingEquipment({ ...item })}>
                <td><strong>{item.internal_code}</strong></td>
                <td>{item.name}</td>
                <td>{EQUIPMENT_CATEGORY_LABELS[item.category] || item.category || "Sin categoría"}</td>
                <td>{[item.brand, item.model].filter(Boolean).join(" · ") || "—"}</td>
                <td>{item.work_locations?.name || "Sin asignar"}</td>
                <td><span className={`internal-status status-${item.status}`}>{EQUIPMENT_STATUS_LABELS[item.status] || item.status}</span></td>
              </tr>)}</tbody>
            </table></div>
          )) : activeModule === "workOrders" ? (visibleWorkOrders.length === 0 ? (
            <div className="internal-empty">Todavía no hay órdenes de trabajo. Abre un proyecto para crear la primera.</div>
          ) : (
            <div className="internal-table-wrap"><table>
              <thead><tr><th>Folio</th><th>Orden</th><th>Proyecto</th><th>Responsable</th><th>Estado</th><th>Programada</th><th>Entrega</th></tr></thead>
              <tbody>{visibleWorkOrders.map((order) => <tr key={order.id} className={canEditOperations ? "internal-clickable-row" : ""} onClick={() => canEditOperations && setEditingWorkOrder({ ...order })}>
                <td><strong>{order.code}</strong></td>
                <td className="internal-stacked-cell"><strong>{order.title}</strong><span>{order.description || "Sin descripción"}</span></td>
                <td className="internal-stacked-cell"><strong>{order.projects?.name || "Proyecto no disponible"}</strong><span>{order.projects?.code || "—"}</span></td>
                <td>{order.profiles?.full_name || "Sin asignar"}</td>
                <td><select className="work-order-status-select" value={order.status} onClick={(event) => event.stopPropagation()} onChange={(event) => updateWorkOrderStatus(order, event.target.value)} disabled={!canEditOperations || savingWorkOrder}>{Object.entries(WORK_ORDER_STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></td>
                <td>{order.scheduled_date || "Por definir"}</td>
                <td>{order.due_date || "Por definir"}</td>
              </tr>)}</tbody>
            </table></div>
          )) : visibleProjects.length === 0 ? (
            <div className="internal-empty">Todavía no hay proyectos o trabajos registrados.</div>
          ) : (
            <div className="internal-table-wrap"><table>
              <thead><tr><th>Folio</th><th>Trabajo</th><th>Cliente / RFC</th><th>Ubicación</th><th>Servicio</th><th>Monto</th><th>Estado</th><th>Inicio</th></tr></thead>
              <tbody>{visibleProjects.map((project) => <tr key={project.id} className="internal-clickable-row" onClick={() => openProject(project)}>
                <td><strong>{project.code}</strong></td>
                <td>{project.name}</td>
                <td className="internal-stacked-cell"><strong>{project.clients?.legal_name || "—"}</strong><span>{project.clients?.tax_id || "Sin RFC"}</span></td>
                <td>{project.work_locations?.name || "Por definir"}</td>
                <td>{project.service || "—"}</td>
                <td><strong>{formatMoney(project.amount, project.currency)}</strong></td>
                <td><span className={`internal-status status-${project.status}`}>{STATUS_LABELS[project.status] || project.status}</span></td>
                <td>{project.start_date || "Por definir"}</td>
              </tr>)}</tbody>
            </table></div>
          )}
        </div>}
      </section>

      {showClientForm && (
        <div className="internal-drawer-backdrop" onClick={() => setShowClientForm(false)}>
          <aside className="internal-drawer" onClick={(event) => event.stopPropagation()} aria-label="Nuevo cliente">
            <button type="button" className="internal-drawer-close" onClick={() => setShowClientForm(false)} aria-label="Cerrar"><X size={20} /></button>
            <p className="internal-eyebrow">DIRECTORIO</p>
            <h2>Nuevo cliente</h2>
            <p className="internal-drawer-company">Registra los datos generales de la empresa.</p>
            <form className="internal-form internal-client-form" onSubmit={createClient}>
              <label htmlFor="legal-name">Razón social *</label>
              <input id="legal-name" value={clientForm.legal_name} onChange={(event) => setClientForm({ ...clientForm, legal_name: event.target.value })} required />
              <label htmlFor="trade-name">Nombre comercial</label>
              <input id="trade-name" value={clientForm.trade_name} onChange={(event) => setClientForm({ ...clientForm, trade_name: event.target.value })} />
              <label htmlFor="tax-id">RFC</label>
              <input id="tax-id" value={clientForm.tax_id} onChange={(event) => setClientForm({ ...clientForm, tax_id: event.target.value.toUpperCase() })} />
              <label htmlFor="client-email">Correo</label>
              <input id="client-email" type="email" value={clientForm.email} onChange={(event) => setClientForm({ ...clientForm, email: event.target.value })} />
              <label htmlFor="client-phone">Teléfono</label>
              <input id="client-phone" value={clientForm.phone} onChange={(event) => setClientForm({ ...clientForm, phone: event.target.value })} />
              <label htmlFor="client-notes">Notas</label>
              <textarea id="client-notes" rows="4" value={clientForm.notes} onChange={(event) => setClientForm({ ...clientForm, notes: event.target.value })} />
              <button type="submit" disabled={savingClient}>{savingClient ? "Guardando…" : "Guardar cliente"}</button>
            </form>
          </aside>
        </div>
      )}

      {editingClient && (
        <div className="internal-drawer-backdrop" onClick={() => setEditingClient(null)}>
          <aside className="internal-drawer" onClick={(event) => event.stopPropagation()} aria-label="Editar cliente">
            <button type="button" className="internal-drawer-close" onClick={() => setEditingClient(null)} aria-label="Cerrar"><X size={20} /></button>
            <p className="internal-eyebrow">DIRECTORIO</p>
            <h2>Editar cliente</h2>
            <p className="internal-drawer-company">Actualiza la información comercial y de contacto.</p>
            <form className="internal-form internal-client-form" onSubmit={updateClient}>
              <label htmlFor="edit-client-legal-name">Razón social *</label>
              <input id="edit-client-legal-name" value={editingClient.legal_name} onChange={(event) => setEditingClient({ ...editingClient, legal_name: event.target.value })} required />
              <label htmlFor="edit-client-trade-name">Nombre comercial</label>
              <input id="edit-client-trade-name" value={editingClient.trade_name || ""} onChange={(event) => setEditingClient({ ...editingClient, trade_name: event.target.value })} />
              <label htmlFor="edit-client-tax-id">RFC</label>
              <input id="edit-client-tax-id" value={editingClient.tax_id || ""} onChange={(event) => setEditingClient({ ...editingClient, tax_id: event.target.value.toUpperCase() })} />
              <label htmlFor="edit-client-email">Correo</label>
              <input id="edit-client-email" type="email" value={editingClient.email || ""} onChange={(event) => setEditingClient({ ...editingClient, email: event.target.value })} />
              <label htmlFor="edit-client-phone">Teléfono</label>
              <input id="edit-client-phone" value={editingClient.phone || ""} onChange={(event) => setEditingClient({ ...editingClient, phone: event.target.value })} />
              <label htmlFor="edit-client-notes">Notas</label>
              <textarea id="edit-client-notes" rows="4" value={editingClient.notes || ""} onChange={(event) => setEditingClient({ ...editingClient, notes: event.target.value })} />
              <label htmlFor="edit-client-status">Estado</label>
              <select id="edit-client-status" value={editingClient.status} onChange={(event) => setEditingClient({ ...editingClient, status: event.target.value })}><option value="active">Activo</option><option value="inactive">Inactivo</option><option value="archived">Archivado</option></select>
              <button type="submit" disabled={savingClient}>{savingClient ? "Guardando…" : "Guardar cambios"}</button>
            </form>
          </aside>
        </div>
      )}

      {showProjectForm && (
        <div className="internal-drawer-backdrop" onClick={() => setShowProjectForm(false)}>
          <aside className="internal-drawer" onClick={(event) => event.stopPropagation()} aria-label="Nuevo trabajo">
            <button type="button" className="internal-drawer-close" onClick={() => setShowProjectForm(false)} aria-label="Cerrar"><X size={20} /></button>
            <p className="internal-eyebrow">OPERACIONES</p>
            <h2>Nuevo trabajo</h2>
            <p className="internal-drawer-company">Asocia el servicio con un cliente registrado.</p>
            <form className="internal-form internal-client-form" onSubmit={createProject}>
              <label htmlFor="project-client">Cliente / RFC *</label>
              <select id="project-client" value={projectForm.client_id} onChange={(event) => setProjectForm({ ...projectForm, client_id: event.target.value })} required>
                <option value="">Selecciona un cliente</option>
                {clients.map((client) => <option key={client.id} value={client.id}>{client.legal_name}{client.tax_id ? ` — ${client.tax_id}` : ""}</option>)}
              </select>
              {clients.length === 0 && <div className="internal-form-hint">Primero un administrador o gerente debe registrar al cliente.</div>}
              <label htmlFor="project-location">Taller o ubicación</label>
              <select id="project-location" value={projectForm.location_id} onChange={(event) => setProjectForm({ ...projectForm, location_id: event.target.value })}>
                <option value="">Por definir</option>
                <optgroup label="Talleres del grupo">
                  {locations.filter((location) => location.kind === "company_workshop" && location.status === "active").map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
                </optgroup>
                <optgroup label="Instalaciones y sitios externos">
                  {locations.filter((location) => location.kind !== "company_workshop" && location.status === "active").map((location) => <option key={location.id} value={location.id}>{location.name}{location.clients?.legal_name ? ` — ${location.clients.legal_name}` : ""}</option>)}
                </optgroup>
              </select>
              <label htmlFor="project-name">Nombre del trabajo *</label>
              <input id="project-name" value={projectForm.name} onChange={(event) => setProjectForm({ ...projectForm, name: event.target.value })} required />
              <label htmlFor="project-service">Servicio</label>
              <input id="project-service" placeholder="Ej. Fabricación de tubería" value={projectForm.service} onChange={(event) => setProjectForm({ ...projectForm, service: event.target.value })} />
              <label htmlFor="project-description">Descripción</label>
              <textarea id="project-description" rows="4" value={projectForm.description} onChange={(event) => setProjectForm({ ...projectForm, description: event.target.value })} />
              <div className="internal-form-columns">
                <div><label htmlFor="project-amount">Monto del trabajo</label><input id="project-amount" type="number" min="0" step="0.01" inputMode="decimal" placeholder="0.00" value={projectForm.amount} onChange={(event) => setProjectForm({ ...projectForm, amount: event.target.value })} /></div>
                <div><label htmlFor="project-currency">Moneda</label><select id="project-currency" value={projectForm.currency} onChange={(event) => setProjectForm({ ...projectForm, currency: event.target.value })}><option value="MXN">MXN — Pesos</option><option value="USD">USD — Dólares</option></select></div>
              </div>
              <label htmlFor="project-status">Estado</label>
              <select id="project-status" value={projectForm.status} onChange={(event) => setProjectForm({ ...projectForm, status: event.target.value })}>
                {Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
              <div className="internal-form-columns">
                <div><label htmlFor="project-start">Fecha de inicio</label><input id="project-start" type="date" value={projectForm.start_date} onChange={(event) => setProjectForm({ ...projectForm, start_date: event.target.value })} /></div>
                <div><label htmlFor="project-due">Fecha de entrega</label><input id="project-due" type="date" min={projectForm.start_date || undefined} value={projectForm.due_date} onChange={(event) => setProjectForm({ ...projectForm, due_date: event.target.value })} /></div>
              </div>
              <button type="submit" disabled={savingProject || clients.length === 0}>{savingProject ? "Guardando…" : "Guardar trabajo"}</button>
            </form>
          </aside>
        </div>
      )}

      {showLocationForm && (
        <div className="internal-drawer-backdrop" onClick={() => setShowLocationForm(false)}>
          <aside className="internal-drawer" onClick={(event) => event.stopPropagation()} aria-label="Nueva ubicación">
            <button type="button" className="internal-drawer-close" onClick={() => setShowLocationForm(false)} aria-label="Cerrar"><X size={20} /></button>
            <p className="internal-eyebrow">OPERACIONES</p>
            <h2>Nueva ubicación</h2>
            <p className="internal-drawer-company">Registra instalaciones de un cliente o un sitio externo de trabajo.</p>
            <form className="internal-form internal-client-form" onSubmit={createLocation}>
              <label htmlFor="location-kind">Tipo *</label>
              <select id="location-kind" value={locationForm.kind} onChange={(event) => setLocationForm({ ...locationForm, kind: event.target.value, client_id: event.target.value === "client_site" ? locationForm.client_id : "" })}>
                <option value="client_site">Instalaciones del cliente</option>
                <option value="external_site">Sitio externo, playa u otro</option>
              </select>
              {locationForm.kind === "client_site" && <>
                <label htmlFor="location-client">Cliente *</label>
                <select id="location-client" value={locationForm.client_id} onChange={(event) => setLocationForm({ ...locationForm, client_id: event.target.value })} required>
                  <option value="">Selecciona un cliente</option>
                  {clients.map((client) => <option key={client.id} value={client.id}>{client.legal_name}</option>)}
                </select>
              </>}
              <label htmlFor="location-name">Nombre de la ubicación *</label>
              <input id="location-name" placeholder={locationForm.kind === "client_site" ? "Ej. Planta Altamira" : "Ej. Playa Miramar"} value={locationForm.name} onChange={(event) => setLocationForm({ ...locationForm, name: event.target.value })} required />
              <label htmlFor="location-address">Dirección</label>
              <input id="location-address" value={locationForm.address_line} onChange={(event) => setLocationForm({ ...locationForm, address_line: event.target.value })} />
              <div className="internal-form-columns">
                <div><label htmlFor="location-city">Ciudad</label><input id="location-city" value={locationForm.city} onChange={(event) => setLocationForm({ ...locationForm, city: event.target.value })} /></div>
                <div><label htmlFor="location-state">Estado</label><input id="location-state" value={locationForm.state} onChange={(event) => setLocationForm({ ...locationForm, state: event.target.value })} /></div>
              </div>
              <label htmlFor="location-postal">Código postal</label>
              <input id="location-postal" value={locationForm.postal_code} onChange={(event) => setLocationForm({ ...locationForm, postal_code: event.target.value })} />
              <label htmlFor="location-notes">Indicaciones o notas</label>
              <textarea id="location-notes" rows="4" value={locationForm.notes} onChange={(event) => setLocationForm({ ...locationForm, notes: event.target.value })} />
              <button type="submit" disabled={savingLocation}>{savingLocation ? "Guardando…" : "Guardar ubicación"}</button>
            </form>
          </aside>
        </div>
      )}

      {editingLocation && (
        <div className="internal-drawer-backdrop" onClick={() => setEditingLocation(null)}>
          <aside className="internal-drawer" onClick={(event) => event.stopPropagation()} aria-label="Editar taller o ubicación">
            <button type="button" className="internal-drawer-close" onClick={() => setEditingLocation(null)} aria-label="Cerrar"><X size={20} /></button>
            <p className="internal-eyebrow">{locationTypeLabel(editingLocation).toUpperCase()}</p>
            <h2>Editar ubicación</h2>
            <p className="internal-drawer-company">Actualiza la empresa responsable y los datos del sitio.</p>
            <form className="internal-form internal-client-form" onSubmit={updateLocation}>
              {editingLocation.kind === "company_workshop" && <>
                <label htmlFor="edit-location-company">Empresa responsable *</label>
                <input id="edit-location-company" value={editingLocation.company_name || ""} onChange={(event) => setEditingLocation({ ...editingLocation, company_name: event.target.value })} minLength={2} maxLength={150} required />
              </>}
              <label htmlFor="edit-location-name">Nombre de la ubicación *</label>
              <input id="edit-location-name" value={editingLocation.name} onChange={(event) => setEditingLocation({ ...editingLocation, name: event.target.value })} required />
              <label htmlFor="edit-location-address">Dirección</label>
              <input id="edit-location-address" value={editingLocation.address_line || ""} onChange={(event) => setEditingLocation({ ...editingLocation, address_line: event.target.value })} />
              <div className="internal-form-columns">
                <div><label htmlFor="edit-location-city">Ciudad</label><input id="edit-location-city" value={editingLocation.city || ""} onChange={(event) => setEditingLocation({ ...editingLocation, city: event.target.value })} /></div>
                <div><label htmlFor="edit-location-state">Estado</label><input id="edit-location-state" value={editingLocation.state || ""} onChange={(event) => setEditingLocation({ ...editingLocation, state: event.target.value })} /></div>
              </div>
              <label htmlFor="edit-location-postal">Código postal</label>
              <input id="edit-location-postal" value={editingLocation.postal_code || ""} onChange={(event) => setEditingLocation({ ...editingLocation, postal_code: event.target.value })} />
              <label htmlFor="edit-location-status">Estado del registro</label>
              <select id="edit-location-status" value={editingLocation.status} onChange={(event) => setEditingLocation({ ...editingLocation, status: event.target.value })}>
                <option value="active">Activa</option><option value="inactive">Inactiva</option><option value="archived">Archivada</option>
              </select>
              <label htmlFor="edit-location-notes">Indicaciones o notas</label>
              <textarea id="edit-location-notes" rows="4" value={editingLocation.notes || ""} onChange={(event) => setEditingLocation({ ...editingLocation, notes: event.target.value })} />
              <button type="submit" disabled={savingLocation}>{savingLocation ? "Guardando…" : "Guardar cambios"}</button>
            </form>
          </aside>
        </div>
      )}

      {showEquipmentForm && (
        <div className="internal-drawer-backdrop" onClick={() => setShowEquipmentForm(false)}>
          <aside className="internal-drawer" onClick={(event) => event.stopPropagation()} aria-label="Nuevo equipo">
            <button type="button" className="internal-drawer-close" onClick={() => setShowEquipmentForm(false)} aria-label="Cerrar"><X size={20} /></button>
            <p className="internal-eyebrow">INVENTARIO</p>
            <h2>Nuevo equipo</h2>
            <p className="internal-drawer-company">Registra maquinaria, vehículos y herramientas operativas.</p>
            <form className="internal-form internal-client-form" onSubmit={createEquipment}>
              <label htmlFor="equipment-code">Código interno *</label>
              <input id="equipment-code" placeholder="Ej. EQ-010" value={equipmentForm.internal_code} onChange={(event) => setEquipmentForm({ ...equipmentForm, internal_code: event.target.value.toUpperCase() })} required />
              <label htmlFor="equipment-name">Nombre del equipo *</label>
              <input id="equipment-name" value={equipmentForm.name} onChange={(event) => setEquipmentForm({ ...equipmentForm, name: event.target.value })} required />
              <label htmlFor="equipment-category">Categoría</label>
              <select id="equipment-category" value={equipmentForm.category} onChange={(event) => setEquipmentForm({ ...equipmentForm, category: event.target.value })}>
                {Object.entries(EQUIPMENT_CATEGORY_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
              <div className="internal-form-columns">
                <div><label htmlFor="equipment-brand">Marca</label><input id="equipment-brand" value={equipmentForm.brand} onChange={(event) => setEquipmentForm({ ...equipmentForm, brand: event.target.value })} /></div>
                <div><label htmlFor="equipment-model">Modelo</label><input id="equipment-model" value={equipmentForm.model} onChange={(event) => setEquipmentForm({ ...equipmentForm, model: event.target.value })} /></div>
              </div>
              <label htmlFor="equipment-serial">Número de serie</label>
              <input id="equipment-serial" value={equipmentForm.serial_number} onChange={(event) => setEquipmentForm({ ...equipmentForm, serial_number: event.target.value })} />
              <label htmlFor="equipment-location">Ubicación actual</label>
              <select id="equipment-location" value={equipmentForm.location_id} onChange={(event) => setEquipmentForm({ ...equipmentForm, location_id: event.target.value })}>
                <option value="">Sin asignar</option>
                {locations.filter((location) => location.status === "active").map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
              </select>
              <label htmlFor="equipment-notes">Capacidad, uso o notas</label>
              <textarea id="equipment-notes" rows="4" value={equipmentForm.notes} onChange={(event) => setEquipmentForm({ ...equipmentForm, notes: event.target.value })} />
              <button type="submit" disabled={savingEquipment}>{savingEquipment ? "Guardando…" : "Guardar equipo"}</button>
            </form>
          </aside>
        </div>
      )}

      {editingEquipment && (
        <div className="internal-drawer-backdrop" onClick={() => setEditingEquipment(null)}>
          <aside className="internal-drawer" onClick={(event) => event.stopPropagation()} aria-label="Editar equipo">
            <button type="button" className="internal-drawer-close" onClick={() => setEditingEquipment(null)} aria-label="Cerrar"><X size={20} /></button>
            <p className="internal-eyebrow">INVENTARIO</p>
            <h2>Editar equipo</h2>
            <p className="internal-drawer-company">Actualiza su identificación, ubicación y mantenimiento.</p>
            <form className="internal-form internal-client-form" onSubmit={updateEquipment}>
              <label htmlFor="edit-equipment-code">Código interno *</label>
              <input id="edit-equipment-code" value={editingEquipment.internal_code} onChange={(event) => setEditingEquipment({ ...editingEquipment, internal_code: event.target.value.toUpperCase() })} required />
              <label htmlFor="edit-equipment-name">Nombre del equipo *</label>
              <input id="edit-equipment-name" value={editingEquipment.name} onChange={(event) => setEditingEquipment({ ...editingEquipment, name: event.target.value })} required />
              <label htmlFor="edit-equipment-category">Categoría</label>
              <select id="edit-equipment-category" value={editingEquipment.category || "other"} onChange={(event) => setEditingEquipment({ ...editingEquipment, category: event.target.value })}>{Object.entries(EQUIPMENT_CATEGORY_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
              <div className="internal-form-columns">
                <div><label htmlFor="edit-equipment-brand">Marca</label><input id="edit-equipment-brand" value={editingEquipment.brand || ""} onChange={(event) => setEditingEquipment({ ...editingEquipment, brand: event.target.value })} /></div>
                <div><label htmlFor="edit-equipment-model">Modelo</label><input id="edit-equipment-model" value={editingEquipment.model || ""} onChange={(event) => setEditingEquipment({ ...editingEquipment, model: event.target.value })} /></div>
              </div>
              <label htmlFor="edit-equipment-serial">Número de serie</label>
              <input id="edit-equipment-serial" value={editingEquipment.serial_number || ""} onChange={(event) => setEditingEquipment({ ...editingEquipment, serial_number: event.target.value })} />
              <label htmlFor="edit-equipment-location">Ubicación actual</label>
              <select id="edit-equipment-location" value={editingEquipment.location_id || ""} onChange={(event) => setEditingEquipment({ ...editingEquipment, location_id: event.target.value })}><option value="">Sin asignar</option>{locations.filter((location) => location.status === "active").map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}</select>
              <label htmlFor="edit-equipment-status">Estado</label>
              <select id="edit-equipment-status" value={editingEquipment.status} onChange={(event) => setEditingEquipment({ ...editingEquipment, status: event.target.value })}><option value="active">Activo</option><option value="inactive">Inactivo</option><option value="archived">Archivado</option></select>
              <div className="internal-form-columns">
                <div><label htmlFor="edit-equipment-last-maintenance">Último mantenimiento</label><input id="edit-equipment-last-maintenance" type="date" value={editingEquipment.last_maintenance_date || ""} onChange={(event) => setEditingEquipment({ ...editingEquipment, last_maintenance_date: event.target.value })} /></div>
                <div><label htmlFor="edit-equipment-next-maintenance">Próximo mantenimiento</label><input id="edit-equipment-next-maintenance" type="date" value={editingEquipment.next_maintenance_date || ""} onChange={(event) => setEditingEquipment({ ...editingEquipment, next_maintenance_date: event.target.value })} /></div>
              </div>
              <label htmlFor="edit-equipment-notes">Capacidad, uso o notas</label>
              <textarea id="edit-equipment-notes" rows="4" value={editingEquipment.notes || ""} onChange={(event) => setEditingEquipment({ ...editingEquipment, notes: event.target.value })} />
              <button type="submit" disabled={savingEquipment}>{savingEquipment ? "Guardando…" : "Guardar cambios"}</button>
            </form>
          </aside>
        </div>
      )}

      {editingWorkOrder && (
        <div className="internal-drawer-backdrop" onClick={() => setEditingWorkOrder(null)}>
          <aside className="internal-drawer" onClick={(event) => event.stopPropagation()} aria-label="Editar orden de trabajo">
            <button type="button" className="internal-drawer-close" onClick={() => setEditingWorkOrder(null)} aria-label="Cerrar"><X size={20} /></button>
            <p className="internal-eyebrow">{editingWorkOrder.code}</p>
            <h2>Editar orden</h2>
            <p className="internal-drawer-company">{editingWorkOrder.projects?.name || "Proyecto"}</p>
            <form className="internal-form internal-client-form" onSubmit={updateWorkOrder}>
              <label htmlFor="edit-order-title">Actividad *</label>
              <input id="edit-order-title" minLength={3} maxLength={160} value={editingWorkOrder.title} onChange={(event) => setEditingWorkOrder({ ...editingWorkOrder, title: event.target.value })} required />
              <label htmlFor="edit-order-assignee">Responsable</label>
              <select id="edit-order-assignee" value={editingWorkOrder.assigned_to || ""} onChange={(event) => setEditingWorkOrder({ ...editingWorkOrder, assigned_to: event.target.value })}><option value="">Sin asignar</option>{team.map((member) => <option key={member.id} value={member.id}>{member.full_name} — {ROLE_LABELS[member.role] || member.role}</option>)}</select>
              <label htmlFor="edit-order-description">Instrucciones o alcance</label>
              <textarea id="edit-order-description" rows="4" maxLength={4000} value={editingWorkOrder.description || ""} onChange={(event) => setEditingWorkOrder({ ...editingWorkOrder, description: event.target.value })} />
              <label htmlFor="edit-order-status">Estado</label>
              <select id="edit-order-status" value={editingWorkOrder.status} onChange={(event) => setEditingWorkOrder({ ...editingWorkOrder, status: event.target.value })}>{Object.entries(WORK_ORDER_STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
              <div className="internal-form-columns">
                <div><label htmlFor="edit-order-scheduled">Programada</label><input id="edit-order-scheduled" type="date" value={editingWorkOrder.scheduled_date || ""} onChange={(event) => setEditingWorkOrder({ ...editingWorkOrder, scheduled_date: event.target.value })} /></div>
                <div><label htmlFor="edit-order-due">Entrega</label><input id="edit-order-due" type="date" min={editingWorkOrder.scheduled_date || undefined} value={editingWorkOrder.due_date || ""} onChange={(event) => setEditingWorkOrder({ ...editingWorkOrder, due_date: event.target.value })} /></div>
              </div>
              <button type="submit" disabled={savingWorkOrder}>{savingWorkOrder ? "Guardando…" : "Guardar cambios"}</button>
            </form>
          </aside>
        </div>
      )}

      {selectedProject && (
        <div className="internal-drawer-backdrop" onClick={() => setSelectedProject(null)}>
          <aside className="internal-drawer internal-project-drawer" onClick={(event) => event.stopPropagation()} aria-label="Detalle del proyecto">
            <button type="button" className="internal-drawer-close" onClick={() => setSelectedProject(null)} aria-label="Cerrar"><X size={20} /></button>
            <p className="internal-eyebrow">{selectedProject.code}</p>
            <h2>{selectedProject.name}</h2>
            <p className="internal-drawer-company">{selectedProject.clients?.legal_name || "Cliente sin nombre"}</p>

            {canEditOperations && <button type="button" className="project-edit-button" onClick={() => setEditingProject((current) => !current)}><Pencil size={16} /> {editingProject ? "Cancelar edición" : "Editar proyecto"}</button>}

            {requests.find((request) => request.project_id === selectedProject.id) && <div className="project-source-request"><span>Solicitud de origen</span><strong>{requests.find((request) => request.project_id === selectedProject.id).request_code}</strong></div>}

            {editingProject && projectEditForm && <form className="internal-form internal-client-form project-edit-form" onSubmit={updateProject}>
              <label htmlFor="edit-project-name">Nombre del trabajo *</label>
              <input id="edit-project-name" value={projectEditForm.name} onChange={(event) => setProjectEditForm({ ...projectEditForm, name: event.target.value })} required />
              <label htmlFor="edit-project-service">Servicio</label>
              <input id="edit-project-service" value={projectEditForm.service} onChange={(event) => setProjectEditForm({ ...projectEditForm, service: event.target.value })} />
              <label htmlFor="edit-project-description">Descripción</label>
              <textarea id="edit-project-description" rows="3" value={projectEditForm.description} onChange={(event) => setProjectEditForm({ ...projectEditForm, description: event.target.value })} />
              <label htmlFor="edit-project-location">Taller o ubicación</label>
              <select id="edit-project-location" value={projectEditForm.location_id} onChange={(event) => setProjectEditForm({ ...projectEditForm, location_id: event.target.value })}>
                <option value="">Por definir</option>
                {locations.filter((location) => location.status === "active").map((location) => <option key={location.id} value={location.id}>{location.name}{location.company_name ? ` — ${location.company_name}` : location.clients?.legal_name ? ` — ${location.clients.legal_name}` : ""}</option>)}
              </select>
              <div className="internal-form-columns">
                <div><label htmlFor="edit-project-amount">Monto</label><input id="edit-project-amount" type="number" min="0" step="0.01" value={projectEditForm.amount} onChange={(event) => setProjectEditForm({ ...projectEditForm, amount: event.target.value })} /></div>
                <div><label htmlFor="edit-project-currency">Moneda</label><select id="edit-project-currency" value={projectEditForm.currency} onChange={(event) => setProjectEditForm({ ...projectEditForm, currency: event.target.value })}><option value="MXN">MXN — Pesos</option><option value="USD">USD — Dólares</option></select></div>
              </div>
              <label htmlFor="edit-project-status">Estado</label>
              <select id="edit-project-status" value={projectEditForm.status} onChange={(event) => setProjectEditForm({ ...projectEditForm, status: event.target.value })}>{Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
              <div className="internal-form-columns">
                <div><label htmlFor="edit-project-start">Inicio</label><input id="edit-project-start" type="date" value={projectEditForm.start_date} onChange={(event) => setProjectEditForm({ ...projectEditForm, start_date: event.target.value })} /></div>
                <div><label htmlFor="edit-project-due">Entrega</label><input id="edit-project-due" type="date" min={projectEditForm.start_date || undefined} value={projectEditForm.due_date} onChange={(event) => setProjectEditForm({ ...projectEditForm, due_date: event.target.value })} /></div>
              </div>
              <button type="submit" disabled={savingProject}>{savingProject ? "Guardando…" : "Guardar cambios"}</button>
            </form>}

            {!editingProject && <dl className="internal-detail-list">
              <div><dt>Servicio</dt><dd>{selectedProject.service || "Sin especificar"}</dd></div>
              <div><dt>Monto</dt><dd><strong>{formatMoney(selectedProject.amount, selectedProject.currency)}</strong></dd></div>
              <div><dt>Estado</dt><dd>{STATUS_LABELS[selectedProject.status] || selectedProject.status}</dd></div>
              <div><dt>Ubicación</dt><dd>{selectedProject.work_locations?.name || "Por definir"}</dd></div>
              <div><dt>Inicio</dt><dd>{selectedProject.start_date || "Por definir"}</dd></div>
              <div><dt>Entrega</dt><dd>{selectedProject.due_date || "Por definir"}</dd></div>
            </dl>}

            {loadingProject ? <div className="internal-empty">Cargando expediente…</div> : <>
              <section className="project-detail-section">
                <div className="project-detail-heading"><div><ClipboardList size={20} /><h3>Órdenes de trabajo</h3></div></div>
                {workOrders.filter((order) => order.project_id === selectedProject.id).length === 0 ? <p className="project-section-empty">Todavía no hay órdenes para este proyecto.</p> : (
                  <div className="project-work-order-list">{workOrders.filter((order) => order.project_id === selectedProject.id).map((order) => <article key={order.id}>
                    <div className="project-work-order-heading"><div><strong>{order.code}</strong><h4>{order.title}</h4></div><select value={order.status} onChange={(event) => updateWorkOrderStatus(order, event.target.value)} disabled={!canEditOperations || savingWorkOrder}>{Object.entries(WORK_ORDER_STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
                    {order.description && <p>{order.description}</p>}
                    <small>Responsable: {order.profiles?.full_name || "Sin asignar"} · Programada: {order.scheduled_date || "por definir"} · Entrega: {order.due_date || "por definir"}</small>
                  </article>)}</div>
                )}
                {canEditOperations && <form className="internal-form internal-client-form project-lesson-form" onSubmit={createWorkOrder}>
                  <h4>Crear orden de trabajo</h4>
                  <label htmlFor="work-order-title">Actividad *</label>
                  <input id="work-order-title" minLength={3} maxLength={160} value={workOrderForm.title} onChange={(event) => setWorkOrderForm({ ...workOrderForm, title: event.target.value })} required />
                  <label htmlFor="work-order-assignee">Responsable</label>
                  <select id="work-order-assignee" value={workOrderForm.assigned_to} onChange={(event) => setWorkOrderForm({ ...workOrderForm, assigned_to: event.target.value })}><option value="">Sin asignar</option>{team.map((member) => <option key={member.id} value={member.id}>{member.full_name} — {ROLE_LABELS[member.role] || member.role}</option>)}</select>
                  <label htmlFor="work-order-description">Instrucciones o alcance</label>
                  <textarea id="work-order-description" rows="3" maxLength={4000} value={workOrderForm.description} onChange={(event) => setWorkOrderForm({ ...workOrderForm, description: event.target.value })} />
                  <div className="internal-form-columns">
                    <div><label htmlFor="work-order-scheduled">Programada</label><input id="work-order-scheduled" type="date" value={workOrderForm.scheduled_date} onChange={(event) => setWorkOrderForm({ ...workOrderForm, scheduled_date: event.target.value })} /></div>
                    <div><label htmlFor="work-order-due">Entrega</label><input id="work-order-due" type="date" min={workOrderForm.scheduled_date || undefined} value={workOrderForm.due_date} onChange={(event) => setWorkOrderForm({ ...workOrderForm, due_date: event.target.value })} /></div>
                  </div>
                  <label htmlFor="work-order-status">Estado inicial</label>
                  <select id="work-order-status" value={workOrderForm.status} onChange={(event) => setWorkOrderForm({ ...workOrderForm, status: event.target.value })}>{Object.entries(WORK_ORDER_STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
                  <button type="submit" disabled={savingWorkOrder}>{savingWorkOrder ? "Guardando…" : "Crear orden"}</button>
                </form>}
              </section>

              <section className="project-detail-section">
                <div className="project-detail-heading"><div><Wrench size={20} /><h3>Maquinaria y equipo asignado</h3></div></div>
                {projectEquipment.length === 0 ? <p className="project-section-empty">Todavía no hay equipos asignados.</p> : (
                  <div className="project-equipment-list">{projectEquipment.map((item) => <article key={item.equipment_id}>
                    <div><strong>{item.equipment?.internal_code} · {item.equipment?.name}</strong><span>{[item.equipment?.brand, item.equipment?.model].filter(Boolean).join(" · ")}</span></div>
                    <p>{item.purpose || "Sin propósito indicado"}</p>
                    <small>{item.planned_from || "Fecha abierta"} → {item.planned_until || "Sin fecha final"}</small>
                  </article>)}</div>
                )}
                {canEditOperations && <form className="internal-form internal-client-form project-lesson-form" onSubmit={assignEquipment}>
                  <h4>Asignar equipo</h4>
                  <label htmlFor="assignment-equipment">Equipo *</label>
                  <select id="assignment-equipment" value={assignmentForm.equipment_id} onChange={(event) => setAssignmentForm({ ...assignmentForm, equipment_id: event.target.value })} required>
                    <option value="">Selecciona un equipo</option>
                    {equipment.filter((item) => item.status === "active" && !projectEquipment.some((assigned) => assigned.equipment_id === item.id)).map((item) => <option key={item.id} value={item.id}>{item.internal_code} — {item.name}</option>)}
                  </select>
                  <label htmlFor="assignment-purpose">Uso dentro del proyecto</label>
                  <input id="assignment-purpose" value={assignmentForm.purpose} onChange={(event) => setAssignmentForm({ ...assignmentForm, purpose: event.target.value })} placeholder="Ej. Maniobra e izaje de estructura" />
                  <div className="internal-form-columns">
                    <div><label htmlFor="assignment-from">Desde</label><input id="assignment-from" type="date" value={assignmentForm.planned_from} onChange={(event) => setAssignmentForm({ ...assignmentForm, planned_from: event.target.value })} /></div>
                    <div><label htmlFor="assignment-until">Hasta</label><input id="assignment-until" type="date" min={assignmentForm.planned_from || undefined} value={assignmentForm.planned_until} onChange={(event) => setAssignmentForm({ ...assignmentForm, planned_until: event.target.value })} /></div>
                  </div>
                  <label htmlFor="assignment-notes">Notas</label>
                  <textarea id="assignment-notes" rows="2" value={assignmentForm.notes} onChange={(event) => setAssignmentForm({ ...assignmentForm, notes: event.target.value })} />
                  <button type="submit" disabled={assigningEquipment || !assignmentForm.equipment_id}>{assigningEquipment ? "Asignando…" : "Asignar equipo"}</button>
                </form>}
              </section>

              <section className="project-detail-section">
                <div className="project-detail-heading"><div><FileText size={20} /><h3>Documentos del proyecto</h3></div></div>
                {projectDocuments.length === 0 ? <p className="project-section-empty">Todavía no hay documentos guardados.</p> : (
                  <div className="project-document-list">{projectDocuments.map((document) => <article key={document.id}>
                    <div className="project-document-icon"><FileText size={20} /></div>
                    <div><strong>{document.file_name}</strong><span>{DOCUMENT_CATEGORY_LABELS[document.category] || "Otro"} · {document.profiles?.full_name || "Personal DOXA"} · {formatDate(document.created_at)}</span>{document.description && <p>{document.description}</p>}</div>
                    <button type="button" onClick={() => downloadProjectDocument(document)} title={`Descargar ${document.file_name}`}><Download size={17} /> Descargar</button>
                  </article>)}</div>
                )}
                {canEditOperations && <form className="internal-form internal-client-form project-lesson-form" onSubmit={uploadProjectDocument}>
                  <h4>Agregar documento</h4>
                  <label htmlFor="document-category">Tipo de documento</label>
                  <select id="document-category" value={documentForm.category} onChange={(event) => setDocumentForm({ ...documentForm, category: event.target.value })}>{Object.entries(DOCUMENT_CATEGORY_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
                  <label htmlFor="document-file">Archivo *</label>
                  <input id="document-file" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,image/jpeg,image/png,image/webp" onChange={(event) => setDocumentForm({ ...documentForm, file: event.target.files?.[0] || null })} required />
                  <p className="internal-form-file-hint">PDF, Word, Excel, CSV, texto o imagen. Máximo 10 MB.</p>
                  <label htmlFor="document-description">Descripción</label>
                  <textarea id="document-description" rows="2" maxLength={500} value={documentForm.description} onChange={(event) => setDocumentForm({ ...documentForm, description: event.target.value })} placeholder="Ej. Plano aprobado para fabricación" />
                  <button type="submit" disabled={uploadingDocument || !documentForm.file}>{uploadingDocument ? "Subiendo…" : "Guardar documento"}</button>
                </form>}
              </section>

              <section className="project-detail-section">
                <div className="project-detail-heading">
                  <div><Camera size={20} /><h3>Fotografías del proyecto</h3></div>
                  {canEditOperations && <label className="project-upload-button">
                    <Upload size={16} /> {uploadingPhotos ? "Subiendo…" : "Agregar fotos"}
                    <input type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={uploadingPhotos} onChange={uploadProjectPhotos} />
                  </label>}
                </div>
                {projectPhotos.length === 0 ? (
                  <p className="project-section-empty">Todavía no hay fotografías.</p>
                ) : (
                  <div className="project-photo-grid">
                    {projectPhotos.map((photo) => <a key={photo.id} href={photo.url} target="_blank" rel="noreferrer" title={photo.file_name}>
                      <img src={photo.url} alt={photo.description || photo.file_name} loading="lazy" />
                    </a>)}
                  </div>
                )}
              </section>

              <section className="project-detail-section">
                <div className="project-detail-heading"><div><Lightbulb size={20} /><h3>Lecciones aprendidas</h3></div></div>
                {projectLessons.length === 0 ? <p className="project-section-empty">Todavía no se han registrado lecciones.</p> : (
                  <div className="project-lessons-list">{projectLessons.map((item) => <article key={item.id}>
                    <div className="project-lesson-meta">
                      <span className={`lesson-category lesson-${item.category}`}>{item.category === "success" ? "Funcionó bien" : item.category === "improvement" ? "Mejora" : "Reto"}</span>
                      <span>{item.profiles?.full_name || "Personal DOXA"} · {formatDate(item.created_at)}</span>
                    </div>
                    <h4>{item.title}</h4>
                    <p><strong>Qué ocurrió:</strong> {item.situation}</p>
                    <p><strong>Aprendizaje:</strong> {item.lesson}</p>
                  </article>)}</div>
                )}

                {canEditOperations && <form className="internal-form internal-client-form project-lesson-form" onSubmit={createLesson}>
                  <h4>Registrar una lección</h4>
                  <label htmlFor="lesson-category">Tipo</label>
                  <select id="lesson-category" value={lessonForm.category} onChange={(event) => setLessonForm({ ...lessonForm, category: event.target.value })}>
                    <option value="challenge">Reto o complicación</option>
                    <option value="success">Algo que funcionó bien</option>
                    <option value="improvement">Oportunidad de mejora</option>
                  </select>
                  <label htmlFor="lesson-title">Título *</label>
                  <input id="lesson-title" minLength={3} maxLength={160} value={lessonForm.title} onChange={(event) => setLessonForm({ ...lessonForm, title: event.target.value })} required />
                  <label htmlFor="lesson-situation">¿Qué ocurrió? *</label>
                  <textarea id="lesson-situation" rows="3" minLength={3} maxLength={4000} value={lessonForm.situation} onChange={(event) => setLessonForm({ ...lessonForm, situation: event.target.value })} required />
                  <label htmlFor="lesson-result">¿Qué aprendimos o recomendamos? *</label>
                  <textarea id="lesson-result" rows="3" minLength={3} maxLength={4000} value={lessonForm.lesson} onChange={(event) => setLessonForm({ ...lessonForm, lesson: event.target.value })} required />
                  <button type="submit" disabled={savingLesson}>{savingLesson ? "Guardando…" : "Guardar lección"}</button>
                </form>}
              </section>
            </>}
          </aside>
        </div>
      )}

      {selectedRequest && (
        <div className="internal-drawer-backdrop" onClick={() => { setSelectedRequest(null); setConvertingRequest(false) }}>
          <aside className="internal-drawer" onClick={(event) => event.stopPropagation()} aria-label="Detalle de solicitud">
            <button type="button" className="internal-drawer-close" onClick={() => { setSelectedRequest(null); setConvertingRequest(false) }} aria-label="Cerrar">
              <X size={20} />
            </button>

            <p className="internal-eyebrow">{selectedRequest.request_code}</p>
            <h2>{selectedRequest.requester_name}</h2>
            <p className="internal-drawer-company">{selectedRequest.company_name || "Sin empresa indicada"}</p>

            <dl className="internal-detail-list">
              <div><dt>Servicio</dt><dd>{selectedRequest.service}</dd></div>
              <div><dt>Correo</dt><dd><a href={`mailto:${selectedRequest.email}`}>{selectedRequest.email}</a></dd></div>
              <div><dt>Teléfono</dt><dd>{selectedRequest.phone ? <a href={`tel:${selectedRequest.phone}`}>{selectedRequest.phone}</a> : "No indicado"}</dd></div>
              <div><dt>Recibida</dt><dd>{formatDate(selectedRequest.received_at)}</dd></div>
            </dl>

            <div className="internal-message-box">
              <span>Descripción del proyecto</span>
              <p>{selectedRequest.message}</p>
            </div>

            {["admin", "manager", "supervisor"].includes(profile?.role) && !selectedRequest.project_id && !convertingRequest && <button type="button" className="request-convert-button" onClick={beginRequestConversion}><Plus size={17} /> Crear cliente y proyecto</button>}
            {selectedRequest.project_id && <div className="internal-notice">Esta solicitud ya está vinculada con un proyecto.</div>}
            {selectedRequest.projects && <button type="button" className="request-linked-project" onClick={() => { const project = projects.find((item) => item.id === selectedRequest.project_id); setSelectedRequest(null); setConvertingRequest(false); setActiveModule("projects"); if (project) openProject(project) }}><span>Proyecto vinculado</span><strong>{selectedRequest.projects.code} · {selectedRequest.projects.name}</strong><ChevronRight size={18} /></button>}

            {convertingRequest && <form className="internal-form internal-client-form request-conversion-form" onSubmit={convertRequestToProject}>
              <div className="request-conversion-heading"><h3>Convertir en proyecto</h3><button type="button" onClick={() => setConvertingRequest(false)}>Cancelar</button></div>
              <label htmlFor="conversion-existing-client">Usar un cliente existente</label>
              <select id="conversion-existing-client" value={conversionForm.existing_client_id} onChange={(event) => setConversionForm({ ...conversionForm, existing_client_id: event.target.value })}><option value="">Crear cliente nuevo</option>{clients.filter((client) => client.status === "active").map((client) => <option key={client.id} value={client.id}>{client.legal_name}{client.tax_id ? ` — ${client.tax_id}` : ""}</option>)}</select>
              {!conversionForm.existing_client_id && <>
                <label htmlFor="conversion-legal-name">Razón social o nombre *</label>
                <input id="conversion-legal-name" value={conversionForm.legal_name} onChange={(event) => setConversionForm({ ...conversionForm, legal_name: event.target.value })} required />
                <label htmlFor="conversion-tax-id">RFC</label>
                <input id="conversion-tax-id" value={conversionForm.tax_id} onChange={(event) => setConversionForm({ ...conversionForm, tax_id: event.target.value.toUpperCase() })} />
              </>}
              <label htmlFor="conversion-project-name">Nombre del proyecto *</label>
              <input id="conversion-project-name" value={conversionForm.project_name} onChange={(event) => setConversionForm({ ...conversionForm, project_name: event.target.value })} required />
              <label htmlFor="conversion-location">Taller o ubicación</label>
              <select id="conversion-location" value={conversionForm.location_id} onChange={(event) => setConversionForm({ ...conversionForm, location_id: event.target.value })}><option value="">Por definir</option>{locations.filter((location) => location.status === "active").map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}</select>
              <div className="internal-form-columns"><div><label htmlFor="conversion-amount">Monto</label><input id="conversion-amount" type="number" min="0" step="0.01" value={conversionForm.amount} onChange={(event) => setConversionForm({ ...conversionForm, amount: event.target.value })} /></div><div><label htmlFor="conversion-currency">Moneda</label><select id="conversion-currency" value={conversionForm.currency} onChange={(event) => setConversionForm({ ...conversionForm, currency: event.target.value })}><option value="MXN">MXN</option><option value="USD">USD</option></select></div></div>
              <button type="submit" disabled={savingConversion}>{savingConversion ? "Creando…" : "Crear y vincular"}</button>
            </form>}

            <label className="internal-status-field" htmlFor="request-status">Estado</label>
            <select id="request-status" value={selectedRequest.status}
              onChange={(event) => updateStatus(event.target.value)}
              disabled={savingStatus || !["admin", "manager", "supervisor"].includes(profile?.role)}>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </aside>
        </div>
      )}
    </main>
  )
}

function Internal() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [settingPassword, setSettingPassword] = useState(hasAuthSetupParams)

  useEffect(() => {
    if (!supabase) {
      return undefined
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === "PASSWORD_RECOVERY") {
        setSettingPassword(true)
      }
      setSession(nextSession)
      setLoading(false)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (!isSupabaseConfigured) {
    return <main className="internal-auth-shell"><div className="internal-alert">El acceso interno todavía no está configurado.</div></main>
  }
  if (loading) return <main className="internal-auth-shell"><div className="internal-loader" /></main>
  if (!session) return <Login onAuthenticated={setSession} authLinkInvalid={hasAuthSetupParams} />
  if (settingPassword) return <PasswordSetup session={session} onComplete={() => setSettingPassword(false)} />
  return <Dashboard session={session} />
}

export default Internal
