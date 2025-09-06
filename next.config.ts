import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**'
      },
            {
        protocol: 'https',
        hostname: 'codlpjskalcsqhfquecs.supabase.co',
        port: '',
        pathname: '/**'
      }
    ]
  }
};
export default nextConfig;
