// app/api/contact/route.js
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { emailWrapper, GOLD, DARK } from "@/lib/emailTemplate";

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
      <p style="color: #555555; margin: 0; line-height: 1.6;">${
        message || "No details provided"
      }</p>
    </div>

    <div style="margin-top: 30px; padding: 20px; background-color: #f0f7ff; border-radius: 6px; text-align: center;">
      <p style="margin: 0; color: #333;">
        <strong>Respond within 2 hours</strong> to maintain our service promise!
      </p>
    </div>
  `);
}

// Summary email for management
function summaryEmailTemplate({ name, phone, email, message }) {
  return emailWrapper(`
    <h1 style="color: ${DARK}; font-size: 24px; margin: 0 0 20px 0; border-bottom: 3px solid ${GOLD}; padding-bottom: 15px;">
      📋 Lead Summary
    </h1>

    <div style="background-color: #fafafa; border-radius: 8px; padding: 25px; margin-bottom: 20px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td style="padding: 8px 0;">
            <span style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Contact</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 0 15px 0;">
            <strong style="color: ${DARK}; font-size: 18px;">${name}</strong>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-top: 1px solid #eee;">
            <span style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Phone</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 0 15px 0;">
            <a href="tel:${phone}" style="color: ${GOLD}; font-size: 16px; text-decoration: none; font-weight: bold;">${phone}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-top: 1px solid #eee;">
            <span style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 0 15px 0;">
            <a href="mailto:${email}" style="color: ${GOLD}; font-size: 16px; text-decoration: none;">${email}</a>
          </td>
        </tr>
      </table>
    </div>

    <div style="background-color: ${DARK}; border-radius: 8px; padding: 20px;">
      <p style="color: ${GOLD}; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">Project Details</p>
      <p style="color: #ffffff; margin: 0; line-height: 1.6; font-size: 14px;">${
        message || "No details provided"
      }</p>
    </div>

    <div style="margin-top: 25px; text-align: center;">
      <p style="color: #888; font-size: 12px; margin: 0;">
        Received on ${new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
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
    const {
      name,
      phone,
      email,
      message,
      source,
      utm_source,
      utm_medium,
      utm_campaign,
    } = await request.json();

    // Validate required fields
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone, and email are required" },
        { status: 400 }
      );
    }

    // Save lead to Supabase (if configured)
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from("leads").insert([
          {
            name,
            email,
            phone,
            source: source || "direct",
            utm_source: utm_source || null,
            utm_medium: utm_medium || null,
            utm_campaign: utm_campaign || null,
          },
        ]);
      }
    } catch (dbError) {
      console.error("Failed to save lead to database:", dbError);
      // Continue with email sending even if DB fails
    }

    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email to business
    const { data, error } = await resend.emails.send({
      from: "Dream Build Website <quotes@dbluxuryglass.com>",
      to: ["nation_dreambuild@outlook.com"],
      replyTo: email,
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
      from: "Dream Build Luxury Glass <hello@dbluxuryglass.com>",
      to: [email],
      replyTo: "support@dbluxuryglass.com",
      subject: "We received your quote request!",
      html: customerEmailTemplate({ name }),
    });

    // Send summary email to management
    await resend.emails.send({
      from: "Dream Build Website <quotes@dbluxuryglass.com>",
      to: ["nationdreambuild@outlook.com"],
      replyTo: email,
      subject: `Lead Summary: ${name}`,
      html: summaryEmailTemplate({ name, phone, email, message }),
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
