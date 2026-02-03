import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.fabioagnelli.fr',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/wp-admin/:path*',
        destination: 'http://91.108.101.170/wp-admin/:path*',
      },
      {
        source: '/wp-json/:path*',
        destination: 'http://91.108.101.170/wp-json/:path*',
      },
      {
        source: '/wp-login.php',
        destination: 'http://91.108.101.170/wp-login.php',
      },
      {
        source: '/wp-content/:path*',
        destination: 'http://91.108.101.170/wp-content/:path*',
      },
    ]
  },
};

export default nextConfig;