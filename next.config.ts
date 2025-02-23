import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  experimental: {
    appDir: false, // Desactiva el "App Directory" y usa la estructura tradicional con "pages/"
  },
};

export default nextConfig;
