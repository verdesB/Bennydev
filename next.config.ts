import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    minimumCacheTTL: 31536000,
    domains: ['iskqpfzwkuwtheuclxjq.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iskqpfzwkuwtheuclxjq.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
