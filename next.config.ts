import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://img.clerk.com/**'),
      new URL('https://roqbbvgvalczertxvrvq.supabase.co/**')
    ]
  },
};

export default nextConfig;