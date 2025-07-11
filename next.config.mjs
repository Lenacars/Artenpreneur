/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: ['localhost'], // 'placeholder.svg' domain değil, gerek yoksa çıkar.
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    return config;
  },
  typescript: {
    ignoreBuildErrors: true, // Production'da false olmalı
  },
  eslint: {
    ignoreDuringBuilds: true, // Production'da false olmalı
  },
  experimental: {
    serverExternalPackages: ['@prisma/client'],
  },
};

export default nextConfig;
