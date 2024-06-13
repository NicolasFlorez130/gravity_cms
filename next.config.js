/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
   images: {
      remotePatterns: [
         {
            hostname: "placekitten.com"
         },
         {
            hostname: "placedog.net"
         },
      ]
   },
   eslint: {
      ignoreDuringBuilds: true
   }
};

export default config;
