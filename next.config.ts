import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
      {
        source: "/.well-known/assetlinks.json",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/privacy",
        destination: "/polityka-prywatnosci",
        permanent: true,
      },
      {
        source: "/regulamin",
        destination: "/terms",
        permanent: true,
      },
      { source: "/games", destination: "/gry", permanent: true },
      { source: "/gry-imprezowe", destination: "/gry", permanent: true },
      { source: "/gry/panstwa", destination: "/gry/panstwa-miasta", permanent: true },
      { source: "/gry/czolko-gra", destination: "/gry/czolko", permanent: true },
      { source: "/pytania", destination: "/faq", permanent: true },
      // Dawna strona zapisu na testy Androida - link trafił do maili i na TikToka.
      { source: "/test", destination: "/pobierz/android", permanent: false },
    ];
  },
};

export default nextConfig;
