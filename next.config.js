/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Enable SWC minification for faster builds
  swcMinify: true,
  
  // Experimental features
  experimental: {
    // Enable App Router features
    appDir: true,
  },
  
  // Image optimization
  images: {
    domains: [
      'assets.coingecko.com',
      'raw.githubusercontent.com',
      'cloudflare-ipfs.com',
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Environment variables that should be available on the client
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Handle node modules that need to be transpiled
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }
    
    // Add support for importing .svg files as React components
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    
    return config
  },
  
  // Headers configuration
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  
  // Redirects
  async redirects() {
    return [
      // Redirect old paths if needed
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // },
    ]
  },
  
  // For GitHub Pages deployment (uncomment if needed)
  // output: 'export',
  // trailingSlash: true,
  // basePath: '/modern-defi-dashboard',
  // assetPrefix: '/modern-defi-dashboard',
  
  // Performance optimizations
  compress: true,
  
  // PWA support (if you want to add it later)
  // Add next-pwa configuration here
  
  // Bundle analyzer (uncomment to analyze bundle size)
  // bundleAnalyzer: {
  //   enabled: process.env.ANALYZE === 'true',
  // },
}

module.exports = nextConfig
