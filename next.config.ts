import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
