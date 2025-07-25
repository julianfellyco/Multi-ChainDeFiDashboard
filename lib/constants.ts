// types/index.ts

import { ReactNode } from 'react'

// Chains
export interface Chain {
  id: number
  name: string
  network: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: {
    default: {
      http: string[]
      webSocket?: string[]
    }
    public: {
      http: string[]
      webSocket?: string[]
    }
  }
  blockExplorers: {
    default: {
      name: string
      url: string
    }
  }
  testnet: boolean
  iconUrl?: string
}

// Tokens
export interface Token {
  name: string
  symbol: string
  address: string
  decimals: number
  chainId: number
  logoURI: string
  price: number
}

// Wallet
export interface WalletInfo {
  address: string
  chainId: number
  connected: boolean
  ensName?: string
}

// Portfolio
export interface PortfolioData {
  totalValue: number
  change24h: number
  assets: {
    [chainId: number]: {
      value: number
      change24h: number
    }
  }
}

// Transaction Types
export type TransactionType = 'swap' | 'deposit' | 'withdraw' | 'claim' | 'transfer'

export interface Transaction {
  id: string
  type: TransactionType
  description: string
  timestamp: Date
  status: 'pending' | 'completed' | 'failed'
  value: number
  chainId: number
}

// DeFi Position Types
export type PositionType = 'lending' | 'liquidity' | 'staking'

export interface DeFiPosition {
  id: string
  protocol: {
    name: string
    icon: string
    url: string
  }
  type: PositionType
  asset: string
  value: number
  apy: number
  chainId: number
}

// Chart Data
export interface ChartDataPoint {
  time: string
  price: number
}

export interface TimeRange {
  label: string
  value: '1D' | '1W' | '1M' | '1Y'
  intervalMinutes: number
  dataPoints: number
}

// Component Props
export interface CardProps {
  children: ReactNode
  className?: string
  hoverEffect?: boolean
}

export interface ConnectButtonProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline'
  className?: string
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export interface TokenListProps {
  selectedToken: string | null
  setSelectedToken: (token: string) => void
}

export interface PriceChartProps {
  selectedToken: string | null
}

// API Responses
export interface CoinGeckoPrice {
  [id: string]: {
    usd: number
    usd_24h_change: number
  }
}

export interface OneInchSwapResponse {
  fromToken: {
    symbol: string
    name: string
    address: string
    decimals: number
  }
  toToken: {
    symbol: string
    name: string
    address: string
    decimals: number
  }
  toTokenAmount: string
  fromTokenAmount: string
  protocols: any[]
  tx: {
    from: string
    to: string
    data: string
    value: string
    gasPrice: string
    gas: number
  }
}
