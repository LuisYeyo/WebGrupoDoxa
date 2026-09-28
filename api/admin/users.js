import { getSupabaseServerClient } from "../_supabase.js"

const ALLOWED_ROLES = ["admin", "manager", "supervisor", "staff", "viewer"]

async function requireAdmin(req) {
  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")
  if (!token) return null

  const supabase = getSupabaseServerClient()
  const { data: userData, error: userError } = await supabase.auth.getUser(token)
  if (userError || !userData.user) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, active")
    .eq("id", userData.user.id)
    .single()

  if (!profile?.active || profile.role !== "admin") return null
  return { supabase, user: userData.user }
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store")

  const context = await requireAdmin(req)
  if (!context) return res.status(403).json({ success: false, message: "Forbidden" })

  const { supabase, user: requester } = context

  if (req.method === "GET") {
    const [{ data: authData, error: authError }, { data: profiles, error: profileError }] = await Promise.all([
      supabase.auth.admin.listUsers({ page: 1, perPage: 1000 }),
      supabase.from("profiles").select("id, full_name, role, phone, active, created_at"),
    ])

    if (authError || profileError) return res.status(500).json({ success: false, message: "Unable to load users" })

    const profileById = new Map(profiles.map((profile) => [profile.id, profile]))
    const users = authData.users.map((authUser) => ({
      ...profileById.get(authUser.id),
      id: authUser.id,
      email: authUser.email,
      invited_at: authUser.invited_at,
      last_sign_in_at: authUser.last_sign_in_at,
      current: authUser.id === requester.id,
    }))

    return res.status(200).json({ success: true, users })
  }

  if (req.method === "POST") {
    const email = String(req.body?.email || "").trim().toLowerCase()
    const fullName = String(req.body?.fullName || "").trim()
    const role = String(req.body?.role || "viewer")

    if (!email || !fullName || !ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid user data" })
    }

    const { data, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email, {
      data: { full_name: fullName },
      redirectTo: "https://www.grupoindustriadoxa.com/interno",
    })

    if (inviteError) return res.status(400).json({ success: false, message: inviteError.message })

    const { error: roleError } = await supabase
      .from("profiles")
      .update({ full_name: fullName, role, active: true })
      .eq("id", data.user.id)

    if (roleError) return res.status(500).json({ success: false, message: "Invitation sent, but role could not be assigned" })
    return res.status(201).json({ success: true })
  }

  if (req.method === "PATCH") {
    const id = String(req.body?.id || "")
    const fullName = String(req.body?.fullName || "").trim()
    const role = String(req.body?.role || "")
    const active = req.body?.active

    if (!id || !fullName || !ALLOWED_ROLES.includes(role) || typeof active !== "boolean") {
      return res.status(400).json({ success: false, message: "Invalid user data" })
    }

    if (id === requester.id && (!active || role !== "admin")) {
      return res.status(400).json({ success: false, message: "You cannot remove your own administrator access" })
    }

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, role, active })
      .eq("id", id)

    if (error) return res.status(500).json({ success: false, message: "Unable to update user" })
    return res.status(200).json({ success: true })
  }

  res.setHeader("Allow", "GET, POST, PATCH")
  return res.status(405).json({ success: false, message: "Method not allowed" })
}
