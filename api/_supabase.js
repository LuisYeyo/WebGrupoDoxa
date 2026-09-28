import process from "node:process"
import { createClient } from "@supabase/supabase-js"

let serverClient

export function getSupabaseServerClient() {
  if (serverClient) {
    return serverClient
  }

  const url =
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL

  const secretKey =
    process.env.SUPABASE_SECRET_KEY

  if (!url || !secretKey) {
    throw new Error(
      "Supabase server environment variables are not configured"
    )
  }

  serverClient = createClient(
    url,
    secretKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  )

  return serverClient
}
