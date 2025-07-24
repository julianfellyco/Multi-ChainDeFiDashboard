// app/layout.tsx - Next.js 14 App Router with Web3 Providers

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navbar } from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modern DeFi Dashboard | Julian Fellyco',
  description: 'Ultra-modern multi-chain DeFi portfolio tracker built with Next.js, TypeScript, and wagmi',
  keywords: ['DeFi', 'Web3', 'Ethereum', 'Portfolio', 'Multi-chain', 'wagmi', 'TypeScript'],
  authors: [{ name: 'Julian Fellyco' }],
  openGraph: {
    title: 'Modern DeFi Dashboard',
    description: 'Track your DeFi portfolio across multiple chains',
    url: 'https://julianfellyco.github.io/modern-defi-dashboard',
    siteName: 'Modern DeFi Dashboard',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern DeFi Dashboard',
    description: 'Ultra-modern multi-chain DeFi portfolio tracker',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
            </div>

            {/* Main Content */}
            <div className="relative z-10">
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
