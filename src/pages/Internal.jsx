import { useCallback, useEffect, useState } from "react"
import { Building2, Check, ClipboardList, LogOut, Mail, Plus, RefreshCw, ShieldCheck, Users, X } from "lucide-react"
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

function formatDate(value) {
  if (!value) return "—"
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

function createProjectCode() {
  const date = new Date().toISOString().slice(2, 10).replaceAll("-", "")
  const random = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `PR-${date}-${random}`
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
          <input id="internal-password" type="password" autoComplete="current-password"
            value={password} onChange={(event) => setPassword(event.target.value)}
            minLength={8} required />

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
          <input id="new-password" type="password" autoComplete="new-password"
            value={password} onChange={(event) => setPassword(event.target.value)}
            minLength={8} required />

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
          <input id="confirm-password" type="password" autoComplete="new-password"
            value={confirmation} onChange={(event) => setConfirmation(event.target.value)}
            minLength={8} required />
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
  const [profile, setProfile] = useState(null)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [savingStatus, setSavingStatus] = useState(false)
  const [clients, setClients] = useState([])
  const [projects, setProjects] = useState([])
  const [activeModule, setActiveModule] = useState("requests")
  const [showClientForm, setShowClientForm] = useState(false)
  const [savingClient, setSavingClient] = useState(false)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [savingProject, setSavingProject] = useState(false)
  const [clientForm, setClientForm] = useState({
    legal_name: "", trade_name: "", tax_id: "", email: "", phone: "", notes: "",
  })
  const [projectForm, setProjectForm] = useState({
    client_id: "", name: "", service: "", description: "", status: "lead", start_date: "", due_date: "",
  })

  const loadData = useCallback(async () => {
    setLoading(true)
    setError("")

    const [profileResult, requestResult, clientResult, projectResult] = await Promise.all([
      supabase.from("profiles").select("full_name, role, active")
        .eq("id", session.user.id).single(),
      supabase.from("quote_requests")
        .select("id, request_code, requester_name, company_name, email, phone, service, message, status, received_at")
        .order("received_at", { ascending: false }).limit(100),
      supabase.from("clients")
        .select("id, legal_name, trade_name, tax_id, email, phone, status, created_at")
        .order("legal_name"),
      supabase.from("projects")
        .select("id, code, name, service, status, start_date, due_date, created_at, clients(legal_name, tax_id)")
        .order("created_at", { ascending: false }),
    ])

    if (profileResult.error || requestResult.error || clientResult.error || projectResult.error) {
      setError("No se pudo cargar la información. Verifica que tu usuario esté activo.")
    } else {
      setProfile(profileResult.data)
      setRequests(requestResult.data ?? [])
      setClients(clientResult.data ?? [])
      setProjects(projectResult.data ?? [])
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
      .select("id, legal_name, trade_name, tax_id, email, phone, status, created_at")
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

  const createProject = async (event) => {
    event.preventDefault()
    if (!["admin", "manager", "supervisor", "staff"].includes(profile?.role)) return

    setSavingProject(true)
    setError("")
    const { data, error: insertError } = await supabase
      .from("projects")
      .insert({
        client_id: projectForm.client_id,
        code: createProjectCode(),
        name: projectForm.name.trim(),
        service: projectForm.service.trim() || null,
        description: projectForm.description.trim() || null,
        status: projectForm.status,
        start_date: projectForm.start_date || null,
        due_date: projectForm.due_date || null,
        created_by: session.user.id,
      })
      .select("id, code, name, service, status, start_date, due_date, created_at, clients(legal_name, tax_id)")
      .single()

    if (insertError) {
      setError("No fue posible guardar el trabajo. Verifica el cliente y las fechas.")
    } else {
      setProjects((current) => [data, ...current])
      setProjectForm({ client_id: "", name: "", service: "", description: "", status: "lead", start_date: "", due_date: "" })
      setShowProjectForm(false)
    }
    setSavingProject(false)
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
        <button type="button" className={activeModule === "requests" ? "active" : ""} onClick={() => setActiveModule("requests")}>Solicitudes</button>
        <button type="button" className={activeModule === "clients" ? "active" : ""} onClick={() => setActiveModule("clients")}>Clientes</button>
        {profile?.role === "admin" && <button type="button" className={activeModule === "users" ? "active" : ""} onClick={() => setActiveModule("users")}>Personal</button>}
        <button type="button" className={activeModule === "projects" ? "active" : ""} onClick={() => setActiveModule("projects")}>Proyectos</button>
      </nav>

      <section className="internal-content">
        <div className="internal-heading-row">
          <div>
            <p className="internal-eyebrow">{activeModule === "requests" ? "SOLICITUDES" : activeModule === "clients" ? "DIRECTORIO" : activeModule === "projects" ? "OPERACIONES" : "ADMINISTRACIÓN"}</p>
            <h1>{activeModule === "requests" ? "Solicitudes de cotización" : activeModule === "clients" ? "Clientes" : activeModule === "projects" ? "Proyectos y trabajos" : "Personal"}</h1>
            <p>{activeModule === "requests" ? "Información recibida desde el formulario del sitio web." : activeModule === "clients" ? "Empresas y personas para las que se realizan trabajos." : activeModule === "projects" ? "Servicios registrados para cada cliente y su seguimiento." : "Invitaciones, roles y acceso al sistema interno."}</p>
          </div>
          {activeModule === "requests" ? (
            <button type="button" className="internal-refresh" onClick={loadData} disabled={loading}>
              <RefreshCw size={17} className={loading ? "spin" : ""} /> Actualizar
            </button>
          ) : activeModule === "clients" && ["admin", "manager", "supervisor"].includes(profile?.role) ? (
            <button type="button" className="internal-primary-action" onClick={() => setShowClientForm(true)}>
              <Plus size={17} /> Nuevo cliente
            </button>
          ) : activeModule === "projects" && ["admin", "manager", "supervisor", "staff"].includes(profile?.role) ? (
            <button type="button" className="internal-primary-action" onClick={() => setShowProjectForm(true)}>
              <Plus size={17} /> Nuevo trabajo
            </button>
          ) : null}
        </div>

        {activeModule !== "users" && <div className="internal-summary-grid">
          {activeModule === "requests" ? <>
            <article><ClipboardList size={22} /><div><strong>{requests.length}</strong><span>Solicitudes visibles</span></div></article>
            <article><Mail size={22} /><div><strong>{requests.filter((item) => item.status === "lead").length}</strong><span>Nuevas</span></div></article>
          </> : activeModule === "clients" ? <>
            <article><Users size={22} /><div><strong>{clients.length}</strong><span>Clientes registrados</span></div></article>
            <article><Building2 size={22} /><div><strong>{clients.filter((item) => item.status === "active").length}</strong><span>Activos</span></div></article>
          </> : <>
            <article><ClipboardList size={22} /><div><strong>{projects.length}</strong><span>Trabajos registrados</span></div></article>
            <article><RefreshCw size={22} /><div><strong>{projects.filter((item) => item.status === "in_progress").length}</strong><span>En proceso</span></div></article>
          </>}
        </div>}

        {error && <div className="internal-alert" role="alert">{error}</div>}

        {activeModule === "users" ? <InternalUsers session={session} /> : <div className="internal-table-card">
          {loading ? (
            <div className="internal-empty">Cargando información…</div>
          ) : activeModule === "requests" ? (requests.length === 0 ? (
            <div className="internal-empty">Todavía no hay solicitudes registradas.</div>
          ) : (
            <div className="internal-table-wrap">
              <table>
                <thead><tr><th>Folio</th><th>Cliente</th><th>Servicio</th><th>Estado</th><th>Recibida</th></tr></thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id} className="internal-clickable-row" onClick={() => setSelectedRequest(request)}>
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
          )) : activeModule === "clients" ? (clients.length === 0 ? (
            <div className="internal-empty">Todavía no hay clientes registrados.</div>
          ) : (
            <div className="internal-table-wrap">
              <table>
                <thead><tr><th>Razón social</th><th>Nombre comercial</th><th>RFC</th><th>Contacto</th><th>Estado</th></tr></thead>
                <tbody>{clients.map((client) => (
                  <tr key={client.id}>
                    <td><strong>{client.legal_name}</strong></td>
                    <td>{client.trade_name || "—"}</td>
                    <td>{client.tax_id || "—"}</td>
                    <td className="internal-stacked-cell"><strong>{client.email || "—"}</strong><span>{client.phone || "Sin teléfono"}</span></td>
                    <td><span className={`internal-status status-${client.status}`}>{client.status === "active" ? "Activo" : client.status === "inactive" ? "Inactivo" : "Archivado"}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )) : projects.length === 0 ? (
            <div className="internal-empty">Todavía no hay proyectos o trabajos registrados.</div>
          ) : (
            <div className="internal-table-wrap"><table>
              <thead><tr><th>Folio</th><th>Trabajo</th><th>Cliente / RFC</th><th>Servicio</th><th>Estado</th><th>Inicio</th></tr></thead>
              <tbody>{projects.map((project) => <tr key={project.id}>
                <td><strong>{project.code}</strong></td>
                <td>{project.name}</td>
                <td className="internal-stacked-cell"><strong>{project.clients?.legal_name || "—"}</strong><span>{project.clients?.tax_id || "Sin RFC"}</span></td>
                <td>{project.service || "—"}</td>
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
              <label htmlFor="project-name">Nombre del trabajo *</label>
              <input id="project-name" value={projectForm.name} onChange={(event) => setProjectForm({ ...projectForm, name: event.target.value })} required />
              <label htmlFor="project-service">Servicio</label>
              <input id="project-service" placeholder="Ej. Fabricación de tubería" value={projectForm.service} onChange={(event) => setProjectForm({ ...projectForm, service: event.target.value })} />
              <label htmlFor="project-description">Descripción</label>
              <textarea id="project-description" rows="4" value={projectForm.description} onChange={(event) => setProjectForm({ ...projectForm, description: event.target.value })} />
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

      {selectedRequest && (
        <div className="internal-drawer-backdrop" onClick={() => setSelectedRequest(null)}>
          <aside className="internal-drawer" onClick={(event) => event.stopPropagation()} aria-label="Detalle de solicitud">
            <button type="button" className="internal-drawer-close" onClick={() => setSelectedRequest(null)} aria-label="Cerrar">
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
