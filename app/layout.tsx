// app/layout.tsx - Next.js 14 App Router Layout

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navbar } from '@/components/Navbar'
import { Toaster } from '@/components/ui/Toaster'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Modern DeFi Dashboard | Julian Fellyco',
    template: '%s | Modern DeFi Dashboard'
  },
  description: 'Ultra-modern multi-chain DeFi portfolio tracker built with Next.js 14, TypeScript, and wagmi v2. Track your assets across Ethereum, Polygon, Arbitrum, and Base.',
  keywords: [
    'DeFi',
    'Web3',
    'Ethereum',
    'Polygon',
    'Arbitrum',
    'Base',
    'Portfolio',
    'Multi-chain',
    'wagmi',
    'TypeScript',
    'Next.js',
    'Blockchain',
    'Cryptocurrency',
    'Uniswap',
    'Aave',
    'Julian Fellyco'
  ],
  authors: [{ name: 'Julian Fellyco', url: 'https://julianfellyco.github.io/portfolio/' }],
  creator: 'Julian Fellyco',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://julianfellyco.github.io/modern-defi-dashboard',
    siteName: 'Modern DeFi Dashboard',
    title: 'Modern DeFi Dashboard - Multi-Chain Portfolio Tracker',
    description: 'Track your DeFi portfolio across multiple blockchains with real-time data and beautiful analytics.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Modern DeFi Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern DeFi Dashboard',
    description: 'Ultra-modern multi-chain DeFi portfolio tracker',
    creator: '@julianfellyco',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#7c3aed" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased min-h-screen`}>
        <Providers>
          {/* Background Effects */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>
            
            {/* Footer */}
            <footer className="border-t border-white/10 bg-black/20 backdrop-blur-xl">
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-gray-400">
                    © 2024 Modern DeFi Dashboard. Built with ❤️ by{' '}
                    <a 
                      href="https://julianfellyco.github.io/portfolio/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Julian Fellyco
                    </a>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Powered by</span>
                    <span className="text-purple-400">Next.js 14</span>
                    <span>•</span>
                    <span className="text-blue-400">wagmi v2</span>
                    <span>•</span>
                    <span className="text-green-400">TypeScript</span>
                  </div>
                </div>
              </div>
            </footer>
          </div>

          {/* Toast Notifications */}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
