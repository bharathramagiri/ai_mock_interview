/** @type {import('next').NextConfig} */
const nextConfig = {
  // This tells Vercel to skip the strict linting checks
  eslint: {
    ignoreDuringBuilds: true,
  },
  // This tells Vercel to skip strict TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;