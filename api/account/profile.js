import { getSupabaseServerClient } from "../_supabase.js"

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store")

  if (req.method !== "PATCH") {
    res.setHeader("Allow", "PATCH")
    return res.status(405).json({ success: false, message: "Method not allowed" })
  }

  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")
  const fullName = String(req.body?.fullName || "").trim()

  if (!token || fullName.length < 2 || fullName.length > 150) {
    return res.status(400).json({ success: false, message: "Invalid profile data" })
  }

  const supabase = getSupabaseServerClient()
  const { data, error: userError } = await supabase.auth.getUser(token)

  if (userError || !data.user) {
    return res.status(401).json({ success: false, message: "Invalid session" })
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ full_name: fullName })
    .eq("id", data.user.id)

  if (profileError) {
    return res.status(500).json({ success: false, message: "Unable to update profile" })
  }

  return res.status(200).json({ success: true })
}
