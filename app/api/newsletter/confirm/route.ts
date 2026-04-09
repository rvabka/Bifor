import { Resend } from 'resend';
import { createHmac, timingSafeEqual } from 'crypto';
import { NextRequest } from 'next/server';

function verifyToken(
  token: string,
  secret: string
): { email: string; firstName: string } | null {
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadB64, signature] = parts;
  if (!payloadB64 || !signature) return null;

  const expectedSig = createHmac('sha256', secret)
    .update(payloadB64)
    .digest('base64url');

  const sigBuffer = Buffer.from(signature, 'base64url');
  const expectedBuffer = Buffer.from(expectedSig, 'base64url');

  if (
    sigBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(sigBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString());

    if (!payload.exp || payload.exp < Date.now()) return null;
    if (!payload.email) return null;

    return { email: payload.email, firstName: payload.firstName || '' };
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return Response.redirect(
      new URL('/potwierdz?status=error', request.nextUrl.origin)
    );
  }

  const newsletterSecret = process.env.NEWSLETTER_SECRET;
  const resendApiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!newsletterSecret || !resendApiKey || !audienceId) {
    return Response.redirect(
      new URL('/potwierdz?status=error', request.nextUrl.origin)
    );
  }

  const data = verifyToken(token, newsletterSecret);

  if (!data) {
    return Response.redirect(
      new URL('/potwierdz?status=expired', request.nextUrl.origin)
    );
  }

  const resend = new Resend(resendApiKey);

  const { error } = await resend.contacts.create({
    email: data.email,
    firstName: data.firstName || undefined,
    audienceId
  });

  if (error) {
    if (error.message?.includes('already exists')) {
      return Response.redirect(
        new URL('/potwierdz?status=already', request.nextUrl.origin)
      );
    }
    return Response.redirect(
      new URL('/potwierdz?status=error', request.nextUrl.origin)
    );
  }

  return Response.redirect(
    new URL('/potwierdz?status=success', request.nextUrl.origin)
  );
}
