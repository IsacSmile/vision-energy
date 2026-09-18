import nodemailer from 'nodemailer';

export async function sendNotificationEmail(subject: string, htmlContent: string) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || 'Vision Energy System <noreply@visionenergyme.com>';
  const to = process.env.NOTIFICATION_EMAIL || 'info@visionenergyme.com';

  if (!host || !user || !pass) {
    console.log('[Email System] SMTP credentials unconfigured. Skipping email dispatch. Notification subject:', subject);
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

    await transporter.sendMail({
      from,
      to,
      subject,
      html: htmlContent
    });

    console.log('[Email System] Notification sent successfully to:', to);
    return true;
  } catch (error) {
    console.error('[Email System Error] Failed to send email:', error);
    return false;
  }
}
