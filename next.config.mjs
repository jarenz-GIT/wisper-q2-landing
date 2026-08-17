/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/images/og-preview.jpg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
      {
        source: "/apple-touch-icon.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/work", destination: "/", permanent: false },
      { source: "/work/:slug", destination: "/", permanent: false },
      { source: "/pricing", destination: "/", permanent: false },
      { source: "/services", destination: "/", permanent: false },
      { source: "/contact", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
