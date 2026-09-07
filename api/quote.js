import { Resend } from "resend"

const resend =
  new Resend(
    process.env.RESEND_API_KEY
  )

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function createRequestId() {
  const now =
    new Date()

  const year =
    String(
      now.getFullYear()
    ).slice(-2)

  const month =
    String(
      now.getMonth() + 1
    ).padStart(2, "0")

  const day =
    String(
      now.getDate()
    ).padStart(2, "0")

  const random =
    Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()

  return `DX-${year}${month}${day}-${random}`
}

export default async function handler(
  req,
  res
) {
  /*
    Solamente permitimos POST.
  */
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({
        success: false,
        message:
          "Method not allowed",
      })
  }

  try {
    const {
      name,
      company,
      email,
      phone,
      service,
      message,

      /*
        Honeypot anti-spam.
        Una persona real nunca
        debería llenar esto.
      */
      website,
    } = req.body ?? {}

    /*
      BOT / SPAM
    */
    if (website) {
      return res
        .status(200)
        .json({
          success: true,
        })
    }

    /*
      VALIDACIÓN
    */
    if (
      !name ||
      !email ||
      !service ||
      !message
    ) {
      return res
        .status(400)
        .json({
          success: false,

          message:
            "Missing required fields",
        })
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (
      !emailRegex.test(email)
    ) {
      return res
        .status(400)
        .json({
          success: false,

          message:
            "Invalid email",
        })
    }

    /*
      EVITAMOS ENTRADAS ENORMES.
    */
    if (
      String(name).length > 100 ||
      String(company).length > 150 ||
      String(email).length > 200 ||
      String(phone).length > 50 ||
      String(service).length > 100 ||
      String(message).length > 5000
    ) {
      return res
        .status(400)
        .json({
          success: false,

          message:
            "Input too long",
        })
    }

    const requestId =
      createRequestId()

    const safeName =
      escapeHtml(name)

    const safeCompany =
      escapeHtml(
        company ||
          "No especificada"
      )

    const safeEmail =
      escapeHtml(email)

    const safePhone =
      escapeHtml(
        phone ||
          "No especificado"
      )

    const safeService =
      escapeHtml(service)

    const safeMessage =
      escapeHtml(message)
        .replaceAll(
          "\n",
          "<br />"
        )

    /*
      ==============================
      CORREO PARA DOXA
      ==============================
    */

    const internalEmail =
      await resend.emails.send({
        from:
          process.env
            .RESEND_FROM_EMAIL,

        to: [
          process.env
            .QUOTE_TO_EMAIL,
        ],

        cc:
          process.env
            .QUOTE_CC_EMAIL
            ? [
                process.env
                  .QUOTE_CC_EMAIL,
              ]
            : undefined,

        /*
          Si DOXA le da Responder
          desde Gmail, responde
          directamente al cliente.
        */
        replyTo: email,

        subject:
          `[COTIZACIÓN WEB] ${service} — ${name}`,

        html: `
          <!DOCTYPE html>

          <html>
            <body
              style="
                margin:0;
                padding:0;
                background:#f4f7fb;
                font-family:
                  Arial,
                  Helvetica,
                  sans-serif;
                color:#0b1830;
              "
            >

              <div
                style="
                  padding:
                    40px
                    20px;
                "
              >

                <div
                  style="
                    max-width:680px;
                    margin:0 auto;
                    background:#ffffff;
                    border-radius:20px;
                    overflow:hidden;
                    border:
                      1px solid
                      #e2e8f0;
                  "
                >

                  <!-- HEADER -->

                  <div
                    style="
                      background:#071a32;
                      padding:32px;
                      color:white;
                    "
                  >

                    <div
                      style="
                        font-size:11px;
                        letter-spacing:3px;
                        color:#60a5fa;
                        font-weight:bold;
                      "
                    >
                      GRUPO INDUSTRIAL DOXA
                    </div>

                    <h1
                      style="
                        margin:
                          14px
                          0
                          0;
                        font-size:28px;
                      "
                    >
                      Nueva solicitud de cotización
                    </h1>

                  </div>

                  <!-- CONTENIDO -->

                  <div
                    style="
                      padding:32px;
                    "
                  >

                    <div
                      style="
                        color:#2563eb;
                        font-size:12px;
                        font-weight:bold;
                        letter-spacing:2px;
                      "
                    >
                      ${requestId}
                    </div>

                    <table
                      style="
                        width:100%;
                        border-collapse:collapse;
                        margin-top:28px;
                      "
                    >

                      <tr>
                        <td
                          style="
                            width:135px;
                            padding:
                              15px
                              0;
                            border-bottom:
                              1px solid
                              #e2e8f0;
                            color:#94a3b8;
                            font-size:11px;
                            text-transform:uppercase;
                            letter-spacing:1px;
                          "
                        >
                          Nombre
                        </td>

                        <td
                          style="
                            padding:
                              15px
                              0;
                            border-bottom:
                              1px solid
                              #e2e8f0;
                            font-weight:bold;
                          "
                        >
                          ${safeName}
                        </td>
                      </tr>

                      <tr>
                        <td
                          style="
                            padding:
                              15px
                              0;
                            border-bottom:
                              1px solid
                              #e2e8f0;
                            color:#94a3b8;
                            font-size:11px;
                            text-transform:uppercase;
                            letter-spacing:1px;
                          "
                        >
                          Empresa
                        </td>

                        <td
                          style="
                            padding:
                              15px
                              0;
                            border-bottom:
                              1px solid
                              #e2e8f0;
                          "
                        >
                          ${safeCompany}
                        </td>
                      </tr>

                      <tr>
                        <td
                          style="
                            padding:
                              15px
                              0;
                            border-bottom:
                              1px solid
                              #e2e8f0;
                            color:#94a3b8;
                            font-size:11px;
                            text-transform:uppercase;
                            letter-spacing:1px;
                          "
                        >
                          Correo
                        </td>

                        <td
                          style="
                            padding:
                              15px
                              0;
                            border-bottom:
                              1px solid
                              #e2e8f0;
                          "
                        >
                          ${safeEmail}
                        </td>
                      </tr>

                      <tr>
                        <td
                          style="
                            padding:
                              15px
                              0;
                            border-bottom:
                              1px solid
                              #e2e8f0;
                            color:#94a3b8;
                            font-size:11px;
                            text-transform:uppercase;
                            letter-spacing:1px;
                          "
                        >
                          Teléfono
                        </td>

                        <td
                          style="
                            padding:
                              15px
                              0;
                            border-bottom:
                              1px solid
                              #e2e8f0;
                          "
                        >
                          ${safePhone}
                        </td>
                      </tr>

                      <tr>
                        <td
                          style="
                            padding:
                              15px
                              0;
                            border-bottom:
                              1px solid
                              #e2e8f0;
                            color:#94a3b8;
                            font-size:11px;
                            text-transform:uppercase;
                            letter-spacing:1px;
                          "
                        >
                          Servicio
                        </td>

                        <td
                          style="
                            padding:
                              15px
                              0;
                            border-bottom:
                              1px solid
                              #e2e8f0;
                            font-weight:bold;
                            color:#2563eb;
                          "
                        >
                          ${safeService}
                        </td>
                      </tr>

                    </table>

                    <div
                      style="
                        margin-top:28px;
                      "
                    >

                      <div
                        style="
                          color:#94a3b8;
                          font-size:11px;
                          text-transform:uppercase;
                          letter-spacing:1px;
                        "
                      >
                        Descripción del proyecto
                      </div>

                      <div
                        style="
                          margin-top:12px;
                          background:#f8fafc;
                          padding:20px;
                          border-radius:12px;
                          line-height:1.7;
                        "
                      >
                        ${safeMessage}
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </body>
          </html>
        `,
      })

    /*
      Si falla el correo principal,
      NO mostramos éxito.
    */
    if (internalEmail.error) {
      console.error(
        internalEmail.error
      )

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Unable to send request",
        })
    }

    /*
      ==============================
      CONFIRMACIÓN AL CLIENTE
      ==============================

      Si falla esta confirmación,
      la solicitud principal YA
      llegó a DOXA, así que no
      hacemos fallar toda la operación.
    */

      /*
    try {
      await resend.emails.send({
        from:
          process.env.RESEND_FROM_EMAIL,

        to: [email],

        subject:
          `Recibimos tu solicitud | Grupo Industrial DOXA`,

        html: `
          <!DOCTYPE html>

          <html>
            <body
              style="
                margin:0;
                padding:0;
                background:#f4f7fb;
                font-family:
                  Arial,
                  Helvetica,
                  sans-serif;
                color:#0b1830;
              "
            >

              <div
                style="
                  padding:
                    40px
                    20px;
                "
              >

                <div
                  style="
                    max-width:620px;
                    margin:0 auto;
                    background:#ffffff;
                    border-radius:20px;
                    overflow:hidden;
                    border:
                      1px solid
                      #e2e8f0;
                  "
                >

                  <div
                    style="
                      background:#071a32;
                      padding:32px;
                      color:white;
                    "
                  >

                    <div
                      style="
                        font-size:11px;
                        letter-spacing:3px;
                        color:#60a5fa;
                        font-weight:bold;
                      "
                    >
                      GRUPO INDUSTRIAL DOXA
                    </div>

                    <h1
                      style="
                        margin:
                          14px
                          0
                          0;
                        font-size:27px;
                      "
                    >
                      Recibimos tu solicitud.
                    </h1>

                  </div>

                  <div
                    style="
                      padding:32px;
                    "
                  >

                    <p
                      style="
                        font-size:17px;
                        line-height:1.7;
                      "
                    >
                      Hola ${safeName},
                    </p>

                    <p
                      style="
                        color:#64748b;
                        line-height:1.8;
                      "
                    >
                      Hemos recibido correctamente
                      la información de tu proyecto.
                      Nuestro equipo revisará la
                      solicitud y podrá ponerse en
                      contacto contigo para dar
                      seguimiento.
                    </p>

                    <div
                      style="
                        margin-top:28px;
                        background:#eff6ff;
                        border-radius:12px;
                        padding:18px;
                      "
                    >

                      <div
                        style="
                          color:#64748b;
                          font-size:11px;
                          text-transform:uppercase;
                          letter-spacing:1px;
                        "
                      >
                        Folio
                      </div>

                      <div
                        style="
                          margin-top:7px;
                          color:#2563eb;
                          font-weight:bold;
                        "
                      >
                        ${requestId}
                      </div>

                    </div>

                    <p
                      style="
                        margin-top:30px;
                        color:#94a3b8;
                        font-size:12px;
                        line-height:1.6;
                      "
                    >
                      Este correo confirma únicamente
                      la recepción de tu solicitud.
                    </p>

                  </div>

                </div>

              </div>

            </body>
          </html>
        `,
      })
    } catch (
      confirmationError
    ) {
      console.error(
        "Confirmation email error:",
        confirmationError
      )
    }
      */

    /*
      ÉXITO
    */
    return res
      .status(200)
      .json({
        success: true,
        requestId,
      })
  } catch (error) {
    console.error(error)

    return res
      .status(500)
      .json({
        success: false,

        message:
          "Internal server error",
      })
  }
}