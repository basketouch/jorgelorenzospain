import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "otsbpiukzftacmvmkajy.supabase.co" },
      { protocol: "https", hostname: "newsletter.jorgelorenzo.coach" },
    ],
  },
};

export default nextConfig;
