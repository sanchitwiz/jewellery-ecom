import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.miabytanishq.com",
      },
    ],
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "unsplash.com",
      "www.miabytanishq.com", // Added missing domain
    ],
    unoptimized: true, // Optional: Disable optimization if needed
  },
};

export default nextConfig;
