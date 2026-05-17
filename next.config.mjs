/** @type {import('next').NextConfig} */
// basePath wird beim Build auf GitHub Pages auf "/CarmaDesign3D" gesetzt
// (per NEXT_PUBLIC_BASE_PATH im Workflow). Lokal/Vercel: leer.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Static Export kann den next/image-Optimizer nicht ausliefern.
    unoptimized: true,
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
