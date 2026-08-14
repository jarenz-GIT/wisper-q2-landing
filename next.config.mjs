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
