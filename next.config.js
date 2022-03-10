/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['substrate-react']); // pass the modules you would like to see transpiled

const nextConfig = {
  reactStrictMode: true,
  env: {
    SUBSTRATE_NODE_RPC: process.env.SUBSTRATE_NODE_RPC
  }
}

module.exports = withTM(nextConfig)
