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
        destination:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/:path*"
            : process.env.NEXT_PUBLIC_SERVER_URL,
      },
    ];
  },
};

module.exports = nextConfig;
