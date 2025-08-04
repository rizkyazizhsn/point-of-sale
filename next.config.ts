import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    domains: ["https://sjvoeklygvcxwjnyrffz.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sjvoeklygvcxwjnyrffz.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
