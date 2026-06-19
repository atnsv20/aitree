/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow importing the shared workspace TS package directly.
  transpilePackages: ["@aitree/types"],
  env: {
    API_URL: process.env.API_URL ?? "http://localhost:4000",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  },
};

export default nextConfig;
