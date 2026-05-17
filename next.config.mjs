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
    // Static Export: Custom Loader setzt NEXT_PUBLIC_BASE_PATH vor jede src,
    // damit Bilder auf GitHub Pages (/CarmaDesign3D/images/...) korrekt laden.
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
