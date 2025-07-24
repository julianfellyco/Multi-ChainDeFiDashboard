/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Optimize images automatically
  images: {
    domains: ['assets.coingecko.com', 'raw.githubusercontent.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable experimental features
  experimental: {
    // Enable app directory (Next.js 14)
    appDir: true,
  },
  
  // Configure for GitHub Pages deployment (if needed)
  // Uncomment the lines below for GitHub Pages
  /*
  output: 'export',
  trailingSlash: true,
  basePath: '/modern-defi-dashboard',
  assetPrefix: '/modern-defi-dashboard',
  */
  
  // Webpack configuration for Web3 compatibility
  webpack: (config, { isServer }) => {
    // Handle node modules that need polyfills
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    
    // Handle WebAssembly files
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }
    
    return config
  },
  
  // Environment variables that should be available to the client
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Headers for security and CORS
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'cross-origin',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
