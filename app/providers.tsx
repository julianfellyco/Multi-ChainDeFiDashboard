// app/providers.tsx - Application Providers Setup

'use client'

import { ReactNode } from 'react'
import { WagmiConfig, createConfig } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { ThemeProvider } from 'next-themes'
import { supportedChains } from '@/lib/chains'
import { createPublicClient, http } from 'viem'

// Create QueryClient
const queryClient = new QueryClient()

// Check if WalletConnect Project ID is available
if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
  console.warn(
    '⚠️ Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID environment variable'
  )
}

// Configure wagmi client
const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'development',
    
    // Required
    appName: 'Modern DeFi Dashboard',
    
    // Optional
    appDescription: 'Ultra-modern multi-chain DeFi portfolio tracker',
    appUrl: 'https://modern-defi-dashboard.example.com',
    appIcon: 'https://modern-defi-dashboard.example.com/app-icon.png',
    
    // Configure chains
    chains: supportedChains,
    
    // Configure custom transport per chain
    transports: Object.fromEntries(
      supportedChains.map((chain) => [
        chain.id,
        http(
          process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
            ? `https://${chain.network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
            : chain.rpcUrls.default.http[0]
        ),
      ])
    ),
  })
)

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <WagmiConfig config={config}>
          <ConnectKitProvider
            mode="auto"
            customTheme={{
              "--ck-connectbutton-hover-background": "hsl(var(--primary))",
              "--ck-connectbutton-background": "hsl(var(--primary))",
              "--ck-connectbutton-color": "hsl(var(--primary-foreground))"
            }}
          >
            {children}
          </ConnectKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
