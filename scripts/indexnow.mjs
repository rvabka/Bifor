// Zgłasza wszystkie adresy z sitemap.xml do IndexNow (Bing, a przez niego
// wyszukiwanie w ChatGPT, oraz Yandex, Seznam i inne). Uruchamiaj po wdrożeniu
// zmian w treści:  node scripts/indexnow.mjs
// Klucz to plik public/497ddb67cf09a28171cbc3755beb9c33.txt - musi być dostępny pod
// https://bifor.games/497ddb67cf09a28171cbc3755beb9c33.txt, inaczej zgłoszenie zostanie odrzucone.
const KEY = '497ddb67cf09a28171cbc3755beb9c33';
const HOST = 'bifor.games';

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList })
});
console.log(`IndexNow: ${res.status} ${res.statusText}, ${urlList.length} adresów`);
