/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            hostname: "placekitten.com"
         },
         {
            hostname: "placedog.net"
         },
      ]
   }
};

export default nextConfig;
