// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: { bodySizeLimit: "10mb" },
    },
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "pub-abc0b90799714b2e8d44008281c6c904.r2.dev" },
        ],
    },
};

export default nextConfig;