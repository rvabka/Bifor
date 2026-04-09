import { Resend } from 'resend';
import { createHmac } from 'crypto';

function generateToken(
  email: string,
  firstName: string,
  secret: string
): string {
  const payload = JSON.stringify({
    email,
    firstName,
    exp: Date.now() + 24 * 60 * 60 * 1000
  });
  const payloadB64 = Buffer.from(payload).toString('base64url');
  const signature = createHmac('sha256', secret)
    .update(payloadB64)
    .digest('base64url');
  return `${payloadB64}.${signature}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, firstName, turnstileToken } = body;

    if (!email || typeof email !== 'string') {
      return Response.json(
        { error: 'Adres e-mail jest wymagany.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Podaj poprawny adres e-mail.' },
        { status: 400 }
      );
    }

    if (!turnstileToken || typeof turnstileToken !== 'string') {
      return Response.json(
        { error: 'Weryfikacja Turnstile jest wymagana.' },
        { status: 400 }
      );
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (!turnstileSecret) {
      return Response.json(
        { error: 'Błąd konfiguracji serwera.' },
        { status: 500 }
      );
    }

    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileToken
        })
      }
    );

    const turnstileData = await turnstileResponse.json();

    if (!turnstileData.success) {
      return Response.json(
        { error: 'Weryfikacja nie powiodła się. Spróbuj ponownie.' },
        { status: 403 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const newsletterSecret = process.env.NEWSLETTER_SECRET;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bifor.games';
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || 'Bifor <noreply@bifor.games>';

    if (!resendApiKey || !newsletterSecret) {
      return Response.json(
        { error: 'Błąd konfiguracji serwera.' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);
    const token = generateToken(email, firstName || '', newsletterSecret);
    const confirmUrl = `${baseUrl}/api/newsletter/confirm?token=${token}`;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Potwierdź zapis do newslettera Bifor 🎉',
      html: `
<!DOCTYPE html>
<html lang="pl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#0e0e0e;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0e0e0e;padding:40px 20px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#1a1a1a;border-radius:16px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;">
        <tr><td style="padding:32px 32px 0;text-align:center;">
          <img src="https://bifor.games/logo.png" alt="Bifor" width="120" style="display:inline-block;height:auto;max-width:120px;" />
        </td></tr>
        <tr><td style="padding:24px 32px 24px;text-align:center;">
          <h1 style="margin:0 0 8px;font-size:28px;font-weight:300;color:#ffffff;letter-spacing:-0.5px;">
            Hej${firstName ? ` ${firstName}` : ''}! 👋
          </h1>
          <p style="margin:0;font-size:15px;color:#a0a0a0;line-height:1.6;">
            Dzięki za zainteresowanie <strong style="color:#FFB200;">Bifor</strong>
          </p>
        </td></tr>
        <tr><td style="padding:0 32px 32px;text-align:center;">
          <p style="margin:0 0 28px;font-size:15px;color:#d0d0d0;line-height:1.7;">
            Kliknij poniższy przycisk, aby potwierdzić swój zapis do newslettera i dołączyć do grona osób z wczesnym dostępem.
          </p>
          <a href="${confirmUrl}" style="display:inline-block;padding:14px 36px;background-color:#FFB200;color:#0e0e0e;font-size:15px;font-weight:700;text-decoration:none;border-radius:50px;letter-spacing:0.3px;">
            Potwierdzam zapis ✓
          </a>
          <p style="margin:24px 0 0;font-size:12px;color:#666666;line-height:1.5;">
            Link jest ważny przez 24 godziny.<br>
            Jeśli to nie Ty — zignoruj tę wiadomość.
          </p>
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
          <p style="margin:0;font-size:11px;color:#555555;">
            © ${new Date().getFullYear()} Bifor · <a href="${baseUrl}/polityka-prywatnosci" style="color:#555555;">Polityka prywatności</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
    });

    if (error) {
      return Response.json(
        {
          error:
            'Nie udało się wysłać maila potwierdzającego. Spróbuj ponownie.'
        },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: 'Sprawdź swoją skrzynkę e-mail i potwierdź zapis!'
    });
  } catch {
    return Response.json(
      { error: 'Wystąpił nieoczekiwany błąd.' },
      { status: 500 }
    );
  }
}
