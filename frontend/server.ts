import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
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
  emailSent: boolean;
}

const certificateRequests: CertificateRecord[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "6mb" }));

  // API endpoint for recording & emailing the Space Explorer Certificate
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

      let emailSent = false;
      const resendKey = process.env.RESEND_API_KEY;
      const emailFrom = process.env.EMAIL_FROM || "The Longest Journey <onboarding@resend.dev>";

      if (resendKey) {
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
      }

      const record: CertificateRecord = {
        id: `cert_${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        lang: chosenLang,
        createdAt: new Date().toISOString(),
        emailSent,
      };
      certificateRequests.push(record);

      return res.json({
        ok: true,
        id: record.id,
        emailSent,
        queued: !emailSent,
      });
    } catch (err) {
      console.error("Certificate endpoint error:", err);
      return res.status(500).json({ ok: false, error: "Server error" });
    }
  });

  app.get("/api/certificates", (_req, res) => {
    res.json({ count: certificateRequests.length, records: certificateRequests });
  });

  // Vite middleware in development, static dist in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
