// app/api/contact/route.js
import { Resend } from "resend";
import { NextResponse } from "next/server";

const LOGO_URL = "https://images.dbluxuryglass.com/logo.png";
const GOLD = "#D4AF37";
const DARK = "#0A0A0A";

// Email template wrapper
function emailWrapper(content) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: ${DARK}; padding: 30px; text-align: center;">
              <img src="${LOGO_URL}" alt="Dream Build Luxury Glass" width="150" style="display: block; margin: 0 auto;">
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: ${DARK}; padding: 30px; text-align: center;">
              <p style="color: ${GOLD}; font-size: 14px; margin: 0 0 10px 0; font-weight: bold;">
                Dream Build Luxury Glass LLC
              </p>
              <p style="color: #888888; font-size: 12px; margin: 0 0 5px 0;">
                Crafting Luxury, One Pane at a Time
              </p>
              <p style="color: #888888; font-size: 12px; margin: 15px 0 0 0;">
                <a href="tel:+14047078819" style="color: ${GOLD}; text-decoration: none;">(404) 707-8819</a>
                &nbsp;|&nbsp;
                <a href="mailto:support@dbluxuryglass.com" style="color: ${GOLD}; text-decoration: none;">support@dbluxuryglass.com</a>
              </p>
              <p style="color: #666666; font-size: 11px; margin: 20px 0 0 0;">
                © ${new Date().getFullYear()} Dream Build Luxury Glass LLC. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Business notification email
function businessEmailTemplate({ name, phone, email, message }) {
  return emailWrapper(`
    <h1 style="color: ${DARK}; font-size: 24px; margin: 0 0 20px 0; border-bottom: 3px solid ${GOLD}; padding-bottom: 15px;">
      New Quote Request
    </h1>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 25px;">
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
          <strong style="color: ${DARK}; width: 120px; display: inline-block;">Name:</strong>
          <span style="color: #333333;">${name}</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
          <strong style="color: ${DARK}; width: 120px; display: inline-block;">Phone:</strong>
          <a href="tel:${phone}" style="color: ${GOLD}; text-decoration: none;">${phone}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
          <strong style="color: ${DARK}; width: 120px; display: inline-block;">Email:</strong>
          <a href="mailto:${email}" style="color: ${GOLD}; text-decoration: none;">${email}</a>
        </td>
      </tr>
    </table>

    <div style="background-color: #f9f9f9; border-left: 4px solid ${GOLD}; padding: 20px; margin-top: 20px;">
      <strong style="color: ${DARK}; display: block; margin-bottom: 10px;">Project Details:</strong>
      <p style="color: #555555; margin: 0; line-height: 1.6;">${message || "No details provided"}</p>
    </div>

    <div style="margin-top: 30px; padding: 20px; background-color: #f0f7ff; border-radius: 6px; text-align: center;">
      <p style="margin: 0; color: #333;">
        <strong>Respond within 2 hours</strong> to maintain our service promise!
      </p>
    </div>
  `);
}

// Customer confirmation email
function customerEmailTemplate({ name }) {
  return emailWrapper(`
    <h1 style="color: ${DARK}; font-size: 24px; margin: 0 0 20px 0; border-bottom: 3px solid ${GOLD}; padding-bottom: 15px;">
      Thank You, ${name}!
    </h1>

    <p style="color: #333333; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
      We've received your quote request and are excited to help transform your space with premium custom glass.
    </p>

    <div style="background-color: #f9f9f9; border-radius: 8px; padding: 25px; margin: 25px 0; text-align: center;">
      <p style="color: ${DARK}; font-size: 18px; font-weight: bold; margin: 0 0 10px 0;">
        What happens next?
      </p>
      <p style="color: #555555; margin: 0; line-height: 1.6;">
        Our team will review your request and contact you<br>
        <strong style="color: ${GOLD};">within 2 hours</strong> during business hours.
      </p>
    </div>

    <p style="color: #333333; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
      Have an urgent question? Don't hesitate to call us directly:
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="tel:+14047078819" style="display: inline-block; background-color: ${GOLD}; color: ${DARK}; text-decoration: none; padding: 15px 35px; font-size: 18px; font-weight: bold; border-radius: 4px;">
        (404) 707-8819
      </a>
    </div>

    <div style="border-top: 1px solid #eeeeee; padding-top: 25px; margin-top: 30px;">
      <p style="color: #333333; margin: 0 0 5px 0;">Best regards,</p>
      <p style="color: ${GOLD}; font-weight: bold; margin: 0;">The Dream Build Team</p>
    </div>
  `);
}

export async function POST(request) {
  try {
    const { name, phone, email, message } = await request.json();

    // Validate required fields
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone, and email are required" },
        { status: 400 }
      );
    }

    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email to business
    const { data, error } = await resend.emails.send({
      from: "Dream Build Website <noreply@dbluxuryglass.com>",
      to: ["support@dbluxuryglass.com"],
      subject: `New Quote Request from ${name}`,
      html: businessEmailTemplate({ name, phone, email, message }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    // Send confirmation email to customer
    await resend.emails.send({
      from: "Dream Build Luxury Glass <noreply@dbluxuryglass.com>",
      to: [email],
      subject: "We received your quote request!",
      html: customerEmailTemplate({ name }),
    });

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
