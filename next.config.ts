import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimisation des images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    minimumCacheTTL: 60,
  },

  // Optimisation du build
  swcMinify: true,
  
  // Compression Gzip/Brotli
  compress: true,

  // Optimisation du cache
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 1 minute
    pagesBufferLength: 2,
  },

  // Optimisation des polices
  optimizeFonts: true,

  // Activation du mode strict pour de meilleures performances
  reactStrictMode: true,

  // Optimisation des modules
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    'lodash': {
      transform: 'lodash/{{member}}',
    },
  },
};

export default nextConfig;
