import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/workout-pj",
        destination: "/workout-pj/index.html",
      },
    ];
  },
};

export default nextConfig;
