import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, turnstileToken } = body;

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
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!resendApiKey || !audienceId) {
      return Response.json(
        { error: 'Błąd konfiguracji serwera.' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const { error } = await resend.contacts.create({
      email,
      audienceId
    });

    if (error) {
      if (error.message?.includes('already exists')) {
        return Response.json(
          { error: 'Ten adres e-mail jest już zapisany.' },
          { status: 409 }
        );
      }
      return Response.json(
        { error: 'Nie udało się zapisać. Spróbuj ponownie.' },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: 'Zapisano pomyślnie!'
    });
  } catch {
    return Response.json(
      { error: 'Wystąpił nieoczekiwany błąd.' },
      { status: 500 }
    );
  }
}
