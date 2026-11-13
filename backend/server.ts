import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface CertificateRecord {
  id: string;
  name: string;
  email: string;
  lang: "ar" | "en";
  createdAt: string;
  webhookSent: boolean;
  emailSent: boolean;
}

const certificateRequests: CertificateRecord[] = [];
const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  "https://omaribrahim5589.app.n8n.cloud/webhook/762125c4-a2f2-427e-856d-e371401a4ef0";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Simple CORS middleware to allow frontend calls
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
      return;
    }
    next();
  });

  app.use(express.json({ limit: "6mb" }));

  // API endpoint for recording & forwarding the Space Explorer Certificate
  app.post("/api/certificate", async (req, res) => {
    try {
      const { name, email, lang = "ar" } = req.body || {};

      const cleanName = typeof name === "string" ? name.trim() : "";
      const cleanEmail = typeof email === "string" ? email.trim() : "";
      const chosenLang: "ar" | "en" = lang === "en" ? "en" : "ar";

      if (!cleanName || cleanName.length < 2) {
        return res.status(400).json({
          ok: false,
          error: chosenLang === "ar" ? "من فضلك اكتب اسمك." : "Please enter your name.",
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        return res.status(400).json({
          ok: false,
          error:
            chosenLang === "ar"
              ? "من فضلك اكتب بريد إلكتروني صحيح."
              : "Please enter a valid email address.",
        });
      }

      let webhookSent = false;
      let emailSent = false;

      // 1. Forward to published n8n Webhook
      try {
        const webhookRes = await fetch(N8N_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            lang: chosenLang,
          }),
        });
        webhookSent = webhookRes.ok;
      } catch (webhookErr) {
        console.warn("n8n webhook forward failed:", webhookErr);
      }

      // 2. Direct Resend fallback (if configured)
      const resendKey = process.env.RESEND_API_KEY;
      const emailFrom = process.env.EMAIL_FROM || "The Longest Journey <onboarding@resend.dev>";

      if (resendKey) {
        try {
          const subject =
            chosenLang === "ar"
              ? `شهادة بطل الفضاء — ${cleanName}`
              : `Space Explorer Certificate — ${cleanName}`;

          const html =
            chosenLang === "ar"
              ? `<div dir="rtl" style="font-family:Arial,sans-serif;background:#14173A;color:#FFFFFF;padding:28px;border-radius:16px;">
                  <h1 style="color:#FFD54A;">مبروك يا ${cleanName}!</h1>
                  <p>أتممت رحلة «أطول رحلة في الدنيا» من الأرض للقمر للمريخ والفضاء البعيد بنجاح.</p>
                  <p>شهادتك جاهزة ومرفقة لك!</p>
                </div>`
              : `<div dir="ltr" style="font-family:Arial,sans-serif;background:#14173A;color:#FFFFFF;padding:28px;border-radius:16px;">
                  <h1 style="color:#FFD54A;">Congratulations, ${cleanName}!</h1>
                  <p>You completed "The Longest Journey in the World" from Earth to the Moon, Mars, and Deep Space.</p>
                  <p>Your Space Explorer Certificate is on its way!</p>
                </div>`;

          const mailRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${resendKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: emailFrom,
              to: [cleanEmail],
              subject,
              html,
            }),
          });

          emailSent = mailRes.ok;
        } catch (resendErr) {
          console.warn("Resend email failed:", resendErr);
        }
      }

      const record: CertificateRecord = {
        id: `cert_${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        lang: chosenLang,
        createdAt: new Date().toISOString(),
        webhookSent,
        emailSent,
      };
      certificateRequests.push(record);

      return res.json({
        ok: true,
        id: record.id,
        webhookSent,
        emailSent,
      });
    } catch (err) {
      console.error("Certificate endpoint error:", err);
      return res.status(500).json({ ok: false, error: "Server error" });
    }
  });

  app.get("/api/certificates", (_req, res) => {
    res.json({ count: certificateRequests.length, records: certificateRequests });
  });

  // Serve static frontend files if available
  const frontendDist = path.join(__dirname, "../frontend/dist");
  const frontendDir = path.join(__dirname, "../frontend");
  app.use(express.static(frontendDist));
  app.use(express.static(frontendDir));

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

startServer();
