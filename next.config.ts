import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // FOR DEVELOPMENT ONLY - No basePath for localhost
  // When ready to deploy, we'll uncomment the GitHub Pages config
  
  // Image optimization (keep this for better performance)
  images: {
    unoptimized: true
  },
  
  // Additional optimizations
  experimental: {
    optimizeCss: true,
  },
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // DEPLOYMENT CONFIG (COMMENTED OUT FOR NOW)
  // Uncomment these lines when ready to deploy to GitHub Pages:
  
  // output: 'export',
  // trailingSlash: true,
  // basePath: '/lostastr0-site',
  // assetPrefix: '/lostastr0-site/',
};

export default nextConfig;
