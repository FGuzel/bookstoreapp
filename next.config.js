/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        USER_ID: process.env.USER_ID,
        SHELF_ID: process.env.SHELF_ID,
    }
}

module.exports = nextConfig
