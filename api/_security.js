import { createHash } from "node:crypto"
import process from "node:process"

export async function enforceRateLimit(req) {
  const { UPSTASH_REDIS_REST_URL: url, UPSTASH_REDIS_REST_TOKEN: token } = process.env
  if (!url || !token) throw new Error("Rate limit storage is not configured")

  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim()
  const key = `quote:rate:${createHash("sha256").update(ip).digest("hex")}`
  const script = "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]) end; return n"
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(["EVAL", script, 1, key, 3600]),
    signal: AbortSignal.timeout(5000),
  })
  if (!response.ok) throw new Error("Rate limit storage unavailable")
  const data = await response.json()
  const attempts = Number(data.result)
  if (data.error || !Number.isInteger(attempts)) throw new Error("Rate limit storage error")
  return attempts <= 5
}

export async function verifyCaptcha(token, remoteIp) {
  if (!process.env.TURNSTILE_SECRET_KEY) throw new Error("Captcha is not configured")
  if (typeof token !== "string" || !token || token.length > 2048) return false

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: remoteIp,
    }),
    signal: AbortSignal.timeout(5000),
  })
  if (!response.ok) throw new Error("Captcha verification unavailable")
  const data = await response.json()
  return data.success === true
    && data.action === "quote"
    && (!process.env.TURNSTILE_HOSTNAME || data.hostname === process.env.TURNSTILE_HOSTNAME)
}
