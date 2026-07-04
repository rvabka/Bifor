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
    ];
  },
};

export default nextConfig;
