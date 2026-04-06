import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.idealista.pt',
      },
      {
        protocol: 'https',
        hostname: '**.ideal.ist',
      },
    ],
  },
};

export default nextConfig;
