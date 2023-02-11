/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  optimizeFonts: false,
  experimental: {
    appDir: true
  },


  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'icons8.com',
        port: '',
        pathname: '/officel/80/null/**',
      },
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        port: '',
        pathname: '/img/ecommerce-images/**',
      },
    ],
  },

}
