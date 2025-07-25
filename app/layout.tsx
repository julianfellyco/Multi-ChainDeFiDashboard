// app/layout.tsx - Next.js 14 App Router Layout

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navbar } from '@/components/Navbar'
import { Toaster } from '@/components/ui/Toaster'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Modern DeFi Dashboard',
  description: 'Ultra-modern multi-chain DeFi portfolio tracker with Next.js 14, TypeScript, and wagmi v2',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>
            <footer className="py-6 border-t border-border/40">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                Modern DeFi Dashboard &copy; {new Date().getFullYear()}
              </div>
            </footer>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
