import { useCallback, useEffect, useState } from "react"
import { Building2, ClipboardList, LogOut, Mail, RefreshCw, ShieldCheck } from "lucide-react"
import Turnstile from "../components/ui/Turnstile"
import { isSupabaseConfigured, supabase } from "../utils/supabase"
import "./Internal.css"

const ROLE_LABELS = {
  admin: "Administrador",
  manager: "Gerente",
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

function Login({ onAuthenticated }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [captchaToken, setCaptchaToken] = useState("")
  const [captchaReset, setCaptchaReset] = useState(0)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")

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
          <Turnstile
            action="login"
            className="internal-captcha"
            onVerify={setCaptchaToken}
            resetKey={captchaReset}
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "Ingresando…" : "Ingresar"}
          </button>
        </form>

        <div className="internal-private-note">
          <ShieldCheck size={18} /> Sistema privado para personal autorizado
        </div>
      </section>
    </main>
  )
}

function PasswordSetup({ onComplete }) {
  const [password, setPassword] = useState("")
  const [confirmation, setConfirmation] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.")
      return
    }
    if (password !== confirmation) {
      setError("Las contraseñas no coinciden.")
      return
    }

    setSubmitting(true)
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setSubmitting(false)

    if (updateError) {
      setError("No fue posible guardar la contraseña. Inténtalo nuevamente.")
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
          <label htmlFor="new-password">Nueva contraseña</label>
          <input id="new-password" type="password" autoComplete="new-password"
            value={password} onChange={(event) => setPassword(event.target.value)}
            minLength={8} required />

          <label htmlFor="confirm-password">Confirmar contraseña</label>
          <input id="confirm-password" type="password" autoComplete="new-password"
            value={confirmation} onChange={(event) => setConfirmation(event.target.value)}
            minLength={8} required />

          {error && <div className="internal-alert" role="alert">{error}</div>}
          <button type="submit" disabled={submitting}>
            {submitting ? "Guardando…" : "Guardar contraseña"}
          </button>
        </form>
      </section>
    </main>
  )
}

function Dashboard({ session }) {
  const [profile, setProfile] = useState(null)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadData = useCallback(async () => {
    setLoading(true)
    setError("")

    const [profileResult, requestResult] = await Promise.all([
      supabase.from("profiles").select("full_name, role, active")
        .eq("id", session.user.id).single(),
      supabase.from("quote_requests")
        .select("id, request_code, requester_name, company_name, email, phone, service, status, received_at")
        .order("received_at", { ascending: false }).limit(100),
    ])

    if (profileResult.error || requestResult.error) {
      setError("No se pudo cargar la información. Verifica que tu usuario esté activo.")
    } else {
      setProfile(profileResult.data)
      setRequests(requestResult.data ?? [])
    }
    setLoading(false)
  }, [session.user.id])

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

      <section className="internal-content">
        <div className="internal-heading-row">
          <div>
            <p className="internal-eyebrow">SOLICITUDES</p>
            <h1>Solicitudes de cotización</h1>
            <p>Información recibida desde el formulario del sitio web.</p>
          </div>
          <button type="button" className="internal-refresh" onClick={loadData} disabled={loading}>
            <RefreshCw size={17} className={loading ? "spin" : ""} /> Actualizar
          </button>
        </div>

        <div className="internal-summary-grid">
          <article><ClipboardList size={22} /><div><strong>{requests.length}</strong><span>Solicitudes visibles</span></div></article>
          <article><Mail size={22} /><div><strong>{requests.filter((item) => item.status === "lead").length}</strong><span>Nuevas</span></div></article>
        </div>

        {error && <div className="internal-alert" role="alert">{error}</div>}

        <div className="internal-table-card">
          {loading ? (
            <div className="internal-empty">Cargando solicitudes…</div>
          ) : requests.length === 0 ? (
            <div className="internal-empty">Todavía no hay solicitudes registradas.</div>
          ) : (
            <div className="internal-table-wrap">
              <table>
                <thead><tr><th>Folio</th><th>Cliente</th><th>Servicio</th><th>Estado</th><th>Recibida</th></tr></thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id}>
                      <td><strong>{request.request_code}</strong></td>
                      <td><strong>{request.requester_name}</strong><span>{request.company_name || request.email}</span></td>
                      <td>{request.service}</td>
                      <td><span className={`internal-status status-${request.status}`}>{STATUS_LABELS[request.status] || request.status}</span></td>
                      <td>{formatDate(request.received_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function Internal() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [settingPassword, setSettingPassword] = useState(() =>
    window.location.hash.includes("type=invite") ||
    window.location.hash.includes("type=recovery")
  )

  useEffect(() => {
    if (!supabase) {
      return undefined
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (!isSupabaseConfigured) {
    return <main className="internal-auth-shell"><div className="internal-alert">El acceso interno todavía no está configurado.</div></main>
  }
  if (loading) return <main className="internal-auth-shell"><div className="internal-loader" /></main>
  if (!session) return <Login onAuthenticated={setSession} />
  if (settingPassword) return <PasswordSetup onComplete={() => setSettingPassword(false)} />
  return <Dashboard session={session} />
}

export default Internal
