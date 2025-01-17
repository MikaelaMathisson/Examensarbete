/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DATABASE_URL: 'postgres://postgres:mysecretpassword@localhost:5432/postgres'
    },
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['example.com'],
    },
};

export default nextConfig;