/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "",
  },
  env: {
    API_URL: process.env.API_URL,
  },
  exportPathMap: async function (defaultPathMap) {
    return {
      "/": { page: "/" },
    };
  },
};

module.exports = nextConfig;
