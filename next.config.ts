import type { NextConfig } from "next";

const repoName = "ServiceCommunication";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
