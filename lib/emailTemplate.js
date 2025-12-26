// Shared email template for Dream Build Luxury Glass
// Used by contact form and portal email composer

export const LOGO_URL = "https://images.dbluxuryglass.com/logo.png";
export const GOLD = "#D4AF37";
export const DARK = "#0A0A0A";

/**
 * Wraps content in a branded HTML email template
 * @param {string} content - HTML content to wrap
 * @returns {string} Complete HTML email
 */
export function emailWrapper(content) {
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
                Elevate Your Lifestyle
              </p>
              <p style="color: #888888; font-size: 12px; margin: 15px 0 0 0;">
                <a href="https://dbluxuryglass.com" style="color: ${GOLD}; text-decoration: none;">dbluxuryglass.com</a>
                &nbsp;|&nbsp;
                <a href="tel:+14047078819" style="color: ${GOLD}; text-decoration: none;">(404) 707-8819</a>
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

/**
 * Formats plain text content as styled HTML for email body
 * @param {string} text - Plain text content
 * @returns {string} HTML formatted content
 */
export function formatEmailContent(text) {
  // Convert line breaks to paragraphs
  const paragraphs = text.split('\n\n').filter(p => p.trim());

  return paragraphs
    .map(p => `<p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">${p.replace(/\n/g, '<br>')}</p>`)
    .join('');
}

/**
 * Creates a complete branded email from plain text
 * @param {string} text - Plain text content
 * @returns {string} Complete HTML email
 */
export function createEmail(text) {
  return emailWrapper(formatEmailContent(text));
}
