// app/providers.tsx - Application Providers Setup

'use client'

import { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { ThemeProvider } from 'next-themes'
import { mainnet, polygon, arbitrum, base, sepolia } from 'wagmi/chains'
import { Toaster } from 'react-hot-toast'

// Wagmi configuration with multiple chains
const config = getDefaultConfig({
  // App info
  appName: 'Modern DeFi Dashboard',
  appDescription: 'Ultra-modern multi-chain DeFi portfolio tracker',
  appUrl: typeof window !== 'undefined' ? window.location.origin : 'https://julianfellyco.github.io/modern-defi-dashboard',
  appIcon: '/favicon.ico',

  // WalletConnect Project ID
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id',

  // Supported chains
  chains: [
    mainnet,
    polygon,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],

  // Optional: Custom RPC URLs for better performance
  // transports: {
  //   [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_ETHEREUM}`),
  //   [polygon.id]: http(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_POLYGON}`),
  //   [arbitrum.id]: http(`https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_ARBITRUM}`),
  //   [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_BASE}`),
  // },
})

// React Query client configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error) => {
        // Don't retry if it's a user rejection
        if (error?.message?.includes('User rejected')) {
          return false
        }
        return failureCount < 3
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
})

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={true}
      disableTransitionOnChange={false}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider
            theme="midnight"
            mode="dark"
            options={{
              initialChainId: 0, // Let user choose
              embedGoogleFonts: true,
              enforceSupportedChains: true,
              disclaimer: (
                <div className="text-xs text-gray-400 p-4">
                  By connecting your wallet, you agree to our{' '}
                  <a href="/terms" className="text-purple-400 hover:underline">
                    Terms of Service
                  </a>{' '}
                  and acknowledge our{' '}
                  <a href="/privacy" className="text-purple-400 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </div>
              ),
            }}
            customTheme={{
              "--ck-font-family": "'Inter', system-ui, sans-serif",
              "--ck-accent-color": "#7c3aed",
              "--ck-accent-text-color": "#ffffff",
              "--ck-bg-primary": "rgba(15, 23, 42, 0.95)",
              "--ck-bg-secondary": "rgba(30, 41, 59, 0.95)",
              "--ck-border-radius": "16px",
              "--ck-overlay-background": "rgba(0, 0, 0, 0.8)",
              "--ck-body-background": "rgba(15, 23, 42, 0.98)",
              "--ck-body-background-transparent": "rgba(15, 23, 42, 0.1)",
              "--ck-backdrop-filter": "blur(20px)",
              "--ck-modal-box-shadow": "0 25px 50px rgba(0, 0, 0, 0.5)",
              "--ck-primary-button-border-radius": "12px",
              "--ck-secondary-button-border-radius": "12px",
              "--ck-primary-button-background": "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)",
              "--ck-primary-button-hover-background": "linear-gradient(135deg, #8b5cf6 0%, #f472b6 100%)",
              "--ck-focus-color": "#7c3aed",
              "--ck-dropdown-button-box-shadow": "0 4px 12px rgba(0, 0, 0, 0.3)",
              "--ck-tooltip-background": "rgba(15, 23, 42, 0.98)",
              "--ck-tooltip-shadow": "0 8px 25px rgba(0, 0, 0, 0.4)",
            }}
          >
            {children}
            
            {/* Global Toast Container */}
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgba(15, 23, 42, 0.95)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#f8fafc',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                },
                success: {
                  iconTheme: {
                    primary: '#22c55e',
                    secondary: '#ffffff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#ffffff',
                  },
                },
                loading: {
                  iconTheme: {
                    primary: '#7c3aed',
                    secondary: '#ffffff',
                  },
                },
              }}
            />
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  )
}
