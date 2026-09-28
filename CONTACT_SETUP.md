# Activar la protección del formulario

El formulario conserva el envío por correo con Resend y agrega dos protecciones:

- **Cloudflare Turnstile:** comprueba que el envío proviene de una persona.
- **Upstash Redis:** limita cada dirección IP a 5 intentos por hora.

La integración con Meta WhatsApp Cloud API fue retirada. Los datos de contacto que ya aparecen públicamente en el sitio no dependen de esa API.

## 1. Cloudflare Turnstile

1. Entra a [Cloudflare Dashboard](https://dash.cloudflare.com/) y abre **Turnstile**.
2. Pulsa **Add widget** y usa un nombre como `DOXA formulario contacto`.
3. En **Hostname management**, agrega `www.grupoindustriadoxa.com` y `grupoindustriadoxa.com` si ambos sirven el sitio.
4. Selecciona el modo **Managed**, crea el widget y copia **Sitekey** y **Secret key**.

## 2. Upstash Redis

1. Entra a [Upstash Console](https://console.upstash.com/) → **Redis** → **Create Database**.
2. Usa `doxa-formulario` como nombre, selecciona una región cercana a la región de Vercel, deja **Read Regions** vacío y **Eviction** apagado.
3. Selecciona el plan gratuito si está disponible y crea la base.
4. Abre **Connect → REST** y copia `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`.

## 3. Variables en Vercel

Entra a [Vercel Dashboard](https://vercel.com/dashboard) → proyecto de DOXA → **Settings → Environment Variables**. Agrega una variable por fila para **Production**:

| Variable | Valor |
| --- | --- |
| `VITE_TURNSTILE_SITE_KEY` | Sitekey pública de Cloudflare |
| `TURNSTILE_SECRET_KEY` | Secret key privada de Cloudflare |
| `TURNSTILE_HOSTNAME` | `www.grupoindustriadoxa.com` si ése es el dominio canónico |
| `UPSTASH_REDIS_REST_URL` | URL REST de Upstash |
| `UPSTASH_REDIS_REST_TOKEN` | Token REST privado de Upstash |

Comprueba también que sigan configuradas las variables existentes `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `QUOTE_TO_EMAIL` y, si se usa, `QUOTE_CC_EMAIL`.

Solo `VITE_TURNSTILE_SITE_KEY` es pública. No compartas la clave secreta de Turnstile ni el token de Upstash, y no les agregues el prefijo `VITE_`.

## 4. Desplegar y probar

1. Haz un nuevo deployment después de guardar todas las variables. Vercel aplica las variables al construir una versión nueva.
2. Abre `/contacto`, completa el CAPTCHA y envía una solicitud de prueba.
3. Confirma que aparece un folio `DX-...` y que llega el correo a DOXA.
4. Para comprobar el límite, usa pruebas controladas: después de cinco intentos desde la misma IP durante una hora, la API responde con estado `429`.

Referencias: [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/get-started/widget-management/dashboard/), [Upstash REST](https://upstash.com/docs/redis/features/restapi), [variables de Vercel](https://vercel.com/docs/environment-variables).
