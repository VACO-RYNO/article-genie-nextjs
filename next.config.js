/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://localhost:3000/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
