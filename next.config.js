/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SUBSTRATE_NODE_RPC: process.env.SUBSTRATE_NODE_RPC
  }
}

module.exports = nextConfig
