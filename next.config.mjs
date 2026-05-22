/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Media is served directly from Cloudflare R2 (public bucket / custom domain),
  // so Next's <Image> optimizer is not in the path. We use plain <img>/<video>
  // with R2 URLs. No remotePatterns needed unless you adopt next/image later.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};
export default nextConfig;
