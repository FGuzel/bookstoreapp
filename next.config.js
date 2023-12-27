/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "books.google.com"
            },
            {
                protocol: "http",
                hostname: "localhost"
            }
        ]
    },
    modularizeImports: {
        components: {
          transform: 'components/{{ kebabCase member }}',
          skipDefaultConversion: true
        }
    },
    env: {
        USER_ID: process.env.USER_ID,
        SHELF_ID: process.env.SHELF_ID,
    },
}

module.exports = nextConfig
