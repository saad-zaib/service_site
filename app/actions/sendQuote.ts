"use server";

import nodemailer from "nodemailer";

export interface QuoteFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
  honeypot: string;
}

export interface QuoteResult {
  success: boolean;
  error?: string;
}

// Allowed service and budget values — reject anything not on this list
const ALLOWED_SERVICES = new Set([
  "Offensive Security",
  "Defensive Security",
  "GRC & Compliance",
  "Security Training",
  "Managed SOC",
  "Threat Intelligence",
  "AI & LLM Pentesting",
  "Multiple / Not sure yet",
  "",
]);


// In-memory rate limiting — keyed by email, max 3 submissions per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(email);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(email, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

// Strict email validation — requires proper TLD (2–6 chars)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/;

// Phone validation — allow only digits, spaces, +, -, (, ), max 20 chars
const PHONE_REGEX = /^[\d\s+\-().]{0,20}$/;

// Max field lengths to prevent payload bloat
const MAX_LENGTHS = {
  name: 100,
  email: 254,
  company: 150,
  phone: 20,
  message: 3000,
};

// HTML-escape user input before embedding in email body
const sanitise = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");

export async function sendQuote(data: QuoteFormData): Promise<QuoteResult> {
  // Honeypot check — bots fill hidden fields, humans don't
  if (data.honeypot) {
    return { success: true }; // silently succeed so bots don't know they were blocked
  }

  // Required field check
  if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
    return { success: false, error: "Required fields are missing." };
  }

  // Length validation — reject oversized payloads
  if (
    data.name.length > MAX_LENGTHS.name ||
    data.email.length > MAX_LENGTHS.email ||
    data.company.length > MAX_LENGTHS.company ||
    data.phone.length > MAX_LENGTHS.phone ||
    data.message.length > MAX_LENGTHS.message
  ) {
    return { success: false, error: "One or more fields exceed the maximum allowed length." };
  }

  // Email format validation
  if (!EMAIL_REGEX.test(data.email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // Phone format validation (optional field)
  if (data.phone && !PHONE_REGEX.test(data.phone)) {
    return { success: false, error: "Phone number contains invalid characters." };
  }

  // Allowlist validation for select fields — reject unexpected values
  if (!ALLOWED_SERVICES.has(data.service)) {
    return { success: false, error: "Invalid service selection." };
  }

  // Rate limit by email address — max 3 per hour
  if (isRateLimited(data.email.toLowerCase())) {
    return {
      success: false,
      error: "Too many requests. Please try again later.",
    };
  }

  const recipient = process.env.QUOTE_RECIPIENT_EMAIL;
  if (!recipient) {
    console.error("QUOTE_RECIPIENT_EMAIL env var is not set");
    return { success: false, error: "Configuration error. Please try again later." };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    // Port 587 uses STARTTLS (opportunistic TLS upgrade) — secure: false is correct here.
    // Use port 465 + secure: true for implicit TLS if your provider requires it.
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const html = `
    <div style="font-family:monospace;background:#070b12;color:#e8edf5;padding:32px;max-width:600px">
      <p style="color:#a78bfa;letter-spacing:.2em;text-transform:uppercase;font-size:11px;margin:0 0 24px">
        // New Quote Request — ctfwithai
      </p>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:10px 0;color:#5a6a8a;width:160px">Name</td>
            <td style="padding:10px 0;color:#fff">${sanitise(data.name)}</td></tr>
        <tr><td style="padding:10px 0;color:#5a6a8a">Email</td>
            <td style="padding:10px 0;color:#fff">${sanitise(data.email)}</td></tr>
        <tr><td style="padding:10px 0;color:#5a6a8a">Company</td>
            <td style="padding:10px 0;color:#fff">${sanitise(data.company || "—")}</td></tr>
        <tr><td style="padding:10px 0;color:#5a6a8a">Phone</td>
            <td style="padding:10px 0;color:#fff">${sanitise(data.phone || "—")}</td></tr>
        <tr><td style="padding:10px 0;color:#5a6a8a">Service</td>
            <td style="padding:10px 0;color:#a78bfa">${sanitise(data.service || "—")}</td></tr>
      </table>
      <div style="margin-top:24px;border-top:1px solid #151f35;padding-top:24px">
        <p style="color:#5a6a8a;margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:.1em">Message</p>
        <p style="color:#fff;line-height:1.7;margin:0;white-space:pre-wrap">${sanitise(data.message)}</p>
      </div>
      <p style="margin-top:32px;color:#3a4a6a;font-size:11px">Sent via ctfwithai.com quote form</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"ctfwithai Quote" <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: data.email,
      subject: `Quote Request — ${sanitise(data.name)} (${sanitise(data.service || "General")})`,
      html,
    });
    return { success: true };
  } catch (err) {
    // Log internally but never expose SMTP details to the client
    console.error("sendQuote SMTP error:", err instanceof Error ? err.message : "unknown");
    return { success: false, error: "Failed to send. Please try again later." };
  }
}
