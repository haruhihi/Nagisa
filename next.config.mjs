/** @type {import('next').NextConfig} */
const nextConfig = {
    // or might on mount twice https://stackoverflow.com/questions/71835580/useeffect-being-called-twice-in-nextjs-typescript-app
    reactStrictMode: false,
    async redirects() {
      return [
        // Basic redirect
        {
          source: "/",
          destination: "/meow/bill",
          // Do not set permanent true, or it will be cached which will cause confusing when you build a new app under this path.
          permanent: false,
        },
      ];
    },
    transpilePackages: ['antd-mobile'],
    /**
     * https://github.com/vercel/next.js/discussions/50587#discussioncomment-6134092
     * Fix sequelize error:
     */
    // experimental: {
    //   serverComponentsExternalPackages: ["sequelize"],
    // },
    env: {
      NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    },
  };
  
  export default nextConfig;