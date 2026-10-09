// Mail do listy zapisanej przed startem: BIFOR w sklepach + złoty skin w apce.
//   node scripts/newsletter-start.mjs preview            podgląd HTML z lokalnymi obrazkami
//   node scripts/newsletter-start.mjs names              porządkuje imiona na liście (spacje, wielka litera)
//   node scripts/newsletter-start.mjs test adres@x.pl    jeden mail na wskazany adres
//   node scripts/newsletter-start.mjs broadcast --yes    wysyłka do całej listy
// Obrazki leżą w public/mail i muszą być wdrożone na bifor.games przed wysyłką.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const env = Object.fromEntries(
  readFileSync(join(ROOT, '.env'), 'utf8')
    .split('\n')
    .map((l) => l.match(/^([A-Z_]+)=(.*)$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].replace(/^["']|["']$/g, '')])
);

const API = 'https://api.resend.com';
const FROM = 'Bifor <hej@bifor.games>';
const REPLY_TO = 'contact@bifor.games';
const SUBJECT = 'BIFOR już w sklepach - i 🎁 dla Ciebie';
const PREHEADER = 'Dziękujemy za zapis przed startem. W apce czeka złoty skin.';
const SOURCE = 'newsletter';
const MAIL_FILES = ['start-armata.jpg', 'zloty-skin.jpg', 'app-store.png', 'google-play.png'];

const SITE = 'https://bifor.games';
const APP_STORE = `https://apps.apple.com/app/apple-store/id6788678207?pt=129131510&ct=${SOURCE}&mt=8`;
const PLAY = `https://play.google.com/store/apps/details?id=com.bifor.app&referrer=${encodeURIComponent(`utm_source=${SOURCE}&utm_medium=email`)}`;

const C = {
  bg: '#0a0a0a',
  white: '#ffffff',
  body: '#adaaaa',
  fine: '#8e8e98',
  micro: '#7c7c86',
};
// Gmail na iPhonie w trybie ciemnym odwraca kolory także w ciemnych mailach:
// tło robi się jasne, a obrazki zostają czarnymi prostokątami. Obrazów tła nie
// odwraca, więc tło idzie dodatkowo jako jednolity gradient, a klasy gs/gd
// (mieszanie warstw, tylko w Gmailu) przywracają tekstowi pierwotne kolory.
const DARK = `linear-gradient(${C.bg},${C.bg})`;
const FONT = "Montserrat,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

function build({ assets, firstName, unsubscribe }) {
  const img = (file) => (assets === 'cid:' ? `cid:${file}` : `${assets}/${file}`);
  const row = (pad, inner) => `
        <tr>
          <td align="center" style="padding:${pad};text-align:center;">
${inner}
          </td>
        </tr>`;
  const keep = (inner) => `            <div class="gs"><div class="gd">
${inner}
            </div></div>`;
  const p = (text, size = 16, line = 25, color = C.body) =>
    keep(
      `            <p style="margin:0 auto;max-width:400px;font-family:${FONT};font-size:${size}px;line-height:${line}px;font-weight:500;color:${color};text-align:center;">${text}</p>`
    );
  const heading = (tag, text, size, line, cls = '') =>
    keep(
      `            <${tag}${cls ? ` class="${cls}"` : ''} style="margin:0;font-family:${FONT};font-size:${size}px;line-height:${line}px;font-weight:800;letter-spacing:-0.5px;color:${C.white};text-align:center;">${text}</${tag}>`
    );

  const badges = `            <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
              <tr>
                <td style="padding:0 5px;"><a href="${APP_STORE}" target="_blank"><img src="${img('app-store.png')}" width="119" height="40" alt="Pobierz z App Store" border="0" style="display:block;width:119px;height:40px;border:0;color:${C.white};font-family:${FONT};font-size:13px;"></a></td>
                <td style="padding:0 5px;"><a href="${PLAY}" target="_blank"><img src="${img('google-play.png')}" width="135" height="40" alt="Pobierz z Google Play" border="0" style="display:block;width:135px;height:40px;border:0;color:${C.white};font-family:${FONT};font-size:13px;"></a></td>
              </tr>
            </table>`;

  const blocks = [
    row(
      '0 0 4px 0',
      `            <a href="${SITE}" target="_blank" style="text-decoration:none;"><img src="${SITE}/logo.png" width="118" height="64" alt="BIFOR" border="0" style="display:block;margin:0 auto;width:118px;height:64px;border:0;color:#ffb200;font-family:${FONT};font-size:22px;font-weight:800;letter-spacing:2px;"></a>`
    ),
    row(
      '0',
      `            <a href="${SITE}" target="_blank"><img src="${img('start-armata.jpg')}" width="420" alt="Duet z BIFOR wylatuje na imprezę na armacie" border="0" style="display:block;margin:0 auto;width:100%;max-width:420px;height:auto;border:0;"></a>`
    ),
    row('0', heading('h1', 'Dziękujemy za&nbsp;zaufanie.', 36, 40, 'h1')),
    row(
      '14px 0 0 0',
      p(`${firstName}, zapis jeszcze przed startem wiele dla nas znaczy. BIFOR jest już w&nbsp;sklepach, za darmo.`)
    ),
    row('26px 0 0 0', badges),
    row(
      '52px 0 0 0',
      `            <img src="${img('zloty-skin.jpg')}" width="150" height="170" alt="Złoty skin z BIFOR" border="0" style="display:block;margin:0 auto;width:150px;height:170px;border:0;">`
    ),
    row('0', heading('h2', 'Złoty skin w&nbsp;prezencie', 22, 28)),
    row(
      '10px 0 0 0',
      p('Załóż konto na ten adres <span style="white-space:nowrap;">e-mail</span>, a skin będzie czekał w&nbsp;apce. Mają go tylko osoby z&nbsp;listy.')
    ),
    row(
      '12px 0 0 0',
      p('Logujesz się przez Apple? Wybierz <span style="white-space:nowrap;">„Udostępnij mój</span> adres <span style="white-space:nowrap;">e-mail”</span>.', 13, 20, C.fine)
    ),
    row('36px 0 0 0', p('Bawcie się dobrze na najbliższej imprezie!', 18, 26, C.white)),
    row('6px 0 0 0', p('Ekipa BIFOR', 15, 22)),
    row(
      '44px 0 0 0',
      keep(`            <p style="margin:0;font-family:${FONT};font-size:12px;line-height:19px;color:${C.micro};text-align:center;">Dostajesz tę wiadomość, bo ten adres zapisano na bifor.games przed startem.</p>
            <p style="margin:6px 0 0 0;font-family:${FONT};font-size:12px;line-height:19px;color:${C.micro};text-align:center;"><a href="${SITE}/polityka-prywatnosci" target="_blank" style="color:${C.micro};text-decoration:underline;">Polityka prywatności</a> &nbsp;&nbsp;<a href="${unsubscribe}" target="_blank" style="color:${C.micro};text-decoration:underline;">Wypisz się</a></p>`)
    ),
  ];

  return `<!doctype html>
<html lang="pl" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${SUBJECT}</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<![endif]-->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700;800&display=swap" rel="stylesheet">
<style>
  u + .body .gs{background:#000;mix-blend-mode:screen;}
  u + .body .gd{background:#000;mix-blend-mode:difference;}
</style>
<style>
  @media (max-width:600px){
    .wrap{padding:32px 20px 48px 20px!important;}
    .h1{font-size:31px!important;line-height:35px!important;}
  }
</style>
<style>
  a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;}
</style>
</head>
<body class="body" style="margin:0;padding:0;background-color:${C.bg};background-image:${DARK};">

<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${PREHEADER}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.bg}" style="background-color:${C.bg};background-image:${DARK};">
  <tr>
    <td align="center" class="wrap" bgcolor="${C.bg}" style="padding:44px 24px 60px 24px;background-color:${C.bg};background-image:${DARK};">

      <table role="presentation" align="center" width="460" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:460px;margin:0 auto;">${blocks.join('')}
      </table>

    </td>
  </tr>
</table>

</body>
</html>
`;
}

function text(firstName, unsubscribe) {
  return `Dziękujemy za zaufanie.

${firstName}, zapis jeszcze przed startem wiele dla nas znaczy. BIFOR jest już w sklepach, za darmo.

App Store: ${APP_STORE}
Google Play: ${PLAY}

Złoty skin w prezencie. Załóż konto na ten adres e-mail, a skin będzie czekał w apce. Mają go tylko osoby z listy.
Logujesz się przez Apple? Wybierz „Udostępnij mój adres e-mail”.

Bawcie się dobrze na najbliższej imprezie!
Ekipa BIFOR

Dostajesz tę wiadomość, bo ten adres zapisano na bifor.games przed startem.
Wypisz się: ${unsubscribe}
`;
}

async function call(path, init = {}) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${path}: ${res.status} ${JSON.stringify(body)}`);
  return body;
}

const cleanName = (raw) => {
  const name = (raw ?? '').trim();
  return name ? name[0].toLocaleUpperCase('pl') + name.slice(1) : '';
};

const contacts = async () =>
  (await call(`/audiences/${env.RESEND_AUDIENCE_ID}/contacts`)).data ?? [];

const [cmd, arg] = process.argv.slice(2);

if (cmd === 'preview') {
  const out = join(process.env.TMPDIR ?? '/tmp', 'bifor-start.html');
  writeFileSync(
    out,
    build({ assets: pathToFileURL(join(ROOT, 'public', 'mail')).href, firstName: 'Kacper', unsubscribe: '#' })
  );
  console.log(out);
} else if (cmd === 'names') {
  for (const c of await contacts()) {
    const name = cleanName(c.first_name);
    if (name === (c.first_name ?? '')) continue;
    await call(`/audiences/${env.RESEND_AUDIENCE_ID}/contacts/${c.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ first_name: name }),
    });
    console.log(`${JSON.stringify(c.first_name)} -> ${JSON.stringify(name)}`);
  }
} else if (cmd === 'test') {
  if (!arg) throw new Error('Podaj adres: node scripts/newsletter-start.mjs test adres@x.pl');
  const match = (await contacts()).find((c) => c.email.toLowerCase() === arg.toLowerCase());
  const firstName = cleanName(match?.first_name) || 'Hej';
  const deployed = (await fetch(`${SITE}/mail/${MAIL_FILES[0]}`, { method: 'HEAD' })).ok;
  const sent = await call('/emails', {
    method: 'POST',
    body: JSON.stringify({
      from: FROM,
      to: arg,
      reply_to: REPLY_TO,
      subject: `[TEST] ${SUBJECT}`,
      html: build({ assets: deployed ? `${SITE}/mail` : 'cid:', firstName, unsubscribe: SITE }),
      text: text(firstName, SITE),
      attachments: deployed
        ? undefined
        : MAIL_FILES.map((file) => ({
            filename: file,
            content: readFileSync(join(ROOT, 'public', 'mail', file)).toString('base64'),
            content_id: file,
          })),
    }),
  });
  console.log('wysłane', sent.id);
} else if (cmd === 'broadcast') {
  if (arg !== '--yes') throw new Error('Wysyłka do całej listy wymaga --yes');
  const firstName = '{{{contact.first_name|Hej}}}';
  const unsubscribe = '{{{RESEND_UNSUBSCRIBE_URL}}}';
  const created = await call('/broadcasts', {
    method: 'POST',
    body: JSON.stringify({
      segment_id: env.RESEND_AUDIENCE_ID,
      name: 'Bifor Start',
      from: FROM,
      reply_to: REPLY_TO,
      subject: SUBJECT,
      html: build({ assets: `${SITE}/mail`, firstName, unsubscribe }),
      text: text(firstName, unsubscribe),
    }),
  });
  await call(`/broadcasts/${created.id}/send`, { method: 'POST', body: '{}' });
  console.log('wysyłka ruszyła', created.id);
} else {
  console.log('Komendy: preview | names | test <adres> | broadcast --yes');
}
